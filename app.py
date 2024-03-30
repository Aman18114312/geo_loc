from flask import Flask, request, jsonify
import pandas as pd
import spacy
import ast
from geopy.geocoders import OpenCage

# Replace 'YOUR_API_KEY' with your actual API key
api_key = 'ec0d78b8f69740de8e63468bdd32210b'
geolocator = OpenCage(api_key)

app = Flask(__name__)

# Load the DataFrame
df = pd.read_csv('final_geo.csv')

# Convert the 'Locations' column back to list format
df['Locations'] = df['Locations'].apply(ast.literal_eval)

# Load the spaCy NER model
nlp = spacy.load("en_core_web_sm")

@app.route('/api/search', methods=['POST'])
def search_locations():
    # Get user input
    user_input = request.json['text']

    # Extract GPE entities
    locations = contextToloc(user_input)

    # Convert locations to lower case for case-insensitive search
    locations_lower = list(set([loc for loc in locations]))
    

    # Search DataFrame for similar locations
    filtered_rows = df[df['Locations'].apply(lambda x: any(isinstance(x, list) and loc.lower() in map(str.lower, x) for loc in locations_lower))]



    # Convert locations to coordinates
    coordinates = convert_to_coordinates(locations)

    # Prepare response data
    response_data = {
        'coordinates': coordinates,
        'locations': locations_lower,
        'results': filtered_rows.to_dict(orient='records')
    }

    return jsonify(response_data)

def contextToloc(text: str):
    doc = nlp(text)
    locations = [ent.text for ent in doc.ents if ent.label_ == 'GPE']
    return locations

def convert_to_coordinates(locations):
    latitudes = []
    longitudes = []
    for location in locations:
        location = geolocator.geocode(location)
        if location:
            latitudes.append(location.latitude)
            longitudes.append(location.longitude)
        else:
            latitudes.append(None)
            longitudes.append(None)
    return list(zip(latitudes, longitudes))

if __name__ == '__main__':
    app.run(debug=True)

# Welcome to GeoContent Recommender!

## Overview

GeoContent Recommender is a web application designed to provide personalized content recommendations based on geolocation extracted from textual data such as articles, news, and tweets. The application utilizes Flask for the backend API, React.js along with Tailwind CSS for the frontend, and Named Entity Recognition (NER) for extracting geographical entities (GPE) from the input text.

## Features

- **Input Textual Data**: Users can input textual data containing articles, news, tweets, etc., into the application.
- **Geolocation Extraction**: The application extracts geographical locations mentioned in the input text using Named Entity Recognition (NER).
- **Geolocation to Coordinates Conversion**: Extracted geographical locations are converted into coordinates (latitude and longitude).
- **Interactive Map**: The coordinates are plotted on an interactive map, providing users with a visual representation of the locations mentioned in the input text.
- **Content Recommendation**: Based on the geolocation, the application recommends relevant content tailored to the user's geographical interests.
  
## Technologies Used

- **Backend**: Flask
- **Frontend**: React.js, Tailwind CSS
- **Geolocation Extraction**: Named Entity Recognition (NER)
- **Mapping**: Geocoders API


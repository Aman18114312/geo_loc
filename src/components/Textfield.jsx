import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const TextFieldGenerator = () => {
  const [inputValue, setInputValue] = useState('');
  const [fields, setFields] = useState([]);
  const [apiData, setApiData] = useState(null);
  const navigate = useNavigate();

  const addField = async () => {
    if (inputValue.trim() === '') {
      toast.error('Please enter the input');
      return;
    }

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputValue }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      const { coordinates, locations, results} = data;

      if (coordinates.length === 0 || locations.length === 0) {
        toast.error('No locations found for the input');
        return;
      }

      setApiData({ coordinates, locations, results });
      setFields([...fields, { id: Date.now() }]);
      setInputValue('');
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Error fetching data');
    }
  };

  const removeField = (id) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  const handleRecommendation = () => {
    // Navigate to the map page
    navigate('/maps', { state: { coordinates: apiData.coordinates, locations: apiData.locations, results: apiData.results } });
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="flex flex-col items-center">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter a country name"
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mb-4 focus:outline-none"
          onClick={addField}
        >
          Generate
        </button>
        {fields.map((field) => (
          <div key={field.id} className="mb-4 p-10 border border-gray-300 rounded-md bg-white">
            {apiData && (
              <div className="flex flex-col gap-5 md:flex-row items-start md:items-center justify-between">
                <div className="mb-2 md:mr-4">
                  <p className="font-bold text-xl">Locations:</p>
                  <p className='max-w-lg text-2xl font-semibold leading-normal text-gray-900 dark:text-black'>{apiData.locations.join(', ')}</p>
                </div>
                <div className="mb-2">
                  <p className="font-bold text-xl">Coordinates:</p>
                  <p className='max-w-lg text-2xl font-semibold leading-normal text-gray-900 dark:text-black'>{apiData.coordinates.map(coord => `[${coord.join(', ')}]`).join(', ')}</p>
                </div>
                <div className="flex flex-col justify-center items-center mt-5 md:flex-row">
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md mb-2 md:mb-0 md:mr-2 focus:outline-none"
                    onClick={() => removeField(field.id)}
                  >
                    Remove
                  </button>
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none"
                    onClick={handleRecommendation}
                  >
                    Recommendation
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TextFieldGenerator;

import React, { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import navigationicon from '../assets/navigationicon.png'

const MapPage = () => {
  const { state } = useLocation();
  const { coordinates, locations, results } = state || {};
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  // const [maxHeight, setMaxHeight] = useState(0);
  

  // Define marker icon
  const markerIcon = new L.Icon({
    iconUrl: navigationicon,
    iconSize: [45, 45],
  });

  // useEffect(() => {
  //   if (carouselRef.current) {
  //     const items = carouselRef.current.querySelectorAll('.carousel-item');
  //     let maxHeight = 0;
  //     items.forEach(item => {
  //       const height = item.offsetHeight;
  //       if (height > maxHeight) {
  //         maxHeight = height;
  //       }
  //     });
  //     setMaxHeight(maxHeight);
  //   }
  // }, [results]);

  const handlePrevClick = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? results.length - 1 : prevIndex - 1));
  };

  const handleNextClick = () => {
    setActiveIndex((prevIndex) => (prevIndex === results.length - 1 ? 0 : prevIndex + 1));
  };

  const isLongText = (text) => {
    return text.length > 700;
  };
  
  return (
    <div className="map-page mt-16">
      <div className="map-container" style={{ height: '500px', width: '100%' }}>
        <MapContainer center={coordinates[0]} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {coordinates && coordinates.map((coord, index) => (
            <Marker key={index} position={coord} icon={markerIcon}>
              <Popup>
                {locations && locations[index]}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      
      {/* Gallery for displaying results */}
      <div id="custom-controls-gallery" className="relative w-full mt-4" data-carousel="slide">
         <div ref={carouselRef} className="relative h-56 overflow-hidden rounded-lg md:h-96" >  {/*style={{ height: `${maxHeight}px` }}> */}
          {results && results.map((result, index) => (
            <div key={index} className={`duration-700 ease-in-out ${activeIndex === index ? '' : 'opacity-0'}`} data-carousel-item={activeIndex === index ? 'active' : ''} style={{ display: activeIndex === index ? 'block' : 'none' }}>
               <div className="absolute inset-0 flex flex-col justify-center items-center px-4 bg-white">
                <h2 className={`text-2xl font-bold mb-2 ${isLongText(result.Title) ? 'text-lg' : ''}`}>{result.Title}</h2>
                <p className={`text-sm text-gray-600 ${isLongText(result.Context) ? 'text-xs' : ''}`}>{result.Context}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-30 flex justify-center items-center w-full pt-4">
          {/* Slider controls */}
          <button type="button" className="flex justify-center items-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev onClick={handlePrevClick}>
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
              </svg>
              <span className="sr-only">Previous</span>
            </span>
          </button>
          <button type="button" className="flex justify-center items-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next onClick={handleNextClick}>
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
              </svg>
              <span className="sr-only">Next</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapPage;

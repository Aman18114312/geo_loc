import React from 'react';
import TextFieldGenerator from '../components/Textfield';
import backgroundvideo from '../assets/backgroundvideo.mp4';
import backgroundImage from '../assets/kanye.png'

const Main = () => {
  return (
    <div className="relative h-screen">
      <video autoPlay loop muted className="absolute inset-0 object-cover w-full h-full">
        <source src={backgroundvideo} type="video/mp4" />
        {/* Add additional video sources for different formats if needed */}
        Your browser does not support the video tag.
      </video>
      <div className="flex flex-col justify-center items-center h-full absolute top-0 left-0 w-full">
          <h1 class="text-5xl font-extrabold dark:text-white">MAIN PAGE</h1>
           <div className="flex flex-col items-center">
          <TextFieldGenerator />
           </div>
      </div>
      <div className="fixed bottom-0 right-0 mb-4 mr-4">
  <img src={backgroundImage} alt="Background" className="w-36" />
  <div className="w-7 h-7 bg-orange-500 rounded-full -mt-5 ml-20"></div>
</div>




      
 
    </div>
  );
};

export default Main;

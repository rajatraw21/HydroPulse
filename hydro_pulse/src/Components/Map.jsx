import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import * as FaIcons from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests
import './Map.css'; // Import CSS file

function Map() {
  const [map, setMap] = useState(null);
  const [reportedProblems, setReportedProblems] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const apiKey = import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY;
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey,
  });

  const mapOptions = {
    fullscreenControl: false // Disable fullscreen control
  };

  useEffect(() => {
    // Fetch reported problems from the backend when the component mounts
    
    const fetchReportedProblems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/report'); // Replace with your backend API endpoint
        console.log('response:',response.data);
        setReportedProblems(response.data); 
       // Update the state with the fetched reported problems
      } catch (error) {
        console.error('Error fetching reported problems:', error);
      }

    };
    
    fetchReportedProblems();
  }, []);
 
  const onMapLoad = (map) => {
    setMap(map);
  };
  const problemTypeToMarkerColor = {
    'flood': 'red',
    'water scarcity': 'yellow',
    'water leakage': 'green',
    'drainage': 'blue',
    'water contamination': 'violet',
    // Add more mappings as needed
  };

  const getMarkerColor = (type) => {
    return problemTypeToMarkerColor[type] || 'blue'; // Default to blue if type is not mapped
  };

  const onMarkerClick = (problem) => {
    setSelectedProblem(problem);
    
  };
  console.log('selectedproblem',selectedProblem);
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div>
      <header>
        <Link to='/Userhome' className='back'>
          <FaIcons.FaArrowLeft color='#000000' />
        </Link>
        <h1>Map</h1>
      </header>
      <div className="map-container">
      <div className="water-problems-card">
          <h2>Water Problems</h2>
          <ul >
            <li style={{color:'red'}}><span className="bullet" style={{backgroundColor:'red'}} ></span> Flood</li>
            <li style={{color:'yellow'}}><span className="bullet" style={{backgroundColor:'yellow'}}></span> Water Scarcity</li>
            <li style={{color:'green'}}><span className="bullet" style={{backgroundColor:'green'}}></span> Water Leakage</li>
            <li style={{color:'blue'}}><span className="bullet" style={{backgroundColor:'blue'}}></span> Drainage</li>
            <li style={{color:'violet'}}><span className="bullet" style={{backgroundColor:'violet'}}></span> Water Contamination</li>
          </ul>
        </div>
        <div className="map-wrapper">
          <GoogleMap
            id="google-map"
            mapContainerStyle={{
              height: 'calc(100vh - 80px)',
              width: '100%'
            }}
            zoom={2}
            center={{ lat: 22.505, lng: 22}}
            options={mapOptions}
            onLoad={onMapLoad}
          >
            {reportedProblems.map(problem => (
              <Marker
                key={problem._id}
                position={{
                  lat: parseFloat(problem.location.substring(1, problem.location.indexOf(','))),
                  lng: parseFloat(problem.location.substring(problem.location.indexOf(',') + 2, problem.location.length - 1))
                }}
                onClick={() => onMarkerClick(problem)}
                icon={{
                  path: 'M22-48h-44v43h16l6 5 6-5h16z',
                  fillColor: getMarkerColor(problem.category),
                  fillOpacity: 1,
                  strokeColor: '#000',
                  strokeWeight: 2,
                  scale: 0.8,
                }}
              />
            ))}
            {selectedProblem && (
              <InfoWindow
                position={{
                  lat: parseFloat(selectedProblem.location.substring(1, selectedProblem.location.indexOf(','))),
                  lng: parseFloat(selectedProblem.location.substring(selectedProblem.location.indexOf(',') + 2, selectedProblem.location.length - 1))
                }}
                onCloseClick={() => setSelectedProblem(null)}
              >
                <div>
                  <h2>{selectedProblem.description}</h2>
                
                  
                  <img src={`http://localhost:5000/${selectedProblem.images[0]}`} height='100px' width='100px' alt="Problem" />
                  <p>Category: {selectedProblem.category}</p>
                  {/* Add more details as needed */}
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </div>
      </div>
    </div>
  );
};

export default Map;

import React, { useState, useRef, useEffect } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import './MapComponent.css';

function MapComponent({ onLocationChange }) {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const searchInputRef = useRef(null);
  const apiKey = import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY;
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey,
  });

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        onSearch();
      }
    };

    const inputElement = searchInputRef.current;
    if (inputElement) {
      inputElement.addEventListener('keydown', handleKeyPress);

      return () => {
        inputElement.removeEventListener('keydown', handleKeyPress);
      };
    }
  }, []);

  const onMapLoad = (map) => {
    setMap(map);
  };

  const createMarker = (position, title) => {
    const newMarker = new window.google.maps.Marker({
      position,
      map,
      title,
    });
    return newMarker;
  };

  const onMapClick = (e) => {
    
     
    
    if (map) {
      const clickedPosition = e.latLng;
      if (marker) {
        marker.setPosition(clickedPosition);
        
     
     
      onLocationChange(clickedPosition); // Call the onLocationChange prop with the new location
      } else {
        const newMarker = createMarker(clickedPosition, 'Clicked Location');
        setMarker(newMarker);
          
      
     
      onLocationChange(clickedPosition);
      }
      map.panTo(clickedPosition);

      // Fetch address using reverse geocoding
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: clickedPosition }, (results, status) => {
        if (status === 'OK' && results[0]) {
          const address = results[0].formatted_address;
          searchInputRef.current.value = address; // Set the value of the search input field
        } else {
          console.error('Reverse geocoding failed:', status);
        }
      });
    }
  };

     const onSearch = (event) => {
      event.preventDefault(); // Prevent form submission
      // Implementation for searching location
  
    const searchValue = searchInputRef.current.value;
    if (searchValue && map) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: searchValue }, (results, status) => {
        if (status === 'OK' && results[0]) {
          const location = results[0].geometry.location;
          if (marker) {
            marker.setPosition(location);
          } else {
            const newMarker = createMarker(location, 'Searched Location');
            setMarker(newMarker);
          }
          map.panTo(location);
        } else {
          console.error('Geocode was not successful for the following reason:', status);
        }
      });
    }
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div>
      <div>
        <label htmlFor="location">Location:</label>
        <div className='searchlocation'>
          <input className="locationInput" type="text" ref={searchInputRef} placeholder="Search for a location" />
          <button onClick={onSearch}>Search</button>
        </div>
      </div>
      <div style={{ height: '50vh', width: '100%' }}>
        <GoogleMap
          id="google-map"
          mapContainerStyle={{
            height: '50vh',
            width: '100%'
          }}
          zoom={5}
          center={{ lat: 23.4188, lng: 78.6704 }}
          onLoad={onMapLoad}
          onClick={onMapClick} // This will handle marker creation on map click
        >
          {/* Child components, such as markers, info windows, etc. */}
          {/* You can add more components here if needed */}
        </GoogleMap>
      </div>
    </div>
  );
}

export default MapComponent;
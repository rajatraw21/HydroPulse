import React, { useState } from 'react';
import './Reports.css';
import * as FaIcons from 'react-icons/fa';
import { Link } from 'react-router-dom';
import MapComponent from './MapComponent';
import axios from 'axios';

function ReportIssueScreen() {
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [images, setImages] = useState([]);
  const [location, setLocation] = useState(null); // State to hold the selected location

  const handleLocationChange = (newLocation) => {
    setLocation(newLocation); // Update the selected location state
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleImageUpload = (event) => {
    const fileList = event.target.files;
    const newImages = [];

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      newImages.push(file); // Store file objects directly
    }

    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Description:", description);
    console.log("Category:", category);
    console.log("Images:", images);
    console.log("location:",location);


    // Prepare form data
    const formData = new FormData();
    formData.append('description', description);
    formData.append('category', category);
    formData.append('location',location);
    images.forEach((image, index) => {
      formData.append(`images`, image); // Append each image to formData
    });
    for (let [key, value] of formData) {
      console.log(`${key}: ${value}`)
    }
    
    console.log("formdata:", formData);
   

    // Send data to backend server
    try {
      const response = await axios.post('http://localhost:5000/api/report', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Required for file uploads
      },
      });
      console.log(response.data); // Handle successful response
    } catch (error) {
      console.error('Error submitting report:', error); // Handle error
    }
  };
  
  const categoryOptions = [
    { value: 'flood', label: 'Flood' },
    { value: 'water leakage', label: 'Water Leakage' },
    { value: 'water contamination', label: 'Water Contamination' },
    { value: 'water scarcity', label: 'Water Scarcity' },
    { value: 'drainage', label: 'Drainage' }
  ];

  return (
    <>
      <header className="header">
        <Link to='/Userhome' className='back'>
          <FaIcons.FaArrowLeft color='#000000' />
        </Link>
        <h1>Report Issue</h1>
      </header>

      <form className='report-issue-screen' onSubmit={handleSubmit} encType='multipart/form-data'>
        <div className="form-group">
          <label htmlFor="upload" className="label">Upload Images:</label>
          <input type="file" className='input' accept="image/*" id="upload" multiple onChange={handleImageUpload} />
        </div>

        <div className="image-preview-container">
          {images.map((image, index) => (
            <div key={index} className="image-preview">
              <img src={URL.createObjectURL(image)} alt={`Uploaded ${index + 1}`} className="image" />
              <button className='close-button' onClick={() => handleRemoveImage(index)}></button>
            </div>
          ))}
        </div>

        <div className="form-group">
          <label htmlFor="description" className="label">Description:</label>
          <textarea id="description" value={description} onChange={handleDescriptionChange} className="textarea" />
        </div>

        <div className="form-group">
          <label htmlFor="category" className="label">Category:</label>
          <select id="category" value={category} onChange={handleCategoryChange} className="select">
            <option value="">Select Category</option>
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <MapComponent onLocationChange={handleLocationChange} />
        <div className='bottom'>
          <button type="button" className='cancel'>Cancel</button>
          <button type="submit" className='submit'>Submit</button>
        </div>
      </form>
    </>
  );
}

export default ReportIssueScreen;

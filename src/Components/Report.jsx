import React, { useState } from 'react';
import './Reports.css';
import * as FaIcons from 'react-icons/fa';
import { Link } from 'react-router-dom';


function ReportIssueScreen() {
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [images, setImages] = useState([]);
  // ... other state variables for uploaded images


  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  // ... other functions for handling location and image uploads
  const handleImageUpload = (event) => {
    const fileList = event.target.files;
    const newImages = [];

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      newImages.push(URL.createObjectURL(file));
    }

    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prepare form data
    const formData = new FormData();
    formData.append('description', description);
    formData.append('category', category);
    formData.append('location', location);
    // ... append uploaded images to formData

    // Send data to backend server using Axios or Fetch
    try {
      const response = await axios.post('/api/report-issue', formData);
      console.log(response.data);
      // Handle successful submission (e.g., show a confirmation message)
    } catch (error) {
      console.error(error);
      // Handle submission errors
    }
  };

  // Assuming you have a list of category options
  const categoryOptions = [
    { value: 'flood', label: 'Flood' },
    { value: 'water leakage', label: 'Water Leakage' },
    { value: 'water contamination', label: 'Water Contamination' },
    { value: 'water scarcity', label: 'Water Scarcity' },
    { value: 'drainage', label: 'Drainage' }
  ];

  return (
   <>
      {/* Header */}
      <header>
    
          <Link to='/Userhome' className='back'>
            <FaIcons.FaArrowLeft  color='#000000'/>
          </Link>
        
        <h1>Report Issue</h1>

      </header>
     
<div className='report-issue-screen'>
          {/* Upload button */}
          <div>
        <label htmlFor="upload" >Upload Images:</label>
        <input type="file" className='upload-button' accept="image/*" id="upload" multiple onChange={handleImageUpload} />
      </div>
       {/* Display uploaded images */}
       <div className="image-preview-container">
          {images.map((image, index) => (
            <div key={index} className="image-preview">
              <img src={image} alt={`Uploaded ${index + 1}`} />
              <button className='close-button' onClick={() => handleRemoveImage(index)}></button>
            </div>
          ))}
        </div>
      {/* Description textbox */}
      <div>
        <label htmlFor="description">Description:</label>
        <textarea id="description" value={description} onChange={handleDescriptionChange} />
      </div>

      {/* Category selection */}
      <div>
        <label htmlFor="category">Category:</label>
        <select id="category" value={category} onChange={handleCategoryChange}>
          {categoryOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Location section */}
      <div>
      <label htmlFor="location">Location:</label>
        <button onClick={() => { /* Implement map selection logic */ }}>Select on Map</button>
      </div>


      <div className='bottom'>
      <button className='cancel'>Cancel</button>
      <button className='submit' onClick={handleSubmit}>Submit</button>
      </div>
    </div>
    </>
  );
}

export default ReportIssueScreen;

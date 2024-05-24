// EditPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditPage = () => {
  const [imageData, setImageData] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    fetchImageData(postId);
  }, []);

  const fetchImageData = async (postId) => {
    try {
      const response = await axios.get(`http://localhost:3001/images/${postId}`);
      setImageData(response.data);
      setTitle(response.data.title);
      setDescription(response.data.description);
    } catch (error) {
      console.error('Error fetching image data:', error);
    }
  };

  const handleUpdateImage = async () => {
    try {
      await axios.put(`http://localhost:3001/images/${imageData.id}`, {
        title: title,
        description: description,
      });
      // Handle successful update
    } catch (error) {
      console.error('Error updating image:', error);
    }
  };

  if (!imageData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Edit Image</h1>
      <form onSubmit={handleUpdateImage}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">Update Image</button>
      </form>
    </div>
  );
};

export default EditPage;

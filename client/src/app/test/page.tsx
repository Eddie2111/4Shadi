'use client';
import axios from 'axios';
import React, { useState } from 'react';

export default function Test(): JSX.Element {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const selected = e.target.files[0];
    const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp'];
    if (selected && ALLOWED_TYPES.includes(selected.type)) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setImage(selected);
        setPreview(reader.result);
      };
      reader.readAsDataURL(selected);
    } else {
      setError('Please select an image file (png, jpeg, jpg)');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', image); // Use 'image' instead of 'file'
    try {
      const res = await axios.post('http://localhost:3800/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Test</h1>
      <form onSubmit={handleSubmit}>
        <input type='file' className='px-2 mx-2 w-72' name='file' onChange={handleChange} />
        <p> {error} </p>
        <p> Preview </p>
        <img src={preview} alt='' />
        <button type="submit">Submit</button>
      </form>
      <GetImage />
    </div>
  );
}
import Image from 'next/image';

function GetImage(){
  const [Image, setImage] = useState(' ');
  const [imageValue, setImageValue] = useState(null);
  const GettheImage = async() => {
    try {
      const res = await axios.get('http://localhost:3800/get_any?image=4JQpNWsUVgL4wD0CHPW341dW58YBWL8v.jpeg');
      console.log(res.data);
      setImage(res.data);
    } catch (err) {
      console.log(err);
    }
  }
  return(
    <div>
      <button onClick={GettheImage}>Get Image</button>
      <Image src={Image} alt='test' width={200} height={200} />
    </div>
  )
}
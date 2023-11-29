'use client';
import axios from 'axios';
import React, { useState } from 'react';
import { Button, Card, CardHeader, CardBody, CardFooter, Divider, Image as NextUIImage } from '@nextui-org/react';
import Image from 'next/image';
export default function Test(): JSX.Element {
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const selected = e.target.files[0];
    const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp'];

    if (selected && ALLOWED_TYPES.includes(selected.type)) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setImages((prevImages) => [...prevImages, selected]);
        setPreviews((prevPreviews) => [...prevPreviews, reader.result]);
      };
      reader.readAsDataURL(selected);
    } else {
      setError('Please select an image file (png, jpeg, jpg)');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    images.forEach((image, index) => {
      formData.append('file'+index.toString(), image);
    });
    console.log(formData);
    /*
      try {
        const res = await axios.post('http://localhost:3800/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(`Image ${i + 1} uploaded successfully:`, res.data);
      } catch (err) {
        console.log(`Error uploading image ${i + 1}:`, err);
      }
      */
  };

  const removeTheImage = (index) => {
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });

    setPreviews((prevPreviews) => {
      const updatedPreviews = [...prevPreviews];
      updatedPreviews.splice(index, 1);
      return updatedPreviews;
    });
  };

  return (
    <div>
      <h1>Test</h1>
      <form onSubmit={handleSubmit} className='flex flex-row w-[36rem]'>
        <input type='file' className='flex flex-col px-2 mx-2 w-72 my-16' name='file' onChange={handleChange} multiple accept="image/*" />
        {previews.map((preview, index) => (
          <div key={index} className="flex flex-col">
            <Image src={preview} alt={`preview-${index}`} height={100} width={120} />
            <button onClick={() => removeTheImage(index)} className='w-32 block p-2 mx-4 h-10 rounded-lg my-6 text-red-600 text-2xl'>Remove</button>
          </div>
        ))}
        <button type="submit" className='w-32 bg-blue-500 block p-2 mx-4 h-10 rounded-lg my-6'>Submit All</button>
      </form>
    </div>
  );
}
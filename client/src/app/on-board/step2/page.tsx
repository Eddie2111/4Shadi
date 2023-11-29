'use client';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Button, Card, CardHeader, CardBody, CardFooter, Divider, Image as NextUIImage } from '@nextui-org/react';
import Image from 'next/image';
import Handler from './handler'
export default function Test(): JSX.Element {
  const [id, setID] = useState<string>('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('/');
  const [error, setError] = useState(null);
    const [image1, setImage1] = useState(null);
    const [preview1, setPreview1] = useState('/');
    const [image2, setImage2] = useState(null);
    const [preview2, setPreview2] = useState('/');
    const [image3, setImage3] = useState(null);
    const [preview3, setPreview3] = useState('/');
    const [image4, setImage4] = useState(null);
    const [preview4, setPreview4] = useState('/');
    const [image5, setImage5] = useState(null);
    const [preview5, setPreview5] = useState('/');
  const [profileImage, setProfileImage] = useState<string>(''); // This is the image that will be sent to the backend
  const [sentImages, setSentImages] = useState<string[]>([]); // This is the array of images that will be sent to the backend
  useEffect(() => {
    localStorage.getItem('id') && setID(localStorage.getItem('id')!);
  },[]);
  // Handle each of the images in image 1,2,3,4,5 from the 2nd form input
  const HandleBulk = (e) => {
    const selected = e.target.files[0];
    const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp'];
    if (selected && ALLOWED_TYPES.includes(selected.type)) {
      let reader = new FileReader();
      reader.onloadend = () => {
        switch (e.target.name) {
          case 'image1':
            setImage1(selected);
            setPreview1(reader.result);
            break;
          case 'image2':
            setImage2(selected);
            setPreview2(reader.result);
            break;
          case 'image3':
            setImage3(selected);
            setPreview3(reader.result);
            break;
          case 'image4':
            setImage4(selected);
            setPreview4(reader.result);
            break;
          case 'image5':
            setImage5(selected);
            setPreview5(reader.result);
            break;
          default:
            break;
        }
      };
      reader.readAsDataURL(selected);
    } else {
      setError('Please select an image file (png, jpeg, jpg)');
    }
  };
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
  // profile image submit
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
      setProfileImage(res.data.url);
      const response = await axios.post('http://localhost:3500/update',
            {
                id: id,
                profileImage: profileImage,
                images: sentImages
            },
        );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  const removeTheImage = async() => {
    setImage(null);
    setPreview('/');
  }
  const HandleHardSubmit = async(e) => {
    e.preventDefault();
    // submitting all the files from bulk using a loop
    const formData = new FormData();
    const setUpArray = [];
    for (let i = 0; i < 5; i++) {
      try {
        formData.append('file', i === 0 ? image1 : i === 1 ? image2 : i === 2 ? image3 : i === 3 ? image4 : image5);
        const res = await axios.post('http://localhost:3800/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(`Image ${i + 1} uploaded successfully:`, res.data);
        // insert the uploaded image url into the sentImages array
        setUpArray.push(res.data.url);
        formData.delete('file');
      } catch (err) {
        console.log(`Error uploading image ${i + 1}:`, err);
      }
    }
    console.log(setUpArray);
    setSentImages(setUpArray);
    await Handler(id, setUpArray);
  }
  return (
    <div>
      <h1>Please upload your profile picture as well as 5 images for a potential match</h1>
      <form onSubmit={handleSubmit} className='flex flex-row w-[36rem]'>
        <input type='file' className='flex flex-col px-2 mx-2 w-72 my-16' name='file' onChange={handleChange} />
        <div className='flex flex-col'>
          <button type="submit" className='w-32 bg-blue-500 block p-2 mx-4 h-10 rounded-lg my-6'>Submit</button>
          <button onClick={removeTheImage} className='w-32 block p-2 mx-4 h-10 rounded-lg my-6 text-red-600 text-2xl bg-white'>X</button>
        </div>
      </form>
      <form onSubmit={HandleHardSubmit} className='flex flex-col w-[36rem]'>
        <input type='file' className='flex flex-col px-2 mx-2 w-72 my-16' name='image1' onChange={HandleBulk} />
        <input type='file' className='flex flex-col px-2 mx-2 w-72 my-16' name='image2' onChange={HandleBulk} />
        <input type='file' className='flex flex-col px-2 mx-2 w-72 my-16' name='image3' onChange={HandleBulk} />
        <input type='file' className='flex flex-col px-2 mx-2 w-72 my-16' name='image4' onChange={HandleBulk} />
        <input type='file' className='flex flex-col px-2 mx-2 w-72 my-16' name='image5' onChange={HandleBulk} />
        <div className='flex flex-col'>
          <button type="submit" className='w-32 bg-blue-500 block p-2 mx-4 h-10 rounded-lg my-6'>Submit</button>
          <button onClick={removeTheImage} className='w-32 block p-2 mx-4 h-10 rounded-lg my-6 text-red-600 text-2xl bg-white'>X</button>
        </div>
    </form>
    </div>
  );
}
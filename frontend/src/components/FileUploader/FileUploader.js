import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { config } from './config';
import Uploaded from './Uploaded/Uploaded';
import Uploading from './Uploading/Uploading';
import Uploader from './Uploader/Uploader';

export function FileUploader() {
  const [isUploading, setIsUploading] = useState(false);
  const [percentCompleted, setPercentCompleted] = useState(0);
  const [imageURL, setImageURL] = useState(null);

  const handleInputFile = async (event) => {
    let filesNumber;
    let file;

    if (event.type === 'input') {
      filesNumber = event.target.files.length;
      file = event.target.files[0];
    } else if (event.type === 'drop') {
      filesNumber = event.dataTransfer.items.length;
      file = event.dataTransfer.items[0].getAsFile();
    }

    if (filesNumber > config.maxFiles) {
      alert('Drop one file only!');
    } else if (config.allowedMimeTypes.indexOf(file.type) === -1) {
      alert('File type not allowed');
    } else if (file.size > config.maxSize) {
      alert('File size too large (max. 4MB)');
    } else {
      const formData = new FormData();
      formData.append('image', file);

      try {
        setIsUploading(true);
        const { data } = await axios.post('/images', formData, {
          onUploadProgress: (progressEvent) => {
            setPercentCompleted(
              Math.min(
                Math.round((progressEvent.loaded * 100) / progressEvent.total),
                100
              )
            );
          },
        });
        setImageURL(data.path);
        setIsUploading(false);
      } catch (error) {
        setIsUploading(false);
        if (error.response) {
          alert(error.response.data);
        } else {
          alert('Unknown error. Try again later.');
        }
      }
    }
  };

  useEffect(() => {
    // Prevent default behavior of opening the dropped file in a new tab
    const prevDefault = (e) => {
      e.preventDefault();
    };
    window.addEventListener('dragover', prevDefault, false);
    window.addEventListener('drop', prevDefault, false);

    const dropzone = document.querySelector('.dropzone');
    dropzone?.addEventListener('drop', handleInputFile);

    return () => {
      window.removeEventListener('dragover', prevDefault);
      window.removeEventListener('drop', prevDefault);
      dropzone?.removeEventListener('drop', handleInputFile);
    };
  }, []);

  if (!isUploading && !imageURL) {
    return <Uploader handleInputFile={handleInputFile} />;
  } else if (isUploading) {
    return <Uploading percentCompleted={percentCompleted} />;
  } else {
    return <Uploaded imageURL={imageURL} />;
  }
}

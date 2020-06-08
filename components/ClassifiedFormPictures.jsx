import React, { useState, useEffect } from "react";
import { useDropzone } from 'react-dropzone';

const ClassifiedFormPictures = () => {
  const [files, setFiles] = useState([]);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: 'image/jpeg, image/png',
    onDrop: acceptedFiles => {
      setFiles([
        ...files,
        ...acceptedFiles.map(file => Object.assign(file, {
          preview: URL.createObjectURL(file)
        }))
      ]);
    }
  });
  const deleteFile = (index) => setFiles(files.splice(1, 1));

  useEffect(() => () => {
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <>
      <div {...getRootProps({ className: 'flex col-span-2 my-5 justify-center text-pink-600 items-center border-2 border-dashed bg-pink-100 h-32 border-pink-500' })}>
        <input {...getInputProps()} />
        <p>Sélectionnez ou glissez dans la zone jusqu'à 10 images au format JPEG ou PNG.</p>
      </div>
      {files.map((file, index) => (
        file ? <img src={file.preview} onClick={() => deleteFile(index)} /> : ''
      ))}
    </>
  );
}

export default ClassifiedFormPictures;
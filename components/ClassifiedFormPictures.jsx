import React, { useState, useEffect } from "react";
import { useDropzone } from 'react-dropzone';
import { Upload, Gallery } from 'grommet-icons';

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
      <div {...getRootProps({ className: 'flex px-4 flex-col col-span-2 justify-center text-gray-600 items-center border-2 border-dashed bg-gray-200 py-12 border-gray-500' })}>
        <input {...getInputProps()} />
        <Gallery className="fill-current" size="large" color="#718096" />
        <p className="my-6 text-center">Sélectionnez ou glissez dans la zone jusqu'à 10 images au format JPEG ou PNG.</p>
        <div className="inline-block border-2 border-gray-500 font-bold py-2 my-4 px-4 rounded inline-flex items-center">
          <Upload className="fill-current mr-4 w-4 h-4" color="#718096" />
          <span>Sélectionnez une image</span>
        </div>
      </div>
      {files.map((file, index) => (
        file ? <img src={file.preview} onClick={() => deleteFile(index)} /> : ''
      ))}
    </>
  );
}

export default ClassifiedFormPictures;
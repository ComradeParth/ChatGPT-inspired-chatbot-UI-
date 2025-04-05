import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FaCloudUploadAlt } from "react-icons/fa";

const FileUpload = ({ onFileUpload }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        onFileUpload(acceptedFiles[0]);
      }
    },
    [onFileUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*,application/pdf,text/plain",
    maxSize: 5 * 1024 * 1024, // 5MB limit
  });

  return (
    <div
      {...getRootProps()}
      className={`p-4 border-2 border-dashed rounded-lg text-center cursor-pointer transition ${
        isDragActive ? "border-blue-400 bg-blue-900/10" : "border-gray-500 bg-gray-700"
      }`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center">
        <FaCloudUploadAlt className="text-gray-300 text-3xl mb-2" />
        <p className="text-gray-300">
          {isDragActive ? "Drop the file here..." : "Drag & drop a file here, or click to select one"}
        </p>
      </div>
    </div>
  );
};

export default FileUpload;

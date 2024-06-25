"use client";
import { uploadImage } from "@/lib/cloudinary";
import React, { useEffect, useState } from "react";

type Props = {
  imageUrl: string;
  file: File;
  handleSave: () => void;
};
const ImageComp = ({ imageUrl, file, handleSave }: Props) => {
  const [currentImageUrl, setCurrentImageUrl] = useState<string>(imageUrl);
  console.log(currentImageUrl, "currentImageUrl");

  const updateImage = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      await uploadImage(formData).then((imgUrl: any) => {
        console.log(imgUrl, "imgUrl");
        setCurrentImageUrl(imgUrl);
      });
    } catch (error) {}
  };
  useEffect(() => {
    updateImage().then(() => {
      handleSave();
    });
  }, [imageUrl]);
  return (
    <div>
      <div>
        <img
          src={currentImageUrl}
          alt="Image"
          className="w-full h-full object-cover"
        />
        <div className="text-center text-sm max-w-md mx-auto">
          <p data-p-placeholder="Type caption"></p>
        </div>
      </div>
      <p data-p-placeholder="..."></p>
    </div>
  );
};

export default ImageComp;

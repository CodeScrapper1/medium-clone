import axios from "axios";

export const uploadImage = async (formData: FormData) => {
  const file = formData.get("file");
  formData.append(
    "upload_preset",
    `${process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}`
  );

  if (!file) {
    return { error: "upload fialed" };
  }

  const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`;

  try {
    const res = await axios.post(cloudinaryUrl, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data.url;
  } catch (error) {
    return { error: "error in uploading image" };
  }
};

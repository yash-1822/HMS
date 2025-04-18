const uploadImageToCloudinary = async (imageFile) => {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "doctors"); // your preset
  
    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/dgelue5vg/image/upload", {
        method: "POST",
        body: formData,
      });
  
      const data = await response.json();
      return data.secure_url; // ✅ Cloudinary hosted image URL
    } catch (error) {
      console.error("Cloudinary upload failed:", error);
      throw error;
    }
  };

export default uploadImageToCloudinary  
  
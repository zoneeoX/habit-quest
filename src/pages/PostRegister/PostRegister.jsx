import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import supabase from "../../database/supabase";
import { v4 as uuidv4 } from "uuid";

const PostRegister = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const { username, email, password } = location?.state;

  supabase.auth.onAuthStateChange(async (event) => {
    if (event === "SIGNED_IN") {
      navigate("/success");
    }
  });

  async function getMedia(path) {
    const { data } = supabase.storage
      .from("profile_picture")
      .getPublicUrl(path);

    return data.publicUrl;
  }
  const signUp = async () => {
    try {
      const { data, error } = await supabase.storage
        .from("profile_picture")
        .upload(location?.state.username + "/" + uuidv4(), selectedImage);

      if (error) {
        console.log("Error uploading image:", error.message);
        return;
      }

      const imageUrl = await getMedia(data.path);

      await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            username: username,
            profile_picture: imageUrl,
            gender: selectedGender,
          },
        },
      });
    } catch (error) {
      console.error("Sign up error:", error.message);
      navigate("/");
    }
  };

  function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  }

  const handleGenderClick = (gender) => {
    setSelectedGender(gender);
  };

  return (
    <div className="bg-zinc-800 px-24 py-8 w-screen h-screen flex justify-center items-center flex-col gap-6 font-comfortaa">
      <div
        className="bg-neutral-100 relative w-40 h-40 rounded-full flex justify-center items-center outline-dashed outline-white cursor-pointer"
        style={{
          backgroundImage: `url(${imagePreview})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {!imagePreview && <h1>Select image.</h1>}
        <input
          type="file"
          className="absolute inset-0 opacity-0 cursor-pointer"
          accept="image/jpeg, image/png"
          size="5MB"
          onChange={handleImageUpload}
        />
      </div>
      <p className="text-white/50 font-comfortaa text-sm">
        Max is 5 mb, more than that is unacceptable.
      </p>
      <div className="flex flex-row bg-zinc-700 text-white px-4 py-2 gap-6 text-2xl font-poppins rounded-full">
        <h1
          className={`px-4 rounded-full cursor-pointer transition-all ${
            selectedGender === "Male" && "bg-zinc-600"
          }`}
          onClick={() => handleGenderClick("Male")}
        >
          Male
        </h1>
        <h2
          className={`px-4 rounded-full cursor-pointer transition-all ${
            selectedGender === "Female" && "bg-zinc-600"
          }`}
          onClick={() => handleGenderClick("Female")}
        >
          Female
        </h2>
        <h2
          className={`px-4 rounded-full cursor-pointer transition-all ${
            selectedGender === "Prefer not say" && "bg-zinc-600"
          }`}
          onClick={() => handleGenderClick("Prefer not say")}
        >
          Prefer not say
        </h2>
      </div>
      <button
        className="bg-blue-600 rounded-lg px-4 py-1 text-xl font-poppins text-white"
        onClick={signUp}
      >
        Finish
      </button>
    </div>
  );
};

export default PostRegister;

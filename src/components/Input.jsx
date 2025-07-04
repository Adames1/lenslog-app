import { useState } from "react";
import { LuUpload } from "react-icons/lu";
import { sessionAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

function Input() {
  const { uploadImage } = sessionAuth();
  const [uploading, setUpLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUpLoading(true);

    try {
      const url = await uploadImage(file);
      setImageUrl(url);
      toast.success("Imagen subida con éxito", url);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setUpLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-1 px-4 py-2 rounded-full text-gray-600 bg-gray-200 hover:bg-gray-300 transition">
        <LuUpload />
        <label htmlFor="upload-picture">
          {uploading ? "Subiendo..." : "Subir imagen"}
        </label>
      </div>
      <input
        onChange={handleFileChange}
        type="file"
        id="upload-picture"
        className="hidden"
      />
    </div>
  );
}

export default Input;

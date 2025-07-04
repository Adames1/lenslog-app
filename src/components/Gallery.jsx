import { useEffect, useState } from "react";
import { sessionAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import Masonry from "react-masonry-css";
import FsLightbox from "fslightbox-react";

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

function Gallery() {
  const { listUserImages } = sessionAuth();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toggler, setToggler] = useState(false);
  const [slide, setSlide] = useState(1);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const urls = await listUserImages();
        setImages(urls);
      } catch (error) {
        toast.error("Error fetching images. Please try again later...");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [listUserImages]);

  const openLightbox = (index) => {
    setSlide(index + 1); // fslightbox slides start at 1
    setToggler(!toggler);
  };

  return (
    <div>
      {loading && <p>Cargando imágenes...</p>}

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {images.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`imagen-${index}`}
            className="cursor-pointer rounded"
            onClick={() => openLightbox(index)}
          />
        ))}
      </Masonry>

      {!loading && images.length === 0 && <p>No hay imágenes subidas aún.</p>}

      {/* Lightbox */}
      <FsLightbox toggler={toggler} sources={images} slide={slide} />
    </div>
  );
}

export default Gallery;

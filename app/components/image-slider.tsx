import { useState } from "react";
import { Link } from "react-router";

const images = [
  "https://cdn.pixabay.com/photo/2023/02/15/10/22/backlinks-7791412_1280.png",
  "https://cdn.pixabay.com/photo/2016/03/20/17/14/seo-1268989_1280.jpg",
  "https://cdn.pixabay.com/photo/2023/02/15/10/22/backlinks-7791415_1280.png",
];

export default function CardWithSlider() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % images.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="mt-2 bg-yellow-300 w-full rounded-md shadow-lg p-6 space-y-4">
      <h1 className="text-2xl font-bold text-gray-800">Card Title</h1>
      <h2 className="text-lg font-medium text-gray-700">Card Subtitle</h2>
      <p className="text-base text-gray-600">
        This is a beautifully styled card using Tailwind CSS. You can customize
        it with content and actions.
      </p>

      <div className="relative">
        <img
          src={images[current]}
          alt={`Slide ${current + 1}`}
          className="rounded-lg w-full h-48 object-cover transition duration-300 ease-in-out"
        />

        <a
          onClick={prevSlide}
          className="cursor-pointer absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-2 py-1 rounded hover:bg-opacity-75"
        >
          ‹
        </a>
        <a
          onClick={nextSlide}
          className="cursor-pointer absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-2 py-1 rounded hover:bg-opacity-75"
        >
          ›
        </a>
      </div>
      <div className="bg-green-500 text-center rounded-2xl w-[30%] p-2 m-auto">
        <Link className="" to={"#contact"}>
          Order Now
        </Link>
      </div>
    </div>
  );
}

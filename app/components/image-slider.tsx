import { useState } from "react";
import { Link } from "react-router";

const images = [
  "/public/review-1.png",
  "/public/review-2.png",
  "/public/review-3.png",
];

export default function CardWithSlider() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % images.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="mt-2 bg-[#c03141] w-full rounded-md shadow-lg p-6 space-y-4">
      <h1 className="text-2xl font-bold text-white">Customer Review</h1>
      <h2 className="text-lg font-medium text-gray-200">
        We care about our customer feedback
      </h2>
      <p className="text-base text-gray-300">
        Because it helps us improve our products and services, ensuring we meet
        your expectations. Your opinions guide our decisions and drive us to
        deliver a better experience every time.
      </p>

      <div className="relative">
        <img
          src={images[current]}
          alt={`Slide ${current + 1}`}
          className="rounded-lg w-full h-48 object-cover transition duration-300 ease-in-out"
        />

        <a
          onClick={prevSlide}
          className="cursor-pointer absolute top-1/2 left-2 transform -translate-y-1/2 bg-[#03254c] bg-opacity-50 text-white px-2 py-1 rounded hover:bg-opacity-75"
        >
          ‹
        </a>
        <a
          onClick={nextSlide}
          className="cursor-pointer absolute top-1/2 right-2 transform -translate-y-1/2 bg-[#03254c] bg-opacity-50 text-white px-2 py-1 rounded hover:bg-opacity-75"
        >
          ›
        </a>
      </div>
      <div className="flex items-center justify-center">
        <Link
          className="text-white p-3 flex items-center justify-center w-[30%]  bg-[#03254c] text-center rounded-2xl"
          to={"#contact"}
        >
          Order Now
        </Link>
      </div>
    </div>
  );
}

import React from "react";
import { Link } from "react-router";

const AdCard = () => {
  return (
    <div className="mt-2 bg-yellow-300 w-full rounded-md shadow-lg p-6 space-y-4">
      <h1 className="text-2xl font-bold text-gray-800">Card Title</h1>
      <h2 className="text-lg font-medium text-gray-700">Card Subtitle</h2>
      <p className="text-base text-gray-600">
        This is a beautifully styled card using Tailwind CSS. You can customize
        it with content and actions.
      </p>
      <div className="bg-green-500 text-center rounded-2xl w-[30%] p-2 m-auto">
        <Link className="" to={"#contact"}>
          Order Now
        </Link>
      </div>
    </div>
  );
};

export default AdCard;

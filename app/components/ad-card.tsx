import React from "react";
import { Link } from "react-router";

const AdCard = ({ product }: any) => {
  return (
    <div className="mt-2  bg-[#c03141] w-full rounded-md shadow-lg p-6 space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-white">{product?.name}</h1>
          <h2 className="text-lg font-medium text-gray-200">Cloth for pride</h2>
          <p className="text-base text-gray-300">
            A classic color t-shirt: simple, versatile, and a timeless wardrobe
            essential.
          </p>
        </div>
        <img className="w-[10rem] rounded-xl" src={product?.productImageUrl} />
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
};

export default AdCard;

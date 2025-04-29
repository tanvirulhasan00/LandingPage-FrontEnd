import {
  TrashIcon,
  PlusCircleIcon,
  MinusCircleIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import Divider from "./divider";
import Button from "./button";
import { Link, useNavigation } from "react-router";

interface OrderSummeryProps {
  product?: any;
  shippingFeesData?: any;
  handleDelete?: any;
  selectedOption: string;
}

const OrderSummery: React.FC<OrderSummeryProps> = ({
  product,
  shippingFeesData,
  handleDelete,
  selectedOption,
}) => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "submitting";
  const unitPrice = product.price; // example unit price
  const [number, setNumber] = useState(1);
  const [shippingFees, setShippingFees] = useState(0);
  const [subTotal, setSubTotal] = useState(unitPrice);
  const [total, setTotal] = useState(unitPrice + shippingFees);
  // Convert color and size to arrays
  const colors = product.color.split(",").map((color: string) => color.trim());
  const sizes = product.size.split(",").map((size: string) => size.trim());

  // Recalculate on selectedOption or quantity change
  useEffect(() => {
    // const updatedShipping = selectedOption === "inside-dhaka" ? 60 : 100;
    let updatedShipping = 0;

    switch (selectedOption) {
      case "inside-dhaka":
        updatedShipping = shippingFeesData.insideDhaka;
        break;
      case "outside-dhaka":
        updatedShipping = shippingFeesData.outsideDhaka;
        break;
      case "pick-up":
        updatedShipping = 20;
        break;
    }
    const updatedSubTotal = unitPrice * number;
    setShippingFees(updatedShipping);
    setSubTotal(updatedSubTotal);
    setTotal(updatedSubTotal + updatedShipping);
  }, [selectedOption, number]);

  return (
    <div className="w-full">
      <input id={"total"} name="total" hidden value={total} />
      <input id={"number"} name="number" hidden value={number} />
      <div className="tracking-[2px] text-xl  text-gray-900 dark:text-white mb-5">
        <h1>Order Summery </h1>
      </div>
      <div className="w-full h-full border-none rounded-md shadow-sm shadow-gray-200 dark:shadow-gray-600">
        <div className="flex justify-between h-full p-5">
          <div className="flex gap-3">
            <div className="w-[6rem] h-[8rem] object-cover">
              <img
                src={product.productImageUrl}
                className="w-full h-full rounded-md"
              />
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <h1 className="text-sm text-gray-800 dark:text-white">
                  {product.name}
                </h1>
                <div className="flex flex-col gap-1 mt-1">
                  <select
                    name="color"
                    id="color"
                    className="text-[.8rem] text-gray-400"
                  >
                    <option selected>Color</option>
                    {colors.map((color: string, index: number) => (
                      <option key={index} value={color}>
                        {color.length ? color : "n/a"}
                      </option>
                    ))}
                  </select>
                  <select
                    name="size"
                    id="size"
                    className="text-[.8rem] text-gray-400"
                  >
                    <option selected>Size</option>
                    {sizes.map((size: string, index: number) => (
                      <option key={index} value={size}>
                        {size.length ? size : "n/a"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <h2 className="text-sm text-gray-900 dark:text-white">
                  BDT {product.price}
                </h2>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between items-center">
            <div>Quantity</div>
            {/* <TrashIcon className="text-gray-600 dark:text-gray-400 size-6 cursor-pointer" /> */}
            <div className="flex gap-3">
              <div hidden={number <= 1 ? true : false}>
                <MinusCircleIcon
                  className="text-gray-500 dark:text-gray-200 size-6 cursor-pointer"
                  onClick={() => {
                    if (number > 1) {
                      const newQuantity = number - 1;
                      const newSubTotal = unitPrice * newQuantity;
                      setNumber(newQuantity);
                      setSubTotal(newSubTotal);
                      setTotal(newSubTotal + shippingFees);
                    }
                  }}
                />
              </div>
              <h1>{number}</h1>
              <PlusCircleIcon
                className="text-gray-500 dark:text-gray-200 size-6 cursor-pointer"
                onClick={() => {
                  const newQuantity = number + 1;
                  const newSubTotal = unitPrice * newQuantity;
                  setNumber(newQuantity);
                  setSubTotal(newSubTotal);
                  setTotal(newSubTotal + shippingFees);
                }}
              />
            </div>
          </div>
        </div>
        <Divider className="mt-5 mb-5" />
        <div className="p-5">
          <div className="grid gap-3">
            <div className="grid grid-cols-2">
              <p>Subtotal</p>
              <p className="grid justify-end">BDT {subTotal}</p>
            </div>
            <div className="grid grid-cols-2">
              <p>
                Shipping fees{" "}
                {selectedOption === "inside-dhaka"
                  ? "/ inside dhaka"
                  : "/ outside dhaka"}
              </p>
              <p className="grid justify-end">BDT {shippingFees}</p>
            </div>
          </div>
          <Divider className="mt-5 mb-5" />
          <div className="grid grid-cols-2">
            <p>Total</p>
            <p className="grid justify-end">BDT {total}</p>
          </div>
        </div>
        <Divider className="mt-5 mb-5" />
        <div className="p-5 flex gap-4">
          <Button disabled={isLoading} className="w-full">
            {isLoading ? "Loading..." : "Confirm order"}
          </Button>

          <Link
            to={"#"}
            className="w-full flex items-center justify-center border-1 rounded-md hover:border-red-700"
          >
            Cancel order
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSummery;

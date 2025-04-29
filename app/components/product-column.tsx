import type { LoaderFunctionArgs } from "react-router";
import Button from "./button";

export const loader = ({ request }: LoaderFunctionArgs) => {
  console.log("co");
  return "";
};

export const columns = [
  {
    key: "productImageUrl",
    label: "Image",
    render: (val: string) => (
      <img
        src={val}
        alt="image"
        className="w-[5rem] h-[6rem] rounded-md object-cover"
      />
    ),
  },
  {
    key: "name",
    label: "Name",
    render: (val: string) => <span className="font-semibold">{val}</span>,
  },
  {
    key: "color",
    label: "Color",
  },
  {
    key: "size",
    label: "Size",
  },
  {
    key: "price",
    label: "Price",
    render: (val: string) => {
      const amount = parseFloat(val);
      const formatted = new Intl.NumberFormat("en-BD", {
        style: "currency",
        currency: "BDT",
      }).format(amount);

      return (
        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
          {formatted}
        </span>
      );
    },
  },
];

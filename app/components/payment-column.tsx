import type { LoaderFunctionArgs } from "react-router";
import Button from "./button";

export const loader = ({ request }: LoaderFunctionArgs) => {
  console.log("co");
  return "";
};

export const columns = [
  {
    key: "name",
    label: "Name",
    render: (val: string) => <span className="font-semibold">{val}</span>,
  },
  {
    key: "email",
    label: "Email",
  },
  {
    key: "role",
    label: "Role",
    render: (val: string) => (
      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
        {val}
      </span>
    ),
  },
];

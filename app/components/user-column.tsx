export const columns = [
  {
    key: "imageUrl",
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
    key: "userName",
    label: "User Number",
    render: (val: string) => <span className="font-semibold">{val}</span>,
  },

  {
    key: "phoneNumber",
    label: "Phone Number",
  },
  {
    key: "email",
    label: "Email",
  },
  {
    key: "address",
    label: "Address",
  },
  {
    key: "active",
    label: "Status",
    render: (val: string) => (
      <span
        className={`font-semibold ${
          {
            1: "text-green-500",
            0: "text-red-500",
          }[val] || ""
        }`}
      >
        {val == "1" ? "Active" : "Deactivated"}
      </span>
    ),
  },
];

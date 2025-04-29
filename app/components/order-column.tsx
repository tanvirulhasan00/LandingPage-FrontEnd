export const columns = [
  {
    key: "orderNumber",
    label: "Order Number",
    render: (val: string) => <span className="font-semibold">{val}</span>,
  },
  {
    key: "product.name",
    label: "Product Name",
    render: (val: string) => <span className="font-semibold">{val}</span>,
  },
  {
    key: "productSize",
    label: "Product Size",
    render: (val: string) => <span className="font-semibold">{val}</span>,
  },
  {
    key: "productColor",
    label: "Product Color",
    render: (val: string) => <span className="font-semibold">{val}</span>,
  },
  {
    key: "quantity",
    label: "Product Quantity",
    render: (val: string) => <span className="font-semibold">{val}</span>,
  },
  {
    key: "totalPrice",
    label: "Total Price",
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
  {
    key: "firstName",
    label: "Customer Name",
  },
  {
    key: "comment",
    label: "Customer Comment",
  },
  {
    key: "phoneNumber",
    label: "Customer Phone",
  },
  {
    key: "email",
    label: "Customer Email",
  },
  {
    key: "address",
    label: "Customer Address",
  },

  {
    key: "deliveryMethod",
    label: "Delivery Method",
  },
  {
    key: "deliveryStatus",
    label: "Delivery Status",
    render: (val: string) => {
      return (
        <span
          className={`font-semibold ${
            {
              Completed: "text-green-500",
              Failed: "text-red-500",
              "In Process": "text-yellow-500",
              Cancelled: "text-red-500",
            }[val] || ""
          }`}
        >
          {val}
        </span>
      );
    },
  },
  {
    key: "paymentMethod",
    label: "Payment Method",
  },
  {
    key: "paymentStatus",
    label: "Payment Status",
  },
];

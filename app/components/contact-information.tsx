import Label from "./label";
import Input from "./input";
import Divider from "./divider";
import RadioButton from "./radio-button";
import { useState } from "react";

type Props = {
  selectedOption: string;
  onOptionChange: (value: string) => void;
};

const ContactInformationForm = ({ selectedOption, onOptionChange }: Props) => {
  console.log("fd", selectedOption);
  const [paymentMethod, setPaymentMethod] = useState("bkash");
  const [deliveryMethod, setDeliveryMethod] = useState("home");
  const [deliveryLocation, setDeliveryLocation] = useState("");

  const [paymentAccountNumber, setPaymentAccountNumber] = useState("");
  const [paymentAccountNumberError, setPaymentAccountNumberError] =
    useState("");

  const handlePaymentNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    if (value.length <= 11) {
      setPaymentAccountNumber(value);
    }

    if (value.length < 11) {
      setPaymentAccountNumberError("Payment number must be 11 digits.");
    } else {
      setPaymentAccountNumberError("");
    }
  };

  // const handleChange = (e: any) => {
  //   onOptionChange(e.target.value),
  //     setDeliveryMethod("pickup"),
  //     setDeliveryLocation("");
  // };
  return (
    <div id="contact" className="w-full">
      {/* Contact information */}
      <div id="title" className="tracking-[2px] text-xl">
        <h1>Contact information</h1>
        <div className="mt-5">
          <Label htmlFor="email">Email address</Label>
          <Input
            name="email"
            type="email"
            placeholder="example@email.com"
            required
          />
        </div>
      </div>
      <Divider className="mt-10" />
      {/* Shipping information */}
      <div className="mt-10">
        <div className="tracking-[2px] text-xl">
          <h1>Shipping information</h1>
        </div>
        <div className="mt-5">
          <div className="w-full">
            <Label htmlFor="fullname">Full Name</Label>
            <Input name="fullname" type="text" required placeholder="name" />
          </div>
          <div className="w-full mt-5">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              name="phoneNumber"
              type="text"
              required
              placeholder="01XXXXXXXXX"
            />
          </div>

          <div className="w-full mt-5">
            <Label htmlFor="address">Full Address</Label>
            <Input
              name="address"
              type="text"
              required
              placeholder="house 20, sector 7, uttara, dhaka"
            />
          </div>
          <Divider className="mt-10" />
          {/* delivery location */}
          <div className="mt-10">
            <fieldset>
              <legend className="tracking-[2px] text-xl  text-gray-900 dark:text-white">
                Delivery Location
              </legend>
              <div className="flex gap-4 mt-5 flex-col">
                <div>
                  <RadioButton
                    id="inside-dhaka"
                    name="delivery-location"
                    label="Inside Dhaka"
                    value={"inside-dhaka"}
                    checked={selectedOption === "inside-dhaka"}
                    onChange={(e) => (
                      onOptionChange(e.target.value),
                      setDeliveryLocation("dhaka")
                    )}
                    required
                  />
                  {deliveryLocation === "dhaka" && (
                    <div className="relative mt-4 max-w-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-4 py-3 rounded-lg">
                      <p className="text-sm">
                        Inside Dhaka delivery charge will be 60tk.
                      </p>
                      <div className="absolute top-0 left-3 -translate-y-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-green-100 dark:border-b-green-900" />
                    </div>
                  )}
                </div>
                <div>
                  <RadioButton
                    id="outside-dhaka"
                    name="delivery-location"
                    label="Outside Dhaka"
                    value={"outside-dhaka"}
                    checked={selectedOption === "outside-dhaka"}
                    onChange={(e) => (
                      onOptionChange(e.target.value),
                      setDeliveryLocation("outside")
                    )}
                  />
                  {deliveryLocation === "outside" && (
                    <div className="relative mt-4 max-w-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-4 py-3 rounded-lg">
                      <p className="text-sm">
                        Outside delivery charge will be 100tk.
                      </p>
                      <div className="absolute top-0 left-3 -translate-y-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-green-100 dark:border-b-green-900" />
                    </div>
                  )}
                </div>
              </div>
            </fieldset>
          </div>
          {/* delivery method */}
          <div className="mt-10">
            <fieldset>
              <legend className="tracking-[2px] text-xl  text-gray-900 dark:text-white">
                Delivery Method
              </legend>
              <div className="flex gap-4 mt-5 flex-col">
                {/* <div>
                  <RadioButton
                    id="pick-up"
                    name="delivery-method"
                    label="Pick Up"
                    value="pick-up"
                    onChange={handleChange}
                    required
                  />
                  {deliveryMethod === "pickup" && (
                    <div className="relative mt-4 max-w-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-4 py-3 rounded-lg">
                      <p className="text-sm">
                        You have to pick up your product from our store.
                        <br />
                        <p className="text-red-500">
                          Note: you can't select delivery location
                        </p>
                      </p>
                      <div className="absolute top-0 left-3 -translate-y-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-green-100 dark:border-b-green-900" />
                    </div>
                  )}
                </div> */}
                <div>
                  <RadioButton
                    defaultChecked
                    id="home-delivery"
                    name="delivery-method"
                    label="Home Delivery"
                    value="home-delivery"
                    onChange={(e) => (
                      onOptionChange(e.target.value), setDeliveryMethod("home")
                    )}
                    required
                  />
                  {deliveryMethod === "home" && (
                    <div className="relative mt-4 max-w-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-4 py-3 rounded-lg">
                      <p className="text-sm">
                        We will deliver your product at your home.
                      </p>
                      <div className="absolute top-0 left-3 -translate-y-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-green-100 dark:border-b-green-900" />
                    </div>
                  )}
                </div>
              </div>
            </fieldset>
          </div>
          {/* Payment method */}
          <div className="mt-10">
            <fieldset>
              <legend className="tracking-[2px] text-xl  text-gray-900 dark:text-white">
                Payment Method
              </legend>
              <div className="flex gap-4 mt-5 flex-col">
                <div>
                  <RadioButton
                    defaultChecked
                    id="bkash"
                    name="payment-method"
                    label="Bkash"
                    value={"bkash"}
                    onChange={() => setPaymentMethod("bkash")}
                  />
                  {paymentMethod === "bkash" && (
                    <div className="relative mt-4 max-w-md bg-[#c03141] text-white px-4 py-3 rounded-lg">
                      {/* Arrow */}
                      <div className="absolute top-0 left-3 -translate-y-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-[#c03141]" />

                      <div>
                        <div>
                          <p>
                            To pay money to bkash, select the "Send Money"
                            option through the bkash app or directly by dialing
                            *247#.
                            <br /> Pay your total bill to our bkash number
                            "01900112233".
                          </p>
                          <p className="text-black">
                            Note: Bills can be paid through the "Send Money" or
                            "Payment" option.
                          </p>
                        </div>
                        {/* Input */}
                        <div className="mt-2">
                          <label
                            htmlFor="paymentAccountNumber"
                            className="block text-md font-medium text-white "
                          >
                            Enter your Bkash number:
                          </label>
                          <input
                            type="text"
                            id="paymentAccountNumber"
                            name="paymentAccountNumber"
                            value={paymentAccountNumber}
                            onChange={handlePaymentNumberChange}
                            className="mt-1 block w-full rounded-md p-2 border-1 border-gray-300 shadow-sm focus:border-[#d0efff] focus:ring-[#d0efff] sm:text-sm focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-[#d0efff]"
                            placeholder="01XXXXXXXXX"
                            required
                          />
                          {paymentAccountNumberError && (
                            <p className="mt-1 text-sm text-red-500">
                              {paymentAccountNumberError}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="mt-2">
                        {/* Input */}
                        <label
                          htmlFor="transactionId"
                          className="block text-md font-medium text-white"
                        >
                          Enter your Bkash Transaction ID:
                        </label>
                        <input
                          type="text"
                          id="transactionId"
                          name="transactionId"
                          className="mt-1 block w-full rounded-md p-2 border-1 border-gray-300 shadow-sm focus:border-[#d0efff] focus:ring-[#d0efff] sm:text-sm focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-[#d0efff]"
                          placeholder="TM0W200"
                          required
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <RadioButton
                    id="nagad"
                    name="payment-method"
                    label="Nagad"
                    value={"nagad"}
                    onChange={() => setPaymentMethod("nagad")}
                  />
                  {paymentMethod === "nagad" && (
                    <div className="relative mt-4 max-w-md bg-[#c03141] text-white px-4 py-3 rounded-lg">
                      {/* Arrow */}
                      <div className="absolute top-0 left-3 -translate-y-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-[#c03141]" />

                      <div>
                        <div>
                          <p>
                            To pay money from Nagad, select the "Send Money"
                            option through the nagad app or directly by dialing
                            *247#.
                            <br /> Pay your total bill to our nagad number
                            "01900112233".
                          </p>
                          <p className="text-black">
                            Note: Bills can be paid through the "Send Money" or
                            "Payment" option.
                          </p>
                        </div>
                        {/* Input */}
                        <div className="mt-2">
                          <label
                            htmlFor="paymentAccountNumber"
                            className="block text-md font-medium text-white "
                          >
                            Enter your nagad number:
                          </label>
                          <input
                            type="text"
                            id="paymentAccountNumber"
                            name="paymentAccountNumber"
                            value={paymentAccountNumber}
                            onChange={handlePaymentNumberChange}
                            className="mt-1 block w-full rounded-md p-2 border-1 border-gray-300 shadow-sm focus:border-[#d0efff] focus:ring-[#d0efff] sm:text-sm focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-[#d0efff]"
                            placeholder="01XXXXXXXXX"
                            required
                          />
                          {paymentAccountNumberError && (
                            <p className="mt-1 text-sm text-red-600">
                              {paymentAccountNumberError}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="mt-2">
                        {/* Input */}
                        <label
                          htmlFor="transactionId"
                          className="block text-md font-medium text-white "
                        >
                          Enter your nagad Transaction ID:
                        </label>
                        <input
                          type="text"
                          id="transactionId"
                          name="transactionId"
                          className="mt-1 block w-full rounded-md p-2 border-1 border-gray-300 shadow-sm focus:border-[#d0efff] focus:ring-[#d0efff] sm:text-sm focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-[#d0efff]"
                          placeholder="N2M0W20"
                          required
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <RadioButton
                    id="cash"
                    name="payment-method"
                    label="Cash On Delivery"
                    value={"cash"}
                    onChange={() => setPaymentMethod("cash")}
                  />
                  {paymentMethod === "cash" && (
                    <div className="relative mt-4 max-w-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-4 py-3 rounded-lg">
                      <p className="text-sm">
                        You will pay in cash upon delivery.
                      </p>
                      <div className="absolute top-0 left-3 -translate-y-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-green-100 dark:border-b-green-900" />
                    </div>
                  )}
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInformationForm;

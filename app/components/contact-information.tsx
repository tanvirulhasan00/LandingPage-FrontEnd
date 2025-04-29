import React from "react";
import Label from "./label";
import Input from "./input";
import Divider from "./divider";
import TextArea from "./text-area";
import RadioButton from "./radio-button";

type Props = {
  selectedOption: string;
  onOptionChange: (value: string) => void;
};

const ContactInformationForm = ({ selectedOption, onOptionChange }: Props) => {
  console.log("fd", selectedOption);
  return (
    <div className="w-full">
      {/* Contact information */}
      <div id="title" className="tracking-[2px] text-xl">
        <h1>Contact information</h1>
        <div className="mt-5">
          <Label htmlFor="email">Email address</Label>
          <Input name="email" type="email" placeholder="example@email.com" />
        </div>
      </div>
      <Divider className="mt-10" />
      {/* Shipping information */}
      <div className="mt-10">
        <div className="tracking-[2px] text-xl">
          <h1>Shipping information</h1>
        </div>
        <div className="mt-5">
          <div className="flex w-full gap-5 max-sm:flex-col">
            <div className="w-full">
              <Label htmlFor="firstname">First Name</Label>
              <Input name="firstname" type="text" />
            </div>
            <div className="w-full">
              <Label htmlFor="lastname">Last Name</Label>
              <Input name="lastname" type="text" />
            </div>
          </div>
          <div className="w-full mt-5">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input name="phoneNumber" type="text" />
          </div>
          <div className="flex w-full gap-5 max-sm:flex-col mt-5">
            <div className="w-full">
              <Label htmlFor="district">District</Label>
              <Input name="district" type="text" />
            </div>
            <div className="w-full">
              <Label htmlFor="subDistrict">Sub District</Label>
              <Input name="subDistrict" type="text" />
            </div>
          </div>
          <div className="w-full mt-5">
            <Label htmlFor="address">Address</Label>
            <Input name="address" type="text" />
          </div>

          <div className="w-full mt-5">
            <Label htmlFor="comments">Comments</Label>
            <TextArea name="comments" />
          </div>
          <Divider className="mt-10" />
          {/* delivery location */}
          <div className="mt-10">
            <fieldset>
              <legend className="tracking-[2px] text-xl  text-gray-900 dark:text-white">
                Delivery Location
              </legend>
              <div className="flex gap-4 mt-5 flex-col md:flex-row">
                <RadioButton
                  id="inside-dhaka"
                  name="delivery-location"
                  label="Inside Dhaka"
                  value={"inside-dhaka"}
                  checked={selectedOption === "inside-dhaka"}
                  onChange={(e) => onOptionChange(e.target.value)}
                  required={selectedOption === "pick-up" ? false : true}
                  disabled={selectedOption === "pick-up"}
                />
                <RadioButton
                  id="outside-dhaka"
                  name="delivery-location"
                  label="Outside Dhaka"
                  value={"outside-dhaka"}
                  checked={selectedOption === "outside-dhaka"}
                  onChange={(e) => onOptionChange(e.target.value)}
                  required={selectedOption === "pick-up" ? false : true}
                  disabled={selectedOption === "pick-up"}
                />
              </div>
            </fieldset>
          </div>
          {/* delivery method */}
          <div className="mt-10">
            <fieldset>
              <legend className="tracking-[2px] text-xl  text-gray-900 dark:text-white">
                Delivery Method
              </legend>
              <div className="flex gap-4 mt-5 flex-col md:flex-row">
                <RadioButton
                  id="pick-up"
                  name="delivery-method"
                  label="Pick Up"
                  value="pick-up"
                  // checked={selectedOption === "pick-up"}
                  onChange={(e) => onOptionChange(e.target.value)}
                  required
                />
                <RadioButton
                  defaultChecked
                  id="home-delivery"
                  name="delivery-method"
                  label="Home Delivery"
                  value="home-delivery"
                  // checked={selectedOption === "home-delivery"}
                  onChange={(e) => onOptionChange(e.target.value)}
                />
              </div>
            </fieldset>
          </div>
          {/* Payment method */}
          <div className="mt-10">
            <fieldset>
              <legend className="tracking-[2px] text-xl  text-gray-900 dark:text-white">
                Payment Method
              </legend>
              <div className="flex gap-4 mt-5 flex-col md:flex-row">
                <RadioButton
                  defaultChecked
                  id="bkash"
                  name="payment-method"
                  label="Bkash"
                  value={"bkash"}
                />
                {/* <RadioButton
                  id="nagad"
                  name="payment-method"
                  value={"nagad"}
                  label="Nagad"
                /> */}
                <RadioButton
                  id="cash"
                  name="payment-method"
                  label="Cash On Delivery"
                  value={"cash"}
                />
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInformationForm;

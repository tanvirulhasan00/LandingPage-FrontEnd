import React from "react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between items-center bg-gray-50 px-4 py-10">
      {/* Top content */}
      <div className="text-center max-w-xl space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Wanna Start a Business?
        </h1>
        <div className="space-y-2 text-lg text-gray-600">
          <p>
            <span className="font-semibold text-gray-800">Contact us:</span>{" "}
            01970-999999
          </p>
          <p>
            <span className="font-semibold text-gray-800">Our address:</span>{" "}
            123 Business Road, Dhaka, Bangladesh
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="flex items-center gap-4 border-t border-gray-300 pt-6 mt-10">
        <img src="/favicon.ico" alt="logo" className="w-6 h-6" />
        <p className="text-sm text-gray-500">
          &copy; 2025 Cookies Software Ltd. Inc. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Index;

import React from "react";
import { SignUp } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 gap-12">
      <div className="max-w-md w-full">
        <SignUp path="/sign-up" routing="path" redirectUrl="/dashboard" />
      </div>
      <Link to="/" className="mb-8 text-blue-600 text-sm">
        <i className="fa fa-arrow-left"></i> Go back home
      </Link>
    </div>
  );
};

export default SignUpPage;

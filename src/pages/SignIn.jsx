import React from "react";
import { SignIn } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
const SignInPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 gap-8">
      <div className="max-w-md w-full">
        <SignIn path="/sign-in" routing="path" redirectUrl="/dashboard" />
      </div>
      <Link to="/" className="mb-8 text-blue-600 text-sm">
        <i className="fa fa-arrow-left"></i> Go back home
      </Link>
    </div>
  );
};

export default SignInPage;

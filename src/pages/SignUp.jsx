import React from "react";
import { SignUp } from "@clerk/clerk-react";

const SignUpPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="max-w-md w-full">
        <SignUp path="/sign-up" routing="path" />
      </div>
    </div>
  );
};

export default SignUpPage;

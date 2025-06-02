import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6">
          Welcome to iNote
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-8">
          The smart way to organize your thoughts and ideas. Sign in or create
          an account to get started!
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/sign-in"
            className="px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition"
          >
            Sign In
          </Link>
          <Link
            to="/sign-up"
            className="px-6 py-3 text-blue-600 border border-blue-600 hover:bg-blue-50 rounded-lg transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Home;

import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="flex flex-col min-h-screen">
      {/* Header Section */}
      <header className="flex flex-col items-center justify-center py-16 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <h1 className="text-5xl font-bold mb-3">iNote</h1>
        <p className="text-xl mb-8">Your secure, simple note keeper.</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/sign-up"
            className="rounded-md bg-white text-blue-600 px-6 py-3 font-medium text-lg shadow-lg hover:bg-gray-100 transition-colors cursor-pointer"
          >
            Get Started
          </Link>

          <Link
            to="/sign-in"
            className="rounded-md bg-transparent border-2 border-white text-white px-6 py-3 font-medium text-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
              Sign In
          </Link>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white flex-grow">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Why Choose iNote?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-lock text-blue-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-center mb-3 text-gray-800">
                Secure Storage
              </h3>
              <p className="text-gray-600 text-center">
                Your notes are encrypted and securely stored, ensuring your data
                remains private.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-bolt text-blue-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-center mb-3 text-gray-800">
                Fast & Responsive
              </h3>
              <p className="text-gray-600 text-center">
                Lightning-fast performance across all your devices with
                real-time synchronization.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-smile text-blue-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-center mb-3 text-gray-800">
                Easy to Use
              </h3>
              <p className="text-gray-600 text-center">
                Intuitive interface designed for simplicity and efficiency in
                your daily note-taking.
              </p>
            </div>
          </div>
        </div>
      </section>
      

      {/* Footer */}
      <footer className="py-6 bg-gray-100 text-center text-gray-600">
        <p>© 2025 - Built by Qosim Abdul Rahman</p>
      </footer>
    </section>
  );
};

export default Home;

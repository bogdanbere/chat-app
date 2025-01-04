import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-blue-900 text-gray-200">
      <h1 className="text-5xl font-mono text-center text-blue-900 bg-gray-400 p-2 mb-12">
        Error - 404
      </h1>
      <p className="text-lg mb-4">An error has occurred, to continue:</p>
      <p className="text-base mb-6 text-center">* Return to our homepage.</p>
      <nav className="mt-8 text-center">
        <Link
          to="/"
          className="text-gray-200 underline px-2 py-1 hover:bg-gray-400 hover:text-blue-900 focus:bg-gray-400 focus:text-blue-900"
        >
          homepage
        </Link>
      </nav>
    </main>
  );
};

export default PageNotFound;

import React from 'react';
import pageNotFound from './not_found.svg';

function PageNotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
            <img
                src={pageNotFound}
                alt="Page Not Found"
                className="max-w-xs sm:max-w-md md:max-w-lg mb-8"
            />
            <h1 className="text-3xl md:text-5xl font-bold mb-4">404 - Page Not Found</h1>
            <p className="text-lg text-gray-400 mb-6 text-center">
                Sorry, the page you're looking for doesn't exist or has been moved.
            </p>
            <a
                href="/"
                className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition"
            >
                Go Home
            </a>
        </div>
    );
}

export default PageNotFound;

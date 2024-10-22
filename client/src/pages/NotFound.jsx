import React from 'react'
import notFound from "../assets/404.png" 
import { Link } from 'react-router-dom'

function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="text-center">
            {/* <AlertCircle className="mx-auto h-16 w-16 text-red-500 mb-4" /> */}
            <img src={notFound} alt="Not Found" className='mx-auto h-16 w-16 mb-4' />
            <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
            <p className="text-gray-600 mb-8">Oops! The page you're looking for doesn't exist.</p>
            <Link 
              to="/" 
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              Return to Home
            </Link>
          </div>
        </div>
      )
}

export default NotFound
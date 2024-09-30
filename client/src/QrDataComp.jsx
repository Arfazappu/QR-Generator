import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../config.jsx';
import './QrDataComp.css'; // Import the CSS file

import check from './assets/check.png';
import redCross from './assets/redCross.png';

const mockData = {
  name: "John Doe",
  registrationNumber: "2023-7890-1XXX",
  qrId: "QR12345",
  Date:"23-feb-2024"
};
// const FE_URL="https://qr-generator-tvao-cw8vznivn-mohammed-ajmals-projects-95362c99.vercel.app"
// const BASE_URL="https://cryptocheck-proto.onrender.com"
// const BASE_URL="http://localhost:9098"
const QrDataComponent = () => {
  const { qrId } = useParams(); // Extract QrId from the URL
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (qrId) => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/api/qr-data/${qrId}`); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const result = await response.json();
      console.log(result,"result from resu")
      setData(result);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (qrId) {
      fetchData(qrId);
    }
  }, [qrId]);

  if (loading) {
    return <p className="loading">Loading...</p>;
  }

  if (error) {
    return <p className="error">Error: {error}</p>;
  }

  return (
    // <div className="qr-data-container">
    //   <h2>QR Code Data for ID: {qrId}</h2>
    //   {data ? (
    //     <div>
    //       <h3>Details:</h3>
    //       <pre>{JSON.stringify(data, null, 2)}</pre>
    //     </div>
    //   ) : (
    //     <p>No data found for this QR ID.</p>
    //   )}
    // </div>
    <>

    {data ? (

    <div className='w-screen h-screen flex items-center justify-center'>

    <div className="w-full max-w-md mx-auto bg-white shadow-2xl rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col items-center mb-6">
          <img src={check} alt="Check" className="w-16 h-16 text-green-500 mb-2" />
          <h2 className="text-2xl font-bold text-gray-800">Data Verified</h2>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="font-medium text-gray-800">{data?.Name || mockData.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Registration Number</p>
            <p className="font-medium text-gray-800">{data?.RegisterNumber || mockData.registrationNumber}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">QR ID</p>
            <p className="font-medium text-gray-800">{data?.QrId || mockData.qrId}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Issued Date</p>
            <p className="font-medium text-gray-800">{data?.Date || mockData.Date}</p>
          </div>
        </div>
      </div>
    </div>
    </div>
    ) : (
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="w-full max-w-md mx-auto bg-white shadow-2xl rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="flex flex-col items-center mb-6">
              <img
                src={redCross} 
                alt="Red Cross"
                className="w-16 h-16 text-red-500 mb-2"
              />
              <h2 className="text-2xl font-bold text-gray-800">No Data Found For this QR</h2>
            </div>
          </div>
        </div>
      </div>
    )}

</>

  );
};

export default QrDataComponent;

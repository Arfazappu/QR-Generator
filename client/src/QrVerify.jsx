import jsQR from 'jsqr';
import QrReader from 'qrcode-reader';
import React, { useState } from 'react';
import './QrVerifyComponent.css';

const QrVerifyComponent = () => {
  const [qrData, setQrData] = useState('');
  const [info, setInfo] = useState(null);
  const [error, setError] = useState('');

  const handleFileUpload = async (e) => {
    
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;
    
    console.log("inside file upload",uploadedFile.name)
    // Validate file type
    const fileExtension = uploadedFile.name.split('.').pop().toLowerCase();
    if (!['jpg', 'jpeg', 'png'].includes(fileExtension)) {
      setError('Unsupported file type. Please upload an image (JPG, PNG).');
      return;
    }

    setError('');
    const imgURL = URL.createObjectURL(uploadedFile);
    const img = new Image();
    img.src = imgURL;

    img.onload = () => {
      // Create a canvas to draw the image
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, canvas.width, canvas.height);
      console.log("datattatat",code)
      if (code) {
        setQrData(code.data);
        console.log(qrData,"qr datatat")
        // fetchQrData(code.data); // Fetch additional info based on QR data
      } else {
        setError('No QR code found in the image.');
      }
    };
  };

  const extractQRCode = (image) => {
    const qr = new QrReader();
    qr.callback = (err, value) => {
      if (err) {
        console.error(err);
        return;
      }
      setQrData(value.result);
      fetchInfoFromBackend(value.result); // Fetch data based on QR
    };
    qr.decode(image.bitmap);

    console.log(qrData,"qr daratattftftftfttft")
  };

  const fetchInfoFromBackend = async (qrCode) => {
    // Your fetch logic here
  };
  
  return (
    <div className="qr-verify-container">
      <h2>QR Code Verification</h2>
      
      {/* File Upload Section */}
      <input
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={handleFileUpload}
        className="file-input"
      />

      

      {/* Display QR Data and Info */}
      {qrData && (
        <div className="qr-info-box">
          <h3>QR Code Data:</h3>
          <p>{qrData}</p>
        </div>
      )}

      {info && (
        <div className="info-box">
          <h3>Fetched Information:</h3>
          <pre>{JSON.stringify(info, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default QrVerifyComponent;

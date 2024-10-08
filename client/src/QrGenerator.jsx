import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import QRCode from "qrcode";
import React, { useState } from "react";
import * as XLSX from "xlsx";
import { BASE_URL, FE_URL } from '../config.jsx';
import "./App.css";
import Certificate2 from "./Certificate2";
// import certificateSample from './assets/sample1.xlsx';

//const BASE_URL = "http://localhost:9098";
// const BASE_URL = "https://cryptocheck-proto.onrender.com";
// const BASE_URL = "https://cryptocheck-proto-2seg-et9qtemzq.vercel.app";
//const FE_URL="https://qr-generator-tvao-cw8vznivn-mohammed-ajmals-projects-95362c99.vercel.app"
// const FE_URL="http://localhost:5173"

const filePaths={
  certificate:"/assets/sample1.xlsx",
  bankDocument : "/assets/sample2.xlsx"
}

const requiredParams = {
  certificate: [
    { label: "Name", example: "John Doe" },
    { label: "Course", example: "Bachelor of Science" },
    { label: "Date", example: "01-01-2024" },
    { label: "Register Number", example: "123456" }
  ],
  bankDocument: [
    { label: "Account Holder Name", example: "Jane Smith" },
    { label: "Bank Name", example: "Bank of America" },
    { label: "Cheque Number", example: "789654123" },
    { label: "Issue Date", example: "10-09-2024" }
  ]
};



const QrGenerator = () => {
  const [excelData, setExcelData] = useState([]);
  const [documentType, setDocumentType] = useState("certificate");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [currentData, setCurrentData] = useState(null);
  const [generatedCertificates, setGeneratedCertificates] = useState([]);
  const [generatedCerificateData,setGeneratedCertificateData]=useState([])
  const [isUploading, setIsUploading] = useState(false); // For loading state
  const [isUploadDisabled, setIsUploadDisabled] = useState(false); // For disabling the button
  const [alertMessage, setAlertMessage] = useState("");

  
const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet,{raw:false});
      console.log(jsonData,"json data........")
      // Set Excel data

      const parsedData = jsonData.map((row) => {
        const parsedRow = { ...row }; // Create a copy of the row
    
        // Loop through each key in the row
        for (const key in parsedRow) {
          if (parsedRow.hasOwnProperty(key)) {
            const value = parsedRow[key];
            
            // If the value is an Excel date serial number, convert it
            if (isExcelDate(value)) {
              parsedRow[key] = excelDateToJSDate(value).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric"
              }); // Convert to a readable date format
            }
          }
        }
    
        return parsedRow;
      });

      console.log(parsedData)

      setExcelData(parsedData);

      // Check if there is data in the Excel file
      if (jsonData.length > 0) {
        setCurrentData(jsonData[0]);
      } else {
        alert("No data found in the uploaded Excel file.");
      }
    };

    reader.readAsArrayBuffer(file);
  };

  // Handle QR code generation
  const generateQRCode = async (data) => {
    try {
      const url = await QRCode.toDataURL(data);
      setQrCodeUrl(url);
    } catch (err) {
      console.error("Failed to generate QR code", err);
    }
  };

  function excelDateToJSDate(serial) {
    const excelEpoch = new Date(1900, 0, 1); // Excel epoch starts on January 1, 1900
    const jsDate = new Date(excelEpoch.getTime() + (serial - 1) * 24 * 60 * 60 * 1000); // Convert serial to JS date
    return jsDate;
  }

  function isExcelDate(value) {
    return typeof value === 'number' && value > 40000; // Check for serial number typical for dates
  }

  const handleGenerate = async () => {
    if (excelData.length === 0 || !documentType) {
      alert("Please upload an Excel file and select a document type.");
      return;
    }

    const generatedData = [];
    for (const row of excelData) {
      const QrId = uniqueIdGenerator();

      try {
        // Generate QR code URL synchronously for each certificate
        const qrCodeUrl = await QRCode.toDataURL(`${FE_URL}/qr/${QrId}`);

        // Log the generated QR Code URL to check
        console.log("Generated QR Code URL:", qrCodeUrl);

        // Push generated certificate data to array
        generatedData.push({
          ...row,
          QrId,
          qrCodeUrl, // Attach the generated QR code URL to each certificate
        });

      } catch (error) {
        console.error("Error generating QR code for row", row, error);
      }
    }

    // Now set the generated certificates after the loop completes
    setGeneratedCertificates(generatedData);
    console.log(generatedData,"generated data");
    setGeneratedCertificateData(generatedData)
    
  };

  const uploadGeneratedData = async (data) => {
    try {
      const rr=await fetch(`${BASE_URL}/api`)
      console.log(rr,"test response to check auth")
      const response = await fetch(`${BASE_URL}/api/data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
      console.log("Data uploaded successfully:", result);
      
    } catch (error) {
      console.error("Error uploading data to backend:", error);
    }
  };

  

  const uniqueIdGenerator = () => {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  };

  

  const uploadCertificates = async (certificates) => {
    setIsUploading(true); 
    setAlertMessage(""); 
    try{
      await uploadGeneratedData(generatedCerificateData)
      certificates.forEach((cert) => {
        // Capture the certificate layout as an image using html2canvas
        html2canvas(document.getElementById(`cert-${cert.QrId}`), {
          scale: 2,
        }).then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
  
          const pdf = new jsPDF({
            orientation: "landscape",
            unit: "px",
            format: [canvas.width, canvas.height + 100],
          });
  
          // Add the image to the PDF
          pdf.addImage(imgData, "PNG", 0, 50, canvas.width, canvas.height, undefined, "FAST");//FAST compress the pdf
          // pdf.save(`${cert.RegisterNumber}.pdf`)
  
          // Convert the PDF to a Blob
          const pdfBlob = pdf.output("blob");
  
          // Prepare form data for the file upload
          const formData = new FormData();
          formData.append("file", pdfBlob, `${cert.RegisterNumber}.pdf`);
          formData.append("fileType", "application/pdf");
  
          // Upload the certificate PDF to the server
          fetch(`${BASE_URL}/api/upload?fileName=${cert.RegisterNumber}`, {
            method: "POST",
            body: formData,
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("Certificate uploaded successfully:", data);
            })
            .catch((error) => {
              console.error("Error uploading certificate:", error);
            });
        });
      });
      setAlertMessage("Data uploaded successfully!");
      setIsUploadDisabled(true);
      setTimeout(() => {
        setAlertMessage("");
      }, 3000);
    }
    catch(error){
      console.error("Error uploading certificates:", error);
    }
    finally{
      setIsUploading(false)
    }
     
  };
  const selectedFile=filePaths[documentType]
const selectedParams = requiredParams[documentType];

  return (
    <div className="App">
      {alertMessage && <div className="alert alert-success">{alertMessage}</div>}
        <h1 className="app-title">QR Code Generator</h1>


      <div className="upload-section">
        {/* File Upload */}
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
          className="file-input"
        />

        {/* Select Document Type */}
        <select
          value={documentType}
          onChange={(e) => setDocumentType(e.target.value)}
          className="document-select"
        >
          <option value="certificate">University of Higher Learning-Certificate</option>
          <option value="bankDocument">Bank of America-Cheque</option>
        </select>

       

        <button onClick={handleGenerate} className="generate-button">
          Generate
        </button>
      </div>

      <a href={selectedFile} download className="download-button">
        Download Excel Template
        </a>

        <div className="parameters-box">
        <h3>Required Parameters</h3>
        <ul>
          {selectedParams.map((param, index) => (
            <li key={index}>
              <strong>{param.label}:</strong> <em>{param.example}</em>
            </li>
          ))}
        </ul>
      </div>

      {/* {currentData && qrCodeUrl && (
        <>
          <Certificate
            name={currentData.Name}
            course={currentData.Course}
            date={currentData.Date}
            qrCodeUrl={qrCodeUrl}
          />
        </>
      )} */}
    {/* {successMessage && <p className="success-message">{successMessage}</p>} */}
      {generatedCertificates.length > 0 ? (
        <button
          onClick={() => uploadCertificates(generatedCertificates)}
          className={`upload-button generate-button ${
            isUploading || isUploadDisabled ? "disabled" : ""
          }`}
          disabled={isUploadDisabled || isUploading}
        >
          {isUploading ? "Loading..." : "Upload All Certificates"}
        </button>
      ) : null}

      {/* Render Generated Certificates */}
      {generatedCertificates.map((cert, index) => (
        <div
          key={index}
          id={`cert-${cert.QrId}`}
          className="certificate-cont"
        >
          {/* <Certificate
            name={cert.Name}
            course={cert.Course}
            date={cert.Date}
            qrCodeUrl={cert.qrCodeUrl}
          /> */}
          <Certificate2
            name={cert.Name}
            course={cert.Course}
            date={cert.Date}
            qrCodeUrl={cert.qrCodeUrl}
          />
        </div>
      ))}


      {/* <Certificate2/> */}
    </div>
  );
};

export default QrGenerator;

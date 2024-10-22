import React, { useState } from "react";
import PdfCard from "./components/commonComponent/PdfCard";
import pdf1 from "./assets/testpdf/pdf1.pdf";
import pdf2 from "./assets/testpdf/pdf2.pdf";
import pdf3 from "./assets/testpdf/pdf3.pdf";
import pdf4 from "./assets/testpdf/pdf4.pdf";
import { useSnackbar } from "notistack";

// const mockPDFFiles = [
//   { id: "1", file: pdf1 },
//   { id: "2", file: pdf2 },
//   { id: "3", file: pdf3 },
//   { id: "4", file: pdf4 },
// ];

function ViewData() {
  const [documentType, setDocumentType] = useState("certificate");
  const [documentData, setDocumentData] = useState([]);
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  function handleFetchData() {
    setLoading(true);
    try {
      const response = fetch(`/api/${documentType}`);
      if (!response.ok) {
        throw new Error("Response", response);
      }
      const data = response.json();
      if (data) {
        setDocumentData(data?.content);
      } else {
        setDocumentData([]);
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Error fetching data, Please try again.", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="upload-section">
        <select
          value={documentType}
          onChange={(e) => {
            setDocumentType(e.target.value);
          }}
          className="document-select"
          disabled={loading}
        >
          <option value="certificate">Certificate</option>
          <option value="cheque">Cheque</option>
        </select>

        <button
          onClick={handleFetchData}
          disabled={documentData.length > 0 || loading}
          className="generate-button min-w-fit"
        >
          {loading ? "Fetching..." : "Fetch Data"}
        </button>
      </div>

      <div className="container mx-auto p-4 mt-5">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {documentData && documentData.length > 0 ? (
            documentData.map((pdf) => <PdfCard key={pdf.id} pdf={pdf} />)
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No data files available.
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default ViewData;

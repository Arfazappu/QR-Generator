import React from 'react'

const primaryBtnStyle = 'px-4 py-2 bg-[#42B2A4] hover:bg-[#3ba094] text-white text-base font-medium rounded-md transition duration-150 ease-in-out'
const secondaryBtnStyle = 'px-4 py-2 bg-transparent hover:bg-[#3ba094] text-[#42B2A4] hover:text-white border-[1.5px] border-[#42B2A4] text-base font-medium rounded-md transition duration-150 ease-in-out';


function PdfCard({pdf}) {

    const handlePreview = () => {
        // Open the PDF in a new tab
        window.open(pdf.file, '_blank');
      };
    
      const handleDownload = () => {
        const link = document.createElement('a');
        link.href = pdf.file;
        link.download = `PDF_${pdf.id}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
    
      return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-40 bg-gray-200 flex items-center justify-center overflow-hidden">

            <svg className="w-12 h-12 text-[#7cb4ad]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="p-4">
            <p className="text-sm font-semibold truncate mb-2">{pdf.file.toString().split('/')[4]} {pdf.id}</p>
            <div className='flex items-center justify-between'>
                <button onClick={handlePreview} className={secondaryBtnStyle}>View</button>
                <button onClick={handleDownload} className={primaryBtnStyle}>Download</button>
            </div>
            {/* <button
              onClick={handleDownload}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Download
            </button> */}
          </div>
        </div>
      );
}

export default PdfCard
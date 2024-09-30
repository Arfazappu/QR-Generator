import React from "react";
import {numberToWords} from './utils/helperFunction.js'

export default function CheckTemplate({payeeName, amount, date, chequeNumber, qrCodeUrl}) {

  return (
    <div className="w-[800px] h-[360px] mx-auto my-5 bg-gradient-to-r from-blue-200 to-purple-200 text-gray-700 rounded-sm shadow-md border border-gray-300 relative overflow-hidden font-sans p-4">
      {/* Background pattern */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="circles"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx="10"
              cy="10"
              r="8"
              fill="none"
              stroke="rgba(0,0,255,0.1)"
              strokeWidth="0.5"
            />
          </pattern>
          <pattern
            id="spiral"
            x="0"
            y="0"
            width="600"
            height="600"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M300,300 L300,150 A150,150 0 0,1 450,300 A150,150 0 0,1 300,450 A150,150 0 0,1 150,300 A150,150 0 0,1 300,150"
              fill="none"
              stroke="rgba(0,0,255,0.1)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#circles)" />
        <rect x="100" y="-25" width="600" height="600" fill="url(#spiral)" />
      </svg>

      {/* Content */}
      <div className="relative z-10">
        {/* Top section */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex w-1/3 justify-between items-center">
            <div className="flex flex-col">
              <span className="text-lg">M ASHFAQ</span>
              <span className="text-sm">Toronto, Canada</span>
              <span className="text-sm">Tel: 99999-0000</span>
            </div>

            {/* QR Code placeholder */}
            <div className="w-20 h-20">
            <img src={qrCodeUrl} alt="QR Code" className='w-full h-full' />
            </div>
          </div>

          <div className="flex flex-col items-end w-1/3">
            <span className="text-sm">{chequeNumber || '000000'}</span>
            <div className="flex items-center mt-2 w-full">
              <span className="text-sm mr-2">DATE</span>
              <span className="text-sm font-bold border-b-2 w-full text-center bg-white border-gray-400 px-2 py-2">
                {date || '24-May-24'}
              </span>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="space-y-4">
          {/* Pay to the order of */}
          <div className="flex items-center">
            <span className="text-sm mr-2">PAY TO THE ORDER OF</span>
            <div className="flex-grow border-b border-gray-400">
              <span className="text-lg font-semibold text-black">
                {payeeName || 'Payee Name'}
              </span>
            </div>
            <span className="text-md ml-2">$</span>
            <div className="w-48 border-b-2 text-center bg-white border-gray-400 px-2">
              <span className="text-sm font-bold">{amount || 0}</span>
            </div>
          </div>

          {/* Amount in words */}
          <div className="flex items-center w-4/5">
            <div className="flex-grow border-b border-gray-400">
              <span className="text-lg font-semibold text-black capitalize">
                {numberToWords(amount)}
              </span>
            </div>
            <span className="text-sm ml-2">DOLLARS</span>
            {/* <span className="ml-2">🔒</span> */}
          </div>

          {/* Bank details */}
          {/* <div className="flex justify-between items-end mt-8"> */}
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-300 flex items-center justify-center text-2xl mr-2">
                B
              </div>
              <div>
                <div className="text-sm font-bold">CANADA BANK</div>
                <div className="text-xs">Toronto, Canada</div>
                <div className="text-xs">Tel: 888-9999</div>
              </div>
            </div>
          {/* </div> */}
        </div>

        <div className="flex items-center justify-between mt-3 gap-4">
          {/* Bottom section */}
          <div className="w-1/3 flex gap-2 items-end">
            <span className="text-sm">RE</span>
            <div className="flex-grow border-b border-gray-400">
              
            </div>
          </div>
          <div className="w-1/2 flex gap-2 items-end">
            <span className="text-sm">AUTHORIZED SIGNATURE</span>
            <div className="flex-grow border-b border-gray-400 text-3xl text-black font-bold font-allison">
              M Asfaq
            </div>
          </div>
        </div>

        {/* Bottom numbers */}
        <div className="flex items-center justify-between mt-4 font-mono text-sm tracking-widest">
          123456789 &nbsp;&nbsp;&nbsp; 123456789 &nbsp;&nbsp;&nbsp; 001234
          <span className='text-xs'>(QR code generated by cryptochecks.ca)</span>

        </div>
      </div>
    </div>
  );
}

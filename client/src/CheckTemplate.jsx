import React, { useState } from 'react'

export default function CheckTemplate() {
  const [date, setDate] = useState(['', '', '', '', '', '', ''])
  const [pay, setPay] = useState('')
  const [sumOf, setSumOf] = useState('')
  const [amount, setAmount] = useState('')
  const [accountNo, setAccountNo] = useState('')

  const handleDateChange = (index, value) => {
    const newDate = [...date]
    newDate[index] = value.replace(/[^0-9]/g, '')
    setDate(newDate)
  }

  return (
    <div className="w-[800px] h-[300px] mx-auto bg-gradient-to-r from-blue-200 to-purple-200 rounded-sm shadow-md border border-gray-300 relative overflow-hidden font-sans p-4">
      
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="circles" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="8" fill="none" stroke="rgba(0,0,255,0.1)" strokeWidth="0.5" />
          </pattern>
          <pattern id="spiral" x="0" y="0" width="600" height="600" patternUnits="userSpaceOnUse">
            <path d="M300,300 L300,150 A150,150 0 0,1 450,300 A150,150 0 0,1 300,450 A150,150 0 0,1 150,300 A150,150 0 0,1 300,150" fill="none" stroke="rgba(0,0,255,0.1)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#circles)" />
        <rect x="100" y="-25" width="600" height="600" fill="url(#spiral)" />
      </svg>
      
      {/* Top section */}
      <div className="flex justify-between items-start mb-5 relative z-10">
        <div className="flex items-center">
          <span className="text-xl font-bold text-[#00008B]">BANK NAME</span>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex space-x-[2px] items-center mb-1">
            {date.map((value, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={value}
                onChange={(e) => handleDateChange(index, e.target.value)}
                className="w-6 h-7 border border-gray-400 text-center bg-transparent focus:outline-none text-xs"
                aria-label={`Date digit ${index + 1}`}
              />
            ))}
          </div>
          <div className="text-[10px] text-gray-600">D D M M Y Y Y</div>
        </div>
      </div>

      {/* Main content */}
      <div className="space-y-8 relative z-10">
        {/* Pay to the order of */}
        <div className="flex justify-between items-center">
          <div className="flex-grow">
            <div className="text-xs text-gray-600 absolute -mt-4">PAY</div>
            <input
              type="text"
              value={pay}
              onChange={(e) => setPay(e.target.value)}
              className="w-full border-b border-gray-400 bg-transparent focus:outline-none text-sm py-1"
            />
          </div>
          <div className="text-xs text-gray-600 ml-4">OR BEARER</div>
        </div>

        {/* Sum of */}
        <div className="flex justify-between items-start">
          <div className="flex-grow">
            <div className="text-xs text-gray-600 absolute -mt-4">SUM OF</div>
            <input
              type="text"
              value={sumOf}
              onChange={(e) => setSumOf(e.target.value)}
              className="w-full border-b border-gray-400 bg-transparent focus:outline-none text-sm py-1"
            />
          </div>
          <div className="ml-4">
            <div className="border border-gray-400 w-32 h-12">
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ''))}
                className="w-full h-full bg-transparent text-right text-sm focus:outline-none px-2"
                aria-label="Amount in numbers"
              />
            </div>
          </div>
        </div>

        {/* Account number and signature line */}
        <div className="flex justify-between items-end">
          <div className="flex-grow">
            <div className="text-xs text-gray-600 absolute -mt-4">A/c. No.</div>
            <div className="border border-gray-400">
              <input
                type="text"
                value={accountNo}
                onChange={(e) => setAccountNo(e.target.value.replace(/[^0-9]/g, ''))}
                className="w-full bg-transparent focus:outline-none text-sm px-2 py-1"
              />
            </div>
          </div>
          <div className="ml-4 text-right">
            <div className="w-48 border-b border-gray-400"></div>
            <div className="text-[10px] text-gray-600 mt-1">Please Sign Above</div>
          </div>
        </div>
      </div>

      {/* Bottom numbers */}
      <div className="absolute bottom-4 left-4 font-mono text-sm tracking-widest text-gray-700" style={{ fontFamily: "'MICR', monospace" }}>
        :567890: 1234567890: 1234
      </div>
    </div>
  )
}
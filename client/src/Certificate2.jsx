import React from 'react'
import './Certificate2.css'

function Certificate2({ name, course, regNo, date, qrCodeUrl }) {
  return (
    <div className="w-full max-w-4xl mx-auto bg-[whitesmoke] my-5 p-8 rounded-md border border-gray-500 relative overflow-hidden">
    {/* Background Pattern */}
    <div className="absolute top-[24%] left-[32%] w-fit h-fit inset-0 opacity-5" >
        <div className="w-80 h-80 border-2 border-black rounded-full flex items-center justify-center">
        <div className="w-64 h-64 bg-black rounded-full" />
      </div>
    </div>
    
    {/* Emblem */}
    {/* <div className="absolute top-8 right-8 w-16 h-20 bg-slate-700 flex items-center justify-center">
      <div className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center">
        <div className="w-8 h-8 bg-white rounded-full" />
      </div>
    </div> */}

    <div className='ribbon'>
    <div className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center">
        <div className="w-8 h-8 bg-white rounded-full" />
      </div>
    </div>
    
    {/* Content */}
    <div className="relative z-10 font-serif text-center">
      <h1 className="text-3xl font-serif mb-2">UNIVERSITY OF HIGHER LEARNING</h1>
      <p className="text-xl mb-12">Faculty of Science Department of Medicine</p>
      
      <p className="mb-8 text-sm max-w-2xl mx-auto">
        On the recognition of successful completion of the requisite course of study
        and upon certified nominee, we hereby confer upon
      </p>

      <h2 className="text-5xl font-serif mb-1">{name}</h2>

      <p className="text-sm mb-3">({regNo})</p>


      <p className="text-xl mb-2">The degree of</p>
      <h3 className="text-3xl font-serif mb-8">{course}</h3>
      <p className="text-xs mb-2">issued on {date}</p>
      
      <div className="flex justify-between items-end mt-16">
        <div className="text-center">
          <div className="border-b border-black w-48 mb-2">
            <span className="font-allison text-3xl">Robert W.</span>
          </div>
          <p>Chairman</p>
        </div>

        <div className="text-center">
          <div className="border-b border-black w-48 mb-2">
            <span className="font-allison text-3xl">Mary Smith</span>
          </div>
          <p>Dean's Signature</p>
        </div>
      </div>
    </div>

      <div className='absolute bottom-1 left-[22%] flex flex-col items-center gap-2'>
            <img src={qrCodeUrl} alt="QR Code" className='w-20 h-20' />
            <span className='text-xs'>(This QR code is generated by cryptochecks.ca and can only be verified at cryptochecks.ca)</span>
        </div>
  </div>
  )
}

export default Certificate2

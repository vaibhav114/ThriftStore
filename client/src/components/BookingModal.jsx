const BookingModal =()=>{
    return <div>
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center">

            <div className="mt-10 flex flex-col  gap-5  text-white">
                <button className="place-self-end"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>
</button>
<div className="bg-indigo-600 rounded-xl px-20 py-10 flex flex-col items-center gap-5 max-4">
<h1 className="text-3xl font-bold max-w-md text-center">One Step Remaining</h1>
<button className="mt-4 w-full flex bg-black font-medium items-center ">Confirm Booking </button>
</div>
            </div>
        
        </div>
    </div>
}

export default BookingModal
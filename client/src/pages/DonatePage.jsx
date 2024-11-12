"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DonatePage = () => {
  const [donationData, setDonationData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    amount: '',
  });

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      
      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };    

      document.body.appendChild(script);
    });
  };

  const onPayment = async (amount, name) => {
    try {
      const options = {
        amount: amount,
        name: name,
      };

      const res = await axios.post('http://localhost:5000/api/createOrder', options);
      const data = res.data;
      console.log(data);

      const paymentObject = new window.Razorpay({
        key: "rzp_test_GcZZFDPP0jHtC4",
        order_id: data.id,
        ...data,
        handler: function(response) {
          console.log(response);
      
          const options2 = {
            order_id: response.razorpay_order_id,
            payment_id: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            ...donationData,
          };
      
          axios.post('http://localhost:5000/api/verifyPayment', options2)
            .then((res) => {
              console.log(res.data);
              if (res.data.success) {
                alert('Payment successful');
              } else {
                alert('Payment failed');
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
      
      paymentObject.open();
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadScript('https://checkout.razorpay.com/v1/checkout.js');
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDonationData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    
    onPayment(donationData.amount, donationData.name); 
  };

  return (  
    <div className="flex">
      <div>
        <div className="ml-32 mt-8">
          <img src="/logo.png" alt="LOGO" className="w-32" />
        </div>
        <div className="mt-8 ml-32">
          <h2 className="font-bold text-2xl">Make a Donation</h2>
          <h3 className="tracking-wider font-semibold mt-2">Thank you for your generosity!</h3>
        </div>
        <form onSubmit={handleSubmit} className="ml-32 mt-6 mr-64">
          <div>
            <div className="mt-6">
              <h3>Name *</h3>
              <input
                type="text"
                className="mt-4 p-2 border border-gray-300 rounded-md w-72"
                placeholder="NAME"
                name="name"
                value={donationData.name}
                onChange={handleChange}
              />
            </div>
            <div className="mt-6">
              <h3>Email *</h3>
              <input
                type="email"
                className="mt-4 p-2 border border-gray-300 rounded-md w-72"
                placeholder="EMAIL"
                name="email"
                value={donationData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mt-6">
              <h3>Phone Number *</h3>
              <input
                type="text"
                className="mt-4 p-2 border border-gray-300 rounded-md w-72"
                placeholder="PHONE NUMBER"
                name="phone"
                value={donationData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="mt-6">
              <h3>Location *</h3>
              <input
                type="text"
                className="mt-4 p-2 border border-gray-300 rounded-md w-72"
                placeholder="LOCATION"
                name="location"
                value={donationData.location}
                onChange={handleChange}
              />
            </div>
            <div className="mt-6">
              <h3>Amount *</h3>
              <input
                type="number"
                className="mt-4 p-2 border border-gray-300 rounded-md w-72"
                placeholder="AMOUNT"
                name="amount"
                value={donationData.amount}
                onChange={handleChange}
              />
            </div>
            <div className="mt-6 flex justify-center">
              <button type="submit" className="border p-2 pl-6 pr-6 bg-green-400">
                Donate
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="grow h-screen">
        <img src="/regpage3.jpg" alt="Donation Display" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default DonatePage;
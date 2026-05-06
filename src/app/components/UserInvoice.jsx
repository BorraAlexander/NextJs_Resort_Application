"use client";

import React, { useEffect, useState } from "react";

const UserInvoice = ({ userId }) => {
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fatchInvoice() {
      try {
        const response = await fetch(
          `http://localhost:3000/api/users/${userId}`,
        );
        const newData = await response.json();

        if (response.ok) {
          setInvoice(newData.data);
        } else {
          throw new Error(newData.message);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fatchInvoice();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error : {error}</div>;
  }

  if (!invoice || !invoice.bookings) {
    return <div>No invoice Data Found</div>;
  }

  const calulateDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const difference = Math.abs(end - start);
    const days = Math.ceil(difference / (1000 * 60 * 60 * 24)) + 1;
    return days;
  };

  const deleteBooking = async (bookingId) => {
    const isConfirm = window.confirm(
      "Are you sure you want to delete this booking?",
    );
    if (!isConfirm) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/users/${bookingId}`,
        {
          method: "DELETE",
        },
      );
      const result = await response.json();
      if (response.ok) {
        setInvoice((preInvoice) => ({
          ...preInvoice,
          bookings: preInvoice.bookings.filter(
            (item) => item._id !== bookingId,
          ),
        }));
       
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div className="invoice-container">
      <h1>UserName: {invoice.username}</h1>
      {invoice.bookings.length > 0 ? (
        invoice.bookings.map((item) => {
          const days = calulateDays(item.startDate, item.endDate);
          const discountedPrice = item.price * (1 - item.offer / 100);
          const totalAmount = days * discountedPrice;

          return (
            <div className="booking-item" key={item._id}>
              <h3>{item.productName}</h3>
              <p>
                Booking dates from {item.startDate} to {item.endDate}
              </p>
              <p>Discount: {item.offer}%</p>
              <p>Number of Days: {days}</p>
              <h4>Price per day: {item.price}</h4>
              <h4>Total Amount: {totalAmount}</h4>
              <div align="center">
                <button
                  className="deleteBtn"
                  onClick={() => deleteBooking(item._id)}
                >
                  Delete Booking
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <div className="no-bookings">
          <h2>No Bookings Found</h2>
        </div>
      )}
    </div>
  );
};

export default UserInvoice;

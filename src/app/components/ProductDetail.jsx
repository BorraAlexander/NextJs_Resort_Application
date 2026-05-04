"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import CalenderComponent from "./CalenderComponent";
import { Circles } from "react-loader-spinner";
import { bookingAction } from "../serverActions/bookingAction";
const ProductDetail = () => {
  const [record, setRecord] = useState({});
  const [selectedDates, setSelectedDates] = useState(null);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    async function dynamicProductHandler() {
      try {
        const response = await fetch(
          `https://resort-booking-app-mauve.vercel.app/api/admin/product/${id}`,
        );
        const result = await response.json();
        setRecord(result.data);
      } catch (error) {
        console.log(error);
      }
    }

    dynamicProductHandler();
  }, [id]);

  const bookingHandler = async () => {
    if (!selectedDates) {
      alert("Please select a date");
      return;
    }
    const bookingDetails = { selectedDates, record };
    try {
      const response = await bookingAction(bookingDetails);
      if (response.success) {
        alert("Booking Successfully");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDateSelect = (dates) => {
    setSelectedDates(dates);
  };

  //
  return (
    <div>
      <CalenderComponent onDatesSelect={handleDateSelect} />
      <Link href="/">
        <h4 align="center">Go Back</h4>
      </Link>
      {record ? (
        <div className="">
          <div className="singleSection">
            <div className="singleLeft">
              <div className="">
                <h2>{record.title}</h2>
              </div>

              <img
                src={record.image}
                alt={record.title}
                className="singleImage"
              />
            </div>
            <div className="singleCenter">
              <div className="singlePrice">Rs/- {record.price}</div>
              <p className="singleDesc">{record.desc}</p>
              <div className="">
                {record.amen?.map((item, i) => {
                  return (
                    <div className="singleAmen" key={i}>
                      <span>*</span> {item}
                    </div>
                  );
                })}
              </div>
              <div className="offer">
                <span>*</span>
                <button> Discount {record.offer}%</button>
              </div>
              <div className="singleBtn">
                <button className="" onClick={bookingHandler}>
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h1 style={{ position: "absolute", top: "50%", left: "50%" }}>
          <Circles
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </h1>
      )}
    </div>
  );
};

export default ProductDetail;

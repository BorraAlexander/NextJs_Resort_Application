"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Circles } from "react-loader-spinner";

const ProductCollection = () => {
  const [collections, setCollections] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCollections = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://resort-booking-app-mauve.vercel.app/api/admin/add-product`,
        );
        const newData = await response.json();
        setCollections(newData.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCollections();
  }, []);

  return (
    <div className="productSection">
      <h1 align="center">Select Your Stay</h1>
      {loading && (
        <Circles
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      )}
      {error && <p>{error}</p>}
      {collections ? (
        collections.map((item) => {
          return (
            <div key={item._id} className="proDetail">
              <div className="left">
                <div className="title">{item.title}</div>
                <br />
                <img src={item.image} alt={item.title} className="roomImage" />
              </div>
              <div className="center">
                <div className="pamen">
                  <h2 className="price">Rs/- {item.price}</h2>
                  <div>
                    <h3 style={{ marginTop: "10px" }}>Amenities</h3>
                    {item.amen.map((serve, i) => {
                      return (
                        <div className="amenities" key={i}>
                          <div>*{serve}</div>
                        </div>
                      );
                    })}
                  </div>
                  <div style={{ marginTop: "15px", color: "black" }}>
                    <p>{item.desc}</p>
                  </div>
                  <div style={{ marginTop: "15px", color: "black" }}>
                    <p
                      style={{
                        fontWeight: "bold",
                        color: "gray",
                        textDecoration: "underline",
                      }}
                    >
                      {item.offer}% Offer
                    </p>
                  </div>
                </div>
              </div>
              <div className="right">
                <Link href={`/detail/${item._id}`}>
                  <button className="detail">Details</button>
                </Link>
              </div>
            </div>
          );
        })
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <Circles
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      )}
    </div>
  );
};

export default ProductCollection;

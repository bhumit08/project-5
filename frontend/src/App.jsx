import React, { useEffect, useState } from "react";

const App = () => {
  useEffect(() => {
    const fetchProductDetail = async () => {
      console.log("Fetching...");

      const url =
        "https://asos2.p.rapidapi.com/products/detail?id=1&lang=en-US&store=US&currency=0&sizeSchema=US";

      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key": "1b8612a07amshb6cdd0e16e62833p1f9939jsncea77f142486",
          "x-rapidapi-host": "asos2.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
      } catch (err) {
        console.error("API Error:", err); // This will show the real error
      }
    };

    fetchProductDetail();
  }, []);

  return (
    <>
    <h1>hello</h1>
    </>

   );
};

export default App;

import React, { useEffect } from "react";
import { useGlobalContextCarousal } from "../store/carousalStore";

const Carousel = () => {
  const { dataList, isLoading, currentIndex, dispatchData } =
    useGlobalContextCarousal();

  const fetchDogsData = async (signal) => {
    dispatchData({ type: "SET_LOADING" });
    try {
      const response = await fetch(
        `https://api.thedogapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=10`,
        {
          headers: {
            "x-api-key": import.meta.env.VITE_DOG_API_KEY,
          },
          signal,
        }
      );
      const data = await response.json();
      console.log(data);

      dispatchData({
        type: "SET_DATA",
        payload: {
          dataList: data,
        },
      });
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("Fetch aborted");
      } else {
        console.log("Error fetching data", error);
      }
      // dispatchData({ type: "SET_LOADING" });
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    dispatchData({
      type: "SET_DATA",
      payload: {
        dataList: [],
      },
    });

    dispatchData({
      type: "SET_INDEX",
      payload: {
        currentIndex: 0,
      },
    });

    fetchDogsData(signal);

    return () => {
      controller.abort();
    };
  }, [dispatchData]);

  const handleMoveSlider = (n) => {
    let newIndex = currentIndex + n;
    if (newIndex < 0) {
      newIndex = 0;
    }

    dispatchData({
      type: "SET_INDEX",
      payload: { currentIndex: newIndex },
    });
  };

  return (
    <div className="slider">
      <div className="slider-container">
        <div className="desciption-bar">
          <div className="description">Everyday is a Dog Day</div>
          <div className="arrow-btn">
            <button
              className="prev"
              onClick={() => handleMoveSlider(-1)}
              disabled={currentIndex === 0}
            >
              &#10094;
            </button>
            <button
              className="next"
              onClick={() => handleMoveSlider(1)}
              disabled={currentIndex >= dataList.length - 1}
            >
              &#10095;
            </button>
          </div>
        </div>
        <div
          className="slider-plate"
          style={{ transform: `translateX(${-currentIndex * 434.5}px)` }}
        >
          {isLoading ? (
            <p style={{ fontSize: "30px", marginLeft: "7px" }}>Loading...</p>
          ) : (
            dataList.map((item, index) => (
              <div className="slider-item" key={index}>
                <img
                  className="image"
                  src={item.url}
                  style={{ width: "26rem", height: "53%" }}
                  alt={`Dog ${index + 1}`}
                />
                <div className="details">
                  <div className="name">{item.breeds[0].name}</div>
                  <div className="location">{item.breeds[0].origin || "-"}</div>
                  <div className="life-span">{item.breeds[0].life_span}</div>
                  <div className="temperament">
                    {item.breeds[0].temperament}
                  </div>
                  <div className="bred-for">{item.breeds[0].bred_for}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Carousel;

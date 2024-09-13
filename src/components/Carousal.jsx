import { useContext, useEffect } from "react";
import { CarousalContext } from "../store/carousalStore";

const Carousel = () => {
  const { state, dispatchData } = useContext(CarousalContext);
  const { dataList, isLoading, currentIndex } = state;

  const fetchDogsData = async (signal, append = false) => {
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

      dispatchData({
        type: "SET_DATA",
        payload: {
          dataList: append ? [...dataList, ...data] : data,
        },
      });
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("Fetch aborted");
      } else {
        console.log("Error fetching data", error);
      }
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    if (dataList.length === 0) {
      fetchDogsData(signal);
    }

    return () => {
      controller.abort();
    };
  }, [dataList]);

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

  const handleLoadMore = () => {
    const controller = new AbortController();
    const { signal } = controller;

    fetchDogsData(signal, true);
  };

  return (
    <div className="slider">
      <div className="slider-container">
        <div className="description-bar">
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
              disabled={currentIndex >= dataList.length - 2}
            >
              &#10095;
            </button>
          </div>
        </div>
        <div
          className="slider-plate"
          style={{ transform: `translateX(${-currentIndex * 434}px)` }}
        >
          {isLoading && currentIndex === 0 ? (
            <p style={{ fontSize: "30px", marginLeft: "7px" }}>Loading...</p>
          ) : (
            <>
              {dataList.map((item, index) => (
                <div className="slider-item" key={index}>
                  <img
                    className="image"
                    src={item.url}
                    style={{ width: "26rem", height: "53%" }}
                    alt={`Dog ${index + 1}`}
                  />
                  <div className="details">
                    <div className="name">{item.breeds[0]?.name}</div>
                    <div className="location">
                      {item.breeds[0]?.origin || "-"}
                    </div>
                    <div className="life-span">{item.breeds[0]?.life_span}</div>
                    <div className="temperament">
                      {item.breeds[0]?.temperament}
                    </div>
                    <div className="bred-for">{item.breeds[0]?.bred_for}</div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="slider-item loading-placeholder">
                  <div
                    style={{
                      width: "26rem",
                      height: "53%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "1.5rem",
                      color: "gray",
                    }}
                  >
                    Loading...
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <div className="load-more-container">
        <center>
          <button
            className="load-more"
            onClick={handleLoadMore}
            disabled={isLoading || currentIndex < dataList.length - 2}
          >
            Load More
          </button>
        </center>
      </div>
    </div>
  );
};

export default Carousel;

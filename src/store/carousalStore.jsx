import React, { useReducer } from "react";

const initialStateCarousal = {
  currentIndex: 0,
  isLoading: false,
  dataList: [],
};

const CarousalContext = React.createContext();

const carousalReducer = (state, action) => {
  switch (action.type) {
    case "SET_DATA":
      return {
        ...state,
        dataList: action.payload.dataList,
        isLoading: false,
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "SET_INDEX":
      return {
        ...state,
        currentIndex: action.payload.currentIndex,
      };
    default:
      return state;
  }
};

const CarousalProvider = ({ children }) => {
  const [state, dispatchData] = useReducer(
    carousalReducer,
    initialStateCarousal
  );

  return (
    <CarousalContext.Provider value={{ state, dispatchData }}>
      {children}
    </CarousalContext.Provider>
  );
};

export { CarousalContext, CarousalProvider };

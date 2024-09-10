import React, { useContext, useEffect, useReducer } from "react";

// initial State
const initialStateCarousal = {
  currentIndex: 0,
  isLoading: false,
  dataList: [],
};

// creator
const CarousalContext = React.createContext();

// reducer function
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

// provider
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

// custom hook
const useGlobalContextCarousal = () => {
  const { state, dispatchData } = useContext(CarousalContext);
  return { ...state, dispatchData };
};

export { CarousalContext, CarousalProvider, useGlobalContextCarousal };

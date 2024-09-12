import React, { useContext, useReducer } from "react";

// initial State
const initialStatePagination = {
  currentPage: 1,
  isLoading: false,
  dataList: [],
  dataCache: {}, // Add this to store data by page
};

// context creator
const PaginationContext = React.createContext();

// reducer function
const paginationReducer = (state, action) => {
  switch (action.type) {
    case "SET_DATA":
      return {
        ...state,
        dataList: action.payload.dataList,
        dataCache: {
          ...state.dataCache,
          [action.payload.page]: action.payload.dataList, // Cache data by page
        },
        isLoading: false,
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "SET_PAGE":
      return {
        ...state,
        currentPage: action.payload.currentPage,
        isLoading: true,
      };
    default:
      return state;
  }
};

// provider
const PaginationProvider = ({ children }) => {
  const [state, dispatchData] = useReducer(
    paginationReducer,
    initialStatePagination
  );

  return (
    <PaginationContext.Provider value={{ state, dispatchData }}>
      {children}
    </PaginationContext.Provider>
  );
};

// custom hook
const useGlobalContextPagination = () => {
  const { state, dispatchData } = useContext(PaginationContext);
  return { ...state, dispatchData };
};

export { PaginationContext, PaginationProvider, useGlobalContextPagination };

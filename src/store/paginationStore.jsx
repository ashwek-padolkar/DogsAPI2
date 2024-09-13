import React, { useReducer } from "react";

const initialStatePagination = {
  currentPage: 1,
  isLoading: false,
  dataList: [],
  dataSave: {},
};

const PaginationContext = React.createContext();

const paginationReducer = (state, action) => {
  switch (action.type) {
    case "SET_DATA":
      return {
        ...state,
        dataList: action.payload.dataList,
        dataSave: {
          ...state.dataSave,
          [action.payload.page]: action.payload.dataList,
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

export { PaginationContext, PaginationProvider };

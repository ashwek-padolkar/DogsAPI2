import { useGlobalContextPagination } from "../store/paginationStore";
import DataItem from "./DataItem";
import Pagination from "./Pagination";
import { useEffect } from "react";

const DataTable = () => {
  const { dataList, isLoading, currentPage, dispatchData, dataCache } =
    useGlobalContextPagination();

  const fetchDogsData = async (page, signal) => {
    // Check if the data for this page is already in the cache
    if (dataCache[page]) {
      dispatchData({
        type: "SET_DATA",
        payload: {
          dataList: dataCache[page],
          page,
        },
      });
      return;
    }

    // Fetch new data if not cached
    dispatchData({ type: "SET_LOADING" });
    try {
      const response = await fetch(
        `https://api.thedogapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=${
          page - 1
        }&limit=10`,
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
          dataList: data,
          page, // Include the page number when caching
        },
      });
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("Fetch aborted");
      } else {
        console.log("Error fetching data", error);
      }
      dispatchData({ type: "SET_LOADING" });
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    fetchDogsData(currentPage, signal);

    return () => {
      controller.abort();
    };
  }, [currentPage, dispatchData]);

  return (
    <>
      <table style={{ height: "539.2px" }} className="table">
        <>
          <thead>
            <tr>
              <th style={{ width: "10rem" }}>Breed Name</th>
              <th style={{ width: "15rem" }}>Bred For</th>
              <th style={{ width: "10rem" }}>Breed Group</th>
              <th style={{ width: "10rem" }}>Life Span</th>
              <th style={{ width: "25rem" }}>Temperament</th>
              <th style={{ width: "7rem" }}>Origin</th>
            </tr>
          </thead>
          {isLoading ? (
            <tr>
              <td
                style={{
                  fontSize: "1.5rem",
                  color: "gray",
                }}
              >
                Loading...
              </td>
            </tr>
          ) : (
            <tbody>
              {dataList.map((item) => (
                <DataItem key={item.id} item={item} />
              ))}
            </tbody>
          )}
        </>
      </table>

      <Pagination />
    </>
  );
};

export default DataTable;

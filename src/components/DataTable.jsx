import { useGlobalContextPagination } from "../store/paginationStore";
import DataItem from "./DataItem";
import Pagination from "./Pagination";
import { useEffect } from "react";

const DataTable = () => {
  const { dataList, isLoading, currentPage, dispatchData } =
    useGlobalContextPagination();

  const fetchDogsData = async (page, signal) => {
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

    dispatchData({
      type: "SET_DATA",
      payload: {
        dataList: [],
      },
    });

    fetchDogsData(currentPage, signal);

    return () => {
      controller.abort();
    };
  }, [currentPage, dispatchData]);

  return (
    <>
      <table style={{ height: "539.2px" }} className="table">
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", fontSize: "30px" }}>
                Loading...
              </td>
            </tr>
          ) : (
            <>
              <tr>
                <th>Breed Name</th>
                <th>Bred For</th>
                <th style={{ width: "84px" }}>Breed Group</th>
                <th>Life Span</th>
                <th>Temperament</th>
                <th>Origin</th>
              </tr>
              {dataList.map((item) => (
                <DataItem key={item.id} item={item} />
              ))}
            </>
          )}
        </tbody>
      </table>

      <Pagination />
    </>
  );
};

export default DataTable;

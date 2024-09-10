const DataItem = ({ item }) => {
  return (
    <tr>
      <td>{item.breeds[0].name || "N/A"}</td>
      <td>{item.breeds[0].bred_for || "N/A"}</td>
      <td>{item.breeds[0].breed_group || "N/A"}</td>
      <td>{item.breeds[0].life_span || "N/A"}</td>
      <td>{item.breeds[0].temperament || "N/A"}</td>
      <td>{item.breeds[0].origin || "N/A"}</td>
    </tr>
  );
};

export default DataItem;

import React, { useEffect, useState } from "react";

const FetchData: React.FC = () => {
  const [data, setData] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${apiUrl}/posts/1`)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error("Error fetching data:", error));
  }, [apiUrl]);

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

export default FetchData;

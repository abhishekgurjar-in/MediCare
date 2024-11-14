import { useEffect, useState } from "react";
import { token } from "../config"; // Assuming your token is being imported correctly.

const useFetchData = (url) => {
  const [data, setData] = useState([]); // If you're sure the data will be an array, otherwise use `null`.
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` }, // Proper string interpolation using backticks.
        });
        const result = await res.json();
        if (!res.ok) {
          throw new Error(result.message || "Error fetching data");
        }
        setData(result.data); // Assuming the API response contains `data` in its body.
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return {
    data,
    loading,
    error,
  };
};

export default useFetchData;

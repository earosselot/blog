import { useState, useEffect, useCallback } from 'react';

function useFetch({url, init, processData}) {
  // Response state
  const [data, setData] = useState({});

  // Turn objects into strings for useCallback & useEffect dependencies
  const [stingifiedUrl, stringifiedInit] = [JSON.stringify(url), JSON.stringify(init)]

  // If no processing data is passed just cast the object
  // The callback hook ensures that the function is only created once, avoiding an infinite loop.
  const processJson = useCallback(processData || ((jsonBody) => jsonBody), []);

  useEffect(() => {

    const fetchApi = async () => {
      try {
        const response = await fetch(url, init);

        if (response.status === 200) {
          const rawData = await response.json();
          const processedData = processJson(rawData);
          setData(processedData);
        } else {
          console.error(`Error ${response.status} ${response.statusText}`);
        }
      } catch (error) {
        console.error(`Error ${error}`);
      }
    };
    fetchApi();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stingifiedUrl, stringifiedInit, processJson]);

  return data;
}

export default useFetch;

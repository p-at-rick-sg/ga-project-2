import {useState} from 'react';

const useFetch = () => {
  const [data, setData] = useState([]);

  const fetchData = async (url, reqOptions) => {
    try {
      const response = await fetch(url, reqOptions);
      if (!response.ok) {
        console.log('response not OK');
        throw new Error(response.statusText);
      }
      const responseData = await response.json();
      setData(responseData);
    } catch (err) {
      if (err.name === 'AbortError') {
        console.log('the fetch was aborted');
      } else {
        //setIsPending(false);
        setError('Could not fetch the data');
      }
    }
  };
  return [data, fetchData];
};

export default useFetch;

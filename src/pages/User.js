import { useEffect, useState } from "react";

export default function User() {
  const URL = "https://api.hatchways.io/assessment/students";
  const [results, setResults] = useState([]);

  function fetchData(url) {
    return fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .catch(error => console.error("Bad request", error));
  }

  useEffect(() => {
    fetchData(URL).then(data => {
      setResults(data);
    });
  }, []);

  return <div>stuff is here</div>;
}

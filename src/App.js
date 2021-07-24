import { useEffect, useState } from "react";

function App() {
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

  return (
    <div>
      <h1>New React Project</h1>
    </div>
  );
}

export default App;

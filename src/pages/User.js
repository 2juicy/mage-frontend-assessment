import { useEffect, useState } from "react";
import Thumbnail from "../components/Thumbnail";

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
      setResults(data.students);
    });
  }, []);

  console.log(results);

  return (
    <div>
      <h1>Searchbar and title here</h1>
      {results.map(result => (
        <div className="flex-container" key={result.email}>
          <Thumbnail thumbnail={result.pic} />
          <h2>
            {result.firstName} {result.lastName}
          </h2>
        </div>
      ))}
    </div>
  );
}

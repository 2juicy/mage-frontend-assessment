import "./User.css";
import { useState, useEffect } from "react";
import Thumbnail from "../components/Thumbnail/Thumbnail";

export default function User() {
  const URL = "https://api.hatchways.io/assessment/students";
  const [results, setResults] = useState([]);
  const [filter, setFilter] = useState([]);
  const [search, setSearch] = useState("");

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
      setFilter(data.students);
    });
  }, []);

  const filterInput = input => {
    let filterArr = [];
    results.forEach(results => {
      if (
        results.firstName
          .toLowerCase()
          .replace(/\s/g, "")
          .indexOf(input.toLowerCase().replace(/\s/g, "")) > -1 ||
        results.lastName
          .toLowerCase()
          .replace(/\s/g, "")
          .indexOf(input.toLowerCase().replace(/\s/g, "")) > -1
      ) {
        filterArr.push(results);
      }
    });
    setFilter(filterArr);
  };

  function findAverage(arr) {
    return arr.reduce(function (avg, value, _, { length }) {
      return avg + value / length;
    }, 0);
  }

  return (
    <div>
      <h1>Searchbar and title here</h1>
      <input
        value={search}
        onFocus={() => {
          setSearch("");
          filterInput("");
        }}
        onChange={e => setSearch(e.target.value)}
        onKeyUp={e => filterInput(e.target.value.trim())}
        label="Search"
        placeholder="Search/Filter"
      />
      {filter.map(result => (
        <div className="flex-container" key={result.id}>
          <Thumbnail thumbnail={result.pic} />
          <div className="user-info">
            <h2>
              {result.firstName} {result.lastName}
            </h2>
            <p>Email: {result.email}</p>
            <p>Company: {result.company}</p>
            <p>Skill: {result.skill}</p>
            <p>Average: {findAverage(result.grades)}%</p>
          </div>
        </div>
      ))}
    </div>
  );
}

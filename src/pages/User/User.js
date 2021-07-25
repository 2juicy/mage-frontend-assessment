import "./User.css";
import { useState, useEffect } from "react";
import UserInfo from "../../components/UserInfo/UserInfo";
import Searchbar from "../../components/Searchbar/Searchbar";

export default function User() {
  const URL = "https://api.hatchways.io/assessment/students";
  const [results, setResults] = useState([]);
  const [filter, setFilter] = useState([]);

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
      data.students.forEach(student => {
        student.show = false;
        student.tags = [];
      });
      setFilter(data.students);
    });
  }, []);

  function filterInput(input) {
    let filterArr = [];
    results.forEach(results => {
      if (
        results.firstName
          .concat(" ", results.lastName)
          .toLowerCase()
          .replace(/\s/g, "")
          .indexOf(input.toLowerCase().replace(/\s/g, "")) > -1
      ) {
        filterArr.push(results);
      }
    });
    setFilter(filterArr);
  }

  function findAverage(arr) {
    return arr.reduce(function (avg, value, _, { length }) {
      return avg + value / length;
    }, 0);
  }

  function handleExpand(index) {
    filter[index].show = !filter[index].show;
    setFilter([...filter]);
  }

  function addTag(tags, index) {
    filter[index].tags = [...filter[index].tags, tags];
    setFilter([...filter]);
  }
  console.log(filter);

  return (
    <div className="paper">
      <Searchbar placeholder="Search by name" handleSearch={filterInput} />
      <Searchbar placeholder="Search by tag" handleSearch={filterInput} />
      <UserInfo
        users={filter}
        findAverage={findAverage}
        handleExpand={handleExpand}
        addTag={addTag}
      />
    </div>
  );
}

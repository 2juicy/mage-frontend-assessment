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

  function filterName(name) {
    let filterArr = [];
    results.forEach(result => {
      if (
        result.firstName
          .concat(" ", result.lastName)
          .toLowerCase()
          .replace(/\s/g, "")
          .indexOf(name.toLowerCase().replace(/\s/g, "")) > -1
      ) {
        filterArr.push(result);
      }
    });

    // filteredArr.forEach(filtered => {
    //   if (filtered.tags) {

    //   }
    // })
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
      <Searchbar placeholder="Search by name" handleSearch={filterName} />
      <Searchbar
        placeholder="Search by tag"
        handleSearch={() => console.log("nothing")}
      />
      <UserInfo
        users={filter}
        findAverage={findAverage}
        handleExpand={handleExpand}
        addTag={addTag}
      />
    </div>
  );
}

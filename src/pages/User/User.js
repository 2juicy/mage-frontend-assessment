import "./User.css";
import { useState, useEffect } from "react";
import UserInfo from "../../components/UserInfo/UserInfo";

export default function User() {
  // Stored fetch request data
  const URL = "https://api.hatchways.io/assessment/students";
  const [results, setResults] = useState([]);
  // Search plus filtered results
  const [filter, setFilter] = useState([]);
  const [name, setName] = useState("");
  const [tag, setTag] = useState("");

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

  function filterResults(name, tag) {
    // First we filter by name
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

    // If a tag parameter exists we then continue to filter by tag
    if (tag.length > 0) {
      let filterTag = [];
      filterArr.forEach(result => {
        if (result.tags.length > 0) {
          result.tags.forEach(data => {
            if (
              data
                .toLowerCase()
                .replace(/\s/g, "")
                .indexOf(tag.toLowerCase().replace(/\s/g, "")) > -1
            ) {
              filterTag.push(result);
            }
          });
        }
      });
      return setFilter(filterTag);
    }
    return setFilter(filterArr);
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

  return (
    <div className="paper">
      <input
        className="searchbar"
        value={name}
        onChange={e => setName(e.target.value)}
        onKeyUp={e => filterResults(e.target.value.trim(), tag)}
        placeholder="Search by name"
      />
      <input
        className="searchbar"
        value={tag}
        onChange={e => setTag(e.target.value)}
        onKeyUp={e => filterResults(name, e.target.value.trim())}
        placeholder="Search by tag"
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

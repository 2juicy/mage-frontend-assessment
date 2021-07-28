import "./User.css";
import { useState, useEffect } from "react";
import UserInfo from "../../components/UserInfo/UserInfo";
import Searchbar from "../../components/Searchbar/Searchbar";

function fetchData(url) {
  return fetch(url)
    .then(response => {
      if (response.ok) return response.json();
      throw response;
    })
    .catch(error => console.error("Bad request", error));
}

export default function User() {
  // Stored fetch request data.
  const URL = "https://api.hatchways.io/assessment/students";
  const [results, setResults] = useState([]);
  // Search plus filtered results and form state.
  const [filter, setFilter] = useState([]);
  const [form, setForm] = useState({
    name: "",
    tag: "",
  });

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
    // We use this function to see a substring or string exists in target string.
    function hasWord(target, string) {
      return (
        target
          .toLowerCase()
          .replace(/\s/g, "")
          .indexOf(string.toLowerCase().replace(/\s/g, "")) > -1
      );
    }
    // First we filter by name by looping through.
    const filterName = [];
    results.forEach(result => {
      if (hasWord(result.firstName + result.lastName, name))
        filterName.push(result);
    });
    // If a tag parameter exists we then continue to filter by tag.
    if (tag.length > 0) {
      const filterTag = [];
      filterName.forEach(result => {
        result.tags.some(data => {
          return hasWord(data, tag) ? filterTag.push(result) : false;
        });
      });
      return setFilter(filterTag);
    }
    return setFilter(filterName);
  }

  function handleForm(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleExpand(index) {
    // We clone the data to remove references before we set the state to avoid mutating the state.
    let clonedData = JSON.parse(JSON.stringify(filter));
    clonedData[index].show = !clonedData[index].show;
    setFilter([...clonedData]);
  }

  function addTag(tag, index) {
    if (!filter[index].tags.includes(tag)) {
      filter[index].tags = [...filter[index].tags, tag];
      setFilter([...filter]);
    }
  }

  return (
    <div className="paper">
      <Searchbar
        placeholder="Search by name"
        name="name"
        value={form.name}
        handleForm={handleForm}
        handleInput={() => filterResults(form.name, form.tag)}
      />
      <Searchbar
        placeholder="Search by tag"
        name="tag"
        value={form.tag}
        handleForm={handleForm}
        handleInput={() => filterResults(form.name, form.tag)}
      />
      <UserInfo users={filter} handleExpand={handleExpand} addTag={addTag} />
    </div>
  );
}

import "./User.css";
import { useState, useEffect } from "react";
import UserInfo from "../../components/UserInfo/UserInfo";
import Searchbar from "../../components/Searchbar/Searchbar";

export default function User() {
  // Stored fetch request data
  const URL = "https://api.hatchways.io/assessment/students";
  const [results, setResults] = useState([]);
  // Search plus filtered results
  const [filter, setFilter] = useState([]);
  const [form, setForm] = useState({
    name: "",
    tag: "",
  });

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
        result.tags.some(data => {
          if (
            data
              .toLowerCase()
              .replace(/\s/g, "")
              .indexOf(tag.toLowerCase().replace(/\s/g, "")) > -1
          ) {
            return filterTag.push(result);
          }
          return false;
        });
      });
      return setFilter(filterTag);
    }
    return setFilter(filterArr);
  }

  function handleExpand(index) {
    let clonedData = JSON.parse(JSON.stringify(filter));
    clonedData[index].show = !clonedData[index].show;
    setFilter([...clonedData]);
  }

  function handleForm(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
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

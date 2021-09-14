import "./User.css";
import { useState, useEffect } from "react";
import UserInfo from "../../components/UserInfo/UserInfo";
import Searchbar from "../../components/Searchbar/Searchbar";
import { Student } from "../../interface/Student";
import { fetchData } from "../../utils/index";

export default function User() {
  // Stored fetch request data.
  const URL = "https://api.hatchways.io/assessment/students";
  const [results, setResults] = useState<Student[]>([]);
  // Search plus filtered results and form state.
  const [filter, setFilter] = useState<Student[]>([]);
  const [form, setForm] = useState({
    name: "",
    tag: "",
  });

  useEffect(() => {
    fetchData(URL).then(data => {
      setResults(data.students);
      data.students.forEach(
        (student: {
          show: boolean;
          tags: Array<string>;
          grades: Array<number>;
        }) => {
          student.grades = student.grades.map(i => Number(i));
          student.show = false;
          student.tags = [];
        }
      );
      setFilter(data.students);
    });
  }, []);

  function filterResults(name: string, tag: string) {
    // We use this function to see a substring or string exists in target string.
    function hasWord(target: string, string: string) {
      return (
        target
          .toLowerCase()
          .replace(/\s/g, "")
          .indexOf(string.toLowerCase().replace(/\s/g, "")) > -1
      );
    }
    // First we filter by name by looping through.
    const filterName: Student[] = [];
    results.forEach((result: Student) => {
      if (hasWord(result.firstName + result.lastName, name))
        filterName.push(result);
    });
    // If a tag parameter exists we then continue to filter by tag.
    if (tag.length > 0) {
      const filterTag: Student[] = [];
      filterName.forEach(result => {
        result.tags.some((data: string) => {
          return hasWord(data, tag) ? filterTag.push(result) : false;
        });
      });
      return setFilter(filterTag);
    }
    return setFilter(filterName);
  }

  function handleForm(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleExpand(index: number) {
    // We clone the data to remove references before we set the state to avoid mutating the state.
    let clonedData = JSON.parse(JSON.stringify(filter));
    clonedData[index].show = !clonedData[index].show;
    setFilter([...clonedData]);
  }

  function handleTag(tag: string, index: number) {
    if (!filter[index].tags.includes(tag) && tag) {
      filter[index].tags = [...filter[index].tags, tag];
      setFilter([...filter]);
    }
  }

  return (
    <div className="paper">
      {(Object.keys(form) as Array<keyof typeof form>).map(key => (
        <Searchbar
          key={key}
          placeholder={`Search by ${key}`}
          name={key}
          value={form[key]}
          handleForm={handleForm}
          handleInput={() => filterResults(form.name, form.tag)}
        />
      ))}
      <UserInfo
        users={filter}
        handleExpand={handleExpand}
        handleTag={handleTag}
      />
    </div>
  );
}

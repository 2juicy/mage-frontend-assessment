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
  const [form, setForm] = useState({
    name: "",
    tag: "",
  });

  useEffect(() => {
    fetchData(URL).then(data => {
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
      setResults(data.students);
    });
  }, []);

  function filterResults(data: Student[]) {
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
      if (hasWord(result.firstName + result.lastName, form.name))
        filterName.push(result);
    });
    // If a tag parameter exists we then continue to filter by tag.
    if (form.tag.length > 0) {
      const filterTag: Student[] = [];
      filterName.forEach(result => {
        result.tags.some((data: string) => {
          return hasWord(data, form.tag) ? filterTag.push(result) : false;
        });
      });
      return filterTag;
    }
    return filterName;
  }

  function handleForm(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleExpand(index: number) {
    // We clone the data to remove references before we set the state to avoid mutating the state.
    let clonedData = JSON.parse(JSON.stringify(results));
    clonedData[index].show = !clonedData[index].show;
    setResults([...clonedData]);
  }

  function handleTag(tag: string, index: number) {
    if (!results[index].tags.includes(tag) && tag) {
      results[index].tags = [...results[index].tags, tag];
      setResults([...results]);
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
          handleInput={() => filterResults(results)}
        />
      ))}
      <UserInfo
        users={filterResults(results)}
        handleExpand={handleExpand}
        handleTag={handleTag}
      />
    </div>
  );
}

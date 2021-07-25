import "./Grades.css";
import React from "react";

export default function Grades({ grades, findAverage }) {
  return (
    <table className="grades">
      <tr>
        <th>Average:&nbsp;</th>
        <th>{findAverage(grades)}%</th>
      </tr>
      <br />
      {grades.map((content, index) => (
        <tr>
          <td>Test {index + 1}:</td>
          <td>{content}%</td>
        </tr>
      ))}
    </table>
  );
}

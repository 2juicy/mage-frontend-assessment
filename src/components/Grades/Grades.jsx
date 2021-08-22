import "./Grades.css";
import { useMemo } from "react";

function findAverage(arr) {
  return arr.reduce(function (avg, value, _, { length }) {
    return avg + value / length;
  }, 0);
}

export default function Grades({ grades, children }) {
  const averageGrade = useMemo(() => findAverage(grades), [grades]);

  return (
    <table className="grades">
      <thead>
        <tr>
          <th>Average:&nbsp;</th>
          <th>{averageGrade}%</th>
        </tr>
      </thead>
      {children}
    </table>
  );
}

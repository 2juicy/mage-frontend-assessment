import "./Grades.css";
import { useMemo, useCallback } from "react";

export default function Grades({ grades, children }) {
  const findAverage = useCallback(arr => {
    console.log("render");
    return arr.reduce(function (avg, value, _, { length }) {
      return avg + value / length;
    }, 0);
  }, []);

  const averageGrade = useMemo(
    () => findAverage(grades),
    [grades, findAverage]
  );

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

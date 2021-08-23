import "./Grades.css";
import { useMemo } from "react";
import { findAverage } from "../../utils";

export default function Grades({
  grades,
  children,
}: {
  grades: Array<string>;
  children: React.ReactNode;
}) {
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

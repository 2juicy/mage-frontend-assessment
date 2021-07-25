import "./Grades.css";

export default function Grades({ grades, findAverage, children }) {
  return (
    <table className="grades">
      <thead>
        <tr>
          <th>Average:&nbsp;</th>
          <th>{findAverage(grades)}%</th>
        </tr>
      </thead>
      {children}
    </table>
  );
}

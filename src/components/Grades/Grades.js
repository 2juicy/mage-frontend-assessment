import "./Grades.css";
import Expandible from "../Expandible/Expandible";

export default function Grades({ grades, findAverage }) {
  return (
    <table className="grades">
      <thead>
        <tr>
          <th>Average:&nbsp;</th>
          <th>{findAverage(grades)}%</th>
        </tr>
      </thead>
      <Expandible contents={grades} />
    </table>
  );
}

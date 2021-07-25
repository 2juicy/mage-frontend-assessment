import "./Grades.css";
import Expandible from "../Expandible/Expandible";

export default function Grades({ grades, findAverage }) {
  return (
    <table className="grades">
      <tr>
        <th>Average:&nbsp;</th>
        <th>{findAverage(grades)}%</th>
      </tr>
      <Expandible contents={grades} />
    </table>
  );
}

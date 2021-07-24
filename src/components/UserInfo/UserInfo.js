import "./UserInfo.css";
import Thumbnail from "../Thumbnail/Thumbnail";

export default function UserInfo({ users, findAverage }) {
  return (
    <>
      {users.map(data => (
        <div className="flex-container" key={data.id}>
          <Thumbnail thumbnail={data.pic} />
          <div className="user-info">
            <h2>
              {data.firstName} {data.lastName}
            </h2>
            <p>Email: {data.email}</p>
            <p>Company: {data.company}</p>
            <p>Skill: {data.skill}</p>
            <p>Average: {findAverage(data.grades)}%</p>
          </div>
        </div>
      ))}
    </>
  );
}

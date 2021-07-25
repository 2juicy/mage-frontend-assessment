import "./UserInfo.css";
import Thumbnail from "../Thumbnail/Thumbnail";
import Grades from "../Grades/Grades";

export default function UserInfo({ users, findAverage }) {
  console.log(users);
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
            <Grades grades={data.grades} findAverage={findAverage} />
          </div>
          <button type="button" className="expandible">
            +
          </button>
        </div>
      ))}
    </>
  );
}

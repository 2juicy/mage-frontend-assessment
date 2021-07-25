import "./UserInfo.css";
import Thumbnail from "../Thumbnail/Thumbnail";
import Grades from "../Grades/Grades";
import Expandible from "../Expandible/Expandible";
import AddTag from "../AddTag/AddTag";

export default function UserInfo({ users, findAverage, handleExpand, addTag }) {
  return (
    <>
      {users.map((user, index) => (
        <div className="flex-container" key={user.id}>
          <Thumbnail thumbnail={user.pic} />
          <div className="user-info">
            <h2>
              {user.firstName} {user.lastName}
            </h2>
            <p>Email: {user.email}</p>
            <p>Company: {user.company}</p>
            <p>Skill: {user.skill}</p>
            <Grades grades={user.grades} findAverage={findAverage}>
              <Expandible
                contents={user.grades}
                show={user.show ? "expandible" : "hidden"}
              />
            </Grades>
            {user.tags.length ? (
              <div className="tagbar">
                {user.tags.map(tag => (
                  <p>{tag}</p>
                ))}
              </div>
            ) : null}
            <AddTag
              className="tag-input"
              placeholder="Add a tag"
              addTag={addTag}
              index={index}
            />
          </div>
          <button
            type="button"
            className="expandible-button"
            onClick={() => handleExpand(index)}
          >
            {user.show ? "-" : "+"}
          </button>
        </div>
      ))}
    </>
  );
}

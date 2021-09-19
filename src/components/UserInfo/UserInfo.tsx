import "./UserInfo.css";
import Thumbnail from "../Thumbnail/Thumbnail";
import Grades from "../Grades/Grades";
import Expandible from "../Expandible/Expandible";
import AddTag from "../AddTag/AddTag";
import { Student } from "../../interface/Student";

export default function UserInfo({
  users,
  handleTag,
  handleExpand,
}: {
  users: Array<Student>;
  handleTag: (tag: string, index: number) => void;
  handleExpand: (index: number) => void;
}) {
  return (
    <>
      {users.map((user: Student) => {
        const index = Number(user.id) - 1;

        return (
          <div className="flex-container" key={user.id}>
            <Thumbnail thumbnail={user.pic} />
            <div className="user-info">
              <h2>
                {user.firstName} {user.lastName}
              </h2>
              <p>Email: {user.email}</p>
              <p>Company: {user.company}</p>
              <p>Skill: {user.skill}</p>
              <Grades grades={user.grades}>
                <Expandible
                  contents={user.grades}
                  show={user.show ? "expandible" : "hidden"}
                />
              </Grades>
              {user.tags.length > 0 && (
                <div className="tagbar">
                  {user.tags.map(tag => (
                    <p key={tag}>{tag}</p>
                  ))}
                </div>
              )}
              <AddTag
                placeholder="Add a tag"
                handleTag={handleTag}
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
        );
      })}
    </>
  );
}

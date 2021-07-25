import "./UserInfo.css";
import { useState } from "react";
import Thumbnail from "../Thumbnail/Thumbnail";
import Grades from "../Grades/Grades";
import Expandible from "../Expandible/Expandible";

export default function UserInfo({ users, findAverage, handleExpand }) {
  const [input, setInput] = useState("");

  return (
    <>
      {users.map((data, index) => (
        <div className="flex-container" key={data.id}>
          <Thumbnail thumbnail={data.pic} />
          <div className="user-info">
            <h2>
              {data.firstName} {data.lastName}
            </h2>
            <p>Email: {data.email}</p>
            <p>Company: {data.company}</p>
            <p>Skill: {data.skill}</p>
            <Grades grades={data.grades} findAverage={findAverage}>
              <Expandible
                contents={data.grades}
                show={data.show ? "expandible" : "expandible hidden"}
              />
            </Grades>
            <div className="tagbar">
              <p>tag1</p>
              <p>ta1</p>
            </div>
            <input
              className="tag-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Add a tag"
            />
          </div>
          <button
            type="button"
            className="expandible-button"
            onClick={() => handleExpand(index)}
          >
            {data.show ? "-" : "+"}
          </button>
        </div>
      ))}
    </>
  );
}

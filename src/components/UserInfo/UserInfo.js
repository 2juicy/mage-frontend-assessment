import "./UserInfo.css";
// import { useState } from "react";
import Thumbnail from "../Thumbnail/Thumbnail";
import Grades from "../Grades/Grades";
import Expandible from "../Expandible/Expandible";

export default function UserInfo({ users, findAverage, handleExpand }) {
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
                show={data.show ? null : "expandible"}
              />
            </Grades>
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

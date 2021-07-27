import "./Expandible.css";
import React from "react";

function Expandible({ show, contents }) {
  return (
    <tbody className={show}>
      {contents.map((content, index) => (
        <tr key={index}>
          <td>Test {index + 1}:</td>
          <td>{content}%</td>
        </tr>
      ))}
    </tbody>
  );
}

export default React.memo(Expandible);

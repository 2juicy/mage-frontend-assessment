import React from "react";

export default function Expandible({ contents }) {
  return (
    <>
      <br />
      {contents.map((content, index) => (
        <tr>
          <td>Test {index + 1}:</td>
          <td>{content}%</td>
        </tr>
      ))}
    </>
  );
}

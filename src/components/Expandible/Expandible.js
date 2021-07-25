import React from "react";

export default function Expandible({ contents }) {
  return (
    <tbody>
      {contents.map((content, index) => (
        <tr key={index}>
          <td>Test {index + 1}:</td>
          <td>{content}%</td>
        </tr>
      ))}
    </tbody>
  );
}

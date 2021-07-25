import "./Expandible.css";

export default function Expandible({ contents, show }) {
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

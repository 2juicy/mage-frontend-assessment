import "./AddTag.css";
import { useState } from "react";

export default function AddTag({ placeholder, addTag, index }) {
  const [input, setInput] = useState("");

  return (
    <input
      className="tag-input"
      value={input}
      onChange={e => setInput(e.target.value)}
      onKeyDown={e => {
        if (e.key === "Enter") {
          addTag(e.target.value.trim(), index, e.key);
          setInput("");
        }
      }}
      placeholder={placeholder}
    />
  );
}

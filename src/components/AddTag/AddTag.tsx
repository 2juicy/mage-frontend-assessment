import "./AddTag.css";
import React, { useState } from "react";

export default function AddTag({
  placeholder,
  handleTag,
  index,
}: {
  placeholder: string;
  handleTag: (tag: string, index: number) => void;
  index: number;
}) {
  const [input, setInput] = useState("");

  return (
    <input
      className="tag-input"
      type="text"
      onChange={e => setInput(e.target.value)}
      value={input}
      onKeyDown={(e: React.KeyboardEvent) => {
        if (e.key === "Enter" && input) {
          handleTag(input, index);
          setInput("");
        }
      }}
      placeholder={placeholder}
    />
  );
}

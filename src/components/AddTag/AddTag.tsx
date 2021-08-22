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
      value={input}
      onChange={e => setInput(e.target.value)}
      onKeyDown={(e: any) => {
        if (e.key === "Enter") {
          handleTag(e.target.value.trim(), index);
          setInput("");
        }
      }}
      placeholder={placeholder}
    />
  );
}

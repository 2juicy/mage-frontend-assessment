import "./AddTag.css";
import React, { useRef } from "react";

export default function AddTag({
  placeholder,
  handleTag,
  index,
}: {
  placeholder: string;
  handleTag: (tag: string, index: number) => void;
  index: number;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <input
      className="tag-input"
      ref={inputRef}
      type="text"
      onKeyDown={(e: React.KeyboardEvent) => {
        if (e.key === "Enter" && inputRef.current) {
          handleTag(inputRef.current.value, index);
          inputRef.current.value = "";
        }
      }}
      placeholder={placeholder}
    />
  );
}

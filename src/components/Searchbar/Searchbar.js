import "./Searchbar.css";
import { useState } from "react";

export default function Searchbar({ handleSearch, placeholder }) {
  const [search, setSearch] = useState("");

  return (
    <input
      className="searchbar"
      value={search}
      onChange={e => setSearch(e.target.value)}
      onKeyUp={e => handleSearch(e.target.value.trim())}
      placeholder={placeholder}
    />
  );
}

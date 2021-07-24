import "./Searchbar.css";
import { useState } from "react";

export default function Searchbar({ handleSearch, placeholder }) {
  const [search, setSearch] = useState("");

  return (
    <div>
      <input
        className="searchbar"
        value={search}
        onFocus={() => {
          setSearch("");
        }}
        onChange={e => setSearch(e.target.value)}
        onKeyUp={e => handleSearch(e.target.value.trim())}
        placeholder={placeholder}
      />
    </div>
  );
}

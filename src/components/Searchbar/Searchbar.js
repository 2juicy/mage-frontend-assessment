import "./Searchbar.css";

export default function Searchbar({
  value,
  name,
  handleForm,
  handleInput,
  placeholder,
}) {
  return (
    <input
      placeholder={placeholder}
      name={name}
      className="searchbar"
      value={value}
      onChange={e => handleForm(e)}
      onKeyUp={handleInput}
    />
  );
}

import "./Searchbar.css";

export default function Searchbar({
  placeholder,
  value,
  name,
  handleForm,
  handleInput,
}) {
  return (
    <input
      className="searchbar"
      placeholder={placeholder}
      value={value}
      name={name}
      onChange={e => handleForm(e)}
      onKeyUp={handleInput}
    />
  );
}

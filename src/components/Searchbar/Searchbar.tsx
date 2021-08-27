import "./Searchbar.css";

export default function Searchbar({
  placeholder,
  value,
  name,
  handleForm,
  handleInput,
}: {
  placeholder: string;
  value: string;
  name: string;
  handleForm: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleInput: () => void;
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

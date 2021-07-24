import "./Thumbnail.css";

export default function Thumbnail({ thumbnail }) {
  return (
    <div className="thumbnail">
      <img src={thumbnail} alt="thumbnail" />
    </div>
  );
}

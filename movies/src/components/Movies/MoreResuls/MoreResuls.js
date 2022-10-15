import "./MoreResuls.css";

function MoreResuls(props) {
  return (
    <div className="more-result">
      <button className="more-result__button" onClick={props.showMoreClick}>Ещё</button>
    </div>
  );
}

export default MoreResuls;
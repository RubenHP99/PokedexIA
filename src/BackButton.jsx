
export default function BackButton() {

  return (
      <button className="pixelMenuButton" onClick={() => window.history.back()}>
        <img src='backArrow.png' style={{ marginLeft: -15}}/>
      </button>
  );
}
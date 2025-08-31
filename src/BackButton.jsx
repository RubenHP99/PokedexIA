
export default function BackButton() {

  return (
      <button className="pixelMenuButton" onClick={() => window.history.back()} style={{marginLeft: 0}}>
        <img src='backArrow.png' style={{ marginLeft: -15}}/>
      </button>
  );
}
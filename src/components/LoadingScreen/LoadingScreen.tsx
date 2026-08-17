import "./LoadingScreen.css";
import loadingIcon from "@/assets/icons/day-clear.svg";

export default function LoadingScreen() {
  return (
    <div className="loading-screen">
      <img src={loadingIcon} className="loading-screen__icon" alt="Loading screen icon" />
      <p className="loading-screen__text">Loading weather, please wait...</p>
    </div>
  );
}

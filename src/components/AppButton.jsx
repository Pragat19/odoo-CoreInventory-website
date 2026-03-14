import React from "react";
import "./css/AppButton.css";

export default function AppButton({
  text,
  onClick,
  prefixIcon = null,
  suffixIcon = null,

  height = "45px",
  width = "100%",

  backgroundColor = "#1E3A8A",
  hoverColor = "#162d6b",
  textColor = "#ffffff",
  border = "none",

  className = "",
  disabled = false,
  type = "button",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`app-button ${className}`}
      style={{
        height,
        width,
        backgroundColor,
        color: textColor,
        border,
      }}
      onMouseEnter={(e) => {
        if (!disabled) e.target.style.backgroundColor = hoverColor;
      }}
      onMouseLeave={(e) => {
        if (!disabled) e.target.style.backgroundColor = backgroundColor;
      }}
    >
      {prefixIcon && <span className="btn-icon">{prefixIcon}</span>}
      <span className="btn-text">{text}</span>
      {suffixIcon && <span className="btn-icon">{suffixIcon}</span>}
    </button>
  );
}
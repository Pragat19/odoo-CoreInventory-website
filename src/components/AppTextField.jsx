import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import "./css/AppTextField.css";

export default function AppTextField({
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
  prefixIcon = null,
  suffixIcon = null,
  isPassword = false,
  error = "",
  required = false,
  disabled = false,
  height = "45px",
  className = "",
}) {
  const [showPassword, setShowPassword] = useState(false);

  const isFieldPassword = isPassword || type === "password";

  return (
    <div className="app-textfield">
      
      {/* Label */}
      {label && (
        <label className="app-textfield-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}

      {/* Input Wrapper */}
      <div
        className={`app-input-wrapper 
          ${error ? "input-error" : ""}
          ${disabled ? "input-disabled" : ""}
        `}
        style={{ height }}
      >
        {/* Prefix Icon */}
        {prefixIcon && (
          <span className="input-icon">
            {prefixIcon}
          </span>
        )}

        {/* Input */}
        <input
          type={isFieldPassword ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`app-input ${className}`}
        />

        {/* Password Toggle */}
        {isFieldPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="password-toggle"
          >
            {showPassword ? (
              <Eye size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        )}

        {/* Custom Suffix Icon */}
        {!isFieldPassword && suffixIcon && (
          <span className="input-icon">
            {suffixIcon}
          </span>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <p className="input-error-text">
          {error}
        </p>
      )}
    </div>
  );
}
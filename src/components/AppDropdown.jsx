import { useState, useRef, useEffect } from "react";
import "./css/AppDropdown.css";

export default function AppDropdown({
  label,
  options = [],
  value,
  onChange,
  required = false,
}) {

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  const selectedOption = options.find((item) => {
    const val = typeof item === "object" ? item.value : item;
    return val === value;
  });

  const selectedLabel =
    typeof selectedOption === "object"
      ? selectedOption?.label
      : selectedOption;

  const handleSelect = (item) => {

    const val = typeof item === "object" ? item.value : item;

    onChange({
      target: { value: val }
    });

    setOpen(false);
  };

  /* close dropdown when click outside */

  useEffect(() => {

    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);

  }, []);

  return (
    <div className="app-textfield" ref={dropdownRef}>

      {label && (
        <label className="app-textfield-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}

      <div
        className="app-input-wrapper dropdown-trigger"
        onClick={() => setOpen(!open)}
      >

        <div className="dropdown-value">
          {selectedLabel || `Select ${label}`}
        </div>

        <span className={`dropdown-arrow ${open ? "open" : ""}`}>
          ▾
        </span>

      </div>

      {open && (

        <div className="dropdown-menu">

          {options.map((item, index) => {

            const optionValue =
              typeof item === "object" ? item.value : item;

            const optionLabel =
              typeof item === "object" ? item.label : item;

            return (

              <div
                key={index}
                className={`dropdown-item ${
                  optionValue === value ? "selected" : ""
                }`}
                onClick={() => handleSelect(item)}
              >
                {optionLabel}
              </div>

            );

          })}

        </div>

      )}

    </div>
  );
}
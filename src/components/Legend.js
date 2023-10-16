import React from "react";
import '../assets/scss/legend.scss'

function Legend({ checked, name, onChange, color, label, className = "" }) {
  return (
    <label
      className={`d-flex justify-content-start align-items-center ${className} btn btn-link text-decoration-none chartLegends`}
    >
      <input
        type="checkbox"
        className="d-none"
        checked={checked}
        onChange={onChange}
        name={name}
      />
      <div
        className={`rounded-circle w-4 h-4 bg-${color} me-4 ${
          checked ? "opacity-100" : "opacity-25"
        }`}
      />
      <span
        className={`d-block h6 m-0 ${
          checked
            ? "text-black fw-bold text-decoration-none"
            : "text-muted text-decoration-line-through"
        }`}
      >
        {label}
      </span>
    </label>
  );
}

export default Legend;

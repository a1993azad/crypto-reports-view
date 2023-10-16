import React from "react";

function Legend({ value, name, onChange, color, label, className = "" }) {
  return (
    <label
      className={`d-flex justify-content-start align-items-center ${className} btn btn-link text-decoration-none`}
    >
      <input
        type="checkbox"
        className="d-none"
        checked={value}
        onChange={onChange}
        name={name}
      />
      <div
        className={`rounded-circle w-4 h-4 bg-${color} me-4 ${
          value ? "opacity-100" : "opacity-25"
        }`}
      />
      <span
        className={`d-block h6 m-0 ${
          value
            ? "text-black fw-bold"
            : "text-muted text-decoration-line-through"
        }`}
      >
        {label}
      </span>
    </label>
  );
}

export default Legend;

import { useFormContext } from "react-hook-form";
import InputMask from "react-input-mask";
import get from "lodash/get";

export default function InputField({
  name,
  label,
  required = false,
  placeholder = "",
  type = "text",
  options = [],
  mask,
  className = "",
  setValueAs,
  trailingElement,
  ...rest
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = get(errors, name);
  const invalidClass = error ? "is-invalid" : "";

  const registration = register(name, {
    ...(type === "number" ? { valueAsNumber: true } : {}),
    ...(type === "select" && !setValueAs
      ? {
          setValueAs: (value) => {
            if (value === "") return "";
            const num = Number(value);
            return isNaN(num) ? value : num;
          },
        }
      : {}),
    ...(setValueAs ? { setValueAs } : {}),
    ...(mask
      ? {
          setValueAs: (v) => v?.replace(/\D/g, "") || "",
        }
      : {}),
  });

  const renderTrailing = trailingElement ? (
    <div
      style={{
        position: "absolute",
        right: "10px",
        top: "50%",
        transform: "translateY(-50%)",
      }}
    >
      {trailingElement}
    </div>
  ) : null;

  const wrapperStyle = trailingElement
    ? { position: "relative", display: "flex", alignItems: "center" }
    : {};

  // === SELECT ===
  if (type === "select") {
    return (
      <div className={`mb-3 col-md-6 ${className}`}>
        {label && (
          <label htmlFor={name} className="form-label">
            {label} {required && <span className="text-danger">*</span>}
          </label>
        )}
        <div style={wrapperStyle}>
          <select
            id={name}
            className={`form-select ${invalidClass}`}
            {...registration}
            onBlur={registration.onBlur}
          >
            <option value="">Selecione…</option>
            {options.map((opt, i) => (
              <option key={i} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {renderTrailing}
        </div>
        {error && (
          <div className="invalid-feedback d-block">{error.message}</div>
        )}
      </div>
    );
  }

  // === MASK ===
  if (mask) {
    const { readOnly, ...restProps } = rest;
    return (
      <div className={`mb-3 col-md-6 ${className}`}>
        {label && (
          <label htmlFor={name} className="form-label">
            {label} {required && <span className="text-danger">*</span>}
          </label>
        )}
        <div style={wrapperStyle}>
          <InputMask
            id={name}
            mask={mask}
            readOnly={readOnly}
            {...registration}
          >
            {(inputProps) => (
              <input
                {...inputProps}
                {...restProps}
                type={type}
                placeholder={placeholder}
                className={`form-control ${invalidClass}`}
                onBlur={inputProps.onBlur}
              />
            )}
          </InputMask>
          {renderTrailing}
        </div>
        {error && (
          <div className="invalid-feedback d-block">{error.message}</div>
        )}
      </div>
    );
  }

  // === TEXTAREA ===
  if (type === "textarea") {
    return (
      <div className={`mb-3 ${className}`}>
        {label && (
          <label htmlFor={name} className="form-label">
            {label} {required && <span className="text-danger">*</span>}
          </label>
        )}
        <div style={wrapperStyle}>
          <textarea
            id={name}
            rows={4}
            placeholder={placeholder}
            className={`form-control ${invalidClass}`}
            {...registration}
            onBlur={registration.onBlur}
          />
          {renderTrailing}
        </div>
        {error && (
          <div className="invalid-feedback d-block">{error.message}</div>
        )}
      </div>
    );
  }

  // === INPUT PADRÃO ===
  return (
    <div className={`mb-3 col-md-6 ${className}`}>
      {label && (
        <label htmlFor={name} className="form-label">
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}
      <div style={wrapperStyle}>
        <input
          id={name}
          type={type}
          placeholder={placeholder}
          className={`form-control ${invalidClass}`}
          style={
            type === "number"
              ? {
                  MozAppearance: "textfield",
                  WebkitAppearance: "none",
                  margin: 0,
                }
              : undefined
          }
          {...rest}
          {...registration}
          onBlur={registration.onBlur}
        />
        {renderTrailing}
      </div>
      {error && <div className="invalid-feedback d-block">{error.message}</div>}
    </div>
  );
}

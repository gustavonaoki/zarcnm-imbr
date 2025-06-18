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
  ...rest
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = get(errors, name);
  const invalidClass = error ? "is-invalid" : "";

  // Registro com lógica de transformação
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

  // === SELECT ===
  if (type === "select") {
    return (
      <div className={`mb-3 col-md-6 ${className}`}>
        {label && (
          <label htmlFor={name} className="form-label">
            {label} {required && <span className="text-danger">*</span>}
          </label>
        )}
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
        {error && <div className="invalid-feedback">{error.message}</div>}
      </div>
    );
  }

  // === INPUT MASK ===
  if (mask) {
    const { readOnly, ...restProps } = rest; // 👈 separar o readOnly
    return (
      <div className={`mb-3 col-md-6 ${className}`}>
        {label && (
          <label htmlFor={name} className="form-label">
            {label} {required && <span className="text-danger">*</span>}
          </label>
        )}
        <InputMask
          id={name}
          mask={mask}
          readOnly={readOnly} // ✅ readOnly vai direto pro InputMask
          {...registration}
        >
          {(inputProps) => (
            <input
              {...inputProps}
              {...restProps} // 👈 aqui readOnly já foi removido
              type={type}
              placeholder={placeholder}
              className={`form-control ${invalidClass}`}
              onBlur={inputProps.onBlur}
            />
          )}
        </InputMask>
        {error && <div className="invalid-feedback">{error.message}</div>}
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
        <textarea
          id={name}
          rows={4}
          placeholder={placeholder}
          className={`form-control ${invalidClass}`}
          {...registration}
          onBlur={registration.onBlur}
        />
        {error && <div className="invalid-feedback">{error.message}</div>}
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
      {error && <div className="invalid-feedback">{error.message}</div>}
    </div>
  );
}

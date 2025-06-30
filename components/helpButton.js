import { useState, useRef, useEffect } from "react";

export default function HelpButton({ label, values = [] }) {
  const [show, setShow] = useState(false);
  const boxRef = useRef(null);
  const buttonRef = useRef(null);

  const media = () => {
    const numerosValidos = values.map(Number).filter((v) => !isNaN(v));
    if (numerosValidos.length === 0) return "Nenhum valor válido";
    const soma = numerosValidos.reduce((acc, v) => acc + v, 0);
    return (soma / numerosValidos.length).toFixed(2) + "%";
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        boxRef.current &&
        !boxRef.current.contains(e.target) &&
        !buttonRef.current.contains(e.target)
      ) {
        setShow(false);
      }
    };

    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show]);

  return (
    <div className="d-inline-block position-relative">
      <button
        ref={buttonRef}
        type="button"
        className="btn btn-outline-secondary rounded-3"
        onClick={() => setShow((prev) => !prev)}
        title={label}
      >
        Pressione para ajuda
      </button>
      {show && (
        <div
          ref={boxRef}
          className="bg-light rounded-3 p-2 shadow position-absolute"
          style={{
            top: "100%",
            left: "0",
            zIndex: 10,
            minWidth: "300px",
            marginTop: "8px",
            whiteSpace: "pre-wrap", 
          }}
        >
          {label}
          <div>Sua média de cobertura atual é: <strong>{media()}</strong></div>
        </div>
      )}
    </div>
  );
}

import { useState } from "react";
import { api } from "../infra/api";

export function useFormsApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [chaveNM, setChaveNM] = useState(null);
  const [results, setResults] = useState({
    form1: null,
    form2: null,
    form3: null,
  });

  const parseError = (err, fallback = "Erro desconhecido") => {
    try {
      const data = err?.response?.data;

      if (typeof data === "object" && data?.detail) {
        return data.detail;
      }

      if (typeof data?.raw === "string") {
        const parsed = JSON.parse(data.raw);
        if (parsed?.detail) return parsed.detail;
      }

      if (typeof data === "string") {
        const parsed = JSON.parse(data);
        if (parsed?.detail) return parsed.detail;
      }
    } catch (e) {
      console.warn("Falha ao parsear erro:", e);
    }

    return (
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      err?.message ||
      fallback
    );
  };

  const submitForms = async (form1Data, form2Data, form3Data) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    setResults({
      form1: null,
      form2: null,
      form3: null,
    });

    // 🔴 FORM1
    try {
      const res1 = await api.post("/api/form1", form1Data);
      const chaveClassificacaoNM = res1.data?.chaveClassificacaoNM;

      if (!chaveClassificacaoNM) {
        throw new Error("chaveClassificacaoNM não retornada pela API.");
      }

      setChaveNM(chaveClassificacaoNM);
      setResults((r) => ({ ...r, form1: { success: true } }));

      // 🟠 FORM2
      try {
        await api.post("/api/form2", {
          chaveClassificacaoNM,
          ...form2Data,
        });
        setResults((r) => ({ ...r, form2: { success: true } }));
      } catch (err) {
        const msg = parseError(err, "Erro no envio do Form2");
        setResults((r) => ({
          ...r,
          form2: { success: false, error: msg },
        }));
      }

      // 🟢 FORM3
      try {
        await api.post("/api/form3", {
          chaveClassificacaoNM,
          ...form3Data,
        });
        setResults((r) => ({ ...r, form3: { success: true } }));
      } catch (err) {
        const msg = parseError(err, "Erro no envio do Form3");
        setResults((r) => ({
          ...r,
          form3: { success: false, error: msg },
        }));
      }

      setSuccess(true);
    } catch (err) {
      const msg = parseError(err, "Erro no envio do Form1");
      setResults((r) => ({
        ...r,
        form1: { success: false, error: msg },
      }));
    } finally {
      setLoading(false);
    }
  };

  const resetResults = () => {
    setResults({
      form1: null,
      form2: null,
      form3: null,
    });
    setChaveNM(null);
    setError(null);
    setSuccess(false);
  };

  return {
    submitForms,
    loading,
    error,
    success,
    chaveNM,
    results,
    resetResults,
  };
}

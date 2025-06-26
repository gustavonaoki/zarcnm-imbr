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

  const submitForms = async (form1Data, form2Data, form3Data) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    setResults({
      form1: null,
      form2: null,
      form3: null,
    });

    try {
      const res1 = await api.post("/api/form1", form1Data);
      const chaveClassificacaoNM = res1.data?.chaveClassificacaoNM;

      if (!chaveClassificacaoNM) {
        setResults((r) => ({
          ...r,
          form1: {
            success: false,
            error: "chaveClassificacaoNM não retornada pela API.",
          },
        }));
        throw new Error("chaveClassificacaoNM não retornada.");
      }

      setChaveNM(chaveClassificacaoNM);
      setResults((r) => ({ ...r, form1: { success: true } }));

      // Envio do Form2
      try {
        await api.post("/api/form2", {
          chaveClassificacaoNM,
          ...form2Data,
        });
        setResults((r) => ({ ...r, form2: { success: true } }));
      } catch (err) {
        const msg =
          err.response?.data?.error ||
          err.message ||
          "Erro desconhecido da API (Form2)";
        setResults((r) => ({
          ...r,
          form2: { success: false, error: msg },
        }));
      }

      // Envio do Form3
      try {
        await api.post("/api/form3", {
          chaveClassificacaoNM,
          ...form3Data,
        });
        setResults((r) => ({ ...r, form3: { success: true } }));
      } catch (err) {
        const msg =
          err.response?.data?.error ||
          err.message ||
          "Erro desconhecido da API (Form3)";
        setResults((r) => ({
          ...r,
          form3: { success: false, error: msg },
        }));
      }

      setSuccess(true);
    } catch (err) {
      console.error("Erro geral no envio:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Erro desconhecido ao enviar os formulários."
      );
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

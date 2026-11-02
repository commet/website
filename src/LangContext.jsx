import { createContext, useContext, useEffect, useState } from "react";
const LangContext = createContext(null);
export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem("yclee-language") === "en" ? "en" : "kr";
    } catch {
      return "kr";
    }
  });
  useEffect(() => {
    document.documentElement.lang = lang === "kr" ? "ko" : "en";
    try {
      localStorage.setItem("yclee-language", lang);
    } catch {
      /* Storage is optional. */
    }
  }, [lang]);
  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}
// Shared context hook is intentionally exported alongside the provider.
// eslint-disable-next-line react-refresh/only-export-components
export function useLang() {
  return useContext(LangContext);
}

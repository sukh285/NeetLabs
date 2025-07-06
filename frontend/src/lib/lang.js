export const getLanguageId = (language) => {
    const languageMap = {
      PYTHON: 71,
      JAVA: 62,
      JAVASCRIPT: 63,
    };
  
    return languageMap[language.toUpperCase()];
  };
  
  export const getLanguageName = (languageId) => {
    const languageNames = {
      71: "PYTHON",
      62: "JAVA",
      63: "JAVASCRIPT",
    };
  
    return languageNames[languageId] || "Unknown"
  };
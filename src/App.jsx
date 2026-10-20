import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import HomePage from './pages/HomePage';
import { ThemeContext } from './theme/ThemeContext';
import { useThemeEngine } from './theme/useThemeEngine';

function App() {
  const { i18n } = useTranslation();
  const themeEngine = useThemeEngine();

  useEffect(() => {
    const isRTL = i18n.language === 'fa';
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = isRTL ? 'fa' : 'en';
  }, [i18n.language]);

  const themeValue = useMemo(() => themeEngine, [themeEngine]);

  if (!themeEngine.isReady) {
    return <div className="min-h-screen bg-void" aria-hidden="true" />;
  }

  return (
    <ThemeContext.Provider value={themeValue}>
      <HomePage />
    </ThemeContext.Provider>
  );
}

export default App;

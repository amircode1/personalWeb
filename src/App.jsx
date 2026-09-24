import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import HomePage from './pages/HomePage';

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const isRTL = i18n.language === 'fa';
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = isRTL ? 'fa' : 'en';
  }, [i18n.language]);

  return <HomePage />;
}

export default App;

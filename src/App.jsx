import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import HomePage from './pages/HomePage'

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Set document direction based on language
    document.documentElement.dir = i18n.language === 'fa' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  return (
    <div className="bg-gray-900 min-h-screen">
      <HomePage />
    </div>
  );
}

export default App

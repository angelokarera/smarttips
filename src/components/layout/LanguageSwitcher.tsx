import { useNavigate, useLocation } from 'react-router';

const languages = [
  { code: 'en', label: 'EN' },
  { code: 'fr', label: 'FR' },
  { code: 'de', label: 'DE' },
  { code: 'es', label: 'ES' },
  { code: 'pt', label: 'PT' },
  { code: 'it', label: 'IT' },
  { code: 'nl', label: 'NL' },
  { code: 'ar', label: 'AR' }
];

export default function LanguageSwitcher({ currentLocale }: { currentLocale: string }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    const currentPathWithoutLocale = location.pathname.replace(`/${currentLocale}`, '');
    const newPathname = `/${newLocale}${currentPathWithoutLocale}`;
    navigate(newPathname);
  };

  return (
    <select
      value={currentLocale}
      onChange={handleLanguageChange}
      className="bg-gray-100 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-primary focus:border-primary block p-2"
    >
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.label}
        </option>
      ))}
    </select>
  );
}

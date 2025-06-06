// components/CookieConsent.tsx
'use client';
import { useEffect, useState } from 'react';
import { getCookie, setCookie } from 'cookies-next';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = getCookie('cookie_consent');
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    setCookie('cookie_consent', 'true', { maxAge: 60 * 60 * 24 * 365 }); // 1 year
    setVisible(false);
    window.location.reload();

    // You can initialize GA or other scripts here
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 w-full bg-gray-900 text-white p-4 flex justify-center items-center z-50">
      <span>Diese Website verwendet Cookies, um Ihre Erfahrung zu verbessern.</span>
      <button
        onClick={accept}
        className="ml-4 bg-green-500 px-4 py-2 rounded"
      >
        Akzeptieren
      </button>
    </div>
  );
}

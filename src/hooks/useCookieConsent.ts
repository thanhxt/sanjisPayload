import { useState, useEffect } from 'react';
import * as CookieConsent from 'vanilla-cookieconsent';

export function useCookieConsent(category: string) {
    const [hasConsent, setHasConsent] = useState(false);

    useEffect(() => {
        const checkConsent = () => {
            setHasConsent(CookieConsent.acceptedCategory(category));
        };

        checkConsent();

        const handleUpdate = () => checkConsent();

        window.addEventListener('cookie_consent_updated', handleUpdate);

        return () => {
            window.removeEventListener('cookie_consent_updated', handleUpdate);
        };
    }, [category]);

    return hasConsent;
}

export function showConsentPreferences() {
    CookieConsent.showPreferences();
}

'use client';

import { useEffect } from 'react';
import { Cookie } from 'lucide-react';
import * as CookieConsent from 'vanilla-cookieconsent';
import 'vanilla-cookieconsent/dist/cookieconsent.css';
import { cookieConsentConfig, POLICY_VERSION } from './cookieconsent-config';
import { useLanguage } from '../contexts/language-context';

export default function CookieConsentComponent() {
    const { language } = useLanguage();

    const logConsent = async () => {
        try {
            // Get or create consent ID
            let consentId = localStorage.getItem('consent_id');
            if (!consentId) {
                consentId = crypto.randomUUID();
                localStorage.setItem('consent_id', consentId);
            }

            // Get user preferences as a proper object
            const preferences = CookieConsent.getUserPreferences();

            await fetch('/api/consent-logs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    consentId,
                    preferences,
                    userAgent: navigator.userAgent,
                    policyVersion: POLICY_VERSION,
                }),
            });
        } catch (error) {
            console.error('Failed to log consent:', error);
        }
    };

    useEffect(() => {
        CookieConsent.run({
            ...cookieConsentConfig,
            onConsent: () => {
                window.dispatchEvent(new Event('cookie_consent_updated'));
                logConsent();
            },
            onChange: () => {
                window.dispatchEvent(new Event('cookie_consent_updated'));
                logConsent();
            },
        });
    }, []);

    useEffect(() => {
        CookieConsent.setLanguage(language);
    }, [language]);

    return (
        <button
            onClick={() => CookieConsent.showPreferences()}
            className="fixed bottom-4 left-4 z-50 p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-lg hover:bg-white/20 transition-all duration-300 group"
            aria-label={language === 'de' ? 'Cookie-Einstellungen' : 'Cookie Settings'}
        >
            <Cookie className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
        </button>
    );
}


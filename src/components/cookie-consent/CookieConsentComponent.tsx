'use client';

import { useEffect } from 'react';
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

    return null;
}


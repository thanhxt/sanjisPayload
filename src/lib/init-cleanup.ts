// Cleanup scheduler initialization logic
import { initConsentLogCleanup } from './cleanup-scheduler'

// The guard lives on globalThis because this module can be evaluated in
// several bundles/reloads within the same Node process (dev HMR, route
// groups), which would otherwise spawn duplicate cron jobs.
const globalState = globalThis as typeof globalThis & { __cleanupSchedulerInitialized?: boolean };

// Exported function to initialize cleanup scheduler
export function initCleanupScheduler() {
    // Never start cron jobs while Next.js is building.
    if (process.env.NEXT_PHASE === 'phase-production-build') return;

    // Only run on server side and only once per process
    if (typeof window === 'undefined' && !globalState.__cleanupSchedulerInitialized) {
        initConsentLogCleanup();
        globalState.__cleanupSchedulerInitialized = true;
    }
}

// Initialize on load
initCleanupScheduler();

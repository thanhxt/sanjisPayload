// Cleanup scheduler initialization logic
import { initConsentLogCleanup } from './cleanup-scheduler'

// Singleton guard to prevent duplicate initialization
let cleanupSchedulerInitialized = false;

// Exported function to initialize cleanup scheduler
export function initCleanupScheduler() {
    // Only run on server side and only once
    if (typeof window === 'undefined' && !cleanupSchedulerInitialized) {
        initConsentLogCleanup();
        cleanupSchedulerInitialized = true;
    }
}

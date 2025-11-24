// Initialize cleanup scheduler on server startup
import { initConsentLogCleanup } from './cleanup-scheduler'

// Only run on server side
if (typeof window === 'undefined') {
    initConsentLogCleanup()
}

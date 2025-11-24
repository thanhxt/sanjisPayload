import cron from 'node-cron'

// Run cleanup every month at 3 AM on the 1st day
export function initConsentLogCleanup() {
    // Schedule: minute hour day-of-month month day-of-week
    // '0 3 1 * *' = At 03:00 on day 1 of every month
    cron.schedule('0 3 1 * *', async () => {
        console.log('Running scheduled consent log cleanup...')

        try {
            const cleanupSecret = process.env.CLEANUP_SECRET || 'your-secret-key'
            const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

            const response = await fetch(`${baseUrl}/api/cleanup-consent-logs`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${cleanupSecret}`,
                },
            })

            const result = await response.json()
            console.log('Consent log cleanup completed:', result)
        } catch (error) {
            console.error('Failed to run consent log cleanup:', error)
        }
    })

    console.log('Consent log cleanup scheduler initialized (runs monthly at 3 AM)')
}

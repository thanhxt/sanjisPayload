import cron from 'node-cron'

// Run cleanup every month at 3 AM on the 1st day
export function initConsentLogCleanup() {
    // TEMPORARY: Run every minute for testing. Original: '0 3 1 * *'
    cron.schedule('0 3 1 * *', async () => {
        console.log('[CLEANUP] 🕒 Running scheduled consent log cleanup...')

        try {
            const cleanupSecret = process.env.CLEANUP_SECRET || 'your-secret-key'
            const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

            const response = await fetch(`${baseUrl}/api/cleanup-consent-logs`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${cleanupSecret}`,
                },
            })

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ error: response.statusText }))
                console.error(`[CLEANUP] ❌ Cleanup API failed (${response.status}):`, errorData)
                return
            }

            const result = await response.json()
            console.log(`[CLEANUP] ✅ Completed: Deleted ${result.deletedCount || 0} logs.`, result)
        } catch (error) {
            console.error('[CLEANUP] ❌ Failed to run consent log cleanup:', error)
        }
    })

    console.log('[CLEANUP] ⚙️ Scheduler initialized (running every minute for testing)')
}

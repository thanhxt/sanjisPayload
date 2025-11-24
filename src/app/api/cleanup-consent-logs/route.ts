import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function POST(req: NextRequest) {
    try {
        // Optional: Add authentication/secret key to prevent unauthorized access
        const authHeader = req.headers.get('authorization')
        const expectedSecret = process.env.CLEANUP_SECRET || 'your-secret-key'

        if (authHeader !== `Bearer ${expectedSecret}`) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const payload = await getPayload({ config })

        // Calculate date 12 months ago
        const twelveMonthsAgo = new Date()
        twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12)

        // Find all consent logs older than 12 months
        const oldLogs = await payload.find({
            collection: 'consent-logs',
            where: {
                timestamp: {
                    less_than: twelveMonthsAgo.toISOString(),
                },
            },
            limit: 1000, // Process in batches to avoid memory issues
        })

        // Delete the old logs
        let deletedCount = 0
        for (const log of oldLogs.docs) {
            await payload.delete({
                collection: 'consent-logs',
                id: log.id,
            })
            deletedCount++
        }

        return NextResponse.json({
            success: true,
            message: `Deleted ${deletedCount} consent logs older than 12 months`,
            deletedCount,
        })
    } catch (error) {
        console.error('Error cleaning up consent logs:', error)
        return NextResponse.json(
            { error: 'Failed to cleanup consent logs' },
            { status: 500 }
        )
    }
}

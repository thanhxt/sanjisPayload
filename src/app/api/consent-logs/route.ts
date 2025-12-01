import { getPayload } from 'payload'
import config from '@payload-config'
import { NextRequest, NextResponse } from 'next/server'
import { hashIPAddress } from '@/lib/ip-utils'

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { consentId, preferences, userAgent, policyVersion } = body

        if (!consentId || !preferences) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        const payload = await getPayload({ config })

        const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
        const ipHash = hashIPAddress(ip)

        await payload.create({
            collection: 'consent-logs',
            data: {
                consentId,
                preferences,
                userAgent,
                policyVersion,
                ipHash,
                timestamp: new Date().toISOString(),
            },
        })

        return NextResponse.json({ message: 'Consent logged successfully' }, { status: 200 })
    } catch (error) {
        console.error('Error logging consent:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

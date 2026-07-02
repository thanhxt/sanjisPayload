import 'server-only'

/**
 * Verifies a captcha token against the self-hosted cap.js verification server.
 * Returns true only when the provider explicitly confirms success. Fails closed
 * on missing configuration, network errors, or a falsy provider response so it
 * can be used as an authoritative gate in front of mail-sending endpoints.
 */
export async function verifyCaptcha(token: unknown): Promise<boolean> {
  if (typeof token !== 'string' || token.length === 0) {
    return false
  }

  const verifyUrl = process.env.CAPTCHA_VERIFY_URL
  const secret = process.env.CAPTCHA_SECRET_PRODUCTION
  if (!verifyUrl || !secret) {
    console.error('[CAPTCHA:VERIFY] ❌ Missing CAPTCHA_VERIFY_URL / CAPTCHA_SECRET_PRODUCTION')
    return false
  }

  try {
    const response = await fetch(verifyUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret, response: token }),
    })
    const data = await response.json()
    if (data?.success) {
      console.log('[CAPTCHA:VERIFY] ✅ Success')
      return true
    }
    console.warn('[CAPTCHA:VERIFY] ⚠️ Failed:', data?.['error-codes'] || 'Unknown error')
    return false
  } catch (error) {
    console.error('[CAPTCHA:VERIFY] ❌ Error:', error)
    return false
  }
}

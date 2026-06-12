const RESEND_URL = 'https://api.resend.com/emails'
const ACCENT = '#2B53E8'

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function firstName(name) {
  const trimmed = String(name || '').trim()
  return trimmed ? trimmed.split(/\s+/)[0] : 'there'
}

function buildThankYouEmailHtml(name) {
  const greeting = escapeHtml(firstName(name))

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank you — Alic</title>
</head>
<body style="margin:0;padding:0;background:#F5F7FB;font-family:Arial,Helvetica,sans-serif;color:#11141B;-webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#F5F7FB;padding:40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#FFFFFF;border-radius:20px;border:1px solid rgba(17,20,27,.08);overflow:hidden;box-shadow:0 22px 48px -18px rgba(17,20,27,.18);">
          <tr>
            <td style="height:4px;background:${ACCENT};font-size:0;line-height:0;">&nbsp;</td>
          </tr>
          <tr>
            <td style="padding:36px 36px 28px;">
              <p style="margin:0 0 28px;font-family:Georgia,'Times New Roman',serif;font-size:22px;font-weight:600;letter-spacing:-.02em;color:#11141B;">Alic</p>
              <p style="margin:0 0 10px;font-family:'Courier New',Courier,monospace;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:${ACCENT};font-weight:600;">Application started</p>
              <h1 style="margin:0 0 16px;font-size:28px;line-height:1.15;font-weight:600;letter-spacing:-.03em;color:#11141B;">Thanks, ${greeting}.</h1>
              <p style="margin:0 0 24px;font-size:16px;line-height:1.65;color:rgba(17,20,27,.72);">
                Thank you for starting your application. Our team will reach out shortly with a secure link to connect your bank accounts so we can map your obligations and show you a lower payment.
              </p>
              <p style="margin:0 0 12px;font-size:11px;line-height:1.4;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:rgba(17,20,27,.55);">Next Steps</p>
              <p style="margin:0 0 10px;padding-left:14px;border-left:3px solid ${ACCENT};font-size:14px;line-height:1.55;color:#11141B;">We review every application personally</p>
              <p style="margin:0 0 10px;padding-left:14px;border-left:3px solid ${ACCENT};font-size:14px;line-height:1.55;color:#11141B;">You'll receive a secure bank link by email</p>
              <p style="margin:0;padding-left:14px;border-left:3px solid ${ACCENT};font-size:14px;line-height:1.55;color:#11141B;">No commitment until you review your savings</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 36px 32px;">
              <p style="margin:0;font-size:13px;line-height:1.6;color:rgba(17,20,27,.5);">
                If you have questions in the meantime, reply to this email and our team will be happy to help.
              </p>
            </td>
          </tr>
        </table>
        <p style="margin:24px 0 0;font-size:12px;line-height:1.5;color:rgba(17,20,27,.45);max-width:560px;">
          Alic Capital &middot; This message confirms we received your application.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`
}

async function sendViaResend(apiKey, payload) {
  const res = await fetch(RESEND_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Resend error (${res.status}): ${text}`)
  }

  return res.json()
}

export function parseRequestBody(args) {
  if (args.business && args.name && args.email && args.weekly) {
    return { business: args.business, name: args.name, email: args.email, weekly: args.weekly }
  }

  const raw = args.__ow_body ?? args.body
  if (typeof raw === 'string' && raw.trim()) {
    return JSON.parse(raw)
  }

  if (raw && typeof raw === 'object') {
    return raw
  }

  return {}
}

export function getAllowedOrigin(requestOrigin, allowedOrigins) {
  const allowed = (allowedOrigins || '*')
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean)

  if (allowed.includes('*')) return requestOrigin || '*'
  if (requestOrigin && allowed.includes(requestOrigin)) return requestOrigin
  return allowed[0] || '*'
}

export function buildCorsHeaders(origin, allowedOrigins) {
  return {
    'Access-Control-Allow-Origin': getAllowedOrigin(origin, allowedOrigins),
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  }
}

export async function processApplyRequest({ business, name, email, weekly }, env) {
  const apiKey = env.RESEND_API_KEY
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured')
  }

  const from = env.FROM_EMAIL || 'Alic <apply@communications.alicinvestments.com>'
  const notify = env.NOTIFY_EMAIL || 'michael@aliccapital.com'
  const safeBusiness = escapeHtml(business)
  const safeName = escapeHtml(name)
  const safeEmail = escapeHtml(email)
  const safeWeekly = escapeHtml(weekly)

  await Promise.all([
    sendViaResend(apiKey, {
      from,
      to: [email],
      subject: 'Thank you for starting your application — Alic',
      html: buildThankYouEmailHtml(name),
    }),
    sendViaResend(apiKey, {
      from,
      to: [notify],
      reply_to: email,
      subject: `New borrower application — ${name}`,
      html: `
        <h2>New application</h2>
        <p><strong>Business:</strong> ${safeBusiness}</p>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Weekly payment:</strong> ${safeWeekly}</p>
      `,
    }),
  ])
}

export async function handleApplyHttpRequest({ method, origin, body }, env) {
  const headers = buildCorsHeaders(origin, env.ALLOWED_ORIGINS)

  if (method === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' }
  }

  if (method !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    }
  }

  const business = String(body.business || '').trim()
  const name = String(body.name || '').trim()
  const email = String(body.email || '').trim()
  const weekly = String(body.weekly || '').trim()

  if (!business || !name || !email || !weekly) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Business, name, email, and weekly payment are required.' }),
    }
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Please provide a valid email address.' }),
    }
  }

  await processApplyRequest({ business, name, email, weekly }, env)

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ ok: true }),
  }
}

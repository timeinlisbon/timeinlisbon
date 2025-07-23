import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, name, language } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    if (!process.env.DATABASE_URL) {
      return res.status(500).json({ error: 'Database not configured' });
    }

    const sql = neon(process.env.DATABASE_URL);

    await sql`
      INSERT INTO subscribers (email, name, language, subscribed_at)
      VALUES (${email}, ${name || ''}, ${language || 'pt'}, ${new Date().toISOString()})
      ON CONFLICT (email) DO NOTHING
    `;

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Subscription error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
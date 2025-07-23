export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, name, phone, language } = req.body;

    // Validação básica
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ 
        error: 'Invalid email',
        message: 'Please provide a valid email address.'
      });
    }

    // Mock response - sem salvar no banco por enquanto
    console.log('Newsletter subscription:', { email, name, phone, language });

    res.status(201).json({ 
      success: true,
      message: 'Successfully subscribed to Times in Lisbon newsletter!',
      subscriber: { id: Date.now(), email }
    });

  } catch (error) {
    console.error('Subscription error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Something went wrong. Please try again later.'
    });
  }
}
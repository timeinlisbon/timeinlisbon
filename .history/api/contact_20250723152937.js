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
    const { name, email, message, language } = req.body;

    // Validação básica
    if (!name || !email || !message) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        message: 'Please fill in all required fields.'
      });
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ 
        error: 'Invalid email',
        message: 'Please provide a valid email address.'
      });
    }

    // Mock response - sem salvar no banco por enquanto
    console.log('Contact form submission:', { name, email, message, language });

    res.status(201).json({ 
      success: true,
      message: 'Thank you for your message! We\'ll get back to you soon.',
      contact: { id: Date.now() }
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Something went wrong. Please try again later.'
    });
  }
}
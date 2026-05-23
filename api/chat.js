export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { message } = req.body;

  try {
    const response = await fetch("https://poe.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.POE_API_KEY}`
      },
      body: JSON.stringify({
        model: "cloudnine_chatbot",
        messages: [{ role: "user", content: message }]
      })
    });

    const data = await response.json();
    const botReply = data.choices[0].message.content;
    
    return res.status(200).json({ reply: botReply });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

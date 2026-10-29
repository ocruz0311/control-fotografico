export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Manejar preflight OPTIONS
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Leer variables de entorno seguras de Vercel
  const apiKey = process.env.NOTION_API_KEY || "ntn_X97542535676iHXQYgrXowLiK88NK5HhqnSCWvqDmfq7M2";
  const databaseId = process.env.NOTION_DATABASE_ID || "5f0da213a2b74056b9388ced7474496a";

  if (!apiKey || !databaseId) {
    return res.status(500).json({ error: "Faltan las variables de entorno NOTION_API_KEY o NOTION_DATABASE_ID" });
  }

  try {
    const response = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ page_size: 100 })
    });

    if (!response.ok) {
      const errText = await response.text();
      return res.status(response.status).json({ error: `Notion API Error: ${errText}` });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

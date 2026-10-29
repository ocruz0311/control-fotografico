export async function onRequest(context) {
  // Manejar OPTIONS para CORS
  if (context.request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, Notion-Version"
      }
    });
  }

  // Variables de entorno de Cloudflare Pages
  const apiKey = context.env.NOTION_API_KEY || "ntn_X97542535676iHXQYgrXowLiK88NK5HhqnSCWvqDmfq7M2";
  const databaseId = context.env.NOTION_DATABASE_ID || "5f0da213a2b74056b9388ced7474496a";

  try {
    const notionRes = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ page_size: 100 })
    });

    const data = await notionRes.json();
    return new Response(JSON.stringify(data), {
      status: notionRes.status,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
}

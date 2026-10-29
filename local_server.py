import http.server
import socketserver
import urllib.request
import json
import webbrowser

PORT = 8085
NOTION_API_KEY = "ntn_X97542535676iHXQYgrXowLiK88NK5HhqnSCWvqDmfq7M2"
NOTION_DATABASE_ID = "5f0da213a2b74056b9388ced7474496a"

class NotionProxyHandler(http.server.SimpleHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Notion-Version')
        self.end_headers()

    def do_POST(self):
        if self.path.startswith('/api/notion'):
            try:
                url = f"https://api.notion.com/v1/databases/{NOTION_DATABASE_ID}/query"
                req = urllib.request.Request(
                    url,
                    data=b'{"page_size": 100}',
                    headers={
                        'Authorization': f'Bearer {NOTION_API_KEY}',
                        'Notion-Version': '2022-06-28',
                        'Content-Type': 'application/json'
                    }
                )
                with urllib.request.urlopen(req, timeout=15) as resp:
                    resp_data = resp.read()
                    self.send_response(200)
                    self.send_header('Content-Type', 'application/json; charset=utf-8')
                    self.send_header('Access-Control-Allow-Origin', '*')
                    self.end_headers()
                    self.wfile.write(resp_data)
            except Exception as e:
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({"error": str(e)}).encode('utf-8'))
        else:
            self.send_response(404)
            self.end_headers()

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

if __name__ == '__main__':
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), NotionProxyHandler) as httpd:
        print("="*65)
        print(f" Servidor Local Activo en: http://localhost:{PORT}")
        print(" Endpoint /api/notion activo y conectado a Notion API.")
        print("="*65)
        webbrowser.open(f"http://localhost:{PORT}/")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServidor detenido.")

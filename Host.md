# Host Your Web backend and frontend

## Host Frontend
Just do:
- npm run dev -- --host

## Host Backend
- Cloudflare Tunnel (FREE + stable)
  - Best for: Long-running dev backend, No open ports, Free SSL

## Steps:
* npm install -g cloudflared
* cloudflared tunnel --url http://localhost:5000

---

Note: Do not forgot to change frontend.

You need to: 
```
fetch('https://api-name.trycloudflare.com/api/users'); 
```
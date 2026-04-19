# 🔐 API Key Security – Quick Reference

## The Problem ⚠️

If your API key is in your app code:
```javascript
// ❌ BAD – NEVER DO THIS
window.ANTHROPIC_API_KEY = 'sk-ant-abc123...';
```

Anyone can:
1. Download your app
2. Extract the APK/IPA file
3. Read your source code
4. Find and steal your API key
5. Use it to drain your Anthropic credits ($$$)

**Cost if key is stolen:** Thousands of dollars per month

---

## The Solution ✅

Create a **Backend Proxy Server** that:
- Stores your API key securely (never exposed to client)
- Receives requests from your mobile app
- Forwards requests to Anthropic with your key
- Returns responses back to the app

### Architecture

```
┌─────────────────────┐
│  Kashafa TN Mobile  │
│  (No API Key)       │
└──────────┬──────────┘
           │ HTTPS Request
           │ /api/claude
           ▼
┌─────────────────────┐
│  Your Backend       │
│  (Has API Key)      │
└──────────┬──────────┘
           │ HTTPS Request
           │ (with key)
           ▼
┌─────────────────────┐
│  Anthropic API      │
│  Claude             │
└─────────────────────┘
```

---

## 5-Minute Setup: Node.js + Express

### 1. Create Backend Folder
```bash
mkdir kashafa-backend
cd kashafa-backend
npm init -y
npm install express cors dotenv axios
```

### 2. Create `.env` File
```
ANTHROPIC_API_KEY=sk-ant-xyz123YOUR-ACTUAL-KEY-HERE
PORT=3000
```

### 3. Create `server.js`
```javascript
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Proxy endpoint for Anthropic API
app.post('/api/claude', async (req, res) => {
  try {
    const { messages, model = 'claude-3-5-sonnet-20241022', max_tokens = 1024 } = req.body;
    
    const response = await axios.post('https://api.anthropic.com/v1/messages', {
      model,
      max_tokens,
      messages,
    }, {
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
    });
    
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ 
      error: error.message 
    });
  }
});

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
```

### 4. Test Locally
```bash
node server.js
# Output: Backend running on port 3000

# In another terminal:
curl -X POST http://localhost:3000/api/claude \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [{"role": "user", "content": "Say hello"}],
    "model": "claude-3-5-sonnet-20241022"
  }'
```

### 5. Deploy to Cloud (Free/Cheap)

#### Option A: Render.com (Recommended - Free Tier)
1. Create account at [render.com](https://render.com)
2. Connect GitHub with your `server.js`
3. Create **New → Web Service**
4. Settings:
   - Name: `kashafa-backend`
   - Build: `npm install`
   - Start: `node server.js`
   - Environment: Add `ANTHROPIC_API_KEY`
5. Deploy!
6. You'll get URL: `https://kashafa-backend.onrender.com`

#### Option B: Railway.app ($5/month)
1. Connect GitHub
2. Create new project
3. Add environment variable: `ANTHROPIC_API_KEY`
4. Deploy with `node server.js`

#### Option C: Heroku (Paid)
- Formerly free, now paid (~$7/month minimum)

---

## Update Your App

### In script.js
Replace this:
```javascript
window.ANTHROPIC_API_KEY = 'YOUR_KEY_HERE';
```

With this:
```javascript
window.CLAUDE_API_ENDPOINT = 'https://kashafa-backend.onrender.com/api/claude';

async function callClaude(messages, model = 'claude-3-5-sonnet-20241022') {
  const response = await fetch(window.CLAUDE_API_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages, model }),
  });
  return await response.json();
}
```

### Usage in App
```javascript
// Instead of:
// const response = await fetch('https://api.anthropic.com/v1/messages', {
//   headers: { 'x-api-key': ANTHROPIC_API_KEY, ... }
// });

// Do this:
const response = await callClaude([
  { role: 'user', content: 'Your question here' }
]);
```

---

## Security Best Practices

### ✅ DO:
- Store API key in `.env` file (never commit to Git)
- Use environment variables on hosting platform
- Validate requests on backend (rate limiting)
- Log API usage for audit trail
- Rotate API key periodically

### ❌ DON'T:
- Commit `.env` to Git
- Hardcode API key in app code
- Expose backend to public without auth
- Store keys in plain text
- Share `.env` file with anyone

---

## Cost Control

Add rate limiting to your backend to prevent abuse:

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

---

## Monitoring

Set up alerts for API usage:
- Anthropic Console → Usage Dashboard
- Set spending limits
- Get email alerts for unusual activity

---

## Next Steps

1. ✅ Create backend (5 min)
2. ✅ Test locally (2 min)
3. ✅ Deploy to Render.com (10 min)
4. ✅ Update app's `window.CLAUDE_API_ENDPOINT`
5. ✅ Test app → backend → Anthropic integration
6. ✅ Celebrate! 🎉

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Backend returns 404 | Verify URL and check backend is running |
| CORS error | Add `cors()` middleware in Express |
| API key not found | Check `.env` file exists and is not in `.gitignore` |
| Rate limit error | Increase limit or check for spam requests |
| Anthropic returns 401 | Verify API key is correct and has credits |

---

## Resources

- [Anthropic API Docs](https://docs.anthropic.com)
- [Express.js Guide](https://expressjs.com)
- [Render Deployment](https://render.com/docs)
- [Railway Deployment](https://railway.app/docs)

---

**Your API key is now safe!** 🔒 The backend proxy approach is used by production apps everywhere. You're now following enterprise security best practices!

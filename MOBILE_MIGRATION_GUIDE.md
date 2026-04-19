# Kashefa TN – Mobile Migration Guide
## Implementation Instructions for Capacitor Plugins & Backend Setup

This guide walks you through implementing the critical mobile adaptations for your Kashefa TN app.

---

## Phase 1: Backend Setup (API Key Security) 🔐

### Why This Matters
Your Anthropic API key is currently hardcoded in `script.js`, which means anyone can steal it by inspecting your app code. **This is a critical security vulnerability.** 

### Solution: Backend Proxy
You'll create a simple backend server that:
1. Stores your API key securely (never exposed to client)
2. Receives requests from the mobile app
3. Forwards requests to Anthropic with your key attached
4. Returns responses back to the app

### Option A: Node.js + Express (Recommended)

#### Step 1: Create a Backend Project
```bash
mkdir kashafa-backend
cd kashafa-backend
npm init -y
npm install express cors dotenv axios
```

#### Step 2: Create `.env` File
```
ANTHROPIC_API_KEY=your_actual_key_here
PORT=3000
```

#### Step 3: Create `server.js`
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
    console.error('Proxy error:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({ 
      error: error.message,
      details: error.response?.data,
    });
  }
});

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
```

#### Step 4: Test Locally
```bash
node server.js
# In another terminal:
curl -X POST http://localhost:3000/api/claude \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [{"role": "user", "content": "Hello"}],
    "model": "claude-3-5-sonnet-20241022"
  }'
```

#### Step 5: Deploy to Cloud
**Popular free/cheap options:**
- **Render.com** (free tier available)
- **Railway.app** ($5/month)
- **Heroku** (paid, formerly free)
- **AWS Lambda** (pay per request)

**Example: Deploy to Render.com**
1. Create account at [Render.com](https://render.com)
2. Connect GitHub repo with your `server.js`
3. Create Web Service with these settings:
   - Build command: `npm install`
   - Start command: `node server.js`
   - Environment: Add `ANTHROPIC_API_KEY` and `PORT=3000`
4. Deploy! You'll get a public URL like `https://kashafa-backend.onrender.com`

#### Step 6: Update Your App's script.js
Replace the API call section with:
```javascript
// Replace this line (DELETE IT):
// window.ANTHROPIC_API_KEY = window.ANTHROPIC_API_KEY || 'YOUR_ANTHROPIC_API_KEY_HERE';

// Add this instead (your backend URL):
window.CLAUDE_API_ENDPOINT = 'https://kashafa-backend.onrender.com/api/claude';

// Helper function to call Claude via backend
async function callClaude(messages, model = 'claude-3-5-sonnet-20241022', max_tokens = 1024) {
  try {
    const response = await fetch(window.CLAUDE_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages, model, max_tokens }),
    });
    
    if (!response.ok) {
      throw new Error(`Backend error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Claude API error:', error);
    throw error;
  }
}
```

### Option B: Python + Flask (Alternative)
```python
# requirements.txt
Flask==2.3.0
Flask-CORS==4.0.0
python-dotenv==1.0.0
anthropic==0.20.0

# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from anthropic import Anthropic
import os
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)
CORS(app)

client = Anthropic(api_key=os.getenv('ANTHROPIC_API_KEY'))

@app.route('/api/claude', methods=['POST'])
def claude_proxy():
    data = request.json
    try:
        response = client.messages.create(
            model=data.get('model', 'claude-3-5-sonnet-20241022'),
            max_tokens=data.get('max_tokens', 1024),
            messages=data['messages'],
        )
        return jsonify(response)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/health')
def health():
    return jsonify({'status': 'ok'})

if __name__ == '__main__':
    app.run(debug=True, port=3000)
```

---

## Phase 2: Data Persistence (Capacitor Preferences) 💾

### Current Problem
`localStorage` gets cleared on mobile when OS needs space. You'll lose all scout data!

### Solution: Use Capacitor Preferences Plugin

#### Step 1: Install Dependency
```bash
npm install @capacitor/preferences
npx cap sync
```

#### Step 2: Add to script.js (Top of file, after API endpoint)
```javascript
import { Preferences } from '@capacitor/preferences';

// ================================================
// PERSISTENT STORAGE HELPER
// ================================================
const StorageManager = {
  async saveState() {
    try {
      await Preferences.set({
        key: 'kashafa_app_state',
        value: JSON.stringify(APP_STATE),
      });
      console.log('✅ State saved to device storage');
    } catch (error) {
      console.error('❌ Save failed:', error);
    }
  },

  async loadState() {
    try {
      const result = await Preferences.get({ key: 'kashafa_app_state' });
      if (result.value) {
        const savedState = JSON.parse(result.value);
        // Merge saved state with defaults
        Object.assign(APP_STATE, savedState);
        console.log('✅ State loaded from device storage');
      }
    } catch (error) {
      console.error('❌ Load failed:', error);
    }
  },

  async clearState() {
    try {
      await Preferences.remove({ key: 'kashafa_app_state' });
      console.log('✅ State cleared');
    } catch (error) {
      console.error('❌ Clear failed:', error);
    }
  }
};

// Load state when app starts
window.addEventListener('DOMContentLoaded', async () => {
  await StorageManager.loadState();
  // ... rest of your init code
});

// Save state whenever members or games change
const autoSaveState = () => {
  StorageManager.saveState();
};
```

#### Step 3: Update Functions to Auto-Save
Find these functions in `script.js` and add `autoSaveState()` at the end:

**After `addMember()`:**
```javascript
function addMember() {
  // ... existing code ...
  autoSaveState(); // ADD THIS LINE
}
```

**After `removeMember()`:**
```javascript
function removeMember(id) {
  // ... existing code ...
  autoSaveState(); // ADD THIS LINE
}
```

**After `awardXP()` (if it exists):**
```javascript
function awardXP(memberId, amount) {
  // ... existing code ...
  autoSaveState(); // ADD THIS LINE
}
```

**After `setPriority()`:**
```javascript
function setPriority(id, val) {
  // ... existing code ...
  autoSaveState(); // ADD THIS LINE
}
```

---

## Phase 3: Native Camera Integration 📸

### Current Problem
`<input type="file">` opens a basic file picker—not native camera access.

### Solution: Use Capacitor Camera Plugin

#### Step 1: Install Dependencies
```bash
npm install @capacitor/camera @capacitor/filesystem
npx cap sync android
npx cap sync ios
```

#### Step 2: Update index.html

**Find this section (around line 780):**
```html
<div class="text-center mb-5">
  <div id="photoPreview" onclick="document.getElementById('photoInput').click()"
       style="width:80px;height:80px;margin:0 auto 8px;border:3px solid var(--outline);border-radius:50%;background:var(--honey);display:flex;align-items:center;justify-content:center;font-size:2.2rem;box-shadow:4px 4px 0 var(--outline);cursor:pointer;animation:treeSway 2s ease-in-out infinite alternate">
    📸
  </div>
  <input type="file" id="photoInput" accept="image/*" class="hidden" onchange="previewPhoto(this)"/>
  <p style="font-size:0.75rem;color:#888">انقر لإضافة صورة</p>
</div>
```

**Replace with:**
```html
<div class="text-center mb-5">
  <div id="photoPreview" onclick="capturePhotoNative()"
       style="width:80px;height:80px;margin:0 auto 8px;border:3px solid var(--outline);border-radius:50%;background:var(--honey);display:flex;align-items:center;justify-content:center;font-size:2.2rem;box-shadow:4px 4px 0 var(--outline);cursor:pointer;animation:treeSway 2s ease-in-out infinite alternate">
    📸
  </div>
  <p style="font-size:0.75rem;color:#888">انقر لالتقاط صورة أو اختيار من المعرض</p>
</div>
```

#### Step 3: Add to script.js
```javascript
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

// ================================================
// NATIVE CAMERA PHOTO CAPTURE
// ================================================
async function capturePhotoNative() {
  try {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt, // Let user choose camera or gallery
    });

    // Update preview
    memberPhotoData = image.dataUrl;
    const prev = document.getElementById('photoPreview');
    prev.innerHTML = `<img src="${image.dataUrl}" style="width:100%;height:100%;border-radius:50%;object-fit:cover"/>`;
    prev.style.animation = 'none';
    
    console.log('✅ Photo captured successfully');
  } catch (error) {
    console.log('❌ Photo capture cancelled or failed:', error);
  }
}

// Keep this for web (file input fallback)
function previewPhoto(input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    memberPhotoData = e.target.result;
    const prev = document.getElementById('photoPreview');
    prev.innerHTML = `<img src="${e.target.result}" style="width:100%;height:100%;border-radius:50%;object-fit:cover"/>`;
    prev.style.animation = 'none';
  };
  reader.readAsDataURL(file);
}
```

#### Step 4: Add Permissions (Android)

**Edit `android/app/src/main/AndroidManifest.xml`:**
```xml
<!-- Add these permissions inside <manifest> tag: -->
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

#### Step 5: Add Permissions (iOS)

**Edit `ios/App/App/Info.plist`:**
```xml
<key>NSCameraUsageDescription</key>
<string>We need camera access to capture scout photos</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>We need access to your photo library to select scout photos</string>
<key>NSPhotoLibraryAddOnlyUsageDescription</key>
<string>We need permission to save photos</string>
```

---

## Phase 4: Open Wikipedia Links Inside App 🌐

### Current Problem
Wikipedia links open in system browser (`target="_blank"`), taking user out of the app.

### Solution: Use Capacitor Browser Plugin

#### Step 1: Install
```bash
npm install @capacitor/browser
npx cap sync
```

#### Step 2: Update index.html

**Find all Wikipedia links (search for `target="_blank"` with Wikipedia URLs):**

**Around line 1833:**
```html
<a href="https://ar.wikipedia.org/wiki/${encodeURIComponent(g.name)}" target="_blank" class="field-note" style="text-decoration:none">
```

**Replace with:**
```html
<a href="javascript:openWikipedia('https://ar.wikipedia.org/wiki/${encodeURIComponent(g.name)}')" class="field-note" style="text-decoration:none;cursor:pointer">
```

**Do the same for line 1844 and line 1869.**

#### Step 3: Add Function to script.js
```javascript
import { Browser } from '@capacitor/browser';

// ================================================
// OPEN EXTERNAL LINKS (WIKIPEDIA)
// ================================================
async function openWikipedia(url) {
  try {
    await Browser.open({ url });
  } catch (error) {
    // Fallback for web
    window.open(url, '_blank');
  }
}
```

---

## Phase 5: Complete script.js Template

Here's a complete updated template for `script.js` with all plugins integrated:

```javascript
// ================================================
// IMPORTS (Add to top of script.js)
// ================================================
import { Preferences } from '@capacitor/preferences';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Browser } from '@capacitor/browser';

// ================================================
// API CONFIGURATION (REMOVE old key line)
// ================================================
// DELETE THIS: window.ANTHROPIC_API_KEY = 'YOUR_KEY_HERE';
// ADD THIS INSTEAD:
window.CLAUDE_API_ENDPOINT = 'https://your-backend-domain.com/api/claude';

// ================================================
// STORAGE MANAGER (Add after API config)
// ================================================
const StorageManager = {
  async saveState() {
    try {
      await Preferences.set({
        key: 'kashafa_app_state',
        value: JSON.stringify(APP_STATE),
      });
      console.log('✅ State saved');
    } catch (error) {
      console.error('❌ Save failed:', error);
    }
  },

  async loadState() {
    try {
      const result = await Preferences.get({ key: 'kashafa_app_state' });
      if (result.value) {
        const savedState = JSON.parse(result.value);
        Object.assign(APP_STATE, savedState);
        console.log('✅ State loaded');
      }
    } catch (error) {
      console.error('❌ Load failed:', error);
    }
  },
};

const autoSaveState = () => StorageManager.saveState();

// ================================================
// CAMERA FUNCTIONS (Add with other functions)
// ================================================
async function capturePhotoNative() {
  try {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt,
    });

    memberPhotoData = image.dataUrl;
    const prev = document.getElementById('photoPreview');
    prev.innerHTML = `<img src="${image.dataUrl}" style="width:100%;height:100%;border-radius:50%;object-fit:cover"/>`;
    prev.style.animation = 'none';
  } catch (error) {
    console.log('Photo capture cancelled');
  }
}

// ================================================
// BROWSER FUNCTIONS (Add with other functions)
// ================================================
async function openWikipedia(url) {
  try {
    await Browser.open({ url });
  } catch (error) {
    window.open(url, '_blank');
  }
}

// ... REST OF YOUR EXISTING CODE ...
```

---

## Phase 6: Build & Test 🚀

### Build and Sync
```bash
npm install
npx cap sync
```

### Android Testing
```bash
npx cap open android
# In Android Studio:
# 1. Select your device/emulator
# 2. Click Run (or Shift+F10)
```

### iOS Testing
```bash
npx cap open ios
# In Xcode:
# 1. Select your target device
# 2. Click Run (or Cmd+R)
```

### Testing Checklist
- [ ] App loads without errors
- [ ] Photo capture opens camera/gallery
- [ ] Photo preview updates with selected image
- [ ] Wikipedia links open in in-app browser
- [ ] Scout data persists after closing app
- [ ] Adding/removing members saves to device storage

---

## Phase 7: Troubleshooting 🐛

| Issue | Solution |
|-------|----------|
| `Cannot find module 'Preferences'` | Run `npm install @capacitor/preferences` and `npx cap sync` |
| Camera doesn't open on Android | Check AndroidManifest.xml permissions and ask for runtime permissions |
| Wikipedia links still open in browser | Ensure you imported `Browser` and called `openWikipedia()` |
| Data not persisting | Check that `autoSaveState()` is being called after state changes |
| Backend endpoint 404 | Verify backend URL is correct and server is running |

---

## Summary

✅ **After completing all phases:**
1. Your API key is secured in a backend proxy
2. Scout data persists using native device storage
3. Users can capture photos with native camera
4. Wikipedia links stay inside the app
5. App is production-ready for Google Play & App Store

**Next Steps:**
1. Set up backend (Node.js or Python)
2. Update `script.js` with new plugin code
3. Update `index.html` with new photo UI
4. Run `npm install` and `npx cap sync`
5. Test on Android/iOS
6. Deploy!

---

**Questions?** Refer back to specific sections or consult [Capacitor Docs](https://capacitorjs.com/docs)

# Kashefa TN – Scout Educational Game (Mobile)

A cartoon-themed educational game for Tunisian Scouts, built as a native mobile app using **Capacitor.js**. Runs on both Android and iOS with full RTL Arabic support.

## 📋 Overview

**Kashefa TN** is a production-ready mobile app featuring:
- **Leader Dashboard**: Manage scout members, view stats, set game priorities
- **Spin Wheel Selector**: Randomly pick scouts for activities based on skill/XP
- **Interactive Games**: 4 educational mini-games (song, knot, flag, hand signals)
- **Experience System**: Scout members earn XP and unlock new content
- **Knowledge Library**: Wikipedia integration, geography, nature facts
- **100% Arabic**: Full RTL support with Tajawal fonts

All visual assets are pure SVG/CSS—no image dependencies except user-uploaded photos.

---

## 🛠️ Prerequisites

Before building for mobile, ensure you have:

1. **Node.js** (v14+) and **npm** (v6+)
   - [Download](https://nodejs.org/en/)
   - Verify: `node --version` and `npm --version`

2. **For Android:**
   - Java Development Kit (JDK 11+)
   - Android SDK (min API 21)
   - Android Studio (recommended)
   - [Setup guide](https://capacitorjs.com/docs/android)

3. **For iOS:**
   - macOS with Xcode 12+
   - CocoaPods
   - [Setup guide](https://capacitorjs.com/docs/ios)

---

## 📦 Installation

### 1. Clone/Download the Project
```bash
# If using version control:
git clone <repo-url>
cd kashafa_mobile

# Or navigate to your project folder
cd /path/to/kashafa_mobile
```

### 2. Install Dependencies
```bash
npm install
```
This installs Capacitor CLI and core packages.

### 3. Prepare Web Files
Capacitor expects web files in a `www` folder. **Create the `www` folder and copy your files:**

```bash
mkdir -p www
cp index.html www/
cp style.css www/
cp script.js www/
```

Or use a build tool if you have one (e.g., gulp, webpack). For this project, we don't have a build step—just copy files.

**File structure should look like:**
```
kashafa_mobile/
├── index.html
├── style.css
├── script.js
├── capacitor.config.json
├── package.json
├── README.md
├── www/                    ← Capacitor reads from here
│   ├── index.html
│   ├── style.css
│   └── script.js
├── node_modules/
└── (ios/, android/ folders added later)
```

---

## 🔐 API Key Setup

The app uses the **Anthropic Claude API** for advanced features (if extended). 

### Replace the Placeholder:
Edit `www/script.js` and find:
```javascript
window.ANTHROPIC_API_KEY = window.ANTHROPIC_API_KEY || 'YOUR_ANTHROPIC_API_KEY_HERE';
```

Replace `'YOUR_ANTHROPIC_API_KEY_HERE'` with your actual key:
```javascript
window.ANTHROPIC_API_KEY = 'sk-ant-abc123xyz...';
```

⚠️ **Security Warning:** Client-side API keys are exposed. For production, use a **backend proxy**:
- Create a server endpoint that securely stores the key
- Have the app call `/api/claude` instead of calling Anthropic directly
- Example tech stack: Node.js + Express, Python + Flask, etc.

---

## 📱 Building for Android

### Step 1: Add Android Platform
```bash
npx cap add android
```
This generates the `android/` folder with Gradle build files.

### Step 2: Sync Capacitor
```bash
npx cap sync android
```
This copies `www/` files into the Android project.

### Step 3: Open in Android Studio
```bash
npx cap open android
```
Android Studio will launch. Select your target device (emulator or connected phone).

### Step 4: Build & Run
- **In Android Studio:** Click `▶ Run` or press `Shift+F10`
- Or from terminal:
  ```bash
  cd android
  ./gradlew assembleDebug
  ```

---

## 🍎 Building for iOS

### Step 1: Add iOS Platform
```bash
npx cap add ios
```
This generates the `ios/` folder with Xcode project.

### Step 2: Sync Capacitor
```bash
npx cap sync ios
```
Copies `www/` files into the iOS project.

### Step 3: Open in Xcode
```bash
npx cap open ios
```
Xcode will launch with the workspace open.

### Step 4: Build & Run
- Select your target device (simulator or phone)
- Click the `▶ Run` button or press `Cmd+R`

---

## 🔄 Workflow: Make Changes → Rebuild

When you edit `index.html`, `style.css`, or `script.js`:

1. **Copy to `www/`:**
   ```bash
   cp index.html www/
   cp style.css www/
   cp script.js www/
   ```

2. **Sync with Capacitor:**
   ```bash
   npx cap sync
   ```

3. **Reload in emulator/phone** or rebuild:
   - **Android:** Press `r` in Android Studio or rebuild
   - **iOS:** `Cmd+R` in Xcode to rebuild

---

## 📚 Features & Usage

### Login Screen (Demo Credentials)
- **Leader Email:** `leader@scouts.tn`
- **Leader Password:** `scout123`
- **Member ID:** `KSF-TN-0001` (or 0002, 0003, 0004)

### Leader Dashboard
- View all registered scouts
- Add new scout members with photos
- Manage game priorities (high/mid/low)
- Track XP and completed games

### Spin Wheel
- Selects the least-active scout
- Takes into account skill level and game count
- Beautiful animation with cartoon aesthetics

### Games (4 Mini-Games)
1. **🎵 Song:** Learn & repeat the scout anthem
2. **🪢 Knot:** Step-by-step square knot tutorial
3. **🚩 Flag:** Scout flag salute steps
4. **🤟 Signs:** Hand signal meanings

### Knowledge Library
- **Wikipedia:** Search for any topic
- **Geography:** Mountains, deserts, seas, islands, rivers
- **Nature:** Animals, plants, insects
- All links open Wikipedia in the external browser

---

## ⚙️ Configuration

### Splash Screen
Edit `capacitor.config.json` to customize:
```json
"SplashScreen": {
  "launchShowDuration": 2000,
  "backgroundColor": "#0891B2"
}
```

### App Name & ID
Modify `capacitor.config.json`:
```json
{
  "appId": "tn.kashefa.scout",        // Bundle ID (iOS) / Package name (Android)
  "appName": "Kashefa TN",             // Display name
  "webDir": "www"                      // Folder with web files
}
```

### RTL/Arabic Support
All CSS and HTML are RTL-enabled:
- `<html dir="rtl" lang="ar">`
- Fonts: Tajawal (Arabic), Fredoka One (Display)
- Full RTL layout for all screens

---

## 🚀 Advanced: Extending Features

### Add Camera Plugin (Replace File Input)
```bash
npm install @capacitor/camera
npx cap sync
```

Update `script.js`:
```javascript
import { Camera, CameraResultType } from '@capacitor/camera';

async function capturePhoto() {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.DataUrl
  });
  memberPhotoData = image.dataUrl;
  // Update preview...
}
```

### Add File Storage (LocalStorage → Secure Storage)
```bash
npm install @capacitor/storage
```

### Add Native Notifications
```bash
npm install @capacitor/local-notifications
npx cap sync
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| `www/` folder not found | Create it manually: `mkdir www` and copy files |
| Capacitor modules not found | Run `npm install` then `npx cap sync` |
| Android build fails | Check Java/SDK paths, run `./gradlew clean` |
| iOS build fails | Run `pod install` in `ios/App` folder |
| App crashes on startup | Check browser console: In Android Studio, use Logcat |
| API key not working | Ensure key is replaced in `script.js` (not default placeholder) |
| Wikipedia links don't open | Requires internet connection; verify network settings |
| Arabic text not displaying | Check fonts loaded: `npx cap open` → inspect in DevTools |

---

## 📋 Important Constraints & Notes

### 1. **API Security**
- The Anthropic API key is **exposed client-side**
- Anyone can see it in the app code
- **Solution for production:** Use a backend proxy (Node.js, Python, etc.)
- Backend stores key securely, app calls `/api/claude` instead

### 2. **Photo Upload on Mobile**
- Currently uses `<input type="file">` 
- Mobile browsers may have limited UX
- **Better option:** Install `@capacitor/camera` plugin for native camera access
- Example: "Take Photo" button → opens device camera directly

### 3. **External Links (Wikipedia)**
- All Wikipedia links open in the **external browser** 
- This is intentional to keep app lightweight
- **Alternative:** Use `InAppBrowser` plugin to open links inside the app
  ```bash
  npm install @capacitor/inapp-browser
  ```

### 4. **LocalStorage Persistence**
- Scout data and game progress stored in `localStorage`
- **Persists across app restarts** ✓
- **Not synced** across devices
- **Solution:** Add Firebase or backend to sync data

### 5. **Internet Connectivity**
- App **requires internet** for:
  - Wikipedia lookups
  - Anthropic API calls (if extended)
- Offline mode can be added with Service Workers

### 6. **Target API Level**
- Minimum API: **21** (Android 5.0)
- Recommended: **API 30+** (Android 11+)
- For iOS: **iOS 12+** (configurable in `ios/App/Podfile`)

---

## 📱 Platform-Specific Notes

### Android
- **File size:** ~50MB (includes Capacitor runtime + Chrome WebView)
- **Storage:** App stores user data in `localStorage` (typically 5-10MB limit)
- **Permissions:** None required by default (file upload uses system dialog)
- **Target devices:** Tablets supported (responsive layout)

### iOS
- **File size:** ~60MB 
- **App Store requirements:** 
  - Privacy policy link (needed for App Store submission)
  - Usage descriptions for camera/photos if added
- **Minimum version:** iOS 12 (can be raised to 14+ for latest features)

---

## 📦 Deploy to App Stores

### Google Play
1. Create a signed APK/AAB:
   ```bash
   cd android
   ./gradlew bundleRelease
   ```
2. Upload `android/app/release/app-release.aab` to Google Play Console

### Apple App Store
1. Archive in Xcode: `Product → Archive`
2. Upload via Xcode or Transporter
3. Requires Apple Developer account ($99/year)

---

## 📞 Support & Contribution

This project is open for enhancements:
- Add more games
- Integrate backend for multiplayer
- Add push notifications
- Create leaderboard system
- Support for multiple leaders/groups

---

## 📄 License

Kashefa TN – Scout Educational Game
© 2026 Tunisian Scouts Association

All game content, illustrations, and source code are the property of the Tunisian Scout Association.
Commercial use prohibited. Educational use only.

---

## 🎯 Next Steps

1. ✅ Files are ready in `index.html`, `style.css`, `script.js`
2. ✅ Configuration files prepared (`capacitor.config.json`, `package.json`)
3. 👉 **Run `npm install`** to set up
4. 👉 **Create `www/` folder and copy files**
5. 👉 **Run `npx cap add android` OR `npx cap add ios`**
6. 👉 **Run `npx cap open android` / `npx cap open ios`** to launch IDE
7. 👉 **Build and run!** 🚀

Enjoy building Kashefa TN for mobile! 🏕️⚜️

---

*Last updated: April 2026*
*Capacitor version: 5.0.0*
#   h a 5 a t o n  
 "# ha5atonn" 

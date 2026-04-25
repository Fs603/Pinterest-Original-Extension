# 📌 Pinterest Original Overlay Downloader

A lightweight Chrome Extension that adds an **"Original"** button directly on Pinterest pins, allowing you to instantly open the **highest resolution version** of any image in a new tab.

---

## ✨ Features

- 🖼️ **One-click Original Image** — Opens the full-resolution image directly from Pinterest's CDN
- 🔍 **Smart Resolution Detection** — Automatically picks the largest image from `srcset`
- 📌 **Works on All Pin Types** — Feed pins, pin close-up pages, and pin image containers
- 🔄 **Auto-Switch Back** — After closing the image tab, browser automatically returns to your Pinterest tab
- ⚡ **Lightweight & Fast** — No background bloat, pure content script with MutationObserver
- 🎨 **Stylish Button** — Gradient overlay button with glow effect, minimal and non-intrusive

---

## 📸 Preview

The **"Original"** button appears on hover over any Pinterest pin:

```
┌─────────────────────┐
│  [Original]         │  ← Gradient button (top-left)
│                     │
│    📷 Pin Image     │
│                     │
└─────────────────────┘
```

---

## 🚀 Installation (Manual / Developer Mode)

Since this extension is not on the Chrome Web Store, install it manually:

1. **Download / Clone this repository**
   ```bash
   git clone https://github.com/your-username/pinterest-original-downloader.git
   ```

2. **Open Chrome Extensions page**
   - Go to: `chrome://extensions/`
   - Or: Menu → More Tools → Extensions

3. **Enable Developer Mode**
   - Toggle the **"Developer mode"** switch (top-right corner)

4. **Load the Extension**
   - Click **"Load unpacked"**
   - Select the folder where you cloned/downloaded this repo

5. **Done!** 🎉
   - Visit [pinterest.com](https://pinterest.com)
   - Hover over any pin — you'll see the **"Original"** button appear

---

## 🗂️ File Structure

```
pinterest-original-downloader/
│
├── manifest.json       # Extension config (Manifest V3)
├── background.js       # Service worker — handles tab open/switch logic
├── content.js          # Injects "Original" buttons on Pinterest pins
├── content.css         # Styles for the overlay button
└── README.md           # You are here
```

---

## ⚙️ How It Works

### `content.js`
- Watches the Pinterest DOM using **MutationObserver** (Pinterest is a SPA, so pins load dynamically)
- Finds pin containers using `data-test-id` selectors
- Extracts the **highest resolution URL** from the image's `srcset` attribute
- Injects a styled `"Original"` button on each pin
- On click, sends a message to the background service worker to open the image

### `background.js`
- Listens for `openImage` messages from content script
- Opens the image URL in a **new tab** (placed right next to the current tab)
- When the image tab is closed, **automatically switches back** to the Pinterest tab

### `content.css`
- Positions the button absolutely in the top-left of the pin
- Applies a **gold-to-red gradient** with a subtle glow effect
- Reverses gradient on hover for a polished feel

---

## 🛠️ Tech Stack

| Technology | Usage |
|------------|-------|
| JavaScript (ES6+) | Content script & background worker |
| Chrome Extension API (MV3) | Tab management, messaging |
| MutationObserver API | Dynamic DOM detection |
| CSS3 | Button styling & gradient effects |

---

## 🔒 Permissions Used

| Permission | Reason |
|------------|--------|
| `activeTab` | Access the current Pinterest tab |
| `scripting` | Inject content scripts dynamically |

> ⚠️ This extension does **not** collect, store, or transmit any user data.

---

## 📋 Browser Compatibility

| Browser | Supported |
|---------|-----------|
| Google Chrome | ✅ Yes |
| Microsoft Edge | ✅ Yes (Chromium-based) |
| Firefox | ❌ No (uses Chrome-specific APIs) |
| Safari | ❌ No |

---

## 🐛 Known Limitations

- Works only on **pinterest.com** (not localized domains like `pinterest.co.uk` — though these may work due to wildcard matching)
- Image resolution depends on what Pinterest's CDN serves — this extension fetches the **largest available** from `srcset`, not necessarily the original upload resolution
- Pinterest's DOM structure may change with site updates, which could require selector updates in `content.js`

---

## 🤝 Contributing

Pull requests are welcome! If Pinterest updates their DOM and the selectors break, feel free to:

1. Fork the repo
2. Update the selectors in `content.js`
3. Submit a PR with a description of what changed

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 💡 Tip

If you want even higher resolution images, after the image opens in a new tab, you can right-click → **"Open image in new tab"** to get the raw CDN URL which you can then modify (e.g., change `236x` to `originals` in the URL path on some Pinterest CDN links).

---

*Made with ❤️ for Pinterest power users who want their images in full quality.*

# Mindful Corgi Companion 🐕

A Chrome extension that provides AI-curated mood-boosting content to keep you motivated and balanced throughout your day. Get instant access to relaxation exercises, fun facts, productivity tips, and inspirational quotes - all with a charming corgi theme!

## License

This project is licensed under the [MIT License](./LICENSE).  
You are free to use, modify, and distribute this software in accordance with the terms of the license.

## Features ✨

- **Fun Facts**: Discover fascinating, scientifically accurate tidbits about science, nature, history, and human achievement
- **Relaxation Exercises**: Quick and simple exercises to help you de-stress during busy days
- **Inspirational Quotes**: Carefully selected quotes from historical figures and thought leaders
- **Productivity Tips**: Daily mindful tips to maximize your efficiency and focus

## Installation 🚀

### Step 1: Enable Chrome AI Features
1. Open a new tab in **Chrome Canary** and navigate to `chrome://flags/#optimization-guide-on-device-model`
2. Find and select "Enabled BypassPerfRequirement"
   * This bypasses performance checks that might prevent Gemini Nano from downloading on your device
3. Navigate to `chrome://flags/#prompt-api-for-gemini-nano`
4. Find and select "Enabled"
5. Click the "Relaunch" button at the bottom of the page to restart Chrome
6. Wait for Chrome to completely restart before proceeding

### Step 2: Install the Extension
7. Clone this repository:
```bash
git clone https://github.com/yourusername/mindful-corgi-companion.git
```
8. Open **Chrome Canary** and navigate to `chrome://extensions/`
9. Enable "Developer mode" using the toggle switch in the top right corner
10. Click "Load unpacked" and select the cloned repository folder

## How It Works 🛠️

The extension uses Chrome's Built-IN AI capabilities to generate personalized content:
- Click the extension icon to open the popup interface
- Press the "Get Tips" button to receive fresh content
- Click on any card to copy its content to your clipboard
- Each interaction is accompanied by adorable corgi animations!

## Technical Details 💻

- Built with vanilla JavaScript
- Utilizes Chrome's AI Prompt API
- No external dependencies or permissions required

## Project Structure 📁

```
mindful-corgi-companion/
├── images/
│   ├── quote.png
│   ├── relaxed.png
│   ├── inspired.png
│   ├── smart.png
│   └── sleeping.png
├── popup.js
├── hello.html
├── styles.css
├── manifest.json
└── README.md
```

## License 📄

This project is licensed under the MIT License

## Acknowledgments 🙏

- Corgi illustrations created with AI
- Built with Chrome's AI capabilities

## Support 💪

If you encounter any issues or have suggestions for improvements, please:
- Create a new issue with a detailed description

---

Made with ❤️ and lots of corgi inspiration 🐕

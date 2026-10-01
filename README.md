# 📝 YouTube Timestamped Markdown Notebook

[![Manifest V3](https://img.shields.io/badge/Manifest-V3-blue.svg)](https://developer.chrome.com/docs/extensions/mv3/intro/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-green.svg)](https://chrome.google.com)
[![Privacy: 100% Local](https://img.shields.io/badge/Privacy-100%25%20Local-brightgreen.svg)](#privacy--security)

A lightweight, high-performance Chrome Extension (Manifest V3) for taking timestamped Markdown notes and instant video bookmarks while watching technical talks, lectures, tutorials, and podcasts on YouTube.

---

## 📸 Interface Preview

```
┌────────────────────────────────────────────────────────────────────────┐
│ YouTube: Next.js 15 Full Tutorial (14:32 / 45:00)       [📝 Notes]    │
├──────────────────────────────────────────────────┬─────────────────────┤
│                                                  │ 📝 NOTEBOOK (Alt+N) │
│  [ Video Player ]                                │ ─────────────────── │
│                                                  │ [02:15] Server Comp │
│  ▶ ⏸ 🔊 ----------------●----- ⚙️ 🗖           │ [08:45] Action Hook │
│                                                  │ [14:32] Cache Rule  │
│                                                  │ ─────────────────── │
│                                                  │ 📥 Export .md File  │
└──────────────────────────────────────────────────┴─────────────────────┘
```

---

## 🌟 Key Features

- ⏱️ **Instant Timestamping (`Alt + N`)**: Press `Alt + N` (or `Option + N` on Mac) or click the floating button to insert the exact current video playback timestamp (`[MM:SS]`).
- 📝 **Markdown Note Drawer**: Sleek side drawer matching YouTube's native dark theme for structured note-taking.
- ▶️ **1-Click Timestamp Jump**: Click any timestamp badge in your notebook to seek directly to that exact second in the video.
- 📥 **Export to Markdown**: 1-click export of all video notes to `.md` files formatted with clickable YouTube timestamp links (compatible with Notion, Obsidian, and VS Code).
- ☁️ **Chrome Storage Sync**: Automatically syncs your notes across all your Chrome devices.

---

## 🚀 Easy Installation Guide

### Option 1: 1-Click Download (Recommended)
1. Download [**youtube-timestamped-markdown-notebook-v1.0.0.zip**](./youtube-timestamped-markdown-notebook-v1.0.0.zip).
2. Extract the unzipped folder on your machine.
3. Open Google Chrome and navigate to `chrome://extensions`.
4. Enable **Developer mode** in the top-right corner.
5. Click **Load unpacked** and select the unzipped directory.

### Option 2: Clone via Git
```bash
git clone https://github.com/giridharpatil333/youtube-timestamped-markdown-notebook.git
```
Then load the cloned folder in `chrome://extensions`.

---

## 💡 How to Use

1. Open any video on [YouTube](https://www.youtube.com).
2. Press **`Alt + N`** (or `Option + N` on Mac) to toggle the side notebook drawer.
3. Type your notes. Click **Insert Timestamp** or press the shortcut to record key moments.
4. Click **Export Notes (.md)** to download your markdown file.

---

## 🔒 Privacy & Security

Your notes remain 100% private in your browser's local `chrome.storage.sync`. No note content or video history is ever uploaded to external servers.

---

## 📜 License

MIT License © [Giridhar Patil](https://github.com/giridharpatil333).


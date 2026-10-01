// YouTube Timestamped Markdown Notebook Content Script
(function () {
  let notes = [];

  function formatTime(seconds) {
    const s = Math.floor(seconds);
    const hrs = Math.floor(s / 3600);
    const mins = Math.floor((s % 3600) / 60);
    const secs = s % 60;
    const pad = (n) => (n < 10 ? "0" + n : n);
    return hrs > 0 ? `${hrs}:${pad(mins)}:${pad(secs)}` : `${mins}:${pad(secs)}`;
  }

  function getYouTubeVideoElement() {
    return document.querySelector("video");
  }

  function getVideoTitle() {
    const titleEl = document.querySelector("h1.ytd-watch-metadata, h1.title");
    return titleEl ? titleEl.textContent.trim() : document.title;
  }

  function loadSavedNotes() {
    chrome.storage.sync.get(["ytNotes"], (res) => {
      notes = res.ytNotes || [];
      renderNotesList();
    });
  }

  function initUI() {
    if (document.getElementById("yt-nb-root")) return;

    const root = document.createElement("div");
    root.id = "yt-nb-root";
    root.innerHTML = `
      <button class="yt-nb-trigger-btn" id="yt-nb-trigger">
        <span>📝</span> Markdown Notes
      </button>
      <div class="yt-nb-drawer" id="yt-nb-drawer">
        <div class="yt-nb-header">
          <div class="yt-nb-title">📝 Timestamp Notebook</div>
          <button class="yt-nb-close" id="yt-nb-close">&times;</button>
        </div>
        <div class="yt-nb-body">
          <div class="yt-nb-quick-action">
            <button class="yt-nb-btn" id="yt-nb-snap">
              <span>⏱️</span> Add Timestamp (Alt+N)
            </button>
            <button class="yt-nb-btn" id="yt-nb-export">
              <span>📥</span> Export MD
            </button>
          </div>
          <textarea class="yt-nb-textarea" id="yt-nb-input" placeholder="Type timestamped Markdown note..."></textarea>
          <button class="yt-nb-btn" id="yt-nb-save" style="background:#ff0000; border:none; height:36px; font-weight:600;">Save Note</button>
          <div class="yt-nb-notes-list" id="yt-nb-list"></div>
        </div>
      </div>
    `;
    document.body.appendChild(root);

    const trigger = document.getElementById("yt-nb-trigger");
    const drawer = document.getElementById("yt-nb-drawer");
    const closeBtn = document.getElementById("yt-nb-close");
    const snapBtn = document.getElementById("yt-nb-snap");
    const saveBtn = document.getElementById("yt-nb-save");
    const exportBtn = document.getElementById("yt-nb-export");
    const input = document.getElementById("yt-nb-input");

    trigger.addEventListener("click", () => {
      drawer.classList.toggle("yt-nb-open");
      loadSavedNotes();
    });

    closeBtn.addEventListener("click", () => {
      drawer.classList.remove("yt-nb-open");
    });

    snapBtn.addEventListener("click", () => {
      insertCurrentTimestamp(input);
    });

    saveBtn.addEventListener("click", () => {
      const text = input.value.trim();
      if (!text) return;

      const video = getYouTubeVideoElement();
      const currTime = video ? video.currentTime : 0;
      const formatted = formatTime(currTime);

      const note = {
        id: "note_" + Date.now(),
        videoTitle: getVideoTitle(),
        url: window.location.href,
        timestampSeconds: currTime,
        timestampFormatted: formatted,
        text: text,
        createdAt: new Date().toISOString()
      };

      notes.unshift(note);
      chrome.storage.sync.set({ ytNotes: notes }, () => {
        input.value = "";
        renderNotesList();
      });
    });

    exportBtn.addEventListener("click", () => {
      exportAsMarkdownFile();
    });

    // Keyboard shortcut Alt + N
    document.addEventListener("keydown", (e) => {
      if (e.altKey && (e.key === "n" || e.key === "N")) {
        e.preventDefault();
        drawer.classList.add("yt-nb-open");
        insertCurrentTimestamp(input);
        input.focus();
      }
    });
  }

  function insertCurrentTimestamp(textarea) {
    const video = getYouTubeVideoElement();
    const currTime = video ? video.currentTime : 0;
    const formatted = formatTime(currTime);
    const tsTag = `[${formatted}] `;
    textarea.value = tsTag + textarea.value;
  }

  function renderNotesList() {
    const listEl = document.getElementById("yt-nb-list");
    if (!listEl) return;

    if (notes.length === 0) {
      listEl.innerHTML = `<div style="text-align:center; color:#888888; font-size:12px; margin-top:14px;">No timestamped notes yet.</div>`;
      return;
    }

    listEl.innerHTML = notes.map(n => `
      <div class="yt-nb-note-item">
        <div class="yt-nb-note-meta">
          <span class="yt-nb-timestamp-badge" data-time="${n.timestampSeconds}">▶ ${n.timestampFormatted}</span>
          <span style="font-size:10px; color:#888;">${new Date(n.createdAt).toLocaleDateString()}</span>
        </div>
        <div class="yt-nb-note-text">${escapeHtml(n.text)}</div>
      </div>
    `).join("");

    listEl.querySelectorAll(".yt-nb-timestamp-badge").forEach(badge => {
      badge.addEventListener("click", () => {
        const timeSec = parseFloat(badge.getAttribute("data-time"));
        const video = getYouTubeVideoElement();
        if (video) {
          video.currentTime = timeSec;
          video.play();
        }
      });
    });
  }

  function exportAsMarkdownFile() {
    if (notes.length === 0) {
      alert("No notes to export.");
      return;
    }

    let md = `# 📝 YouTube Timestamped Notes\n\n`;
    notes.forEach(n => {
      md += `### [${n.timestampFormatted}](${n.url}&t=${Math.floor(n.timestampSeconds)}s) - ${n.videoTitle}\n`;
      md += `${n.text}\n\n---\n\n`;
    });

    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `YouTube_Notes_${new Date().toISOString().slice(0, 10)}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function escapeHtml(str) {
    return (str || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initUI);
  } else {
    initUI();
  }
})();

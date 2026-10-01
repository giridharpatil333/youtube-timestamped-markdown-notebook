// YouTube Timestamped Notebook Popup Logic
document.addEventListener("DOMContentLoaded", () => {
  const notesList = document.getElementById("notes-list");
  const btnExport = document.getElementById("btn-export");

  let notes = [];

  function loadNotes() {
    chrome.storage.sync.get(["ytNotes"], (res) => {
      notes = res.ytNotes || [];
      render();
    });
  }

  function render() {
    if (notes.length === 0) {
      notesList.innerHTML = `<div style="text-align:center; color:#888; padding:20px; font-size:12px;">No saved timestamped notes yet.</div>`;
      return;
    }

    notesList.innerHTML = notes.map(n => `
      <div class="item">
        <div class="item-title">${escapeHtml(n.videoTitle)}</div>
        <div class="item-meta">
          <span style="color:#ff4e4e; font-weight:600;">[${n.timestampFormatted}]</span>
          <span>${n.text.slice(0, 30)}${n.text.length > 30 ? "..." : ""}</span>
        </div>
      </div>
    `).join("");
  }

  btnExport.addEventListener("click", () => {
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
  });

  function escapeHtml(str) {
    return (str || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  loadNotes();
});

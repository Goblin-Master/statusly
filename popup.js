// ============================================================
// Statusly — 查询逻辑
// ============================================================
(function () {
  "use strict";

  const CODES = window.HTTP_CODES || {};
  const CATEGORIES = window.HTTP_CATEGORIES || {};
  const QUICK_CODES = window.QUICK_CODES || [];

  const input = document.getElementById("code-input");
  const result = document.getElementById("result");
  const quickBar = document.getElementById("quick");

  // ---------- 工具 ----------
  function escapeHTML(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function categoryOf(code) {
    return CATEGORIES[Math.floor(code / 100)] || { label: "其他", cls: "" };
  }

  const COPY_ICON =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
    '<rect x="9" y="9" width="12" height="12" rx="2"></rect>' +
    '<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';

  // ---------- 渲染：结果卡片 ----------
  function renderCard(code) {
    const info = CODES[code];
    const cat = categoryOf(code);

    result.innerHTML =
      '<div class="card ' + cat.cls + '">' +
        '<div class="card-head">' +
          '<span class="code-num">' + code + "</span>" +
          '<span class="badge">' + escapeHTML(cat.label) + "</span>" +
          '<button class="copy-btn" id="copy-btn" title="复制状态码与名称">' +
            COPY_ICON + "<span>复制</span>" +
          "</button>" +
        "</div>" +
        '<div class="card-name">' + escapeHTML(info.name) + "</div>" +
        '<div class="card-desc">' + escapeHTML(info.desc) + "</div>" +
        (info.tip
          ? '<div class="card-tip"><strong>提示</strong>　' + escapeHTML(info.tip) + "</div>"
          : "") +
      "</div>";

    const btn = document.getElementById("copy-btn");
    if (btn) btn.addEventListener("click", function () { copyText(code + " " + info.name, btn); });
  }

  // ---------- 渲染：提示 / 错误 ----------
  function renderNotice(icon, title, textHTML, extraHTML) {
    result.innerHTML =
      '<div class="notice">' +
        '<div class="n-icon">' + icon + "</div>" +
        '<div class="n-title">' + escapeHTML(title) + "</div>" +
        '<div class="n-text">' + textHTML + "</div>" +
        (extraHTML || "") +
      "</div>";
    bindSuggestion();
  }

  // ---------- 渲染：空状态 ----------
  function renderEmpty() {
    result.innerHTML =
      '<div class="hint">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' +
          '<rect x="2" y="4" width="20" height="16" rx="3"></rect>' +
          '<path d="M6 10l3 2.5L6 15"></path><path d="M12 15h5"></path>' +
        "</svg>" +
        "<p><b>输入 100 – 599 之间的状态码</b><br>回车即可查询，数据全部内置本地</p>" +
        '<div class="legend">' +
          '<span><i style="background:var(--c2)"></i>2xx 成功</span>' +
          '<span><i style="background:var(--c3)"></i>3xx 重定向</span>' +
          '<span><i style="background:var(--c4)"></i>4xx 客户端错误</span>' +
          '<span><i style="background:var(--c5)"></i>5xx 服务器错误</span>' +
        "</div>" +
      "</div>";
  }

  // ---------- 渲染：未收录状态码 + 相近推荐 ----------
  function renderUnknown(code) {
    const all = Object.keys(CODES).map(Number);
    const sameClass = all.filter(function (c) { return Math.floor(c / 100) === Math.floor(code / 100); });

    let pool = sameClass.length ? sameClass : all;
    pool = pool
      .map(function (c) { return { c: c, d: Math.abs(c - code) }; })
      .sort(function (a, b) { return a.d - b.d; })
      .slice(0, 4)
      .map(function (item) { return item.c; })
      .sort(function (a, b) { return a - b; });

    const chips = pool
      .map(function (c) { return '<button data-code="' + c + '">' + c + "</button>"; })
      .join("");

    renderNotice(
      "🔍",
      "暂未收录 " + code,
      "没有找到状态码 <code>" + code + "</code> 的记录，可能是该码不常用或不在标准定义内。",
      pool.length
        ? '<div class="suggest"><div class="s-label">可以试试这些</div><div class="s-list">' + chips + "</div></div>"
        : ""
    );
  }

  function bindSuggestion() {
    result.querySelectorAll(".s-list button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        input.value = btn.dataset.code;
        lookup(btn.dataset.code);
      });
    });
  }

  // ---------- 主查询 ----------
  function lookup(raw) {
    const value = String(raw || "").trim();

    if (!value) {
      renderNotice("✏️", "请输入状态码", "在顶部输入框中填入 3 位数字，例如 <code>404</code>。");
      return;
    }

    if (!/^\d+$/.test(value)) {
      renderNotice("🔤", "只能输入数字", "状态码由 3 位数字组成，例如 <code>200</code>、<code>404</code>。");
      return;
    }

    if (value.length !== 3) {
      renderNotice(
        "🔢",
        "请输入 3 位状态码",
        "当前输入为 <code>" + escapeHTML(value) + "</code>，HTTP 状态码固定为 3 位数字。"
      );
      return;
    }

    const code = Number(value);
    if (code < 100 || code > 599) {
      renderNotice("📉", "超出状态码范围", "HTTP 状态码的范围是 <code>100</code> – <code>599</code>。");
      return;
    }

    if (!CODES[code]) {
      renderUnknown(code);
      return;
    }

    renderCard(code);
  }

  // ---------- 复制 ----------
  function copyText(text, btn) {
    const done = function () {
      const label = btn.querySelector("span");
      const original = label ? label.textContent : "";
      btn.classList.add("copied");
      if (label) label.textContent = "已复制";
      setTimeout(function () {
        btn.classList.remove("copied");
        if (label) label.textContent = original;
      }, 1200);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, function () { fallbackCopy(text, done); });
    } else {
      fallbackCopy(text, done);
    }
  }

  function fallbackCopy(text, done) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); done(); } catch (e) { /* 静默失败 */ }
    document.body.removeChild(ta);
  }

  // ---------- 事件绑定 ----------
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      lookup(input.value);
    } else if (e.key === "Escape") {
      input.value = "";
      renderEmpty();
    }
  });

  // 输入满 3 位数字时自动查询，其余情况保持当前结果
  input.addEventListener("input", function () {
    const value = input.value.trim();
    if (!value) renderEmpty();
    else if (/^\d{3}$/.test(value)) lookup(value);
  });

  input.addEventListener("focus", function () { input.select(); });

  // 快捷码
  QUICK_CODES.forEach(function (code) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = code;
    btn.addEventListener("click", function () {
      input.value = code;
      lookup(code);
      input.focus();
    });
    quickBar.appendChild(btn);
  });

  // ---------- 启动 ----------
  renderEmpty();
  input.focus();
})();

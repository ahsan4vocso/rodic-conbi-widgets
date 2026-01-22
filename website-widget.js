const SECRET_KEY = "jfsgbsiygfwefhvbweifhwhvah";

(function (root, factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = factory();
  } else {
    root.WebsiteWidget = factory();
  }
})(typeof window !== "undefined" ? window : globalThis, function () {
  "use strict";

  // ---- CSS (auto-injected once) -------------------------------------------------
  const CORE_STYLE_ID = "website-widget-core-style";
  const CSS = `
:root {
  --widget-primary: #ed792f;
  --widget-primary-2: #ff6900;
  --widget-fg: #ffffff;
  --widget-text: #1f2937;
  --widget-muted: #6b7280;
  --widget-bg: #ffffff;
  --widget-backdrop: #f8fafc;
  --widget-shadow: 0 20px 60px rgba(0,0,0,.15);
}
.website-widget{position:fixed;z-index:999999;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif}
.website-widget.pos-bottom-left{left:20px;bottom:20px}
.website-widget.pos-bottom-right{right:20px;bottom:20px}
.website-widget.pos-top-left{left:20px;top:20px}
.website-widget.pos-top-right{right:20px;top:20px}
.website-widget *{box-sizing:border-box}
.widget-button{width:60px;height:60px;border-radius:50%;background:linear-gradient(135deg,var(--widget-primary) 0%,var(--widget-primary-2) 100%);border:none;cursor:pointer;box-shadow:0 8px 25px rgba(102,126,234,.4);display:flex;align-items:center;justify-content:center;transition:all .3s cubic-bezier(.4,0,.2,1);position:relative;overflow:hidden}
.widget-button:hover{transform:translateY(-2px);box-shadow:0 12px 30px rgba(102,126,234,.6)}
.widget-button:active{transform:translateY(0)}
.widget-button svg{width:34px;height:34px;transition:transform .25s ease}
.widget-button .close-icon{position:absolute;transform:scale(0) rotate(180deg)}
.widget-button.active .website-icon{transform:scale(0) rotate(180deg)}
.widget-button.active .close-icon{transform:scale(1) rotate(0deg)}

.website-window{position:absolute;inset:auto auto auto auto;width:500px;height:650px;background:var(--widget-bg);border-radius:20px;box-shadow:var(--widget-shadow);transform:translateY(20px) scale(.95);opacity:0;visibility:hidden;transition:all .3s cubic-bezier(.4,0,.2,1);overflow:hidden;display:flex;flex-direction:column}
.website-window.active{transform:translateY(0) scale(1);opacity:1;visibility:visible}

/* offset relative to button */
.website-widget.pos-bottom-left .website-window{left:0;bottom:80px}
.website-widget.pos-bottom-right .website-window{right:0;bottom:80px}
.website-widget.pos-top-left .website-window{left:0;top:80px}
.website-widget.pos-top-right .website-window{right:0;top:80px}

.website-header{background:linear-gradient(135deg,var(--widget-primary) 0%,var(--widget-primary-2) 100%);color:var(--widget-fg);padding:16px 56px 16px 16px;text-align:center;position:relative;flex-shrink:0}
.website-header h3{font-size:1.05rem;font-weight:600;margin:0}
.website-header p{font-size:.9rem;opacity:.9;margin:4px 0 0 0}
.header-controls{position:absolute;right:12px;top:50%;transform:translateY(-50%);display:flex;align-items:center;gap:10px}
.status-indicator{width:8px;height:8px;background:#4ade80;border-radius:50%;animation:pulse 2s infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}
.refresh-button,
.open-tab-button{
  background:rgba(255,255,255,.2);
  border:none;
  color:var(--widget-fg);
  width:28px;
  height:28px;
  border-radius:6px;
  cursor:pointer;
  display:flex;
  align-items:center;
  justify-content:center;
  transition:all .2s ease;
}

.refresh-button:hover,
.open-tab-button:hover{
  background:rgba(255,255,255,.3);
}

.refresh-button:disabled{
  opacity:.5;
  cursor:not-allowed;
}

.refresh-button svg{
  width:22px;
  height:22px;
}
.open-tab-button svg{
  width:14px;
  height:14px;
}


.website-content{flex:1;display:flex;flex-direction:column;overflow:hidden}
.iframe-container{flex:1;background:var(--widget-backdrop);overflow:hidden;position:relative}
.website-iframe{width:100%;height:100%;border:none;background:#fff}
.loading-overlay{position:absolute;inset:0;background:#fff;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:16px;z-index:10;transition:opacity .3s ease}
.loading-overlay.hidden{opacity:0;pointer-events:none}
.loading-spinner{width:32px;height:32px;border:3px solid #e5e7eb;border-top:3px solid var(--widget-primary);border-radius:50%;animation:spin 1s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
.loading-text{color:var(--widget-muted);font-size:.9rem}
.error-message{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:32px 20px;text-align:center;color:var(--widget-muted);background:#fff}
.error-message h4{color:#374151;margin-bottom:8px;font-size:1.05rem}
.error-message p{font-size:.92rem;line-height:1.5;margin-bottom:16px}
.retry-button,.open-newtab-button{background:linear-gradient(135deg,var(--widget-primary) 0%,var(--widget-primary-2) 100%);color:#fff;border:none;padding:10px 16px;border-radius:8px;cursor:pointer;font-size:.9rem;transition:transform .2s ease;margin:0 6px}
.retry-button:hover,.open-newtab-button:hover{transform:translateY(-1px);box-shadow:0 4px 12px rgba(102,126,234,.3)}
.hidden{display:none !important}

/* Mobile */
@media (max-width:600px){
  .website-window{width:calc(100vw - 40px);height:70vh;max-height:600px}
}
@media (max-width:480px){
  .website-window{width:calc(100vw - 20px);left:-10px;height:75vh}
  .website-widget.pos-bottom-right .website-window{right:-10px}
  .website-widget.pos-top-right .website-window{right:-10px}
}
  `;

  function injectCssOnce() {
    if (document.getElementById(CORE_STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = CORE_STYLE_ID;
    style.textContent = CSS;
    document.head.appendChild(style);
  }

  // ---- Utilities ---------------------------------------------------------------
  const DEFAULTS = {
    websiteUrl: "https://ria.rodichub.com",
    position: "bottom-left", // 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'
    title: null, // if null, derived from URL
    subtitle: "Browse and explore",
    allowOrigins: null, // array of hostnames allowed to embed this widget; null => any
    email: null, // Email for magic link authentication
    onOpen: null,
    onClose: null,
    onLoad: null,
  };

  const VALID_POSITIONS = new Set([
    "bottom-left",
    "bottom-right",
    "top-left",
    "top-right",
  ]);

  function isHttpUrl(u) {
    try {
      const x = new URL(u, window.location.href);
      return x.protocol === "http:" || x.protocol === "https:";
    } catch {
      return false;
    }
  }

  function deriveTitle(url) {
    try {
      const u = new URL(url);
      return (u.hostname || "Website")
        .replace(/^www\./, "")
        .split(".")
        .slice(-2)
        .join(".");
    } catch {
      return "Website";
    }
  }

  function emitEvent(name, detail) {
    document.dispatchEvent(new CustomEvent(name, { detail }));
  }

  let COUNTER = 0;

  // add by jagan code......
  window.__WW_CURRENT_URL__ = null;

  window.addEventListener("message", (event) => {
    if (!event.data || event.data.type !== "ww-current-url") return;

    window.__WW_CURRENT_URL__ = event.data.href;
    console.log("Received iframe URL from benchmak:", window.__WW_CURRENT_URL__);
  });
  // ......end...............

  // ---- Class -------------------------------------------------------------------
  class WebsiteWidget {
    /**
     * @param {Object} options
     * @param {string} options.websiteUrl
     * @param {('bottom-left'|'bottom-right'|'top-left'|'top-right')} [options.position]
     * @param {string|null} [options.title]
     * @param {string} [options.subtitle]
     * @param {string[]|null} [options.allowOrigins]
     * @param {Function|null} [options.onOpen]
     * @param {Function|null} [options.onClose]
     * @param {Function|null} [options.onLoad]
     */
    constructor(options = {}) {
      injectCssOnce();

      this.options = Object.assign({}, DEFAULTS, options);

      // Try to get email from localStorage if not provided via attribute
      if (!this.options.email && typeof window !== 'undefined') {
        try {
          let email = null;

          // 1️⃣ Try user.email from localStorage
          const storedUser = localStorage.getItem('user');
          if (storedUser) {
            const userObj = JSON.parse(storedUser);
            if (userObj?.email) email = userObj.email;
          }

          // 2️⃣ Fallback to direct localStorage email
          if (!email) {
            const storedEmail = localStorage.getItem('email');
            if (storedEmail) email = storedEmail;
          }

          if (email) this.options.email = email;
        } catch (e) {
          // Ignore JSON parse or storage access errors
        }
      }

      // add code by jagan.....
      try {
        if (
          this.options.websiteUrl === 'https://benchmak.com/' ||
          this.options.websiteUrl === 'https://www.benchmak.com/'
        ) {
          const current = window.location.href;
          // Only override if we're actually on benchmak.com
          if (current.includes('benchmak.com')) {
            this.options.websiteUrl = current;
          }
        }
      } catch (e) {
        // ignore
      }
      // console.log('WebsiteWidget initialized with websiteUrl =', this.options.websiteUrl);
      // end code..................

      if (!VALID_POSITIONS.has(this.options.position)) {
        this.options.position = "bottom-left";
      }
      if (!isHttpUrl(this.options.websiteUrl)) {
        this.options.websiteUrl = DEFAULTS.websiteUrl;
      }
      if (
        Array.isArray(this.options.allowOrigins) &&
        this.options.allowOrigins.length
      ) {
        const host = window.location.hostname;
        if (!this.options.allowOrigins.includes(host)) {
          console.warn(
            "[WebsiteWidget] Host not allowed by allowOrigins. Widget will not render."
          );
          return; // hard stop
        }
      }

      this._id = `ww-${Date.now()}-${++COUNTER}`;
      this._open = false;
      this._iframeLoaded = false;
      this._loadTimer = null;

      this._render();
    }

    // ---------- Public API ----------
    openWidget() {
      if (!this.$root) return;
      if (this._open) return;
      this._open = true;
      this.$btn.classList.add("active");
      this.$win.classList.add("active");
      this._ensureIframe();
      if (typeof this.options.onOpen === "function") this.options.onOpen();
      emitEvent("widget:opened", { widget: this });
    }

    closeWidget() {
      if (!this.$root) return;
      if (!this._open) return;
      this._open = false;
      this.$btn.classList.remove("active");
      this.$win.classList.remove("active");
      if (typeof this.options.onClose === "function") this.options.onClose();
      emitEvent("widget:closed", { widget: this });
    }

    toggle() {
      this._open ? this.closeWidget() : this.openWidget();
    }

    changeWebsite(url) {
      if (!isHttpUrl(url)) return console.warn("[WebsiteWidget] Invalid URL");
      this.options.websiteUrl = url;
      this._setHeaderTexts();
      this._reloadIframe(true);
    }

    updateOptions(next = {}) {
      const prevPos = this.options.position;
      this.options = Object.assign({}, this.options, next);
      if (
        next.position &&
        VALID_POSITIONS.has(next.position) &&
        next.position !== prevPos
      ) {
        this.$root.classList.remove(`pos-${prevPos}`);
        this.$root.classList.add(`pos-${next.position}`);
      }
      if (next.title !== undefined || next.subtitle !== undefined) {
        this._setHeaderTexts();
      }
      if (next.websiteUrl) {
        this.changeWebsite(next.websiteUrl);
      }
    }

    destroy() {
      if (!this.$root) return;
      this.closeWidget();
      window.removeEventListener("keydown", this._escHandler);
      if (this._loadTimer) clearTimeout(this._loadTimer);
      this.$root.remove();
      this.$root = this.$win = this.$btn = this.$iframe = null;
    }

    // ---------- Internal ----------
    _render() {
      // Root
      const root = document.createElement("div");
      root.className = `website-widget pos-${this.options.position}`;
      root.setAttribute("data-id", this._id);

      // Button
      const btn = document.createElement("button");
      btn.className = "widget-button";
      btn.setAttribute("aria-label", "Open website widget");
      btn.innerHTML = `<svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-bot text-[#ed792f]"
              aria-hidden="true"
            >
              <path d="M12 8V4H8"></path>
              <rect width="16" height="12" x="4" y="8" rx="2"></rect>
              <path d="M2 14h2"></path>
              <path d="M20 14h2"></path>
              <path d="M15 13v2"></path>
              <path d="M9 13v2"></path>
            </svg>`;
      // Window
      const win = document.createElement("div");
      win.className = "website-window";
      win.setAttribute("role", "dialog");
      win.setAttribute("aria-modal", "false");

      // Header
      const header = document.createElement("div");
      header.className = "website-header";
      header.innerHTML = `
        <h3 class="ww-title"></h3>
        <p class="ww-subtitle"></p>
        <div class="header-controls">
          <span class="status-indicator" aria-hidden="true"></span>
          <button class="refresh-button" title="Refresh" aria-label="Refresh">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.65 6.35A7.95 7.95 0 0012 4a8 8 0 108 8h-2a6 6 0 11-6-6c1.66 0 3.14.69 4.22 1.78L14 10h6V4l-2.35 2.35z"/></svg>
          </button>

       
    <button class="open-tab-button" title="Open in Browser" aria-label="Open in Browser">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
           stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 3h3v3"></path>
        <path d="M12 11l9-9"></path>
        <path d="M21 9v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12"></path>
      </svg>
    </button>
        </div>`;

      // Content
      const content = document.createElement("div");
      content.className = "website-content";
      const iframeWrap = document.createElement("div");
      iframeWrap.className = "iframe-container";
      const loading = document.createElement("div");
      loading.className = "loading-overlay hidden";
      loading.innerHTML = `
        <div class="loading-spinner"></div>
        <div class="loading-text">Loading website…</div>`;

      const errorMsg = document.createElement("div");
      errorMsg.className = "error-message hidden";
      errorMsg.innerHTML = `
        <h4>Can't display this site here</h4>
        <p>The site prevents embedding inside other pages. You can still open it in a new tab.</p>
        <div>
          <button class="retry-button" type="button">Retry</button>
          <button class="open-newtab-button" type="button">Open in New Tab</button>
        </div>`;

      // Build DOM
      iframeWrap.appendChild(loading);
      iframeWrap.appendChild(errorMsg);
      content.appendChild(iframeWrap);
      win.appendChild(header);
      win.appendChild(content);
      root.appendChild(btn);
      root.appendChild(win);
      document.body.appendChild(root);

      // Save refs
      this.$root = root;
      this.$btn = btn;
      this.$win = win;
      this.$header = header;
      this.$title = header.querySelector(".ww-title");
      this.$subtitle = header.querySelector(".ww-subtitle");
      this.$iframeWrap = iframeWrap;
      this.$loading = loading;
      this.$error = errorMsg;
      this.$refresh = header.querySelector(".refresh-button");

      // add by jagan
      this.$openTab = header.querySelector('.open-tab-button');
      // 🔹 Open current page in a new tab

      // this.$openTab.addEventListener("click", () => {
      //   window.open(this.options.websiteUrl, "_blank", "noopener,noreferrer");
      // });
      // this.$openTab.addEventListener('click', () => {
      //     console.log("Opening URL jagan:", this.options.websiteUrl);
      //   window.open(
      //     this.options.websiteUrl,
      //     '_blank',
      //     'noopener,noreferrer'
      //   );
      // });
      // add code by jagan.......
      this.$openTab.addEventListener("click", () => {
        const urlToOpen = window.__WW_CURRENT_URL__ || this.options.websiteUrl;
        console.log("Opening URL from button:", urlToOpen);
        window.open(urlToOpen, "_blank", "noopener,noreferrer");
      });
      // this.$refresh = header.querySelector('.refresh-button');
      this.$refresh.addEventListener('click', () => this._reloadIframe(true));

      // 👇 Add this
      // this.$openTab = header.querySelector('.open-tab-button');
      // this.$openTab.addEventListener('click', () => {
      //   window.open(window.location.href, "_blank", "noopener,noreferrer");
      // });
      // ......................

      this._setHeaderTexts();

      // Events
      btn.addEventListener("click", () => this.toggle());
      this._escHandler = (e) => {
        if (e.key === "Escape" && this._open) this.closeWidget();
      };
      window.addEventListener("keydown", this._escHandler);

      // this.$refresh.addEventListener('click', () => this._reloadIframe(false));
      this.$refresh.addEventListener("click", () => this._reloadIframe(true));
      this.$error
        .querySelector(".retry-button")
        .addEventListener("click", () => this._reloadIframe(true));
      this.$error
        .querySelector(".open-newtab-button")
        .addEventListener("click", () => {
          window.open(this.options.websiteUrl, "_blank", "noopener,noreferrer");
        });
    }

    _setHeaderTexts() {
      const t = this.options.title || deriveTitle(this.options.websiteUrl);
      this.$title.textContent = t;
      this.$subtitle.textContent = this.options.subtitle || "";
    }

    _ensureIframe() {
      if (this.$iframe) return;
      const iframe = document.createElement("iframe");
      iframe.className = "website-iframe";
      // Secure defaults
      iframe.setAttribute("loading", "eager");
      iframe.setAttribute("referrerpolicy", "no-referrer-when-downgrade");
      iframe.setAttribute(
        "sandbox",
        "allow-scripts allow-forms allow-same-origin allow-popups"
      );

      this.$iframe = iframe;
      this.$iframeWrap.insertBefore(iframe, this.$loading);
      this._reloadIframe(true);
    }

    _reloadIframe(hard) {
      if (!this.$iframe) return;
      this.$error.classList.add("hidden");
      this.$loading.classList.remove("hidden");
      this.$refresh.disabled = true;
      this._iframeLoaded = false;
      if (this._loadTimer) clearTimeout(this._loadTimer);

      if (hard) {
        if (this.options.email) {
          this.$iframe.src = `${this.options.websiteUrl}/auth/magic?email=${this.options.email}&token=${SECRET_KEY}`;
        } else {
          this.$iframe.src = `${this.options.websiteUrl}/login`;
        }
      } else {
        this.$iframe.contentWindow?.location?.reload();
      }

      // Success path
      const onLoad = () => {
        this._iframeLoaded = true;
        this.$loading.classList.add("hidden");
        this.$error.classList.add("hidden");
        this.$refresh.disabled = false;
        if (typeof this.options.onLoad === "function") this.options.onLoad();
        emitEvent("website:loaded", { widget: this });
        this.$iframe.removeEventListener("load", onLoad);
      };
      this.$iframe.addEventListener("load", onLoad);

      // Failure/blocked fallback (X-Frame-Options / CSP frame-ancestors)
      this._loadTimer = setTimeout(() => {
        if (!this._iframeLoaded) {
          this.$loading.classList.add("hidden");
          this.$error.classList.remove("hidden");
          this.$refresh.disabled = false;
          emitEvent("website:error", { widget: this });
        }
      }, 6000); // 6s grace
    }
  }

  // ---- Auto-initialize from <script data-website-widget ...> -------------------
  function readOptionsFromDataset(ds) {
    const opts = {};
    if (ds.websiteUrl) opts.websiteUrl = ds.websiteUrl;
    if (ds.position && VALID_POSITIONS.has(ds.position))
      opts.position = ds.position;
    if (ds.title) opts.title = ds.title;
    if (ds.subtitle) opts.subtitle = ds.subtitle;
    if (ds.email) opts.email = ds.email;
    if (ds.allowOrigins) {
      try {
        opts.allowOrigins = ds.allowOrigins
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
      } catch { }
    }
    return opts;
  }

  function autoInitFromScripts() {
    const list = Array.from(
      document.querySelectorAll("script[data-website-widget]")
    );
    // Also include currentScript (covers the common single-tag case quickly)
    if (
      document.currentScript &&
      document.currentScript.dataset.websiteWidget !== undefined
    ) {
      if (!list.includes(document.currentScript))
        list.unshift(document.currentScript);
    }
    list.forEach((scr) => {
      try {
        const opts = readOptionsFromDataset(scr.dataset);
        const w = new WebsiteWidget(opts);
        // attach instance to script for debugging
        scr._websiteWidget = w;
      } catch (e) {
        console.error("[WebsiteWidget] auto-init failed:", e);
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", autoInitFromScripts);
  } else {
    autoInitFromScripts();
  }

  // Track instances (debugging / optional)
  if (!window.__WebsiteWidgets) window.__WebsiteWidgets = [];
  const _orig = WebsiteWidget;
  function WrappedWebsiteWidget(opts) {
    console.log("WebsiteWidget initialized with websiteUrl =", opts.websiteUrl);
    const inst = new _orig(opts);
    window.__WebsiteWidgets.push(inst);
    return inst;
  }
  WrappedWebsiteWidget.prototype = _orig.prototype;
  Object.setPrototypeOf(WrappedWebsiteWidget, _orig);

  return WrappedWebsiteWidget;
});

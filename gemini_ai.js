/* ——— GEMINI AI INTEGRATION ——— */
// Lấy API Key từ biến môi trường (.env) hoặc LocalStorage (An toàn cho mọi môi trường)
let GEMINI_API_KEY = "";
try {
  if (import.meta && import.meta.env) {
    GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";
  }
} catch (e) {
  console.warn("⚠️ [Quantum AI] Không thể truy cập import.meta.env, sử dụng LocalStorage làm dự phòng.");
}

if (!GEMINI_API_KEY) {
  GEMINI_API_KEY = window.localStorage.getItem('QUANTUM_API_KEY') || "";
}

if (GEMINI_API_KEY) {
  console.log("📡 [Quantum AI] API Key detected: " + GEMINI_API_KEY.substring(0, 4) + "...");
} else {
  console.warn("⚠️ [Quantum AI] No API Key found. Please check your .env file or set it in Chatbot settings.");
}

class UnifiedChatbot {
  constructor() {
    this.labHistory = [];
    this.genHistory = [];
    this.isTyping = false;
    this.currentMode = 'lab'; // 'lab', 'gen', or 'faq'
    this.activeBot = 'lab';
    this.lastReactionData = null;
    this.availableModels = [];
    this.workingModel = null;
    this.init();
  }

  init() {
    console.log("🛠️ [Quantum AI] Khởi tạo Chatbot...");
    this.injectHTML();
    this.addEventListeners();
    this.loadWelcomeMessage();
    this.discoverModels().then(available => {
      if (available && available.length > 0) {
        this.availableModels = available;
        console.log("🔍 [Quantum AI] Mô hình khả dụng:", available.join(', '));
      }
    });
    console.log("✅ [Quantum AI] Chatbot đã sẵn sàng!");
  }

  injectHTML() {
    const old = document.getElementById('unified-chatbot-container');
    if (old) old.remove();

    const container = document.createElement('div');
    container.id = 'unified-chatbot-container';
    container.className = 'chatbot-container';

    container.innerHTML = `
      <div id="chatbot-notification" class="chatbot-notification" style="display: none;">!</div>
      <button id="chatbot-toggle" class="chatbot-toggle" style="display: none;">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </button>
      
      <div id="chatbot-window" class="chatbot-window" style="width: 380px; height: 560px; display: none; flex-direction: column; position: fixed; bottom: 20px; right: 20px; z-index: 10000;">
        <!-- TABS NAVIGATION -->
        <div class="chatbot-modes" style="display: flex; background: rgba(15, 23, 42, 0.8); border-bottom: 1px solid var(--chat-border); padding: 6px 6px 0 6px; gap: 4px;">
          <button onclick="switchChatMode('lab')" id="tab-mode-lab" style="flex: 1; background: rgba(56, 189, 248, 0.15); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.3); border-bottom: none; padding: 10px 4px; border-radius: 8px 8px 0 0; font-family: 'Orbitron', sans-serif; font-size: 10px; font-weight: bold; cursor: pointer; transition: all 0.2s;">⚡ CHỈ HUY</button>
          <button onclick="switchChatMode('gen')" id="tab-mode-gen" style="flex: 1; background: transparent; color: #94a3b8; border: 1px solid transparent; border-bottom: none; padding: 10px 4px; border-radius: 8px 8px 0 0; font-family: 'Orbitron', sans-serif; font-size: 10px; font-weight: bold; cursor: pointer; transition: all 0.2s;">🌐 TRỢ LÝ</button>
        </div>

        <!-- SECTION 1: AI ASSISTANTS -->
        <div id="chat-section-ai" style="display: flex; flex-direction: column; flex: 1; overflow: hidden;">
          <div class="chat-header" style="padding: 10px 15px; display: flex; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 6px;">
              <div class="status-dot"></div>
              <h3 style="margin:0; font-size: 12px; letter-spacing: 0.5px;" id="chatbot-title">⚡ CHỈ HUY AI</h3>
            </div>
            <div style="display: flex; gap: 8px; align-items: center;">
              <button id="config-btn" title="Cấu hình API" style="background:rgba(56,189,248,0.1); border:1px solid rgba(56,189,248,0.3); color:#38bdf8; cursor:pointer; padding:5px; border-radius:4px; display:flex; align-items:center;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
              </button>
            </div>
          </div>

          <div id="api-config-panel" style="display:none; padding:12px; background:rgba(15,23,42,0.95); border-bottom:1px solid rgba(56,189,248,0.2); font-family: 'Inter', sans-serif;">
            <label style="display:block; margin-bottom:6px; color:#38bdf8; font-size:11px; font-weight:bold; letter-spacing:0.5px;">🔑 CẤU HÌNH GEMINI API KEY:</label>
            <div style="display:flex; gap:6px;">
              <input type="password" id="manual-api-key" placeholder="AIza..." style="flex:1; background:#000; border:1px solid rgba(255,255,255,0.1); color:#fff; padding:6px; border-radius:4px; font-size:11px;">
              <button id="save-api-key" style="background:#38bdf8; border:none; color:#000; padding:0 12px; border-radius:4px; cursor:pointer; font-weight:bold; font-size:11px;">LƯU</button>
            </div>
          </div>

          <div id="chatbot-messages" class="chat-messages"></div>
          <div class="typing-indicator" id="chatbot-typing">AI đang phân tích dữ liệu...</div>

          <div class="chat-input-area">
            <input type="text" id="chatbot-input" class="chat-input" placeholder="Hỏi về phản ứng hoặc hóa chất..." autocomplete="off">
            <button id="chatbot-send-btn" class="chat-send">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"></path></svg>
            </button>
          </div>
        </div>

        <!-- SECTION 2: FAQ -->
        </div>

        <!-- NO FAQ SECTION -->

      </div>
    `;
    document.body.appendChild(container);
  }

  addEventListeners() {
    const toggleBtn = document.getElementById('chatbot-toggle');
    if (toggleBtn) toggleBtn.onclick = () => this.toggle();

    const sendBtn = document.getElementById('chatbot-send-btn');
    if (sendBtn) sendBtn.onclick = () => this.handleUserInput();

    const input = document.getElementById('chatbot-input');
    if (input) {
      input.onkeypress = (e) => {
        if (e.key === 'Enter') this.handleUserInput();
      };
    }

    const configBtn = document.getElementById('config-btn');
    const configPanel = document.getElementById('api-config-panel');
    if (configBtn && configPanel) {
      configBtn.onclick = () => {
        configPanel.style.display = configPanel.style.display === 'none' ? 'block' : 'none';
      };
    }

    const saveBtn = document.getElementById('save-api-key');
    const keyInput = document.getElementById('manual-api-key');
    if (saveBtn && keyInput) {
      saveBtn.onclick = () => {
        const key = keyInput.value.trim();
        if (key) {
          window.localStorage.setItem('QUANTUM_API_KEY', key);
          GEMINI_API_KEY = key;
          alert('Đã cập nhật API Key thành công!');
          configPanel.style.display = 'none';
        }
      };
    }

    window.switchChatMode = (mode) => this.switchMode(mode);

    this.renderFAQs();
  }

  toggle() {
    console.log("📡 [Quantum AI] Yêu cầu đóng/mở khung chat...");
    const win = document.getElementById('chatbot-window');
    const notif = document.getElementById('chatbot-notification');
    if (!win) {
      console.error("❌ [Quantum AI] LỖI: Không tìm thấy #chatbot-window!");
      return;
    }

    const currentDisplay = window.getComputedStyle(win).display;
    console.log("📊 [Quantum AI] Trạng thái hiện tại:", currentDisplay);

    if (currentDisplay === 'none') {
      win.style.setProperty('display', 'flex', 'important');
      if (notif) notif.style.display = 'none';
      console.log("🔓 [Quantum AI] Đã HIỆN khung chat");
    } else {
      win.style.setProperty('display', 'none', 'important');
      console.log("🔒 [Quantum AI] Đã ẨN khung chat");
    }
  }

  switchMode(mode) {
    this.currentMode = mode;
    const secAI = document.getElementById('chat-section-ai');
    const secFAQ = document.getElementById('chat-section-faq');
    const tabLab = document.getElementById('tab-mode-lab');
    const tabGen = document.getElementById('tab-mode-gen');
    const tabFAQ = document.getElementById('tab-mode-faq');

    [tabLab, tabGen, tabFAQ].forEach(t => {
      if (t) {
        t.style.background = 'transparent';
        t.style.color = '#94a3b8';
        t.style.borderColor = 'transparent';
      }
    });

    if (mode === 'lab') {
      this.activeBot = 'lab';
      if (secAI) secAI.style.display = 'flex';
      if (secFAQ) secFAQ.style.display = 'none';
      if (tabLab) {
        tabLab.style.background = 'rgba(56, 189, 248, 0.15)';
        tabLab.style.color = '#38bdf8';
        tabLab.style.borderColor = 'rgba(56, 189, 248, 0.3)';
      }
      this.switchBot('lab');
    } else if (mode === 'gen') {
      this.activeBot = 'gen';
      if (secAI) secAI.style.display = 'flex';
      if (secFAQ) secFAQ.style.display = 'none';
      if (tabGen) {
        tabGen.style.background = 'rgba(56, 189, 248, 0.15)';
        tabGen.style.color = '#38bdf8';
        tabGen.style.borderColor = 'rgba(56, 189, 248, 0.3)';
      }
      this.switchBot('gen');
    }
  }

  switchBot(botId) {
    this.activeBot = botId;
    const title = document.getElementById('chatbot-title');
    if (title) {
      title.innerText = botId === 'lab' ? '⚡ CHỈ HUY AI' : '🌐 TRỢ LÝ CHUNG';
    }
    const msgArea = document.getElementById('chatbot-messages');
    if (msgArea) {
      msgArea.innerHTML = '';
      const historyToLoad = botId === 'lab' ? this.labHistory : this.genHistory;

      if (historyToLoad.length === 0) {
        this.loadWelcomeMessage();
      } else {
        historyToLoad.forEach(msg => {
          this.renderMessage(msg.role, msg.text);
        });
      }
    }
  }

  loadWelcomeMessage() {
    const msg = this.activeBot === 'gen'
      ? 'Xin chào! Tôi là Trợ lý AI Hóa học. Bạn có câu hỏi nào cần giải đáp không?'
      : 'Chào mừng đến với Trung tâm Chỉ huy Quantum. Tôi có thể thấy mọi phản ứng bạn đang thực hiện. Bạn cần tôi giải thích điều gì?';

    this.addMessage('ai', msg);
  }

  addMessage(role, text) {
    if (this.activeBot === 'lab') {
      this.labHistory.push({ role, text });
    } else {
      this.genHistory.push({ role, text });
    }
    this.renderMessage(role, text);
  }

  renderMessage(role, text) {
    const chatMsgs = document.getElementById('chatbot-messages');
    if (!chatMsgs) return;

    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${role}`;

    let formatted = text
      .replace(/\$([^\$]+)\$/g, (match, p1) => {
        let clean = p1
          .replace(/([A-Za-z])_?\{?(\d+)\}?/g, '$1<sub>$2</sub>') // Bắt cả H2, H_2, H_{2}
          .replace(/\^\{?([^\}]+)\}?/g, '<sup>$1</sup>') // Bắt Cu^{2+}, Cu^2+
          .replace(/(\d*[+-])$/g, '<sup>$1</sup>'); // Bắt Cu2+, Cl-
        return `<b style="color:#00ffcc">${clean}</b>`;
      })
      .replace(/^[-*]{3,}\s*$/gm, '<hr style="border: 0; border-top: 1px dashed rgba(255,255,255,0.2); margin: 15px 0;">') // Chuyển --- thành đường gạch ngang
      .replace(/^#+\s*(.*)$/gm, '<b style="color:#38bdf8">$1</b>') // Chuyển Header thành chữ đậm màu xanh
      .replace(/^[\*\-]\s*(.*)$/gm, '• $1') // Chuyển bullet points (* hoặc -) thành chấm tròn
      .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') // Chữ in đậm (**)
      .replace(/\*(.*?)\*/g, '<i>$1</i>') // Chữ in nghiêng (*)
      .replace(/^([🎯💡🌍⚠️].*):/gm, '<div style="color:#38bdf8; font-weight:bold; margin-top:10px; font-family:Orbitron, sans-serif;">$1</div>')
      .replace(/\n/g, '<br>');

    msgDiv.innerHTML = formatted;
    chatMsgs.appendChild(msgDiv);
    chatMsgs.scrollTop = chatMsgs.scrollHeight;
  }

  renderFAQs() {
    const faqSec = document.getElementById('chat-section-faq');
    if (!faqSec) return;

    const qaData = window.QA_DATA || [];
    faqSec.innerHTML = '';

    qaData.forEach(qa => {
      const item = document.createElement('div');
      item.style.background = 'rgba(30, 41, 59, 0.6)';
      item.style.border = '1px solid rgba(255,255,255,0.05)';
      item.style.borderRadius = '8px';
      item.style.padding = '12px';
      item.innerHTML = `
        <div style="color:#38bdf8; font-weight:bold; font-size:13px; margin-bottom:6px;">❓ ${qa.question}</div>
        <div style="color:#cbd5e1; font-size:12px; line-height:1.5; border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 6px;">${qa.answer}</div>
      `;
      faqSec.appendChild(item);
    });
  }

  notify(type, data) {
    if (this.activeBot !== 'lab') return;

    if (type === 'reaction') {
      this.lastReactionData = data;

      const win = document.getElementById('chatbot-window');
      if (win && win.style.display !== 'flex') {
        const toggle = document.getElementById('chatbot-toggle');
        if (toggle) {
          toggle.style.animation = 'bounce 0.5s 3';
          setTimeout(() => toggle.style.animation = '', 1500);
        }
      }
    }
  }

  getLabContext() {
    const state = window.state || {};
    let deskChemicals = [];
    const desk = document.getElementById('workspace');
    if (desk) {
      const labels = desk.querySelectorAll('.chemical-label, .beaker-label');
      labels.forEach(el => deskChemicals.push(el.innerText.trim()));
    }

    let recentLogs = [];
    const logEntries = document.querySelectorAll('.log-msg');
    if (logEntries.length > 0) {
      const start = Math.max(0, logEntries.length - 3);
      for (let i = start; i < logEntries.length; i++) {
        recentLogs.push(logEntries[i].innerText.trim());
      }
    }

    return `
      NGỮ CẢNH PHÒNG THÍ NGHIỆM HIỆN TẠI:
      - Nhiệt độ: ${state.currentTemp || 25}°C
      - Năng lượng IDCL: ${state.currentEnergy || 100}%
      - Vi phạm an toàn: ${state.safetyViolations || 0}
      - Phản ứng vừa xảy ra: ${this.lastReactionData ? this.lastReactionData.equation : 'Chưa có'}
      - Nhật ký gần đây: ${recentLogs.join(' | ')}
      - Hóa chất đang có trên bàn: ${deskChemicals.join(', ')}
    `;
  }

  async handleUserInput() {
    const input = document.getElementById('chatbot-input');
    if (!input || this.isTyping) return;

    const text = input.value.trim();
    if (!text) return;

    this.addMessage('user', text);
    input.value = '';
    this.showTyping(true);

    try {
      const response = await this.callGemini(text, this.activeBot === 'gen');
      this.addMessage('ai', response);
    } catch (error) {
      console.error('Gemini API Error:', error);
      this.addMessage('ai', 'Xin lỗi, tôi đang gặp sự cố khi kết nối với mạng lưới dữ liệu Quantum.');
    } finally {
      this.showTyping(false);
    }
  }

  showTyping(show) {
    this.isTyping = show;
    const ind = document.getElementById('chatbot-typing');
    if (ind) ind.style.display = show ? 'block' : 'none';
  }

  async callGemini(prompt, isGeneral = false) {
    if (!GEMINI_API_KEY) {
      throw new Error('Thiếu API Key.');
    }

    let context = "";
    let systemPrompt = "";

    if (isGeneral) {
      systemPrompt = `
        Bạn là một Trợ lý AI chuyên gia về Hóa học. 
        NHIỆM VỤ: Trò chuyện và trả lời các câu hỏi của người dùng một cách thân thiện và chính xác.
        
        QUY TẮC DANH PHÁP HÓA HỌC (TUYỆT ĐỐI TUÂN THỦ):
        - BẮT BUỘC dùng 100% tên danh pháp IUPAC (tiếng Anh) cho mọi hóa chất, kim loại, phi kim và ion.
        - TUYỆT ĐỐI KHÔNG dùng tên tiếng Việt cũ (Ví dụ: KHÔNG dùng Sắt, Đồng, Nhôm, Kẽm, Lưu huỳnh, Axit).
        - CHỈ ĐƯỢC DÙNG: Iron, Copper, Aluminium, Zinc, Sulfur, Acid, Hydroxide, Oxide, v.v...

        QUY TẮC TRÌNH BÀY:
        1. Nếu câu hỏi liên quan đến hóa học, hãy chia sẻ kiến thức chuyên sâu nhưng dễ hiểu.
        2. KHÔNG sử dụng các ký tự đặc biệt như *, #, _, ~ ở đầu câu hoặc bao quanh từ (trừ khi viết công thức).
        3. Viết công thức hóa học trong cặp dấu $ (Ví dụ: $H2SO4$, $Cu2+$, $NO3-$).
        4. Ngôn ngữ: Tiếng Việt, phong cách chuyên nghiệp.
      `;
    } else {
      context = this.getLabContext();
      systemPrompt = `
        Bạn là "Quantum Commander", trợ lý AI của QuantumLab. 
        NHIỆM VỤ: Giải thích phản ứng hóa học dựa trên dữ liệu phòng Lab.
        
        QUY TẮC DANH PHÁP HÓA HỌC (TUYỆT ĐỐI TUÂN THỦ):
        - BẮT BUỘC dùng 100% tên danh pháp IUPAC (tiếng Anh) cho mọi hóa chất, kim loại, phi kim và ion.
        - TUYỆT ĐỐI KHÔNG dùng tên tiếng Việt cũ (Ví dụ: KHÔNG dùng Sắt, Đồng, Nhôm, Kẽm, Lưu huỳnh, Axit).
        - CHỈ ĐƯỢC DÙNG: Iron, Copper, Aluminium, Zinc, Sulfur, Acid, Hydroxide, Oxide, v.v...

        QUY TẮC TRÌNH BÀY (BẮT BUỘC):
        1. Câu trả lời phải chia thành 4 phần rõ ràng (TUYỆT ĐỐI KHÔNG thêm phần giải thích thừa ở cuối): 
           - 🎯 TÓM TẮT: (Phản ứng là gì)
           - 💡 CƠ CHẾ & HIỆN TƯỢNG: (Giải thích ngay tại đây bằng gạch đầu dòng)
           - 🌍 ỨNG DỤNG THỰC TẾ: (Ứng dụng trong đời sống hoặc công nghiệp)
           - ⚠️ LƯU Ý AN TOÀN: (Cảnh báo nếu có. KẾT THÚC CÂU TRẢ LỜI TẠI ĐÂY)
        2. KHÔNG sử dụng các ký tự đặc biệt như *, #, _, ~ ở đầu câu hoặc bao quanh từ (trừ khi viết công thức).
        3. Viết công thức hóa học trong cặp dấu $ (Ví dụ: $H2SO4$, $Cu2+$, $NO3-$).
        4. Ngôn ngữ: Tiếng Việt, phong cách chuyên nghiệp, ngắn gọn.
        
        Trạng thái Lab hiện tại: ${context}
      `;
    }

    let modelsToTry = [
      'gemini-2.5-flash',
      'gemini-2.5-pro',
      'gemini-2.0-flash-lite',
      'gemini-2.0-flash',
      'gemini-1.5-pro'
    ];

    // Ưu tiên các model đã tự động khám phá được
    if (this.availableModels && this.availableModels.length > 0) {
      modelsToTry = [...new Set([...this.availableModels, ...modelsToTry])];
    }

    // ÉP BUỘC gemini-2.5-flash LÊN ĐẦU TIÊN (vì nó đã được xác nhận hoạt động)
    modelsToTry = [...new Set(['gemini-2.5-flash-lite', ...modelsToTry])];

    if (this.workingModel) {
      modelsToTry = [this.workingModel, ...modelsToTry.filter(m => m !== this.workingModel)];
    }

    const apiVersions = ['v1beta', 'v1'];
    let lastError = null;

    for (const model of modelsToTry) {
      for (const version of apiVersions) {
        try {
          const url = `https://generativelanguage.googleapis.com/${version}/models/${model}:generateContent?key=${GEMINI_API_KEY}`;

          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 8000);

          let bodyPayload = {};
          if (version === 'v1beta') {
            bodyPayload = {
              contents: [{ role: 'user', parts: [{ text: prompt }] }],
              system_instruction: { parts: [{ text: systemPrompt }] }
            };
          } else {
            bodyPayload = {
              contents: [
                { role: 'user', parts: [{ text: `[QUY TẮC AI]\n${systemPrompt}\n\n[CÂU HỎI NGƯỜI DÙNG]\n${prompt}` }] }
              ]
            };
          }

          const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            signal: controller.signal,
            body: JSON.stringify(bodyPayload)
          });

          clearTimeout(timeoutId);

          if (response.ok) {
            const data = await response.json();
            if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts[0].text) {
              console.log(`📡 [Quantum AI] Kết nối thành công via ${model} (${version})`);
              this.workingModel = model;
              return data.candidates[0].content.parts[0].text;
            }
          } else {
            const errData = await response.json().catch(() => ({}));
            lastError = errData.error?.message || `HTTP Error ${response.status}`;
            console.warn(`⚠️ [Quantum AI] ${model} (${version}) thất bại:`, lastError);
          }
        } catch (e) {
          lastError = e.message || e;
          console.warn(`⚠️ [Quantum AI] Lỗi ngoại lệ trên ${model} (${version})`);
        }
      }
    }

    throw new Error(lastError || 'Tất cả model đều từ chối phản hồi.');
  }

  async discoverModels() {
    const fallbackModels = [
      'gemini-2.5-flash',
      'gemini-2.0-flash',
      'gemini-1.5-pro'
    ];

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${GEMINI_API_KEY}`);
      if (response.ok) {
        const data = await response.json();
        if (data.models) {
          const available = data.models
            .filter(m => m.supportedGenerationMethods.includes('generateContent'))
            .map(m => m.name.replace('models/', ''));
          if (available.length > 0) return available;
        }
      }
    } catch (e) { }
    return fallbackModels;
  }
}

window.quantumChatbot = new UnifiedChatbot();
window.labBot = window.quantumChatbot;
window.generalBot = window.quantumChatbot;
window.chatbot = window.quantumChatbot;

// Tích hợp: Đảm bảo nút "Hỏi đáp" ở Header mở đúng khung chat này
window.toggleQA = () => {
  console.log("🖱️ [Quantum AI] Header Button Clicked!");
  if (window.quantumChatbot) {
    window.quantumChatbot.toggle();
  } else {
    console.warn("⚠️ [Quantum AI] window.quantumChatbot chưa được khởi tạo!");
  }
};

// Đảm bảo nút nổi (floating button) hoạt động ngay cả khi load chậm
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('chatbot-toggle');
  if (btn) {
    btn.addEventListener('click', () => {
      if (window.quantumChatbot) window.quantumChatbot.toggle();
    });
  }
});
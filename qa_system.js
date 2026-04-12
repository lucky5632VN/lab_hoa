/* ============================================================
   qa_system.js — Trung Tâm Tri Thức & Hệ Thống Điều Chế
   QuantumLab - Digital Chemical Engineering
   ============================================================ */

const QA_DATA = [
  {
    question: "Làm thế nào để bắt đầu một thí nghiệm?",
    answer: "Để bắt đầu, bạn hãy chọn Tab <b>Dụng cụ</b> ở thanh bên trái, kéo một dụng cụ vào khu vực làm việc. Sau đó, chuyển sang Tab <b>Hóa chất</b> và kéo hóa chất bạn muốn thả trực tiếp vào dụng cụ đó."
  },
  {
    question: "Làm sao để biết phản ứng hóa học đã xảy ra?",
    answer: "Hãy quan sát trực quan dụng cụ (đổi màu, kết tủa, bọt khí) và đồng thời theo dõi bảng <b>HUD (Nhật ký)</b> ở góc phải. Hệ thống sẽ ghi lại mọi phản ứng theo thời gian thực."
  },
  {
    question: "Tại sao phải vào Phòng Chuẩn Bị?",
    answer: "An toàn là ưu tiên số 1. Bạn cần trang bị Kính, Găng tay và Áo Blouse để đạt trạng thái 'An toàn tuyệt đối' trước khi hệ thống mở cửa phòng Lab."
  },
  {
    question: "Sử dụng Thư viện như thế nào?",
    answer: "Nhấn nút <b>Thư viện</b> ở Header để tra cứu tính chất vật lý, hóa học và các cảnh báo nguy hiểm của hàng trăm loại hóa chất."
  }
];

const SYNTHESIS_DATA = [
  {
    category: "1. ĐIỀU CHẾ KIM LOẠI",
    description: "Nguyên tắc chung: Khử ion kim loại thành kim loại tự do (Mn+ + ne -> M).",
    methods: [
      { 
        name: "Nhiệt luyện", 
        detail: "Khử oxit kim loại trung bình/yếu (Zn -> Cu) bằng C, CO, H2, Al.",
        eq: "Fe2O3 + 2Al --(to)--> 2Fe + Al2O3 (Nhiệt nhôm)" 
      },
      { 
        name: "Thủy luyện", 
        detail: "Dùng kim loại mạnh đẩy kim loại yếu ra khỏi dung dịch muối.",
        eq: "Fe + CuSO4 --> FeSO4 + Cu" 
      },
      { 
        name: "Điện phân nóng chảy", 
        detail: "Dùng cho kim loại mạnh (IA, IIA, Al).",
        eq: "2Al2O3 --(dpnc, criolit)--> 4Al + 3O2" 
      }
    ]
  },
  {
    category: "2. ĐIỀU CHẾ PHI KIM",
    description: "Thường oxi hóa các hợp chất hoặc phân tách từ tự nhiên.",
    methods: [
      { 
        name: "Clo (Cl2)", 
        detail: "Oxi hóa HCl đặc (PTN) hoặc điện phân NaCl dung dịch (CN).",
        eq: "MnO2 + 4HCl --(to)--> MnCl2 + Cl2 + 2H2O" 
      },
      { 
        name: "Oxi (O2)", 
        detail: "Nhiệt phân chất giàu oxi (PTN) hoặc chưng cất không khí lỏng (CN).",
        eq: "2KMnO4 --(to)--> K2MnO4 + MnO2 + O2" 
      }
    ]
  },
  {
    category: "3. HỢP CHẤT VÔ CƠ",
    description: "Sản xuất các hóa chất công nghiệp trọng tâm.",
    methods: [
      { 
        name: "Axit Sunfuric (H2SO4)", 
        detail: "Phương pháp tiếp xúc (3 giai đoạn).",
        eq: "2SO2 + O2 --(V2O5, to)--> 2SO3" 
      },
      { 
        name: "Amoniac (NH3)", 
        detail: "Tổng hợp Haber (N2 + H2) ở áp suất cao.",
        eq: "N2 + 3H2 <==> 2NH3 (Fe, to, P)" 
      }
    ]
  },
  {
    category: "4. HỢP CHẤT HỮU CƠ",
    description: "Điều chế các chất nền tảng từ nguồn thiên nhiên hoặc tổng hợp.",
    methods: [
      { 
        name: "Metan (CH4)", 
        detail: "Phản ứng vôi tôi xút.",
        eq: "CH3COONa + NaOH --(CaO, to)--> CH4 + Na2CO3" 
      },
      { 
        name: "Etilen (C2H4)", 
        detail: "Tách nước từ Ancol Etylic.",
        eq: "C2H5OH --(H2SO4 đặc, 170oC)--> C2H4 + H2O" 
      },
      { 
        name: "Este", 
        detail: "Phản ứng este hóa (thuận nghịch).",
        eq: "RCOOH + R'OH <==> RCOOR' + H2O (H2SO4 đặc, to)" 
      }
    ]
  }
];

function initKnowledgeTerminal() {
  // Call this once on lab bootup or panel open
  renderKnowledgeTabs();
  switchKnowledgeTab('qa');
}

function renderKnowledgeTabs() {
  const panel = document.getElementById('guidePanel');
  if (!panel) return;

  panel.querySelector('.guide-header').innerHTML = `
    <div class="guide-tabs">
      <button class="g-tab active" id="tab-qa" onclick="switchKnowledgeTab('qa')">❓ Hỏi Đáp</button>
      <button class="g-tab" id="tab-synth" onclick="switchKnowledgeTab('synth')">🧪 Điều Chế</button>
    </div>
    <button onclick="toggleGuide()" class="btn-close-guide">✕</button>
  `;
}

function switchKnowledgeTab(tabId) {
  document.getElementById('tab-qa').classList.toggle('active', tabId === 'qa');
  document.getElementById('tab-synth').classList.toggle('active', tabId === 'synth');

  const container = document.getElementById('guideStepsContent');
  if (tabId === 'qa') {
    renderQAInPanel(container);
  } else {
    renderSynthesisInPanel(container);
  }
}

function renderQAInPanel(container) {
  let html = `
    <div class="knowledge-header">
      <h3>HỎI ĐÁP & HỖ TRỢ</h3>
      <div class="terminal-line"></div>
    </div>
    <div class="qa-list-panel">
  `;

  QA_DATA.forEach((item, index) => {
    html += `
      <div class="qa-item-panel" id="qa-p-${index}">
        <div class="qa-q" onclick="toggleQAAccordion(${index})">
          <span class="q-marker">Q:</span> ${item.question}
        </div>
        <div class="qa-a">
          <div class="qa-a-inner">${item.answer}</div>
        </div>
      </div>
    `;
  });

  html += `</div>`;
  container.innerHTML = html;
}

function renderSynthesisInPanel(container) {
  let html = `
    <div class="knowledge-header">
      <h3>HỆ THỐNG ĐIỀU CHẾ</h3>
      <div class="terminal-line"></div>
    </div>
    <div class="synth-scroll-area">
  `;

  SYNTHESIS_DATA.forEach(cat => {
    html += `
      <div class="synth-category">
        <div class="cat-label">${cat.category}</div>
        <p class="cat-desc">${cat.description}</p>
        <div class="cat-grid">
    `;

    cat.methods.forEach(m => {
      // Use formatFormulaSubscripts if available globally
      const formattedEq = window.formatFormulaSubscripts ? formatFormulaSubscripts(m.eq) : m.eq;
      html += `
        <div class="synth-card">
          <div class="card-title">${m.name}</div>
          <div class="card-detail">${m.detail}</div>
          <div class="card-eq">${formattedEq}</div>
        </div>
      `;
    });

    html += `</div></div>`;
  });

  html += `</div>`;
  container.innerHTML = html;
}

function toggleQAAccordion(index) {
  const item = document.getElementById(`qa-p-${index}`);
  const wasOpen = item.classList.contains('open');
  document.querySelectorAll('.qa-item-panel').forEach(i => i.classList.remove('open'));
  if (!wasOpen) item.classList.add('open');
}

// Keep legacy toggle for potential header button use
function toggleQA() { toggleGuide(); } 

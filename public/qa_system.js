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
        name: "Acid Sunfuric (H2SO4)", 
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

/* ============================================================
   IDCL SAFETY QUIZZES — Mars Genesis Protocol Database
   Mỗi key tương ứng với chemical.id trong CHEMICAL_DATABASE
   ============================================================ */
const SAFETY_QUIZZES = {
  "cl2": [
    { q: "Khí Cl₂ có đặc điểm nhận dạng nào sau đây?", opts: ["Không màu, mùi thơm nhẹ.", "Màu vàng lục, mùi hắc đặc trưng, cực độc.", "Màu nâu đỏ, không mùi."], ans: 1 },
    { q: "Tại sao phải dùng tủ hút (Fume Hood) khi thí nghiệm với Cl₂?", opts: ["Để khí phản ứng với không khí nhanh hơn.", "Để giữ nhiệt độ phản ứng ổn định.", "Ngăn chặn khí độc khuếch tán vào hệ thống hô hấp."], ans: 2 },
    { q: "Nếu lỡ hít phải Cl₂, hành động sơ cứu đầu tiên là gì?", opts: ["Uống nhiều nước ngay lập tức.", "Di chuyển ngay ra nơi thoáng khí và hít thở sâu.", "Tiếp tục thí nghiệm rồi mới đi kiểm tra."], ans: 1 }
  ],
  "cl2_gas": [
    { q: "Khí Cl₂ có đặc điểm nhận dạng nào sau đây?", opts: ["Không màu, mùi thơm nhẹ.", "Màu vàng lục, mùi hắc đặc trưng, cực độc.", "Màu nâu đỏ, không mùi."], ans: 1 },
    { q: "Tại sao phải dùng tủ hút (Fume Hood) khi thí nghiệm với Cl₂?", opts: ["Để khí phản ứng nhanh hơn.", "Để giữ nhiệt độ ổn định.", "Ngăn chặn khí độc khuếch tán vào hệ thống hô hấp."], ans: 2 }
  ],
  "h2so4_con": [
    { q: "Khi pha loãng H₂SO₄ đậm đặc, thao tác nào đúng nhất để tránh nổ nhiệt?", opts: ["Đổ nhanh nước vào axit.", "Rót từ từ axit vào nước và khuấy đều.", "Đổ cả hai cùng lúc vào bình."], ans: 1 },
    { q: "Tính chất nguy hiểm nhất của H₂SO₄ đặc khi tiếp xúc da là gì?", opts: ["Tính oxy hóa mạnh.", "Tính háo nước — gây bỏng sâu và than hóa tức thì.", "Tính acid yếu."], ans: 1 },
    { q: "PPE tối thiểu bắt buộc khi thao tác H₂SO₄ đặc là gì?", opts: ["Chỉ cần kính bảo hộ.", "Kính bảo hộ + Găng tay cao su chịu acid + Áo Blouse.", "Không cần vì H₂SO₄ là chất lỏng không bay hơi."], ans: 1 }
  ],
  "h2so4_oleum": [
    { q: "Oleum nguy hiểm hơn H₂SO₄ thông thường vì lý do gì?", opts: ["Oleum có tính acid yếu hơn.", "Oleum liên tục phóng thích khói SO₃ độc khi tiếp xúc không khí ẩm.", "Oleum có nhiệt độ sôi thấp hơn."], ans: 1 },
    { q: "Khi làm việc với Oleum, điều kiện môi trường nào là BẮT BUỘC nhất?", opts: ["Nhiệt độ phòng cao.", "Tủ hút kín có hệ thống xử lý khí thải (Scrubber).", "Ánh sáng đủ để quan sát."], ans: 1 }
  ],
  "hf": [
    { q: "Tại sao tuyệt đối không được đựng HF trong bình thủy tinh?", opts: ["HF làm thủy tinh bị giòn.", "HF ăn mòn SiO₂ trong thủy tinh — bình sẽ bị thủng.", "Thủy tinh làm HF mất hoạt tính."], ans: 1 },
    { q: "HF nguy hiểm vì khả năng xâm nhập sâu và phá hủy cấu trúc nào?", opts: ["Hệ tiêu hóa.", "Hệ thần kinh.", "Xương và nồng độ Canxi trong máu — gây ngừng tim."], ans: 2 },
    { q: "Bình đựng HF phải được làm bằng vật liệu gì?", opts: ["Thủy tinh borosilicate.", "Nhựa PTFE (Teflon) hoặc Polyethylene.", "Thép không gỉ (Inox)."], ans: 1 }
  ],
  "nh3": [
    { q: "Khi phát hiện rò rỉ NH₃, tại sao cần dùng khăn ướt che mũi?", opts: ["NH₃ không tan trong nước.", "NH₃ tan rất tốt trong nước — khăn ướt hấp thụ và lọc khí hiệu quả.", "Nước làm NH₃ cháy nhanh hơn."], ans: 1 },
    { q: "Dung dịch NH₃ đậm đặc có dấu hiệu nhận biết đặc trưng nào?", opts: ["Màu xanh lam, không mùi.", "Không màu, mùi khai nồng cực mạnh — gây bỏng mắt và đường hô hấp.", "Màu vàng nhạt, mùi trứng thối."], ans: 1 }
  ],
  "nh3_conc": [
    { q: "Khi phát hiện rò rỉ NH₃ đặc, tại sao cần dùng khăn ướt che mũi?", opts: ["NH₃ không tan trong nước.", "NH₃ tan rất tốt trong nước — khăn ướt hấp thụ và lọc khí.", "Nước làm NH₃ cháy nhanh hơn."], ans: 1 },
    { q: "Điều kiện bảo quản NH₃ đặc là gì?", opts: ["Để ngoài trời cho thoáng khí.", "Bình kín, nơi thoáng mát, xa nhiệt độ cao và chất oxy hóa mạnh.", "Giữ trong tủ lạnh ở 0°C."], ans: 1 }
  ],
  "no2": [
    { q: "Khí NO₂ có màu gì và nguy hiểm như thế nào?", opts: ["Không màu, ít độc.", "Màu nâu đỏ đặc trưng — cực độc, gây phù phổi.", "Màu xanh nhạt, mùi thơm."], ans: 1 },
    { q: "Biện pháp bảo vệ cơ bản nhất khi có rò rỉ NO₂ trong phòng là gì?", opts: ["Mở cửa phòng cho thoáng.", "Sơ tán ngay lập tức và kích hoạt hệ thống thông gió khẩn cấp.", "Đứng yên và chờ khí tan."], ans: 1 }
  ],
  "h2s": [
    { q: "H₂S có mùi đặc trưng nào và ngưỡng gây chết người là bao nhiêu?", opts: ["Mùi táo, ngưỡng gây chết là 10,000 ppm.", "Mùi trứng thối đặc trưng, ngưỡng gây chết là khoảng 700 ppm.", "Không mùi, vô hại."], ans: 1 }
  ],
  "na_metal": [
    { q: "Tại sao phải bảo quản Natri kim loại trong dầu hỏa?", opts: ["Dầu làm Natri sáng hơn.", "Natri phản ứng mãnh liệt với hơi nước và oxy trong không khí — dầu cách ly hoàn toàn.", "Dầu làm Natri mềm hơn để cắt."], ans: 1 },
    { q: "Khi xảy ra cháy Natri kim loại, tuyệt đối KHÔNG được dùng gì để dập lửa?", opts: ["Cát khô.", "Bình CO₂.", "Nước — vì sẽ tạo H₂ và NaOH, phản ứng dữ dội hơn."], ans: 2 }
  ],
  "k_metal": [
    { q: "Kali kim loại nguy hiểm hơn Natri kim loại như thế nào khi tiếp xúc nước?", opts: ["Giống hệt nhau.", "Kali phản ứng mạnh hơn — ngọn lửa tím có thể bùng phát tự phát.", "Kali phản ứng chậm hơn."], ans: 1 }
  ],
  "benzene": [
    { q: "Tại sao Benzen là hóa chất thuộc nhóm đặc biệt nguy hiểm?", opts: ["Vì Benzen có giá đắt.", "Vì Benzen là chất GÂY UNG THƯ (carcinogen) — phơi nhiễm lâu dài gây bệnh bạch cầu.", "Vì Benzen có mùi khó chịu."], ans: 1 }
  ],
  "hcho": [
    { q: "Formaldehyde (HCHO / Formalin) thuộc nhóm nguy hiểm nào?", opts: ["Không độc, dùng trong thực phẩm.", "Chất GÂY UNG THƯ bảng 1 (IARC), độc qua đường hô hấp và da.", "Chỉ kích ứng nhẹ mắt."], ans: 1 }
  ],
  "hcn": [
    { q: "HCN nguy hiểm ở cơ chế nào trong cơ thể người?", opts: ["Ăn mòn da như axit.", "Ức chế enzyme Cytochrome c Oxidase — ngừng hô hấp tế bào, chết nhanh.", "Gây dị ứng ngoài da."], ans: 1 }
  ],
  "methanol": [
    { q: "Methanol (CH₃OH) cực kỳ nguy hiểm vì lý do gì so với Ethanol?", opts: ["Methanol không cháy.", "Methanol được cơ thể chuyển hóa thành Formaldehyde và Formic Acid — gây mù và tử vong chỉ với 10–30mL.", "Methanol đắt hơn Ethanol."], ans: 1 }
  ]
};

window.SAFETY_QUIZZES = SAFETY_QUIZZES;

/* ============================================================
   IDCL MISSION TARGETS — Reaction Stoichiometry Matrix
   Dùng để tính m_theoretical cho từng nhiệm vụ thí nghiệm
   ============================================================ */
const MISSION_TARGETS = {
  "mission_01_cl2_synthesis": {
    name: "Điều chế khí Clo (PTN)",
    equation: "MnO₂ + 4HCl → MnCl₂ + Cl₂↑ + 2H₂O",
    stoichiometry: { "mno2": 1, "hcl": 4 },
    ideal_yield: 0.85,
    target_product: "cl2_gas",
    theoretical_masses: { "mno2": 86.94, "hcl": 145.84 }
  },
  "mission_02_nacl_neutralization": {
    name: "Chuẩn độ Acid-Base (HCl + NaOH)",
    equation: "HCl + NaOH → NaCl + H₂O",
    stoichiometry: { "hcl": 1, "naoh": 1 },
    ideal_yield: 1.0,
    target_product: "nacl",
    theoretical_masses: { "hcl": 36.46, "naoh": 40.0 }
  },
  "mission_03_h2so4_dilution": {
    name: "Pha loãng H₂SO₄ đặc",
    equation: "H₂SO₄ (đặc) + H₂O → H₂SO₄ (loãng)",
    stoichiometry: { "h2so4_con": 1, "h2o": 10 },
    ideal_yield: 1.0,
    target_product: "h2so4_dil",
    theoretical_masses: { "h2so4_con": 1.84 }
  },
  "mission_04_naoh_synthesis": {
    name: "Trung hòa NaOH + HCl",
    equation: "NaOH + HCl → NaCl + H₂O",
    stoichiometry: { "naoh": 1, "hcl": 1 },
    ideal_yield: 0.95,
    target_product: "nacl",
    theoretical_masses: { "naoh": 40.0, "hcl": 36.46 }
  }
};

window.MISSION_TARGETS = MISSION_TARGETS;

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
    toggleQA();
  } else {
    renderSynthesisInPanel(container);
  }
}

window.qaActiveSubTab = 'ai';
window.qaSelectedBot = 'lab';

function renderQAInPanel(container) {
  const activeSubTab = window.qaActiveSubTab || 'ai';
  const selectedBot = window.qaSelectedBot || 'lab';
  
  let html = `
    <div class="qa-integrated-layout" style="padding: 15px; display: flex; flex-direction: column; font-family: 'Inter', sans-serif;">
      
      <!-- Sub tabs navigation -->
      <div class="qa-subtabs" style="display: flex; background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 8px; padding: 4px; margin-bottom: 15px;">
        <button id="subtab-ai" onclick="switchQASubTab('ai')" style="flex: 1; background: ${activeSubTab === 'ai' ? 'rgba(56, 189, 248, 0.15)' : 'transparent'}; color: ${activeSubTab === 'ai' ? '#38bdf8' : '#94a3b8'}; border: none; border-radius: 6px; padding: 8px; font-size: 12px; font-weight: bold; font-family: 'Orbitron', sans-serif; cursor: pointer; transition: all 0.2s;">🤖 TRỢ LÝ AI</button>
        <button id="subtab-faq" onclick="switchQASubTab('faq')" style="flex: 1; background: ${activeSubTab === 'faq' ? 'rgba(56, 189, 248, 0.15)' : 'transparent'}; color: ${activeSubTab === 'faq' ? '#38bdf8' : '#94a3b8'}; border: none; border-radius: 6px; padding: 8px; font-size: 12px; font-weight: bold; font-family: 'Orbitron', sans-serif; cursor: pointer; transition: all 0.2s;">❓ HỎI ĐÁP NHANH</button>
      </div>
  `;

  if (activeSubTab === 'ai') {
    html += `
      <!-- PART 1: AI ASSISTANTS -->
      <div id="panel-ai-section" style="display: flex; flex-direction: column;">
        <div class="bot-selectors" style="display: flex; gap: 8px; margin-bottom: 12px;">
          <button id="panel-bot-lab" onclick="selectQAIdBot('lab')" style="flex: 1; background: ${selectedBot === 'lab' ? 'rgba(74, 222, 128, 0.1)' : 'rgba(30, 41, 59, 0.4)'}; color: ${selectedBot === 'lab' ? '#4ade80' : '#64748b'}; border: 1px solid ${selectedBot === 'lab' ? 'rgba(74, 222, 128, 0.4)' : 'rgba(255, 255, 255, 0.05)'}; border-radius: 6px; padding: 8px; font-size: 11px; font-weight: bold; font-family: 'Orbitron', sans-serif; cursor: pointer; transition: all 0.2s;">⚡ COMMANDER</button>
          <button id="panel-bot-gen" onclick="selectQAIdBot('gen')" style="flex: 1; background: ${selectedBot === 'gen' ? 'rgba(56, 189, 248, 0.1)' : 'rgba(30, 41, 59, 0.4)'}; color: ${selectedBot === 'gen' ? '#38bdf8' : '#64748b'}; border: 1px solid ${selectedBot === 'gen' ? 'rgba(56, 189, 248, 0.4)' : 'rgba(255, 255, 255, 0.05)'}; border-radius: 6px; padding: 8px; font-size: 11px; font-weight: bold; font-family: 'Orbitron', sans-serif; cursor: pointer; transition: all 0.2s;">🌐 GENERAL AI</button>
        </div>

        <div class="panel-chat-wrapper" style="display: flex; flex-direction: column; background: rgba(10, 15, 30, 0.6); border: 1px solid rgba(255,255,255,0.05); border-radius: 8px; overflow: hidden;">
          <div id="panel-ai-messages" style="height: 250px; padding: 12px; overflow-y: auto; font-size: 12px; color: #cbd5e1; display: flex; flex-direction: column; gap: 8px; scroll-behavior: smooth;">
            <!-- AI messages loaded here dynamically -->
          </div>
          <div id="panel-ai-typing" style="display: none; padding: 8px 12px; font-size: 10px; font-style: italic; color: #38bdf8; background: rgba(0,0,0,0.2);">AI đang phân tích dữ liệu...</div>
          <div class="panel-chat-input-area" style="display: flex; border-top: 1px solid rgba(255,255,255,0.05); background: rgba(15, 23, 42, 0.9);">
            <input type="text" id="panel-ai-input" placeholder="Hỏi trợ lý AI..." style="flex: 1; background: transparent; border: none; outline: none; color: #fff; padding: 12px; font-size: 12px;" onkeypress="if(event.key==='Enter') sendQAInPanelChat()">
            <button onclick="sendQAInPanelChat()" style="background: transparent; border: none; color: #38bdf8; padding: 0 15px; font-size: 16px; cursor: pointer; font-weight: bold;">➔</button>
          </div>
        </div>
      </div>
    `;
  } else {
    html += `
      <!-- PART 2: PREDEFINED FAQs -->
      <div id="panel-faq-section" style="display: flex; flex-direction: column; overflow-y: auto; max-height: 350px; gap: 10px;">
    `;
    QA_DATA.forEach((qa, idx) => {
      html += `
        <div class="faq-item" style="background: rgba(30, 41, 59, 0.4); border: 1px solid rgba(255,255,255,0.05); border-radius: 6px; padding: 10px;">
          <div class="faq-q" style="color: #38bdf8; font-size: 13px; font-weight: bold; margin-bottom: 6px; display: flex; align-items: flex-start; gap: 5px;">
            <span>❓</span> <span>${qa.question}</span>
          </div>
          <div class="faq-a" style="color: #cbd5e1; font-size: 12px; line-height: 1.5; border-top: 1px dashed rgba(255,255,255,0.05); padding-top: 6px;">
            ${qa.answer}
          </div>
        </div>
      `;
    });
    html += `</div>`;
  }

  html += `</div>`;
  container.innerHTML = html;

  if (activeSubTab === 'ai') {
    updatePanelAIMessages();
  }
}

window.switchQASubTab = function(tabId) {
  window.qaActiveSubTab = tabId;
  const container = document.getElementById('guideStepsContent');
  if (container) renderQAInPanel(container);
};

window.selectQAIdBot = function(botId) {
  window.qaSelectedBot = botId;
  const container = document.getElementById('guideStepsContent');
  if (container) renderQAInPanel(container);
};

window.updatePanelAIMessages = function() {
  const msgsDiv = document.getElementById('panel-ai-messages');
  if (!msgsDiv) return;
  
  msgsDiv.innerHTML = '';
  const bot = window.qaSelectedBot === 'lab' ? window.labBot : window.generalBot;
  
  if (bot && bot.history) {
    bot.history.forEach(msg => {
      const mDiv = document.createElement('div');
      mDiv.style.padding = '8px 12px';
      mDiv.style.borderRadius = '8px';
      mDiv.style.maxWidth = '85%';
      mDiv.style.lineHeight = '1.4';
      
      if (msg.role === 'user') {
        mDiv.style.background = 'rgba(56, 189, 248, 0.15)';
        mDiv.style.border = '1px solid rgba(56, 189, 248, 0.3)';
        mDiv.style.color = '#fff';
        mDiv.style.alignSelf = 'flex-end';
        mDiv.style.marginLeft = 'auto';
      } else {
        mDiv.style.background = 'rgba(30, 41, 59, 0.8)';
        mDiv.style.border = '1px solid rgba(255, 255, 255, 0.05)';
        mDiv.style.color = '#cbd5e1';
        mDiv.style.alignSelf = 'flex-start';
      }
      
      let text = msg.text;
      let formatted = text
        .replace(/\$([^\$]+)\$/g, '<b style="color:#00ffcc">$1</b>')
        .replace(/\n/g, '<br>')
        .replace(/^- (.*)$/gm, '• $1')
        .replace(/^([🎯💡🌍⚠️].*):/gm, '<div style="color:#38bdf8; font-weight:bold; margin-top:6px; font-family:Orbitron, sans-serif;">$1</div>');

      mDiv.innerHTML = formatted;
      msgsDiv.appendChild(mDiv);
    });
    msgsDiv.scrollTop = msgsDiv.scrollHeight;
  }
};

window.sendQAInPanelChat = async function() {
  const input = document.getElementById('panel-ai-input');
  if (!input) return;
  
  const text = input.value.trim();
  if (!text) return;
  
  const bot = window.qaSelectedBot === 'lab' ? window.labBot : window.generalBot;
  if (!bot) return;
  
  input.value = '';
  bot.addMessage('user', text);
  
  window.updatePanelAIMessages();
  
  const typingInd = document.getElementById('panel-ai-typing');
  if (typingInd) typingInd.style.display = 'block';
  
  try {
    const response = await bot.callGemini(text, bot.isGeneral);
    bot.addMessage('ai', response);
  } catch (e) {
    console.error(e);
    bot.addMessage('ai', 'Lỗi: Không thể kết nối mạng Quantum.');
  } finally {
    if (typingInd) typingInd.style.display = 'none';
    window.updatePanelAIMessages();
  }
};

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

// Toggle General AI chatbot when clicking header button
function toggleQA() { 
  if (window.quantumChatbot) {
    window.quantumChatbot.toggle();
  } else if (window.generalBot) {
    window.generalBot.toggle();
  }
} 

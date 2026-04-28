/* ============================================================
   chemicals_academic_pro.js — THƯ VIỆN PHẢN ỨNG HÓA HỌC CHUYÊN SÂU (v10.0)
   Bổ sung các phản ứng Oxy hóa khử phức tạp, tạo phức và hóa hữu cơ.
   ============================================================ */

const ACADEMIC_REACTIONS = {
  // --- 1. HỆ THỐNG KMnO4 (KMnO₄ - Thuốc tím) ---
  
  // KMnO₄ + HCl → Cl₂ (Điều chế Clo trong PTN)
  'kmno4+hcl': {
    reactants: ['kmno4', 'hcl'],
    products: ['MnCl₂', 'KCl', 'Cl₂↑', 'H₂O'],
    equation: '2KMnO₄ + 16HCl → 2MnCl₂ + 2KCl + 5Cl₂↑ + 8H₂O',
    type: 'redox-oxidizer', effect: 'bubbles-fast',
    synthesis: { name: 'Sản xuất khí Clo Cl₂ (vàng lục)', icon: '🟢', category: 'Oxy hóa khử' },
    colorChange: { start: 'rgba(126,34,206,0.6)', end: 'rgba(234,179,8,0.2)' },
    toxicGas: { formula: 'Cl₂', color: '#84cc16', smell: 'mùi hắc, xốc' },
    particles: [{ type: 'bubble', color: '#bef264', count: 45 }],
    description: 'Mn(+7) bị khử xuống Mn(+2). Cl⁻ bị oxy hóa thành Cl₂ khí. Đây là cách điều chế Clo chuẩn trong phòng thí nghiệm.',
    observation: '💜 Dung dịch mất màu tím. 🟢 Xuất hiện khí màu vàng lục, mùi hắc của Clo.',
    hazardLevel: 3, hazardType: 'toxic', logType: 'danger'
  },

  // KMnO₄ + H₂SO₄ loãng + FeSO₄ → Sắt(III) sunfat
  'kmno4+feso4': {
    reactants: ['kmno4', 'feso4', 'h2so4'],
    products: ['Fe₂(SO₄)₃', 'MnSO₄', 'K₂SO₄', 'H₂O'],
    equation: '2KMnO₄ + 10FeSO₄ + 8H₂SO₄ → 5Fe₂(SO₄)₃ + 2MnSO₄ + K₂SO₄ + 8H₂O',
    type: 'redox-titration', effect: 'color-change',
    synthesis: { name: 'Oxy hóa Fe(II) lên Fe(III)', icon: '🧪', category: 'Chuẩn độ Redox' },
    colorChange: { start: 'rgba(126,34,206,0.6)', end: 'rgba(234,88,12,0.3)' },
    particles: [{ type: 'bubble', color: '#fef2f2', count: 10 }],
    description: 'Phản ứng chuẩn độ đặc trưng. Màu tím của KMnO₄ mất đi cho đến khi điểm tương đương đạt được (dung dịch ngả vàng của Fe³⁺).',
    observation: '💜 Mất màu tím của KMnO₄. Dung dịch chuyển sang màu vàng nhạt/nâu của Fe³⁺.',
    logType: 'success'
  },

  // --- 2. HỆ THỐNG PHỨC CHẤT (Complexation) ---

  // Phức [Cu(NH₃)₄]²⁺ - Xanh thẫm rực rỡ
  'cuoh2+nh3': {
    reactants: ['cuoh2', 'nh3'],
    products: ['[Cu(NH₃)₄](OH)₂'],
    equation: 'Cu(OH)₂ + 4NH₃ → [Cu(NH₃)₄](OH)₂  (Phức tan)',
    type: 'complexation', effect: 'bubbles-fast',
    clearPrecipitate: true,
    synthesis: { name: 'Phức Tetramin Đồng(II) — Xanh thẫm', icon: '🔷', category: 'Tạo phức' },
    colorChange: { end: 'rgba(30,58,138,0.9)' },
    description: 'Kết tủa Cu(OH)₂ màu xanh lam tan trong dung dịch NH₃ dư tạo ra phức chất tan có màu xanh thẫm đặc trưng.',
    observation: '🔵 Kết tủa xanh lam tan dần. 🔷 Hình thành dung dịch màu xanh thẫm rực rỡ.',
    logType: 'success'
  },

  // Phức [Ag(NH₃)₂]⁺ - Tan AgCl
  'agcl+nh3': {
    reactants: ['agcl', 'nh3'],
    products: ['[Ag(NH₃)₂]Cl'],
    equation: 'AgCl + 2NH₃ → [Ag(NH₃)₂]Cl (Phức tan)',
    type: 'complexation', effect: 'bubbles-light',
    clearPrecipitate: true,
    synthesis: { name: 'Hòa tan AgCl trong NH₃', icon: '💎', category: 'Tạo phức' },
    colorChange: { end: 'rgba(248,250,252,0.4)' },
    description: 'Bạc clorua kết tủa trắng tan dễ dàng trong dung dịch amoniac dư tạo thành phức chất tan không màu.',
    observation: '⚪ Kết tủa trắng tan hết thành dung dịch trong suốt.',
    logType: 'success'
  },

  // Phức [Zn(NH₃)₄]²⁺ - Tan Zn(OH)₂
  'znoh2+nh3': {
    reactants: ['znoh2', 'nh3'],
    products: ['[Zn(NH₃)₄](OH)₂'],
    equation: 'Zn(OH)₂ + 4NH₃ → [Zn(NH₃)₄](OH)₂ (Phức tan)',
    type: 'complexation', effect: 'bubbles-light',
    clearPrecipitate: true,
    synthesis: { name: 'Hòa tan Kẽm hydroxide trong NH₃', icon: '⬜', category: 'Tạo phức' },
    colorChange: { end: 'rgba(248,250,252,0.4)' },
    description: 'Kẽm hydroxide kết tủa trắng tan trong dung dịch amoniac dư tạo thành phức chất tan không màu.',
    observation: '⚪ Kết tủa trắng tan hoàn toàn.',
    logType: 'success'
  },

  // Tráng Gương (Tollens test)
  'glucose+tollens': {
    reactants: ['glucose', 'agno3', 'nh3'],
    products: ['Gluconic Acid', 'Ag↓'],
    equation: 'CH₂OH[CHOH]₄CHO + 2[Ag(NH₃)₂]OH → CH₂OH[CHOH]₄COONH₄ + 2Ag↓ + 3NH₃ + H₂O',
    type: 'organic-redox', effect: 'precipitate-white',
    synthesis: { name: 'Thí nghiệm Tráng Bạc (Silver Mirror)', icon: '🪞', category: 'Nhận biết Aldehyde' },
    colorChange: { end: 'rgba(226,232,240,0.95)' }, // Silver color
    particles: [{ type: 'precipitate', color: '#e2e8f0', count: 60 }],
    description: 'Nhóm Aldehyde của Glucose khử phức bạc thành bạc kim loại bám lên thành ống nghiệm tạo thành lớp gương.',
    observation: '✨ Lớp bạc kim loại sáng bóng như gương bám vào thành ống nghiệm.',
    logType: 'success'
  },

  // Phản ứng Iodine + Tinh bột (Starch + I₂)
  'starch+iodine': {
    reactants: ['starch', 'iodine'],
    products: ['Hợp chất bọc Iốt-Tinh bột'],
    equation: 'Tinh bột + I₂ → Phức xanh tím',
    type: 'indicator-complex', effect: 'color-change',
    synthesis: { name: 'Nhận biết Tinh bột / Iốt', icon: '🧬', category: 'Hóa sinh' },
    colorChange: { end: 'rgba(30,58,138,0.85)' },
    description: 'Các phân tử Iốt len lỏi vào cấu trúc xoắn của Amylose trong tinh bột tạo ra màu xanh tím đặc trưng. Đun nóng sẽ mất màu, nguội lại sẽ hiện màu.',
    observation: '🫐 Dung dịch chuyển sang màu XANH TÍM đặc trưng.',
    logType: 'success'
  },

  // --- 3. ĐẶC TÍNH LƯỠNG TÍNH (Amphoterism) ---

  // Al2O3 + NaOH → Tan
  'al2o3+naoh': {
    reactants: ['al2o3', 'naoh'],
    products: ['NaAlO₂', 'H₂O'],
    equation: 'Al₂O₃ + 2NaOH → 2NaAlO₂ + H₂O',
    type: 'amphoteric-reaction', effect: 'bubbles-light',
    synthesis: { name: 'Hòa tan nhôm oxit trong kiềm', icon: '⚗️', category: 'Lưỡng tính' },
    description: 'Nhôm oxit (Alumina) là oxit lưỡng tính, tan được trong dung dịch kiềm mạnh đun nóng.',
    observation: '⚪ Chất rắn màu trắng tan dần thành dung dịch trong suốt.',
    logType: 'info'
  },

  // Al(OH)₃ + NaOH dư → Tan
  'aloh3+naoh': {
    reactants: ['aloh3', 'naoh'],
    products: ['NaAlO₂', 'H₂O'],
    equation: 'Al(OH)₃ + NaOH → NaAlO₂ + 2H₂O',
    type: 'amphoteric-dissolution', effect: 'bubbles-light',
    clearPrecipitate: true,
    synthesis: { name: 'Hòa tan nhôm hydroxide trong kiềm', icon: '⚗️', category: 'Lưỡng tính' },
    description: 'Nhôm hydroxide là chất lưỡng tính, tan được trong dung dịch kiềm mạnh.',
    observation: '🌫️ Kết tủa trắng keo tan dần thành dung dịch trong suốt.',
    logType: 'info'
  },

  // Zn(OH)₂ + NaOH dư → Tan
  'znoh2+naoh': {
    reactants: ['znoh2', 'naoh'],
    products: ['Na₂ZnO₂', 'H₂O'],
    equation: 'Zn(OH)₂ + 2NaOH → Na₂ZnO₂ + 2H₂O',
    type: 'amphoteric-dissolution', effect: 'bubbles-light',
    clearPrecipitate: true,
    synthesis: { name: 'Hòa tan kẽm hydroxide trong kiềm', icon: '⚗️', category: 'Lưỡng tính' },
    description: 'Kẽm hydroxide tan trong kiềm dư tạo thành muối Zincat.',
    observation: '⚪ Kết tủa trắng tan thành dung dịch không màu.',
    logType: 'info'
  },

  // --- 4. CÁC PHẢN ỨNG MÀU ĐẶC TRƯNG ---

  // Sắt(III) + KSCN → Đỏ máu
  'fecl3+kscn': {
    reactants: ['fecl3', 'kscn'],
    products: ['Fe(SCN)₃'],
    equation: 'Fe³⁺ + 3SCN⁻ → Fe(SCN)₃ (phức màu đỏ máu)',
    type: 'color-test', effect: 'color-change',
    synthesis: { name: 'Dung dịch đỏ máu Fe(SCN)₃', icon: '🩸', category: 'Nhận biết Fe³⁺' },
    colorChange: { end: 'rgba(153,27,27,0.8)' },
    description: 'Phản ứng cực nhạy để nhận biết ion Sắt(III). Phức sulfoxyanua sắt có màu đỏ thẫm như máu.',
    observation: '🩸 Dung dịch chuyển sang màu ĐỎ MÁU kỳ ảo.',
    logType: 'success'
  },
  
  // --- 5. HÓA HỮU CƠ CHUYÊN SÂU (Advanced Organic) ---

  // Phenol + HNO₃ (Nitro hóa tạo Acid Picric)
  'phenol+hno3': {
    reactants: ['phenol', 'hno3'],
    products: ['Acid Picric', 'H₂O'],
    equation: 'C₆H₅OH + 3HNO₃ --(H₂SO₄ đ, t⁰)--> C₆H₂(NO₂)₃OH + 3H₂O',
    type: 'nitration', effect: 'precipitate-yellow',
    requires: { heat: true, catalyst: 'h2so4_con' },
    synthesis: { name: 'Điều chế Acid Picric (2,4,6-trinitrophenol)', icon: '🧨', category: 'Nitro hóa' },
    colorChange: { end: 'rgba(254,240,138,0.7)' },
    particles: [{ type: 'precipitate', color: '#facc15', count: 50 }],
    description: 'Xúc tác H₂SO₄ đặc đóng vai trò tách nước tạo ion NO₂⁺ mạnh. Ion này tấn công vòng thơm Phenol để thế vào các vị trí 2,4,6 tạo Acid Picric.',
    observation: '🟡 Dung dịch chuyển sang màu vàng đậm. ⚠️ Xuất hiện kết tủa vàng của Acid Picric khi có đầy đủ HNO₃ và xúc tác H₂SO₄.',
    hazardLevel: 3, hazardType: 'explosion', logType: 'danger'
  },

  // --- 6. PHẢN ỨNG CỘNG HỮU CƠ (Organic Addition) ---

  // Cộng H2 vào Ethylene (Ni, t)
  'c2h4+h2_gas': {
    reactants: ['c2h4', 'h2_gas'],
    products: ['C₂H₆'],
    equation: 'CH₂=CH₂ + H₂ --(Ni, t⁰)--> CH₃-CH₃',
    type: 'hydrogenation', effect: 'bubbles-light',
    requires: { heat: true, catalyst: 'ni_metal' },
    synthesis: { name: 'Hiđro hóa Etilen thành Etan', icon: '💨', category: 'Phản ứng Cộng' },
    description: 'Hiđro cộng vào liên kết đôi của Etilen dưới tác dụng của xúc tác Niken và nhiệt độ, tạo thành Etan (hiđrocacbon no).',
    observation: '💨 Khí Etan không màu được hình thành.',
    logType: 'success'
  },

  // Cộng H2 vào Acetylene (Ni, t) -> Ethane
  'c2h2+h2_gas_ni': {
    reactants: ['c2h2', 'h2_gas'],
    products: ['C₂H₆'],
    equation: 'CH≡CH + 2H₂ --(Ni, t⁰)--> CH₃-CH₃',
    type: 'hydrogenation', effect: 'bubbles-light',
    requires: { heat: true, catalyst: 'ni_metal' },
    synthesis: { name: 'Hiđro hóa hoàn toàn Axetilen', icon: '💨', category: 'Phản ứng Cộng' },
    description: 'Dưới xúc tác Ni, Axetilen cộng tối đa 2 phân tử Hiđro để trở thành hiđrocacbon no (Etan).',
    observation: '💨 Axetilen đã được hiđro hóa hoàn toàn thành Etan.',
    logType: 'success'
  },

  // Cộng H2 vào Acetylene (Pd/PbCO3) -> Ethylene
  'c2h2+h2_gas_pd': {
    reactants: ['c2h2', 'h2_gas'],
    products: ['C₂H₄'],
    equation: 'CH≡CH + H₂ --(Pd/PbCO₃, t⁰)--> CH₂=CH₂',
    type: 'hydrogenation', effect: 'bubbles-light',
    requires: { heat: true, catalyst: 'pd_c' },
    synthesis: { name: 'Hiđro hóa chọn lọc Axetilen', icon: '🌿', category: 'Phản ứng Cộng' },
    description: 'Sử dụng xúc tác Lindlar (Pd/PbCO₃), phản ứng cộng Hiđro dừng lại ở giai đoạn tạo Etilen.',
    observation: '🌿 Đã điều chế thành công Etilen từ Axetilen bằng xúc tác chọn lọc.',
    logType: 'success'
  },

  // Mất màu nước Brom (Ethylene)
  'c2h4+br2': {
    reactants: ['c2h4', 'br2'],
    products: ['CH₂Br-CH₂Br'],
    equation: 'CH₂=CH₂ + Br₂ → CH₂Br-CH₂Br (1,2-đibromoetan)',
    type: 'addition-halogen', effect: 'color-change',
    colorChange: { end: 'rgba(255,255,255,0.1)' },
    synthesis: { name: 'Nhận biết Etilen bằng nước Brom', icon: '🧪', category: 'Nhận biết' },
    description: 'Etilen cộng vào phân tử Brom làm bẻ gãy liên kết pi, dẫn đến hiện tượng mất màu nâu đỏ đặc trưng của nước Brom.',
    observation: '🟠 Dung dịch Brom bị MẤT MÀU hoàn toàn. Chứng tỏ có liên kết bội.',
    logType: 'success'
  },

  // Mất màu nước Brom (Acetylene)
  'c2h2+br2': {
    reactants: ['c2h2', 'br2'],
    products: ['CHBr₂-CHBr₂'],
    equation: 'CH≡CH + 2Br₂ → CHBr₂-CHBr₂ (1,1,2,2-tetrabromoetan)',
    type: 'addition-halogen', effect: 'color-change',
    colorChange: { end: 'rgba(255,255,255,0.1)' },
    synthesis: { name: 'Nhận biết Axetilen bằng nước Brom', icon: '🧪', category: 'Nhận biết' },
    description: 'Axetilen phản ứng với Brom theo tỉ lệ 1:2, làm mất màu nước Brom rất nhanh.',
    observation: '🟠 Dung dịch Brom bị MẤT MÀU. Axetilen đã phản ứng cộng với Brom.',
    logType: 'success'
  },

  // Cộng HBr vào Ethylene
  'c2h4+hbr': {
    reactants: ['c2h4', 'hbr'],
    products: ['CH₃-CH₂Br'],
    equation: 'CH₂=CH₂ + HBr → CH₃-CH₂Br (Ethyl bromide)',
    type: 'addition', effect: 'bubbles-light',
    synthesis: { name: 'Cộng Hiđro halogenua vào Etilen', icon: '🧴', category: 'Phản ứng Cộng' },
    description: 'Phản ứng cộng tác nhân bất đối xứng vào alkene đối xứng tạo dẫn xuất halogen duy nhất.',
    observation: '🧪 Ethyl bromide được hình thành trong dung dịch.',
    logType: 'info'
  },

  // Cộng Nước vào Ethylene (Hydrat hóa)
  'c2h4+h2o': {
    reactants: ['c2h4', 'h2o'],
    products: ['C₂H₅OH'],
    equation: 'CH₂=CH₂ + H₂O --(H₂SO₄ l, t⁰)--> C₂H₅OH',
    type: 'hydration', effect: 'bubbles-light',
    requires: { heat: true, catalyst: 'h2so4_dil' },
    synthesis: { name: 'Sản xuất Ethanol (Cồn) công nghiệp', icon: '🍺', category: 'Hydrat hóa' },
    description: 'Etilen cộng nước với xúc tác acid mạnh tạo thành rượu Etylic. Đây là phương pháp chính để sản xuất cồn thực phẩm và công nghiệp.',
    observation: '🍺 Ethanol đã được tổng hợp thành công.',
    logType: 'success'
  },

  // Cộng Nước vào Acetylene (Hg2+, H+)
  'c2h2+h2o': {
    reactants: ['c2h2', 'h2o'],
    products: ['CH₃CHO'],
    equation: 'CH≡CH + H₂O --(HgSO₄/H₂SO₄, 80⁰C)--> CH₃CHO',
    type: 'hydration', effect: 'bubbles-light',
    requires: { heat: true, catalyst: 'hgso4' },
    synthesis: { name: 'Hydrat hóa Axetilen tạo Anđehit', icon: '🧪', category: 'Hydrat hóa' },
    description: 'Nước cộng vào liên kết ba của Axetilen tạo ra Enol không bền, ngay lập tức chuyển hóa thành Anđehit axetic (Acetaldehyde).',
    observation: '🍎 Dung dịch có mùi táo đặc trưng của Acetaldehyde được hình thành.',
    logType: 'success'
  },

  // Cộng Nước vào Propyne (Hg2+, H+) -> Acetone
  'propyne+h2o': {
    reactants: ['propyne', 'h2o'],
    products: ['CH₃COCH₃'],
    equation: 'CH₃-C≡CH + H₂O --(HgSO₄/H₂SO₄)--> CH₃-CO-CH₃',
    type: 'hydration', effect: 'bubbles-light',
    requires: { heat: true, catalyst: 'hgso4' },
    synthesis: { name: 'Tổng hợp Acetone từ Propyne', icon: '🧴', category: 'Hydrat hóa' },
    description: 'Theo quy tắc Markovnikov, nhóm -OH cộng vào Carbon bậc cao hơn, sau đó chuyển vị thành Acetone (propanone).',
    observation: '🧴 Acetone (dung môi rửa sơn móng tay) đã được hình thành.',
    logType: 'success'
  },

  // Phenol + Br2 -> Kết tủa trắng
  'phenol+br2': {
    reactants: ['phenol', 'br2'],
    products: ['2,4,6-tribromophenol', 'HBr'],
    equation: 'C₆H₅OH + 3Br₂ → C₆H₂Br₃OH↓ + 3HBr',
    type: 'substitution-aromatic', effect: 'precipitate-white',
    synthesis: { name: 'Nhận biết Phenol bằng nước Brom', icon: '⚪', category: 'Nhận biết' },
    colorChange: { end: 'rgba(255,255,255,0.1)' },
    particles: [{ type: 'precipitate', color: '#ffffff', count: 60 }],
    description: 'Nhóm -OH làm tăng mật độ electron ở các vị trí ortho và para, khiến Phenol phản ứng với nước Brom dễ dàng hơn Benzen nhiều lần, tạo kết tủa trắng.',
    observation: '🟠 Nước Brom mất màu nâu đỏ. ⚪ Xuất hiện kết tủa TRẮNG của 2,4,6-tribromophenol.',
    logType: 'success'
  }
};

// --- Tích hợp vào hệ thống hiện tại ---
if (typeof REACTIONS !== 'undefined') {
  Object.assign(REACTIONS, ACADEMIC_REACTIONS);
  
  // Tự động tạo phản ứng đảo ngược cặp cho explicit matching
  Object.keys(ACADEMIC_REACTIONS).forEach(key => {
    const parts = key.split('+');
    if (parts.length === 2) {
      const revKey = `${parts[1]}+${parts[0]}`;
      if (!REACTIONS[revKey]) {
        REACTIONS[revKey] = ACADEMIC_REACTIONS[key];
      }
    }
  });
}

window.ACADEMIC_REACTIONS = ACADEMIC_REACTIONS;
console.log('🎓 Academic Pro Reactions integrated:', Object.keys(ACADEMIC_REACTIONS).length);

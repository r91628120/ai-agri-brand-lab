// ===============================
// 🚀 AI創業經營推演器
// AI Simulation Learning Edition
// ===============================

const businessCases = {
  mangoBox: {
    name: "芒果禮盒",
    price: 699,
    quantity: 1000,
    cost: 300000
  },
  driedFruit: {
    name: "果乾加工品",
    price: 150,
    quantity: 5000,
    cost: 250000
  },
  flower: {
    name: "花藝商品",
    price: 1200,
    quantity: 300,
    cost: 180000
  },
  farmTour: {
    name: "農場體驗",
    price: 350,
    quantity: 2000,
    cost: 260000
  }
};

function loadCase(caseName) {
  const item = businessCases[caseName];
  if (!item) return;

  document.getElementById("productInput").value = item.name;
  document.getElementById("priceInput").value = item.price;
  document.getElementById("quantityInput").value = item.quantity;
  document.getElementById("costInput").value = item.cost;

  calculateBusiness();
}

function calculateBusiness() {
  const productName = document.getElementById("productInput").value.trim() || "本商品";
  const price = Number(document.getElementById("priceInput").value);
  const quantity = Number(document.getElementById("quantityInput").value);
  const cost = Number(document.getElementById("costInput").value);
  const result = document.getElementById("result");

  if (!price || !quantity || !cost) {
    result.innerHTML = "⚠️ 請完整輸入商品售價、預估銷售量與總成本。";
    return;
  }

  const revenue = price * quantity;
  const profit = revenue - cost;
  const profitRate = revenue ? (profit / revenue) * 100 : 0;
  const breakEvenPrice = cost / quantity;
  const safeSpace = price - breakEvenPrice;
  const priceImpact = quantity;
  const breakEvenQuantity = Math.ceil(cost / price);

  function money(num) {
    return Math.round(num).toLocaleString();
  }

  function percent(num) {
    return num.toFixed(1);
  }

  function rowPrice(newPrice, label) {
    const newRevenue = newPrice * quantity;
    const newProfit = newRevenue - cost;

    return `
      <tr class="${newPrice === price ? "current-row" : ""}">
        <td>${label}</td>
        <td>${money(newRevenue)} 元</td>
        <td>${money(newProfit)} 元</td>
      </tr>
    `;
  }

  function rowQuantity(rate, label) {
    const newQuantity = Math.round(quantity * rate);
    const newRevenue = price * newQuantity;
    const newProfit = newRevenue - cost;

    return `
      <tr class="${rate === 1 ? "current-row" : ""}">
        <td>${label}</td>
        <td>${money(newQuantity)}</td>
        <td>${money(newRevenue)} 元</td>
        <td>${money(newProfit)} 元</td>
      </tr>
    `;
  }

  let grade = "";
  let gradeClass = "";
  let riskText = "";
  let riskClass = "";
  let pricingPower = "";
  let cashFlow = "";
  let advice = "";

  if (profitRate >= 50) {
    grade = "A級";
    gradeClass = "grade-a";
    riskText = "低風險";
    riskClass = "risk-low";
    pricingPower = "定價能力良好";
    cashFlow = "現金流安全";
    advice = `
      ${productName} 目前利潤率達 ${percent(profitRate)}%，具備良好的創業潛力。
      建議可強化品牌故事、包裝設計、企業團購與會員回購機制，讓商品不只靠價格競爭，而是靠品牌價值創造更高獲利。
    `;
  } else if (profitRate >= 30) {
    grade = "B級";
    gradeClass = "grade-b";
    riskText = "中低風險";
    riskClass = "risk-low";
    pricingPower = "定價能力尚可";
    cashFlow = "現金流穩定";
    advice = `
      ${productName} 目前具有不錯的獲利空間，但仍需注意成本與銷售量變化。
      建議可透過包裝升級、組合銷售、社群行銷與通路合作，提高平均售價與銷售穩定度。
    `;
  } else if (profitRate >= 10) {
    grade = "C級";
    gradeClass = "grade-c";
    riskText = "中風險";
    riskClass = "risk-mid";
    pricingPower = "定價能力偏弱";
    cashFlow = "需注意現金流";
    advice = `
      ${productName} 目前仍有獲利，但安全距離不高。
      如果遇到銷售量下降或競爭者降價，獲利可能快速縮小。
      建議優先檢查成本結構，並思考是否能提高售價、增加附加價值或降低包裝與行銷成本。
    `;
  } else {
    grade = "D級";
    gradeClass = "grade-d";
    riskText = "高風險";
    riskClass = "risk-high";
    pricingPower = "定價能力不足";
    cashFlow = "現金流壓力高";
    advice = `
      ${productName} 目前推演結果顯示風險偏高。
      建議先不要急著擴大銷售，應重新檢查售價、成本與市場需求。
      可以嘗試提高售價、降低成本、改變包裝規格，或重新設定目標客群後再進行推演。
    `;
  }

  result.innerHTML = `
    <div class="simulation-report">

      <div class="report-header">
        <span>AI Simulation Learning Report</span>
        <h3>📊 ${productName}｜AI創業推演分析報告</h3>
        <p>
          AI已根據商品售價、銷售量與成本，自動推演營收、獲利、定價風險、銷售風險與創業建議。
        </p>
      </div>

      <div class="result-grid">
        <div class="result-card highlight">
          <span>💰 預估營收</span>
          <strong>${money(revenue)} 元</strong>
        </div>

        <div class="result-card highlight">
          <span>🚀 預估獲利</span>
          <strong>${money(profit)} 元</strong>
        </div>

        <div class="result-card">
          <span>📈 利潤率</span>
          <strong>${percent(profitRate)}%</strong>
        </div>

        <div class="result-card">
          <span>💸 總成本</span>
          <strong>${money(cost)} 元</strong>
        </div>

        <div class="result-card">
          <span>🎯 損益平衡單價</span>
          <strong>${breakEvenPrice.toFixed(2)} 元</strong>
        </div>

        <div class="result-card">
          <span>📦 損益平衡銷售量</span>
          <strong>${money(breakEvenQuantity)}</strong>
        </div>
      </div>

      <div class="diagnosis-grid">
        <div class="diagnosis-card ${gradeClass}">
          <span>🏆 創業健康度</span>
          <strong>${grade}</strong>
        </div>

        <div class="diagnosis-card ${riskClass}">
          <span>⚠️ 風險等級</span>
          <strong>${riskText}</strong>
        </div>

        <div class="diagnosis-card">
          <span>💵 定價能力</span>
          <strong>${pricingPower}</strong>
        </div>

        <div class="diagnosis-card">
          <span>💳 現金流狀態</span>
          <strong>${cashFlow}</strong>
        </div>

        <div class="diagnosis-card">
          <span>🛡️ 單價安全空間</span>
          <strong>${safeSpace.toFixed(2)} 元</strong>
        </div>

        <div class="diagnosis-card">
          <span>📌 每增加1元影響</span>
          <strong>${money(priceImpact)} 元</strong>
        </div>
      </div>

      <div class="analysis-section">
        <h4>② 定價敏感度分析</h4>
        <p>
          以目前售價 ${price} 元為中心，AI自動推演不同定價下的營收與獲利。
        </p>

        <div class="table-wrap">
          <table class="analysis-table">
            <thead>
              <tr>
                <th>商品售價</th>
                <th>預估營收</th>
                <th>預估獲利</th>
              </tr>
            </thead>
            <tbody>
              ${rowPrice(Math.max(price - 100, 0), `${Math.max(price - 100, 0)} 元`)}
              ${rowPrice(Math.max(price - 50, 0), `${Math.max(price - 50, 0)} 元`)}
              ${rowPrice(price, `目前 ${price} 元`)}
              ${rowPrice(price + 50, `${price + 50} 元`)}
              ${rowPrice(price + 100, `${price + 100} 元`)}
            </tbody>
          </table>
        </div>

        <div class="insight-box">
          💡 商品售價每增加 1 元，在目前銷售量下，總營收約增加
          <strong>${money(priceImpact)} 元</strong>。
        </div>
      </div>

      <div class="analysis-section">
        <h4>③ 銷售量風險分析</h4>
        <p>
          AI自動推演銷售量下降與成長情境，協助學生理解市場需求、廣告效果與通路能力對創業結果的影響。
        </p>

        <div class="table-wrap">
          <table class="analysis-table">
            <thead>
              <tr>
                <th>銷售情境</th>
                <th>銷售量</th>
                <th>預估營收</th>
                <th>預估獲利</th>
              </tr>
            </thead>
            <tbody>
              ${rowQuantity(0.8, "銷量減少 20%")}
              ${rowQuantity(0.9, "銷量減少 10%")}
              ${rowQuantity(1, "目前銷售量")}
              ${rowQuantity(1.1, "銷量增加 10%")}
              ${rowQuantity(1.2, "銷量增加 20%")}
            </tbody>
          </table>
        </div>

        <div class="insight-box">
          📉 若銷售量減少 20%，預估獲利將變為
          <strong>${money(price * Math.round(quantity * 0.8) - cost)} 元</strong>。
        </div>
      </div>

      <div class="analysis-section">
        <h4>④ 損益平衡分析</h4>
        <p>
          ${productName} 的損益平衡單價為
          <strong>${breakEvenPrice.toFixed(2)} 元</strong>；
          損益平衡銷售量約為
          <strong>${money(breakEvenQuantity)}</strong>。
        </p>
        <p>
          也就是說，若售價低於損益平衡單價，或銷售量低於損益平衡銷售量，就可能進入虧損。
        </p>
      </div>

      <div class="ai-advice-box">
        <h4>🤖 AI創業顧問建議</h4>
        <p>${advice}</p>
      </div>

      <div class="thinking-box">
        <h4>🎓 AI推演式學習問題</h4>
        <ol>
          <li>如果競爭對手降價 50 元，你會跟著降價，還是改用品牌價值提高吸引力？</li>
          <li>如果銷售量下降 20%，你會增加廣告、調整包裝、推出組合商品，還是降低成本？</li>
          <li>本商品目前最重要的變因是售價、銷售量，還是成本？為什麼？</li>
          <li>如果要讓利潤率提高，你會優先改變哪一個條件？</li>
        </ol>
      </div>

    </div>
  `;
}

function clearBusiness() {
  document.getElementById("productInput").value = "";
  document.getElementById("priceInput").value = "";
  document.getElementById("quantityInput").value = "";
  document.getElementById("costInput").value = "";
  document.getElementById("result").innerHTML = "請輸入資料後按下「開始推演」。";
}
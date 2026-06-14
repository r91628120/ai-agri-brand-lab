// ===============================
// 🚀 AI創業經營推演器
// AI Simulation Learning Edition v2.0
// ===============================

const businessCases = {
  mangoBox: {
    name: "芒果禮盒",
    price: 699,
    quantity: 1000,
    cost: 300000,
    rent: 30000,
    equipment: 30000,
    labor: 60000,
    material: 90000,
    packaging: 40000,
    logistics: 20000,
    marketing: 30000
  },
  driedFruit: {
    name: "果乾加工品",
    price: 150,
    quantity: 5000,
    cost: 250000,
    rent: 20000,
    equipment: 30000,
    labor: 50000,
    material: 70000,
    packaging: 30000,
    logistics: 20000,
    marketing: 30000
  },
  flower: {
    name: "花藝商品",
    price: 1200,
    quantity: 300,
    cost: 180000,
    rent: 20000,
    equipment: 15000,
    labor: 45000,
    material: 45000,
    packaging: 15000,
    logistics: 10000,
    marketing: 30000
  },
  farmTour: {
    name: "農場體驗",
    price: 350,
    quantity: 2000,
    cost: 260000,
    rent: 20000,
    equipment: 60000,
    labor: 70000,
    material: 20000,
    packaging: 10000,
    logistics: 30000,
    marketing: 50000
  }
};

function getNumber(id) {
  const el = document.getElementById(id);
  return el ? Number(el.value) || 0 : 0;
}

function setValue(id, value) {
  const el = document.getElementById(id);
  if (el) el.value = value;
}

function loadCase(caseName) {
  const item = businessCases[caseName];
  if (!item) return;

  setValue("productInput", item.name);
  setValue("priceInput", item.price);
  setValue("quantityInput", item.quantity);
  setValue("costInput", item.cost);

  setValue("rentInput", item.rent);
  setValue("equipmentInput", item.equipment);
  setValue("laborInput", item.labor);
  setValue("materialInput", item.material);
  setValue("packagingInput", item.packaging);
  setValue("logisticsInput", item.logistics);
  setValue("marketingInput", item.marketing);

  calculateBusiness();
}

function calculateBusiness() {
  const productName =
    document.getElementById("productInput").value.trim() || "本商品";

  const price = getNumber("priceInput");
  const quantity = getNumber("quantityInput");
  const basicCost = getNumber("costInput");

  const rent = getNumber("rentInput");
  const equipment = getNumber("equipmentInput");
  const labor = getNumber("laborInput");

  const material = getNumber("materialInput");
  const packaging = getNumber("packagingInput");
  const logistics = getNumber("logisticsInput");
  const marketing = getNumber("marketingInput");

  const fixedCost = rent + equipment + labor;
  const variableCost = material + packaging + logistics + marketing;
  const detailCost = fixedCost + variableCost;

  const cost = detailCost > 0 ? detailCost : basicCost;
  const costSource = detailCost > 0 ? "成本明細加總" : "總成本欄位";

  const result = document.getElementById("result");

  if (!price || !quantity || !cost) {
    result.innerHTML =
      "⚠️ 請至少輸入商品售價、預估銷售量，並填寫總成本或成本明細。";
    return;
  }

  const revenue = price * quantity;
  const profit = revenue - cost;
  const profitRate = revenue ? (profit / revenue) * 100 : 0;
  const breakEvenPrice = cost / quantity;
  const safeSpace = price - breakEvenPrice;
  const priceImpact = quantity;
  const breakEvenQuantity = Math.ceil(cost / price);

  const fixedRate = cost ? (fixedCost / cost) * 100 : 0;
  const variableRate = cost ? (variableCost / cost) * 100 : 0;
  const fixedRiskText =
    fixedRate >= 50
      ? "固定成本偏高，銷售量下降時壓力較大。"
      : "固定成本相對可控，經營彈性較佳。";

  const variableRiskText =
    variableRate >= 60
      ? "變動成本偏高，應優先檢查原料、包材、物流與廣告成本。"
      : "變動成本比例尚可，仍可透過採購與流程優化提升利潤。";

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

      // =====================
// 📦 庫存管理
// =====================

const inventory = getNumber("inventoryInput");
const safeInventory = getNumber("safeInventoryInput");
const monthlySales = getNumber("monthlySalesInput");

const inventoryMonths =
      monthlySales > 0
    ? inventory / monthlySales
    : 0;

     let inventoryStatus = "未填寫";

       if (inventory > 0) {

       if (inventory < safeInventory) {

         inventoryStatus = "⚠ 缺貨風險";

        }
       else if (inventory > monthlySales * 6) {

          inventoryStatus = "⚠ 滯銷風險";

        }
       else {

        inventoryStatus = "✅ 庫存正常";

        }

}

    // =====================
    // ROI
    // =====================

const adCost =
      getNumber("adCostInput");

const adRevenue =
      getNumber("adRevenueInput");

const roi =
   adCost > 0
   ? ((adRevenue - adCost) / adCost) * 100
   : 0;

let roiLevel = "";

if (roi >= 300) {

   roiLevel = "★★★★★ 極佳";

}
else if (roi >= 200) {

   roiLevel = "★★★★ 良好";

}
else if (roi >= 100) {

   roiLevel = "★★★ 普通";

}
else {

   roiLevel = "⚠ 需改善";

}

// =====================
// 回購率
// =====================

const customers =
      getNumber("customerInput");

const repeatCustomers =
      getNumber("repeatCustomerInput");

const repeatRate =
      customers > 0
      ? (repeatCustomers / customers) * 100
      : 0;

// =====================
// 品牌價值
// =====================

let brandScore = 0;

 [
    "brandStory",
    "packageDesign",
    "socialMedia",
    "website",
    "membership",
    "businessPartner",
    "esg"
  ].forEach(id=>{

const el =
      document.getElementById(id);

    if(el && el.checked){

       brandScore += 10;

    }

});

let brandLevel = "";

   if (brandScore >= 60) {

   brandLevel = "🏆 品牌成熟型";

   }
   else if (brandScore >= 40) {

   brandLevel = "📈 品牌成長型";

   }
   else {

   brandLevel = "🌱 品牌起步型";

  }  




  result.innerHTML = `
    <div class="simulation-report">

      <div class="report-header">
        <span>AI Simulation Learning Report</span>
        <h3>📊 ${productName}｜AI創業推演分析報告</h3>
        <p>
          AI已根據商品售價、銷售量、總成本與成本結構，自動推演營收、獲利、定價風險、銷售風險、成本比例與創業建議。
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

      <div class="analysis-section">
        <h4>⑤ 📊 成本結構分析（v2.0）</h4>
        <p>
          本次推演採用：<strong>${costSource}</strong>。
          AI協助拆解固定成本與變動成本，讓學生理解成本結構如何影響獲利與風險。
        </p>

        <div class="cost-summary-grid">
          <div class="result-card">
            <span>🏠 固定成本</span>
            <strong>${money(fixedCost)} 元</strong>
            <small>${percent(fixedRate)}%</small>
          </div>

          <div class="result-card">
            <span>📦 變動成本</span>
            <strong>${money(variableCost)} 元</strong>
            <small>${percent(variableRate)}%</small>
          </div>

          <div class="result-card highlight">
            <span>💸 成本加總</span>
            <strong>${money(cost)} 元</strong>
            <small>100%</small>
          </div>
        </div>

        <div class="cost-bar-wrap">
          <div class="cost-bar">
            <div class="fixed-bar" style="width:${fixedRate}%">
              固定 ${percent(fixedRate)}%
            </div>
            <div class="variable-bar" style="width:${variableRate}%">
              變動 ${percent(variableRate)}%
            </div>
          </div>
        </div>

        <div class="table-wrap">
          <table class="analysis-table">
            <thead>
              <tr>
                <th>成本類型</th>
                <th>項目</th>
                <th>金額</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>固定成本</td><td>房租 / 場地費</td><td>${money(rent)} 元</td></tr>
              <tr><td>固定成本</td><td>設備 / 折舊</td><td>${money(equipment)} 元</td></tr>
              <tr><td>固定成本</td><td>人事 / 固定人工</td><td>${money(labor)} 元</td></tr>
              <tr><td>變動成本</td><td>原料成本</td><td>${money(material)} 元</td></tr>
              <tr><td>變動成本</td><td>包材成本</td><td>${money(packaging)} 元</td></tr>
              <tr><td>變動成本</td><td>物流 / 運輸</td><td>${money(logistics)} 元</td></tr>
              <tr><td>變動成本</td><td>廣告 / 行銷</td><td>${money(marketing)} 元</td></tr>
              <tr class="current-row"><td>總成本</td><td>全部成本加總</td><td>${money(cost)} 元</td></tr>
            </tbody>
          </table>
        </div>

        <div class="insight-box">
          📌 ${fixedRiskText}<br>
          📌 ${variableRiskText}
        </div>
      </div>

      <div class="analysis-section">

           <h4>⑥ 📦 庫存管理分析</h4>

             <p>
                目前庫存可支撐
                <strong>${inventoryMonths.toFixed(1)}</strong>
                個月
             </p>

           <div class="insight-box">
              ${inventoryStatus}
           </div>

      </div>

      <div class="analysis-section">

        <h4>⑦ 📈 ROI分析</h4>

          <p>

             ROI：

                <strong>

                  ${roi.toFixed(1)}%

                </strong>

                <br>

                 ${roiLevel}

          </p>

      </div>

      <div class="analysis-section">

        <h4>⑧ 👥 回購率分析</h4>

        <p>

          回購率：

          <strong>

           ${repeatRate.toFixed(1)}%

         </strong>

        </p>

   </div>

    <div class="analysis-section">

          <h4>⑨ 🏆 品牌價值係數</h4>

         <p>

              品牌價值分數：

         <strong>

           ${brandScore}

           分
          <br>

           ${brandLevel}

         </strong>

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
          <li>固定成本與變動成本哪一項比較容易調整？為什麼？</li>
          <li>如果要讓利潤率提高，你會優先改變哪一個條件？</li>
        </ol>
      </div>

    </div>
  `;
}

function clearBusiness() {
  setValue("productInput", "");
  setValue("priceInput", "");
  setValue("quantityInput", "");
  setValue("costInput", "");

  setValue("rentInput", "");
  setValue("equipmentInput", "");
  setValue("laborInput", "");
  setValue("materialInput", "");
  setValue("packagingInput", "");
  setValue("logisticsInput", "");
  setValue("marketingInput", "");

  setValue("inventoryInput", "");
  setValue("safeInventoryInput", "");
  setValue("monthlySalesInput", "");

  setValue("adCostInput", "");
  setValue("adRevenueInput", "");

  setValue("customerInput", "");
  setValue("repeatCustomerInput", "");

  [
     "brandStory",
     "packageDesign",
     "socialMedia",
     "website",
     "membership",
     "businessPartner",
     "esg"
  ].forEach(id => {

const el = document.getElementById(id);

  if(el){

     el.checked = false;

    }

  });



  document.getElementById("result").innerHTML =
    "請輸入資料後按下「開始推演」。";
}
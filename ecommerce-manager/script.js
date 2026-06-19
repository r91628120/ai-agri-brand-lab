const coachUrl = "https://chatgpt.com/g/g-6a2d733aeac08191be56f59a8653cdae-ainong-chuang-jiao-lian-ai-agri-brand-coach";

const cases = {
  mango: {
    brandName: "南國果語",
    productName: "愛文芒果乾禮盒",
    cropName: "愛文芒果",
    origin: "屏東枋山",
    features: "天然果香、低溫烘焙、色澤金黃、適合送禮、適合社群分享",
    targetCustomer: "送禮客群",
    salesChannel: "品牌官網",
    price: "480元",
    promotionGoal: "節慶送禮推廣"
  },
  tea: {
    brandName: "阿里山烏龍選",
    productName: "高山茶禮盒",
    cropName: "烏龍茶",
    origin: "嘉義阿里山",
    features: "高山冷冽茶香、手採茶葉、回甘清香、精品伴手禮、適合企業送禮",
    targetCustomer: "企業採購客群",
    salesChannel: "品牌官網",
    price: "880元",
    promotionGoal: "提高客單價"
  },
  coffee: {
    brandName: "佳農春凍咖啡",
    productName: "精品咖啡豆",
    cropName: "咖啡豆",
    origin: "屏東佳冬",
    features: "手沖香氣、在地小農、文青質感、平地咖啡、適合社群分享",
    targetCustomer: "年輕社群客群",
    salesChannel: "Instagram導購",
    price: "520元",
    promotionGoal: "社群曝光導流"
  },
  rice: {
    brandName: "縱谷米選",
    productName: "台灣米禮盒",
    cropName: "台灣稻米",
    origin: "花東縱谷",
    features: "米香濃郁、友善耕作、產地直送、適合家庭日常與送禮",
    targetCustomer: "家庭客群",
    salesChannel: "LINE社群團購",
    price: "399元",
    promotionGoal: "增加回購率"
  }
};

function $(id) {
  return document.getElementById(id);
}

function loadCase(key) {
  const item = cases[key];
  if (!item) return;

  Object.keys(item).forEach(id => {
    if ($(id)) $(id).value = item[id];
  });

  document.querySelector("#generator").scrollIntoView({ behavior: "smooth" });
}

function getCheckedItems() {
  return Array.from(document.querySelectorAll(".checkbox-card input:checked"))
    .map(item => item.value);
}

function copyText(id) {
  const text = $(id).innerText;
  navigator.clipboard.writeText(text).then(() => {
    alert("已複製！");
  });
}

function generateEcommercePlan() {
  const brand = $("brandName").value.trim() || "農產品品牌";
  const product = $("productName").value.trim() || "農產品";
  const crop = $("cropName").value.trim() || "在地作物";
  const origin = $("origin").value.trim() || "台灣產地";
  const features = $("features").value.trim() || "天然、在地、安心、適合送禮";
  const targetCustomer = $("targetCustomer").value;
  const salesChannel = $("salesChannel").value;
  const price = $("price").value.trim() || "依產品規格訂價";
  const promotionGoal = $("promotionGoal").value;
  const elements = getCheckedItems();

  const customerPain =
    targetCustomer.includes("送禮") ? "不知道送什麼才有質感、擔心禮品不夠體面" :
    targetCustomer.includes("家庭") ? "想買安心、實用、品質穩定的日常農產品" :
    targetCustomer.includes("年輕") ? "希望商品好拍、好分享、有故事與社群感" :
    targetCustomer.includes("企業") ? "需要有質感、能代表心意且適合大量採購的禮盒" :
    targetCustomer.includes("觀光") ? "想帶走具有地方特色、好保存、好分享的伴手禮" :
    "重視健康、安心來源與產品品質";

  const productTitle = `${brand}｜${origin}${product}`;

  const productPage = `【商品頁架構建議】

商品標題：
${productTitle}

商品副標：
把 ${origin} 的 ${crop} 風味，轉化成一份有故事、有溫度的農產品。

商品頁區塊：
1. 首圖：商品與包裝清楚呈現，讓顧客第一眼理解商品價值。
2. 三大賣點：${features}
3. 產地故事：說明 ${origin} 的風土、農人精神與產品特色。
4. 適合情境：送禮、日常品味、社群分享、地方特色推廣。
5. 顧客安心：產地、原料、製程與保存方式清楚說明。
6. 購買行動：強調限量、節慶、團購或回購優惠。`;

  const ecommerceCopy = `【電商文案】

主標語：
來自 ${origin} 的土地心意，讓 ${product} 成為值得分享的農產品禮物。

短文案：
${brand} 嚴選 ${crop}，結合 ${features}，讓每一份 ${product} 都有產地故事與品牌溫度。

導購文案：
正在尋找一份有特色、有質感、又能代表心意的農產品嗎？
${brand} 的 ${product} 適合 ${targetCustomer}，不只是商品，更是一份來自土地的祝福。

購買理由：
✓ 產地明確：${origin}
✓ 商品特色：${features}
✓ 適合客群：${targetCustomer}
✓ 建議售價：${price}
✓ 銷售通路：${salesChannel}`;

  const promotion = `【促銷活動設計】

活動名稱：
「把 ${product} 分享給重要的人」

促銷目標：${promotionGoal}

活動方式：
1. 首購優惠：第一次購買享限定折扣或免運。
2. 滿額加購：滿指定金額可加購小包裝或體驗組。
3. 節慶組合：推出 2 入、3 入或企業送禮組。
4. 社群分享：分享購買照片或開箱心得，可獲得下次購物優惠。
5. 回購設計：購買後 14～30 天推送回購提醒與限定優惠。

活動文案：
一份好的農產品，不只好吃，也能傳遞心意。
現在選購 ${brand}｜${product}，把 ${origin} 的風味分享給重要的人。`;

  const customerAnalysis = `【顧客分析】

目標客群：${targetCustomer}

顧客可能需求：
${customerPain}

購買動機：
1. 想支持在地農產品。
2. 想購買有故事、有特色的商品。
3. 想找到適合送禮或分享的產品。
4. 想確認商品品質、產地與價格是否合理。

顧客可能疑慮：
1. 商品是否真的有特色？
2. 價格是否合理？
3. 保存與配送是否方便？
4. 送禮是否有質感？

轉換策略：
用清楚商品圖、產地故事、顧客評價、促銷活動與安心說明，降低顧客疑慮，提高購買意願。`;

  const faq = `【商品頁 FAQ】

Q1：這項商品適合送禮嗎？
A：適合。${product} 具有 ${features} 等特色，適合 ${targetCustomer}。

Q2：商品特色是什麼？
A：主要特色包含 ${features}，並結合 ${origin} 的產地故事。

Q3：適合在哪裡販售？
A：可優先放在 ${salesChannel}，再搭配社群貼文與短影音導流。

Q4：如何提高顧客購買意願？
A：建議強化商品照片、顧客評價、產地故事、促銷活動與清楚的購買按鈕。`;

  const learningQuestions = `【高中職學生學習問題】

1. 為什麼同一個農產品，換成不同客群後，商品頁文案會不同？
2. 商品頁最重要的前三個區塊應該是什麼？
3. ${price} 的售價是否需要搭配更高質感的照片與包裝？
4. 如果顧客不下單，可能是哪一個環節出了問題？
5. 促銷活動如何避免只靠降價，而是提高品牌價值？`;

  const coachPrompt = `你是「AI農創教練」與「農產品電商經營顧問」。

請根據以下資料，協助我完成完整的農產品電商經營企劃：

【品牌資料】
品牌名稱：${brand}
商品名稱：${product}
作物／原料：${crop}
產地：${origin}
產品特色：${features}
目標客群：${targetCustomer}
銷售通路：${salesChannel}
建議售價：${price}
促銷目標：${promotionGoal}
想強調的電商元素：${elements.join("、")}

請協助產出：

1. 商品頁定位分析。
2. 商品頁標題、副標與內容架構。
3. 商品三大賣點與購買理由。
4. 電商短文案與長文案。
5. 商品頁 FAQ。
6. 顧客輪廓、購買動機與疑慮分析。
7. 促銷活動企劃。
8. 社群導購貼文。
9. 回購與會員經營建議。
10. 給高中職學生的電商經營學習問題。

請用清楚小標題整理，語氣要專業、溫暖、有行銷感，並適合農產品品牌、地方創生、食農教育與電商推廣。`;

  const fullResult = `${productPage}\n\n────────────────────\n\n${ecommerceCopy}\n\n────────────────────\n\n${promotion}\n\n────────────────────\n\n${customerAnalysis}\n\n────────────────────\n\n${faq}\n\n────────────────────\n\n${learningQuestions}\n\n────────────────────\n\n【AI農創教練完整 Prompt】\n${coachPrompt}`;

  $("result").className = "result-card";
  $("result").innerHTML = `
    <p class="eyebrow">AI E-COMMERCE REPORT</p>
    <h2>🛒 ${product}｜AI電商經營提案</h2>

    <div class="result-grid">
      <div class="result-box">
        <h3>① 商品頁定位</h3>
        <p>
          <strong>${brand}</strong> 的 ${product} 適合鎖定
          <strong>${targetCustomer}</strong>，並透過 ${salesChannel} 推廣。
          商品頁應強調 ${elements.join("、")}，讓顧客理解產品價值並願意下單。
        </p>
      </div>

      <div class="result-box">
        <h3>② 顧客洞察</h3>
        <p>
          顧客痛點：${customerPain}<br>
          建議售價：${price}<br>
          促銷目標：${promotionGoal}
        </p>
      </div>

      <div class="result-box">
        <h3>③ 商品頁架構</h3>
        <div class="prompt" id="productPage">${productPage}</div>
        <button class="copy-btn" onclick="copyText('productPage')">複製商品頁架構</button>
      </div>

      <div class="result-box">
        <h3>④ 電商文案</h3>
        <div class="prompt" id="ecommerceCopy">${ecommerceCopy}</div>
        <button class="copy-btn" onclick="copyText('ecommerceCopy')">複製電商文案</button>
      </div>

      <div class="result-box">
        <h3>⑤ 促銷活動</h3>
        <div class="prompt" id="promotion">${promotion}</div>
        <button class="copy-btn" onclick="copyText('promotion')">複製促銷活動</button>
      </div>

      <div class="result-box">
        <h3>⑥ 顧客分析</h3>
        <div class="prompt" id="customerAnalysis">${customerAnalysis}</div>
        <button class="copy-btn" onclick="copyText('customerAnalysis')">複製顧客分析</button>
      </div>

      <div class="result-box">
        <h3>⑦ 商品頁 FAQ</h3>
        <div class="prompt" id="faq">${faq}</div>
        <button class="copy-btn" onclick="copyText('faq')">複製 FAQ</button>
      </div>

      <div class="result-box">
        <h3>⑧ 學習問題</h3>
        <div class="prompt" id="learningQuestions">${learningQuestions}</div>
        <button class="copy-btn" onclick="copyText('learningQuestions')">複製學習問題</button>
      </div>

      <div class="result-box agri-coach-box">
        <h3>🚀 AI農創教練｜電商實作中心</h3>
        <p>
          本平台已完成商品頁、電商文案、促銷活動與顧客分析。
          下一步可將完整 Prompt 複製到 AI農創教練，產出更完整的電商經營企劃。
        </p>

        <div class="prompt" id="fullResult">${fullResult}</div>

        <div class="result-actions">
          <button class="result-action-btn copy-btn" onclick="copyText('fullResult')">
            一鍵複製完整電商企劃
          </button>

          <a class="result-action-btn coach-btn" href="${coachUrl}" target="_blank">
            🚀 開啟 AI農創教練
          </a>

          <button class="result-action-btn clear-mini-btn" onclick="clearAll()">
            清除資料
          </button>
        </div>
      </div>
    </div>
  `;
}

function clearAll() {
  $("result").className = "result-card muted";
  $("result").textContent = "請輸入資料後按下「產生電商經營提案」。";

  ["brandName", "productName", "cropName", "origin", "features", "price"].forEach(id => {
    if ($(id)) $(id).value = "";
  });

  $("targetCustomer").selectedIndex = 0;
  $("salesChannel").selectedIndex = 0;
  $("promotionGoal").selectedIndex = 0;

  document.querySelectorAll(".checkbox-card input").forEach(input => {
    input.checked = false;
  });

  const defaults = ["商品賣點", "產地故事", "送禮價值"];
  defaults.forEach(value => {
    const item = document.querySelector(`.checkbox-card input[value="${value}"]`);
    if (item) item.checked = true;
  });
}

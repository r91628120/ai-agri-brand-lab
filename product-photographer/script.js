const cases = {
  tea: {
    brandName: "阿里山茶韻",
    productName: "高山茶禮盒",
    cropName: "烏龍茶",
    origin: "嘉義阿里山",
    features: "高山冷冽茶香、手採茶葉、回甘清香、適合伴手禮",
    packageType: "禮盒",
    styleType: "高級精品風"
  },
  mango: {
    brandName: "南國果語",
    productName: "芒果乾禮盒",
    cropName: "愛文芒果",
    origin: "屏東枋山",
    features: "天然果香、低溫烘焙、色澤金黃、適合送禮",
    packageType: "禮盒",
    styleType: "自然產地風"
  },
  rice: {
    brandName: "縱谷米選",
    productName: "米禮盒",
    cropName: "台灣稻米",
    origin: "花東縱谷",
    features: "米香濃郁、產地直送、友善耕作、適合企業送禮",
    packageType: "紙盒",
    styleType: "地方創生風"
  },
  coffee: {
    brandName: "山嵐咖啡",
    productName: "精品咖啡豆",
    cropName: "咖啡豆",
    origin: "雲林古坑",
    features: "手沖香氣、在地小農、文青質感、適合社群分享",
    packageType: "袋裝",
    styleType: "文青清新風"
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

  location.hash = "start";
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

function generatePhotoPlan() {
  const brand = $("brandName").value.trim() || "農產品品牌";
  const product = $("productName").value.trim() || "農產品";
  const crop = $("cropName").value.trim() || "在地作物";
  const origin = $("origin").value.trim() || "台灣產地";
  const features = $("features").value.trim() || "具備在地特色、品質優良、適合行銷推廣";
  const packageType = $("packageType").value;
  const styleType = $("styleType").value;
  const elements = getCheckedItems();

  const colorTone =
    styleType.includes("精品") ? "深色背景、金色點綴、高級光影" :
    styleType.includes("自然") ? "自然光、木質桌面、產地背景、溫暖色調" :
    styleType.includes("文青") ? "米白色背景、柔和自然光、簡約清新構圖" :
    styleType.includes("白底") ? "純白背景、乾淨陰影、專業棚拍光線" :
    styleType.includes("送禮") ? "溫暖光線、禮盒開箱、節慶送禮氛圍" :
    "明亮自然光、學生體驗、產地學習情境";

  const ecommercePrompt =
`請生成一張農產品電商主圖。

品牌名稱：${brand}
商品名稱：${product}
作物／原料：${crop}
產地：${origin}
包裝形式：${packageType}
攝影風格：${styleType}
產品特色：${features}
強調元素：${elements.join("、")}
色調與光線：${colorTone}

畫面需求：
商品置中、背景乾淨、產品清楚可見、適合電商首頁與商品頁主圖。
請呈現專業商業商品攝影、高解析度、清楚包裝細節、具購買吸引力。`;

  const lifestylePrompt =
`請生成一張農產品情境攝影照片。

品牌名稱：${brand}
商品名稱：${product}
作物／原料：${crop}
產地：${origin}
包裝形式：${packageType}
攝影風格：${styleType}
產品特色：${features}

畫面需求：
以自然光呈現，商品放在木桌或自然材質背景上，
可加入 ${crop}、產地元素、葉子、農產品原料或手作感道具。
照片要有品牌故事感、溫度感與生活情境，適合官網、品牌故事頁與社群貼文。`;

  const socialPrompt =
`請生成一張適合社群貼文的農產品形象照。

品牌名稱：${brand}
商品名稱：${product}
產地：${origin}
攝影風格：${styleType}
目標：吸引使用者停下來觀看並想了解商品。

畫面需求：
適合 Instagram、Facebook、Threads 使用。
構圖要有留白、明亮、吸睛，商品與品牌氛圍清楚。
可加入短影音封面感、生活風格、產地故事、送禮情境。`;

  const giftPrompt =
`請生成一張農產品禮盒攝影照片。

品牌名稱：${brand}
商品名稱：${product}
包裝形式：${packageType}
作物／原料：${crop}
產地：${origin}
攝影風格：${styleType}

畫面需求：
呈現高級送禮感，禮盒正面清楚可見，
可加入開箱畫面、緞帶、木質桌面、節慶氛圍、自然光。
照片需適合企業送禮、節慶禮盒、伴手禮推廣與電商商品頁。`;

  const educationPrompt =
`請生成一張食農教育攝影照片。

主題：${product} 的食農教育與產地學習
作物／原料：${crop}
產地：${origin}
產品特色：${features}

畫面需求：
高中職學生或親子正在觀察 ${crop}、認識產地、學習農產品加工或包裝設計。
場景自然、溫暖、有教育意義，呈現土地、農人、學生與產品之間的連結。
適合教學簡報、食農教育活動、課程成果展示。`;

  const coachPrompt =
`你是「AI農創教練」與「農產品商業攝影顧問」。

請根據以下資料，協助我完成完整的農產品攝影企劃：

【品牌資料】
品牌名稱：${brand}
商品名稱：${product}
作物／原料：${crop}
產地：${origin}
產品特色：${features}
包裝形式：${packageType}
攝影風格：${styleType}
想強調的攝影元素：${elements.join("、")}

請協助產出：

1. 商品攝影定位分析。
2. 電商主圖攝影企劃。
3. 情境攝影企劃。
4. 社群貼文攝影企劃。
5. 禮盒攝影企劃。
6. 食農教育攝影企劃。
7. 每一種攝影的 AI 圖片生成 Prompt。
8. 適合搭配照片使用的商品文案。
9. FB、IG、Threads 社群貼文。
10. 給高中職學生的攝影與品牌經營學習問題。

請用清楚小標題整理，語氣要專業、溫暖，並適合農產品品牌、食農教育與地方創生推廣。`;

  $("result").className = "result-card";
  $("result").innerHTML = `
    <p class="eyebrow">AI PRODUCT PHOTO REPORT</p>
    <h2>📸 ${product}｜AI商品攝影提案</h2>

    <div class="result-grid">
      <div class="result-box">
        <h3>① 攝影定位</h3>
        <p>
          <strong>${brand}</strong> 的 ${product} 適合採用
          <strong>${styleType}</strong>。
          攝影重點應放在 ${elements.join("、")}，
          讓消費者快速感受到商品特色與品牌價值。
        </p>
      </div>

      <div class="result-box">
        <h3>② 視覺風格建議</h3>
        <p>
          光線與色調：${colorTone}<br>
          包裝形式：${packageType}<br>
          適用場景：電商主圖、品牌故事、社群貼文、商品型錄。
        </p>
      </div>

      <div class="result-box">
        <h3>③ 電商主圖 Prompt</h3>
        <div class="prompt" id="ecommercePrompt">${ecommercePrompt}</div>
        <button class="copy-btn" onclick="copyText('ecommercePrompt')">複製電商主圖 Prompt</button>
      </div>

      <div class="result-box">
        <h3>④ 情境攝影 Prompt</h3>
        <div class="prompt" id="lifestylePrompt">${lifestylePrompt}</div>
        <button class="copy-btn" onclick="copyText('lifestylePrompt')">複製情境攝影 Prompt</button>
      </div>

      <div class="result-box">
        <h3>⑤ 社群貼文攝影 Prompt</h3>
        <div class="prompt" id="socialPrompt">${socialPrompt}</div>
        <button class="copy-btn" onclick="copyText('socialPrompt')">複製社群攝影 Prompt</button>
      </div>

      <div class="result-box">
        <h3>⑥ 禮盒攝影 Prompt</h3>
        <div class="prompt" id="giftPrompt">${giftPrompt}</div>
        <button class="copy-btn" onclick="copyText('giftPrompt')">複製禮盒攝影 Prompt</button>
      </div>

      <div class="result-box">
        <h3>⑦ 食農教育攝影 Prompt</h3>
        <div class="prompt" id="educationPrompt">${educationPrompt}</div>
        <button class="copy-btn" onclick="copyText('educationPrompt')">複製食農教育 Prompt</button>
      </div>

      <div class="result-box">
        <h3>⑧ AI推演學習問題</h3>
        <p>
          1. 哪一種照片最能提高消費者購買意願？<br>
          2. 電商白底圖與情境攝影有什麼差異？<br>
          3. 攝影背景如何影響品牌質感？<br>
          4. 農產品照片如何呈現產地故事？<br>
          5. 如果售價提高，照片質感需要如何升級？
        </p>
      </div>

      <div class="result-box agri-coach-box">
        <h3>🚀 AI農創教練｜攝影實作中心</h3>
        <p>
          本平台已完成攝影方向與多種圖片 Prompt。
          下一步可將完整 Prompt 複製到 AI農創教練，
          產生更完整的攝影企劃、商品文案與社群行銷內容。
        </p>

      <div class="prompt" id="coachPrompt">${coachPrompt}</div>

        <div class="result-actions">
          <button class="result-action-btn copy-btn" onclick="copyText('coachPrompt')">
             一鍵複製完整攝影企劃
          </button>

          <a class="result-action-btn coach-btn"
           href="https://chatgpt.com/g/g-6a2d733aeac08191be56f59a8653cdae-ainong-chuang-jiao-lian-ai-agri-brand-coach"
             target="_blank">
            🚀 開啟 AI農創教練
          </a>

          <button class="result-action-btn clear-mini-btn" onclick="clearResult()">
            清除結果
          </button>
        </div>
      </div>
    </div>
  `;
}

function clearResult() {
  // 清除 AI 產出結果
  $("result").className = "result-card muted";
  $("result").textContent = "請輸入資料後按下「產生攝影提案」。";

  // 清除表格資料
  $("brandName").value = "";
  $("productName").value = "";
  $("cropName").value = "";
  $("origin").value = "";
  $("features").value = "";

  // 恢復下拉選單預設值
  $("packageType").selectedIndex = 0;
  $("styleType").selectedIndex = 0;

  // 恢復攝影元素預設勾選
  document.querySelectorAll(".checkbox-card input").forEach(input => {
    input.checked = false;
  });

  document.querySelector('.checkbox-card input[value="自然光"]').checked = true;
  document.querySelector('.checkbox-card input[value="產地故事"]').checked = true;
  document.querySelector('.checkbox-card input[value="禮盒質感"]').checked = true;
}
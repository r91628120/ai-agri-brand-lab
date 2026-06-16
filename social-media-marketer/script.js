const coachUrl =
  "https://chatgpt.com/g/g-6a2d733aeac08191be56f59a8653cdae-ainong-chuang-jiao-lian-ai-agri-brand-coach";

function getValue(id) {
  return document.getElementById(id).value.trim();
}

   const socialCases = {
  mango: {
    brand: "南國果語",
    product: "愛文芒果乾禮盒",
    feature: "屏東枋山愛文芒果、天然果香、低溫烘焙、色澤金黃、適合送禮、適合社群分享"
  },
  tea: {
    brand: "阿里山烏龍選",
    product: "高山茶禮盒",
    feature: "阿里山高山茶、手採茶葉、冷冽茶香、回甘清香、精品伴手禮、適合企業送禮"
  },
  coffee: {
    brand: "佳農春凍咖啡",
    product: "精品咖啡豆",
    feature: "屏東佳冬平地咖啡、手沖香氣、在地小農、文青質感、適合社群分享、禮盒包裝"
  },
  pineapple: {
    brand: "鳳梨甜心",
    product: "鳳梨酥禮盒",
    feature: "台灣鳳梨、金黃酥皮、酸甜果餡、節慶送禮、觀光伴手禮、適合電商販售"
  }
};

function loadCase(caseKey) {
  const data = socialCases[caseKey];
  if (!data) return;

  document.getElementById("brand").value = data.brand;
  document.getElementById("product").value = data.product;
  document.getElementById("feature").value = data.feature;

  document.querySelector(".generator-section").scrollIntoView({
    behavior: "smooth"
  });
}



function copyText(id) {
  const text = document.getElementById(id).innerText;
  navigator.clipboard.writeText(text).then(() => {
    alert("已複製！");
  });
}

function generateSocialContent() {
  const brand = getValue("brand") || "農產品品牌";
  const product = getValue("product") || "農產品";
  const feature = getValue("feature") || "天然、在地、安心、適合送禮";

  const hashtags = [
    `#${product}`,
    `#${brand}`,
    "#農產品品牌",
    "#台灣農產",
    "#支持小農",
    "#地方創生",
    "#伴手禮推薦",
    "#食農教育",
    "#農創品牌",
    "#電商品牌"
  ].join(" ");

  const fbPost = `【${brand}｜${product}】

你是否也想找一份有故事、有溫度、又適合分享的農產品？

${brand} 將 ${product} 的特色轉化成一份來自土地的心意。
產品特色包含：${feature}。

這不只是商品，而是一份從產地出發的品牌故事。
適合自己品嚐，也適合送給重視品質與心意的人。

${hashtags}`;

  const igPost = `${brand}｜${product} ✨

來自土地的味道，
也可以很有品牌感。

🌱 產品特色：
${feature}

🎁 適合：
送禮、社群分享、日常品味、地方特色推廣

讓農產品不只是被購買，
也能被記住、被分享、被喜歡。

${hashtags}`;

  const threadsPost = `如果農產品不只是農產品，而是一份來自土地的禮物呢？

${brand} 把 ${product} 的特色轉化成有故事、有溫度的品牌內容。

我覺得真正好的農產品，不只是好吃或好用，而是讓人知道：它從哪裡來、誰用心做、為什麼值得被支持。`;

  const shortVideo = `【短影音腳本｜${brand} ${product}】

片長：30秒

0-3秒｜開場鉤子
畫面：商品特寫或產地畫面
口播：你知道一個農產品，如何變成讓人想購買的品牌嗎？

4-10秒｜產品特色
畫面：原料、包裝、手作或產地細節
字幕：${feature}

11-20秒｜品牌故事
畫面：農人、土地、商品包裝或情境攝影
口播：${brand} 希望把 ${product} 做成一份有故事、有溫度的商品。

21-27秒｜購買理由
畫面：商品開箱、禮盒、社群美照
字幕：適合送禮｜適合分享｜支持在地

28-30秒｜結尾行動
口播：如果你也喜歡有故事的農產品，歡迎認識 ${brand}。`;

  const activity = `【社群活動企劃｜${brand}】

活動名稱：
「我想把 ${product} 分享給誰？」

活動方式：
1. 在貼文下方留言：最想把 ${product} 分享給誰？
2. 標記一位朋友。
3. 分享貼文到限時動態。
4. 抽出 3 位贈送品牌小禮。

活動目的：
提高留言互動、增加分享率、讓更多人認識 ${brand}。

活動貼文文案：
如果一份農產品代表一份心意，
你最想把 ${product} 分享給誰？

留言告訴我們，
就有機會獲得 ${brand} 精選小禮。`;

  const coachPrompt = `你是「AI農創教練」與「農產品社群行銷顧問」。

請根據以下資料，協助我完成完整的農產品社群行銷企劃：

【品牌資料】
品牌名稱：${brand}
產品名稱：${product}
產品特色：${feature}

請協助產出：

1. Facebook 貼文 3 則。
2. Instagram 貼文 3 則。
3. Threads 貼文 3 則。
4. Reels / Shorts / TikTok 短影音腳本 3 支。
5. Hashtag 組合。
6. 社群抽獎活動企劃。
7. 30 天社群內容規劃。
8. 適合搭配商品攝影的貼文文案。
9. 電商導購貼文。
10. 給高中職學生的社群行銷學習問題。

請用清楚小標題整理，語氣要專業、溫暖、有行銷感，並適合農產品品牌、地方創生、食農教育與電商推廣。`;

  const result = `
【Facebook 貼文】
${fbPost}

────────────────────

【Instagram 貼文】
${igPost}

────────────────────

【Threads 貼文】
${threadsPost}

────────────────────

【Hashtag 建議】
${hashtags}

────────────────────

【短影音腳本】
${shortVideo}

────────────────────

【社群活動企劃】
${activity}

────────────────────

【AI農創教練完整 Prompt】
${coachPrompt}
`;

  document.getElementById("resultBox").innerHTML = `
<h3>📱 ${brand}｜${product} 社群行銷內容</h3>

<div id="socialResult">${result}</div>

<button class="copy-btn" onclick="copyText('socialResult')">
  一鍵複製全部社群內容
</button>

<br><br>

<a class="coach-btn" href="${coachUrl}" target="_blank">
  🚀 開啟 AI農創教練
</a>
`;
}

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("generateBtn");
  if (btn) {
    btn.addEventListener("click", generateSocialContent);
  }
});
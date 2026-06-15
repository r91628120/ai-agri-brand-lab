const cases={
  mango:{productName:'芒果乾',cropName:'愛文芒果',origin:'屏東縣枋山鄉',features:'天然果香、低溫烘焙、無添加色素、適合送禮。',target:'送禮市場',packageType:'禮盒',styleType:'高級精品風',price:'399'},
  rice:{productName:'米禮盒',cropName:'台灣稻米',origin:'花東縱谷',features:'產地直送、米香濃郁、友善耕作、適合企業送禮。',target:'企業團購',packageType:'禮盒',styleType:'地方創生風',price:'599'},
  tea:{productName:'高山茶',cropName:'烏龍茶',origin:'阿里山',features:'高山冷冽茶香、手採茶葉、回甘清香、適合伴手禮。',target:'高端精品客群',packageType:'紙盒',styleType:'極簡現代風',price:'880'},
  pineapple:{productName:'鳳梨酥',cropName:'關廟鳳梨',origin:'台南市關廟區',features:'酸甜果餡、在地鳳梨、節慶送禮、適合觀光客。',target:'觀光伴手禮',packageType:'手提盒',styleType:'活潑親子風',price:'360'}
};
function $(id){return document.getElementById(id)}
function loadCase(key){const c=cases[key];Object.keys(c).forEach(k=>$(k).value=c[k]);location.hash='designer'}
function selectedElements(){return Array.from(document.querySelectorAll('.check-box input:checked')).map(x=>x.value)}
function brandNames(product,crop,origin,style){
  const base=origin.replace(/[縣市鄉鎮區]/g,'').slice(0,3)||'田野';
  return [`${base}${crop.slice(0,2)}選`,`${crop.slice(0,2)}日和`,`豐味${product.slice(0,2)}`,`南風${product.slice(0,2)}`,`Golden ${product}`];
}
function generateDesign(){
  const product=$('productName').value.trim()||'農產品';
  const crop=$('cropName').value.trim()||'在地作物';
  const origin=$('origin').value.trim()||'台灣產地';
  const features=$('features').value.trim()||'具備在地特色與品質優勢';
  const target=$('target').value;
  const pkg=$('packageType').value;
  const style=$('styleType').value;
  const price=$('price').value.trim()||'未設定';
  const elements=selectedElements();
  const names=brandNames(product,crop,origin,style);
  const mainName=names[0];
  const color=style.includes('精品')?'深墨綠、米白色、燙金':style.includes('文青')?'米白色、柔橘色、淺綠色':style.includes('自然')?'草綠色、土壤棕、米色':style.includes('地方')?'稻穗金、土地棕、在地圖紋':'橘色、白色、品牌主色';
  const story=`${mainName} 來自 ${origin}，以 ${crop} 為核心，將 ${features} 轉化成可被看見、可被記住的品牌價值。\n我們希望每一份 ${product}，不只是商品，而是一份來自土地、農人與季節的心意。`;
  const front=`${mainName}\n${product}\n${crop}｜${origin}\n${elements.slice(0,3).join('・')}\n建議售價：${price} 元`;
  const back=`產品名稱：${product}\n主要原料：${crop}\n產地：${origin}\n產品特色：${features}\n保存方式：請置於陰涼乾燥處，開封後請盡早食用。\n品牌理念：把土地的故事，設計成值得分享的禮物。`;
  const logoPrompt=`請設計一款農產品品牌 Logo。\n品牌名稱：${mainName}\n產品：${product}\n產地：${origin}\n品牌風格：${style}\n設計元素：${crop}、土地、葉子、陽光、在地文化\n色彩建議：${color}\n需求：高級、乾淨、可用於包裝標籤，白底，向量感，適合農產品品牌。`;
  const packagePrompt=`請設計一款農產品包裝視覺。\n品牌名稱：${mainName}\n商品：${product}\n包裝形式：${pkg}\n目標客群：${target}\n品牌風格：${style}\n產品特色：${features}\n主色建議：${color}\n畫面元素：${crop}、${origin}、農田線條、自然質感、送禮感\n輸出方向：商業包裝設計、電商商品圖、質感品牌提案、清楚呈現正面包裝。`;
  const social=`【${mainName}｜${product}】\n來自 ${origin} 的 ${crop}，把土地的香氣與農人的堅持，做成一份適合分享的禮物。\n#農產品品牌 #${product} #${origin} #農創品牌 #伴手禮`;
  $('result').className='result-card';
  $('result').innerHTML=`
    <p class="eyebrow">AI PACKAGING DESIGN REPORT</p>
    <h2>🎨 ${product}｜AI包裝設計提案</h2>
    <div class="result-grid">
      <div class="result-box"><h3>① 品牌命名</h3><p>${names.map(x=>'・'+x).join('<br>')}</p></div>
      <div class="result-box"><h3>② 品牌定位</h3><p>${target} × ${style} × ${pkg}<br>建議主色：${color}</p></div>
      <div class="result-box"><h3>③ 品牌故事</h3><p>${story.replace(/\n/g,'<br>')}</p></div>
      <div class="result-box"><h3>④ 包裝文案</h3><p><b>正面：</b><br>${front.replace(/\n/g,'<br>')}<br><br><b>背面：</b><br>${back.replace(/\n/g,'<br>')}</p></div>
      <div class="result-box"><h3>⑤ Logo Prompt</h3><div class="prompt" id="logoPrompt">${logoPrompt}</div><button class="copy-btn" onclick="copyText('logoPrompt')">複製 Logo Prompt</button></div>
      <div class="result-box"><h3>⑥ 包裝設計 Prompt</h3><div class="prompt" id="packagePrompt">${packagePrompt}</div><button class="copy-btn" onclick="copyText('packagePrompt')">複製包裝 Prompt</button></div>
      <div class="result-box"><h3>⑦ 社群文案</h3><div class="prompt" id="socialCopy">${social}</div><button class="copy-btn" onclick="copyText('socialCopy')">複製社群文案</button></div>
      <div class="result-box"><h3>⑧ AI推演學習問題</h3><p>1. 如果目標客群改成企業團購，包裝要怎麼改？<br>2. 如果售價提高，品牌故事與包裝質感要如何支撐？<br>3. 哪一個品牌元素最能提高商品信任感？<br>4. 包裝設計如何幫助商品進入電商市場？</p></div>
    </div>`;
}
function copyText(id){navigator.clipboard.writeText($(id).innerText).then(()=>alert('已複製！'))}
function clearResult(){ $('result').className='result-card muted'; $('result').textContent='請輸入資料後按下「產生包裝提案」。'; }

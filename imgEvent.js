`use strict`

let imgState = false;
let eventRatio = 0.2;
let mouseCount = 0;
let omikujiState = false;
let omikujiRatio = 0.3;
let omikujiUpDown = 1;

/**
 * @param {(element, num)} element, eventRatio オブジェクトの要素とイベント発生の割合
 * @returns {} 各要素にイベントを付与 
 */
function addEvent (element, eventRatio){
    element.addEventListener("mouseout", baseImg);
    element.addEventListener("click", changeImg);
    if (Math.random() <= eventRatio){
        element.addEventListener("mouseenter", flashImg);
    }
}

/**
 * @returns {} 要素にマウスが侵入した時にimgを変更 
 */
function flashImg(){
    let imgPC = "";
    let randomNum = Math.random();
    if (randomNum < 0.1){
        imgPC = "character_program_happy.png";
        omikujiUpDown = 3;
    } else if (randomNum < 0.3){
        imgPC = "character_program_smart.png";
        omikujiUpDown = 2;
    } else if (randomNum < 0.5){
        imgPC = "character_program_fast.png";
    } else if (randomNum < 0.55){
        imgPC = "character_program_shutdown.png";
        omikujiUpDown = 0;
    } else if (randomNum < 0.60){
        imgPC = "character_program_shock.png";
        omikujiUpDown = 0;
    } else if (randomNum < 0.70){
        imgPC = "character_program_fat.png";
        omikujiUpDown = 0.2;
    } else {
        imgPC = "character_program.png";
    }
    const img = document.getElementById("imgPC");
    img.src = imgPC;
    imgState = true;
    omikujiState = true;
}

/**
 * @returns {} 要素からマウスが出た時にimgを変更 
 */
function baseImg(){
    mouseCount ++;
    if(mouseCount > 6){
        imgState = true;
        mouseCount = 0;
    }

    if (imgState) {
        const img = document.getElementById("imgPC");
        img.src = "character_program.png";       
    }

    omikujiState = false;
}

/**
 * @returns {} 要素からクリックした時にimgを変更 
 */
function changeImg (){
    if(imgState && omikujiState){
        omikuji();
        imgState = false;
        omikujiState = false;
    } else {
        imgState = true;
        omikujiState = false;
    }
    mouseCount = 0;
}

/**
 * @returns {} おみくじを実行 
 */
function omikuji (){
    let randomNum = Math.random();
    if (randomNum < omikujiRatio){
        const img = document.getElementById("imgOmikuji");
        img.style.display = "inline";
        let omikuji = "";

        let randomNum = Math.random();
            if (randomNum < 0.2 * omikujiUpDown){
            omikuji = "omikuji_daikichi.png";
        } else if (randomNum < 0.4){
            omikuji = "omikuji_suekichi.png"; 
        } else if (randomNum < 0.6){
            omikuji = "omikuji_syoukichi.png"; 
        } else if (randomNum < 0.8){
            omikuji = "omikuji_chuukichi.png"; 
        } else {
            omikuji = "omikuji_kichi.png";
        }
        img.src = omikuji;  
        omikujiUpDown = 1;   
    }
}

/**
 * @returns {} 要素にマウスが侵入した時にimgを変更(クイズ終了時用)
 */
function flashImgQuiz(){
    let imgPC = "";
    let randomNum = Math.random();
    if (randomNum < 0.3){
        imgPC = "character_program_fast.png";
    } else if (randomNum < 0.4){
        imgPC = "character_program_shutdown.png";
    } else if (randomNum < 0.5){
        imgPC = "character_program_shock.png";
    } else if (randomNum < 0.6){
        imgPC = "character_program_fat.png";
    } else {
        imgPC = "character_program.png";
    }
    const img = document.getElementById("imgPC");
    img.src = imgPC;
    imgState = true;
    omikujiState = true;
}

// 試作
/**
 * @param {(string)} title タイトル作成の時の文字
 * @returns {} タイトルを表示
 */
function makeTitle (title){
    const glInfo = {};
    glInfo.scriptElement = document.getElementsByTagName("script")[0];
    glInfo.fileName = glInfo.scriptElement.outerHTML;
    glInfo.srcPos = glInfo.fileName.search("src");
    glInfo.jsPos = glInfo.fileName.search("js");
    glInfo.titleName = glInfo.fileName.slice(glInfo.srcPos + 5, glInfo.jsPos - 1);
    document.getElementById("title").innerText = `${glInfo.titleName} ${title}`;
}
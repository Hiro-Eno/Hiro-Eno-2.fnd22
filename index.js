`use strict`

createButtons(glossary);

/**
 * @param {object} object 用語集(glossary)
 * @returns {} 用語集の単語(key)をボタンで表示
 */
function createButtons(object) {
    const indexArea = document.getElementById("indexArea");

    for (let key in object) {
        const button = document.createElement("button");
        button.innerText = key;
        button.className = "buttonIndex";
        button.onclick = function () {
            display(key, object[key]);
        };

        addEvent(button, 0.2); // imgEvent.js 関数

        indexArea.appendChild(button);
    }
}

/**
 * @param {string} key value ボタンを押した単語(key)
 * @param {string} key value ボタンを押した単語(key)の内容(object[key])
 * @returns {} 単語と内容を表示
 */
function display(key, value) {
    const content = document.getElementsByClassName("content");
    content[0].innerText = `Select:\t${key}`
    content[1].innerText = `Content:\t${value}`

    // imgEvent.js 対応
    if (!imgState){
        const img = document.getElementById("imgPC");
        img.src = "character_program.png";
    }
    imgState = true;
}

/**
 * @returns {} 単語と内容を消去
 */
function buttonClear(){
    const content = document.getElementsByClassName("content");
    content[0].innerText = `Select:\t`
    content[1].innerText = `Content:\t`
}

`use strict`

createButtons(glossary);

/**
 * @param {array} array 用語集(glossary)
 * @returns {} 用語集の用語(target))をボタンで表示
 */
function createButtons(array) {
    const indexArea = document.getElementById("indexArea");

    for (const object of array) {
        const button = document.createElement("button");
        button.innerText = object.target;
        button.className = "buttonIndex";
        button.onclick = function () {
            display(object.target, object.content);
        };

        addEvent(button, 0.2); // imgEvent.js 関数

        indexArea.appendChild(button);
    }
}

/**
 * @param {string} target ボタンを押した用語(target)
 * @param {string} contentTarget ボタンを押した用語(target)の内容(content)
 * @returns {} 単語と内容を表示
 */
function display(target, contentTarget) {
    const select = document.getElementById("select");
    const content = document.getElementById("content");
    select.innerText = `Select:\t${target}`;
    content.innerHTML = `Content:\t${contentTarget}`;

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
    const select = document.getElementById("select");
    const content = document.getElementById("content");
    select.innerText = "Select:\t";
    content.innerHTML = "Content:\t";
}

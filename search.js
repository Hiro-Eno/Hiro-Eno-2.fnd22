'use strict';

let eraseState = false;

/**
 * @returns {} 検索ワード、検索件数、検索された用語集の単語(key)と内容(value)を表示
 */
function getWord() {
    // 入力処理
    const word = document.getElementById("inputText");
    if(word.value === ""){
        return "";
    }
    const object = {};
    for (const key in glossary){
        if (key.indexOf(word.value) > -1 || glossary[key].indexOf(word.value) > -1){
            object[key] = glossary[key];
        }
    }

    // 2回目以降、前の検索結果を消去
    if (eraseState){
        const add = document.getElementsByClassName("add");
        const addNum = add.length;
        for (let i = 0; i < addNum ; i++) {
            add[0].remove();
        }
    } else {
        eraseState = true;
    }

    // 検索結果を表示
    addDisplay(word.value, Object.keys(object).length);
    if (Object.keys(object).length > 0){
        displayObject(object);
    }
    // document.getElementById("searchResult").style.display = "inline";
}

/**
 * @param {string} word, num 検索ワード(word.value)
 * @param {number} num 検索数(Object.keys(object).length)
 * @returns {} 検索ワードと検索数を表示
 */
function addDisplay(word, num) {
    const content = document.getElementsByTagName("h3");
    content[0].innerText = `検索ワード:\t${word}`
    content[1].innerText = `ヒット数:\t${num} 件`
}

/**
 * @param {object} object 検索された用語のオブジェクト(object)
 * @returns {} 検索された用語集の単語(key)と内容(value)を表示
 */
function displayObject(object) {
    const newUl = document.createElement("ul"); 

    for (let key in object) {
        let newElement = document.createElement("li");
        newElement.innerHTML = "<strong>" + key + ":</strong>\t" + object[key];
        newElement.className = "add";
        newUl.appendChild(newElement);
        addEvent(newElement, 0.2);
    }
    activeArea.appendChild(newUl);
}

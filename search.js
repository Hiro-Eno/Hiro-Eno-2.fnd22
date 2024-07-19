'use strict';

let eraseState = false;

/**
 * @returns {} 検索ワード、検索件数、検索された用語集の用語(target)と内容(content)を表示
 */
function getWord() {
    // 入力処理
    const word = document.getElementById("inputText");
    if(word.value === ""){
        return "";
    }
    const arrayTarget = [];
    const arrayContent = [];

    for (const element of glossary){
        if (element.target.toLowerCase().indexOf(word.value.toLowerCase()) > -1 || 
        element.content.toLowerCase().indexOf(word.value.toLowerCase()) > -1){
            arrayTarget.push(element.target);
            arrayContent.push(element.content);
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
    addDisplay(word.value, arrayTarget.length);
    if (arrayTarget.length> 0){
        displaySearchResult(arrayTarget, arrayContent);
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
 * @param {array} array1 検索された用語の配列
 * @param {array} array1 検索された用語の内容の配列
 * @returns {} 検索された用語集の用語(target)と内容(content)を表示
 */
function displaySearchResult(array1, array2) {
    const newUl = document.createElement("ul"); 

    for (let i=0; i <array1.length; i++) {
        let newElement = document.createElement("li");
        newElement.innerHTML = "<strong>" + array1[i] + ":</strong>\t" + array2[i];
        newElement.className = "add";
        newUl.appendChild(newElement);
        addEvent(newElement, 0.2);
    }
    activeArea.appendChild(newUl);
}

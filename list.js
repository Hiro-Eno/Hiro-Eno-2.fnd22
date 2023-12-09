`use strict`

// imgPC.jsで宣言済み
imgPC = "character_program_happy.png";

displayObject(glossary);

/**
 * @param {object} object 用語集(glossary)
 * @returns {} 用語集の単語(key)と内容(value)を表示
 */
function displayObject(object) {
    const ulElement = document.getElementsByTagName("ul")[0];

    for (let key in object) {
        let newElement = document.createElement("li");
        newElement.innerHTML = "<strong>" + key + ":</strong>\t" + object[key];
        ulElement.appendChild(newElement);
        addEvent(newElement, 0.2);
    }
}

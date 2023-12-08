`use strict`

// imgPC.jsで宣言済み
imgPC = "character_program_happy.png";

displayObject(glossary);

/**
 * @param {object} object 用語集(glossary)
 * @returns {} 用語集の単語(key)と内容(value)を表示
 */
function displayObject(object) {
    const activeArea = document.getElementById("activeArea");

    for (let key in object) {
        let newElement = document.createElement("ul"); 
        newElement.innerHTML = "<li><strong>" + key + ":</strong>\t" + object[key] + "</li>";
        activeArea.appendChild(newElement);

        addEvent(newElement, 0.2);
    }
}
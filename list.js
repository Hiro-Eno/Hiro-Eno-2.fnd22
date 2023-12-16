`use strict`

// imgPC.jsで宣言済み
imgPC = "character_program_happy.png";

displayGlossary(glossary);

/**
 * @param {array} array 用語集(glossary)
 * @returns {} 用語集の用語(target)と内容(content)を表示
 */
function displayGlossary(array) {
    const ulElement = document.getElementsByTagName("ul")[0];

    for (const object of array) {
        let newElement = document.createElement("li");
        newElement.innerHTML = "<strong>" + object.target + ":</strong>\t" + object.content;
        ulElement.appendChild(newElement);
        addEvent(newElement, 0.2);
    }
}

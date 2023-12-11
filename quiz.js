`use strict`

// クイズ数の変数宣言
let quizNum = 0;
const choicesNum = 3;

// クイズキーの変数宣言
let quizKeys = [];
let quizKeysCopy = [];

// クイズ回答の変数宣言
let choices = [];
let correctAnswer = "";
let quizCount = 0;
let quizTotalCount = 0;
let quizCorrectNum = 0;
let wrongQuizzes = [];
let checkDoubleAnswer = false; 

// スコアの変数宣言
let score = 0;
const plusScore = 10;
const minusScore = 0;
let bonusScore = 5;
let bonusScoreCopy = bonusScore;
let countBonus = 0;
const countBonusMax = 4;
const scoreSymbol = "🌟🌟🌟🌟🌞🐭🐮🐯🐰🐲🐍🐴🐑🐵🐔🐶🐗🌞👽🌞🍒🍓🍇🍊🍅🍎🍏🍑🍍🍈🍉🌞💩🌞🌸🌷🌹🌻🌺🌾🍁🌞🛸🌞🎍🎎🎏🎑🎃🎄🌞👾🌞🦘🐘🐳🐬🐧🦚🦉🌞👻";

// 復習の変数宣言
let reviewNum = 0;
let checkEnd = false;
let reviewComment = "";


// クイズ総キーの配列作成
const quizAllKeys = Object.keys(glossary);


// htmlコールバック関数の作成
const displayButtonNext = makeDisplay("buttonNext");
const displayQuizCount = makeDisplay("quizCount");
const displayScore = makeDisplay("score");
const displayScoreSymbol = makeDisplay("scoreSymbol");
const displayQuiz = makeDisplay("quiz");
const displayButton1 = makeDisplay("button1");
const displayButton2 = makeDisplay("button2");
const displayButton3 = makeDisplay("button3");
const displayQuizResult1 = makeDisplay("quizResult1");
const displayQuizResult2 = makeDisplay("quizResult2");
const displayQuizResult3 = makeDisplay("quizResult3");

const button1 = makeAnswerButton(1);
const button2 = makeAnswerButton(2);
const button3 = makeAnswerButton(3);


// 以下、コールバック関数関係

// makeDisplay(id)
// idのテキストを修正するコールバック関数の作成
/**
 * @param {string} id テキストを修正したいエレメントのid
 * @return {function} func テキスト修正するコールバック関数を返す
 */
function makeDisplay(id) {
    const func = function(word){
        let element = document.getElementById(id);
        element.innerText = word;
    }
    return func;
}


// makeAnswerButton(value)
// answerボタンのアクションに関するコールバック関数の作成
/**
 * @param {string} answer ボタンidの番号
 * @return {function} func ボタンをクリックした時に実行するコールバック関数を返す
 */
function makeAnswerButton(answer){
    const func = function(){
        if (!checkEnd){
            checkAnswer(choices, correctAnswer, answer);
        }
    }
    return func;
}

// checkAnswer(choices, correctAnswer, answer)
// 回答ボタンがクリックされた時のアクション
/**
 * @param {array} array 回答ボタンの配列 choices
 * @param {string} key 正解のキー correctAnswer
 * @param {number} num クリックした回答ボタンの番号 answer
 * @return {} 回答ボタンがクリックされた時のアクション（答え合わせ等）
 */
function checkAnswer(array, key, num){
    // 回答済み後に回答ボタンをクリックした時の無効化
    if (checkEnd || checkDoubleAnswer){
        return;
    }

    // scoreSymbolNumの初期化
    let scoreSymbolNum = 0;

    // 回答が正解(if)と不正解(else)の時のアクション 
    if (array[num - 1] === key) {
        // score、scoreSymbolNum、quizCorrectNum、countBonusの計算
        let getScore = plusScore + bonusScore * countBonus;
        score += getScore; // score加算
        scoreSymbolNum = countScoreSymbol(score);
        quizCorrectNum ++; // quizCorrectNum加算
        if (countBonus < countBonusMax) {
            countBonus ++;
        }

        // 結果の表示
        displayQuizCount(`第 ${quizTotalCount} 問 (${quizTotalCount} 問中 ${quizCorrectNum} 問 正解) ${reviewComment}`);
        displayScore(`スコア ${score} 点`);
        displayScoreSymbol(`${scoreSymbol.slice(0, scoreSymbolNum)}`);
        let getScoreSymbol = "!";
        if (getScore >= 30) {
            getScoreSymbol = "!!!";
        } else if (getScore >= 20) {
            getScoreSymbol = "!!"
        }
        displayQuizResult1(`正解! ${getScore} 点 獲得${getScoreSymbol}`);

    } else {
        // score、scoreSymbolNumの計算（デフォルトは減点無し）
        score += minusScore; // score減点
        scoreSymbolNum = countScoreSymbol(score);

        // countBonusの初期化、誤答をwrongQuizzes配列に追加
        countBonus = 0;
        wrongQuizzes.push(key);

        // 結果の表示
        displayQuizCount(`第 ${quizTotalCount} 問 (${quizTotalCount} 問中 ${quizCorrectNum} 問 正解) ${reviewComment}`);
        displayScore(`スコア ${score} 点`);
        displayScoreSymbol(`${scoreSymbol.slice(0, scoreSymbolNum)}`);
        displayQuizResult1(`残念! 正解は 「${key}」`);
        displayQuizResult2(`「${array[num - 1]}」 ⇒\t${glossary[array[num - 1]]}`);
    }

    // 回答済み状態の解除
    checkDoubleAnswer = true;

    // buttonNextの表示の初期化    
    document.getElementById("buttonNext").style.display = "initial";
}

// countScoreSymbol(score)
// スコアシンボル数の計算
/**
 * @param {number} score 回答 score
 * @return {num} スコアシンボル数（scoreSymbolの表示する文字数）の計算結果を返す
 */
function countScoreSymbol(score){
    // scoreが2000点までは100点単位、2000点以上は100点単位で追加
    if (score > 2000) {
        return Math.floor((score / 200)) * 2 + 20;
    } else if (score > 0) {
        return Math.floor((score / 100)) * 2;
    }
    return 0;
}


// 以下、クイズ実行関数関係

// buttonNext()
// buttonNextボタンの実行
/**
 * @return {} buttonNextボタンの実行（クイズ数入力、
 */
function buttonNext(){
    // imgPCの初期化、buttonEndの表示
    changeImgQuiz("");
    document.getElementById("buttonEnd").style.display = "inline";

    // クイズ数入力の確認と初期化（クイズオブジェクト作成、各種変数初期化）
    if (quizNum === 0){
        quizNum = Number(document.getElementById("inputNum").value);
        if (quizNum > 0 && Number.isInteger(quizNum) && quizNum <= quizAllKeys.length){
            initialize();
        } else {
            quizNum = 0;
            displayQuiz(`クイズ数は 1 ～ ${quizAllKeys.length} (最大クイズ数) の整数を入力ください`);
            return "";
        }
    }

    // 回答ボタンの表示
    const buttonQuiz = document.getElementsByClassName("buttonQuiz");
    for (i = 0; i < buttonQuiz.length;i ++){
        buttonQuiz[i].style.display = "inline";
    }

    // 全クイズを出題が終わっていればレポートを表示
    if (quizCount === quizKeys.length){
        quizReport();
        if (quizNum === 0){
            return "";
        }
    }

    // 復習する場合（checkEnd = true：ボタンは「復習」を表示）、復習の実行
    if (checkEnd){
        review();
        return "";
    }

    // ボタンに「次」を表示、回答ボタンの回答済み状態の解除
    displayButtonNext("次");
    checkDoubleAnswer = false;

    // クイズを抽出（正解キーの抽出）
    correctAnswer = quizKeys[quizCount];

    // クイズ数をカウント、表示
    quizCount ++;
    quizTotalCount ++;
    displayQuizCount(`第 ${quizTotalCount} 問 (${quizTotalCount - 1} 問中 ${quizCorrectNum} 問 正解) ${reviewComment}`);

    // 回答ボタンの作成、表示
    choices = makeChoices(correctAnswer);
    displayQuizChoices(choices, correctAnswer);
}


// initialize()
// 初期化
/**
 * @return {} クイズ配列の作成、各種変数の初期化
 */
function initialize(){
    changeImgQuiz("");

    document.getElementById("inputNum").style.display = "none";
    quizKeys = selectQuizKeys(quizAllKeys, quizNum);
    quizKeysCopy = quizKeys.slice();

    score = 0;
    scoreSymbolNum = 0;
    bonusScore = bonusScoreCopy;
    countBonus = 0;
    reviewNum = 0;
    quizCount = 0;
    quizTotalCount = 0;
    quizCorrectNum = 0;
    wrongQuizzes = [];
    reviewComment = "";
    checkEnd= false;
    displayQuiz("");

    displayScore(`スコア ${score} 点`);
    displayScoreSymbol(`${scoreSymbol.slice(0, scoreSymbolNum)}`);
}

// selectQuizKeys(quizAllKeys, quizNum)
// クイズ配列の作成
/**
 * @param {array} array 全クイズのキー配列 quizAllKeys
 * @param {num} num 出題するクイズ数 quizNum
 * @return {array} result 抽出したクイズ配列を返す
 */

function selectQuizKeys(array, num) {
    const result = array.slice();
    shuffling(result);
    return result.slice(0, num);
}


// quizReport
// クイズの結果を表示
/**
 * @return {} クイズの結果を表示、buttonNextの表示を「再出題」or「復習」に表示。おみくじの実行
 */
function quizReport(){
    displayQuizResult1("クイズお疲れさまでした。");

    // 回答の結果を表示。buttonNextは、誤答の配列が空の場合(if)は「再出題」、誤答の配列が1以上の要素を持つ場合(else)は「復習」を表示
    if(wrongQuizzes.length === 0) {
        displayQuizResult2(`全出題 ${quizNum}  問回答終了!!! 出題クイズは下記の通りです。`); 
        displayQuizResult3(`出題クイズ: ${quizKeysCopy}`); 
        displayButtonNext("再出題");
        quizNum = 0

        // imgPCの修正
        changeImgQuiz("complete");

        // おみくじ
        omikujiRatio = 1;
        if (quizCorrectNum > quizNum * 0.9) {
            omikujiRatio = 3;
        } else if (quizCorrectNum > quizNum * 0.8) {
            omikujiRatio = 2;
        }
        omikuji();

    } else {
        displayQuizResult2("復習をする場合は「復習」を押してください。");
        displayQuizResult3(`誤答: ${wrongQuizzes}`);
        displayButtonNext("復習");
        quizCount = 0;
    }

    // クイズ終了状態の表示
    checkEnd = true;
}


// review
// 復習
/**
 * @return {} 誤答の配列をクイズの配列にコピー
 */
function review(){
    // 誤答の配列をクイズの配列にコピー
    quizKeys = wrongQuizzes.slice();
    shuffling(quizKeys);

    // wrongQuizzesの要素が1つのときのバグ対応
    if (quizKeys.length !== wrongQuizzes.length){
        quizKeys.shift();
    }

    // 復習回数のカウント
    reviewNum ++;
    reviewComment = ` (復習回数 ${reviewNum} 回目)`;

    // 初期化
    wrongQuizzes = [];
    bonusScore = 0;
    quizCount = 0;
    checkEnd = false;

    // imgPCの修正
    changeImgQuizReview();
}


// makeChoices(correctAnswer)
// 回答ボタンの配列の作成
/**
 * @param {string} key 正解キー correctAnswer
 * @returns {array} result 正解を1つ、残りダミーのキーをシャッフルした回答ボタンの配列に返す
 */

function makeChoices(key) {
    // quizAllKeysをコピー後、正解のキーを削除し、シャッフリング
    const arrayAllKeys = quizAllKeys.slice();
    const arraykeys = arrayAllKeys.filter((x) => x !== key);
    shuffling(arraykeys);

    // 回答ボタンの-1のキーを抽出後、正解のキーを追加しシャッフリング
    const result = arraykeys.slice(0, choicesNum - 1);
    result.unshift(key);
    shuffling(result);

    // 回答ボタンの配列を返す
    return result;
}


// displayQuizAnswer(choices, correctAnswer)
// 回答ボタンの表示
/**
 * @param {array} array 回答ボタンの配列 choices
 * @param {string} key 正解キー correctAnswer
 * @returns {} クイズと回答ボタンを表示、buttonNextの表示をオフ
 */

function displayQuizChoices(array, key) {
    displayQuiz(glossary[key]);
    displayButton1(array[0]);
    displayButton2(array[1]);
    displayButton3(array[2]);
    displayQuizResult1("");
    displayQuizResult2("");
    displayQuizResult3("");
    document.getElementById("buttonNext").style.display = "none";
}


// buttonEnd()
// 終了ボタンのアクション
/**
 * @returns {} 終了ボタンのアクション（初期状態に戻す）
 */
function buttonEnd(){
    // imgPCの修正
    changeImgQuiz("retired");

    // 初期化
    displayQuizCount("");
    displayScore(""); 
    displayScoreSymbol(""); 
    displayQuiz("","");
    displayQuizResult1("");
    displayQuizResult2("");
    displayQuizResult3("");

    const buttonQuiz = document.getElementsByClassName("buttonQuiz");
    for (i = 0; i < buttonQuiz.length;i ++){
        buttonQuiz[i].style.display = "none";
    }
    document.getElementById("buttonEnd").style.display = "none";
    document.getElementById("inputNum").value = "";
    document.getElementById("inputNum").style.display = "inline";
    document.getElementById("buttonNext").style.display = "initial";

    // buttonNextの修正
    displayButtonNext("開始");
 
    quizNum = 0;
}


// changeImgQuiz (word)
// imgPCの修正
/**
 * @param {string} word 表示したいimgPCの情報
 * @returns {} imgPCの修正
 */
function changeImgQuiz (word){
    const img = document.getElementById("imgPC");
    if (word === "complete"){
        img.src = "character_program_happy.png";
    } else if (word === "retired"){
        img.src = "character_program_shutdown.png";
    } else {
        img.src = "character_program.png";
    }
}


// shuffling(array)
// 配列のシャッフリング
/**
 * @param {array} array シャッフリングしたい配列
 * @returns {array} array シャッフリングした配列（実引数の配列もシャッフリング）
 */
function shuffling(array) {
    let randomNum = 0;
    let temp = "";
    for (let i = 0; i < array.length * 2; i ++) {
        randomNum = Math.floor(Math.random() * (array.length - 1));
        temp =array[randomNum];
        array[randomNum] = array.pop();
        array.push(temp);
    }
    return array;
}


// demoAnswer(choices, correctAnswer, 0.5)
// // 模擬回答の作成
// /**
//  * @param {array} array 回答欄配列 choices
//  * @param {string} key 正解キー correctAnswer
//  * @param {num} num 正答率加算係数
//  * @returns {num} result 模擬回答 
//  */

// function demoAnswer(array, key, num) {
//     let result = 0;
//     if (Math.random() < (answerNum*num - 1) / (answerNum - 1)) {
//         result = array.indexOf(key) + 1;
//     } else {
//         result = Math.floor(Math.random() * answerNum) + 1;
//     }
//     return result;
// }

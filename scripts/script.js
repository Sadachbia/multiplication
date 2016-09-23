// Constants
const ICON_CORRECT = "&#x2605";    // Black star
const ICON_INCORRECT = "&#x2606";  // White star
const MODAL_TIMEOUT = 1200;
const ALLOWED_VALUES = /[^0-9]/;

// Multiplication table object
function multiplicationTable (multiplier, multiplicant) {
    var timer;

    this.multiplier = multiplier
    this.multiplicant = multiplicant
    this.correctAnswers = 0
    this.wrongAnswers = 0
    this.totalAmountOfCorrectAnswers = 0
    this.totalAmountOfAnswers = 0
    this.totalAmountOfMultiplicants = 0
}

// Variables
timesTable = new multiplicationTable(1,1);

/* 
 * This function initializes game when the new game is started.
 */
function initialize() {
    timesTable.totalAmountOfMultiplicants = document.getElementById("exercise").length; 
    getNextExpression();
    createRowsAndCellsToTable();
    timesTable.correctAnswers = 0;
    timesTable.wrongAnswers = 0;
    setStats();
    clearTextbox("getAnswer");
}

/* 
 * This function sets new multiplicant according to dropdown list.
 */
function setMultiplicant(newMultiplicant) {
    if (timesTable.correctAnswers === 0 && timesTable.wrongAnswers === 0) {
        deleteRowsOfNonPlayedGame();
    }

    timesTable.multiplicant = newMultiplicant;
    initialize();
}

/* 
 * This function sets and displays new expression.
 */
function setExpression() {
    document.getElementById("expression").innerHTML = timesTable.multiplicant.toString() 
                                                      + " x " 
                                                      + timesTable. multiplier.toString();
}

/* 
 * This function randomizes new multiplier
 */
function randomize() {
    timesTable.multiplier = Math.floor((Math.random() * timesTable.totalAmountOfMultiplicants) + 1);
}

/* 
 * This function checks if given answer is correct and gives
 * feedback according to that.
 */
function checkResult() {
    var givenResult = document.getElementById("getAnswer").value;
    var givenResultLenght = document.getElementById("getAnswer").lenght;
    var correctAnswer = timesTable.multiplier * timesTable.multiplicant;
    var icon = ICON_CORRECT;
    var modalMessage = "";

    if (givenResult.match(ALLOWED_VALUES) || givenResult == '') {
        modalMessage = "Annoit jotain muuta kuin numeron. Yritä uudelleen.";
    } else {
        if (correctAnswer == givenResult) {
            modalMessage = "Oikein!";
            timesTable.correctAnswers++;
            icon = ICON_CORRECT;
            timesTable.totalAmountOfCorrectAnswers++;
        } else {
            modalMessage = "Hupsis, "
                           + timesTable.multiplicant.toString() 
                           + " x " 
                           + timesTable. multiplier.toString()
                           + " = " 
                           + correctAnswer.toString() 
                           + ".";
            timesTable.wrongAnswers++;
            icon = ICON_INCORRECT;
        }
        timesTable.totalAmountOfAnswers++;
        insertSmiley(icon);
        getNextExpression();
    }
    showModal(modalMessage);
    clearTextbox("getAnswer");
}

/* 
 * This function clears answer textbox.
 */
function clearTextbox(id) {
    var answerText = document.getElementById(id);
  
    answerText.value = "";
    answerText.focus();
}

/* 
 * This function randomizes new multiplier and displays
 * randomized expression.
 */
function getNextExpression() {
    randomize();
    setExpression();
    setStats();
}

/* 
 * This function creates rows and cells to table which will have game results.
 */
function createRowsAndCellsToTable() {
    var i = 0;
    var j = 0;
    var maxCountOfCells = timesTable.totalAmountOfMultiplicants;
    var maxCountOfRows = 2;
    var row, cell, cellText, table;
    
    table = document.getElementById("grades");
  
    for (i = 0; i < maxCountOfRows; i++) {
        row = table.insertRow(i);
        for (j = 0; j < maxCountOfCells; j++) {
            cell = row.insertCell(j);
            if (i === 0) {
                cellText = timesTable.multiplicant + " x " + (j + 1);
                cell.innerHTML = cellText;
            }
        }
    }
}

/* 
 * This function deletes rows of the game that hasn't been played.
 */
function deleteRowsOfNonPlayedGame() {
    var rowToBegin = 0;    
    var maxCountOfRows = 2;
  
    deleteRows(rowToBegin, maxCountOfRows);
}

/* 
 * This function deletes first row of the table n times.
 */
function deleteRows(start, stop) {
    var i = 0;
    var table = document.getElementById("grades");
  
    for (i = start; i < stop; i++) {
        table.deleteRow(0);
    }
}

/* 
 * This function adds smiley to table, below expression.
 */
function insertSmiley(icon) {
    var cellIndex = timesTable.multiplier - 1;
    var cells = document.getElementById("grades").rows[1].cells;
    var tableOldText = document.getElementById("grades").rows[1].cells[cellIndex].innerHTML;

    cells[cellIndex].innerHTML = tableOldText + icon;
}

/* 
 * This function makes modal visible, displays message and sets
 * timer for hiding it again.
 */
function showModal(modalMessage) {
    var modal = document.getElementById("infoModal");
    
    document.getElementById("btnSend").disabled = true;
    document.getElementById("btnClear").disabled = true;
    document.getElementById("info").innerHTML = modalMessage;
    modal.style.display = "block";
    timesTable.timer = setTimeout(hideModal, MODAL_TIMEOUT);
}

/* 
 * This function hides modal.
 */
function hideModal() {
    var modal = document.getElementById("infoModal");
    
    modal.style.display = "none";
    document.getElementById("btnSend").disabled = false;
    document.getElementById("btnClear").disabled = false;
}

/* 
 * This function initializes the game variables and deletes the rows
 * of result table.
 */
function clearGame() {
    var rowToBegin = 0;    
    var rowsInTable = document.getElementById("grades").rows.length;
  
    deleteRows(rowToBegin, rowsInTable);
    timesTable.totalAmountOfAnswers = 0;
    timesTable.totalAmountOfCorrectAnswers = 0;
    initialize();
}

/* 
 * This function prints stats of game
 */
function setStats() {
    var elem = document.getElementById("gameStats");
    var amountOfAnswers = timesTable.correctAnswers + timesTable.wrongAnswers;

    document.getElementById("gameStats").innerHTML = "Oikeita vastauksia tässä kertotaulussa: "
                                                    + timesTable.correctAnswers.toString()
                                                    + " / "
                                                    + amountOfAnswers.toString()
                                                    + "<br /> Oikeita vastauksia yhteensä: "
                                                    + timesTable.totalAmountOfCorrectAnswers.toString()
                                                    + " / "
                                                    + timesTable.totalAmountOfAnswers.toString();
}

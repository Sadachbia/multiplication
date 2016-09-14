// Constants
const MAX_COUNT_OF_CELLS = 11;
const MAX_COUNT_OF_ROWS = 11;

/* 
 * This function creates timestable.
 */
function createRowsAndCellsToTable() {
    var i, j = 0;
    var row, cell, cellText, nodeText, table, node, textnode;
    
    table = document.getElementById("tables");
  
    for (i = 0; i < MAX_COUNT_OF_ROWS; i++) {
        row = table.insertRow(i);
        for (j = 0; j < MAX_COUNT_OF_CELLS; j++) {
            cell = row.insertCell(j);
            if (i === 0 && j === 0) {
            } else if (i === 0) {
                setCellProperties(cell, "bold", j)
            } else if (j === 0) {
                setCellProperties(cell, "bold", i)
            } else {
                node = document.createElement("div");
                nodeText = i * j;
                textnode = document.createTextNode(nodeText);
                node.appendChild(textnode);
                table.rows[i].cells[j].appendChild(node);
                table.rows[i].cells[j].onclick = function() { hide(this);};
            }
        }
    }
}

/* 
 * This function sets cell properties.
 */
function setCellProperties(cell, style, cellText) {
    cell.style.fontWeight = style;
    cell.innerHTML = cellText;
}

/* 
 * This function hides answer in cell.
 */
function hide(cell) {
    var nextChild = cell.firstChild;

    if (nextChild.style.visibility === "hidden") {
        nextChild.style.visibility = "visible";
    } else {
        nextChild.style.visibility = "hidden";
    }
}

/* 
 * This function shows or hides answers in the cells.
 */
function showCells(visible) {
    var i, j = 0;
    var table, nextChild;
    
    table = document.getElementById("tables");
    
    for (i = 1; i < MAX_COUNT_OF_ROWS; i++) {
        for (j = 1; j < MAX_COUNT_OF_CELLS; j++) {
            nextChild = table.rows[i].cells[j].firstChild;
            nextChild.style.visibility = visible;
        }
    }
}

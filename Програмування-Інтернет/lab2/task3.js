function getCellValue(i, j) {
    return 11*i + j;
}

function buildMatrix(rows=1, cols=1, table=null) {
    if (table?.tagName !== "TABLE") {
        table = document.createElement("table");
    } else {
        table.innerHTML = "";
    }
    for (let i = 0; i < rows; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < cols; j++) {
            const cell = document.createElement("td");
            cell.textContent = getCellValue(i + 1, j + 1);
            row.append(cell);
        }
        table.append(row);
    }
    return table;
}

function calculateThirdColSum() {
    const table = document.getElementById("matrix");
    let sum = 0;
    for (const row of table.rows) {
        const cell = row.cells[2];
        if (!cell) break;
        sum += +cell.textContent;
    }
    return sum;
}

function calculateThirdColSumQuickly() {
    const rows = calculateThirdColSumQuickly.rows;
    const cols = calculateThirdColSumQuickly.cols;
    let sum = 0;
    if (cols > 2) for (let i = 0; i < rows; i++) {
        sum += getCellValue(i + 1, 3);
    }
    return sum;
}

main_form.build_matrix.addEventListener("click", e => {
    const rows = main_form.rows.value;
    const cols = main_form.cols.value;
    calculateThirdColSumQuickly.rows = rows;
    calculateThirdColSumQuickly.cols = cols;

    const table = document.getElementById("matrix");
    buildMatrix(rows, cols, table);
});

main_form.calculate.addEventListener("click", e => {
    const sum = calculateThirdColSumQuickly();
    alert(`Сума елементів третього стовпця = ${sum}`);
});
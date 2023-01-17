const keys = ["й","ц","у","к","е","н","г","ґ","ш","щ","з","х","ї","ф","і","в","а","п","р","о","л","д","ж","є","я","ч","с","м","и","т","ь","б","ю"];
renderKeyboard(keys);

function renderKeyboard(keys) {
    if (!Array.isArray(keys)) return;

    const keysCount = keys.length + 3;
    const remainder = keysCount % 3;

    const rowMinLength = (keysCount - remainder) / 3;
    
    const row1Length = remainder === 1 ? rowMinLength : rowMinLength + remainder / 2;
    const row2Length = remainder !== 1 ? rowMinLength : rowMinLength + remainder;
    const row3Length = remainder === 1 ? rowMinLength : rowMinLength + remainder / 2;

    const rows = [
        keys.slice(0, row1Length),
        keys.slice(row1Length, row1Length + row2Length),
        keys.slice(row1Length + row2Length),
    ];

    const keyboard = document.getElementById("keyboard");
    keyboard.innerHTML = "";
    for (const row of rows) {
        const rowElement = document.createElement("div");
        rowElement.classList.add("keyrow");
        for (const key of row) {
            const keyElement = document.createElement("div");
            keyElement.classList.add("key");
            keyElement.innerText = key;
            keyElement.addEventListener("mouseup", () => {
                task2_form.line.value += key;
            })
            rowElement.append(keyElement);
        }
        keyboard.append(rowElement);
    }

    clearKey: {
        const row1 = keyboard.children[2]
        const keyElement = document.createElement("div");
        keyElement.classList.add("key");
        keyElement.classList.add("key-tpl");
        keyElement.innerText = "Очистити";
        keyElement.addEventListener("mouseup", () => {
            task2_form.line.value = "";
        })
        row1.append(keyElement);
        // row1.insertAdjacentElement("afterbegin", keyElement);
    }
}

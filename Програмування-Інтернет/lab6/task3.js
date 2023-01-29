/* 3.1. Функція, що виводить задану послідовність чисел в оберненому порядку */
function output_reversed_array(array) {
    if (!Array.isArray(array)) return;

    console.log(...Array.from(array).reverse())
}
output_reversed_array([1, 2, 3, 4, 5]); // 5 4 3 2 1

/* 3.2. Створити функцію no_zeros(), аргументом якої є масив
   чисел, а результатом дії — модифікований вхідний масив, який не
   містить нульових значень */
function no_zeros(array) {
    if (!Array.isArray(array)) return [];

    for (let i = array.length - 1; i >= 0; i--) {
        if (array[i] == 0) {
            array.splice(i, 1);
        }
    }

    return array;
}
console.log(no_zeros([0, 1, 2, 0, 3, 0, 4, 0, 5])); // [1, 2, 3, 4, 5]

/* 3.3. Створити функцію reverser(), аргументом якої є текстовий
   рядок, а результатом дії — відображення вхідного рядку у
   протилежному порядку */
function reverser(string) {
    if (typeof string !== "string") return "";

    return Array.from(string).reverse().join("");
}
console.log(reverser("abcdef")); // fedcba

/* 3.4. Створити функцію replace(), аргументом якої є текстовий
   рядок «Я не люблю морозиво», а результатом дії:
   a) друге і третє слово поміняти місцями;
   b) пропуски замінені на коми */
function replace(string) {
    if (typeof string !== "string") return "";
    
    const words = string.split(/\s+/);
    [words[1], words[2]] = [words[2], words[1]];

    return words.join(",");
}
console.log(replace("Я не люблю морозиво")); // Я,люблю,не,морозиво
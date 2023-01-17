function update() {
    const w = +main_form.width.value;
    const h = +main_form.height.value;

    const perimeter = (w + h) * 2;
    const area = w * h;
    const diagonal = +Math.sqrt(w*w + h*h).toFixed(3);

    document.getElementById("perimeter").innerText = perimeter;
    document.getElementById("area").innerText = area;
    document.getElementById("diagonal").innerText = diagonal;
}

main_form.width.addEventListener("input", update)
main_form.height.addEventListener("input", update)
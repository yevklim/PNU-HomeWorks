document.body.addEventListener("click", (e) => {
    if (e.target.classList.contains("node-header")) {
        e.target.toggleAttribute("open");
    }
});
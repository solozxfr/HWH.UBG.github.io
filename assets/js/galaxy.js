(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mousePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

    const updateVisibility = () => {
        document.body?.classList.toggle("galaxy-inactive", document.hidden);
    };
    document.addEventListener("visibilitychange", updateVisibility);
    updateVisibility();

    if (reducedMotion.matches || !mousePointer.matches) return;

    let frameRequested = false;
    let pointerX = 0;
    let pointerY = 0;

    window.addEventListener("pointermove", (event) => {
        if (event.pointerType !== "mouse") return;

        pointerX = (event.clientX / window.innerWidth - 0.5) * 12;
        pointerY = (event.clientY / window.innerHeight - 0.5) * 12;
        if (frameRequested) return;

        frameRequested = true;
        window.requestAnimationFrame(() => {
            const root = document.documentElement;
            root.style.setProperty("--galaxy-background-x", `${pointerX * -0.35}px`);
            root.style.setProperty("--galaxy-background-y", `${pointerY * -0.35}px`);
            root.style.setProperty("--galaxy-logo-x", `${pointerX * 0.35}px`);
            root.style.setProperty("--galaxy-logo-y", `${pointerY * 0.35}px`);
            frameRequested = false;
        });
    }, { passive: true });

    window.addEventListener("pointerleave", () => {
        const root = document.documentElement;
        root.style.setProperty("--galaxy-background-x", "0px");
        root.style.setProperty("--galaxy-background-y", "0px");
        root.style.setProperty("--galaxy-logo-x", "0px");
        root.style.setProperty("--galaxy-logo-y", "0px");
    }, { passive: true });
})();

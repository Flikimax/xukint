const hiddenSuccess = (elementId) => {
    setTimeout(function() {
        const success = document.getElementById(elementId);
        if ( ! success ) {
            return;
        }

        var fadeEffect = setInterval(function () {
            if (!success.style.opacity) {
                success.style.opacity = 1;
            }
            if (success.style.opacity > 0) {
                success.style.opacity -= 0.1;
            } else {
                clearInterval(fadeEffect);
                success.classList.add("hidden");
            }
        }, 50);


    },3000);
} 

export { hiddenSuccess }

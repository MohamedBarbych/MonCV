function animateOpen(element) {

    element.style.display = "block";
    element.style.height = "0px";
    element.style.overflow = "hidden";

    const finalHeight = element.scrollHeight;

    let currentHeight = 0;

    // ---- Divise l'animation en 20 étapes --------

    const increment = finalHeight / 20; 
    const interval = setInterval(function() {
        currentHeight += increment;

        if (currentHeight >= finalHeight) {

            element.style.height = "auto";
            element.style.overflow = "visible";
            clearInterval(interval);
        } else {
            element.style.height = currentHeight + "px";
        }
         // ----- Toutes les 20ms (animation de ~400ms au total) -------
    }, 20);
}

function closeDescription(element) {
    element.style.display = "none";
    element.style.height = "auto";
    element.style.overflow = "visible";
}

function toggleDescription(event) {
    const button = event.currentTarget;

    const container = button.closest('li') || button.closest('div');

    const details = container.querySelector('.details-content');

    console.log('Button clicked:', button);
    console.log('Container:', container);
    console.log('Details element:', details);

    const isCurrentlyOpen = button.textContent === "-";

    const allButtons = document.querySelectorAll('.detail-btn');
    const allDetails = document.querySelectorAll('.details-content');

    allButtons.forEach(btn => {
        btn.textContent = "+";
    });

    allDetails.forEach(detail => {
        closeDescription(detail);
    });

    if (!isCurrentlyOpen) {
        button.textContent = "-";
        animateOpen(details);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, attaching event listeners...');
    const detailButtons = document.querySelectorAll('.detail-btn');
    console.log('Found buttons:', detailButtons.length);
    
    detailButtons.forEach(button => {
        button.addEventListener('click', toggleDescription);
    });
});
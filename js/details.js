function animateOpen(element) {
    element.style.display = "block";
    element.style.height = "0px";
    element.style.overflow = "hidden";

    const finalHeight = element.scrollHeight;
    let currentHeight = 0;
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

function updateTooltipPosition(event) {
    const tooltip = document.getElementById('active-tooltip');
    if (tooltip) {
        const offsetX = 15;
        const offsetY = 15;
        tooltip.style.left = (event.pageX + offsetX) + 'px';
        tooltip.style.top = (event.pageY + offsetY) + 'px';
    }
}

function showTooltip(event) {
    const skillName = event.currentTarget;
    const tooltipText = skillName.getAttribute('data-tooltip');

    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = tooltipText;
    tooltip.id = 'active-tooltip';

    document.body.appendChild(tooltip);
    updateTooltipPosition(event);

    setTimeout(function() {
        tooltip.classList.add('show');
    }, 10);

    skillName.addEventListener('mousemove', updateTooltipPosition);
}

function hideTooltip(event) {
    const tooltip = document.getElementById('active-tooltip');
    if (tooltip) {
        tooltip.classList.remove('show');
        setTimeout(function() {
            if (tooltip.parentNode) {
                tooltip.parentNode.removeChild(tooltip);
            }
        }, 300);
    }

    const skillName = event.currentTarget;
    skillName.removeEventListener('mousemove', updateTooltipPosition);
}

document.addEventListener('DOMContentLoaded', function() {
    const detailButtons = document.querySelectorAll('.detail-btn');
    detailButtons.forEach(button => {
        button.addEventListener('click', toggleDescription);
    });

    const skillNames = document.querySelectorAll('.skill-name');
    skillNames.forEach(skillName => {
        skillName.addEventListener('mouseenter', showTooltip);
        skillName.addEventListener('mouseleave', hideTooltip);
    });
});

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

const skillRatings = {
    "React Native / Angular": 4,
    "Python / TensorFlow": 3,
    "Java / Spring Boot": 4,
    "Docker / Git": 5
};

function displayStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<span class="star filled">&#9733;</span>';
        } else {
            stars += '<span class="star empty">&#9733;</span>';
        }
    }
    return stars;
}

function addStarsToSkills() {
    const skillItems = document.querySelectorAll('.skill-item');

    skillItems.forEach(item => {
        const skillNameElement = item.querySelector('.skill-name');
        if (skillNameElement) {
            const skillName = skillNameElement.textContent;
            const rating = skillRatings[skillName];

            if (rating) {
                const starsContainer = document.createElement('span');
                starsContainer.className = 'stars-container';
                starsContainer.innerHTML = displayStars(rating);

                const dt = item.querySelector('dt');
                const button = dt.querySelector('.detail-btn');
                dt.insertBefore(starsContainer, button);
            }
        }
    });
}

function drawSkillsChart() {
    const canvas = document.getElementById('skillsChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    const skills = Object.keys(skillRatings);
    const ratings = Object.values(skillRatings);
    const maxRating = 5;

    const barWidth = 80;
    const barSpacing = 40;
    const chartHeight = height - 100;
    const chartBottom = height - 50;
    const startX = 50;

    const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12'];

    ctx.fillStyle = '#333';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Auto-évaluation des Compétences', width / 2, 30);

    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(startX, chartBottom);
    ctx.lineTo(width - 20, chartBottom);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(startX, chartBottom);
    ctx.lineTo(startX, 60);
    ctx.stroke();

    for (let i = 0; i <= maxRating; i++) {
        const y = chartBottom - (i / maxRating) * chartHeight;
        ctx.fillStyle = '#666';
        ctx.font = '12px Arial';
        ctx.textAlign = 'right';
        ctx.fillText(i.toString(), startX - 10, y + 5);

        ctx.strokeStyle = '#ddd';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(startX, y);
        ctx.lineTo(width - 20, y);
        ctx.stroke();
    }

    skills.forEach((skill, index) => {
        const rating = ratings[index];
        const barHeight = (rating / maxRating) * chartHeight;
        const x = startX + 30 + index * (barWidth + barSpacing);
        const y = chartBottom - barHeight;

        ctx.fillStyle = colors[index];
        ctx.fillRect(x, y, barWidth, barHeight);

        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, barWidth, barHeight);

        ctx.fillStyle = '#fff';
        ctx.font = 'bold 18px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(rating.toString(), x + barWidth / 2, y + barHeight / 2 + 7);

        ctx.fillStyle = '#333';
        ctx.font = '11px Arial';
        ctx.textAlign = 'center';
        const words = skill.split(' / ');
        words.forEach((word, i) => {
            ctx.fillText(word, x + barWidth / 2, chartBottom + 20 + i * 15);
        });
    });
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

    addStarsToSkills();
    drawSkillsChart();
});

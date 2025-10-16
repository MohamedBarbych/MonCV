let appData = null;

async function loadData() {
    try {
        const response = await fetch('js/data.json');
        appData = await response.json();
    } catch (error) {
        console.error('Erreur chargement data.json:', error);
    }
}

function animateOpen(element) {
    element.style.display = "block";
    element.style.height = "0px";
    element.style.overflow = "hidden";

    const finalHeight = element.scrollHeight;
    let currentHeight = 0;
    const config = appData ? appData.animationConfig : { steps: 20, interval: 20 };
    const increment = finalHeight / config.steps;

    const interval = setInterval(function() {
        currentHeight += increment;
        if (currentHeight >= finalHeight) {
            element.style.height = "auto";
            element.style.overflow = "visible";
            clearInterval(interval);
        } else {
            element.style.height = currentHeight + "px";
        }
    }, config.interval);
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
    if (tooltip && appData) {
        const config = appData.animationConfig;
        tooltip.style.left = (event.pageX + config.tooltipOffsetX) + 'px';
        tooltip.style.top = (event.pageY + config.tooltipOffsetY) + 'px';
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

    const delay = appData ? appData.animationConfig.tooltipDelay : 10;
    setTimeout(function() {
        tooltip.classList.add('show');
    }, delay);

    skillName.addEventListener('mousemove', updateTooltipPosition);
}

function hideTooltip(event) {
    const tooltip = document.getElementById('active-tooltip');
    if (tooltip) {
        tooltip.classList.remove('show');
        const fadeOut = appData ? appData.animationConfig.tooltipFadeOut : 300;
        setTimeout(function() {
            if (tooltip.parentNode) {
                tooltip.parentNode.removeChild(tooltip);
            }
        }, fadeOut);
    }

    const skillName = event.currentTarget;
    skillName.removeEventListener('mousemove', updateTooltipPosition);
}

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
    if (!appData) return;

    const skillItems = document.querySelectorAll('.skill-item');

    skillItems.forEach(item => {
        const skillNameElement = item.querySelector('.skill-name');
        if (skillNameElement) {
            const skillName = skillNameElement.textContent;
            const skillData = appData.skills.find(s => s.name === skillName);

            if (skillData) {
                const starsContainer = document.createElement('span');
                starsContainer.className = 'stars-container';
                starsContainer.innerHTML = displayStars(skillData.rating);

                const dt = item.querySelector('dt');
                const button = dt.querySelector('.detail-btn');
                dt.insertBefore(starsContainer, button);
            }
        }
    });
}

function drawSkillsChart() {
    const canvas = document.getElementById('skillsChart');
    if (!canvas || !appData) return;

    const container = canvas.parentElement;
    const containerWidth = container.offsetWidth - 40;
    const config = appData.chartConfig;
    canvas.width = containerWidth > config.width ? config.width : containerWidth;
    canvas.height = config.height;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    const skills = appData.skills.map(s => s.name);
    const ratings = appData.skills.map(s => s.rating);
    const maxRating = config.maxRating;

    const barWidth = config.barWidth;
    const barSpacing = config.barSpacing;
    const chartHeight = height - 100;
    const chartBottom = height - 50;
    const startX = 50;

    const colors = config.colors;

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

async function initializeApp() {
    await loadData();

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

    window.addEventListener('resize', function() {
        drawSkillsChart();
    });
}

document.addEventListener('DOMContentLoaded', initializeApp);

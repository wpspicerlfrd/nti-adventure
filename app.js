let secondsElapsed = 0;
let timerInterval = null;
let currentActiveDay = null;
let daySecondsSpent = {}; 

function renderMap() {
    const gridContainer = document.getElementById('island-grid-container');
    gridContainer.innerHTML = '';

    Object.keys(ntiDaysData).forEach((key) => {
        const dayData = ntiDaysData[key];
        const card = document.createElement('div');
        card.className = `island-card ${dayData.unlocked ? '' : 'locked'}`;
        
        let statusText = dayData.completed ? '✅ Completed' : (dayData.unlocked ? '🔓 Available' : '🔒 Locked');

        card.innerHTML = `
            <h3>${dayData.title}</h3>
            <p>${dayData.category}</p>
            <span class="status">${statusText}</span>
        `;

        if (dayData.unlocked && !dayData.completed) {
            card.onclick = () => startDay(key);
        }

        gridContainer.appendChild(card);
    });
}

function startTimer() {
    if (!timerInterval) {
        timerInterval = setInterval(() => {
            secondsElapsed++;
            
            let mins = Math.floor(secondsElapsed / 60);
            let secs = secondsElapsed % 60;
            document.getElementById('time').innerText = 
                String(mins).padStart(2, '0') + ':' + String(secs).padStart(2, '0');

            if (currentActiveDay) {
                daySecondsSpent[currentActiveDay] = (daySecondsSpent[currentActiveDay] || 0) + 1;
            }
        }, 1000);
    }
}

function startDay(dayKey) {
    startTimer();
    currentActiveDay = dayKey;
    const dayData = ntiDaysData[dayKey];
    const content = document.getElementById('activity-content');
    
    document.getElementById('quest-map').classList.add('hidden');
    document.getElementById('activity-screen').classList.remove('hidden');

    let readingHtml = '';
    if (dayData.readingText && dayData.readingUrl) {
        readingHtml = `<p><strong>Reading Activity:</strong> Read <a href="${dayData.readingUrl}" target="_blank">${dayData.readingText}</a>.</p>`;
    }

    let buttonsHtml = '';
    dayData.options.forEach((opt) => {
        buttonsHtml += `<button onclick="submitAnswer(${opt.correct})">${opt.text}</button>`;
    });

    content.innerHTML = `
        <h2>${dayData.title}</h2>
        <p><em>Requirement: Spend at least ${dayData.targetMinutes} minutes on learning activities today.</em></p>
        ${readingHtml}
        <div class="quiz-box">
            <p><strong>Mission Challenge:</strong> ${dayData.question}</p>
            ${buttonsHtml}
        </div>
    `;
}

function submitAnswer(isCorrect) {
    if (!isCorrect) {
        alert("Not quite! Check the reading material or clues and try again.");
        return;
    }

    const dayData = ntiDaysData[currentActiveDay];
    const spentSoFar = daySecondsSpent[currentActiveDay] || 0;
    const targetSeconds = dayData.targetMinutes * 60;

    if (spentSoFar < targetSeconds) {
        let remainingMins = Math.ceil((targetSeconds - spentSoFar) / 60);
        alert(`Great job getting the answer right! However, Oldham County NTI guidelines require 60-90 minutes of home learning today. Please spend about ${remainingMins} more minutes reviewing the story or doing extra practice before finishing this mission!`);
        return;
    }

    alert("Fantastic job, Cadet! Mission complete for today!");
    dayData.completed = true;

    const nextDayKey = String(Number(currentActiveDay) + 1);
    if (ntiDaysData[nextDayKey]) {
        ntiDaysData[nextDayKey].unlocked = true;
    }

    renderMap();
    returnToMap();

    const allCompleted = Object.values(ntiDaysData).every(d => d.completed);
    if (allCompleted) {
        clearInterval(timerInterval);
        document.getElementById('cert-time').innerText = Math.floor(secondsElapsed / 60) + " minutes and " + (secondsElapsed % 60) + " seconds";
        document.getElementById('certificate-modal').classList.remove('hidden');
    }
}

function returnToMap() {
    currentActiveDay = null;
    document.getElementById('activity-screen').classList.add('hidden');
    document.getElementById('quest-map').classList.remove('hidden');
}

function takeScreenshotAction() {
    alert("Ready for screenshot! Press the screenshot buttons on your tablet.");
}

window.onload = renderMap;

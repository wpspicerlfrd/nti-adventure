let secondsElapsed = 0;
let timerInterval = null;
let currentActiveDay = null;
let daySecondsSpent = {}; 
let currentMissionIndex = 0;
let dayCompletionTimestamps = {};

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
    currentMissionIndex = 0; 
    renderCurrentMission();
}

function renderCurrentMission() {
    const dayData = ntiDaysData[currentActiveDay];
    const content = document.getElementById('activity-content');
    
    document.getElementById('quest-map').classList.add('hidden');
    document.getElementById('activity-screen').classList.remove('hidden');

    const mission = dayData.missions[currentMissionIndex];

    let readingHtml = '';
    if (currentMissionIndex === 0 && dayData.readingText && dayData.readingUrl) {
        readingHtml = `<p><strong>Reading Activity:</strong> Read <a href="${dayData.readingUrl}" target="_blank">${dayData.readingText}</a>[cite: 1].</p>`;
    }

    let buttonsHtml = '';
    mission.options.forEach((opt) => {
        buttonsHtml += `<button onclick="submitAnswer(${opt.correct})">${opt.text}</button>`;
    });

    content.innerHTML = `
        <h2>${dayData.title} (Step ${currentMissionIndex + 1} of ${dayData.missions.length})</h2>
        <p><em>Requirement: Spend at least ${dayData.targetMinutes} minutes on learning activities today[cite: 2].</em></p>
        ${readingHtml}
        <div class="quiz-box">
            <p><strong>Mission Challenge:</strong> ${mission.question}</p>
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

    if (currentMissionIndex < dayData.missions.length - 1) {
        currentMissionIndex++;
        alert("Correct! Moving on to the next part of today's mission.");
        renderCurrentMission();
        return;
    }

    const spentSoFar = daySecondsSpent[currentActiveDay] || 0;
    const targetSeconds = dayData.targetMinutes * 60;

    if (spentSoFar < targetSeconds) {
        let remainingMins = Math.ceil((targetSeconds - spentSoFar) / 60);
        alert(`Great job finishing all the questions! However, Oldham County NTI guidelines require 60-90 minutes of home learning today[cite: 2]. Please spend about ${remainingMins} more minutes reviewing the story or doing extra practice before completing this mission!`);
        return;
    }

    const completionTimeStr = new Date().toLocaleString();
    dayCompletionTimestamps[currentActiveDay] = completionTimeStr;

    alert(`Fantastic job, Cadet! Mission complete for ${dayData.title} at ${completionTimeStr}!`);
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
        
        let totalMinutes = Math.floor(secondsElapsed / 60);
        let totalSeconds = secondsElapsed % 60;
        document.getElementById('cert-time').innerText = `${totalMinutes} min ${totalSeconds} sec`;

        let stampsHtml = "<strong>Daily Completion Log:</strong><ul>";
        Object.keys(dayCompletionTimestamps).forEach(dKey => {
            stampsHtml += `<li>${ntiDaysData[dKey].title}: <em>${dayCompletionTimestamps[dKey]}</em></li>`;
        });
        stampsHtml += "</ul>";
        document.getElementById('daily-stamps').innerHTML = stampsHtml;

        document.getElementById('certificate-modal').classList.remove('hidden');
    }
}

function returnToMap() {
    currentActiveDay = null;
    document.getElementById('activity-screen').classList.add('hidden');
    document.getElementById('quest-map').classList.remove('hidden');
}

function emailCertificateToDad() {
    let reportText = "NTI Fire Rescue Academy - Completion Report%0D%0A";
    reportText += "Student: Cadet%0D%0A";
    reportText += "Total Time: " + document.getElementById('cert-time').innerText + "%0D%0A%0D%0A";
    reportText += "Daily Completion Timestamps:%0D%0A";
    
    Object.keys(dayCompletionTimestamps).forEach(dKey => {
        reportText += `- ${ntiDaysData[dKey].title}: ${dayCompletionTimestamps[dKey]}%0D%0A`;
    });

    window.location.href = `mailto:?subject=NTI Quest Completion Certificate&body=${reportText}`;
}

function takeScreenshotAction() {
    alert("Ready for screenshot! Press the screenshot buttons on your tablet.");
}

window.onload = renderMap;

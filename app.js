let currentMissionIndex = 0;

function startDay(dayKey) {
    startTimer();
    currentActiveDay = dayKey;
    currentMissionIndex = 0; // Reset mission index
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

    // Check if there are more missions left for today
    if (currentMissionIndex < dayData.missions.length - 1) {
        currentMissionIndex++;
        alert("Correct! Moving on to the next part of today's mission.");
        renderCurrentMission();
        return;
    }

    // If all missions for the day are done, check the time requirement
    const spentSoFar = daySecondsSpent[currentActiveDay] || 0;
    const targetSeconds = dayData.targetMinutes * 60;

    if (spentSoFar < targetSeconds) {
        let remainingMins = Math.ceil((targetSeconds - spentSoFar) / 60);
        alert(`Great job finishing all the questions! However, Oldham County NTI guidelines require 60-90 minutes of home learning today[cite: 2]. Please spend about ${remainingMins} more minutes reviewing the story or doing extra practice before completing this mission!`);
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

let secondsElapsed = 0;
let timerInterval = null;
let currentActiveDay = null;
let daySecondsSpent = {}; 
let currentMissionIndex = 0;
let dayCompletionTimestamps = {};
let answeredInferences = []; // Store student answers for school report

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
        readingHtml = `<p><strong>Reading Activity:</strong> Read <a href="${dayData.readingUrl}" target="_blank">${dayData.readingText}</a>.</p>`;
    }

    let evidenceHtml = mission.evidence ? `<p style="font-size: 0.85rem; color: #f1c40f;"><em>Hint / Evidence Focus: ${mission.evidence}</em></p>` : '';

    let buttonsHtml = '';
    mission.options.forEach((opt) => {
        buttonsHtml += `<button onclick="submitAnswer(${opt.correct}, '${opt.text.replace(/'/g, "\\'")}')">${opt.text}</button>`;
    });

    content.innerHTML = `
        <h2>${dayData.title} (Step ${currentMissionIndex + 1} of ${dayData.missions.length})</h2>
        <p><em>Requirement: Spend at least ${dayData.targetMinutes} minutes on learning activities today.</em></p>
        ${readingHtml}
        <div class="quiz-box">
            <p><strong>Mission Challenge:</strong> ${mission.question}</p>
            ${evidenceHtml}
            ${buttonsHtml}
        </div>
    `;
}

function submitAnswer(isCorrect, selectedText) {
    if (!isCorrect) {
        alert("Not quite! Check the reading material or clues and try again.");
        return;
    }

    const dayData = ntiDaysData[currentActiveDay];
    const mission = dayData.missions[currentMissionIndex];

    // Save inference response if it's part of Day 1's character study
    if (currentActiveDay === '1' && mission.evidence) {
        answeredInferences.push({
            question: mission.question,
            answer: selectedText,
            evidence: mission.evidence
        });
    }

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
        alert(`Great job finishing all the questions! However, Oldham County NTI guidelines require 60-90 minutes of home learning today. Please spend about ${remainingMins} more minutes reviewing the story or doing extra practice before completing this mission!`);
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

        let stampsHtml = "<strong>Daily Completion Log & Timestamps:</strong><ul>";
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

// Generates a formal printable report for school attendance verification
function printSchoolAttendanceReport() {
    let reportWindow = window.open('', '_blank');
    let inferenceListHtml = '';
    
    answeredInferences.forEach((inf, idx) => {
        inferenceListHtml += `
            <div style="margin-bottom: 15px; border-bottom: 1px solid #ddd; padding-bottom: 10px;">
                <p><strong>Inference ${idx + 1}:</strong> ${inf.question}</p>
                <p><strong>Student Answer:</strong> ${inf.answer}</p>
                <p><strong>Supporting Text Evidence:</strong> <em>${inf.evidence}</em></p>
            </div>
        `;
    });

    let htmlContent = `
        <html>
        <head>
            <title>Oldham County NTI Attendance & Assignment Report - EJ Spicer</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 30px; color: #000; line-height: 1.5; }
                h1, h2 { text-align: center; color: #2c3e50; }
                .box { border: 2px solid #333; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
            </style>
        </head>
        <body>
            <h1>Oldham County Schools - NTI Verification Report</h1>
            <h2>Fire & Rescue Academy Learning Module</h2>
            
            <div class="box">
                <h3>Student Information</h3>
                <p><strong>Student Name:</strong> Easen Spicer</p>
                <p><strong>Total Learning Time:</strong> ${document.getElementById('cert-time').innerText}</p>
                <p><strong>Daily Completion Log:</strong></p>
                <ul>
    `;

    Object.keys(dayCompletionTimestamps).forEach(dKey => {
        htmlContent += `<li>${ntiDaysData[dKey].title}: Completed on ${dayCompletionTimestamps[dKey]} (Meets 60-90 min daily requirement)</li>`;
    });

    htmlContent += `
                </ul>
            </div>

            <div class="box">
                <h3>Day 1: Character Inferences & Text Evidence Analysis</h3>
                ${inferenceListHtml}
            </div>

            <p style="text-align: center; margin-top: 40px; font-size: 0.9rem;">
                <em>Verified and submitted for NTI Attendance Compliance.</em>
            </p>
        </body>
        </html>
    `;

    reportWindow.document.write(htmlContent);
    reportWindow.document.close();
    reportWindow.focus();
    setTimeout(() => { reportWindow.print(); }, 500);
}

function downloadCertificateImage() {
    window.print();
}

function returnToMapFromCert() {
    document.getElementById('certificate-modal').classList.add('hidden');
}

window.onload = renderMap;

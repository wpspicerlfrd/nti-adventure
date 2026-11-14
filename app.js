let secondsElapsed = 0;
let timerInterval = null;
let currentActiveDay = null;
let daySecondsSpent = {}; 
let currentMissionIndex = 0;
let dayCompletionTimestamps = {};
let answeredInferences = []; 
let recordedArrays = []; 
let activeDayMissions = []; 

let currentContext = null;
let isDrawing = false;
let brushColor = "#000000";
let brushSize = 5;
let toolMode = "pen"; 

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

function shuffleArray(array) {
    let arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function startDay(dayKey) {
    startTimer();
    currentActiveDay = dayKey;
    currentMissionIndex = 0; 

    const dayData = ntiDaysData[dayKey];

    if (dayData.questionBank && dayData.questionBank.length > 0) {
        let shuffledQuestions = shuffleArray(dayData.questionBank).slice(0, 5);
        
        let processedQuizMissions = shuffledQuestions.map(q => {
            return {
                type: "quiz",
                question: q.question,
                options: shuffleArray(q.options),
                evidence: q.evidence,
                helpHint: q.helpHint
            };
        });

        activeDayMissions = [...processedQuizMissions, ...(dayData.missions || [])];
    } else {
        activeDayMissions = (dayData.missions || []).map(m => {
            if (m.options) {
                return { ...m, options: shuffleArray(m.options) };
            }
            return m;
        });
    }

    renderCurrentMission();
}

function renderCurrentMission() {
    const dayData = ntiDaysData[currentActiveDay];
    const content = document.getElementById('activity-content');
    
    document.getElementById('quest-map').classList.add('hidden');
    document.getElementById('activity-screen').classList.remove('hidden');

    const mission = activeDayMissions[currentMissionIndex];

    let readingHtml = '';
    if (currentMissionIndex === 0 && dayData.readingText && dayData.readingUrl) {
        readingHtml = `<p><strong>Reading Activity:</strong> Read <a href="${dayData.readingUrl}" target="_blank">${dayData.readingText}</a>.</p>`;
    }

    // Navigation bar (Back & Next controls)
    let navControlsHtml = `
        <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
            <button onclick="prevMission()" ${currentMissionIndex === 0 ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : 'style="background: #7f8-c8d; background-color: #7f8c8d; color: white;"'}>
                ⬅️ Previous Step
            </button>
            <span style="align-self: center; font-size: 0.9rem; color: #bdc3c7;">Step ${currentMissionIndex + 1} of ${activeDayMissions.length}</span>
        </div>
    `;

    let hintButtonHtml = mission.helpHint ? `
        <button onclick="showChiefHint()" style="background: #f39c12; color: #fff; margin-bottom: 15px; border-radius: 6px; padding: 8px 12px; font-weight: bold; cursor: pointer;">
            💡 Need Help? (Chief's Hint)
        </button>
        <div id="chief-hint-box" style="display:none; background: #2c3e50; border-left: 5px solid #f39c12; padding: 12px; margin-bottom: 15px; border-radius: 4px; font-size: 0.95rem; color: #ecf0f1;">
            ${mission.helpHint}
        </div>
    ` : '';

    // Handle Array Builder
    if (mission.type === 'array-builder') {
        content.innerHTML = `
            <h2>${dayData.title}</h2>
            ${navControlsHtml}
            <p><em>Requirement: Spend at least ${dayData.targetMinutes} minutes on learning activities today[cite: 2].</em></p>
            <div class="quiz-box">
                ${hintButtonHtml}
                <p><strong>🔢 Multiplication Scavenger Hunt:</strong> ${mission.question}</p>
                <p>Select object type: 
                   <select id="array-object" style="padding: 5px; font-size: 1rem;">
                       <option value="Hoses">Fire Hoses</option>
                       <option value="Helmets">Fire Helmets</option>
                       <option value="Cones">Traffic Cones</option>
                       <option value="Tools">Rescue Tools</option>
                   </select>
                </p>
                <p>Enter Rows: <input type="number" id="array-rows" value="3" min="1" max="12" style="width: 50px; padding: 5px;"> 
                   Columns: <input type="number" id="array-cols" value="4" min="1" max="12" style="width: 50px; padding: 5px;">
                </p>
                <button onclick="previewArray()" style="background: #3498db; margin-top: 10px;">Preview Array</button>
                <div id="array-preview-area" style="margin-top: 15px; font-size: 1.2rem; background: #1a1a2e; padding: 15px; border-radius: 8px;"></div>
                <br>
                <button onclick="submitArrayWork()" style="background: #2ecc71; display:none;" id="submit-array-btn">Save Array & Finish Mission</button>
            </div>
        `;
        return;
    }

    // Handle Science Animal Poster Studio
    if (mission.type === 'poster-studio') {
        content.innerHTML = `
            <h2>${dayData.title}</h2>
            ${navControlsHtml}
            <p><em>Requirement: Spend at least ${dayData.targetMinutes} minutes on learning activities today[cite: 2].</em></p>
            <div class="quiz-box" style="text-align: left;">
                ${hintButtonHtml}
                <p><strong>🎨 Science Animal Research Poster Studio:</strong> ${mission.question}</p>
                
                <div class="drawing-studio-container">
                    <div class="drawing-toolbar">
                        <button id="pen-btn" onclick="setDrawingTool('pen')" class="active-tool" style="background: #3498db; color:white;">✏️ Pen</button>
                        <button id="highlighter-btn" onclick="setDrawingTool('highlighter')" style="background: #f1c40f; color:black;">🖍️ Highlighter</button>
                        <button id="eraser-btn" onclick="setDrawingTool('eraser')" style="background: #e74c3c; color:white;">🧹 Eraser</button>
                        <label style="color: white; font-size: 0.9rem;">Color: <input type="color" id="color-picker" value="#000000" onchange="changeColor(this.value)"></label>
                        <label style="color: white; font-size: 0.9rem;">Size: 
                            <select id="brush-size" onchange="changeSize(this.value)">
                                <option value="3">Fine</option>
                                <option value="6" selected>Medium</option>
                                <option value="12">Thick</option>
                                <option value="24">Marker</option>
                            </select>
                        </label>
                        <button onclick="clearCanvas('poster-canvas')" style="background: #95a5a6; color:white;">🔄 Clear</button>
                    </div>
                    <canvas id="poster-canvas" class="drawing-canvas"></canvas>
                </div>

                <p><strong>Type your 5 Animal Facts Below:</strong></p>
                <textarea id="poster-facts-input" placeholder="Example: 1. Dalmatians were fire dogs..."></textarea>
                <br>
                <button onclick="advanceFromPoster()" style="background: #3498db; margin-top: 15px;">Save Poster & Continue</button>
            </div>
        `;
        initDrawingCanvas('poster-canvas');
        return;
    }

    // Handle Social Studies Community Canvas
    if (mission.type === 'community-canvas') {
        content.innerHTML = `
            <h2>${dayData.title}</h2>
            ${navControlsHtml}
            <p><em>Requirement: Spend at least ${dayData.targetMinutes} minutes on learning activities today[cite: 2].</em></p>
            <div class="quiz-box" style="text-align: left;">
                ${hintButtonHtml}
                <p><strong>🏘️ Social Studies Community Canvas:</strong> ${mission.question}</p>
                
                <p><strong>1. Think (Write your community definition & ideas):</strong></p>
                <textarea id="community-definition-input" placeholder="Example: A community is a group of people and places..."></textarea>
                
                <p style="margin-top: 15px;"><strong>2. Draw (Draw your community, important places, and people):</strong></p>
                <div class="drawing-studio-container">
                    <div class="drawing-toolbar">
                        <button id="comm-pen-btn" onclick="setDrawingTool('pen')" class="active-tool" style="background: #3498db; color:white;">✏️ Pen</button>
                        <button id="comm-highlighter-btn" onclick="setDrawingTool('highlighter')" style="background: #f1c40f; color:black;">🖍️ Highlighter</button>
                        <button id="comm-eraser-btn" onclick="setDrawingTool('eraser')" style="background: #e74c3c; color:white;">🧹 Eraser</button>
                        <label style="color: white; font-size: 0.9rem;">Color: <input type="color" id="comm-color-picker" value="#27ae60" onchange="changeColor(this.value)"></label>
                        <label style="color: white; font-size: 0.9rem;">Size: 
                            <select id="comm-brush-size" onchange="changeSize(this.value)">
                                <option value="3">Fine</option>
                                <option value="6" selected>Medium</option>
                                <option value="12">Thick</option>
                                <option value="24">Marker</option>
                            </select>
                        </label>
                        <button onclick="clearCanvas('community-canvas')" style="background: #95a5a6; color:white;">🔄 Clear</button>
                    </div>
                    <canvas id="community-canvas" class="drawing-canvas"></canvas>
                </div>

                <p style="margin-top: 15px;"><strong>3. Share:</strong> Discuss your drawing with a family member!</p>
                <label><input type="checkbox" id="shared-checkbox"> I have shared and discussed my community drawing with a family member.</label>
                <br>
                <button onclick="finalizeDayCompletion()" style="background: #2ecc71; margin-top: 15px;">Complete Day 1 & Finish!</button>
            </div>
        `;
        initDrawingCanvas('community-canvas');
        return;
    }

    let evidenceHtml = mission.evidence ? `<p style="font-size: 0.85rem; color: #f1c40f;"><em>Hint / Evidence Focus: ${mission.evidence}</em></p>` : '';

    let buttonsHtml = '';
    mission.options.forEach((opt) => {
        buttonsHtml += `<button onclick="submitAnswer(${opt.correct}, '${opt.text.replace(/'/g, "\\'")}')">${opt.text}</button>`;
    });

    content.innerHTML = `
        <h2>${dayData.title}</h2>
        ${navControlsHtml}
        <p><em>Requirement: Spend at least ${dayData.targetMinutes} minutes on learning activities today[cite: 2].</em></p>
        ${readingHtml}
        <div class="quiz-box">
            ${hintButtonHtml}
            <p><strong>Mission Challenge:</strong> ${mission.question}</p>
            ${evidenceHtml}
            ${buttonsHtml}
        </div>
    `;
}

function showChiefHint() {
    const hintBox = document.getElementById('chief-hint-box');
    if (hintBox) {
        hintBox.style.display = hintBox.style.display === 'none' ? 'block' : 'none';
    }
}

function initDrawingCanvas(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.clientWidth - 30;
    canvas.height = 350;
    
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    function getTouchPos(e) {
        const rect = canvas.getBoundingClientRect();
        const clientX = e.clientX || (e.touches && e.touches[0].clientX);
        const clientY = e.clientY || (e.touches && e.touches[0].clientY);
        return {
            x: clientX - rect.left,
            y: clientY - rect.top
        };
    }

    function startDraw(e) {
        e.preventDefault();
        isDrawing = true;
        const pos = getTouchPos(e);
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
    }

    function draw(e) {
        if (!isDrawing) return;
        e.preventDefault();
        const pos = getTouchPos(e);
        
        ctx.lineWidth = brushSize;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        if (toolMode === 'eraser') {
            ctx.strokeStyle = '#ffffff';
            ctx.globalAlpha = 1.0;
        } else if (toolMode === 'highlighter') {
            ctx.strokeStyle = brushColor;
            ctx.globalAlpha = 0.3;
        } else {
            ctx.strokeStyle = brushColor;
            ctx.globalAlpha = 1.0;
        }

        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
    }

    function stopDraw(e) {
        if (!isDrawing) return;
        e.preventDefault();
        isDrawing = false;
        ctx.closePath();
    }

    canvas.onmousedown = startDraw;
    canvas.onmousemove = draw;
    canvas.onmouseup = stopDraw;
    canvas.onmouseleave = stopDraw;

    canvas.ontouchstart = startDraw;
    canvas.ontouchmove = draw;
    canvas.ontouchend = stopDraw;
}

function setDrawingTool(mode) {
    toolMode = mode;
    ['pen-btn', 'comm-pen-btn'].forEach(id => {
        let el = document.getElementById(id);
        if(el) el.classList.toggle('active-tool', mode === 'pen');
    });
    ['highlighter-btn', 'comm-highlighter-btn'].forEach(id => {
        let el = document.getElementById(id);
        if(el) el.classList.toggle('active-tool', mode === 'highlighter');
    });
    ['eraser-btn', 'comm-eraser-btn'].forEach(id => {
        let el = document.getElementById(id);
        if(el) el.classList.toggle('active-tool', mode === 'eraser');
    });
}

function changeColor(color) { brushColor = color; }
function changeSize(size) { brushSize = parseInt(size); }

function clearCanvas(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function previewArray() {
    let objType = document.getElementById('array-object').value;
    let rows = parseInt(document.getElementById('array-rows').value) || 0;
    let cols = parseInt(document.getElementById('array-cols').value) || 0;
    let total = rows * cols;

    let iconMap = { "Hoses": "🛞", "Helmets": "🪖", "Cones": "🔶", "Tools": "🧰" };
    let itemIcon = iconMap[objType] || "⭐";

    let gridHtml = `<p><strong>Array:</strong> ${rows} rows of ${cols} ${objType} (Total = ${total})</p><div style="font-size: 1.5rem; line-height: 1.2;">`;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            gridHtml += itemIcon + " ";
        }
        gridHtml += "<br>";
    }
    gridHtml += `</div><p><strong>Equation:</strong> ${rows} × ${cols} = ${total}</p>`;

    document.getElementById('array-preview-area').innerHTML = gridHtml;
    
    window.tempCurrentArray = {
        object: objType,
        rows: rows,
        cols: cols,
        total: total,
        equation: `${rows} × ${cols} = ${total} (${objType})`
    };

    document.getElementById('submit-array-btn').style.display = 'block';
}

function submitArrayWork() {
    if (window.tempCurrentArray) {
        recordedArrays.push(window.tempCurrentArray);
    }
    alert("Fantastic job building your array, Easen!");
    advanceMission();
}

function submitAnswer(isCorrect, selectedText) {
    if (!isCorrect) {
        alert("Not quite! Check the reading material or clues and try again.");
        return;
    }

    const mission = activeDayMissions[currentMissionIndex];

    if (currentActiveDay === '1' && mission.evidence) {
        answeredInferences.push({
            question: mission.question,
            answer: selectedText,
            evidence: mission.evidence
        });
    }

    alert("Correct! Moving on to the next part of today's mission.");
    advanceMission();
}

function advanceFromPoster() {
    alert("Science poster saved!");
    advanceMission();
}

function advanceMission() {
    if (currentMissionIndex < activeDayMissions.length - 1) {
        currentMissionIndex++;
        renderCurrentMission();
    }
}

// Navigation back function
function prevMission() {
    if (currentMissionIndex > 0) {
        currentMissionIndex--;
        renderCurrentMission();
    }
}

function finalizeDayCompletion() {
    const dayData = ntiDaysData[currentActiveDay];
    const spentSoFar = daySecondsSpent[currentActiveDay] || 0;
    const targetSeconds = dayData.targetMinutes * 60;

    if (spentSoFar < targetSeconds) {
        let remainingMins = Math.ceil((targetSeconds - spentSoFar) / 60);
        alert(`Great job finishing all the tasks! However, Oldham County NTI guidelines require 60-90 minutes of home learning today[cite: 2]. Please spend about ${remainingMins} more minutes reviewing or doing extra practice before completing this mission!`);
        return;
    }

    const completionTimeStr = new Date().toLocaleString();
    dayCompletionTimestamps[currentActiveDay] = completionTimeStr;

    alert(`Fantastic job, Easen! Mission complete for ${dayData.title} at ${completionTimeStr}!`);
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

function printSchoolAttendanceReport() {
    let factsText = document.getElementById('poster-facts-input') ? document.getElementById('poster-facts-input').value : "Completed.";
    let communityText = document.getElementById('community-definition-input') ? document.getElementById('community-definition-input').value : "Completed.";
    let sharedChecked = document.getElementById('shared-checkbox') ? document.getElementById('shared-checkbox').checked : true;

    let reportWindow = window.open('', '_blank');
    let inferenceListHtml = '';
    
    answeredInferences.forEach((inf, idx) => {
        inferenceListHtml += `
            <div style="margin-bottom: 12px; border-bottom: 1px solid #ddd; padding-bottom: 8px;">
                <p><strong>Inference ${idx + 1}:</strong> ${inf.question}</p>
                <p><strong>Student Answer:</strong> ${inf.answer}</p>
                <p><strong>Supporting Text Evidence:</strong> <em>${inf.evidence}</em></p>
            </div>
        `;
    });

    let arrayListHtml = '';
    recordedArrays.forEach((arr, idx) => {
        arrayListHtml += `<p>Array ${idx + 1}: <strong>${arr.equation}</strong> (${arr.rows} rows of ${arr.cols} ${arr.object})</p>`;
    });

    let htmlContent = `
        <html>
        <head>
            <title>Oldham County NTI Attendance & Assignment Report - Easen Spicer</title>
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
        htmlContent += `<li>${ntiDaysData[dKey].title}: Completed on ${dayCompletionTimestamps[dKey]} (Meets 60-90 min daily requirement)[cite: 2]</li>`;
    });

    htmlContent += `
                </ul>
            </div>

            <div class="box">
                <h3>Day 1: Character Inferences & Text Evidence Analysis</h3>
                ${inferenceListHtml}
            </div>

            <div class="box">
                <h3>Day 1: Multiplication Scavenger Hunt Arrays</h3>
                ${arrayListHtml || "<p>Completed via digital array builder.</p>"}
            </div>

            <div class="box">
                <h3>Day 1: Science - Animal Research Poster</h3>
                <p><strong>Student Facts:</strong></p>
                <p style="background: #f9f9f9; padding: 15px; border: 1px solid #eee; border-radius: 4px;">
                    ${factsText.replace(/\n/g, '<br>')}
                </p>
                <button onclick="window.opener.downloadCanvasImage('poster-canvas', 'Easen_Spicer_Animal_Poster.png')" style="background: #3498db; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer;">⬇ Download Animal Poster Drawing (PNG)</button>
            </div>

            <div class="box">
                <h3>Day 1: Social Studies - What is a Community?</h3>
                <p><strong>Student Community Ideas & Definition:</strong></p>
                <p style="background: #f9f9f9; padding: 15px; border: 1px solid #eee; border-radius: 4px;">
                    ${communityText.replace(/\n/g, '<br>')}
                </p>
                <p><strong>Family Discussion Share:</strong> ${sharedChecked ? '✅ Completed and discussed with family member.' : 'Pending'}</p>
                <button onclick="window.opener.downloadCanvasImage('community-canvas', 'Easen_Spicer_Community_Drawing.png')" style="background: #e67e22; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer;">⬇ Download Community Drawing (PNG)</button>
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

function downloadCanvasImage(canvasId, filename) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) { alert("Canvas not found."); return; }
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function returnToMapFromCert() {
    document.getElementById('certificate-modal').classList.remove('hidden');
}

window.onload = renderMap;

const ntiDaysData = {
    1: {
        title: "Day 1: Firehouse Dispatch",
        category: "Advanced Literacy & Character Inferences",
        targetMinutes: 60, // Oldham County NTI minimum home learning time
        unlocked: true,
        readingText: "The courageous fire truck story & community helpers",
        readingUrl: "https://www.gutenberg.org/files/25555/25555-h/25555-h.htm",
        missions: [
            {
                type: "quiz",
                question: "Inference 1 (Character Dedication): When the midnight alarm sounds, why do the fire engines immediately roll out without hesitation?",
                options: [
                    { text: "A) They prioritize community safety above their own comfort and rest.", correct: true },
                    { text: "B) They are hoping to win a morning parade ribbon.", correct: false }
                ],
                evidence: "Supporting Detail: The text highlights their prompt response to emergency calls during dark, freezing conditions to protect citizens."
            },
            {
                type: "quiz",
                question: "Inference 2 (Teamwork & Morale): How do the veteran engines treat newer or struggling vehicles in the station?",
                options: [
                    { text: "A) They offer encouragement, guidance, and share the workload.", correct: true },
                    { text: "B) They ignore them and leave them stranded in the bay.", correct: false }
                ],
                evidence: "Supporting Detail: Experienced crew members guide younger units through maintenance tasks and emergency drills."
            },
            {
                type: "quiz",
                question: "Inference 3 (Overcoming Adversity): What can we infer about a vehicle's character when it gets covered in soot and mud during a tough fire?",
                options: [
                    { text: "A) It demonstrates fearless hard work and total commitment to the job.", correct: true },
                    { text: "B) It means the vehicle made too many driving errors.", correct: false }
                ],
                evidence: "Supporting Detail: Heavy grime and soot indicate direct engagement in aggressive firefighting and rescue operations."
            },
            {
                type: "quiz",
                question: "Inference 4 (Equipment Readiness): Why does the crew spend hours polishing chrome and checking water lines after a shift?",
                options: [
                    { text: "A) They understand that preparedness saves lives when the next emergency strikes.", correct: true },
                    { text: "B) They just want the garage to look neat for visitors.", correct: false }
                ],
                evidence: "Supporting Detail: Regular maintenance checks ensure tools and pumps operate flawlessly under high-pressure conditions."
            },
            {
                type: "quiz",
                question: "Inference 5 (Community Trust): Why do local residents wave and cheer when the engines drive past?",
                options: [
                    { text: "A) They recognize the bravery and reliability of their local protectors.", correct: true },
                    { text: "B) They like the loud sound of the air horns.", correct: false }
                ],
                evidence: "Supporting Detail: Citizens place deep trust in the station to keep their neighborhood safe day and night."
            },
            {
                type: "quiz",
                question: "Part 2 (Multi-Step Math): Engine 4 used 145 gallons of water on a grass fire and 230 gallons on a truck fire. If the tank holds 500 gallons total, how many gallons are left?",
                options: [
                    { text: "A) 125 gallons", correct: true },
                    { text: "B) 375 gallons", correct: false }
                ]
            }
        ]
    },
    2: {
        title: "Day 2: Metropolis Rescue",
        category: "Compound Words & Elapsed Time",
        targetMinutes: 60, // Oldham County NTI minimum home learning time
        unlocked: false,
        missions: [
            {
                type: "quiz",
                question: "Part 1 (Word Structure): Which of these firefighter-related words is a compound word made of two smaller standalone words?",
                options: [
                    { text: "A) Backdraft (back + draft)", correct: true },
                    { text: "B) Helmet", correct: false }
                ]
            },
            {
                type: "quiz",
                question: "Part 2 (Elapsed Time): The fire truck left the station at 9:15 AM and returned at 10:05 AM. How long was the crew out on the call?",
                options: [
                    { text: "A) 50 minutes", correct: true },
                    { text: "B) 1 hour and 10 minutes", correct: false }
                ]
            }
        ]
    },
    3: {
        title: "Day 3: Station Summit",
        category: "Nonfiction Text Features & Fractions",
        targetMinutes: 60, // Oldham County NTI minimum home learning time
        unlocked: false,
        missions: [
            {
                type: "quiz",
                question: "Part 1 (Nonfiction Features): If a firefighter's manual has a section at the back listing difficult words and their meanings alphabetically, what is that section called?",
                options: [
                    { text: "A) A glossary", correct: true },
                    { text: "B) An index", correct: false }
                ]
            },
            {
                type: "quiz",
                question: "Part 2 (Fractions): The station captain cut a firehouse pizza into 8 equal slices. The crew ate 6 slices. What fraction of the pizza is left?",
                options: [
                    { text: "A) 2/8 (or 1/4)", correct: true },
                    { text: "B) 6/8", correct: false }
                ]
            }
        ]
    }
};

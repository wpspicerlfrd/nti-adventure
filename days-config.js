const ntiDaysData = {
    1: {
        title: "Day 1: Firehouse Dispatch",
        category: "Advanced Literacy & Multi-Step Math",
        targetMinutes: 60, // Oldham County NTI minimum home learning time
        unlocked: true,
        readingText: "The courageous fire truck story & community helpers",
        readingUrl: "https://www.gutenberg.org/files/25555/25555-h/25555-h.htm", // Updated public-domain early reader text link
        missions: [
            {
                type: "quiz",
                question: "Part 1 (Context Clues): The text states, 'The alarm clattered loudly, and the crew scrambled toward the bay.' Based on this, what does the word 'scrambled' most likely mean?",
                options: [
                    { text: "A) Moved quickly and in a hurried way", correct: true },
                    { text: "B) Walked slowly and ate breakfast", correct: false }
                ]
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

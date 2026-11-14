const ntiDaysData = {
    1: {
        title: "Day 1: Firehouse Dispatch",
        category: "Literacy & Math Arrays",
        targetMinutes: 60, // Oldham County NTI minimum home learning time
        unlocked: true,
        readingText: "Billy to the Rescue",
        readingUrl: "https://bookspring.org/wp-content/uploads/2021/05/41354-billy-to-the-rescue.pdf",
        missions: [
            {
                type: "quiz",
                question: "Part 1 (Inference): Billy gets covered in soot and mud putting out a tough fire. What can you infer about how the other fire engines treat him afterward?",
                options: [
                    { text: "A) They are proud of his hard work and praise him", correct: true },
                    { text: "B) They send him away to the junkyard", correct: false }
                ]
            },
            {
                type: "quiz",
                question: "Part 2 (Math Arrays): The station has 12 new fire hoses to organize into storage racks. Which multiplication array shows 12 items?",
                options: [
                    { text: "A) 3 rows of 4 hoses (3 x 4 = 12)", correct: true },
                    { text: "B) 5 rows of 2 hoses (5 x 2 = 10)", correct: false }
                ]
            }
        ]
    },
    2: {
        title: "Day 2: Metropolis Rescue",
        category: "Figurative Language & Place Value",
        targetMinutes: 60,
        unlocked: false,
        missions: [
            {
                type: "quiz",
                question: "Part 1 (Figurative Language): Which of these is a simile used to describe a brave firefighter?",
                options: [
                    { text: "A) He is as brave as a lion.", correct: true },
                    { text: "B) The hose was a roaring dragon.", correct: false }
                ]
            },
            {
                type: "quiz",
                question: "Part 2 (Place Value): The fire engine's odometer reads 4,872 miles. What is this number rounded to the nearest 100?",
                options: [
                    { text: "A) 4,900", correct: true },
                    { text: "B) 4,800", correct: false }
                ]
            }
        ]
    },
    3: {
        title: "Day 3: Station Summit",
        category: "Natural Disasters & Community Rules",
        targetMinutes: 60,
        unlocked: false,
        missions: [
            {
                type: "quiz",
                question: "Part 1 (Community Rules): Why do firefighters wear full turnout gear during an alarm?",
                options: [
                    { text: "A) To protect themselves from extreme heat and embers.", correct: true },
                    { text: "B) To look stylish for the town parade.", correct: false }
                ]
            },
            {
                type: "quiz",
                question: "Part 2 (Natural Disasters): Which tool helps protect a tall fire station building from a lightning strike during a thunderstorm?",
                options: [
                    { text: "A) A lightning rod on the roof", correct: true },
                    { text: "B) A wind sock in the yard", correct: false }
                ]
            }
        ]
    }
};

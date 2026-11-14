const ntiDaysData = {
    1: {
        title: "Day 1: Firehouse Dispatch",
        category: "Integrated Research, Math & Community Study",
        targetMinutes: 60, // Oldham County NTI minimum home learning time[cite: 2]
        unlocked: true,
        readingText: "Starfall Firefighter Reader",
        readingUrl: "https://teach.starfall.com/materials/books/grade23/SB0608_Firefighter_web.pdf?77222d06ef2b35a55eb217bdb2540e3d",
        // A large question bank for Day 1! The app will randomly select 5 from here.
        questionBank: [
            {
                question: "Inference 1: When the alarm sounds, the firefighters quickly slide down the pole and gear up. (I Read) + Firefighters must act fast in an emergency to protect people. (I Know) = What can we infer?",
                options: [
                    { text: "They prioritize community safety and act with extreme urgency.", correct: true },
                    { text: "They are just rushing because they want to eat breakfast.", correct: false },
                    { text: "They are trying to win a racing competition against other stations.", correct: false },
                    { text: "They are running away from a loud noise in the kitchen.", correct: false }
                ],
                evidence: "Text Evidence: The alarm sounds and they immediately move to their gear. + Background Knowledge: Emergencies require fast action. = Inference: They are dedicated to protecting people quickly.",
                helpHint: "💡 Chief's Hint: Look at what the firefighters do the *second* the alarm rings. Combine that action with what you know about why emergency crews exist!"
            },
            {
                question: "Inference 2: The crew works together to connect the hoses and operate the truck. (I Read) + Big jobs are easier and safer when people cooperate. (I Know) = What can we infer?",
                options: [
                    { text: "Teamwork is essential for a firefighting crew to succeed safely.", correct: true },
                    { text: "One person could easily do every single job alone without help.", correct: false },
                    { text: "Firefighters prefer working completely by themselves on calls.", correct: false },
                    { text: "Equipment operates itself without any human assistance.", correct: false }
                ],
                evidence: "Text Evidence: Different crew members handle specific tools together. + Background Knowledge: Teamwork prevents mistakes. = Inference: Teamwork is essential.",
                helpHint: "💡 Chief's Hint: Notice how *different* crew members handle different tools. Could one person carry a heavy hose, drive the rig, and pump water all by themselves?"
            },
            {
                question: "Inference 3: Firefighters wear heavy turnout gear, boots, and helmets. (I Read) + Fire and extreme heat can cause severe physical harm. (I Know) = What can we infer?",
                options: [
                    { text: "Their job is physically demanding and requires specialized protection against hazards.", correct: true },
                    { text: "They wear heavy gear just to look stylish for the neighborhood kids.", correct: false },
                    { text: "The gear is actually light and keeps them cool in summer.", correct: false },
                    { text: "They only wear heavy gear when they are sleeping at the station.", correct: false }
                ],
                evidence: "Text Evidence: They wear heavy protective suits. + Background Knowledge: Gear shields the body from high heat. = Inference: The work involves serious physical hazards.",
                helpHint: "💡 Chief's Hint: Think about why firefighters wear thick heavy coats and helmets instead of regular clothes when entering a burning building."
            },
            {
                question: "Inference 4: The firefighters spend time checking equipment and polishing the engine after a shift. (I Read) + Tools must be ready to work when an emergency happens. (I Know) = What can we infer?",
                options: [
                    { text: "Being prepared and maintaining equipment prevents dangerous failures.", correct: true },
                    { text: "They only clean the truck because they are bored and have nothing to do.", correct: false },
                    { text: "Cleaning tools makes the engine drive slower on the road.", correct: false },
                    { text: "Equipment never breaks down even if it is never checked.", correct: false }
                ],
                evidence: "Text Evidence: They inspect and clean tools after calls. + Background Knowledge: Broken tools cost lives. = Inference: Maintenance ensures life-saving readiness.",
                helpHint: "💡 Chief's Hint: Imagine if a rescue tool broke during an emergency call because nobody checked it. Regular maintenance keeps everyone safe!"
            },
            {
                question: "Inference 5: Neighborhood residents smile and wave as the fire truck drives by. (I Read) + People feel grateful toward those who keep them safe. (I Know) = What can we infer?",
                options: [
                    { text: "The community deeply trusts and appreciates the firefighters' service.", correct: true },
                    { text: "The neighbors are just annoyed by the loud motor and flashing lights.", correct: false },
                    { text: "People in town do not know what a fire truck is used for.", correct: false },
                    { text: "Citizens are trying to signal the truck to stop for traffic.", correct: false }
                ],
                evidence: "Text Evidence: Citizens wave and cheer for the crew. + Background Knowledge: People thank their protectors. = Inference: The community has deep trust and gratitude.",
                helpHint: "💡 Chief's Hint: When people smile and wave instead of running away, how do they feel about the firefighters protecting their homes?"
            },
            {
                question: "Equipment Check: Why do fire trucks carry water tanks and specialized hoses to an emergency scene?",
                options: [
                    { text: "To suppress and extinguish fires quickly before they spread further.", correct: true },
                    { text: "To use as a mobile swimming pool for neighborhood children.", correct: false },
                    { text: "To water the grass gardens beside the roadway.", correct: false },
                    { text: "To wash muddy cars parked along the street.", correct: false }
                ],
                evidence: "Text Evidence: Hoses and water systems are deployed immediately upon arrival.",
                helpHint: "💡 Chief's Hint: What is the main tool firefighters use to put out flames?"
            },
            {
                question: "Station Life: What can we infer about a firefighter's daily routine between emergency dispatch calls?",
                options: [
                    { text: "They train, inspect gear, study safety procedures, and maintain station readiness.", correct: true },
                    { text: "They sleep all day and ignore the fire trucks completely.", correct: false },
                    { text: "They spend all their time playing video games and eating snacks.", correct: false },
                    { text: "They leave the station empty until an alarm rings.", correct: false }
                ],
                evidence: "Text Evidence: Continuous training and equipment checks fill their daily schedule.",
                helpHint: "💡 Chief's Hint: Emergency stations require constant practice and preparation."
            }
        ],
        // Non-quiz missions (Math Array Builder, Science Poster, Social Studies Canvas) remain at the end
        missions: [
            {
                type: "array-builder",
                question: "Multiplication Scavenger Hunt: Gather twelve (12) items (or choose station items) and create arrays to total 12. Record your rows, columns, and multiplication equations!",
                helpHint: "💡 Chief's Math Tip: Think of an array like rows of chairs or tools on a shelf! Rows go across (↔️) and columns go down (↕️). Try 3 rows of 4 (3 × 4 = 12) or 4 rows of 3 (4 × 3 = 12)!"
            },
            {
                type: "poster-studio",
                question: "Science Poster: Design your Animal Research Poster! Draw your animal and its habitat, then type out 5 facts about it.",
                helpHint: "💡 Chief's Poster Tip: Use the pen tool to draw your animal's home (like a firehouse kennel or outdoor field), use the highlighter for grass or sky, and list 5 cool facts below!"
            },
            {
                type: "community-canvas",
                question: "Social Studies - What is a Community?: Define your community, draw important community places and people (like your neighborhood and fire station), and share it with a family member!",
                helpHint: "💡 Chief's Community Tip: A community is a group of people and places that rely on each other. Draw your neighborhood houses, roads, and your local fire station!"
            }
        ]
    },
    2: {
        title: "Day 2: Metropolis Rescue",
        category: "Compound Words & Elapsed Time",
        targetMinutes: 60, // Oldham County NTI minimum home learning time[cite: 2]
        unlocked: false,
        missions: [
            {
                type: "quiz",
                question: "Part 1 (Word Structure): Which of these firefighter-related words is a compound word made of two smaller standalone words?",
                options: [
                    { text: "Backdraft (back + draft)", correct: true },
                    { text: "Helmet", correct: false },
                    { text: "Sirens", correct: false },
                    { text: "Boots", correct: false }
                ],
                helpHint: "💡 Chief's Hint: A compound word is two whole words put together to make a new word (like fire + house = firehouse)."
            },
            {
                type: "quiz",
                question: "Part 2 (Elapsed Time): The fire truck left the station at 9:15 AM and returned at 10:05 AM. How long was the crew out on the call?",
                options: [
                    { text: "50 minutes", correct: true },
                    { text: "1 hour and 10 minutes", correct: false },
                    { text: "30 minutes", correct: false },
                    { text: "2 hours", correct: false }
                ],
                helpHint: "💡 Chief's Hint: Count from 9:15 AM to 10:00 AM (45 minutes), then add the extra 5 minutes past 10:00!"
            }
        ]
    },
    3: {
        title: "Day 3: Station Summit",
        category: "Nonfiction Text Features & Fractions",
        targetMinutes: 60, // Oldham County NTI minimum home learning time[cite: 2]
        unlocked: false,
        missions: [
            {
                type: "quiz",
                question: "Part 1 (Nonfiction Features): If a firefighter's manual has a section at the back listing difficult words and their meanings alphabetically, what is that section called?",
                options: [
                    { text: "A glossary", correct: true },
                    { text: "An index", correct: false },
                    { text: "A table of contents", correct: false },
                    { text: "A title page", correct: false }
                ],
                helpHint: "💡 Chief's Hint: Think of the mini-dictionary at the back of a textbook where words are listed in ABC order."
            },
            {
                type: "quiz",
                question: "Part 2 (Fractions): The station captain cut a firehouse pizza into 8 equal slices. The crew ate 6 slices. What fraction of the pizza is left?",
                options: [
                    { text: "2/8 (or 1/4)", correct: true },
                    { text: "6/8", correct: false },
                    { text: "8/8", correct: false },
                    { text: "1/2", correct: false }
                ],
                helpHint: "💡 Chief's Hint: If there were 8 slices total and they ate 6, subtract 6 from 8 to see how many slices remain on top!"
            }
        ]
    }
};

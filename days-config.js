const ntiDaysData = {
    1: {
        title: "Day 1: Firehouse Dispatch",
        category: "Integrated Research, Math & Community Study",
        targetMinutes: 60, // Oldham County NTI minimum home learning time[cite: 2]
        unlocked: true,
        readingText: "Starfall Firefighter Reader",
        readingUrl: "https://teach.starfall.com/materials/books/grade23/SB0608_Firefighter_web.pdf?77222d06ef2b35a55eb217bdb2540e3d",
        missions: [
            {
                type: "quiz",
                question: "Inference 1: When the alarm sounds, the firefighters quickly slide down the pole and gear up. (I Read) + Firefighters must act fast in an emergency to protect people. (I Know) = What can we infer?",
                options: [
                    { text: "A) They prioritize community safety and act with extreme urgency.", correct: true },
                    { text: "B) They are just rushing because they want to eat breakfast.", correct: false }
                ],
                evidence: "Text Evidence: The alarm sounds and they immediately move to their gear. + Background Knowledge: Emergencies require fast action. = Inference: They are dedicated to protecting people quickly."
            },
            {
                type: "quiz",
                question: "Inference 2: The crew works together to connect the hoses and operate the truck. (I Read) + Big jobs are easier and safer when people cooperate. (I Know) = What can we infer?",
                options: [
                    { text: "A) Teamwork is essential for a firefighting crew to succeed safely.", correct: true },
                    { text: "B) One person could easily do every single job alone.", correct: false }
                ],
                evidence: "Text Evidence: Different crew members handle specific tools together. + Background Knowledge: Teamwork prevents mistakes. = Inference: Teamwork is essential."
            },
            {
                type: "quiz",
                question: "Inference 3: Firefighters wear heavy turnout gear, boots, and helmets. (I Read) + Fire and extreme heat can cause severe physical harm. (I Know) = What can we infer?",
                options: [
                    { text: "A) Their job is physically demanding and requires specialized protection against hazards.", correct: true },
                    { text: "B) They wear heavy gear just to look stylish for the neighborhood.", correct: false }
                ],
                evidence: "Text Evidence: They wear heavy protective suits. + Background Knowledge: Gear shields the body from high heat. = Inference: The work involves serious physical hazards."
            },
            {
                type: "quiz",
                question: "Inference 4: The firefighters spend time checking equipment and polishing the engine after a shift. (I Read) + Tools must be ready to work when an emergency happens. (I Know) = What can we infer?",
                options: [
                    { text: "A) Being prepared and maintaining equipment prevents dangerous failures.", correct: true },
                    { text: "B) They only clean the truck because they are bored.", correct: false }
                ],
                evidence: "Text Evidence: They inspect and clean tools after calls. + Background Knowledge: Broken tools cost lives. = Inference: Maintenance ensures life-saving readiness."
            },
            {
                type: "quiz",
                question: "Inference 5: Neighborhood residents smile and wave as the fire truck drives by. (I Read) + People feel grateful toward those who keep them safe. (I Know) = What can we infer?",
                options: [
                    { text: "A) The community deeply trusts and appreciates the firefighters' service.", correct: true },
                    { text: "B) The neighbors are just annoyed by the loud motor.", correct: false }
                ],
                evidence: "Text Evidence: Citizens wave and cheer for the crew. + Background Knowledge: People thank their protectors. = Inference: The community has deep trust and gratitude."
            },
            {
                type: "array-builder",
                question: "Math Scavenger Hunt: Gather twelve (12) items (or choose station items) and create arrays to total 12. Record your rows, columns, and multiplication equations!"
            },
            {
                type: "quiz",
                question: "Science (Animal Research): If you research a fire station search-and-rescue K9 dog, which set of 5 facts correctly describes its habitat and traits?",
                options: [
                    { text: "A) Lives at the firehouse/homes, has an incredible sense of smell, eats high-protein dog food, helps track lost hikers, and wears a safety vest.", correct: true },
                    { text: "B) Lives underwater in coral reefs, swims with fins, eats microscopic algae, sleeps in shells, and changes color.", correct: false }
                ],
                evidence: "Science Focus: Animal habitat, traits, characteristics, and environmental interaction."
            },
            {
                type: "poster-studio",
                question: "Science Poster: Design your Animal Research Poster! Draw your animal and its habitat, then type out 5 facts about it."
            },
            {
                type: "community-canvas",
                question: "Social Studies - What is a Community?: Define your community, draw important community places and people (like your neighborhood and fire station), and share it with a family member!"
            }
        ]
    },
    2: {
        title: "Day 2: Metropolis Rescue",
        category: "Compound Words & Elapsed Time",
        targetMinutes: 60, 
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
        targetMinutes: 60, 
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

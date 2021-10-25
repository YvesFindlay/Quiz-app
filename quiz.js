const btns = document.querySelectorAll("button");
const categories = document.querySelectorAll(".category-item");
const container = document.querySelector(".container");
const categoryContainer = document.querySelector(".category-container");
const difficultyContainer = document.querySelector(".difficulty-container");
const difficultyOptions = document.querySelectorAll(".difficulty-item");
const listEls = document.querySelectorAll(".bar ul li");
const modal = document.querySelector(".modal");
const modalCategory = document.querySelector(".mod-cat");
const modalDifficulty = document.querySelector(".mod-dif");
const modalClose = document.querySelector(".modal-close");
const navClose = document.querySelector(".nav-close");
const quizCategory = document.querySelector(".quiz-cat");
const quizDifficulty = document.querySelector(".quiz-dif");
const infoBarContainer = document.querySelector(".info-bar__container");
const quizContainer = document.querySelector(".quiz-container");
const questionText = document.querySelector(".question-title p");
const answerOptions = document.querySelectorAll(".answer table tbody tr td");
const timerText = document.querySelector(".nav-container ul li:nth-child(2)");
const exit = document.querySelector(".exit");
const exitModal = document.querySelector(".exit-modal");
const exitModalCloseBtn = document.querySelector(
  ".exit-modal .modal-content .modal-close"
);
const exitConfirm = document.querySelector(".exit-confirm");
const loaderContainer = document.querySelector(".loader-container");
let category,
  ID = 0,
  newElement,
  playerScore,
  questions,
  difficulty,
  duration,
  x,
  y,
  minWidth,
  percent,
  isTimedOut = false,
  newGame = false;

class Question {
  constructor(question, options, correctAnswer) {
    this.question = question;
    this.options = options;
    this.correctAnswer = correctAnswer;
    this.isUsed = false;
  }
}

const dataSet = {
  data_sports: [
    {
      question:
        "What was the fight between George Foreman and Muhammad Ali titled?",
      options: [
        "Rumble in the Jungle",
        "Thrilla in Manila",
        "Miracle at Medinah",
        "Battle for the Bronx",
      ],
      correctAnswer: "Rumble in the Jungle",
    },
    {
      question:
        "With which team did Jenson Button win the Formula One World Championship?",
      options: ["Mercedes", "Brawn", "McLaren", "Williams"],
      correctAnswer: "Brawn",
    },
    {
      question: "Who broke Michael Johnson’s 200m World Record?",
      options: [
        "Maurice Greene",
        "Yohan Blake",
        "Donovan Bailey",
        "Usain Bolt",
      ],
      correctAnswer: "Usain Bolt",
    },
    {
      question:
        "How many Premier League games did Ryan Giggs play for Manchester United?",
      options: ["432", "532", "632", "732"],
      correctAnswer: "632",
    },
    {
      question: "Which of the following sports is Tiger Woods associated?",
      options: ["Golf", "Swimming", "Rugby", "Snooker"],
      correctAnswer: "Golf",
    },
    {
      question:
        "Which of the following players won the Ballon d'Or award in 2019?",
      options: [
        "Lionel Messi",
        "Cristiano Ronaldo",
        "Virgil van Dijk",
        "Mohamed Salah",
      ],
      correctAnswer: "Lionel Messi",
    },
    {
      question: "In which country was Bradley Wiggins born?",
      options: ["Belgium", "Australia", "Germany", "USA"],
      correctAnswer: "Belgium",
    },
    {
      question: "How many Test wickets did Phil Tufnell take for England?",
      options: ["61", "81", "101", "121"],
      correctAnswer: "121",
    },
    {
      question: "Where did Seve Ballesteros captain Europe at the Ryder Cup?",
      options: ["The Belfry", "Valhalla", "Kiawah Island", "Valderrama"],
      correctAnswer: "Valderrama",
    },
    {
      question:
        "What player was the first to win five straight Wimbledon tennis titles?",
      options: ["Arthur Ashe", "Andre Agassi", "Roger Federer", "Bjorn Borg"],
      correctAnswer: "Bjorn Borg",
    },
    {
      question:
        "Which of the following is the most successful team in European Cup history?",
      options: ["Barcelona", "Real Madrid", "Liverpool", "AC Milan"],
      correctAnswer: "Real Madrid",
    },
    {
      question:
        "Which US body-builder was five times winner of the Mr Universe competition and later become one of Hollywood's highest-paid film stars?",
      options: [
        "Steve Sinyon",
        "Arnold Schwarzenegger",
        "Gary Lister",
        "Charles Atlas",
      ],
      correctAnswer: "Arnold Schwarzenegger",
    },
    {
      question: "What was the first recorded Olympics Held?",
      options: ["825 BC", "776 BC", "320 BC", "80 AD"],
      correctAnswer: "776 BC",
    },
    {
      question: "The term 'Beamer' is associated with",
      options: ["Football", "Hockey", "Cricket", "Chess"],
      correctAnswer: "Cricket",
    },
    {
      question: "Which of the following terms are used in Tennis",
      options: ["LBW", "Deuce", "Goal", "Brace"],
      correctAnswer: "Deuce",
    },
    {
      question: "Of which country is bull-fighting the national game?",
      options: ["Spain", "Portugal", "Mexico", "Poland"],
      correctAnswer: "Spain",
    },
    {
      question: "Which of the following terms is not associated with football?",
      options: ["Penalty Kick", "Free Kick", "Penalty Stroke", "Offside"],
      correctAnswer: "Penalty Stroke",
    },
    {
      question: "The term 'Free throw' is associated with :",
      options: ["Volleyball", "Football", "Basket Ball", "Cricket"],
      correctAnswer: "Basket Ball",
    },
    {
      question:
        "With which one of the following sports is Fernando Alonso associated?",
      options: ["Billiards", "Tennis", "Formula 1", "Football"],
      correctAnswer: "Formula 1",
    },
    {
      question:
        "Which of the following International Tennis Tournaments is held on a grass court?",
      options: ["US Open", "Wimbledon", "French Open", "Australian Open"],
      correctAnswer: "Wimbledon",
    },
    {
      question: "Serena Williams is one of the top ranked sportswomen of?",
      options: ["Badminton", "Tennis", "Atletics", "Basket Ball"],
      correctAnswer: "Tennis",
    },
    {
      question:
        "The 2020 UEFA European Football Championship was supposed to be held in: ",
      options: ["Russia", "Italy", "France", "Netherlands"],
      correctAnswer: "Italy",
    },
    {
      question: "Who holds the record for the most Grand Prix victories?",
      options: [
        "Michael Schumacher",
        "Lewis Hamilton",
        "Sebastian Vettel",
        "Ayrton Senna",
      ],
      correctAnswer: "Michael Schumacher",
    },
    {
      question: "What is the home stadium of FC Barcelona called?",
      options: [
        "Santiago Bernabéu",
        "Wanda Metropolitano",
        "Benito Villamarín",
        "Camp Nou",
      ],
      correctAnswer: "Camp Nou",
    },
    {
      question:
        "Which of the following Olympians broke the record for most gold medals at a single olyimpic event?",
      options: [
        "Usain Bolt",
        "Marit Bjørgen",
        "Larisa Latynina",
        "Micheal Phelps",
      ],
      correctAnswer: "Micheal Phelps",
    },
    {
      question:
        "Which of the following Heavyweight Boxers held the most titles in 2020?",
      options: [
        "Deontay Wilder",
        "Tyson Fury",
        "Anthony Joshua",
        "Wladimir Klitschko",
      ],
      correctAnswer: "Anthony Joshua",
    },
    {
      question: "Which color belt comes after white in karate?",
      options: ["Yellow", "Red", "White belt (red stripe)", "Green"],
      correctAnswer: "Yellow",
    },
    {
      question:
        "Which Basketball player received NBA awards for the most valuable player in 1985, 1991, 1992, 1996 and 1998?",
      options: [
        "Wilt Chamberlain",
        "Kareem Abdul-Jabbar",
        "Michael Jordan",
        "Bill Russell",
      ],
      correctAnswer: "Michael Jordan",
    },
    {
      question: "Which British city is home to Everton Football Club?",
      options: ["Birmingham", "Leicester", "Liverpool", "Sheffield"],
      correctAnswer: "Liverpool",
    },
    {
      question: "In which sport is the Davis cup awarded?",
      options: ["Golf", "Tennis", "Rugby", "Hockey"],
      correctAnswer: "Tennis",
    },
  ],

  data_landmarks: [
    {
      question:
        "The Eiffel Tower is a famous landmark you’ll find in which city?",
      options: ["Nice", "Lisbon", "Paris", "Madrid"],
      correctAnswer: "Paris",
    },
    {
      question: "This huge rock known as Uluru is found in which country?",
      options: ["Italy", "Australia", "Madagascar", "Brazil"],
      correctAnswer: "Australia",
    },
    {
      question: "In which country will you find 'The Great Wall of China?'",
      options: ["China", "China", "China", "China"],
      correctAnswer: "China",
    },
    {
      question:
        "Where will you find the beautiful landmark 'Gardens by the Bay?'",
      options: ["Singapore", "Switzerland", "Japan", "New Zealand"],
      correctAnswer: "Singapore",
    },
    {
      question:
        "These ancient rocks have been a mystery for centuries. They are located in England. What are they called?",
      options: [
        "Old Harry Rocks",
        "Stonehenge",
        "Balancing Rock",
        "The Pillar Rocks",
      ],
      correctAnswer: "Stonehenge",
    },
    {
      question:
        "'Christ the Redeemer' is a statue which looks over which city?",
      options: ["Rio de Janeiro", "Santiago", "Buenos Aires", "Salvador"],
      correctAnswer: "Rio de Janeiro",
    },
    {
      question: "In which country will you find Peyto Lake?",
      options: ["Croatia", "USA", "Canada", "South Africa"],
      correctAnswer: "Canada",
    },
    {
      question:
        "What is the official name of this tower which you’ll find in Seattle?",
      options: [
        "Oriental Pearl Tower",
        "Milad Tower",
        "CN Tower",
        "Space Needle",
      ],
      correctAnswer: "Space Needle",
    },
    {
      question:
        "Currently, the tallest building in the world the Burj Khalifa reaches heights of 830m – Which city is it in?",
      options: ["Moscow", "Dubai", "Muscat", "Doha"],
      correctAnswer: "Dubai",
    },
    {
      question: "In which city can the 'Golden State Bridge' be located?",
      options: ["New York", "San Francisco", "Orlando", "Philadelphia"],
      correctAnswer: "San Francisco",
    },
    {
      question: "What is the tallest mountain on earth?",
      options: ["Kangchenjunga", "Mount Everest", "K2", "Makalu"],
      correctAnswer: "Mount Everest",
    },
    {
      question:
        "Once part of an ancient empire, Machu Picchu is a popular landmark you’ll find in which country?",
      options: ["Bolivia", "Ecuador", "Burma", "Peru"],
      correctAnswer: "Peru",
    },
    {
      question:
        "Zuma Rock is a natural landmark just outside Abuja, but what country is it in?",
      options: ["Ghana", "South Africa", "Congo", "Nigeria"],
      correctAnswer: "Nigeria",
    },
    {
      question: "Where in Egypt will you find these famous pyramids?",
      options: ["Alexandria", "Aswan", "Giza", "Luxor"],
      correctAnswer: "Giza",
    },
    {
      question:
        "This is India’s most famous landmark and one of the New 7 Wonders of the World. What is it called?",
      options: ["Safdarjung Tomb", "Pantheon", "Qutub Minar", "The Taj Mahal"],
      correctAnswer: "The Taj Mahal",
    },
    {
      question: "In which city will you find 'Mont Saint-Michel?'",
      options: ["Marseille", "Bordeaux", "Nice", "Normandy"],
      correctAnswer: "Normandy",
    },
    {
      question:
        "This waterfall is part of a group of waterfalls that border Canada and the USA. What are these waterfalls called?",
      options: [
        "Niagara Falls",
        "Victoria Falls",
        "Iguazu Falls",
        "Gullfoss Falls",
      ],
      correctAnswer: "Niagara Falls",
    },
    {
      question: "Where is St. Basil's Cathedral located?",
      options: ["Moscow", "Ireland", "Germany", "Turkey"],
      correctAnswer: "Moscow",
    },
    {
      question:
        "What is the name of this famous landmark that you’ll find in Northern Ireland?",
      options: [
        "Big Sur",
        "Cliffs of Moher",
        "Twelve Apostles",
        "Giant's Causeway",
      ],
      correctAnswer: "Giant's Causeway",
    },
    {
      question:
        "Lake Wanaka is a natural landmark famous for the tree that sticks out from the water. Which country will you find it in?",
      options: ["Italy", "Georgia", "New Zealand", "Malaysia"],
      correctAnswer: "New Zealand",
    },
    {
      question:
        "Angkor Wat is an ancient temple located in Asia – Which country will you find it in?",
      options: ["Cambodia", "Thailand", "Indonesia", "Vietnam"],
      correctAnswer: "Cambodia",
    },
    {
      question: "Queen Elizabeth's main residence is in what which city?",
      options: ["London", "Manchester", "Brighton", "Liverpool"],
      correctAnswer: "London",
    },
    {
      question:
        "What is the name of the rectangular park in New York that is a famous landmark?",
      options: [
        "Central Park",
        "Times Square",
        "Madison Square Garden",
        "The High Line",
      ],
      correctAnswer: "Central Park",
    },
    {
      question: "What is the name of the longest river in the world?",
      options: [
        "Mississippi River",
        "River Thames",
        "River Nile",
        "Amazon River",
      ],
      correctAnswer: "River Nile",
    },
    {
      question:
        "What is the name of the tallest building (as of 2020) in London?",
      options: [
        "One Canada Square",
        "The Shard",
        "22 Bishopsgate",
        "Heron Tower",
      ],
      correctAnswer: "The Shard",
    },
    {
      question: "Mecca can be found in which country?",
      options: ["Egypt", "Morocco", "Greece", "Saudi Arabia"],
      correctAnswer: "Saudi Arabia",
    },
    {
      question:
        "The Great Barrier Reef is a natural landmark in which country?",
      options: ["Papua New Guinea", "New Zealand", "Switzerland", "Australia"],
      correctAnswer: "Australia",
    },
    {
      question:
        "The Empire State Building in New York was completed in which year?",
      options: ["1905", "1931", "1953", "1942"],
      correctAnswer: "1931",
    },
    {
      question:
        "In which year did the Leaning Tower of Piza finally stop sinking?",
      options: ["1990", "2001", "2008", "1999"],
      correctAnswer: "2008",
    },
    {
      question:
        "Which city is known for the beautiful parliament building located on Danube River?",
      options: ["Sofia", "Budapest", "Vienna", "Diosd"],
      correctAnswer: "Budapest",
    },
  ],

  data_films: [
    {
      question: "The code in The Matrix comes from what food recipes?",
      options: ["Sushi", "Dumplings", "Stir-fry", "Pad thai"],
      correctAnswer: "Sushi",
    },
    {
      question:
        "What is the name of the fictional land where Frozen takes place?",
      options: ["Arendelle", "Naples", "Florin", "Grimm"],
      correctAnswer: "Arendelle",
    },
    {
      question: "Who directed the hit 2017 movie Get Out?",
      options: ["James Wan", "Jordan Peele", "Eddie Murphy", "Tim Story"],
      correctAnswer: "Jordan Peele",
    },
    {
      question: "What was the top-grossing movie of 2014?",
      options: [
        "Hunger Games",
        "The Lego Movie",
        "Big Game",
        "Guardians of the Galaxy",
      ],
      correctAnswer: "Guardians of the Galaxy",
    },
    {
      question: "What item is in every Fight Club scene?",
      options: [
        "Coca-Cola Can",
        "Starbucks Cup",
        "A Dunkin’ Donut",
        "Pepsi Bottle",
      ],
      correctAnswer: "Starbucks cup",
    },
    {
      question:
        "If you watch the Marvel movies in chronological order, which movie would you watch first?",
      options: [
        "Iron Man",
        "Captain America: 1st Avenger",
        "Doctor Strange",
        "Captain Marvel",
      ],
      correctAnswer: "Captain America: 1st Avenger",
    },
    {
      question: "Which movie is this quote from: 'Here's looking at you, kid.",
      options: [
        "Breakfast at Tiffany’s",
        "Citizen Kane",
        "Casablanca",
        "Notorious",
      ],
      correctAnswer: "Casablanca",
    },
    {
      question:
        "Some of the velociraptor noises in Jurassic Park are actually which animals mating?",
      options: ["Tortoises", "Frogs", "Lizards", "Crocodiles"],
      correctAnswer: "Tortoises",
    },
    {
      question: "Which actor hasn’t played the Joker?",
      options: ["Jack Nicholson", "Sean Penn", "Jared Leto", "Mark Hamil"],
      correctAnswer: "Sean Penn",
    },
    {
      question: "Which country was the 2017 movie Call Me By Your Name filmed?",
      options: ["France", "Italy", "Greece", "Morocco"],
      correctAnswer: "Italy",
    },
    {
      question:
        "Which singer starred alongside Steve Martin in 2006’s remake of The Pink Panther?",
      options: ["Beyoncé", "Britney Spears", "Rihanna", "Mariah Carey"],
      correctAnswer: "Beyoncé",
    },
    {
      question: "How many Oscars has Halle Berry won?",
      options: ["2", "1", "0", "4"],
      correctAnswer: "1",
    },
    {
      question: "Which movie is this quote from: 'What’s in the box?' ",
      options: ["Speed", "Reservoir Dogs", "The Boondock Saints", "Se7en"],
      correctAnswer: "Se7en",
    },
    {
      question: "In Mean Girls, Cady moves to Illinois from which continent?",
      options: ["Australia", "Europe", "Africa", "Asia"],
      correctAnswer: "Africa",
    },
    {
      question: "Which movie does not feature Emma Stone?",
      options: ["Superbad", "Easy A", "The Help", "No Strings Attached"],
      correctAnswer: "No Strings Attached",
    },
    {
      question: "What object was Toy Story’s Woody originally?",
      options: ["Ventriloquist Dummy", "Puppet", "Clown Doll", "Nesting Doll"],
      correctAnswer: "Ventriloquist Dummy",
    },
    {
      question: "Who directed Silence of the Lambs?",
      options: [
        "Wes Anderson",
        "Jonathan Demme",
        "Oliver Stone",
        "David Lynch",
      ],
      correctAnswer: "Jonathan Demme",
    },
    {
      question:
        "Which professional athlete was considered for the lead in The Terminator?",
      options: ["Dan Marino", "Mike Tyson", "O.J. Simpson", "Wayne Gretzky"],
      correctAnswer: "O.J. Simpson",
    },

    {
      question:
        "How old was the voice actress of Monster Inc.’s Boo at the time of production?",
      options: ["Four", "Two and a half", "Six", "Ten"],
      correctAnswer: "Two and a half",
    },
    {
      question:
        "A Harry Potter stunt double was paralyzed on the job. Which actor did the stunt double do stunts for?",
      options: [
        "Rupert Grint",
        "Emma Watson",
        "Alan Rickman",
        "Daniel Radcliffe",
      ],
      correctAnswer: "Daniel Radcliffe",
    },
    {
      question: "Which movie was Spike Lee’s first feature film?",
      options: [
        "She’s Gotta Have It",
        "Do The Right Thing",
        "School Daze",
        "Malcolm X",
      ],
      correctAnswer: "She’s Gotta Have It",
    },
    {
      question:
        "Dracula was filmed in English during the day, and in what other language at night?",
      options: ["German", "Swedish", "French", "Spanish"],
      correctAnswer: "Spanish",
    },
    {
      question: "Which actor plays Private Ryan in Saving Private Ryan?",
      options: ["Tom Hanks", "Vin Disel", "Matt Damon", "Tom Cruise"],
      correctAnswer: "Matt Damon",
    },
    {
      question: "Who is the youngest person to win an Oscar?",
      options: [
        "Jennifer Lawrence",
        "Mickey Rooney",
        "Tatum O’Neal",
        "Cameron Diaz",
      ],
      correctAnswer: "Tatum O’Neal",
    },
    {
      question: "What is the highest-grossing movie of all time?",
      options: [
        "Titanic",
        "Avatar",
        "Avengers: Endgame",
        "Star Wars: Force Awakens",
      ],
      correctAnswer: "Avatar",
    },
    {
      question: "Who was originally cast to voice Shrek?",
      options: ["Bill Murray", "Chris Farley", "David Spade", "Chris Rock"],
      correctAnswer: "Chris Farley",
    },
    {
      question: "Which actor isn’t in Anchorman?",
      options: ["Paul Rudd", "Seth Rogen", "David Koechner", "Adam Scott"],
      correctAnswer: "Adam Scott",
    },
    {
      question: "What year was the first Die Hard movie released?",
      options: ["1986", "1990", "1991", "1988"],
      correctAnswer: "1988",
    },
    {
      question: "When was the first Mission: Impossible movie released?",
      options: ["1993", "1990", "1996", "1998"],
      correctAnswer: "1996",
    },
    {
      question:
        "What movie is this famous quote from: “You can’t handle the truth!”",
      options: [
        "Training Day",
        "Saving Private Ryan",
        "A Few Good Men",
        "Armageddon",
      ],
      correctAnswer: "A Few Good Men",
    },
  ],

  data_wildlife: [
    {
      question:
        "Which animals can remember companions they haven't seen in decades just by hearing them?",
      options: ["Bears", "Tigers", "Octopuses", "Dolphins"],
      correctAnswer: "Dolphins",
    },
    {
      question: "Which animals stick with the same partner for life?",
      options: ["Geese", "Deer", "Rats", "Monkeys"],
      correctAnswer: "Geese",
    },
    {
      question: "Which animal mothers 'sing' to their newborns?",
      options: ["Cuckoos", "Pigs", "Rabbits", "Wolves"],
      correctAnswer: "Pigs",
    },
    {
      question:
        "Which animals bury their food according to the position of the stars?",
      options: ["Pandas", "Squirrels", "Rabbits", "Elephants"],
      correctAnswer: "Squirrels",
    },
    {
      question: "What is a bald eagle's nest called?",
      options: ["A Drey", "An Eagloo", "An Eyrie", "A Vespiary"],
      correctAnswer: "An Eyrie",
    },
    {
      question: "Tasmanian devils mostly eat:",
      options: ["Fruit", "Bark", "Dead Animals", "Fridgets"],
      correctAnswer: "Dead Animals",
    },
    {
      question: "Sloths often sleep while:",
      options: ["Standing", "Pooping", "Climbing", "Hanging"],
      correctAnswer: "Hanging",
    },
    {
      question:
        "Which animals can recognize dozens of individuals from a set of photographs?",
      options: ["Bats", "Sheep", "Bears", "Koalas"],
      correctAnswer: "Sheep",
    },
    {
      question:
        "Which animals have eyes that change color depending on the season?",
      options: ["Dogs", "Chickens", "Reindeer", "Snakes"],
      correctAnswer: "Reindeer",
    },
    {
      question:
        "Which animals communicate with others from miles away using subsonic signals?",
      options: ["Leopards", "Elephants", "Moles", "Lions"],
      correctAnswer: "Elephants",
    },
    {
      question:
        "Which animals create trails to guide others in the right direction?",
      options: ["Sloths", "Koalas", "Monkeys", "Bears"],
      correctAnswer: "Monkeys",
    },
    {
      question: "What is a male zebra called?",
      options: ["Stallion", "Stag", "Bull", "Buck"],
      correctAnswer: "Stallion",
    },
    {
      question: "How many hours a day do lions spend sleeping or resting?",
      options: ["5-9 Hours", "16-20 Hours", "1-4 Hours", "10-15 Hours"],
      correctAnswer: "16-20 Hours",
    },
    {
      question: "What are the knobs on the top of giraffes' heads called?",
      options: ["Spikes", "Aglets", "Antlers", "Ossicones"],
      correctAnswer: "Ossicones",
    },
    {
      question: "Small, close-knit families of prairie dogs are called:",
      options: ["Mobs", "Harems", "Cateries", "Gangs"],
      correctAnswer: "Cateries",
    },
    {
      question: "What special substance do mother koalas feed their young?",
      options: ["Pap", "Pulp", "Keratin", "Mead"],
      correctAnswer: "Pap",
    },
    {
      question: "What is unique about a wombat's droppings?",
      options: ["No Smell", "They're Purple", "Cube Shaped", "They Glow"],
      correctAnswer: "Cube Shaped",
    },
    {
      question: "How are platypuses are different from most other mammals?",
      options: ["Lay Eggs", "Have Gills", "Cold-blooded", "Have Pouches"],
      correctAnswer: "Lay Eggs",
    },
    {
      question: "The quokka is a type of:",
      options: ["Rodent", "Weasel", "Lemur", "Marsupial"],
      correctAnswer: "Marsupial",
    },
    {
      question: "What are baby echidnas called?",
      options: ["Puggles", "Joeys", "Kids", "Echidnettes"],
      correctAnswer: "Puggles",
    },
    {
      question: "What are the knobs on the top of giraffes' heads called?",
      options: ["Pap", "Vernix", "Lanugo", "Blood-sweat"],
      correctAnswer: "Blood-sweat",
    },
    {
      question: "What are baby meerkats called?",
      options: ["Cubs", "Kits", "Pups", "Whelps"],
      correctAnswer: "Pups",
    },
    {
      question: "How many hours do giraffes sleep a day?",
      options: ["3-6 Hours", "7-9 Hours", "10-15 Hours", "2 Hours"],
      correctAnswer: "2 Hours",
    },
    {
      question:
        "At most, how many pounds of meat can a tiger consume at one time?",
      options: ["88", "1000", "250", "13"],
      correctAnswer: "88",
    },
    {
      question: "What is the fastest land animal?",
      options: ["Lion", "Tiger", "Cheetah", "Springbok"],
      correctAnswer: "Cheetah",
    },
    {
      question: "What is the only bird that can fly backwards?",
      options: ["Eagle", "Falcon", "Hummingbird", "Bittern"],
      correctAnswer: "Hummingbird",
    },
    {
      question: "Female polar bears usually give birth to ___ cubs at a time",
      options: ["9", "2", "21", "7"],
      correctAnswer: "2",
    },
    {
      question: "What is a female deer called?",
      options: ["Doe", "Buck", "Ewe", "Nanny"],
      correctAnswer: "Doe",
    },
    {
      question: "What is the fastest bird in the world?",
      options: ["Peregrine", "Swift", "Teal", "Hummingbird"],
      correctAnswer: "Peregrine",
    },
    {
      question: "Which animal is associated with the star sign Taurus?",
      options: ["Goat", "Sheep", "Cow", "Bull"],
      correctAnswer: "Bull",
    },
  ],
  data_history: [
    {
      question: "Who was the first person to orbit the Earth?",
      options: ["Neil Armstrong", "John Glenn", "Yuri Gagarin", "Marc Garneau"],
      correctAnswer: "Yuri Gagarin",
    },
    {
      question: "Which of these cities was NOT founded by the Romans?",
      options: ["Cologne", "Alexandria", "Ravenna", "Athens"],
      correctAnswer: "Alexandria",
    },
    {
      question: "Where did Zoroastrianism originate?",
      options: ["Persia", "Egypt", "India", "India"],
      correctAnswer: "Persia",
    },
    {
      question: "Which of these writers was NOT English?",
      options: [
        "Agatha Christie",
        "Charles Dickens",
        "Jane Austen",
        "Oscar Wilde",
      ],
      correctAnswer: "Oscar Wilde",
    },
    {
      question: "How many wives did Henry VIII have?",
      options: ["3", "2", "1", "6"],
      correctAnswer: "6",
    },
    {
      question: "Which foreign power last captured Moscow?",
      options: ["None", "Hitler", "Napoleon", "Ögedei Khan"],
      correctAnswer: "Napoleon",
    },
    {
      question: "Which of the following was NOT originally invented in China?",
      options: ["Paper Money", "Silk", "Gunpowder", "Concrete"],
      correctAnswer: "Concrete",
    },
    {
      question: "The original purpose of the Taj Mahal was to serve as a:",
      options: ["Palace", "Mosque", "Armory", "Mausoleum"],
      correctAnswer: "Mausoleum",
    },
    {
      question: "What was the capital of the Byzantine Empire?",
      options: ["Rome", "Jerusalem", "Alexandria", "Constantinapole"],
      correctAnswer: "Constantinapole",
    },
    {
      question: "Who was Anton Chekov?",
      options: ["Chess Player", "Explorer", "Ship Captain", "Playwright"],
      correctAnswer: "Playwright",
    },
    {
      question: "What did Costa Rica abolish in 1949?",
      options: ["Slavery", "Fossil Fuels", "Taxes", "It's Military"],
      correctAnswer: "It's Military",
    },
    {
      question: "Which of these crops DIDN'T come from the New World?",
      options: ["Tobacco", "Maize", "Hemp", "Tomatoes"],
      correctAnswer: "Hemp",
    },
    {
      question:
        "What decade was known as 'gay' in America and 'naughty' in Britain?",
      options: ["1920s", "1960s", "1720s", "1890s"],
      correctAnswer: "1890s",
    },
    {
      question: "Where did Karl Marx spend most of his adult life?",
      options: ["Moscow", "Berlin", "London", "Paris"],
      correctAnswer: "London",
    },
    {
      question: "What country was formerly known as Southern Rhodesia?",
      options: ["Kenya", "Zimbabwe", "Angola", "Congo"],
      correctAnswer: "Zimbabwe",
    },
    {
      question: "What was a dreadnought?",
      options: ["Battleship", "An Elite Soldier", "Battle Tactic", "Army Base"],
      correctAnswer: "Battleship",
    },
    {
      question: "How did Gandhi die?",
      options: ["Assasination", "Air Strike", "Cancer", "Old Age"],
      correctAnswer: "Assasination",
    },
    {
      question: "Where was the Metric System developed?",
      options: ["Greece", "France", "Italy", "United States"],
      correctAnswer: "France",
    },
    {
      question:
        "What style of architecture is exemplified by the Notre Dame cathedral in Paris?",
      options: ["Art Deco", "Brutalist", "Gothic", "Neo-classical"],
      correctAnswer: "Gothic",
    },
    {
      question: "Where was Siddhārtha Gautama, aka Buddha, born?",
      options: ["Nepal", "Palestine", "Saudi Arabia", "China"],
      correctAnswer: "Nepal",
    },
    {
      question: "How long did Hitler envision his 'Third Reich' lasting?",
      options: ["10 Years", "100 Years", "150 Years", "1000 Years"],
      correctAnswer: "1000 Years",
    },
    {
      question: "Why did Great Britain establish colonies in Australia, to..",
      options: [
        "Raid Spanish Ships",
        "Hold Prisoners",
        "Grow Crops",
        "Mine Resources",
      ],
      correctAnswer: "Hold Prisoners",
    },
    {
      question: "What style of facial hair did Joseph Stalin wear?",
      options: ["Beard", "Clean-shaven", "Sideburns", "Mustache"],
      correctAnswer: "Mustache",
    },
    {
      question:
        "What country accepted responsibility for the bombing of Pan Am Flight 103 over Lockerbie, Scotland?",
      options: ["Libya", "North Korea", "Panama", "Russia"],
      correctAnswer: "Libya",
    },
    {
      question:
        "Lord Nelson famously led the English navy to victory at Cape Trafalgar. Where is Cape Trafalgar?",
      options: ["Algeria", "Canada", "England", "Spain"],
      correctAnswer: "Spain",
    },
    {
      question: "Who hosted the Olympics in 1940?",
      options: ["France", "USA", "England", "No One"],
      correctAnswer: "No One",
    },
    {
      question: "What did Wernher von Braun design?",
      options: ["Furniture", "Rockets", "Clothing", "Shoes"],
      correctAnswer: "Rockets",
    },
    {
      question: "Who was the U.S. President during World War I",
      options: [
        "Dwight Eisenhower",
        "Herbert Hoover",
        "Theodore Roosevelt",
        "Woodrow Wilson",
      ],
      correctAnswer: "Woodrow Wilson",
    },
    {
      question: "What color did rebel soldiers wear in the Civil War?",
      options: ["Black", "Gray", "Red", "Khaki"],
      correctAnswer: "Gray",
    },
    {
      question: "When was the Jazz Age?",
      options: ["1920s", "1890s", "1950s", "1980s"],
      correctAnswer: "1920s",
    },
  ],
  data_nature: [
    {
      question: "Commonly found in the garden, what is a ‘gastropoda’?",
      options: ["Snail", "Worm", "Crow", "Catepillar"],
      correctAnswer: "Snail",
    },
    {
      question: "Of all the animals on Earth, which is the largest?",
      options: ["Elephant", "Blue Whale", "Basking Shark", "Hippo"],
      correctAnswer: "Blue Whale",
    },
    {
      question: "Which planet in our Solar System has the most moons?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      correctAnswer: "Saturn",
    },
    {
      question: "Which chemical element gives Mars its distinctive red color?",
      options: ["Iron", "Silicone", "Hydrogen", "Copper"],
      correctAnswer: "Iron",
    },
    {
      question: "What precious metal has the chemical symbol Au?",
      options: ["Silver", "Gold", "Platinum", "Copper"],
      correctAnswer: "Gold",
    },
    {
      question: "Which of the following is not one of the 5 human sense?",
      options: ["Touch", "Taste", "Sight", "Think"],
      correctAnswer: "Think",
    },
    {
      question: "Which of the human organs below is capable of regeneration?",
      options: ["Brain", "Liver", "Stomach", "Large Intestine"],
      correctAnswer: "Liver",
    },
    {
      question:
        "How long does it take for the Moon to travel around the Earth?",
      options: ["27 Days", "28 Days", "30 Days", "31 Days"],
      correctAnswer: "27 Days",
    },
    {
      question: "Where is the hottest place in the world?",
      options: ["Sahara Desert", "Gobi Desert", "Death Valley", "Mitribah"],
      correctAnswer: "Death Valley",
    },
    {
      question:
        "One of the early greek philosophers that started the concept about nature is?",
      options: ["Plato", "Aristotle", "Socrates", "Pythagoras"],
      correctAnswer: "Plato",
    },
    {
      question: "Which is not a butterfly?",
      options: ["Cabbage White", "Pink Petal", "Red Admiral", "Morpho"],
      correctAnswer: "Pink Petal",
    },
    {
      question:
        "Which of these processes from the carbon cycle releases carbon dioxide into the atmosphere?",
      options: [
        "Decomposition",
        "Photosynthesis",
        "Respiration",
        "Transpiration",
      ],
      correctAnswer: "Respiration",
    },
    {
      question: "Which reptiles camouflage themselves by changing colour?",
      options: ["Chameleons", "Lizards", "Skink", "Dinosaur"],
      correctAnswer: "Chameleons",
    },
    {
      question: "Earth is located in which galaxy?",
      options: ["Milky Way", "Sombrero", "Andromeda", "Whirlpool"],
      correctAnswer: "Milky Way",
    },
    {
      question: "Shiraz is a variety of which fruit?",
      options: ["Orange", "Banana", "Grape", "Kiwi"],
      correctAnswer: "Grape",
    },
    {
      question: "Where do baby giraffes place their head when sleeping?",
      options: ["On a Tree", "On Their Butt", "The Ground", "On Eachother"],
      correctAnswer: "On Their Butt",
    },
    {
      question:
        "How many miles of hair does the average person grow in their lifetime?",
      options: ["800", "312", "440", "590"],
      correctAnswer: "590",
    },
    {
      question: "At what age to do greenland sharks reach puberty?",
      options: ["20", "100", "50", "150"],
      correctAnswer: "150",
    },
    {
      question: "What color were the world's first carrots?",
      options: ["Green", "Purple", "Orange", "Red"],
      correctAnswer: "Purple",
    },
    {
      question:
        "Which famous dolphin can you find in Clearwater Aquarium, Florida?",
      options: ["Flipper", "Winter", "Fungie", "Dusty"],
      correctAnswer: "Winter",
    },
    {
      question: "How many inches of rain equals 20-30 inches of snow?",
      options: ["2 Inches", "3 Inches", "6 Inches", "4 Inches"],
      correctAnswer: "2 Inches",
    },
    {
      question: "Where can you find the largest coral reef in the world?",
      options: ["Australia", "Florida", "Mexico", "Belize"],
      correctAnswer: "Australia",
    },
    {
      question: "What absorbs minerals and water from the soil?",
      options: ["The Stem", "The Flower", "The Roots", "The Leaves"],
      correctAnswer: "The Roots",
    },
    {
      question: "What is the closest planet to the Sun?",
      options: ["Mercury", "Saturn", "Uranus", "Neptune"],
      correctAnswer: "Mercury",
    },
    {
      question: "What is the name of Saturn’s largest moon?",
      options: ["Titan", "Rhea", "Dione", "Mimas"],
      correctAnswer: "Titan",
    },
    {
      question: "What is the name of the force holding us to the Earth?",
      options: ["Strong Force", "Weak Force", "Gravity", "Air Force"],
      correctAnswer: "Gravity",
    },
    {
      question: "What is the largest ocean on Earth?",
      options: [
        "Indian Occean",
        "Pacific Occean",
        "Atlantic Occean",
        "Arctic Occean",
      ],
      correctAnswer: "Pacific Occean",
    },
    {
      question: "How many colours are in the rainbow?",
      options: ["6", "8", "5", "7"],
      correctAnswer: "7",
    },
    {
      question: "A caracal is what type of animal?",
      options: ["Cat", "Dog", "Hamster", "Rabbit"],
      correctAnswer: "Cat",
    },
    {
      question: "How many bones are in the human body?",
      options: ["206", "208", "198", "200"],
      correctAnswer: "206",
    },
  ],
};

const mode = {
  data_easy: [10, 600],
  data_medium: [20, 900],
  data_hard: [30, 720],
};

const progressFeedback = {
  shocking: [
    "Dreadful. Truly Dreadful",
    "Please leave... now.",
    "Shocking stuff Sally... no words smh",
    "Kind of embarrasing now... isn't it?",
    "He's dead Jim.",
  ],
  poor: [
    "You are lacking in ability. Elevate",
    "On your bike Jim, nothing to see here...",
    "It's truly a time for growth... lool",
    "Good thing we don't have a leaderboard",
    "Poor... o so very poor",
  ],
  average: [
    "Bit of a 'plain Jane' aren't you",
    "Generic.",
    "Unlucky! give it another go",
    "Mediocre... at best",
    "Not bad... but not great either...",
  ],
  good: [
    "I see potential in you",
    "It seems you know your stuff",
    "Impressive",
    "No Einstein but I've seen worse... believe me",
    "Given some of the questions, I'm surprised you've made it here",
  ],
  excellent: [
    "You're a star within the stars!",
    "The future is bright in this one!",
    "You love to see it",
    "Put the books down... we get it",
    "The Nerd level is stong in this one!",
  ],
};

const getRandomSummarisedResultsMessage = () => {
  let feedBackCategory;
  switch (true) {
    case percent === undefined || percent < 20:
      feedBackCategory = "shocking";
      break;
    case percent >= 20 && percent < 40:
      feedBackCategory = "poor";
      break;
    case percent >= 40 && percent < 60:
      feedBackCategory = "average";
      break;
    case percent >= 60 && percent < 80:
      feedBackCategory = "good";
      break;
    case percent >= 80 && percent <= 100:
      feedBackCategory = "excellent";
      break;
    default:
      percent = 0;
      return;
  }
  document.querySelector(".result-summary p").textContent =
    progressFeedback[feedBackCategory][
      randomize(progressFeedback[feedBackCategory].length, 1, false)
    ];
};

// https://stackoverflow.com/questions/27433075/using-a-for-each-loop-on-an-empty-array-in-javascript
const createQuestionsSet = (init) =>
  Array.apply(null, Array(init)).map(() => new Question("", "", ""));

const selectCategory = (data) => (category = dataSet[data.attributes[1].name]);

const selectDifficulty = (current) => {
  difficulty = mode[current.attributes[1].name];
  questions = createQuestionsSet(difficulty[0]);
  return current.attributes[1].name;
};

const removeCategory = () => (category = undefined);

const removeDifficulty = () => {
  difficulty = undefined;
  questions = [];
};

const loadQuestion = () =>
  questions.forEach((current, index) => {
    current.question = category[index].question;
    current.options = category[index].options;
    current.correctAnswer = category[index].correctAnswer;
    current.questionIndex = ++index;
  });

const displayQuestionContentUI = (isFirst) => {
  if (!isFirst) ID++;
  if (ID >= questions.length) return;
  questionText.textContent = questions[ID].question;
  answerOptions.forEach(
    (current, index) => (current.textContent = questions[ID].options[index])
  );
};

const displayQuestionStatsUI = () => {
  if (ID >= questions.length) return;
  const questionInfo = document.querySelectorAll(".nav-container ul li span");
  questionInfo[0].textContent = questions[ID].questionIndex;
  questionInfo[1].textContent = questions.length;
};

const createNewElement = (el, classListEl) => {
  let styledElement = document.createElement(el);
  if (classListEl) {
    styledElement.classList.add(classListEl);
  }
  return styledElement;
};

const getOverlayTextUI = (index, isCategory) => {
  let categoryName, categoryStr, data;
  isCategory
    ? (categoryName = [
        "sports",
        "landmarks",
        "films",
        "wildlife",
        "nature",
        "history",
      ])
    : (categoryName = ["easy", "medium", "hard"]);
  categoryName[index].includes(" ")
    ? (data = categoryName[index].replace(" & ", "_"))
    : (data = categoryName[index]);

  const capitalize = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  isCategory
    ? (categoryStr = categories[index].attributes[1].name)
    : (categoryStr = difficultyOptions[index].attributes[1].name);

  if (categoryStr.substring(5, categoryStr.length) === data) {
    return capitalize(categoryName[index]);
  }
};

const randomize = (n, r, isLoader) => {
  let rand = Math.floor(Math.random() * n) * r; // n = 4, r = 1000; returns a value between 1000 - 4000 (in thousands)
  if (((rand) => r && rand <= r * 2) && isLoader) {
    // if 1000 or 2000
    return (rand += 3000); // equals 3000 or 4000
  }
  return rand;
};

const score = () => {
  let n = 0;
  return (cond) => {
    if (newGame && n) {
      newGame = false;
      n = 0;
    }
    if (cond) {
      n++;
    }
    return n;
  };
};

let scoreCount = score();

const getNextDiv = (containerShow, display, ...containerRemove) => {
  for (let i = 0; i < containerRemove.length; i++) {
    if (containerRemove[i][i]) {
      containerRemove[i][i].style.display = "none";
    } else if (containerRemove[i]) {
      containerRemove[i].style.display = "none";
    }
  }
  if (containerShow) containerShow.style.display = display;
};

const createHoverEffectUI = (current, index, isCategory) => {
  if (current.childNodes.length !== 0) return;
  let animateDirection, newChild;
  let text = getOverlayTextUI(index, isCategory);
  newElement = createNewElement("div", "overlay");
  current.appendChild(newElement);
  let t = document.createTextNode(text);
  newChild = createNewElement("div", "text");
  newChild.appendChild(t);
  newElement.appendChild(newChild);
  newElement.classList.add("animate");
  !isCategory
    ? (animateDirection = "animateUp")
    : (animateDirection = "animateLeft");
  newElement.classList.add(animateDirection);
};

const removeHoverEffectUI = () => {
  if (newElement.classList.length) {
    newElement.classList.remove(
      "animate",
      "animateLeft",
      "animateUp",
      "overlay"
    );
    newElement.remove(newElement);
  }
};

const createBarIndexingUI = (el, index) => el[index].classList.add("active");

const removeBarIndexingUI = (el, index) => {
  if (el[index].classList.contains("active"))
    el[index].classList.remove("active");
};

const displayBtnsUI = (current, display) => {
  if (btns[1].style.display === "block" && btns[2].style.display === "block")
    return;
  btns[1].style.display = display;
  if (current.classList.contains("persist")) {
    btns[0].style.display = display;
    btns[2].style.display = display;
  }
};

const setElementsUI = (state1, state2, ...el) => {
  for (let i = 0; i < el.length; i++) {
    if (el[i].length > 1) {
      if (el[i][i].style.display === state1) el[i][i].style.display = state2;
    } else {
      if (el[i].style.display === state1 || el[i].style.display === "")
        el[i].style.display = state2;
    }
  }
};

const modifyStyleUI = (el, fnCallBack, ...classListEl) => {
  for (let i = 0; i < classListEl.length; i++) {
    el.classList[fnCallBack](classListEl[i]);
  }
};

const removeSelectionsUI = (...el) => {
  for (let i = 0; i < el.length; i++) {
    // if there are 2 params
    if (el.length > 1) {
      //remove all but current selection
      for (let j = 0; j < el[i].length; j++) {
        if (el[1][j].classList.contains("persist") && el[1][j] !== el[0]) {
          modifyStyleUI(el[1][j], "remove", "persist");
        }
      }
    } else {
      for (let j = 0; j < el[i].length; j++) {
        // remove all selections
        if (el[0][j].classList.contains("persist")) {
          modifyStyleUI(el[0][j], "remove", "persist");
        }
      }
    }
  }
};

const getInfoBarTxtContent = (el, isModal, ...section) =>
  section.forEach((cur) => {
    if (isModal) {
      cur.textContent = " " + el.textContent;
    } else
      cur === quizDifficulty
        ? (cur.textContent = "")
        : (cur.textContent = " " + el.textContent);
  });

const clearSelectionUI = (difficulty, category) => {
  (difficulty.textContent = ""), (category.textContent = "");
};

const loaderUI = () =>
  loaderContainer.appendChild(createNewElement("div", "loader"));

const loaderDurationUI = (milliSecs) => {
  duration = randomize(4, milliSecs, true);
  let load = setTimeout(() => {
    loaderContainer.removeChild(document.querySelector(".loader"));
    getNextDiv(quizContainer, "block", modal, loaderContainer);
    setElementsUI("flex", "none", document.querySelector(".wrapper"));
    clearTimeout(load);
  }, duration);
};

const timer = () => {
  let s, countDownDate, now, distance, mins, secs;
  s = new Date();
  countDownDate = s.setSeconds(
    s.getSeconds() + (mode[difficulty][1] + duration / 1000)
  );
  x = setInterval(() => {
    now = new Date().getTime();

    // Find the distance between now and the count down date
    distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    secs = Math.floor((distance % (1000 * 60)) / 1000);

    const checkTime = (i) => {
      if (i < 10) {
        i = "0" + i;
      }
      return i;
    };

    timerText.textContent = mins + ":" + checkTime(secs);

    if (distance <= 60000) {
      timerText.style.color = "#ff2828";
    }

    if (ID === questions.length) {
      stopTimer();
    }

    if (distance <= 0) {
      isTimedOut = true;
      timerText.textContent = "0:00";
      setElementsUI("block", "none", exitModal);
      removeQuizContentUI();
      //display score results
      displayTimedOutContentUI();
      getRandomSummarisedResultsMessage();
      stopTimer();
      progressInfo();
    }
  }, 1000);
};

const stopTimer = () => clearInterval(x);

const checkAnswer = (current, scoreCallBack) => {
  let score;
  if (ID >= questions.length) return;
  current.textContent === questions[ID].correctAnswer
    ? (score = scoreCallBack(true))
    : (score = scoreCallBack(false));
  return score;
};

const getScorePercentage = () =>
  Math.round((playerScore / questions.length) * 100);

const setButtonStateUI = (current, operation, styleCallBack) => {
  let newCurrent = current.parentNode.parentNode.parentNode.parentNode;
  document.querySelectorAll(".answer").forEach((cur) => {
    if (cur !== newCurrent) {
      styleCallBack(cur, operation, "disabled");
    }
  });
};

const removeQuizContentUI = () => {
  if (ID === questions.length || isTimedOut) {
    setElementsUI(
      "block",
      "none",
      exit,
      questionText.parentNode,
      navClose,
      document.querySelector(".quiz-content")
    );
  }
};

const displayAnswerUI = (el) => {
  // (keyframes animation) flash 'displayed color for 3 seconds - (Method displays the correct answer using red and green border colors);
  if (ID >= questions.length) return;
  let node = el.parentNode.parentNode.parentNode.parentNode;
  modifyStyleUI(node, "add", "blink");
  el.textContent === questions[ID].correctAnswer
    ? node.classList.add("correct")
    : node.classList.add("incorrect");
};

const removeBorderAnswerUI = (current, styleModifyCallBk) => {
  let el = current.parentNode.parentNode.parentNode.parentNode;
  styleModifyCallBk(
    el,
    "remove",
    el.classList[1],
    el.classList[2],
    el.classList[3]
  );
};

const modifyBorderAnswerUI = (
  current,
  operation,
  styleModifyCallBk,
  ...classListEls
) => {
  let el = current.parentNode.parentNode.parentNode.parentNode;
  styleModifyCallBk(el, operation, ...classListEls);
};

const displayTimedOutContentUI = () => {
  if (ID >= questions.length) return;
  if (!percent) {
    setElementsUI("none", "flex", document.querySelector(".score-container"));
    document.querySelector(".score-container .result-label p").textContent =
      "Time's up!";
    document.querySelector(".score-container .play-again").textContent =
      "Main menu";
    setElementsUI("block", "none", document.querySelector("progress-ring"));
    setElementsUI("none", "block", document.querySelector("emoji-icon"));
  }
};

categories.forEach((current, index) => {
  current.addEventListener("mouseenter", () =>
    createHoverEffectUI(current, index, true)
  );
  current.addEventListener("mouseleave", () => removeHoverEffectUI());

  current.addEventListener("click", () => {
    getNextDiv(difficultyContainer, "grid", categoryContainer);
    displayBtnsUI(current, "block");
    getInfoBarTxtContent(current, false, quizCategory, modalCategory);
    selectCategory(current);
  });
});

difficultyOptions.forEach((current, index, arr) => {
  btns.forEach((cur) => {
    cur.addEventListener("click", () => {
      if (cur === btns[0]) {
        // Cancel button
        removeDifficulty();
        setElementsUI("block", "none", cur, btns[2]);
        modifyStyleUI(current, "remove", "persist");
        getInfoBarTxtContent(current, false, quizDifficulty);
      } else if (cur === btns[1]) {
        // Remove content - Back button
        removeCategory();
        removeSelectionsUI(current, arr);
        setElementsUI("block", "none", cur, btns[0], btns[2]);
        clearSelectionUI(quizDifficulty, quizCategory);
        getNextDiv(categoryContainer, "grid", difficultyContainer);
      } else if (cur === btns[2]) {
        // Continue button
        getNextDiv(
          modal,
          "block",
          btns[1],
          btns[2],
          difficultyContainer,
          container
        );
      } else if (cur === btns[4]) {
        //get loaderUI to main quiz area - Forward button (mod-confirm)
        setElementsUI(
          "block",
          "none",
          btns[0],
          btns[1],
          btns[2],
          infoBarContainer
        );
      }
    });
  });

  current.addEventListener("mouseenter", () => {
    createHoverEffectUI(current, index, false);
    createBarIndexingUI(listEls, index);
  });

  current.addEventListener("mouseleave", () => {
    removeHoverEffectUI();
    removeBarIndexingUI(listEls, index);
  });

  current.addEventListener("click", () => {
    modifyStyleUI(current, "add", "persist");
    removeSelectionsUI(current, arr);
    displayBtnsUI(current, "block");
    getInfoBarTxtContent(current, true, quizDifficulty, modalDifficulty);
    difficulty = selectDifficulty(current);
    loadQuestion();
    displayQuestionContentUI(true); //load first question only
    displayQuestionStatsUI();
  });
});

modalClose.addEventListener("click", () => {
  setElementsUI("none", "flex", container);
  setElementsUI("none", "block", btns[1], btns[2]);
  getNextDiv(difficultyContainer, "grid", modal);
});

btns[4].addEventListener("click", () => {
  getNextDiv(loaderContainer, "block", modal);
  loaderUI();
  loaderDurationUI(1000);
  timer();
});

exit.addEventListener(
  "click",
  () => getNextDiv(exitModal, "block", difficultyContainer),
  removeSelectionsUI(difficultyOptions)
);

btns[3].addEventListener("click", () => init());

exitConfirm.addEventListener("click", () => init());

exitModalCloseBtn.addEventListener("click", () =>
  setElementsUI("block", "none", exitModal)
);

answerOptions.forEach((current) => {
  current.parentNode.parentNode.parentNode.parentNode.addEventListener(
    "click",
    () => {
      displayAnswerUI(current);
      setButtonStateUI(current, "add", modifyStyleUI);
      playerScore = checkAnswer(current, scoreCount);
      percent = getScorePercentage();

      setTimeout(() => {
        // Loads first question only
        displayQuestionContentUI(false);
        displayQuestionStatsUI();
        setButtonStateUI(current, "remove", modifyStyleUI);
        removeBorderAnswerUI(current, modifyStyleUI);
        removeQuizContentUI();
      }, getComputedStyle(document.documentElement).getPropertyValue("--count") * 1000); // get css variable

      //Display score results here;
      getRandomSummarisedResultsMessage();
      y = setTimeout(progressInfo, 5000);
    }
  );
  current.parentNode.parentNode.parentNode.parentNode.addEventListener(
    "mouseenter",
    () => modifyBorderAnswerUI(current, "add", modifyStyleUI, "dark-border")
  );
  current.parentNode.parentNode.parentNode.parentNode.addEventListener(
    "mouseleave",
    () => modifyBorderAnswerUI(current, "remove", modifyStyleUI, "dark-border")
  );
});

class ProgressRing extends HTMLElement {
  constructor() {
    super();
    const stroke = this.getAttribute("stroke");
    const radius = this.getAttribute("radius");
    const normalizedRadius = radius - stroke * 2;
    this._circumference = normalizedRadius * 2 * Math.PI;
    this._root = this.attachShadow({ mode: "open" });
    this._root.innerHTML = `
        <svg height="${radius * 2}" width="${radius * 2}">
           <circle
             stroke="#52c8fa"
             stroke-dasharray="${this._circumference} ${this._circumference}"
             style="stroke-dashoffset:${this._circumference}"
             stroke-width="${stroke}"
             fill="transparent"
             r="${normalizedRadius}"
             cx="${radius}"
             cy="${radius}"
          />
          <text id="progressText" x="50%" y="50%" style="font-size: 4rem;" text-anchor="middle" stroke="#52c8fa" fill="#52c8fa" stroke-width="1px" dy=".3em"></text>
        </svg>
       
        <style>
            svg{
                margin: 20px 20px 25px 10px;
            }

            circle {
                transition-delay: 1s;
                transition-timing-function: ease-in-out;
                transition: stroke-dashoffset 11s;
                transform: rotate(-90deg);
                transform-origin: 50% 50%;
            }
        </style>
       `;
  }

  setProgress() {
    const offset = this._circumference - (percent / 100) * this._circumference;
    const circle = this._root.querySelector("circle");
    circle.style.strokeDashoffset = offset;
  }

  static get observedAttributes() {
    return ["progress"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "progress") {
      this.setProgress(newValue);
    }
  }
}
window.customElements.define("progress-ring", ProgressRing);

class Icon extends HTMLElement {
  constructor() {
    super();
    this._root = this.attachShadow({ mode: "open" });
    this._root.innerHTML = `
        <svg id="emoji" height="280" width="280" viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg">
            <g id="line">
                <path fill="none" stroke="#52c8fa" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M55.2766,23.4489q-.0459-.0708-.0924-.1411A23.0031,23.0031,0,0,0,14.2153,43.3865c.0343.1023.1046.2972.14.3993"/>
                <path fill="none" stroke="#52c8fa" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M25.0368,56.22a23.5311,23.5311,0,0,0,21.1991.3755A23.3425,23.3425,0,0,0,58.7218,39.5728"/>
                <path fill="none" stroke="#52c8fa" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M51.58,34.554a11.5549,11.5549,0,0,1,1.2192,4.408C42.9625,47.2342,30.1775,50.5842,28.1236,51.08a11.4345,11.4345,0,0,1-2.6837-3.535l.0985-.0489S40.39,44.1243,51.4407,34.7013Z"/>
                <path fill="none" stroke="#52c8fa" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M52.799,38.962c.2974,4.6205-2.4688,9.3006-9.0418,12.5673C37.1215,54.8271,31.6358,54.17,28.1237,51.08,30.1775,50.584,42.9625,47.2341,52.799,38.962Z"/>
                <path fill="none" stroke="#52c8fa" stroke-linejoin="round" stroke-width="2" d="M67.6926,32.9089a4.2419,4.2419,0,0,1-5.3735,2.6717c-3.9838-1.3386-6.68-6.6869-6.7069-6.74.213-.0912,5.4464-2.637,9.41-1.3052a4.241,4.241,0,0,1,2.6706,5.3737Z"/>
                <path fill="none" stroke="#52c8fa" stroke-linejoin="round" stroke-width="2" d="M14.395,59.3977a4.2421,4.2421,0,0,1-2.6718-5.3736c1.3387-3.9837,6.6869-6.68,6.74-6.7068.0912.213,2.6369,5.4464,1.3052,9.41a4.2411,4.2411,0,0,1-5.3737,2.6707Z"/>
                <polyline fill="none" stroke="#52c8fa" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" points="22.478 33.13 30.163 33.793 25.928 40.072"/>
                <polyline fill="none" stroke="#52c8fa" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" points="41.878 23.488 37.766 30.014 45.328 30.43"/>
            </g>
        </svg>

        <style>
            svg{
                margin: 0 20px 15px 20px;
            }
        </style>
    `;
  }
}

window.customElements.define("emoji-icon", Icon);

const progressInfo = () => {
  if (ID === questions.length || isTimedOut) {
    let percentText, progress;
    document.querySelector(".score-container").style.display = "flex";

    const progressRing = document.querySelector("progress-ring");
    const icon = document.querySelector("emoji-icon");

    if (percent) {
      icon.style.display = "none";
      progressRing.style.display = "block";
      percentText = progressRing._root.querySelector("#progressText");
      progressRing._root.querySelector("circle").attributes[2].nodeValue =
        "stroke-dashoffset: 678.5840131753953";
      progressRing._root.querySelector("#progressText").innerHTML = ``;
      progress = 0;
      const interval = setInterval(() => {
        progressRing.setAttribute("progress", percent);
        progress += 1;
        if (progress <= percent) {
          percentText.innerHTML = `${progress}<tspan>%</tspan>`;
        }
        if (progress === percent) clearInterval(interval);
      }, 100);
      if (y) clearTimeout(y);
    } else {
      icon.style.display = "block";
      progressRing.style.display = "none";
    }
  }
};

const resetProgressRingUI = () => {
  let progressRing = document.querySelector("progress-ring");
  progressRing._root.querySelector("circle").attributes[2].nodeValue =
    "stroke-dashoffset: 678.5840131753953";
  progressRing._root.querySelector("#progressText").innerHTML = ``;
};

const init = () => {
  clearTimeout(y);
  stopTimer();
  ID = 0;
  playerScore = 0;
  duration = 0;
  percent = 0;
  x = undefined;
  y = undefined;
  newElement = undefined;
  isTimedOut = false;
  newGame = true;
  timerText.style.color = "#fff";
  container.style.display = "flex";
  quizContainer.style.display = "none";
  categoryContainer.style.display = "grid";
  document.querySelector("emoji-icon").style.display = "none";
  document.querySelector(".score-container").style.display = "none";
  document.querySelector(".question-title").style.display = "block";
  document.querySelector(".quiz-content").style.display = "block";
  document.querySelector(".wrapper").style.display = "flex";
  document.querySelector(".score-container .result-label p").textContent =
    "Quiz Results:";
  document.querySelector(".score-container .play-again").textContent =
    "Play again?";
  setElementsUI("none", "block", infoBarContainer);
  setElementsUI("none", "block", navClose, navClose.childNodes);
  setElementsUI("block", "none", exitModal);
  removeCategory();
  removeDifficulty();
  clearSelectionUI(quizDifficulty, quizCategory);
  removeSelectionsUI(difficultyOptions);
};

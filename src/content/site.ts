// ALEM Robotics — editable site content. Change text, names, links here.

export const team = {
  name: "ALEM Robotics",
  number: "311436",
  league: "FIRST LEGO League Challenge",
  // Replace with the team's public email (not personal)
  email: "team@example.com",
};

export const social = {
  instagram: "https://www.instagram.com/alem_fll_challenge/",
  instagramHandle: "@alem_fll_challenge",
  tiktok: "https://www.tiktok.com/@alem_fll_challenge",
  tiktokHandle: "@alem_fll_challenge",
};

export const nav = [
  { id: "top", label: "Басты бет" },
  { id: "about", label: "Біз туралы" },
  { id: "team", label: "Біздің команда" },
  { id: "robot", label: "Біздің робот" },
  { id: "project", label: "BIOGLOW" },
  { id: "achievements", label: "Жетістіктер" },
  { id: "media", label: "Фотогалерея" },
  { id: "contact", label: "Байланыс" },
];

export const aboutPoints = [
  { title: "Инженерия", text: "Механизмдерді жобалап, құрастырып, сынақтан өткіземіз." },
  { title: "Бағдарламалау", text: "Роботтың әр қимылын нақты әрі сенімді алгоритмдермен басқарамыз." },
  { title: "Инновация", text: "Нақты мәселелерді зерттеп, жаңа шешімдер ұсынамыз." },
  { title: "Командалық жұмыс", text: "Бір-бірімізден үйреніп, ортақ мақсатқа бірге жетеміз." },
];

export const robotBlocks = [
  { title: "Миссиялар", text: "Маусым алаңындағы миссияларды талдап, орындау стратегиясын құрамыз." },
  { title: "Механизмдер", text: "Ауыстырмалы қосымшалар мен жетектер миссияларға арнайы жасалады." },
  { title: "Бағдарламалау", text: "Датчиктер мен моторларды басқаратын модульдік код жазамыз." },
  { title: "Инженерлік процесс", text: "Жобалау → құрастыру → сынау → жетілдіру циклі." },
];

export const projectSteps = [
  { title: "Мәселе", text: "BIOGLOW жобасы шешетін мәселенің сипаттамасы кейін қосылады." },
  { title: "Зерттеу", text: "Сарапшылармен сұхбаттар мен жиналған деректер осында жазылады." },
  { title: "Шешім", text: "Команда ұсынған идеяның қысқаша сипаттамасы." },
  { title: "Прототип", text: "Прототиптің құрылымы мен сынақ кезеңдері." },
  { title: "Нәтижелер", text: "Нәтижелер жоба аяқталғаннан кейін қосылады." },
];

export const leaders = [
  { name: "Халиева Жанна Янгибаева", role: "Команда жетекшісі", photo: "" as string },
  { name: "Қошмұхан Әсел Аралбекқызы", role: "Команда жетекшісі", photo: "" as string },
];

export const members = [
  "Қуаныш Нұрәлім Нұрбергенұлы",
  "Нұрулхан Кәусәр Алмасханқызы",
  "Нұрболат Нұрсая Нұрсұлтанқызы",
  "Сарнияз Айділдә Исламқызы",
  "Көбен Мәди Айбарұлы",
  "Алдиярбек Бексұлтан Қайратұлы",
  "Паизхан Амир Тынышбекұлы",
].map((name) => ({ name, role: "Команда мүшесі", photo: "" as string }));

// Add real events: { date, title, text }
export const achievements = [
  { date: "Күні", title: "Іс-шара атауы", text: "Сипаттама осында қосылады." },
  { date: "Күні", title: "Іс-шара атауы", text: "Сипаттама осында қосылады." },
  { date: "Күні", title: "Іс-шара атауы", text: "Сипаттама осында қосылады." },
];

// Add real media: photo src or video embed URL
export const media = {
  photos: Array.from({ length: 6 }, () => ({ src: "", caption: "Жаттығу фотосы" })),
  videos: Array.from({ length: 2 }, () => ({ embed: "", caption: "Жарыс видеосы" })),
};

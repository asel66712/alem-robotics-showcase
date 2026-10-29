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
  { id: "about", label: "Біз туралы" },
  { id: "robot", label: "Робот" },
  { id: "project", label: "Жоба" },
  { id: "team", label: "Команда" },
  { id: "achievements", label: "Жетістіктер" },
  { id: "media", label: "Медиа" },
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
  { title: "Мәселе", text: "Маусым тақырыбы бойынша таңдалған мәселенің сипаттамасы осында болады." },
  { title: "Зерттеу", text: "Сарапшылармен сұхбаттар мен жиналған деректер осында жазылады." },
  { title: "Шешім", text: "Команда ұсынған идеяның қысқаша сипаттамасы." },
  { title: "Прототип", text: "Прототиптің құрылымы мен сынақ кезеңдері." },
  { title: "Нәтижелер", text: "Нәтижелер жоба аяқталғаннан кейін қосылады." },
];

// Add real members: { name, role, photo? }
export const members = Array.from({ length: 6 }, (_, i) => ({
  name: `Қатысушы ${i + 1}`,
  role: "Рөлі",
  photo: "" as string,
}));

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

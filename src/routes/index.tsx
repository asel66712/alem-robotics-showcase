import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { nav } from "@/content/site";
import { publicSiteOptions, mapSite } from "@/content/site-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ALEM Robotics #311436 — FIRST LEGO League командасы" },
      { name: "description", content: "ALEM Robotics — FIRST LEGO League Challenge жарысына қатысатын оқушылар робототехника командасы. Болашақ инженерлері." },
      { property: "og:title", content: "ALEM Robotics #311436" },
      { property: "og:description", content: "Болашақ инженерлері. Жаңа идеялар. Үлкен мүмкіндіктер." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(publicSiteOptions),
  component: Index,
});

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))),
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Section({ id, eyebrow, title, intro, children }: { id: string; eyebrow: string; title: string; intro?: string; children: ReactNode }) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-5 py-20 md:py-28">
      <div className="reveal mb-12 max-w-2xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary">{eyebrow}</p>
        <h2 className="text-3xl font-bold md:text-4xl">{title}</h2>
        {intro && <p className="mt-4 leading-relaxed text-muted-foreground">{intro}</p>}
      </div>
      {children}
    </section>
  );
}

function Card({ title, text, index }: { title: string; text: string; index?: number }) {
  return (
    <div className="glass reveal p-6">
      {index !== undefined && <span className="font-display text-sm text-primary">0{index + 1}</span>}
      <h3 className="mt-2 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
    </div>
  );
}

function Placeholder({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div className={`placeholder-img flex items-center justify-center text-center text-xs text-muted-foreground ${className}`} role="img" aria-label={label}>
      <span className="px-3">📷 {label}</span>
    </div>
  );
}

const btn = "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";
const btnPrimary = `${btn} bg-primary text-primary-foreground hover:shadow-[0_0_30px_var(--primary)]`;
const btnGhost = `${btn} border border-primary/40 text-foreground hover:bg-primary/10`;

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 20);
    f(); window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled || open ? "border-b bg-background/85 backdrop-blur-lg" : ""}`}>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#top" className="font-display text-sm font-bold tracking-wider">ALEM<span className="text-primary"> ROBOTICS</span></a>
        <nav className="hidden gap-6 lg:flex" aria-label="Негізгі мәзір">
          {nav.map((n) => <a key={n.id} href={`#${n.id}`} className="text-sm text-muted-foreground transition-colors hover:text-primary">{n.label}</a>)}
        </nav>
        <button className="lg:hidden rounded-md p-2" aria-label="Мәзір" aria-expanded={open} onClick={() => setOpen(!open)}>
          <div className="space-y-1.5"><span className="block h-0.5 w-6 bg-foreground" /><span className="block h-0.5 w-6 bg-foreground" /><span className="block h-0.5 w-4 bg-primary" /></div>
        </button>
      </div>
      {open && (
        <nav className="flex flex-col gap-1 px-5 pb-5 lg:hidden">
          {nav.map((n) => <a key={n.id} href={`#${n.id}`} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 hover:bg-primary/10">{n.label}</a>)}
        </nav>
      )}
    </header>
  );
}

function Index() {
  useReveal();
  const [sent, setSent] = useState(false);
  const { data } = useSuspenseQuery(publicSiteOptions);
  const { settings, team, social, aboutPoints, robotBlocks, projectSteps, leaders, members, achievements, media } = mapSite(data);
  const robotImg = (src: string, label: string, cls: string) => src ? <img src={src} alt={label} className={`${cls} w-full rounded-xl object-cover`} loading="lazy" /> : <Placeholder label={label} className={cls} />;
  return (
    <div id="top" className="overflow-x-hidden">
      <Header />

      {/* HERO */}
      <section className="relative flex min-h-screen items-center justify-center px-5 pt-16 text-center">
        <div className="circuit absolute inset-0 animate-pulse-line" aria-hidden />
        <div className="relative animate-in fade-in slide-in-from-bottom-6 duration-1000">
          <p className="mb-6 inline-block rounded-full border border-primary/30 px-4 py-1.5 text-xs font-medium tracking-widest text-primary">{team.league.toUpperCase()}</p>
          <h1 className="text-glow text-5xl font-black sm:text-7xl md:text-8xl">ALEM<br />ROBOTICS</h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground md:text-xl">{settings.hero_tagline}</p>
          <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border bg-card px-5 py-3">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Team number</span>
            <span className="font-display text-2xl font-bold text-primary">{team.number}</span>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a href="#team" className={btnPrimary}>Біздің команда</a>
            <a href="#project" className={btnGhost}>Жобаларымыз</a>
          </div>
        </div>
      </section>

      <Section id="about" eyebrow="Біз туралы" title="Біз — ALEM Robotics" intro={settings.about_intro}>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {aboutPoints.map((p, i) => <Card key={i} {...p} index={i} />)}
        </div>
      </Section>

      <Section id="team" eyebrow="Біздің команда" title="Команда мүшелері">
        <h3 className="reveal mb-4 text-lg font-semibold">Команда жетекшілері</h3>
        <div className="mb-12 grid gap-5 sm:grid-cols-2">
          {leaders.map((m, i) => (
            <div key={i} className="glass reveal flex items-center gap-4 p-5">
              {m.photo ? <img src={m.photo} alt={m.name} className="h-20 w-20 shrink-0 rounded-xl object-cover" loading="lazy" /> : <Placeholder label="Фото" className="h-20 w-20 shrink-0" />}
              <div>
                <h4 className="font-display font-semibold">{m.name}</h4>
                <p className="text-sm text-primary">{m.role}</p>
              </div>
            </div>
          ))}
        </div>
        <h3 className="reveal mb-4 text-lg font-semibold">Команда мүшелері</h3>
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {members.map((m, i) => (
            <div key={i} className="glass reveal p-4 text-center">
              {m.photo ? <img src={m.photo} alt={m.name} className="aspect-square w-full rounded-xl object-cover" loading="lazy" /> : <Placeholder label="Фото" className="aspect-square" />}
              <h4 className="mt-4 text-sm font-semibold">{m.name}</h4>
              <p className="text-xs text-primary">{m.role}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="robot" eyebrow="Біздің робот" title="Робот және инженерия" intro={settings.robot_intro}>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="reveal grid grid-cols-2 gap-4">
            {robotImg(settings.robot_image_1, "Робот фотосы", "col-span-2 aspect-video")}
            {robotImg(settings.robot_image_2, "Механизм фотосы", "aspect-square")}
            {robotImg(settings.robot_image_3, "Бағдарлама скриншоты", "aspect-square")}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {robotBlocks.map((b, i) => <Card key={i} {...b} index={i} />)}
          </div>
        </div>
      </Section>

      <Section id="project" eyebrow="Инновациялық жоба" title="BIOGLOW" intro={settings.project_intro}>
        <ol className="grid gap-5 md:grid-cols-5">
          {projectSteps.map((s, i) => (
            <li key={i} className="glass reveal relative p-5" style={{ transitionDelay: `${i * 80}ms` }}>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary font-display text-sm font-bold text-primary-foreground">{i + 1}</span>
              <h3 className="mt-4 font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="achievements" eyebrow="Жарыстар мен жетістіктер" title="Біздің жол" intro={settings.achievements_intro}>
        <ol className="relative ml-3 border-l border-primary/30">
          {achievements.map((a, i) => (
            <li key={i} className="reveal mb-8 ml-8">
              <span className="absolute -left-[7px] mt-1.5 h-3.5 w-3.5 rounded-full bg-primary shadow-[0_0_14px_var(--primary)]" />
              <div className="glass p-5">
                <time className="text-xs uppercase tracking-widest text-primary">{a.date}</time>
                <h3 className="mt-1 font-semibold">{a.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{a.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="media" eyebrow="Фотогалерея" title="Фото және видео">
        <h3 className="reveal mb-4 text-lg font-semibold">Жаттығулар</h3>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {media.photos.map((p, i) => p.src ? <img key={i} src={p.src} alt={p.caption} className="reveal aspect-[4/3] w-full rounded-xl object-cover" loading="lazy" /> : <Placeholder key={i} label={p.caption} className="reveal aspect-[4/3]" />)}
        </div>
        <h3 className="reveal mb-4 mt-10 text-lg font-semibold">Жарыстар</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {media.videos.map((v, i) => v.embed ? <iframe key={i} src={v.embed} title={v.caption} className="reveal aspect-video w-full rounded-xl" allowFullScreen /> : <Placeholder key={i} label={`▶ ${v.caption}`} className="reveal aspect-video" />)}
        </div>
      </Section>

      <Section id="social" eyebrow="Әлеуметтік желілер" title="Бізді әлеуметтік желілерде бақылаңыз" intro="Біздің роботтар, жобалар және жарыстардан қызықты сәттер!">
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { name: "Instagram", handle: social.instagramHandle, url: social.instagram, label: "Instagram-ға өту", Icon: InstagramIcon, cls: btnPrimary },
            { name: "TikTok", handle: social.tiktokHandle, url: social.tiktok, label: "TikTok-та көру", Icon: TikTokIcon, cls: btnGhost },
          ].map(({ name, handle, url, label, Icon, cls }) => (
            <div key={name} className="glass reveal group relative overflow-hidden p-7">
              <div className="circuit absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden />
              <div className="relative flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary text-primary ring-1 ring-primary/30 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <Icon className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{name}</h3>
                  <p className="text-sm text-primary">{handle}</p>
                </div>
              </div>
              <a href={url} target="_blank" rel="noopener noreferrer" className={`${cls} relative mt-6 w-full sm:w-auto`}>{label} ↗</a>
            </div>
          ))}
        </div>
      </Section>

      <Section id="contact" eyebrow="Бізбен байланыс" title="Бізге жазыңыз" intro={settings.contact_intro}>
        <form
          className="glass reveal grid max-w-2xl gap-4 p-6 hover:translate-y-0"
          onSubmit={(e) => {
            e.preventDefault();
            const f = new FormData(e.currentTarget);
            const body = `${f.get("message")}\n\n— ${f.get("name")}`;
            window.location.href = `mailto:${team.email}?subject=${encodeURIComponent("ALEM Robotics сайтынан хат")}&body=${encodeURIComponent(body)}`;
            setSent(true);
          }}
        >
          <label className="grid gap-1.5 text-sm">Атыңыз
            <input name="name" required maxLength={80} className="rounded-xl border border-input bg-background/50 px-4 py-3 outline-none focus:border-ring" />
          </label>
          <label className="grid gap-1.5 text-sm">Хабарлама
            <textarea name="message" required maxLength={1000} rows={4} className="rounded-xl border border-input bg-background/50 px-4 py-3 outline-none focus:border-ring" />
          </label>
          <button type="submit" className={`${btnPrimary} justify-self-start`}>Жіберу</button>
          {sent && <p className="text-sm text-primary" role="status">Пошта бағдарламасы ашылды. Рахмет!</p>}
        </form>
      </Section>

      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        <div className="mb-4 flex justify-center gap-3">
          <a href={social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/30 transition-all hover:-translate-y-0.5 hover:bg-primary/10 hover:text-primary"><InstagramIcon className="h-5 w-5" /></a>
          <a href={social.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/30 transition-all hover:-translate-y-0.5 hover:bg-primary/10 hover:text-primary"><TikTokIcon className="h-5 w-5" /></a>
        </div>
        © {new Date().getFullYear()} ALEM Robotics · FLL Team #{team.number}
      </footer>
    </div>
  );
}

function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

function TikTokIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 0 1-2.59-2.59 2.59 2.59 0 0 1 3.4-2.46V9.69a5.73 5.73 0 0 0-.81-.06A5.68 5.68 0 0 0 4.18 15.3 5.68 5.68 0 0 0 9.86 21a5.68 5.68 0 0 0 5.68-5.68V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3a4.28 4.28 0 0 1-3.24-1.48Z" />
    </svg>
  );
}

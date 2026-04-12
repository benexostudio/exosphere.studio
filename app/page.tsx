"use client";
import { useState, useEffect, useRef, createContext, useContext } from "react";

// --- LANGUAGE SYSTEM ---
const translations = {
  en: {
    nav: { work: "Work", music: "Music", services: "Services", about: "About", demos: "Demos", contact: "Contact" },
    hero: {
      tag: "Creative Technology Studio · Berlin",
      h1a: "We",
      h1accent1: "create",
      h1b: "experiences.",
      h1c: "From studio to stage",
      h1accent2: "beyond.",
      h1prefix: "— and ",
      sub: "We're artists, technologists, and builders. Whether it's an immersive installation, a live performance, or an intelligent system for your business — we love building things. Let's make something together.",
      cta1: "See Our Work →",
      cta2: "Get in Touch",
    },
    lf: {
      label: "Lucid Frames",
      title: "Interactive AI Visual Installation",
      video: "Watch Lucid Frames in action",
      concept: "Concept",
      conceptText: "Lucid Frames is an interactive visual installation that transforms audience movement into real-time AI-generated visuals. Visitors don't just watch — they become part of the artwork. Every gesture reshapes the projection, creating a constantly evolving collective experience.",
      how: "How it Works",
      howSteps: "Camera detects silhouettes. Software analyzes movement. AI generates visuals. Projection reacts instantly to the crowd.",
      featured: "Featured At",
    },
    music: {
      label: "Music",
      title: "phasebound",
      sub: "Drum & Bass · Berlin",
      desc: "Striving to infuse the music scene with innovative soundscapes, Ben & Dave are on a mission to redefine the boundaries of Drum & Bass. By fusing techy basslines with intricate rhythmic layers and an orchestral-like cherry on top, they blend elements from across the spectrum of subgenres to create a fresh perspective.",
      releases: "Releases & Sets",
      listen: "Listen",
    },
    services: {
      label: "AI & Automation",
      title: "We find the problem first. Then we build the solution.",
      intro: "Every business is different. We start by understanding your workflows, identify where AI and automation can save you time and money, and build a solution tailored to your specific needs. No templates, no one-size-fits-all.",
      areas: ["Workflow Automation", "AI-Powered Communication", "Data Processing & Integration", "Custom Chatbots"],
      approach: "Our Approach",
      approachText: "We don't sell products off a shelf. We sit down with you, learn how your business actually runs day to day, and find the bottlenecks that cost you time and money. Then we build exactly what you need — nothing more, nothing less.",
      process: "How It Works",
      steps: [
        { n: "01", title: "Free Discovery Call", desc: "We understand your business, your processes, and where the pain points are. No strings attached." },
        { n: "02", title: "Analysis & Proposal", desc: "Clear plan: which systems, what effort, what ROI — transparent and realistic." },
        { n: "03", title: "Build & Deploy", desc: "We build, test, and deploy. You see every step and have access throughout." },
        { n: "04", title: "Handover & Scale", desc: "Full documentation, training, and optionally ongoing support." },
      ],
      cta: "Not sure where to start?",
      ctaSub: "That's exactly what the discovery call is for. No commitment, just a conversation.",
      ctaBtn: "Book a Free Call →",
    },
    about: {
      label: "About Us",
      title: "Not consultants. Builders.",
      p1: "We are Ben & Dave — originally from Austria and Germany, now a Berlin-based audiovisual duo operating at the intersection of electronic music, AI, and real-time visual performance. From an early age, we were drawn to music, a passion that gradually expanded into broader creative experimentation and a deep curiosity for emerging technology as a medium of expression.",
      p2: "As phasebound, we produce and perform drum & bass internationally, blending future neuro and dancefloor influences, topping it off with vocal mashups of well-known pop classics for an extra layer of energy within our live sets. Our musical journey naturally led us beyond sound — sparking an interest in visuals, generative systems, and eventually artificial intelligence.",
      p3: "What started as pure curiosity quickly evolved into hands-on exploration. We trained custom ML models, ran Stable Diffusion locally before it became mainstream, and built real-time generative visual systems with TouchDesigner. Over time, this experimentation grew into live AI visuals, interactive installations at major European festivals, and automation systems for creative and business workflows.",
      p4: "Today, that same curiosity drives everything we build — from immersive audiovisual experiences to practical AI solutions for creatives and companies. We don't just implement AI. We build with it every day.",
    },
    demos: {
      label: "Demos",
      title: "Send us your music",
      text: "We're always looking for fresh sounds for our sets, collabs, and new releases. If you produce drum & bass — or anything in between other bass genres — send it over.",
      looking: "What we're looking for",
      items: ["Drum & Bass, 140, Halftime, Dubstep", "Unreleased tracks or demos", "SoundCloud private links preferred", "Collabs and remix ideas welcome"],
      sent: "Track submitted!",
      sentSub: "We'll give it a listen. Stay tuned.",
      btn: "Submit Track →",
    },
    contact: {
      label: "Contact",
      title: "Let's talk.",
      text: "Have a project, an idea, or just curious what's possible? Whether it's a festival installation, business automation, or creative AI solution — reach out. Free and no strings attached.",
      sent: "Message sent!",
      sentSub: "We'll be in touch soon.",
      btn: "Send Message →",
    },
    footer: "Built with AI. Powered by curiosity.",
  },
  de: {
    nav: { work: "Arbeit", music: "Musik", services: "Leistungen", about: "Über uns", demos: "Demos", contact: "Kontakt" },
    hero: {
      tag: "Creative Technology Studio · Berlin",
      h1a: "Wir",
      h1accent1: "erschaffen",
      h1b: "Erlebnisse.",
      h1c: "Vom Studio auf die Bühne",
      h1accent2: "darüber hinaus.",
      h1prefix: "— und ",
      sub: "Wir sind Künstler, Technologen und Macher. Ob immersive Installation, Live-Performance oder intelligentes System für euer Business — wir bauen gerne. Lass uns gemeinsam etwas erschaffen.",
      cta1: "Unsere Arbeit →",
      cta2: "Kontakt aufnehmen",
    },
    lf: {
      label: "Lucid Frames",
      title: "Interaktive KI Visual Installation",
      video: "Lucid Frames in Aktion sehen",
      concept: "Konzept",
      conceptText: "Lucid Frames ist eine interaktive visuelle Installation, die Besucherbewegungen in Echtzeit in KI-generierte Visuals verwandelt. Besucher schauen nicht nur zu — sie werden Teil des Kunstwerks. Jede Geste verändert die Projektion und schafft ein ständig wachsendes kollektives Erlebnis.",
      how: "So funktioniert's",
      howSteps: "Kamera erkennt Silhouetten. Software analysiert Bewegung. KI generiert Visuals. Projektion reagiert sofort auf das Publikum.",
      featured: "Aufgetreten bei",
    },
    music: {
      label: "Musik",
      title: "phasebound",
      sub: "Drum & Bass · Berlin",
      desc: "Mit dem Ziel, die Musikszene mit innovativen Klangwelten zu bereichern, sind Ben & Dave auf einer Mission, die Grenzen von Drum & Bass neu zu definieren. Durch die Verschmelzung von technischen Basslines mit komplexen rhythmischen Schichten und einem orchestralen Sahnehäubchen verbinden sie Elemente aus dem gesamten Spektrum der Subgenres zu einer frischen Perspektive.",
      releases: "Releases & Sets",
      listen: "Anhören",
    },
    services: {
      label: "KI & Automatisierung",
      title: "Erst das Problem verstehen. Dann die Lösung bauen.",
      intro: "Jedes Unternehmen ist anders. Wir starten damit, eure Workflows zu verstehen, identifizieren wo KI und Automatisierung Zeit und Geld sparen können, und bauen eine Lösung, die genau auf eure Bedürfnisse zugeschnitten ist.",
      areas: ["Workflow-Automatisierung", "KI-gestützte Kommunikation", "Datenverarbeitung & Integration", "Individuelle Chatbots"],
      approach: "Unser Ansatz",
      approachText: "Wir verkaufen keine Produkte von der Stange. Wir setzen uns mit euch zusammen, lernen wie euer Geschäft wirklich funktioniert, und finden die Engpässe, die euch Zeit und Geld kosten. Dann bauen wir genau das, was ihr braucht.",
      process: "Ablauf",
      steps: [
        { n: "01", title: "Kostenloses Gespräch", desc: "Wir verstehen euer Geschäft und wo der Schuh drückt. Ohne Verpflichtung." },
        { n: "02", title: "Analyse & Konzept", desc: "Klarer Plan: welche Systeme, welcher Aufwand, welcher ROI." },
        { n: "03", title: "Umsetzung", desc: "Wir bauen, testen und deployen. Ihr seht jeden Schritt." },
        { n: "04", title: "Übergabe & Wachstum", desc: "Dokumentation, Schulung und optional laufende Betreuung." },
      ],
      cta: "Nicht sicher, wo anfangen?",
      ctaSub: "Genau dafür ist das Erstgespräch da. Unverbindlich, einfach ein Gespräch.",
      ctaBtn: "Kostenloses Gespräch →",
    },
    about: {
      label: "Über uns",
      title: "Keine Berater. Macher.",
      p1: "Wir sind Benedikt & David — ursprünglich aus Österreich und Bayern, heute ein audiovisuelles Duo aus Berlin an der Schnittstelle von elektronischer Musik, KI und Echtzeit-Visualperformance. Schon früh hat uns Musik angezogen — eine Leidenschaft, die sich nach und nach zu breiterer kreativer Experimentierfreude und einer tiefen Neugier für neue Technologien als Ausdrucksmittel entwickelt hat.",
      p2: "Als phasebound produzieren und performen wir Drum & Bass international — mit Future-Neuro- und Dancefloor-Einflüssen, getoppt mit Vocal-Mashups bekannter Pop-Klassiker für eine extra Portion Energie in unseren Live-Sets. Unser musikalischer Weg hat uns natürlich über den Sound hinausgeführt — hin zu Visuals, generativen Systemen und schließlich künstlicher Intelligenz.",
      p3: "Was als reine Neugier begann, wurde schnell zu praktischer Exploration. Wir trainierten eigene ML-Modelle, betrieben Stable Diffusion lokal bevor es Mainstream wurde, und bauten generative Echtzeit-Systeme mit TouchDesigner. Mit der Zeit wuchs dieses Experimentieren zu Live-KI-Visuals, interaktiven Installationen auf großen europäischen Festivals und Automatisierungssystemen für kreative und geschäftliche Workflows.",
      p4: "Heute treibt dieselbe Neugier alles an, was wir bauen — von immersiven audiovisuellen Erlebnissen bis zu praktischen KI-Lösungen für Kreative und Unternehmen. Wir implementieren nicht nur KI. Wir bauen jeden Tag damit.",
    },
    demos: {
      label: "Demos",
      title: "Schick uns deine Musik",
      text: "Wir suchen immer frische Sounds für unsere Sets, Kollaborationen und neue Releases. Wenn du Drum & Bass produzierst — oder irgendetwas zwischen anderen Bass-Genres — schick es rüber.",
      looking: "Was wir suchen",
      items: ["Drum & Bass, 140, Halftime, Dubstep", "Unveröffentlichte Tracks oder Demos", "SoundCloud Private Links bevorzugt", "Kollaborationen und Remix-Ideen willkommen"],
      sent: "Track eingereicht!",
      sentSub: "Wir hören rein. Stay tuned.",
      btn: "Track einreichen →",
    },
    contact: {
      label: "Kontakt",
      title: "Lass uns reden.",
      text: "Ihr habt ein Projekt, eine Idee oder wollt wissen, was möglich wäre? Egal ob Installation, Automatisierung oder KI-Lösung — schreibt uns. Kostenlos und unverbindlich.",
      sent: "Nachricht gesendet!",
      sentSub: "Wir melden uns bald.",
      btn: "Nachricht senden →",
    },
    footer: "Built with AI. Powered by curiosity.",
  },
  es: {
    nav: { work: "Trabajo", music: "Música", services: "Servicios", about: "Nosotros", demos: "Demos", contact: "Contacto" },
    hero: {
      tag: "Creative Technology Studio · Berlín",
      h1a: "",
      h1accent1: "Creamos",
      h1b: "experiencias.",
      h1c: "Del estudio al escenario",
      h1accent2: "más allá.",
      h1prefix: "— y ",
      sub: "Somos artistas, tecnólogos y constructores. Ya sea una instalación inmersiva, una performance en vivo o un sistema inteligente para tu negocio — nos encanta construir. Hagamos algo juntos.",
      cta1: "Nuestro trabajo →",
      cta2: "Contáctanos",
    },
    lf: {
      label: "Lucid Frames",
      title: "Instalación visual interactiva con IA",
      video: "Mira Lucid Frames en acción",
      concept: "Concepto",
      conceptText: "Lucid Frames es una instalación visual interactiva que transforma el movimiento del público en visuales generados por IA en tiempo real. Los visitantes no solo observan — se convierten en parte de la obra. Cada gesto transforma la proyección, creando una experiencia colectiva en constante evolución.",
      how: "Cómo funciona",
      howSteps: "La cámara detecta siluetas. El software analiza el movimiento. La IA genera visuales. La proyección reacciona al instante.",
      featured: "Presentado en",
    },
    music: {
      label: "Música",
      title: "phasebound",
      sub: "Drum & Bass · Berlín",
      desc: "Con el objetivo de enriquecer la escena musical con paisajes sonoros innovadores, Ben & Dave están en una misión para redefinir los límites del Drum & Bass. Fusionando basslines técnicos con capas rítmicas intrincadas y un toque orquestal, mezclan elementos de todo el espectro de subgéneros para crear una perspectiva fresca.",
      releases: "Releases & Sets",
      listen: "Escuchar",
    },
    services: {
      label: "IA & Automatización",
      title: "Primero entendemos el problema. Luego construimos la solución.",
      intro: "Cada negocio es diferente. Empezamos entendiendo tus flujos de trabajo, identificamos dónde la IA y la automatización pueden ahorrarte tiempo y dinero, y construimos una solución a tu medida.",
      areas: ["Automatización de flujos", "Comunicación con IA", "Procesamiento de datos", "Chatbots personalizados"],
      approach: "Nuestro enfoque",
      approachText: "No vendemos productos genéricos. Nos sentamos contigo, aprendemos cómo funciona tu negocio en el día a día, y encontramos los cuellos de botella que te cuestan tiempo y dinero. Luego construimos exactamente lo que necesitas.",
      process: "Proceso",
      steps: [
        { n: "01", title: "Llamada gratuita", desc: "Entendemos tu negocio y dónde están los puntos de dolor. Sin compromiso." },
        { n: "02", title: "Análisis y propuesta", desc: "Plan claro: qué sistemas, qué esfuerzo, qué ROI." },
        { n: "03", title: "Desarrollo y despliegue", desc: "Construimos, probamos y desplegamos. Ves cada paso." },
        { n: "04", title: "Entrega y crecimiento", desc: "Documentación, formación y soporte continuo opcional." },
      ],
      cta: "¿No sabes por dónde empezar?",
      ctaSub: "Para eso es la llamada. Sin compromiso, solo una conversación.",
      ctaBtn: "Llamada gratuita →",
    },
    about: {
      label: "Nosotros",
      title: "No consultores. Constructores.",
      p1: "Somos Ben & Dave — originarios de Austria y Alemania, ahora un dúo audiovisual en Berlín en la intersección de música electrónica, IA y performance visual en tiempo real. Desde jóvenes, la música nos atrajo — una pasión que se expandió gradualmente hacia la experimentación creativa y una profunda curiosidad por la tecnología emergente como medio de expresión.",
      p2: "Como phasebound, producimos y tocamos drum & bass internacionalmente, fusionando influencias future neuro y dancefloor, rematadas con mashups vocales de clásicos pop conocidos para una capa extra de energía en nuestros sets. Nuestro camino musical nos llevó naturalmente más allá del sonido — despertando un interés por lo visual, los sistemas generativos y finalmente la inteligencia artificial.",
      p3: "Lo que empezó como pura curiosidad evolucionó rápidamente en exploración práctica. Entrenamos modelos ML propios, corrimos Stable Diffusion localmente antes de que fuera mainstream, y construimos sistemas visuales generativos en tiempo real con TouchDesigner. Con el tiempo, esta experimentación creció hasta convertirse en visuales con IA en vivo, instalaciones interactivas en grandes festivales europeos y sistemas de automatización para flujos creativos y empresariales.",
      p4: "Hoy, esa misma curiosidad impulsa todo lo que construimos — desde experiencias audiovisuales inmersivas hasta soluciones prácticas de IA para creativos y empresas. No solo implementamos IA. Construimos con ella cada día.",
    },
    demos: {
      label: "Demos",
      title: "Envíanos tu música",
      text: "Siempre buscamos sonidos frescos para nuestros sets, colaboraciones y nuevos lanzamientos. Si produces drum & bass — o cualquier cosa entre otros géneros de bass — mándalo.",
      looking: "Lo que buscamos",
      items: ["Drum & Bass, 140, Halftime, Dubstep", "Tracks inéditos o demos", "Links privados de SoundCloud preferidos", "Colaboraciones y remixes bienvenidos"],
      sent: "¡Track enviado!",
      sentSub: "Le daremos una escucha. Stay tuned.",
      btn: "Enviar track →",
    },
    contact: {
      label: "Contacto",
      title: "Hablemos.",
      text: "¿Tienes un proyecto, una idea o curiosidad por saber qué es posible? Ya sea una instalación, automatización o solución de IA — escríbenos. Gratis y sin compromiso.",
      sent: "¡Mensaje enviado!",
      sentSub: "Nos pondremos en contacto pronto.",
      btn: "Enviar mensaje →",
    },
    footer: "Built with AI. Powered by curiosity.",
  },
  it: {
    nav: { work: "Lavori", music: "Musica", services: "Servizi", about: "Chi siamo", demos: "Demo", contact: "Contatto" },
    hero: {
      tag: "Creative Technology Studio · Berlino",
      h1a: "",
      h1accent1: "Creiamo",
      h1b: "esperienze.",
      h1c: "Dallo studio al palco",
      h1accent2: "oltre.",
      h1prefix: "— e ",
      sub: "Siamo artisti, tecnologi e costruttori. Che si tratti di un'installazione immersiva, una performance dal vivo o un sistema intelligente per il vostro business — ci piace costruire. Creiamo qualcosa insieme.",
      cta1: "I nostri lavori →",
      cta2: "Contattaci",
    },
    lf: {
      label: "Lucid Frames",
      title: "Installazione visiva interattiva con IA",
      video: "Guarda Lucid Frames in azione",
      concept: "Concetto",
      conceptText: "Lucid Frames è un'installazione visiva interattiva che trasforma il movimento del pubblico in visual generati dall'IA in tempo reale. I visitatori non guardano solo — diventano parte dell'opera. Ogni gesto ridisegna la proiezione, creando un'esperienza collettiva in costante evoluzione.",
      how: "Come funziona",
      howSteps: "La telecamera rileva le sagome. Il software analizza il movimento. L'IA genera i visual. La proiezione reagisce istantaneamente al pubblico.",
      featured: "Presentato a",
    },
    music: {
      label: "Musica",
      title: "phasebound",
      sub: "Drum & Bass · Berlino",
      desc: "Con l'obiettivo di arricchire la scena musicale con paesaggi sonori innovativi, Ben & Dave sono in missione per ridefinire i confini del Drum & Bass. Fondendo bassline tecniche con strati ritmici intricati e una ciliegina orchestrale, mescolano elementi dall'intero spettro dei sottogeneri per creare una prospettiva fresca.",
      releases: "Release & Set",
      listen: "Ascolta",
    },
    services: {
      label: "IA & Automazione",
      title: "Prima capiamo il problema. Poi costruiamo la soluzione.",
      intro: "Ogni azienda è diversa. Iniziamo capendo i vostri flussi di lavoro, identifichiamo dove l'IA e l'automazione possono farvi risparmiare tempo e denaro, e costruiamo una soluzione su misura.",
      areas: ["Automazione dei flussi", "Comunicazione con IA", "Elaborazione dati", "Chatbot personalizzati"],
      approach: "Il nostro approccio",
      approachText: "Non vendiamo prodotti standard. Ci sediamo con voi, impariamo come funziona davvero il vostro business, e troviamo i colli di bottiglia che vi costano tempo e denaro. Poi costruiamo esattamente ciò che serve.",
      process: "Processo",
      steps: [
        { n: "01", title: "Chiamata gratuita", desc: "Capiamo il vostro business e dove sono i punti critici. Senza impegno." },
        { n: "02", title: "Analisi e proposta", desc: "Piano chiaro: quali sistemi, quale impegno, quale ROI." },
        { n: "03", title: "Sviluppo e deploy", desc: "Costruiamo, testiamo e pubblichiamo. Vedete ogni passo." },
        { n: "04", title: "Consegna e crescita", desc: "Documentazione, formazione e supporto continuo opzionale." },
      ],
      cta: "Non sai da dove iniziare?",
      ctaSub: "È proprio per questo che c'è la chiamata. Senza impegno, solo una conversazione.",
      ctaBtn: "Chiamata gratuita →",
    },
    about: {
      label: "Chi siamo",
      title: "Non consulenti. Costruttori.",
      p1: "Siamo Ben & Dave — originari di Austria e Germania, oggi un duo audiovisivo di Berlino all'intersezione tra musica elettronica, IA e performance visive in tempo reale. Fin da giovani, la musica ci ha attratto — una passione che si è gradualmente espansa verso la sperimentazione creativa e una profonda curiosità per la tecnologia emergente come mezzo espressivo.",
      p2: "Come phasebound, produciamo e suoniamo drum & bass a livello internazionale, fondendo influenze future neuro e dancefloor, il tutto condito con mashup vocali di classici pop per un'energia extra nei nostri live set. Il nostro percorso musicale ci ha portato naturalmente oltre il suono — accendendo un interesse per il visual, i sistemi generativi e infine l'intelligenza artificiale.",
      p3: "Quella che è iniziata come pura curiosità si è rapidamente trasformata in esplorazione pratica. Abbiamo addestrato modelli ML personalizzati, fatto girare Stable Diffusion in locale prima che diventasse mainstream, e costruito sistemi visivi generativi in tempo reale con TouchDesigner. Col tempo, questa sperimentazione è cresciuta fino a diventare visual IA dal vivo, installazioni interattive nei principali festival europei e sistemi di automazione per flussi creativi e aziendali.",
      p4: "Oggi, la stessa curiosità guida tutto ciò che costruiamo — dalle esperienze audiovisive immersive alle soluzioni IA pratiche per creativi e aziende. Non implementiamo solo l'IA. Costruiamo con essa ogni giorno.",
    },
    demos: {
      label: "Demo",
      title: "Mandaci la tua musica",
      text: "Cerchiamo sempre suoni freschi per i nostri set, collaborazioni e nuove uscite. Se produci drum & bass — o qualsiasi cosa tra gli altri generi bass — mandacelo.",
      looking: "Cosa cerchiamo",
      items: ["Drum & Bass, 140, Halftime, Dubstep", "Track inediti o demo", "Link privati SoundCloud preferiti", "Collaborazioni e remix benvenuti"],
      sent: "Track inviato!",
      sentSub: "Ci daremo un ascolto. Stay tuned.",
      btn: "Invia track →",
    },
    contact: {
      label: "Contatto",
      title: "Parliamo.",
      text: "Avete un progetto, un'idea o siete curiosi di sapere cosa è possibile? Che sia un'installazione, automazione o soluzione IA — scriveteci. Gratuito e senza impegno.",
      sent: "Messaggio inviato!",
      sentSub: "Vi ricontatteremo presto.",
      btn: "Invia messaggio →",
    },
    footer: "Built with AI. Powered by curiosity.",
  },
  fr: {
    nav: { work: "Travaux", music: "Musique", services: "Services", about: "À propos", demos: "Démos", contact: "Contact" },
    hero: {
      tag: "Creative Technology Studio · Berlin",
      h1a: "Nous",
      h1accent1: "créons",
      h1b: "des expériences.",
      h1c: "Du studio à la scène",
      h1accent2: "au-delà.",
      h1prefix: "— et ",
      sub: "Nous sommes artistes, technologues et bâtisseurs. Qu'il s'agisse d'une installation immersive, d'une performance live ou d'un système intelligent pour votre entreprise — nous aimons construire. Créons quelque chose ensemble.",
      cta1: "Nos travaux →",
      cta2: "Contactez-nous",
    },
    lf: {
      label: "Lucid Frames",
      title: "Installation visuelle interactive avec IA",
      video: "Voir Lucid Frames en action",
      concept: "Concept",
      conceptText: "Lucid Frames est une installation visuelle interactive qui transforme les mouvements du public en visuels générés par l'IA en temps réel. Les visiteurs ne regardent pas seulement — ils deviennent partie de l'œuvre. Chaque geste redessine la projection, créant une expérience collective en constante évolution.",
      how: "Comment ça marche",
      howSteps: "La caméra détecte les silhouettes. Le logiciel analyse le mouvement. L'IA génère les visuels. La projection réagit instantanément au public.",
      featured: "Présenté à",
    },
    music: {
      label: "Musique",
      title: "phasebound",
      sub: "Drum & Bass · Berlin",
      desc: "Avec l'ambition d'enrichir la scène musicale avec des paysages sonores innovants, Ben & Dave sont en mission pour redéfinir les frontières du Drum & Bass. En fusionnant des basslines techniques avec des couches rythmiques complexes et une touche orchestrale, ils mélangent des éléments de tout le spectre des sous-genres pour créer une perspective fraîche.",
      releases: "Releases & Sets",
      listen: "Écouter",
    },
    services: {
      label: "IA & Automatisation",
      title: "D'abord comprendre le problème. Puis construire la solution.",
      intro: "Chaque entreprise est différente. Nous commençons par comprendre vos flux de travail, identifions où l'IA et l'automatisation peuvent vous faire gagner du temps et de l'argent, et construisons une solution sur mesure.",
      areas: ["Automatisation des flux", "Communication par IA", "Traitement des données", "Chatbots personnalisés"],
      approach: "Notre approche",
      approachText: "Nous ne vendons pas de produits standardisés. Nous nous asseyons avec vous, apprenons comment votre entreprise fonctionne au quotidien, et trouvons les goulots d'étranglement qui vous coûtent du temps et de l'argent. Puis nous construisons exactement ce qu'il vous faut.",
      process: "Processus",
      steps: [
        { n: "01", title: "Appel découverte gratuit", desc: "Nous comprenons votre activité et vos points de douleur. Sans engagement." },
        { n: "02", title: "Analyse et proposition", desc: "Plan clair : quels systèmes, quel effort, quel ROI." },
        { n: "03", title: "Développement et déploiement", desc: "Nous construisons, testons et déployons. Vous voyez chaque étape." },
        { n: "04", title: "Livraison et croissance", desc: "Documentation, formation et support continu optionnel." },
      ],
      cta: "Pas sûr par où commencer ?",
      ctaSub: "C'est exactement pour ça que l'appel existe. Sans engagement, juste une conversation.",
      ctaBtn: "Appel gratuit →",
    },
    about: {
      label: "À propos",
      title: "Pas des consultants. Des bâtisseurs.",
      p1: "Nous sommes Ben & Dave — originaires d'Autriche et d'Allemagne, aujourd'hui un duo audiovisuel basé à Berlin à l'intersection de la musique électronique, de l'IA et de la performance visuelle en temps réel. Dès notre jeunesse, la musique nous a attirés — une passion qui s'est progressivement étendue vers l'expérimentation créative et une profonde curiosité pour les technologies émergentes comme moyen d'expression.",
      p2: "En tant que phasebound, nous produisons et jouons du drum & bass à l'international, mêlant influences future neuro et dancefloor, le tout relevé de mashups vocaux de classiques pop pour une dose d'énergie supplémentaire dans nos sets live. Notre parcours musical nous a naturellement menés au-delà du son — éveillant un intérêt pour le visuel, les systèmes génératifs et finalement l'intelligence artificielle.",
      p3: "Ce qui a commencé comme pure curiosité s'est rapidement transformé en exploration pratique. Nous avons entraîné nos propres modèles ML, fait tourner Stable Diffusion en local avant que ce ne soit mainstream, et construit des systèmes visuels génératifs en temps réel avec TouchDesigner. Avec le temps, cette expérimentation s'est développée en visuels IA live, installations interactives dans de grands festivals européens et systèmes d'automatisation pour des flux créatifs et professionnels.",
      p4: "Aujourd'hui, cette même curiosité anime tout ce que nous construisons — des expériences audiovisuelles immersives aux solutions IA pratiques pour créatifs et entreprises. Nous n'implémentons pas seulement l'IA. Nous construisons avec elle chaque jour.",
    },
    demos: {
      label: "Démos",
      title: "Envoyez-nous votre musique",
      text: "Nous cherchons toujours des sons frais pour nos sets, collaborations et nouvelles sorties. Si vous produisez du drum & bass — ou quoi que ce soit entre d'autres genres bass — envoyez-le.",
      looking: "Ce que nous cherchons",
      items: ["Drum & Bass, 140, Halftime, Dubstep", "Tracks inédits ou démos", "Liens privés SoundCloud préférés", "Collaborations et remixes bienvenus"],
      sent: "Track soumis !",
      sentSub: "On va écouter ça. Stay tuned.",
      btn: "Soumettre le track →",
    },
    contact: {
      label: "Contact",
      title: "Parlons.",
      text: "Vous avez un projet, une idée ou êtes curieux de savoir ce qui est possible ? Que ce soit une installation, de l'automatisation ou une solution IA — écrivez-nous. Gratuit et sans engagement.",
      sent: "Message envoyé !",
      sentSub: "Nous vous recontacterons bientôt.",
      btn: "Envoyer le message →",
    },
    footer: "Built with AI. Powered by curiosity.",
  },
};

const LangContext = createContext("en");
function useLang() { return useContext(LangContext); }
function useT() { const lang = useLang(); return (translations as any)[lang]; }

// --- DESIGN TOKENS ---
const A = "#aaff45";
const AG = "rgba(170,255,69,0.35)";
const AD = "rgba(170,255,69,0.12)";
const AB = "rgba(170,255,69,0.15)";
const BG = "#0a0a0c";
const S = "rgba(255,255,255,0.025)";
const SH = "rgba(255,255,255,0.05)";
const B = "rgba(255,255,255,0.06)";
const T = "#d0d0d4";
const TD = "#6a6a72";
const TW = "#f0f0f2";

// --- HOOKS ---
function useInView(th = 0.12) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.unobserve(el); } }, { threshold: th });
    obs.observe(el); return () => obs.disconnect();
  }, [th]);
  return [ref, v];
}

function F({ children, delay = 0, direction = "up", style: st = {} }) {
  const [ref, v] = useInView();
  const transforms = {
    up: "translateY(30px)",
    down: "translateY(-30px)",
    left: "translateX(-40px)",
    right: "translateX(40px)",
    scale: "scale(0.92)",
  };
  return <div ref={ref} style={{ ...st, opacity: v ? 1 : 0, transform: v ? "none" : transforms[direction] || transforms.up, transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s` }}>{children}</div>;
}

function HeroParticles() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w, h;
    const particles = [];
    const PARTICLE_COUNT = 60;

    const resize = () => {
      const parent = canvas.parentElement;
      w = parent.offsetWidth;
      h = parent.offsetHeight;
      canvas.width = w * window.devicePixelRatio;
      canvas.height = h * window.devicePixelRatio;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // Initialize particles
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -Math.random() * 0.5 - 0.1,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.4 + 0.05,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.005,
        flickerSpeed: Math.random() * 0.05 + 0.02,
        flickerPhase: Math.random() * Math.PI * 2,
      });
    }

    let time = 0;
    const draw = () => {
      time++;
      ctx.clearRect(0, 0, w, h);

      // Draw connecting lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const lineAlpha = (1 - dist / 120) * 0.06;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(170, 255, 69, ${lineAlpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw and update particles
      for (const p of particles) {
        // Flicker effect
        const flicker = Math.sin(time * p.flickerSpeed + p.flickerPhase);
        const pulseAlpha = p.alpha * (0.6 + 0.4 * Math.sin(time * p.pulseSpeed + p.pulse));
        const finalAlpha = pulseAlpha * (0.7 + 0.3 * flicker);

        // Glow
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 6);
        grd.addColorStop(0, `rgba(170, 255, 69, ${finalAlpha * 0.6})`);
        grd.addColorStop(0.5, `rgba(170, 255, 69, ${finalAlpha * 0.15})`);
        grd.addColorStop(1, "rgba(170, 255, 69, 0)");
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 6, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(170, 255, 69, ${finalAlpha})`;
        ctx.fill();

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around
        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
      }

      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }} />;
}

// --- COMPONENTS ---
function LangSwitcher({ lang, setLang }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const labels = { en: "EN", de: "DE", es: "ES", it: "IT", fr: "FR" };

  useEffect(() => {
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button onClick={() => setOpen(!open)} style={{
        fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 600,
        letterSpacing: "0.06em", textTransform: "uppercase", padding: "6px 12px",
        background: "rgba(255,255,255,0.04)", color: A,
        border: `1px solid ${AB}`, borderRadius: 4, cursor: "pointer",
        display: "flex", alignItems: "center", gap: 6, transition: "all 0.2s",
      }}>
        {labels[lang]}
        <span style={{ fontSize: 8, opacity: 0.6, transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▼</span>
      </button>
      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 6px)", right: 0,
          background: "rgba(16,16,20,0.96)", backdropFilter: "blur(16px)",
          border: `1px solid ${B}`, borderRadius: 6, padding: 4,
          minWidth: 52, zIndex: 200,
          boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
        }}>
          {Object.entries(labels).map(([code, label]) => (
            <button key={code} onClick={() => { setLang(code); setOpen(false); }} style={{
              display: "block", width: "100%", fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11, fontWeight: lang === code ? 600 : 400,
              letterSpacing: "0.06em", textTransform: "uppercase",
              padding: "7px 12px", textAlign: "left",
              background: lang === code ? "rgba(170,255,69,0.1)" : "transparent",
              color: lang === code ? A : TD,
              border: "none", borderRadius: 4, cursor: "pointer",
              transition: "all 0.15s",
            }}
              onMouseEnter={e => { if (lang !== code) e.currentTarget.style.color = TW; }}
              onMouseLeave={e => { if (lang !== code) e.currentTarget.style.color = TD; }}
            >{label}</button>
          ))}
        </div>
      )}
    </div>
  );
}

function Nav({ lang, setLang }) {
  const t = useT();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [workOpen, setWorkOpen] = useState(false);
  const workRef = useRef(null);
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 50); window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn); }, []);
  useEffect(() => {
    const close = (e) => { if (workRef.current && !workRef.current.contains(e.target)) setWorkOpen(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const go = id => { setOpen(false); setWorkOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };

  const navBtnStyle = {
    background: "none", border: "none", cursor: "pointer", fontFamily: "'JetBrains Mono', monospace",
    fontSize: 11.5, letterSpacing: "0.05em", textTransform: "uppercase", color: TD, transition: "color 0.25s", padding: "4px 0",
  };

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 clamp(20px, 4vw, 56px)", height: 60,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled ? "rgba(10,10,12,0.9)" : "transparent", backdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled ? `1px solid ${B}` : "1px solid transparent", transition: "all 0.35s",
    }}>
      <div onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
        <svg width="22" height="22" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: `drop-shadow(0 0 6px ${AG})` }}>
          <path fillRule="evenodd" clipRule="evenodd" d="M547.18,196.23c118.75,85.78,200.67,194.03,230.45,291.43c6.42-28.01,9.81-57.18,9.81-87.16c0-214.25-173.18-387.44-387.44-387.44c-73.6,0-142.34,20.43-200.89,55.95C300.77,66.99,428.82,110.73,547.18,196.23z" fill={A}/>
          <path fillRule="evenodd" clipRule="evenodd" d="M252.32,604.41C134.02,518.94,52.27,411.18,22.21,314.06c-6.31,27.79-9.65,56.72-9.65,86.44c0,214.25,173.18,387.44,387.44,387.44c73.86,0,142.84-20.59,201.53-56.34C499.69,733.97,371.12,690.22,252.32,604.41z" fill={A}/>
          <path fillRule="evenodd" clipRule="evenodd" d="M218.21,269.17c49.92-69.1,130.71-102.21,208.86-93.7c-144.82-73.52-285.98-77.73-341.08-1.45c-55.26,76.5-6.47,209.75,109.57,324.36C162.17,426.58,167.95,338.75,218.21,269.17z" fill={A}/>
          <path fillRule="evenodd" clipRule="evenodd" d="M604.68,303.84c32.58,71.5,26.52,158.55-23.37,227.62C531.07,601,449.56,634.09,370.95,624.99c145.15,73.99,286.81,78.38,342.03,1.93C768.03,550.71,719.79,418.16,604.68,303.84z" fill={A}/>
        </svg>
        <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: "0.08em", color: TW, textTransform: "uppercase" }}>Exosphere</span>
      </div>
      <div className="dsk" style={{ display: "flex", gap: 24, alignItems: "center" }}>
        {/* Work dropdown */}
        <div ref={workRef} style={{ position: "relative" }}>
          <button onClick={() => setWorkOpen(!workOpen)} style={{
            ...navBtnStyle, display: "flex", alignItems: "center", gap: 5,
          }} onMouseEnter={e => e.currentTarget.style.color = A} onMouseLeave={e => { if (!workOpen) e.currentTarget.style.color = TD; }}>
            {t.nav.work}
            <span style={{ fontSize: 7, opacity: 0.5, transform: workOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▼</span>
          </button>
          {workOpen && (
            <div style={{
              position: "absolute", top: "calc(100% + 10px)", left: "50%", transform: "translateX(-50%)",
              background: "rgba(16,16,20,0.96)", backdropFilter: "blur(16px)",
              border: `1px solid ${B}`, borderRadius: 6, padding: 5,
              minWidth: 160, zIndex: 200, boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
            }}>
              <button onClick={() => go("work")} style={{
                display: "block", width: "100%", fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11, letterSpacing: "0.05em", textTransform: "uppercase",
                padding: "8px 14px", textAlign: "left", background: "transparent",
                color: TD, border: "none", borderRadius: 4, cursor: "pointer", transition: "all 0.15s",
              }} onMouseEnter={e => e.currentTarget.style.color = A} onMouseLeave={e => e.currentTarget.style.color = TD}>
                AI Installation
              </button>
              <button onClick={() => go("music")} style={{
                display: "block", width: "100%", fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11, letterSpacing: "0.05em", textTransform: "uppercase",
                padding: "8px 14px", textAlign: "left", background: "transparent",
                color: TD, border: "none", borderRadius: 4, cursor: "pointer", transition: "all 0.15s",
              }} onMouseEnter={e => e.currentTarget.style.color = A} onMouseLeave={e => e.currentTarget.style.color = TD}>
                {t.nav.music || "Music"}
              </button>
            </div>
          )}
        </div>
        {[
          { id: "services", label: t.nav.services },
          { id: "about", label: t.nav.about },
          { id: "demos", label: t.nav.demos },
          { id: "contact", label: t.nav.contact },
        ].map(l => (
          <button key={l.id} onClick={() => go(l.id)} style={navBtnStyle}
            onMouseEnter={e => e.currentTarget.style.color = A} onMouseLeave={e => e.currentTarget.style.color = TD}>{l.label}</button>
        ))}
        <LangSwitcher lang={lang} setLang={setLang} />
      </div>
      <div className="mob" style={{ display: "none", alignItems: "center", gap: 10 }}>
        <LangSwitcher lang={lang} setLang={setLang} />
        <button onClick={() => setOpen(!open)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", gap: 4, padding: 6 }}>
          <span style={{ display: "block", width: 18, height: 1.5, background: TW, transition: "all 0.3s", transform: open ? "rotate(45deg) translate(4px,4px)" : "none" }} />
          <span style={{ display: "block", width: 18, height: 1.5, background: TW, transition: "all 0.3s", opacity: open ? 0 : 1 }} />
          <span style={{ display: "block", width: 18, height: 1.5, background: TW, transition: "all 0.3s", transform: open ? "rotate(-45deg) translate(4px,-4px)" : "none" }} />
        </button>
      </div>
      {open && (
        <div style={{ position: "fixed", top: 60, left: 0, right: 0, bottom: 0, background: "rgba(10,10,12,0.97)", backdropFilter: "blur(20px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 32, zIndex: 99 }}>
          <button onClick={() => go("work")} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 18, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", color: TW }}>AI Installation</button>
          <button onClick={() => go("music")} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 18, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", color: TW }}>{t.nav.music || "Music"}</button>
          <button onClick={() => go("services")} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 18, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", color: TW }}>{t.nav.services}</button>
          <button onClick={() => go("about")} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 18, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", color: TW }}>{t.nav.about}</button>
          <button onClick={() => go("demos")} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 18, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", color: TW }}>{t.nav.demos}</button>
          <button onClick={() => go("contact")} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 18, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", color: TW }}>{t.nav.contact}</button>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  const t = useT();

  return (
    <section
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "100px clamp(20px, 5vw, 72px) 72px", position: "relative", overflow: "hidden", textAlign: "center" }}>
      <HeroParticles />
      <div style={{ position: "absolute", inset: 0, opacity: 0.015, pointerEvents: "none", backgroundImage: `linear-gradient(${A} 1px, transparent 1px), linear-gradient(90deg, ${A} 1px, transparent 1px)`, backgroundSize: "80px 80px" }} />

      <F direction="scale" delay={0}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: A, marginBottom: 28, display: "flex", alignItems: "center", gap: 10, justifyContent: "center" }}>
          <span style={{ width: 28, height: 1, background: A, display: "inline-block" }} />
          {t.hero.tag}
          <span style={{ width: 28, height: 1, background: A, display: "inline-block" }} />
        </div>
      </F>

      <F delay={0.15}>
        <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(32px, 6.5vw, 76px)", fontWeight: 700, lineHeight: 1.06, color: TW, maxWidth: 820, letterSpacing: "-0.025em", position: "relative", zIndex: 1 }}>
          {t.hero.h1a}{t.hero.h1a ? " " : ""}<span style={{ color: A }}>{t.hero.h1accent1}</span> {t.hero.h1b}
          <br />{t.hero.h1c}
          <br /><span style={{ color: TW }}>{t.hero.h1prefix || "— and "}</span><span style={{ color: A }}>{t.hero.h1accent2}</span>
        </h1>
      </F>

      <F delay={0.3}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(15px, 1.8vw, 18px)", lineHeight: 1.7, color: T, maxWidth: 560, marginTop: 24, position: "relative", zIndex: 1 }}>
          {t.hero.sub}
        </p>
      </F>

      <F delay={0.45} direction="up">
        <div style={{ display: "flex", gap: 14, marginTop: 36, flexWrap: "wrap", justifyContent: "center", position: "relative", zIndex: 1 }}>
          <a href="#work" onClick={e => { e.preventDefault(); document.getElementById("work")?.scrollIntoView({ behavior: "smooth" }); }}
            style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: "0.05em", textTransform: "uppercase", padding: "13px 28px", background: A, color: BG, borderRadius: 4, textDecoration: "none", fontWeight: 600, boxShadow: `0 0 18px ${AG}`, transition: "all 0.25s" }}>
            {t.hero.cta1}
          </a>
          <a href="#contact" onClick={e => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
            style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: "0.05em", textTransform: "uppercase", padding: "13px 28px", background: "transparent", color: T, border: `1px solid ${B}`, borderRadius: 4, textDecoration: "none", fontWeight: 500, transition: "all 0.25s" }}>
            {t.hero.cta2}
          </a>
        </div>
      </F>
    </section>
  );
}

function SL({ children }) {
  return <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: A, marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
    <span style={{ width: 18, height: 1, background: A, display: "inline-block" }} />{children}
  </div>;
}

function ST({ children }) {
  return <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(24px, 4.5vw, 44px)", fontWeight: 700, color: TW, lineHeight: 1.1, letterSpacing: "-0.02em", maxWidth: 600, marginBottom: 32 }}>{children}</h2>;
}

function Input({ label, placeholder, type = "text", area = false }) {
  const props = { placeholder, style: { width: "100%", background: "rgba(255,255,255,0.025)", border: `1px solid ${B}`, borderRadius: 4, color: "#fff", fontFamily: "'DM Sans', sans-serif", fontSize: 13, padding: area ? "10px 12px" : "10px 12px", outline: "none", transition: "border-color 0.2s", ...(area ? { height: 90, resize: "vertical" } : {}) },
    onFocus: e => e.currentTarget.style.borderColor = A, onBlur: e => e.currentTarget.style.borderColor = B };
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: TD, display: "block", marginBottom: 5 }}>{label}</label>
      {area ? <textarea {...props} /> : <input type={type} {...props} />}
    </div>
  );
}

function Btn({ children, onClick }) {
  return <button onClick={onClick} style={{ width: "100%", fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: "0.05em", textTransform: "uppercase", padding: "13px 24px", background: A, color: BG, border: "none", borderRadius: 4, fontWeight: 600, cursor: "pointer", boxShadow: `0 0 16px ${AG}`, transition: "all 0.25s" }}>{children}</button>;
}

function LucidFrames() {
  const t = useT();
  return (
    <section id="work" style={{ padding: "80px clamp(20px, 5vw, 72px)" }}>
      <F><SL>{t.lf.label}</SL></F>
      <F delay={0.05}><ST>{t.lf.title}</ST></F>
      <F delay={0.1}>
        <div style={{ borderRadius: 8, maxWidth: 820, overflow: "hidden", marginBottom: 28, aspectRatio: "16/9", position: "relative", background: "#000" }}>
          <iframe
            width="100%" height="100%"
            src="https://www.youtube.com/embed/T9GiCOk4SvY?rel=0&modestbranding=1&color=white"
            title="Lucid Frames"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          />
        </div>
      </F>
      <F delay={0.12}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11.5, color: TD, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 10, marginTop: 4 }}>Live at Festivals & Clubs</div>
        <div style={{ borderRadius: 8, maxWidth: 820, overflow: "hidden", marginBottom: 28, aspectRatio: "16/9", position: "relative", background: "#000" }}>
          <iframe
            width="100%" height="100%"
            src="https://www.youtube.com/embed/iFUxGE9vORo?rel=0&modestbranding=1&color=white"
            title="Lucid Frames — Live"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          />
        </div>
      </F>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 14, maxWidth: 820 }}>
        <F delay={0.15} direction="left">
          <div style={{ background: S, border: `1px solid ${B}`, borderRadius: 8, padding: "22px 20px" }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: A, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>{t.lf.concept}</div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, lineHeight: 1.7, color: T }}>{t.lf.conceptText}</p>
          </div>
        </F>
        <F delay={0.2} direction="up">
          <div style={{ background: S, border: `1px solid ${B}`, borderRadius: 8, padding: "22px 20px" }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: A, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>{t.lf.how}</div>
            <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
              {["Motion Tracking", "Live Data Processing", "AI Generation", "Projection Output"].map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TW, padding: "4px 10px", background: "rgba(170,255,69,0.08)", borderRadius: 3, border: `1px solid ${AB}` }}>{s}</span>
                  {i < 3 && <span style={{ color: A, fontSize: 14, fontWeight: 600 }}>→</span>}
                </div>
              ))}
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, lineHeight: 1.6, color: TD }}>{t.lf.howSteps}</p>
          </div>
        </F>
        <F delay={0.25} direction="right">
          <div style={{ background: S, border: `1px solid ${B}`, borderRadius: 8, padding: "22px 20px" }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: A, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>{t.lf.featured}</div>
            {["Fusion Festival", "Subardo Festival", "Club Sisyphos Berlin", "KitKat Club Berlin"].map((v, i) => (
              <div key={i} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: T, padding: "6px 0 6px 14px", borderLeft: `2px solid ${i === 0 ? A : B}` }}>{v}</div>
            ))}
          </div>
        </F>
      </div>
      <F delay={0.3}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: 20, maxWidth: 820 }}>
          {["Experience Area", "Artist Live Visual", "Stage Visual Add-On", "Night Program Feature", "Interactive Art Zone"].map(tag => (
            <span key={tag} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.04em", padding: "6px 13px", background: AD, border: `1px solid ${AB}`, borderRadius: 14, color: A }}>{tag}</span>
          ))}
        </div>
      </F>
      <F delay={0.35}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 20, maxWidth: 820 }}>
          <a href="https://www.instagram.com/lucidframesvision/" target="_blank" rel="noopener noreferrer" style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.04em",
            padding: "10px 18px", background: S, border: `1px solid ${B}`, borderRadius: 6,
            color: TD, textDecoration: "none", transition: "all 0.25s",
            display: "inline-flex", alignItems: "center", gap: 8,
          }} onMouseEnter={e => { e.currentTarget.style.borderColor = A; e.currentTarget.style.color = A; }}
             onMouseLeave={e => { e.currentTarget.style.borderColor = B; e.currentTarget.style.color = TD; }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> Instagram
          </a>
          <a href="/docs/lucid-frames-pitch-sheet.pdf" target="_blank" rel="noopener noreferrer" style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.04em",
            padding: "10px 18px", background: S, border: `1px solid ${B}`, borderRadius: 6,
            color: TD, textDecoration: "none", transition: "all 0.25s",
            display: "inline-flex", alignItems: "center", gap: 8,
          }} onMouseEnter={e => { e.currentTarget.style.borderColor = A; e.currentTarget.style.color = A; }}
             onMouseLeave={e => { e.currentTarget.style.borderColor = B; e.currentTarget.style.color = TD; }}>
            📄 Pitch Sheet (PDF)
          </a>
          <a href="/docs/lucid-frames-whitepaper.pdf" target="_blank" rel="noopener noreferrer" style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.04em",
            padding: "10px 18px", background: S, border: `1px solid ${B}`, borderRadius: 6,
            color: TD, textDecoration: "none", transition: "all 0.25s",
            display: "inline-flex", alignItems: "center", gap: 8,
          }} onMouseEnter={e => { e.currentTarget.style.borderColor = A; e.currentTarget.style.color = A; }}
             onMouseLeave={e => { e.currentTarget.style.borderColor = B; e.currentTarget.style.color = TD; }}>
            📄 Whitepaper (PDF)
          </a>
        </div>
      </F>
      <F delay={0.4}>
        <div style={{
          marginTop: 32, maxWidth: 820, padding: "28px 28px",
          background: "rgba(170,255,69,0.04)", border: `1px solid ${AB}`,
          borderRadius: 10, display: "flex", alignItems: "center",
          justifyContent: "space-between", flexWrap: "wrap", gap: 16,
        }}>
          <div>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 18, fontWeight: 700, color: TW, marginBottom: 4 }}>
              Want this at your event?
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: TD }}>
              Festivals, clubs, brand activations, exhibitions — we bring Lucid Frames to you.
            </p>
          </div>
          <a href="#contact" onClick={e => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
            style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: "0.05em",
              textTransform: "uppercase", padding: "12px 24px", background: A, color: BG,
              borderRadius: 4, textDecoration: "none", fontWeight: 600,
              boxShadow: `0 0 16px ${AG}`, transition: "all 0.25s", whiteSpace: "nowrap",
            }}>
            Book Lucid Frames →
          </a>
        </div>
      </F>
    </section>
  );
}

function Music() {
  const t = useT();
  return (
    <section id="music" style={{ padding: "80px clamp(20px, 5vw, 72px)", borderTop: `1px solid ${B}` }}>
      <F><SL>{t.music.label}</SL></F>
      <F delay={0.05}><ST>{t.music.title}</ST></F>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 28, alignItems: "start", maxWidth: 820 }}>
        <F delay={0.1}>
          <div>
            {/* Two portrait photos side by side */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
              <img src="/images/phasebound-ben.jpg" alt="Ben" style={{ width: "100%", height: 280, objectFit: "cover", borderRadius: 8 }} />
              <img src="/images/phasebound-dave.jpg" alt="Dave" style={{ width: "100%", height: 280, objectFit: "cover", borderRadius: 8 }} />
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14.5, lineHeight: 1.75, color: T, marginBottom: 16 }}>
              {t.music.desc}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
              {[
                { label: "Instagram", url: "https://www.instagram.com/phasebound/", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
                { label: "Spotify", url: "https://open.spotify.com/artist/2wI3gN0C7gGvTxC4up6KPv", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg> },
                { label: "SoundCloud", url: "https://soundcloud.com/phasebound", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.098.101.098.05 0 .09-.04.099-.098l.255-2.105-.27-2.154c-.009-.06-.05-.1-.1-.1m-.899.828c-.06 0-.091.037-.104.094L0 14.479l.172 1.308c.013.06.045.094.104.094.059 0 .09-.037.104-.094l.194-1.308-.194-1.332c-.014-.057-.045-.094-.104-.094m1.81-.78c-.067 0-.12.054-.127.12l-.206 2.083.206 2.066c.007.066.06.12.126.12.066 0 .12-.054.127-.12l.234-2.066-.234-2.084c-.008-.066-.06-.12-.127-.12m.891-.142c-.074 0-.133.06-.14.134l-.193 2.225.193 2.203c.007.074.066.134.14.134s.133-.06.14-.134l.218-2.203-.218-2.225c-.007-.074-.066-.134-.14-.134m.904-.088c-.08 0-.147.067-.153.148l-.18 2.313.18 2.276c.006.08.074.148.153.148.08 0 .147-.067.154-.148l.204-2.276-.204-2.313c-.007-.08-.074-.148-.154-.148m.906.01c-.088 0-.16.073-.166.162l-.167 2.302.167 2.254c.006.088.078.162.166.162.088 0 .16-.074.166-.163l.19-2.253-.19-2.302c-.006-.09-.078-.163-.166-.163m.928-.648c-.027-.006-.054-.006-.08 0-.088 0-.161.08-.168.176l-.154 2.94.154 2.218c.007.096.08.176.169.176.088 0 .16-.08.168-.176l.174-2.218-.174-2.94c-.008-.096-.08-.176-.169-.176m.895-.156c-.096 0-.176.087-.183.19l-.14 3.096.14 2.186c.007.104.087.19.184.19.096 0 .176-.086.183-.19l.16-2.186-.16-3.096c-.007-.103-.087-.19-.183-.19m.91-.136c-.104 0-.19.093-.198.204l-.127 3.232.127 2.163c.008.11.094.203.198.203s.19-.093.197-.203l.145-2.163-.145-3.232c-.007-.11-.093-.204-.197-.204m.897-.214c-.112 0-.204.1-.211.218l-.114 3.446.114 2.15c.007.12.1.22.211.22.112 0 .204-.1.212-.22l.128-2.15-.128-3.446c-.008-.12-.1-.218-.212-.218m.915-.198c-.12 0-.218.107-.225.232l-.1 3.644.1 2.134c.007.126.106.232.225.232.12 0 .218-.106.226-.232l.114-2.134-.114-3.644c-.008-.126-.106-.232-.226-.232m.922.072c-.128 0-.232.113-.24.246l-.086 3.572.086 2.122c.008.133.112.246.24.246.127 0 .232-.113.24-.246l.098-2.122-.098-3.572c-.008-.133-.113-.246-.24-.246m.92-.168c-.135 0-.247.12-.254.26l-.072 3.74.072 2.108c.007.14.12.26.255.26.136 0 .248-.12.255-.26l.082-2.108-.082-3.74c-.007-.14-.12-.26-.255-.26m.938-.008c-.143 0-.26.127-.268.274l-.06 3.748.06 2.094c.008.147.125.274.268.274.142 0 .26-.127.267-.274l.068-2.094-.068-3.748c-.007-.147-.125-.274-.267-.274m2.478 1.228c-.374 0-.734.06-1.072.168-.146-1.666-1.556-2.97-3.273-2.97-.464 0-.91.1-1.305.27-.158.066-.2.134-.202.266v5.864c.002.14.114.258.254.27h5.598c1.08 0 1.956-.876 1.956-1.956s-.876-1.912-1.956-1.912"/></svg> },
                { label: "YouTube", url: "https://www.youtube.com/@exosphereaudio", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg> },
              ].map(l => (
                <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer" style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 10, padding: "7px 12px",
                  background: S, border: `1px solid ${B}`, borderRadius: 4, color: TD,
                  textDecoration: "none", transition: "all 0.25s",
                  display: "inline-flex", alignItems: "center", gap: 6,
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = A; e.currentTarget.style.color = A; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = B; e.currentTarget.style.color = TD; }}>
                  {l.icon} {l.label}
                </a>
              ))}
            </div>
          </div>
        </F>
      </div>
    </section>
  );
}

function Services() {
  const t = useT();
  return (
    <section id="services" style={{ padding: "80px clamp(20px, 5vw, 72px)" }}>
      <F><SL>{t.services.label}</SL></F>
      <F delay={0.05}><ST>{t.services.title}</ST></F>
      <F delay={0.1}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, lineHeight: 1.75, color: T, maxWidth: 600, marginBottom: 28 }}>
          {t.services.intro}
        </p>
      </F>

      <F delay={0.15}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 40, maxWidth: 600 }}>
          {t.services.areas.map((area, i) => (
            <span key={i} style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.04em",
              padding: "8px 16px", background: AD, border: `1px solid ${AB}`,
              borderRadius: 6, color: A,
            }}>{area}</span>
          ))}
        </div>
      </F>

      <F delay={0.2}>
        <div style={{
          maxWidth: 600, padding: "24px 24px",
          background: S, border: `1px solid ${B}`, borderRadius: 10,
          marginBottom: 40,
        }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: A, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>
            {t.services.approach}
          </div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, lineHeight: 1.7, color: T }}>
            {t.services.approachText}
          </p>
        </div>
      </F>

      <div style={{ marginTop: 16 }}>
        <F><SL>{t.services.process}</SL></F>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 18, marginTop: 6 }}>
          {t.services.steps.map((s, i) => (
            <F key={i} delay={i * 0.05}>
              <div style={{ paddingLeft: 14, borderLeft: `2px solid ${B}`, transition: "border-color 0.3s" }}
                onMouseEnter={e => e.currentTarget.style.borderLeftColor = A} onMouseLeave={e => e.currentTarget.style.borderLeftColor = B}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: A, letterSpacing: "0.1em", marginBottom: 7 }}>→ {s.n}</div>
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 600, color: TW, marginBottom: 6 }}>{s.title}</div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12.5, lineHeight: 1.6, color: T }}>{s.desc}</p>
              </div>
            </F>
          ))}
        </div>
      </div>

      <F delay={0.3}>
        <div style={{
          marginTop: 36, maxWidth: 600, padding: "24px 24px",
          background: "rgba(170,255,69,0.04)", border: `1px solid ${AB}`,
          borderRadius: 10, display: "flex", alignItems: "center",
          justifyContent: "space-between", flexWrap: "wrap", gap: 16,
        }}>
          <div>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 16, fontWeight: 700, color: TW, marginBottom: 4 }}>
              {t.services.cta}
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: TD }}>
              {t.services.ctaSub}
            </p>
          </div>
          <a href="#contact" onClick={e => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
            style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: "0.05em",
              textTransform: "uppercase", padding: "12px 24px", background: A, color: BG,
              borderRadius: 4, textDecoration: "none", fontWeight: 600,
              boxShadow: `0 0 16px ${AG}`, transition: "all 0.25s", whiteSpace: "nowrap",
            }}>
            {t.services.ctaBtn}
          </a>
        </div>
      </F>
    </section>
  );
}

function About() {
  const t = useT();
  return (
    <section id="about" style={{ padding: "80px clamp(20px, 5vw, 72px)" }}>
      <F><SL>{t.about.label}</SL></F>
      <F delay={0.05}><ST>{t.about.title}</ST></F>
      <div style={{ maxWidth: 720 }}>
        <F delay={0.1}>
          <img src="/images/exosphere-team.jpg" alt="Ben and Dave" style={{ width: "100%", height: 340, objectFit: "cover", borderRadius: 8, marginBottom: 28 }} />
        </F>
        <F delay={0.15}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, lineHeight: 1.8, color: T, marginBottom: 16 }}>{t.about.p1}</p>
        </F>
        <F delay={0.2}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, lineHeight: 1.8, color: T, marginBottom: 16 }}>{t.about.p2}</p>
        </F>
        <F delay={0.25}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, lineHeight: 1.8, color: T, marginBottom: 16 }}>{t.about.p3}</p>
        </F>
        <F delay={0.3}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, lineHeight: 1.8, color: TW, fontWeight: 600, marginBottom: 24 }}>{t.about.p4}</p>
        </F>
        <F delay={0.35}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 16 }}>
            {["Make.com","n8n","OpenClaw","ComfyUI","Stable Diffusion","TouchDesigner","Stream Diffusion","TensorFlow","Runway","ElevenLabs"].map(tag => (
              <span key={tag} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, padding: "5px 10px", border: `1px solid ${AB}`, borderRadius: 3, color: A, background: AD }}>{tag}</span>
            ))}
          </div>
        </F>
      </div>
    </section>
  );
}

function Demos() {
  const t = useT();
  const [sent, setSent] = useState(false);
  return (
    <section id="demos" style={{ padding: "80px clamp(20px, 5vw, 72px)", borderTop: `1px solid ${B}`, background: "rgba(170,255,69,0.008)" }}>
      <F><SL>{t.demos.label}</SL></F>
      <F delay={0.05}><ST>{t.demos.title}</ST></F>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: 28, alignItems: "start" }}>
        <F delay={0.1}>
          <div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14.5, lineHeight: 1.75, color: T, marginBottom: 18 }}>{t.demos.text}</p>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: A, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 9 }}>{t.demos.looking}</div>
            {t.demos.items.map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <div style={{ width: 4, height: 4, borderRadius: "50%", background: A, flexShrink: 0 }} />
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: T }}>{item}</span>
              </div>
            ))}
          </div>
        </F>
        <F delay={0.16}>
          <div style={{ background: S, border: `1px solid ${B}`, borderRadius: 8, padding: "22px 20px" }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "36px 0" }}>
                <div style={{ fontSize: 26, marginBottom: 10 }}>🎵</div>
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, fontWeight: 600, color: A, marginBottom: 5 }}>{t.demos.sent}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TD }}>{t.demos.sentSub}</div>
              </div>
            ) : (
              <>
                <Input label="Artist Name" placeholder="Your name or alias" />
                <Input label="E-Mail" placeholder="artist@email.com" type="email" />
                <Input label="SoundCloud / Streaming Link" placeholder="https://soundcloud.com/..." />
                <Input label="Message (optional)" placeholder="Tell us about the track..." area />
                <Btn onClick={() => setSent(true)}>{t.demos.btn}</Btn>
              </>
            )}
          </div>
        </F>
      </div>
    </section>
  );
}

function Contact() {
  const t = useT();
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" style={{ padding: "80px clamp(20px, 5vw, 72px)" }}>
      <F><SL>{t.contact.label}</SL></F>
      <F delay={0.05}><ST>{t.contact.title}</ST></F>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: 28, alignItems: "start" }}>
        <F delay={0.1}>
          <div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14.5, lineHeight: 1.75, color: T, marginBottom: 22 }}>{t.contact.text}</p>
            {[
              { icon: "✉", label: "E-Mail", value: "hello@exosphere.studio" },
              { icon: "📍", label: "Location", value: "Berlin, Germany" },
              { icon: "🌍", label: "Languages", value: "Deutsch · English · Español · Français · Italiano" },
            ].map(d => (
              <div key={d.label} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 14 }}>
                <div style={{ width: 26, height: 26, border: `1px solid ${AB}`, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, flexShrink: 0 }}>{d.icon}</div>
                <div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.1em", color: TD, marginBottom: 2 }}>{d.label}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: TW }}>{d.value}</div>
                </div>
              </div>
            ))}
          </div>
        </F>
        <F delay={0.16}>
          <div style={{ background: S, border: `1px solid ${B}`, borderRadius: 8, padding: "22px 20px" }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "36px 0" }}>
                <div style={{ fontSize: 26, marginBottom: 10 }}>✓</div>
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, fontWeight: 600, color: A, marginBottom: 5 }}>{t.contact.sent}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TD }}>{t.contact.sentSub}</div>
              </div>
            ) : (
              <>
                <Input label="Name" placeholder="Your name" />
                <Input label="E-Mail" placeholder="you@company.com" type="email" />
                <Input label="Message" placeholder="Tell us about your project..." area />
                <Btn onClick={() => setSent(true)}>{t.contact.btn}</Btn>
              </>
            )}
          </div>
        </F>
      </div>
    </section>
  );
}

function Footer() {
  const t = useT();
  return (
    <footer style={{ padding: "28px clamp(20px, 5vw, 72px)", borderTop: `1px solid ${B}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, position: "relative", zIndex: 1 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <svg width="14" height="14" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M547.18,196.23c118.75,85.78,200.67,194.03,230.45,291.43c6.42-28.01,9.81-57.18,9.81-87.16c0-214.25-173.18-387.44-387.44-387.44c-73.6,0-142.34,20.43-200.89,55.95C300.77,66.99,428.82,110.73,547.18,196.23z" fill={TD}/>
          <path fillRule="evenodd" clipRule="evenodd" d="M252.32,604.41C134.02,518.94,52.27,411.18,22.21,314.06c-6.31,27.79-9.65,56.72-9.65,86.44c0,214.25,173.18,387.44,387.44,387.44c73.86,0,142.84-20.59,201.53-56.34C499.69,733.97,371.12,690.22,252.32,604.41z" fill={TD}/>
          <path fillRule="evenodd" clipRule="evenodd" d="M218.21,269.17c49.92-69.1,130.71-102.21,208.86-93.7c-144.82-73.52-285.98-77.73-341.08-1.45c-55.26,76.5-6.47,209.75,109.57,324.36C162.17,426.58,167.95,338.75,218.21,269.17z" fill={TD}/>
          <path fillRule="evenodd" clipRule="evenodd" d="M604.68,303.84c32.58,71.5,26.52,158.55-23.37,227.62C531.07,601,449.56,634.09,370.95,624.99c145.15,73.99,286.81,78.38,342.03,1.93C768.03,550.71,719.79,418.16,604.68,303.84z" fill={TD}/>
        </svg>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: TD }}>Exosphere</span>
      </div>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: TD }}>Exosphere © 2026</div>
    </footer>
  );
}

function GlobalTrail() {
  const canvasRef = useRef(null);
  const trailRef = useRef([]);
  const mouseRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    const onLeave = () => { mouseRef.current = { x: -100, y: -100 }; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    const TRAIL_LENGTH = 50;
    const draw = () => {
      const trail = trailRef.current;
      const mouse = mouseRef.current;
      if (mouse.x > 0 && mouse.y > 0) trail.push({ x: mouse.x, y: mouse.y });
      if (trail.length > TRAIL_LENGTH) trail.splice(0, trail.length - TRAIL_LENGTH);

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (let i = 1; i < trail.length; i++) {
        const p1 = trail[i];
        const progress = i / trail.length;
        // Fade out near the top (nav area) — fully invisible above 20px, full strength below 100px
        const navFade = Math.min(1, Math.max(0, (p1.y - 20) / 80));
        const alpha = progress * 0.18 * navFade;
        const radius = progress * 55 + 6;
        if (alpha < 0.001) continue;
        const grd = ctx.createRadialGradient(p1.x, p1.y, 0, p1.x, p1.y, radius);
        grd.addColorStop(0, `rgba(170, 255, 69, ${alpha})`);
        grd.addColorStop(0.4, `rgba(170, 255, 69, ${alpha * 0.25})`);
        grd.addColorStop(1, "rgba(170, 255, 69, 0)");
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
        if (i > trail.length * 0.7) {
          const p0 = trail[i - 1];
          ctx.beginPath();
          ctx.moveTo(p0.x, p0.y);
          ctx.lineTo(p1.x, p1.y);
          ctx.strokeStyle = `rgba(170, 255, 69, ${progress * 0.06 * navFade})`;
          ctx.lineWidth = progress * 2.5;
          ctx.lineCap = "round";
          ctx.stroke();
        }
      }
      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }} />;
}

export default function App() {
  const [lang, setLang] = useState("en");
  return (
    <LangContext.Provider value={lang}>
      <div style={{ background: BG, color: T, minHeight: "100vh", fontFamily: "'DM Sans', sans-serif", overflowX: "hidden" }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
          *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
          html{scroll-behavior:smooth}
          body{background:${BG}}
          ::selection{background:${A};color:${BG}}
          ::-webkit-scrollbar{width:5px}
          ::-webkit-scrollbar-track{background:${BG}}
          ::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.08);border-radius:3px}
          @media(max-width:700px){
            .dsk{display:none!important}
            .mob{display:flex!important}
          }
          @media(min-width:701px){
            .dsk{display:flex!important}
            .mob{display:none!important}
          }
        `}</style>
        <GlobalTrail />
        <div style={{ position: "relative", zIndex: 1 }}>
          <Nav lang={lang} setLang={setLang} />
          <Hero />
          <LucidFrames />
          <Music />
          <Services />
          <About />
          <Demos />
          <Contact />
          <Footer />
        </div>
      </div>
    </LangContext.Provider>
  );
}

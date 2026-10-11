import { useState, useEffect, useRef } from 'react';

/* ─── Wedding Knowledge Base ─── */
const WEDDING_KB = {
  couple: {
    bride: 'M. Shabana Arshi',
    groom: 'B. Kalith',
  },
  event: {
    date: '13th December, 2026',
    day: 'Sunday',
    venue: 'The Radnej Convention and Resort',
    address: 'Dindigul - Bangalore Highway, Agaram, Thadicombu, Dindigul – 624709, Tamil Nadu',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=The+Radnej+Convention+and+Resort+Dindigul+Bangalore+Highway',
  },
};

/* ─── Smart Reply Engine ─── */
function generateReply(input) {
  const q = input.toLowerCase().trim();
  const { couple, event } = WEDDING_KB;

  // ── Greetings ──
  if (/^(hi|hello|hey|salam|assalamu|salaam|as-salamu|yo|sup|hiya|howdy)/i.test(q)) {
    const greets = [
      `Wa Alaikum Assalam! 🌙\n\nSo glad you're here! I'm **Ashes AI Bot**, here for the Nikah invitation of **${couple.bride}** & **${couple.groom}**. Ask me anything about the big day! ✨`,
      `Hey there! 😊\n\nWelcome! I'm **Ashes AI Bot**, your assistant for **Shabana & Kalith's Nikah** on **${event.date}**. What would you like to know? 🌙`,
      `Assalamu Alaikum! 🌙\n\nLoving that you stopped by! I'm **Ashes AI Bot**, ready to tell you all about the beautiful Nikah of **${couple.bride}** & **${couple.groom}**. Fire away! ✦`,
    ];
    return greets[Math.floor(Math.random() * greets.length)];
  }

  // ── How are you ──
  if (/\b(how are you|how r u|how are u|you okay|you good|u good|how's it going|how do you do|what's up|wassup|whats up)\b/.test(q)) {
    return `I'm doing absolutely wonderful, Alhamdulillah! 😊✨\n\nSo excited about the upcoming Nikah of **${couple.bride}** & **${couple.groom}** on **${event.date}**! The celebration energy is contagious! 🎉\n\nHow about you? Excited for the big day? 🌙`;
  }

  // ── Who are you / about the bot ──
  if (/\b(who are you|what are you|your name|bot name|are you a bot|are you ai|are you human|are you real|ashes)\b/.test(q)) {
    return `I'm **Ashes AI Bot** 🌙✨\n\nCreated specially for the Nikah celebration of **${couple.bride}** & **${couple.groom}**!\n\nI know everything about the big day — venue, date, schedule, dress code, food, and blessings. I may be an AI, but my excitement for this wedding is very real! 🎊`;
  }

  // ── Congratulations / Islamic expressions ──
  if (/\b(congrats|congratulations|mabrook|mubarak|mashallah|masha allah|alhamdulillah|subhanallah)\b/.test(q)) {
    return `Masha Allah! 💛\n\nAmeen, Jazakallah Khair for the beautiful wishes! 🤲\n\nMay Allah bless **${couple.bride}** & **${couple.groom}** with a lifetime of love, happiness, and His mercy. Ameen! 🌙✨`;
  }

  // ── Excited ──
  if (/\b(excited|can't wait|cant wait|so excited|so happy|looking forward|thrilled|pumped|hyped)\b/.test(q)) {
    const diff = new Date('2026-12-13T10:00:00') - new Date();
    const days = Math.max(0, Math.floor(diff / 86400000));
    return `Yesss! The excitement is REAL!! 🎉🎊\n\nOnly **${days} days** until the most beautiful Nikah! December 13th is going to be absolutely magical. ✨\n\nShabana & Kalith's love story is truly one for the books — Masha Allah! 💍🌙`;
  }

  // ── Love story ──
  if (/\b(love story|how did they meet|how they met|their story)\b/.test(q)) {
    return `Aww, you want to hear the love story! 💕\n\nAll we'll say is — **${couple.bride}** & **${couple.groom}** found in each other exactly what Allah had planned. A match written in the heavens! 🌙\n\n*وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا*\n\n_"And of His signs is that He created for you mates from among yourselves"_ — Surah Ar-Rum 30:21 ✨`;
  }

  // ── Food / biryani / feast ──
  if (/\b(food|eat|biryani|feast|dinner|lunch|menu|snacks|sweets|halwa|mutton|chicken|rice|kebab|kheer|payasam)\b/.test(q)) {
    return `Ohh now we're talking! 😄🍽️\n\nA grand Nikah feast is part of the celebration — expect a **lavish spread** befitting such a blessed occasion!\n\nFrom aromatic biryanis to melt-in-your-mouth sweets, the walima will be legendary! 🌙✨\n\nMake sure to come hungry! 😋`;
  }

  // ── Music / entertainment ──
  if (/\b(music|song|nasheeds|nasheed|qawwali|entertainment|dance|sing|dj|band)\b/.test(q)) {
    return `Great vibes incoming! 🎵✨\n\nThe Nikah atmosphere will be filled with the warmth of family, laughter, and beautiful nasheeds celebrating this blessed union.\n\nIt's going to be a night full of joy and heartfelt moments! 🌙💛`;
  }

  // ── Photos / photographer ──
  if (/\b(photo|photos|photography|photographer|picture|pictures|selfie|camera|shoot|memories)\b/.test(q)) {
    return `Say cheese! 📸✨\n\nEvery moment of the Nikah of **${couple.bride}** & **${couple.groom}** will be beautifully captured to cherish forever!\n\nDon't forget to take your own pictures too — you'll want to remember this magical day! 🌙💍`;
  }

  // ── Gifts ──
  if (/\b(gift|gifts|present|presents|what to bring|what should i bring|give)\b/.test(q)) {
    return `How sweet of you to think of gifts! 🎁💛\n\nYour presence, prayers, and warm duas for **${couple.bride}** & **${couple.groom}** are truly the greatest gift of all!\n\nOf course, thoughtful gifts are always appreciated — but what matters most is that you join us and share in the joy! 🌙✨`;
  }

  // ── Kids / children ──
  if (/\b(kids|children|child|babies|family friendly|bring kids|toddler)\b/.test(q)) {
    return `Absolutely, families are most welcome! 👶🧒💛\n\nA Nikah is a beautiful family occasion — bring the little ones along to witness this blessed union and soak in the joyful atmosphere! 🌙✨`;
  }

  // ── Joke ──
  if (/\b(joke|funny|lol|lmao|haha|hehe|make me laugh|tell me a joke)\b/.test(q)) {
    return `Haha okay okay! 😄\n\nWhy did the groom smile so much at the Nikah?\n\n...Because he finally found his **other half** — and she said **YES**! 😂💍\n\nBut seriously, **${couple.bride}** & **${couple.groom}** are a match made in Jannah. We couldn't be happier! 🌙💛`;
  }

  // ── Compliments to the site ──
  if (/\b(beautiful|gorgeous|amazing|lovely|stunning|wow|nice|great|awesome|fantastic|pretty|elegant|perfect)\b/.test(q) && !/bride|groom|couple/.test(q)) {
    return `Aww thank you so much! 🥰✨\n\nThis invitation was crafted with lots of love to celebrate the beautiful Nikah of **${couple.bride}** & **${couple.groom}**! 💍\n\nEverything about this day is going to be just as special — can't wait to see you there! 🌙`;
  }

  // ── Emotional / nervous ──
  if (/\b(nervous|emotional|cry|crying|tears|happy tears|so sweet|touching|heartwarming|feels)\b/.test(q)) {
    return `Awww 🥺💛 We totally get it!\n\nWeddings have a way of touching our hearts. The Nikah of **${couple.bride}** & **${couple.groom}** is going to be an absolutely beautiful, emotional, and joyful day!\n\nBring some tissues — happy tears are very much expected! 😊🌙`;
  }

  // ── Weather ──
  if (/\b(weather|rain|sunny|cold|hot|temperature|season|december weather|winter)\b/.test(q)) {
    return `Great question! 🌤️\n\n**December in Dindigul** is usually lovely — pleasantly cool and perfect for a celebration! Expect temperatures around **20–27°C** (68–80°F).\n\nIdeal weather for a grand Nikah! Come dressed comfortably and elegantly. ✨🌙`;
  }

  // ── Parking / facilities ──
  if (/\b(park|parking|facilities|toilet|washroom|accessibility|wheelchair)\b/.test(q)) {
    return `**The Radnej Convention and Resort** is a full-fledged venue with ample parking and modern facilities for all guests! 🏛️\n\nIf you have any special requirements, feel free to reach out to the family. They'll be happy to accommodate! 💛🌙`;
  }

  // ── Plus one / bring someone ──
  if (/\b(plus one|plus-one|bring someone|my partner|my wife|my husband|bring a friend|with someone)\b/.test(q)) {
    return `Of course! 🎉\n\nAll guests are welcome to bring their families and loved ones. The more the merrier — this is a joyful occasion meant to be shared! 💛\n\nJust arrive with warm hearts and smiles, and the celebration will be complete! 🌙✨`;
  }

  // ── Short yes/no/okay ──
  if (/^(yes|yeah|yep|yup|sure|ok|okay|k|alright|fine|got it|noted|cool|nice)$/.test(q)) {
    return `Awesome! 😊✨\n\nIs there anything else you'd like to know about the Nikah celebration? I'm here to help! 🌙`;
  }
  if (/^(no|nope|nah|not really|nothing|nvm|nevermind)$/.test(q)) {
    return `No worries at all! 😊\n\nFeel free to come back anytime you have questions about the big day. Can't wait to celebrate with you! 🌙💛`;
  }

  // ── Wedding date ──
  if (/\b(date|when|day|time)\b/.test(q) && !/venue|place|where|location/.test(q)) {
    return `📅 The Nikah ceremony is on:\n\n**${event.date}** — a beautiful Sunday\n\n_Alhamdulillah, the blessed day is almost here!_ 🤍`;
  }

  // ── Venue ──
  if (/\b(venue|where|location|place|address|mahal|hall|resort)\b/.test(q)) {
    return `🏛️ **Ceremony Venue:**\n\n**${event.venue}**\n📍 ${event.address}\n\nYou can [open Google Maps](${event.mapsUrl}) for directions. ✦`;
  }

  // ── Bride ──
  if (/\b(bride|shabana|girl|she|her)\b/.test(q)) {
    return `🌹 **The Bride:**\n\n**${couple.bride}**\n\nMay Allah bless her with happiness and a beautiful Nikah. Masha Allah! 💛`;
  }

  // ── Groom ──
  if (/\b(groom|kalith|boy|he|him|his)\b/.test(q)) {
    return `✨ **The Groom:**\n\n**${couple.groom}**\n\nMay Allah bless him and grant them a joyful union. Masha Allah! 💛`;
  }

  // ── Couple ──
  if (/\b(couple|both|names|who|marriage|nikah|wedding)\b/.test(q) && !/venue|date|when|where/.test(q)) {
    return `💍 **The Blessed Couple:**\n\n🌹 Bride — **${couple.bride}**\n✨ Groom — **${couple.groom}**\n\n📅 Getting married on **${event.date}** at **${event.venue}**, Dindigul.\n\nبَارَكَ اللهُ لَهُمَا 🤍`;
  }

  // ── Dress code ──
  if (/\b(dress|wear|attire|clothes|outfit|code)\b/.test(q)) {
    return `👗 While no strict dress code is specified, guests are encouraged to dress modestly and elegantly.\n\nSuggested colors: **ivory, gold, emerald, or deep maroon**. ✨`;
  }

  // ── Dua ──
  if (/\b(dua|bless|blessing|prayer|pray)\b/.test(q)) {
    return `🤲 **Wedding Dua:**\n\n*بَارَكَ اللهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ*\n\n_"May Allah bless you both, bless upon you, and unite you both in goodness."_\n\nAmeen! 💛`;
  }

  // ── RSVP ──
  if (/\b(rsvp|confirm|attend|coming|join|invite|invitation)\b/.test(q)) {
    return `🎉 We would be honored by your presence!\n\nNikah of **${couple.bride}** & **${couple.groom}**\n📅 **${event.date}**\n🏛️ **${event.venue}**, Dindigul\n\nCome and grace the day with your blessings! 🌙`;
  }

  // ── Directions ──
  if (/\b(travel|get there|reach|transport|route|direction)\b/.test(q)) {
    return `🗺️ **Getting There:**\n\n**${event.venue}** is on the Dindigul - Bangalore Highway — easy to reach by road.\n\n[🗺️ Open Google Maps](${event.mapsUrl})\n\nOr scan the QR code in the Details section! 📷`;
  }

  // ── Countdown ──
  if (/\b(countdown|how long|how many days|left|remaining|soon)\b/.test(q)) {
    const diff = new Date('2026-12-13T10:00:00') - new Date();
    if (diff <= 0) return `🎊 The Nikah has already taken place — may Allah bless their union forever! Ameen. 💛`;
    const days = Math.floor(diff / 86400000);
    return `⏳ Only **${days} days** remaining until the blessed Nikah!\n\n📅 **${event.date}** — can't wait! 🌙`;
  }

  // ── Thank you ──
  if (/\b(thank|thanks|shukran|jazak)\b/.test(q)) {
    return `Wa Iyyakum! 🌙\n\nJazakAllah Khair for your warm wishes. May Allah bless you and all who attend. Ameen! 💛`;
  }

  // ── Goodbye ──
  if (/\b(bye|goodbye|see you|take care|wassalam|later|cya|gotta go|gtg)\b/.test(q)) {
    return `Wa Alaikum Assalam wa Rahmatullahi wa Barakatuh! 🌙\n\nLooking forward to celebrating with you on **${event.date}**! Take care and see you there! 💛`;
  }

  // ── Help ──
  if (/\b(help|what can|options|tell me|info|ask|menu)\b/.test(q)) {
    return `✦ **I can help you with:**\n\n📅 Wedding date & time\n🏛️ Venue & directions\n💍 Bride & groom details\n🤲 Wedding duas & blessings\n⏳ Countdown to the Nikah\n👗 Dress code suggestions\n🎉 RSVP & attendance\n🍽️ Food & celebrations\n📸 Photography memories\n🎁 Gift ideas\n💬 Casual chat!\n\nJust ask naturally! 😊`;
  }

  // ── Randomized fallback ──
  const fallbacks = [
    `🌙 That's a fun one! I may not have a specific answer for that!\n\nMeanwhile, can I tell you about the **Nikah of ${couple.bride} & ${couple.groom}** on **${event.date}**? 😊✨`,
    `Hmm, I'm not sure about that one! 😄\n\nBut I *do* know everything about the big wedding day on **${event.date}** at **${event.venue}**! Try asking me about the date, venue, or couple! 🌙`,
    `Great question! I'll leave that one to the experts 😄\n\nWhat I *can* tell you is that the Nikah of **${couple.bride} & ${couple.groom}** is going to be absolutely beautiful! Anything specific about the wedding I can help with? ✨`,
  ];
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}

const QUICK_REPLIES = [
  { label: '📅 Date?', text: 'When is the wedding?' },
  { label: '🏛️ Venue?', text: 'Where is the venue?' },
  { label: '💍 Couple?', text: 'Tell me about the couple' },
  { label: '🍽️ Food?', text: 'What about the food?' },
  { label: '⏳ Countdown', text: 'How many days left?' },
  { label: '🤲 Dua', text: 'Share the wedding dua' },
  { label: '👗 Dress code?', text: 'What should I wear?' },
  { label: '🎁 Gifts?', text: 'What should I bring as a gift?' },
  { label: '🗺️ Directions', text: 'How do I get there?' },
  { label: '😄 Tell a joke!', text: 'Tell me a joke' },
];

function formatTime(d) {
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function renderText(text) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    if (/^\*\*(.+)\*\*$/.test(part)) return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (/^\*(.+)\*$/.test(part)) return <em key={i}>{part.slice(1, -1)}</em>;
    const linkMatch = part.match(/^\[(.+)\]\((.+)\)$/);
    if (linkMatch) return <a key={i} href={linkMatch[2]} target="_blank" rel="noopener noreferrer" className="wb-link">{linkMatch[1]}</a>;
    return part.split('\n').map((line, j, arr) => (
      <span key={`${i}-${j}`}>{line}{j < arr.length - 1 && <br />}</span>
    ));
  });
}

function MessageBubble({ msg }) {
  const isBot = msg.role === 'bot';
  return (
    <div className={`wb-message ${isBot ? 'wb-bot' : 'wb-user'}`}>
      {isBot && <div className="wb-avatar"><span>☽</span></div>}
      <div className={`wb-bubble ${isBot ? 'wb-bubble-bot' : 'wb-bubble-user'}`}>
        <div className="wb-bubble-text">{renderText(msg.text)}</div>
        <span className="wb-timestamp">{msg.time}</span>
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="wb-message wb-bot">
      <div className="wb-avatar"><span>☽</span></div>
      <div className="wb-bubble wb-bubble-bot wb-typing">
        <span className="wb-dot" /><span className="wb-dot" /><span className="wb-dot" />
      </div>
    </div>
  );
}

export default function WeddingBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{
    role: 'bot',
    text: "Assalamu Alaikum! 🌙\n\nI'm **Ashes AI Bot**, your personal assistant for **Shabana & Kalith's Nikah**! Ask me anything about the date, venue, timings, dress code, food, or blessings. ✦",
    time: formatTime(new Date()),
  }]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [hasNew, setHasNew] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setHasNew(false);
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  function sendMessage(text) {
    const userText = (text || input).trim();
    if (!userText) return;
    setMessages(prev => [...prev, { role: 'user', text: userText, time: formatTime(new Date()) }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      const reply = generateReply(userText);
      setMessages(prev => [...prev, { role: 'bot', text: reply, time: formatTime(new Date()) }]);
      if (!open) setHasNew(true);
    }, 900 + Math.random() * 600);
  }

  return (
    <>
      <button
        id="wedding-bot-trigger"
        className={`wb-trigger ${open ? 'wb-trigger-open' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-label="Open Ashes AI Bot"
        title="Chat with Ashes AI Bot"
      >
        {open ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <span className="wb-trigger-icon">☽<span className="wb-trigger-sparkle">✦</span></span>
        )}
        {hasNew && !open && <span className="wb-new-badge" />}
      </button>

      <div className={`wb-panel ${open ? 'wb-panel-open' : ''}`} role="dialog" aria-label="Ashes AI Bot Chat">
        <div className="wb-header">
          <div className="wb-header-pattern" />
          <div className="wb-header-content">
            <div className="wb-header-avatar"><span>☽</span></div>
            <div className="wb-header-info">
              <div className="wb-header-title-wrap">
                <h3 className="wb-header-title wb-ashes-title">
                  <span className="wb-ashes-name">ASHES</span>
                  <span className="wb-ai-badge">AI BOT</span>
                </h3>
              </div>
              <span className="wb-header-sub">Shabana &amp; Kalith · 13 Dec 2026</span>
            </div>
            <div className="wb-header-status">
              <span className="wb-online-dot" />
              <span>Online</span>
            </div>
          </div>
        </div>

        <div className="wb-messages" id="wb-messages-list">
          {messages.map((msg, i) => <MessageBubble key={i} msg={msg} />)}
          {typing && <TypingIndicator />}
          <div ref={bottomRef} />
        </div>

        <div className="wb-quick-replies" aria-label="Quick replies">
          {QUICK_REPLIES.map((qr, i) => (
            <button key={i} id={`wb-chip-${i}`} className="wb-chip" onClick={() => sendMessage(qr.text)}>
              {qr.label}
            </button>
          ))}
        </div>

        <div className="wb-input-row">
          <input
            ref={inputRef}
            id="wb-input"
            className="wb-input"
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
            placeholder="Ask about the wedding…"
            autoComplete="off"
          />
          <button
            id="wb-send-btn"
            className="wb-send"
            onClick={() => sendMessage()}
            disabled={!input.trim()}
            aria-label="Send"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>

        <div className="wb-footer-note">
          <span>بِسْمِ اللهِ</span><span>·</span><span>Nikah 2026</span>
        </div>
      </div>

      {open && <div className="wb-backdrop" onClick={() => setOpen(false)} />}
    </>
  );
}

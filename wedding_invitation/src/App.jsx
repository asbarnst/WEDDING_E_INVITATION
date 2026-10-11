import { useState, useEffect, useRef } from 'react';
import './index.css';
import WeddingBot from './WeddingBot';

/* ─── Floating Stars Component ─── */
const FloatingStars = () => {
  const stars = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: `${Math.random() * 5}s`,
    size: `${0.6 + Math.random() * 1}rem`,
  }));
  return (
    <>
      {stars.map(s => (
        <span
          key={s.id}
          className="floating-star"
          style={{ left: s.left, top: s.top, animationDelay: s.delay, fontSize: s.size }}
        >
          ✦
        </span>
      ))}
    </>
  );
};

/* ─── Reveal Hook ─── */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible'); },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ─── Countdown Hook ─── */
function useCountdown(targetDate) {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const update = () => {
      const diff = new Date(targetDate) - new Date();
      if (diff <= 0) {
        setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTime({
        days:    Math.floor(diff / 86400000),
        hours:   Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000)  / 60000),
        seconds: Math.floor((diff % 60000)    / 1000),
      });
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  return time;
}

/* ─── Section Title ─── */
function SectionTitle({ label, title, subtitle, highlight }) {
  const ref = useReveal();
  return (
    <div className="section-title-wrap reveal" ref={ref}>
      <span className="section-label">{label}</span>
      <h2 className="section-title">
        {title} {highlight && <span>{highlight}</span>}
      </h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
}

/* ─── Ornament ─── */
function Ornament() {
  return (
    <div className="ornament-line">
      <hr />
      <span className="ornament-center">☽ ✦ ☾</span>
      <hr />
    </div>
  );
}

/* ─── Nav ─── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <a href="#home" className="nav-logo-group">
        <img src="/ks_logo.png" alt="KS Monogram Logo" className="nav-logo-icon" />
        <span className="nav-logo">
          <span className="nav-logo-nikah">Nikah</span>
          <span className="nav-logo-invitation">Invitation</span>
        </span>
      </a>
      <ul className="nav-links">
        <li><a href="#couple">Couple</a></li>
        <li><a href="#gallery">Engagement Shoot</a></li>
        <li><a href="#details">Details</a></li>
        <li><a href="#countdown">Countdown</a></li>
        <li><a href="#blessings">Blessings</a></li>
      </ul>
    </nav>
  );
}

/* ─── Hero ─── */
function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-bg" />
      <div className="hero-pattern" />
      <FloatingStars />

      <div className="hero-content">
        <div className="hero-crest-wrap">
          <img src="/ks_logo.png" alt="Kalith & Shabana Royal Monogram" className="hero-crest-icon" />
        </div>
        <span className="hero-bismillah">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيمِ</span>
        <span className="hero-sub-arabic">In the name of Allah, the Most Gracious, the Most Merciful</span>

        <p className="hero-invite-text">✦ You are cordially invited to the Nikah of ✦</p>

        <div className="hero-divider">
          <div className="hero-divider-line" />
          <span className="hero-divider-icon">✦</span>
          <div className="hero-divider-line right" />
        </div>

        <div className="hero-names">
          <span className="hero-bride-name shimmer-text">M. Shabana Arshee</span>
          <span className="hero-and">و</span>
          <span className="hero-groom-name shimmer-text">B. Kalith</span>
        </div>

        <div className="hero-event-badge">
          <span>☽</span>
          <span className="nikah-badge-text">Nikah Ceremony</span>
          <span>☾</span>
        </div>

        <p className="hero-date">13th December, 2026</p>
      </div>

      <div className="scroll-indicator">
        <span>Scroll</span>
        <div className="scroll-arrow" />
      </div>
    </section>
  );
}

/* ─── Couple Section ─── */
function CoupleSection() {
  const ref1 = useReveal();
  const ref2 = useReveal();
  const ref3 = useReveal();
  return (
    <section className="couple-section" id="couple">
      <SectionTitle
        label="The Blessed Union"
        title="Meet the"
        highlight="Couple"
        subtitle="Two souls united in the bond of Nikah, Alhamdulillah"
      />
      <Ornament />

      <div className="couple-grid">
        {/* Bride */}
        <div className="couple-card reveal" ref={ref1}>
          <div className="photo-frame bride-frame">
            <img src="/bride.jpg" alt="M. Shabana Arshee – Bride" loading="lazy" style={{ objectPosition: 'top center' }} />
          </div>
          <p className="couple-role">✦ The Bride ✦</p>
          <h3 className="couple-name">M. Shabana Arshee</h3>
        </div>

        {/* Center Symbol */}
        <div className="couple-center reveal" ref={ref2}>
          <img src="/ks_logo.png" alt="Kalith & Shabana Monogram" className="couple-crest-icon" />
          <span className="and-symbol">و</span>
          <span style={{ fontFamily: 'var(--font-arabic)', color: 'var(--gold-light)', fontSize: '1.2rem', textAlign: 'center' }}>
            وَمِنْ آيَاتِهِ
          </span>
        </div>

        {/* Groom */}
        <div className="couple-card reveal" ref={ref3}>
          <div className="photo-frame groom-frame">
            <img src="/groom_portrait.jpg" alt="B. Kalith – Groom" loading="lazy" style={{ objectPosition: 'top center' }} />
          </div>
          <p className="couple-role">✦ The Groom ✦</p>
          <h3 className="couple-name">B. Kalith</h3>
        </div>
      </div>
    </section>
  );
}

/* ─── Gallery Section ─── */
function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const revealRef = useReveal();

  const photos = [
    {
      src: '/engagement5.jpg',
      alt: 'M. Shabana Arshee & B. Kalith – Royal Engagement Portrait',
      title: 'Royal Elegance',
      subtitle: 'M. Shabana Arshee & B. Kalith',
    },
    {
      src: '/engagement3.jpg',
      alt: 'M. Shabana Arshee & B. Kalith – Joyful Dance',
      title: 'Joy & Celebration',
      subtitle: 'Twirling into Forever',
    },
    {
      src: '/engagement1.jpg',
      alt: 'M. Shabana Arshee & B. Kalith – Hand in Hand',
      title: 'Eternal Bond',
      subtitle: 'Hand in Hand',
    },
    {
      src: '/engagement4.jpg',
      alt: 'M. Shabana Arshee & B. Kalith – Sweet Embrace',
      title: 'Tender Embrace',
      subtitle: 'United in Hearts',
    },
    {
      src: '/engagement2.jpg',
      alt: 'Bridal Henna – KS Monogram Mehndi Details',
      title: 'Henna & Blessings',
      subtitle: 'KS Monogram Mehndi Art',
      wide: true,
    },
  ];

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') setLightboxIndex((prev) => (prev + 1) % photos.length);
      if (e.key === 'ArrowLeft') setLightboxIndex((prev) => (prev - 1 + photos.length) % photos.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, photos.length]);

  return (
    <section className="gallery-section" id="gallery">
      <SectionTitle
        label="Our Story"
        title="Engagement"
        highlight="Shoot"
        subtitle="Cherished moments celebrating love and togetherness"
      />
      <Ornament />

      <div className="gallery-grid reveal" ref={revealRef}>
        {photos.map((p, i) => (
          <div
            key={i}
            className={`gallery-item ${p.wide ? 'wide' : ''}`}
            onClick={() => setLightboxIndex(i)}
          >
            <img src={p.src} alt={p.alt} loading="lazy" />
            <div className="gallery-overlay" />
            <div className="gallery-caption-bar">
              <span className="gallery-caption-title">{p.title}</span>
              <span className="gallery-caption-sub">{p.subtitle}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox with navigation */}
      {lightboxIndex !== null && (
        <div
          className="lightbox-backdrop"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            className="lightbox-close"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex(null);
            }}
            aria-label="Close"
          >
            ✕
          </button>

          <button
            className="lightbox-nav-btn prev"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((lightboxIndex - 1 + photos.length) % photos.length);
            }}
            aria-label="Previous"
          >
            ‹
          </button>

          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={photos[lightboxIndex].src}
              alt={photos[lightboxIndex].alt}
              className="lightbox-img"
            />
            <div className="lightbox-footer">
              <div className="lightbox-text">
                <span className="lightbox-title">{photos[lightboxIndex].title}</span>
                <span className="lightbox-sub">{photos[lightboxIndex].subtitle}</span>
              </div>
              <span className="lightbox-counter">
                {lightboxIndex + 1} / {photos.length}
              </span>
            </div>
          </div>

          <button
            className="lightbox-nav-btn next"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((lightboxIndex + 1) % photos.length);
            }}
            aria-label="Next"
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
}

/* ─── Event Details ─── */
function DetailsSection() {
  const venueRef = useReveal();
  const cards = [
    { icon: '☽', label: 'Ceremony', value: 'Nikah', sub: 'The Sacred Bond' },
    { icon: '📅', label: 'Date', value: '13th December', sub: '2026 • Sunday' },
    { icon: '🏛️', label: 'Mahal / Venue', value: 'The Radnej Convention', sub: 'Agaram, Dindigul' },
    { icon: '🕌', label: 'Occasion', value: 'Nikah Ceremony', sub: 'Islamic Marriage' },
    { icon: '🌹', label: 'Bride', value: 'M. Shabana Arshee', sub: 'Daughter of the Family' },
    { icon: '✨', label: 'Groom', value: 'B. Kalith', sub: 'Son of the Family' },
  ];

  return (
    <section className="details-section" id="details">
      <SectionTitle
        label="Ceremony Details"
        title="Wedding"
        highlight="Information"
        subtitle="All the details you need for the blessed occasion"
      />
      <Ornament />

      <div className="details-grid">
        {cards.map((c, i) => {
          const ref = useReveal(); // eslint-disable-line
          return (
            <div key={i} className="detail-card reveal" ref={ref} style={{ animationDelay: `${i * 0.1}s` }}>
              <span className="detail-icon">{c.icon}</span>
              <p className="detail-label">{c.label}</p>
              <p className={`detail-value${(c.value === 'Nikah' || c.value === 'Nikah Ceremony') ? ' nikah-value' : ''}`}>{c.value}</p>
              <p className="detail-sub">{c.sub}</p>
            </div>
          );
        })}
      </div>

      {/* ─── Ceremony Mahal & Location QR Showcase ─── */}
      <div className="venue-showcase reveal" ref={venueRef}>
        <div className="venue-showcase-card">
          <div className="venue-info-side">
            <div className="venue-badge">
              <span className="venue-badge-icon">🏛️</span>
              <span className="venue-badge-text">Ceremony Mahal & Venue</span>
            </div>

            <h3 className="venue-title">The Radnej Convention and Resort</h3>

            <div className="venue-address-box">
              <span className="venue-pin-icon">📍</span>
              <p className="venue-address-text">
                Dindigul - Bangalore Highway, Agaram, Thadicombu,<br />
                Dindigul – 624709, Tamil Nadu
              </p>
            </div>

            <p className="venue-note">
              ✦ Easy highway access & grand celebration banquet for all blessed guests ✦
            </p>

            <div className="venue-action-buttons">
              <a
                href="https://www.google.com/maps/search/?api=1&query=The+Radnej+Convention+and+Resort+Dindigul+Bangalore+Highway"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-venue-maps"
              >
                <span>🗺️</span> Open Google Maps Navigation
              </a>
            </div>
          </div>

          <div className="venue-qr-side">
            <div className="venue-qr-frame">
              <div className="qr-corner top-left" />
              <div className="qr-corner top-right" />
              <div className="qr-corner bottom-left" />
              <div className="qr-corner bottom-right" />
              <img
                src="/venue_qr.jpg"
                alt="Venue Location QR Code – The Radnej Convention and Resort"
                className="venue-qr-image"
              />
              <span className="qr-scan-hint">
                <span>📷</span> Scan for GPS Location
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Countdown ─── */
function CountdownSection() {
  const time = useCountdown('2026-12-13T10:00:00');
  const ref = useReveal();
  const items = [
    { number: time.days,    label: 'Days' },
    { number: time.hours,   label: 'Hours' },
    { number: time.minutes, label: 'Minutes' },
    { number: time.seconds, label: 'Seconds' },
  ];
  return (
    <section className="countdown-section" id="countdown">
      <SectionTitle
        label="Counting Down"
        title="Time Until the"
        highlight="Nikah"
        subtitle="The blessed day is almost here – 13th December, 2026"
      />

      <div className="countdown-grid reveal" ref={ref}>
        {items.map((item, i) => (
          <div key={i} className="countdown-item">
            <span className="countdown-number">
              {String(item.number).padStart(2, '0')}
            </span>
            <span className="countdown-label">{item.label}</span>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '3rem', textAlign: 'center' }}>
        <span style={{
          fontFamily: 'var(--font-arabic)',
          fontSize: '2rem',
          color: 'var(--gold-primary)',
          textShadow: '0 0 20px rgba(201,169,110,0.4)',
        }}>
          اللَّهُمَّ بَارِكْ لَهُمَا
        </span>
        <p style={{ fontFamily: 'var(--font-body)', color: 'var(--gold-light)', fontStyle: 'italic', marginTop: '0.5rem' }}>
          O Allah, bless them both
        </p>
      </div>
    </section>
  );
}

/* ─── Islamic Verses ─── */
function BlessingsSection() {
  const ref1 = useReveal();
  const ref2 = useReveal();

  return (
    <section className="verse-section" id="blessings">
      <SectionTitle
        label="From the Holy Quran"
        title="Divine"
        highlight="Blessings"
        subtitle="Allah's words illuminate this sacred union"
      />
      <Ornament />

      <div className="quran-verse reveal" ref={ref1}>
        <p className="verse-arabic">
          وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
        </p>
        <p className="verse-translation">
          "And of His signs is that He created for you from yourselves mates that you may find tranquillity in them; and He placed between you affection and mercy."
        </p>
        <p className="verse-ref">— Surah Ar-Rum (30:21)</p>
      </div>

      <div className="quran-verse reveal" ref={ref2}>
        <p className="verse-arabic">
          هُنَّ لِبَاسٌ لَّكُمْ وَأَنتُمْ لِبَاسٌ لَّهُنَّ
        </p>
        <p className="verse-translation">
          "They are a garment for you, and you are a garment for them."
        </p>
        <p className="verse-ref">— Surah Al-Baqarah (2:187)</p>
      </div>
    </section>
  );
}

/* ─── RSVP / Message ─── */
function InvitationMessage() {
  const ref = useReveal();
  return (
    <section className="rsvp-section" id="message">
      <SectionTitle
        label="Join Us"
        title="You Are"
        highlight="Invited"
      />
      <Ornament />

      <div className="rsvp-message reveal" ref={ref}>
        <p>
          With hearts full of gratitude and joy, we invite you to join us as we celebrate
          the union of <strong style={{ color: 'var(--gold-primary)' }}>M. Shabana Arshee</strong> and{' '}
          <strong style={{ color: 'var(--gold-primary)' }}>B. Kalith</strong> in the holy bond of
          Nikah on the blessed occasion of{' '}
          <strong style={{ color: 'var(--cream)' }}>13th December, 2026</strong>.
        </p>
        <br />
        <p>
          Your presence, prayers, and blessings mean the world to us. Come, share in our joy
          and grace this day with your love. Masha Allah — may this union be filled with
          Allah's infinite blessings, love, and mercy.
        </p>
        <p className="rsvp-dua" style={{ marginTop: '2rem' }}>
          بَارَكَ اللهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
        </p>
        <p style={{ fontFamily: 'var(--font-body)', color: 'var(--gold-light)', fontStyle: 'italic', marginTop: '0.75rem', fontSize: '0.9rem' }}>
          "May Allah bless you both, and unite you both in goodness."
        </p>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="footer">
      <div className="pattern-border" style={{ marginBottom: '2rem' }} />

      <img src="/ks_logo.png" alt="Kalith & Shabana Monogram Emblem" className="footer-crest-icon" />
      <span className="footer-names">Shabana ♥ Kalith</span>
      <p className="footer-date">13th December, 2026</p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
        {['☽', '✦', '❋', '✦', '☾'].map((s, i) => (
          <span key={i} style={{ color: 'var(--gold-primary)', fontSize: '1.2rem' }}>{s}</span>
        ))}
      </div>

      <p style={{ fontFamily: 'var(--font-arabic)', fontSize: '1.6rem', color: 'var(--gold-primary)', marginBottom: '0.75rem' }}>
        ماشاء الله
      </p>

      <p className="footer-bottom">
        Crafted with ❤️ in celebration of a blessed union • Nikah 2026
      </p>

      <div className="pattern-border" style={{ marginTop: '2rem' }} />
    </footer>
  );
}

/* ─── App ─── */
export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <CoupleSection />
      <GallerySection />
      <DetailsSection />
      <CountdownSection />
      <BlessingsSection />
      <InvitationMessage />
      <Footer />
      <WeddingBot />
    </>
  );
}

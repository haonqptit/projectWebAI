import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

import anhVuong from '../Urin/Anhvuong.png';
import anhTron from '../Urin/anhTron.png';

const publicAsset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;

interface BucketListItem {
  id: number;
  text: string;
  icon: string;
  bgColor: string;
}

const leftItems: BucketListItem[] = [
  { id: 1, text: 'watch the sunrise at the beach', icon: '🌅', bgColor: '#ffe5d9' },
  { id: 2, text: 'go on a beach picnic', icon: '🧺', bgColor: '#ffd1dc' },
  { id: 3, text: 'take a sunset beach walk', icon: '🌅', bgColor: '#ffe9d6' },
  { id: 4, text: 'go swimming in the ocean', icon: '🌊', bgColor: '#d8f3dc' },
  { id: 5, text: 'read a book in the sand', icon: '📖', bgColor: '#cbebf6' },
  { id: 6, text: 'make s’mores at the beach', icon: '🥪', bgColor: '#e8dff5' },
  { id: 7, text: 'go paddle boarding or kayaking', icon: '🛶', bgColor: '#d8e2dc' },
  { id: 8, text: 'visit a cute coastal town', icon: '🛵', bgColor: '#ece4db' },
  { id: 9, text: 'take lots of pictures', icon: '📸', bgColor: '#ffd1dc' },
  { id: 10, text: 'try acai or frozen treats', icon: '🍧', bgColor: '#e8dff5' },
];

const rightItems: BucketListItem[] = [
  { id: 11, text: 'have a movie night outside', icon: '🍿', bgColor: '#ffe5d9' },
  { id: 12, text: 'go thrifting for cute finds', icon: '🛍️', bgColor: '#ffd1dc' },
  { id: 13, text: 'make a summer playlist', icon: '🎵', bgColor: '#ffe9d6' },
  { id: 14, text: 'do a beach clean up', icon: '🐚', bgColor: '#d8f3dc' },
  { id: 15, text: 'go on a boat day', icon: '⛵', bgColor: '#cbebf6' },
  { id: 16, text: 'bake something delicious', icon: '🍪', bgColor: '#ffe5d9' },
  { id: 17, text: 'have a sleepover', icon: '☁️', bgColor: '#ffd1dc' },
  { id: 18, text: 'write in a journal', icon: '📔', bgColor: '#ffe9d6' },
  { id: 19, text: 'have a spa day', icon: '💆‍♀️', bgColor: '#e8dff5' },
  { id: 20, text: 'be present & enjoy the little things', icon: '🌈', bgColor: '#d8f3dc' },
];

const thingsILove = ['Tea', 'Good music', 'Traveling', 'Photography', 'Sunny days', 'Flowers'];

const UrinBucketList = () => {
  const [checkedIds, setCheckedIds] = useState<number[]>([]);

  const toggleItem = (id: number) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const renderItem = (item: BucketListItem) => {
    const isChecked = checkedIds.includes(item.id);
    return (
      <button
        type="button"
        key={item.id}
        className={`urin-bucket-item ${isChecked ? 'urin-bucket-item-checked' : ''}`}
        style={{ backgroundColor: item.bgColor }}
        onClick={() => toggleItem(item.id)}
      >
        <div className="urin-bucket-checkbox">
          {isChecked && (
            <svg viewBox="0 0 24 24" className="urin-bucket-checkbox-tick">
              <path
                d="M 5 12 L 10 17 L 19 8"
                fill="none"
                stroke="#70523d"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
        <span className="urin-bucket-item-text">{item.text}</span>
        <span className="urin-bucket-item-icon">{item.icon}</span>
      </button>
    );
  };

  return (
    <section className="urin-bucket-section">
      <div className="urin-bucket-card">
        {/* Realistic Washi Tape */}
        <div className="urin-washi-tape urin-tape-card-tr"></div>
        <div className="urin-washi-tape urin-tape-card-bl"></div>

        {/* Absolute SVG Decorations */}
        {/* Sun Top Left */}
        <svg viewBox="0 0 100 100" className="urin-bucket-decor urin-decor-sun">
          <circle cx="50" cy="50" r="22" fill="#ffd175" stroke="#70523d" strokeWidth="2.5"/>
          <path d="M 50 12 L 50 20 M 50 80 L 50 88 M 12 50 L 20 50 M 80 50 L 88 50 M 23 23 L 29 29 M 77 77 L 71 71 M 77 23 L 71 29 M 23 77 L 29 71" stroke="#70523d" strokeWidth="2.5" strokeLinecap="round"/>
          <circle cx="44" cy="46" r="2" fill="#70523d"/>
          <circle cx="56" cy="46" r="2" fill="#70523d"/>
          <path d="M 46 54 Q 50 58 54 54" fill="none" stroke="#70523d" strokeWidth="2" strokeLinecap="round"/>
        </svg>

        {/* Palm Tree Top Right */}
        <svg viewBox="0 0 120 120" className="urin-bucket-decor urin-decor-palm">
          <path d="M 85 105 Q 75 60 90 35 Q 92 30 87 35 Q 70 60 80 105" fill="#c39b78" stroke="#70523d" strokeWidth="2.5"/>
          <path d="M 81 90 Q 77 92 82 93 M 78 75 Q 75 77 81 78 M 79 55 Q 76 56 83 58" stroke="#70523d" strokeWidth="2"/>
          <path d="M 90 35 Q 115 45 105 55 Q 95 45 90 35" fill="#a3b899" stroke="#70523d" strokeWidth="2"/>
          <path d="M 90 35 Q 110 20 120 30 Q 105 35 90 35" fill="#a3b899" stroke="#70523d" strokeWidth="2"/>
          <path d="M 90 35 Q 85 10 70 15 Q 80 25 90 35" fill="#a3b899" stroke="#70523d" strokeWidth="2"/>
          <path d="M 90 35 Q 60 25 55 35 Q 75 35 90 35" fill="#a3b899" stroke="#70523d" strokeWidth="2"/>
          <path d="M 90 35 Q 70 50 65 65 Q 80 50 90 35" fill="#a3b899" stroke="#70523d" strokeWidth="2"/>
          <circle cx="83" cy="38" r="4.5" fill="#9e7a5c" stroke="#70523d" strokeWidth="1.5"/>
          <circle cx="91" cy="41" r="4.5" fill="#9e7a5c" stroke="#70523d" strokeWidth="1.5"/>
        </svg>

        {/* Surfboard Bottom Left */}
        <svg viewBox="0 0 60 160" className="urin-bucket-decor urin-decor-surfboard">
          <path d="M 30 5 Q 52 45 52 110 Q 52 145 35 155 Q 30 157 25 155 Q 8 145 8 110 Q 8 45 30 5 Z" fill="#ffe5d9" stroke="#70523d" strokeWidth="2.5"/>
          <path d="M 30 5 Q 42 45 42 110 Q 42 145 32 154.5 L 30 155 L 28 154.5 Q 18 145 18 110 Q 18 45 30 5 Z" fill="#ffb5a7" stroke="#70523d" strokeWidth="1.5"/>
          <path d="M 30 5 Q 34 45 34 110 Q 34 145 30 155 Q 26 145 26 110 Q 26 45 30 5 Z" fill="#ffd166" stroke="#70523d" strokeWidth="1.5"/>
        </svg>

        {/* Coconut Bottom Right */}
        <svg viewBox="0 0 100 100" className="urin-bucket-decor urin-decor-coconut">
          <circle cx="50" cy="55" r="32" fill="#8e5d3f" stroke="#70523d" strokeWidth="2.5"/>
          <ellipse cx="50" cy="28" rx="20" ry="8" fill="#faf6ee" stroke="#70523d" strokeWidth="2.5"/>
          <path d="M 45 28 L 30 -2 Q 28 -5 25 -3 L 22 2 Q 24 0 26 3 L 41 28" fill="#ffb5a7" stroke="#70523d" strokeWidth="2"/>
          <circle cx="68" cy="32" r="7" fill="#ffccd5" stroke="#70523d" strokeWidth="1.5"/>
          <circle cx="68" cy="32" r="2" fill="#ffd166"/>
        </svg>

        {/* Flower near Palm Tree */}
        <svg viewBox="0 0 60 60" className="urin-bucket-decor urin-decor-flower-tr">
          <path d="M 30 30 Q 30 10 40 15 Q 50 20 30 30" fill="#ffccd5" stroke="#70523d" strokeWidth="2"/>
          <path d="M 30 30 Q 50 30 45 40 Q 40 50 30 30" fill="#ffccd5" stroke="#70523d" strokeWidth="2"/>
          <path d="M 30 30 Q 30 50 20 45 Q 10 40 30 30" fill="#ffccd5" stroke="#70523d" strokeWidth="2"/>
          <path d="M 30 30 Q 10 30 15 20 Q 20 10 30 30" fill="#ffccd5" stroke="#70523d" strokeWidth="2"/>
          <circle cx="30" cy="30" r="5" fill="#ffd166" stroke="#70523d" strokeWidth="1.5"/>
          <path d="M 30 30 Q 35 20 45 18" fill="none" stroke="#e08244" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="45" cy="18" r="2.5" fill="#ffd166"/>
        </svg>

        {/* Floating Stars and Hearts */}
        <svg viewBox="0 0 24 24" className="urin-bucket-decor urin-decor-star-1">
          <path d="M 12 2 L 15 9 L 22 9 L 17 14 L 19 21 L 12 17 L 5 21 L 7 14 L 2 9 L 9 9 Z" fill="#fff5d6" stroke="#70523d" strokeWidth="1.5"/>
        </svg>
        <svg viewBox="0 0 24 24" className="urin-bucket-decor urin-decor-star-2">
          <path d="M 12 2 L 15 9 L 22 9 L 17 14 L 19 21 L 12 17 L 5 21 L 7 14 L 2 9 L 9 9 Z" fill="#fff5d6" stroke="#70523d" strokeWidth="1.5"/>
        </svg>
        <svg viewBox="0 0 24 24" className="urin-bucket-decor urin-decor-heart-1">
          <path d="M 12 21.35 L 10.55 20.03 C 5.4 15.36 2 12.28 2 8.5 C 2 5.42 4.42 3 7.5 3 C 9.24 3 10.91 3.81 12 5.09 C 13.09 3.81 14.76 3 16.5 3 C 19.58 3 22 5.42 22 8.5 C 22 12.28 18.6 15.36 13.45 20.04 L 12 21.35 Z" fill="#ffccd5" stroke="#70523d" strokeWidth="1.5"/>
        </svg>
        <svg viewBox="0 0 24 24" className="urin-bucket-decor urin-decor-heart-2">
          <path d="M 12 21.35 L 10.55 20.03 C 5.4 15.36 2 12.28 2 8.5 C 2 5.42 4.42 3 7.5 3 C 9.24 3 10.91 3.81 12 5.09 C 13.09 3.81 14.76 3 16.5 3 C 19.58 3 22 5.42 22 8.5 C 22 12.28 18.6 15.36 13.45 20.04 L 12 21.35 Z" fill="#ffccd5" stroke="#70523d" strokeWidth="1.5"/>
        </svg>

        {/* Header Title */}
        <div className="urin-bucket-header">
          <h1 className="urin-bucket-main-title">
            <span className="char-s">s</span>
            <span className="char-u">u</span>
            <span className="char-m1">m</span>
            <span className="char-m2">m</span>
            <span className="char-e">e</span>
            <span className="char-r">r</span>
          </h1>
          <h2 className="urin-bucket-sub-title">bucket list</h2>

          <svg viewBox="0 0 160 10" className="urin-bucket-title-wave" width="160" height="10">
            <path d="M 0 5 C 20 0, 20 10, 40 5 C 60 0, 60 10, 80 5 C 100 0, 100 10, 120 5 C 140 0, 140 10, 160 5" fill="none" stroke="#70523d" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        </div>

        {/* Columns Content */}
        <div className="urin-bucket-columns">
          <div className="urin-bucket-col">
            {leftItems.map(renderItem)}
          </div>
          <div className="urin-bucket-col">
            {rightItems.map(renderItem)}
          </div>
        </div>

        {/* Card Footer Text */}
        <div className="urin-bucket-footer-text">
          collect memories, not things ♡
        </div>

        {/* Bottom decorative waves */}
        <div className="urin-bucket-waves-bottom">
          <svg viewBox="0 0 800 60" preserveAspectRatio="none" width="100%" height="45">
            <path d="M 0 30 Q 100 10 200 30 T 400 30 T 600 30 T 800 30 L 800 60 L 0 60 Z" fill="#d8f3dc" opacity="0.4"/>
            <path d="M 0 40 Q 150 25 300 40 T 600 40 T 800 40 L 800 60 L 0 60 Z" fill="#cbebf6" opacity="0.75"/>
          </svg>
        </div>
      </div>
    </section>
  );
};

const Member1 = () => {
  const navigate = useNavigate();

  return (
    <div className="urin-page">
      {/* Scattered Premium Scrapbook Stickers in Background */}
      <img src={publicAsset('items/bonghoa-removebg-preview.png')} className="urin-bg-sticker urin-sticker-flower" draggable={false} alt="flower decoration" />
      <img src={publicAsset('items/MayAnh.png')} className="urin-bg-sticker urin-sticker-camera" draggable={false} alt="retro camera tape" />

      {/* Floating Polaroid Memo */}
      {/* <div className="urin-scrapbook-polaroid" draggable={false}>
        <div className="urin-polaroid-photo">
          <div className="urin-polaroid-sun-emoji">☀️</div>
          <div className="urin-polaroid-wave-emoji">🌊</div>
        </div>
        <div className="urin-polaroid-caption">Summer 2026</div>
      </div> */}

      {/* Yellow Pinned Post-It Note */}
      <div className="urin-scrapbook-postit">
        <div className="urin-postit-pin">📌</div>
        <p className="urin-postit-line">To-do list: Done!</p>
        <p className="urin-postit-line">Be happy &</p>
        <p className="urin-postit-line">Stay positive 💖</p>
      </div>

      <button className="urin-back-btn" type="button" onClick={() => navigate('/')}>
        Back to Map
      </button>

      <section className="urin-poster" aria-label="Urin scrapbook profile">
        <div className="urin-washi-tape urin-tape-top-left" aria-hidden="true"></div>
        <div className="urin-washi-tape urin-tape-bottom-right" aria-hidden="true"></div>

        <header className="urin-profile-heading">
          <span className="urin-profile-kicker">hello, this is</span>
          <h1>Urin</h1>
          <p>Mongolia / South Korea</p>
        </header>

        <figure className="urin-photo-card urin-photo-card--square">
          <span className="urin-photo-pin" aria-hidden="true"></span>
          <img src={anhVuong} alt="Urin square portrait" className="urin-photo-square" draggable={false} />
          <figcaption>lost in a quiet moment</figcaption>
        </figure>

        <section className="urin-about" aria-label="About Urin">
          <span className="urin-about-paperclip" aria-hidden="true"></span>
          <h2 className="urin-about-title">ABOUT ME</h2>
          <dl className="urin-about-list">
            <div>
              <dt>From</dt>
              <dd>Mongolia</dd>
            </div>
            <div>
              <dt>Currently in</dt>
              <dd>South Korea</dd>
            </div>
            <div>
              <dt>Page mood</dt>
              <dd>Warm notes, beach plans, little memories</dd>
            </div>
          </dl>
        </section>

        <section className="urin-love-note" aria-label="Things Urin loves">
          <img
            src={publicAsset('items/bonghoa-removebg-preview.png')}
            className="urin-love-flower"
            alt=""
            aria-hidden="true"
            draggable={false}
          />
          <h2>Things I love</h2>
          <ul>
            {thingsILove.map((thing) => (
              <li key={thing}>{thing}</li>
            ))}
          </ul>
        </section>

        <figure className="urin-photo-card urin-photo-card--round">
          <img src={anhTron} alt="Urin round portrait" className="urin-photo-round" draggable={false} />
          <figcaption>favorite mountain memory</figcaption>
        </figure>

        <p className="urin-poster-note">collecting tiny bright moments one page at a time</p>
      </section>

      <UrinBucketList />
    </div>
  );
};

export default Member1;

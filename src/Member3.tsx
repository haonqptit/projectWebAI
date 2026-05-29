import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

// Dariga's Collage Letters
import letterA from '../assetMember2/A-removebg-preview.png';
import letterB from '../assetMember2/B-removebg-preview.png';
import letterO from '../assetMember2/O-removebg-preview.png';
import letterU from '../assetMember2/U-removebg-preview.png';
import letterT from '../assetMember2/T-removebg-preview.png';
import letterM from '../assetMember2/M-removebg-preview.png';
import letterE from '../assetMember2/E-removebg-preview.png';

// Dariga's Photos
import darigaAnh1 from '../assetMember2/Anh1.jfif';
import darigaAnh2 from '../assetMember2/anh2.jfif';
import darigaAnh3 from '../assetMember2/anh3.jfif';
import darigaAnh4 from '../assetMember2/anh4.jfif';
import darigaAnh5 from '../assetMember2/anh5.jfif';
import darigaAnh6 from '../assetMember2/anh6.jfif';
import darigaAnh7 from '../assetMember2/Anh7.jfif';

// Dariga's Stickers
import darigaSticker1 from '../assetMember2/1-removebg-preview.png';
import darigaSticker9 from '../assetMember2/9-removebg-preview.png';
import darigaSticker10 from '../assetMember2/10-removebg-preview.png';
import darigaSticker11 from '../assetMember2/11-removebg-preview.png';
import darigaSticker12 from '../assetMember2/12-removebg-preview.png';
import darigaSticker13 from '../assetMember2/13-removebg-preview.png';

const bucketItems = [
  { text: 'watch the sunrise at the beach', icon: 'sunrise' },
  { text: 'have a movie night outside', icon: 'popcorn' },
  { text: 'go on a beach picnic', icon: 'basket' },
  { text: 'go thrifting for cute finds', icon: 'bag' },
  { text: 'take a sunset beach walk', icon: 'sunset' },
  { text: 'make a summer playlist', icon: 'music' },
  { text: 'go swimming in the ocean', icon: 'wave' },
  { text: 'do a beach clean up', icon: 'shell' },
  { text: 'read a book in the sand', icon: 'book' },
  { text: 'go on a boat day', icon: 'boat' },
  { text: "make s'mores at the beach", icon: 'smore' },
  { text: 'bake something delicious', icon: 'cookie' },
  { text: 'go paddle boarding or kayaking', icon: 'paddle' },
  { text: 'have a sleepover', icon: 'pillow' },
  { text: 'visit a cute coastal town', icon: 'scooter' },
  { text: 'write in a journal', icon: 'journal' },
  { text: 'take lots of pictures', icon: 'camera' },
  { text: 'have a spa day', icon: 'spa' },
  { text: 'try acai or frozen treats', icon: 'bowl' },
  { text: 'be present & enjoy the little things', icon: 'rainbow' },
];

const Member3 = () => {
  const navigate = useNavigate();
  const [isEntering, setIsEntering] = useState(false);

  useEffect(() => {
    const enterTimer = window.setTimeout(() => setIsEntering(true), 120);
    return () => window.clearTimeout(enterTimer);
  }, []);

  return (
    <div className={`dariga-page${isEntering ? ' dariga-page--enter' : ''}`}>
      <button
        className="back-btn dariga-back-btn"
        type="button"
        onClick={() => navigate('/')}
      >
        Back to Map
      </button>

      <main className="dariga-sheet">
        {/* Top Decorative Star Doodle */}
        <img
          className="dariga-doodle dariga-doodle--top-left-star"
          src={darigaSticker11}
          alt=""
          aria-hidden="true"
          draggable={false}
        />

        {/* Collage Title spelling "About me" */}
        <header className="dariga-collage-title">
          <div className="dariga-word dariga-word--about">
            <img src={letterA} alt="A" className="dariga-letter dariga-letter--a" />
            <img src={letterB} alt="b" className="dariga-letter dariga-letter--b" />
            <img src={letterO} alt="o" className="dariga-letter dariga-letter--o" />
            <img src={letterU} alt="u" className="dariga-letter dariga-letter--u" />
            <img src={letterT} alt="t" className="dariga-letter dariga-letter--t" />
          </div>
          <div className="dariga-word dariga-word--me">
            <img src={letterM} alt="m" className="dariga-letter dariga-letter--m" />
            <img src={letterE} alt="e" className="dariga-letter dariga-letter--e" />
          </div>
        </header>

        {/* Intro Information Cards & Text */}
        <section className="dariga-intro-block">
          <h2 className="dariga-intro-text dariga-intro-text--greeting">Hi my name is Dariga</h2>
          <p className="dariga-intro-text dariga-intro-text--meta">
            Age: <span className="dariga-highlight">21</span> From: <span className="dariga-highlight">Kazakhstan, Central Asia</span>
          </p>
          <p className="dariga-intro-text dariga-intro-text--meta dariga-intro-text--shift-right">
            Currently in: <span className="dariga-highlight">South Korea</span>
          </p>
          <p className="dariga-intro-text dariga-intro-text--meta dariga-intro-text--shift-right">
            Major: <span className="dariga-highlight">Computer Software</span>
          </p>

        </section>

        <img
          className="dariga-doodle dariga-doodle--left-doodles"
          src={darigaSticker9}
          alt=""
          aria-hidden="true"
          draggable={false}
        />

        {/* Left Column Text and Photos */}
        <div className="dariga-text-card dariga-text-card--visited">
          <p>Places I visited in Korea:</p>
          <h3>Namiseom, Gangreung, Daejeon</h3>
        </div>

        <figure className="dariga-polaroid dariga-polaroid--forest">
          <img src={darigaAnh4} alt="Places I visited in Korea" draggable={false} />
        </figure>

        <figure className="dariga-polaroid dariga-polaroid--beach">
          <img src={darigaAnh2} alt="Beach in Korea" draggable={false} />
        </figure>

        <div className="dariga-text-card dariga-text-card--animals">
          <p>I love animals, especially cats because they make me feel comfortable and happy.</p>
        </div>

        {/* Bottom-left flower sticker */}
        <img
          className="dariga-doodle dariga-doodle--bottom-left-flower"
          src={darigaSticker1}
          alt=""
          aria-hidden="true"
          draggable={false}
        />

        {/* Center Column elements */}
        <figure className="dariga-polaroid dariga-polaroid--valley">
          <img src={darigaAnh3} alt="Green valley scenery" draggable={false} />
        </figure>

        {/* Orchid sticker (middle center) */}
        <img
          className="dariga-doodle dariga-doodle--orchid"
          src={darigaSticker10}
          alt=""
          aria-hidden="true"
          draggable={false}
        />

        {/* Beige dried flower sticker (middle center) */}
        <img
          className="dariga-doodle dariga-doodle--beige-flower"
          src={darigaSticker13}
          alt=""
          aria-hidden="true"
          draggable={false}
        />

        <figure className="dariga-polaroid dariga-polaroid--pizza">
          <img src={darigaAnh5} alt="Pizza" draggable={false} />
        </figure>

        <figure className="dariga-polaroid dariga-polaroid--cat">
          <img src={darigaAnh7} alt="Smiling Cat" draggable={false} />
        </figure>

        {/* Right Column elements */}
        <figure className="dariga-polaroid dariga-polaroid--canyon">
          <img src={darigaAnh1} alt="Beautiful scenery" draggable={false} />
        </figure>

        <div className="dariga-text-card dariga-text-card--foods">
          <p>My favorite foods: Kimchi jjigae, chicken, and pizza</p>
        </div>

        <figure className="dariga-polaroid dariga-polaroid--feast">
          <img src={darigaAnh6} alt="Korean feast foods" draggable={false} />
        </figure>

        {/* Bottom-right outline star doodle */}
        <img
          className="dariga-doodle dariga-doodle--bottom-right-star"
          src={darigaSticker12}
          alt=""
          aria-hidden="true"
          draggable={false}
        />
      </main>

      <section className="dariga-bucket-sheet" aria-labelledby="dariga-bucket-title">
        <span className="dariga-bucket-sun" aria-hidden="true" />
        <span className="dariga-bucket-palm" aria-hidden="true">🌴</span>
        <span className="dariga-bucket-flower dariga-bucket-flower--top" aria-hidden="true">✿</span>
        <span className="dariga-bucket-doodle dariga-bucket-doodle--star-a" aria-hidden="true">☆</span>
        <span className="dariga-bucket-doodle dariga-bucket-doodle--star-b" aria-hidden="true">☆</span>
        <span className="dariga-bucket-doodle dariga-bucket-doodle--heart-a" aria-hidden="true">♡</span>
        <span className="dariga-bucket-doodle dariga-bucket-doodle--heart-b" aria-hidden="true">♡</span>

        <header className="dariga-bucket-header">
          <h2 id="dariga-bucket-title" className="dariga-bucket-title" aria-label="summer bucket list">
            {'summer'.split('').map((letter, index) => (
              <span key={`${letter}-${index}`} className={`dariga-bucket-title__letter dariga-bucket-title__letter--${index}`}>
                {letter}
              </span>
            ))}
          </h2>
          <p className="dariga-bucket-subtitle">bucket list</p>
          <span className="dariga-bucket-wave-line" aria-hidden="true" />
        </header>

        <ul className="dariga-bucket-list">
          {bucketItems.map((item, index) => (
            <li
              key={item.text}
              className={`dariga-bucket-item dariga-bucket-item--tone-${index % 5}`}
            >
              <span className="dariga-bucket-check" aria-hidden="true" />
              <span className="dariga-bucket-item__text">{item.text}</span>
              <span className={`dariga-bucket-icon dariga-bucket-icon--${item.icon}`} aria-hidden="true" />
            </li>
          ))}
        </ul>

        <footer className="dariga-bucket-footer">
          <span className="dariga-bucket-surfboard" aria-hidden="true" />
          <span className="dariga-bucket-shell dariga-bucket-shell--left" aria-hidden="true">✺</span>
          <p>collect memories, not things ♡</p>
          <span className="dariga-bucket-coconut" aria-hidden="true" />
          <span className="dariga-bucket-flower dariga-bucket-flower--bottom" aria-hidden="true">✿</span>
          <span className="dariga-bucket-water" aria-hidden="true" />
        </footer>
      </section>
    </div>
  );
};

export default Member3;

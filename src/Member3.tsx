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
    </div>
  );
};

export default Member3;

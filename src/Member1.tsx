import { useNavigate } from 'react-router-dom';
import './App.css';

import anhVuong from '../Urin/Anhvuong.png';
import anhTron from '../Urin/anhTron.png';

const Member1 = () => {
  const navigate = useNavigate();

  return (
    <div className="urin-page">
      <button className="urin-back-btn" type="button" onClick={() => navigate('/')}>
        Back to Map
      </button>

      <section className="urin-poster">
        <img src={anhVuong} alt="Urin square" className="urin-photo-square" draggable={false} />

        <div className="urin-about">
          <h2 className="urin-about-title">ABOUT ME</h2>
          <div className="urin-about-info">
            <p>From: Mongolia</p>
            <p>Currently in: South Korea</p>
          </div>
        </div>

        <div className="urin-round-photo-wrap">
          <img src={anhTron} alt="Urin round" className="urin-photo-round" draggable={false} />
        </div>
      </section>
    </div>
  );
};

export default Member1;

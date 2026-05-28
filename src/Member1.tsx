import { useNavigate } from 'react-router-dom';
import './App.css';

const Member1 = () => {
  const navigate = useNavigate();

  return (
    <div className="member-focus-page">
      <button className="back-btn" type="button" onClick={() => navigate('/')}>
        Back to Map
      </button>
      <div className="postcard-large">
        <h1>우린 (Urin)</h1>
        <p style={{ fontStyle: 'italic', color: '#666', margin: '10px 0 20px' }}>From: Mongolia 🇲🇳</p>
        <p>This is Urin's personal scrapbook page.</p>
        <p style={{ marginTop: '20px', fontSize: '0.9rem', color: '#888' }}>
          ✿ Coming soon — edit `src/Member1.tsx` to design this page!
        </p>
      </div>
    </div>
  );
};

export default Member1;

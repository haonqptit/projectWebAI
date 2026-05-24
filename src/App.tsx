import { useNavigate } from 'react-router-dom';
import './App.css';

const publicAsset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;

interface Member {
  id: number;
  name: string;
  country: string;
  avatar: string;
  position: { top: string; left: string };
}

function App() {
  const navigate = useNavigate();
  
  const membersData: Member[] = [
    { id: 1, name: "우린", country: "Mongolia", avatar: publicAsset("chibi2.jpg"), position: { top: '31%', left: '68%' } },
    { id: 2, name: "린", country: "Viet Nam", avatar: publicAsset("chibi1.jpg"), position: { top: '53%', left: '73%' } },
    { id: 3, name: "다리가", country: "Kazakhstan", avatar: publicAsset("chibi3.jpg"), position: { top: '34%', left: '57%' } }
  ];

  return (
    <div className="scrapbook-canvas">

      {/* Tiêu đề scrapbook */}
      <header className="navbar">
        <span className="nav-logo__sub">welcome to</span>
        <div className="nav-logo">Our Map</div>
        <span className="nav-logo__caption">— a little world of us ✿</span>
      </header>

      {/* Polaroid giới thiệu */}
      <div className="intro-card">
        <span className="intro-card__tape" />
        <p className="intro-card__title">Hi, I’m Linh!</p>
        <p className="intro-card__body">
          Click vào từng chibi trên bản đồ để ghé thăm góc nhỏ của chúng mình nhé ~
        </p>
        <p className="intro-card__signature">♡ from Việt Nam</p>
      </div>


      {/* Các vòng tròn thành viên */}
      {membersData.map((member) => (
        <div
          key={member.id}
          className="member-node"
          style={{ top: member.position.top, left: member.position.left }}
          onClick={() => navigate(`/member/${member.id}`)}
        >
          <img src={member.avatar} alt={member.name} />
          <div className="country-tag">{member.country}</div>
        </div>
      ))}
    </div>
  );
}

export default App;

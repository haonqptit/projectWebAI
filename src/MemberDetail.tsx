import { useEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './App.css';

const MUSIC_SRC = new URL('../music/music.mp3', import.meta.url).href;
const publicAsset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;

const ASSET = {
  flower: publicAsset('items/hoa.png'),
  wildflower: publicAsset('items/hoa2.png'),
  bow: publicAsset('items/CaiNo-removebg-preview.png'),
  tape: publicAsset('items/Dan.png'),
  camera: publicAsset('items/MayAnh.png'),
  headphones: publicAsset('items/Tainghee.png'),
  fish: publicAsset('items/ConCa.png'),
  cat: publicAsset('items/ConMeo.png'),
  plane: publicAsset('items/maybay-removebg-preview.png'),
  building: publicAsset('items/Laudai-removebg-preview.png'),
  driedFlower: publicAsset('items/hoa.png'),
  growingNote: publicAsset('items/Growing.png'),
  statusCard: publicAsset('items/Current Status.png'),
  heroBg: publicAsset('items/Bg-removebg-preview.png'),
};

const PHOTO = {
  hero: publicAsset('items/link2.png'),
  cafe: publicAsset('xedap.jpg'),
  matcha: publicAsset('caffe.jpg'),
  hanbok: publicAsset('linh5.jpg'),
};

const LOFI_SCENE = {
  day: publicAsset('linh-study-frame-01-day.png'),
  night: publicAsset('linh-study-frame-03-night.png'),
  study: publicAsset('items/linh-lofi-study-writing.gif'),
};

type LofiTrayItemData = {
  id: string;
  label: string;
  src: string;
  top: string;
  left: string;
  width: number;
  rotate: number;
  delay: number;
  reaction: string;
};

const LOFI_TRAY_ITEMS: LofiTrayItemData[] = [
  {
    id: 'headphones',
    label: 'headphones',
    src: ASSET.headphones,
    top: '24%',
    left: '9%',
    width: 54,
    rotate: -8,
    delay: 0,
    reaction: 'music mood unlocked ♡',
  },
  {
    id: 'camera',
    label: 'camera',
    src: ASSET.camera,
    top: '18%',
    left: '30%',
    width: 54,
    rotate: 5,
    delay: 0.25,
    reaction: 'memory collected ✦',
  },
  {
    id: 'flower',
    label: 'flower',
    src: publicAsset('items/BoHoa.png'),
    top: '42%',
    left: '48%',
    width: 52,
    rotate: -6,
    delay: 0.5,
    reaction: 'soft desk energy ✿',
  },
  {
    id: 'cat',
    label: 'cat',
    src: publicAsset('items/cat-sleeping.gif'),
    top: '35%',
    left: '66%',
    width: 68,
    rotate: 4,
    delay: 0.75,
    reaction: 'cozy companion joined ♡',
  },
  {
    id: 'fish',
    label: 'fish',
    src: ASSET.fish,
    top: '36%',
    left: '84%',
    width: 74,
    rotate: -4,
    delay: 1,
    reaction: 'random little friend appeared',
  },
];

type PolaroidProps = {
  className: string;
  src: string;
  alt: string;
};

const CollagePolaroid = ({ className, src, alt }: PolaroidProps) => (
  <figure className={`linh-polaroid ${className}`}>
    <img src={src} alt={alt} draggable={false} />
  </figure>
);

const InfoCard = () => (
  <section className="linh-info-card" aria-label="Linh profile information">
    <span className="linh-paperclip linh-paperclip--info" aria-hidden="true" />
    <h2>BASE IN:</h2>
    <p>HAIPHONG, VIETNAM</p>
    <h2>CURRENTLY IN:</h2>
    <p>SEOUL, KOREA</p>
    <h2>CURRENT OBSESSION:</h2>
    <p>MATCHA &amp; PINTEREST</p>
  </section>
);

type LofiTrayItemProps = {
  item: LofiTrayItemData;
  onReact: (message: string) => void;
};

const LofiTrayItem = ({ item, onReact }: LofiTrayItemProps) => {
  const itemRef = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ pointerX: number; pointerY: number; offsetX: number; offsetY: number } | null>(null);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!itemRef.current || event.button !== 0) return;

    onReact(item.reaction);
    itemRef.current.setPointerCapture(event.pointerId);
    dragStartRef.current = {
      pointerX: event.clientX,
      pointerY: event.clientY,
      offsetX: offset.x,
      offsetY: offset.y,
    };
    setIsDragging(true);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragStartRef.current) return;

    setOffset({
      x: dragStartRef.current.offsetX + event.clientX - dragStartRef.current.pointerX,
      y: dragStartRef.current.offsetY + event.clientY - dragStartRef.current.pointerY,
    });
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (itemRef.current?.hasPointerCapture(event.pointerId)) {
      itemRef.current.releasePointerCapture(event.pointerId);
    }

    setIsDragging(false);
    dragStartRef.current = null;
    onReact(item.reaction);
  };

  const handlePointerCancel = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (itemRef.current?.hasPointerCapture(event.pointerId)) {
      itemRef.current.releasePointerCapture(event.pointerId);
    }

    setIsDragging(false);
    dragStartRef.current = null;
  };

  const handleReset = () => {
    setOffset({ x: 0, y: 0 });
    onReact(item.reaction);
  };

  const style = {
    '--item-top': item.top,
    '--item-left': item.left,
    '--item-width': `${item.width}px`,
    width: `${item.width}px`,
    '--item-rotate': `${item.rotate}deg`,
    '--item-delay': `${item.delay}s`,
    '--drag-x': `${offset.x}px`,
    '--drag-y': `${offset.y}px`,
  } as CSSProperties;

  return (
    <div
      ref={itemRef}
      className={[
        'lofi-tray-item',
        isDragging ? 'is-dragging' : '',
      ].filter(Boolean).join(' ')}
      style={style}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      onDoubleClick={handleReset}
      aria-label={`${item.label} sticker`}
      title={`${item.label} - drag freely, double-click to reset`}
    >
      <div className="lofi-tray-item__inner">
        <img src={item.src} alt="" aria-hidden="true" draggable={false} />
      </div>
      <span className="lofi-tray-item__label">{item.label}</span>
    </div>
  );
};

const MemberDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isStudyMode, setIsStudyMode] = useState(false);
  const [isLampOn, setIsLampOn] = useState(true);
  const [isMusicOn, setIsMusicOn] = useState(false);
  const [reaction, setReaction] = useState('');
  const reactionTimerRef = useRef<ReturnType<typeof window.setTimeout> | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const sceneSrc = isStudyMode
    ? LOFI_SCENE.study
    : isLampOn
      ? LOFI_SCENE.night
      : LOFI_SCENE.day;

  const showReaction = (message: string) => {
    setReaction(message);
    if (reactionTimerRef.current) {
      window.clearTimeout(reactionTimerRef.current);
    }
    reactionTimerRef.current = window.setTimeout(() => setReaction(''), 1500);
  };

  const handleMusicToggle = () => {
    const audio = audioRef.current;

    if (!audio) {
      setIsMusicOn((value) => !value);
      return;
    }

    if (isMusicOn) {
      audio.pause();
      setIsMusicOn(false);
      return;
    }

    audio.volume = 0.55;
    void audio.play()
      .then(() => setIsMusicOn(true))
      .catch(() => setIsMusicOn(false));
  };

  useEffect(() => {
    const audio = audioRef.current;

    return () => {
      if (reactionTimerRef.current) {
        window.clearTimeout(reactionTimerRef.current);
      }
      audio?.pause();
    };
  }, []);

  if (id === '2') {
    return (
      <div className="linh-page">
        <button
          className="back-btn linh-back-btn"
          type="button"
          onClick={() => navigate('/')}
        >
          Back to Map
        </button>

        <main className="linh-spread paper-doll-spread in4-spread">
          <div className="spread-left linhsheet-left-page linh-left-page">
            <div className="linh-bg-layer" aria-hidden="true">
              <span className="linh-paper-scrap linh-paper-scrap--cream" />
              <span className="linh-paper-scrap linh-paper-scrap--grid" />
              <span className="linh-paper-scrap linh-paper-scrap--kraft" />
              <span className="linh-doodle linh-doodle--leafs" />
              <span className="linh-doodle linh-doodle--tiny-heart">♡</span>
              <span className="linh-doodle linh-doodle--tiny-star">☆</span>
            </div>

            <header className="linh-collage-title">
              <span>Hello, my name is</span>
              <h1>Linh</h1>
              <i className="linh-title-doodle linh-title-doodle--heart">♡</i>
              <i className="linh-title-doodle linh-title-doodle--star">☆</i>
            </header>

            <section className="linh-grid-note" aria-label="A gentle note">
              <span className="linh-paperclip linh-paperclip--note" aria-hidden="true" />
              <p>it's<br />okay to<br />take your<br />time ♡</p>
            </section>
            <img className="linh-flower linh-flower--top-left" src={ASSET.flower} alt="" aria-hidden="true" draggable={false} />

            <section className="linh-flight-cluster" aria-label="Seoul travel stamp">
              <span className="linh-flight-path" aria-hidden="true" />
              <span className="linh-flight-heart" aria-hidden="true">♡</span>
              <img className="linh-airplane-sticker" src={ASSET.plane} alt="" aria-hidden="true" draggable={false} />
            </section>

            <section className="linh-cutout-cluster" aria-label="Linh portrait">
              <img className="linh-hero-bg-sticker" src={ASSET.heroBg} alt="" aria-hidden="true" draggable={false} />
              <img className="linh-hero-cutout" src={PHOTO.hero} alt="Linh in hanbok" draggable={false} />
              <span className="linh-hero-label">soft day in Seoul</span>
              <img className="linh-flower linh-flower--hero" src={ASSET.wildflower} alt="" aria-hidden="true" draggable={false} />
            </section>

            <section className="linh-growth-note" aria-label="Growing note">
              <span className="linh-tape linh-tape--growth" aria-hidden="true" />
              <p>growing,<br />learning,<br />unfolding<br />one day<br />at a time<br />♡</p>
              <img src={ASSET.wildflower} alt="" aria-hidden="true" draggable={false} />
            </section>

            <section className="linh-photo-cluster" aria-label="Linh memories">
              <CollagePolaroid className="linh-polaroid--cafe" src={PHOTO.cafe} alt="Cafe with bicycle" />
              <CollagePolaroid className="linh-polaroid--hanbok" src={PHOTO.hanbok} alt="Hanbok day in Seoul" />
              <CollagePolaroid className="linh-polaroid--matcha" src={PHOTO.matcha} alt="Matcha drinks" />
              <span className="linh-paperclip linh-paperclip--photo" aria-hidden="true" />
              <span className="linh-tape linh-tape--photo-bottom" aria-hidden="true" />
            </section>

            <section className="linh-round-note" aria-label="Collecting moments note">
              <p>collecting<br />little moments<br />around the<br />world<br />♡</p>
            </section>

            <InfoCard />
            <img className="linh-building-sticker" src={ASSET.building} alt="" aria-hidden="true" draggable={false} />

            <img className="linh-status-sticker" src={ASSET.statusCard} alt="Current status: energy 5%, brain cells loading, mission survive university, looping song impossible to skip" draggable={false} />
            <img className="linh-flower linh-flower--status" src={ASSET.flower} alt="" aria-hidden="true" draggable={false} />

            <section className="linh-chapter-note" aria-label="New chapter note">
              <span className="linh-tape linh-tape--chapter" aria-hidden="true" />
              <p>new city,<br />new chapter<br />♡</p>
            </section>
          </div>

          <div className="spread-seam" aria-hidden="true">
            <span className="spread-seam__tape spread-seam__tape--bot" />
          </div>

          <div className="spread-right lofi-study-right">
            <header className="lofi-study-header">
              <h2 className="lofi-study-title">my lofi study corner</h2>
              <p className="lofi-study-subtitle">study with me for a little while ✦</p>
            </header>

            <div className="lofi-controls">
              <button
                type="button"
                className={`lofi-control ${isStudyMode ? 'is-active' : ''}`}
                onClick={() => setIsStudyMode((value) => !value)}
              >
                {isStudyMode ? 'pause study mode' : 'start study mode'}
              </button>

              <button
                type="button"
                className={`lofi-control ${isLampOn ? 'is-active' : ''}`}
                onClick={() => setIsLampOn((value) => !value)}
              >
                {isLampOn ? 'lamp on' : 'lamp off'}
              </button>

              <button
                type="button"
                className={`lofi-control ${isMusicOn ? 'is-active' : ''}`}
                onClick={handleMusicToggle}
              >
                {isMusicOn ? 'music on' : 'play music'}
              </button>
            </div>

            <audio ref={audioRef} src={MUSIC_SRC} loop preload="auto" />

            <section
              className={[
                'lofi-scene-frame',
                isStudyMode ? 'is-study-mode' : '',
                isLampOn ? 'is-lamp-on' : 'is-lamp-off',
                isMusicOn ? 'is-music-on' : '',
              ].filter(Boolean).join(' ')}
              aria-label="Linh lofi study corner"
            >
              <img
                className="lofi-scene-image"
                src={sceneSrc}
                alt="Linh studying at a cozy lofi desk"
                draggable={false}
              />

              <div className="lofi-light-overlay" aria-hidden="true" />
              <div className="lofi-sparkles" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>

              {isStudyMode && (
                <span className="lofi-study-status">study mode on ✦</span>
              )}

              {reaction && (
                <div className="lofi-reaction-bubble">
                  {reaction}
                </div>
              )}

              <span className="lofi-scene-note lofi-scene-note--top">soft study session</span>
              <span className="lofi-scene-note lofi-scene-note--bottom">place little things here ♡</span>
            </section>

            <div className={`lofi-music-player ${isMusicOn ? 'is-playing' : ''}`}>
              <span className="lofi-music-player__eyebrow">now playing</span>
              <span>♪ lofi study beats ♡</span>
              <button type="button" onClick={handleMusicToggle}>
                {isMusicOn ? 'pause' : 'play'}
              </button>
              <div className="lofi-equalizer" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
            </div>

            <section className="lofi-item-tray" aria-label="Tiny draggable study items">
              <span className="lofi-item-tray__title">
                tiny things for study time ✦
              </span>

              {LOFI_TRAY_ITEMS.map((item) => (
                <LofiTrayItem
                  key={item.id}
                  item={item}
                  onReact={showReaction}
                />
              ))}
            </section>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="member-focus-page">
      <button className="back-btn" type="button" onClick={() => navigate('/')}>
        Back to Map
      </button>
      <div className="postcard-large">
        <h1>Member ID: {id}</h1>
        <p>This is the member detail page.</p>
      </div>
    </div>
  );
};

export default MemberDetail;

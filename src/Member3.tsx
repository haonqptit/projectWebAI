import { useEffect, useState, useRef } from 'react';
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

const publicAsset = (path: string) => `${import.meta.env.BASE_URL || '/'}${path.replace(/^\/+/, '')}`;

interface BagItemData {
  id: string;
  name: string;
  src: string;
  defaultPosition: { top: string; left: string };
  width: string;
  defaultRotate: number;
}

const BAG_ITEMS: BagItemData[] = [
  {
    id: 'handcream',
    name: 'Hand Cream',
    src: '/Bag/hand.webp',
    defaultPosition: { top: '5%', left: '8%' },
    width: '120px',
    defaultRotate: 35
  },
  {
    id: 'ipad',
    name: 'iPad',
    src: '/Bag/Ipad11.webp',
    defaultPosition: { top: '38%', left: '0%' },
    width: '200px',
    defaultRotate: 12
  },
  {
    id: 'phone',
    name: 'Phone Case',
    src: '/Bag/phone.png',
    defaultPosition: { top: '75%', left: '3%' },
    width: '140px',
    defaultRotate: -20
  },
  {
    id: 'lipstick',
    name: 'Lipstick',
    src: '/Bag/hera.webp',
    defaultPosition: { top: '82%', left: '30%' },
    width: '80px',
    defaultRotate: 25
  },
  {
    id: 'glasses',
    name: 'Glasses',
    src: '/Bag/glasses.webp',
    defaultPosition: { top: '5%', left: '72%' },
    width: '160px',
    defaultRotate: -15
  },
  {
    id: 'headphones',
    name: 'Headphones',
    src: '/Bag/Sony.webp',
    defaultPosition: { top: '38%', left: '78%' },
    width: '160px',
    defaultRotate: 10
  },
  {
    id: 'wallet',
    name: 'Wallet',
    src: '/Bag/wallet.webp',
    defaultPosition: { top: '80%', left: '60%' },
    width: '170px',
    defaultRotate: 15
  },
  {
    id: 'pocket',
    name: 'Pocket Camera',
    src: '/Bag/pocket.webp',
    defaultPosition: { top: '68%', left: '80%' },
    width: '100px',
    defaultRotate: -15
  }
];

interface ItemState {
  x: number; // offset X in pixels
  y: number; // offset Y in pixels
  isDragging: boolean;
  isPacked: boolean;
  packedRotate: number;
  animateSnap: boolean;
}

const Member3 = () => {
  const navigate = useNavigate();
  const [isEntering, setIsEntering] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const bagSectionRef = useRef<HTMLElement | null>(null);
  const bagRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [isBagScrollOpen, setIsBagScrollOpen] = useState(false);
  const [bagContainerSize, setBagContainerSize] = useState({ width: 800, height: 520 });

  const initialItemsState = () => {
    const state: Record<string, ItemState> = {};
    BAG_ITEMS.forEach((item) => {
      state[item.id] = {
        x: 0,
        y: 0,
        isDragging: false,
        isPacked: false,
        packedRotate: 0,
        animateSnap: false,
      };
    });
    return state;
  };

  const [itemsState, setItemsState] = useState<Record<string, ItemState>>(initialItemsState);

  const dragStartRef = useRef<{
    itemId: string;
    startX: number;
    startY: number;
    startOffsetX: number;
    startOffsetY: number;
    containerWidth: number;
    containerHeight: number;
    hasMoved: boolean;
  } | null>(null);

  useEffect(() => {
    const enterTimer = window.setTimeout(() => setIsEntering(true), 120);
    return () => window.clearTimeout(enterTimer);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateSize = () => {
      setBagContainerSize({
        width: container.clientWidth || 800,
        height: container.clientHeight || 520,
      });
    };

    updateSize();

    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', updateSize);
      return () => window.removeEventListener('resize', updateSize);
    }

    const observer = new ResizeObserver(updateSize);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateBagScrollState = () => {
      const section = bagSectionRef.current;
      if (!section) return;

      const sectionTop = section.getBoundingClientRect().top;
      const openPoint = window.innerHeight * 0.72;
      const closePoint = window.innerHeight * 0.84;

      setIsBagScrollOpen((wasOpen) => {
        const shouldOpen = wasOpen
          ? sectionTop < closePoint
          : sectionTop < openPoint;

        return wasOpen === shouldOpen ? wasOpen : shouldOpen;
      });
    };

    updateBagScrollState();
    window.addEventListener('scroll', updateBagScrollState, { passive: true });
    window.addEventListener('resize', updateBagScrollState);

    return () => {
      window.removeEventListener('scroll', updateBagScrollState);
      window.removeEventListener('resize', updateBagScrollState);
    };
  }, []);

  const getBagCenterOffset = (itemData: BagItemData) => {
    const container = containerRef.current;
    const containerWidth = container?.clientWidth || bagContainerSize.width;
    const containerHeight = container?.clientHeight || bagContainerSize.height;
    const itemElement = itemRefs.current[itemData.id];
    const itemWidth = itemElement?.offsetWidth || parseFloat(itemData.width);
    const itemHeight = itemElement?.offsetHeight || itemWidth;
    const defaultLeft = (parseFloat(itemData.defaultPosition.left) / 100) * containerWidth;
    const defaultTop = (parseFloat(itemData.defaultPosition.top) / 100) * containerHeight;

    return {
      x: containerWidth / 2 - defaultLeft - itemWidth / 2,
      y: containerHeight / 2 - defaultTop - itemHeight / 2,
    };
  };

  const packItem = (itemId: string) => {
    const itemData = BAG_ITEMS.find((item) => item.id === itemId);
    if (!itemData) return;

    const bagOffset = getBagCenterOffset(itemData);
    const jitterX = (Math.random() - 0.5) * 34;
    const jitterY = (Math.random() - 0.5) * 26;
    const randomRotate = (Math.random() - 0.5) * 40;

    setItemsState((prev) => ({
      ...prev,
      [itemId]: {
        x: bagOffset.x + jitterX,
        y: bagOffset.y + jitterY,
        isDragging: false,
        isPacked: true,
        packedRotate: randomRotate,
        animateSnap: true,
      },
    }));
  };

  const unpackItem = (itemId: string) => {
    setItemsState((prev) => ({
      ...prev,
      [itemId]: {
        x: 0,
        y: 0,
        isDragging: false,
        isPacked: false,
        packedRotate: 0,
        animateSnap: true,
      },
    }));
  };

  const togglePackState = (itemId: string) => {
    const itemState = itemsState[itemId];
    if (itemState?.isPacked) {
      unpackItem(itemId);
    } else {
      packItem(itemId);
    }
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>, itemId: string) => {
    if (event.button !== 0) return;
    if (!isBagScrollOpen) return;

    const itemState = itemsState[itemId];
    const container = containerRef.current;
    if (!container || !itemState) return;

    event.currentTarget.setPointerCapture(event.pointerId);

    dragStartRef.current = {
      itemId,
      startX: event.clientX,
      startY: event.clientY,
      startOffsetX: itemState.x,
      startOffsetY: itemState.y,
      containerWidth: container.clientWidth,
      containerHeight: container.clientHeight,
      hasMoved: false,
    };

    setItemsState((prev) => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        isDragging: true,
        animateSnap: false,
      },
    }));
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragStartRef.current;
    if (!drag) return;

    const { itemId, startX, startY, startOffsetX, startOffsetY } = drag;

    const deltaX = event.clientX - startX;
    const deltaY = event.clientY - startY;

    if (Math.abs(deltaX) > 4 || Math.abs(deltaY) > 4) {
      drag.hasMoved = true;
    }

    setItemsState((prev) => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        x: startOffsetX + deltaX,
        y: startOffsetY + deltaY,
      },
    }));
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>, itemId: string) => {
    const drag = dragStartRef.current;
    if (!drag) return;

    event.currentTarget.releasePointerCapture(event.pointerId);
    dragStartRef.current = null;

    if (!drag.hasMoved) {
      togglePackState(itemId);
      return;
    }

    const bagElement = bagRef.current;
    const itemElement = itemRefs.current[itemId];

    if (bagElement && itemElement) {
      const bagRect = bagElement.getBoundingClientRect();
      const itemRect = itemElement.getBoundingClientRect();

      const itemCenter = {
        x: itemRect.left + itemRect.width / 2,
        y: itemRect.top + itemRect.height / 2,
      };

      const isInsideBag =
        itemCenter.x >= bagRect.left &&
        itemCenter.x <= bagRect.right &&
        itemCenter.y >= bagRect.top &&
        itemCenter.y <= bagRect.bottom;

      if (isInsideBag) {
        packItem(itemId);
      } else {
        unpackItem(itemId);
      }
    } else {
      unpackItem(itemId);
    }
  };

  const handleResetAll = () => {
    setItemsState(initialItemsState());
  };

  const allItemsPacked = BAG_ITEMS.every((item) => itemsState[item.id]?.isPacked);

  return (
    <div className={`dariga-page${isEntering ? ' dariga-page--enter' : ''}`}>
      <button
        className="back-btn dariga-back-btn"
        type="button"
        onClick={() => navigate('/')}
      >
        Back to Map
      </button>

      <div className="dariga-sheet">
        <main className="dariga-collage-wrapper">
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

        {/* Everyday Bag interactive section */}
        <section
          ref={bagSectionRef}
          className={`everyday-bag-section${isBagScrollOpen ? ' is-bag-open' : ''}`}
          aria-labelledby="everyday-bag-title"
        >
          <h2 id="everyday-bag-title" className="everyday-bag-title">My everyday bag!</h2>

          <div ref={containerRef} className="everyday-bag-container">
            {/* Central Bag */}
            <div ref={bagRef} className="central-bag-wrapper">
              <img
                src={publicAsset('/Bag/bag.webp')}
                alt="Everyday Bag"
                className="central-bag-image"
                draggable={false}
              />
            </div>

            {/* Items */}
            {BAG_ITEMS.map((item, index) => {
              const state = itemsState[item.id];
              if (!state) return null;

              const closedOffset = getBagCenterOffset(item);
              const isClosedByScroll = !isBagScrollOpen && !state.isDragging;

              // Determine transform values based on state priority
              let rotateVal: number;
              let scaleVal: number;
              let offsetX: number;
              let offsetY: number;

              if (state.isDragging) {
                rotateVal = item.defaultRotate;
                scaleVal = 1;
                offsetX = state.x;
                offsetY = state.y;
              } else if (state.isPacked) {
                rotateVal = state.packedRotate;
                scaleVal = 0.35;
                offsetX = state.x;
                offsetY = state.y;
              } else if (isClosedByScroll) {
                rotateVal = 0;
                scaleVal = 0.15;
                offsetX = closedOffset.x;
                offsetY = closedOffset.y;
              } else {
                // Burst out — default position
                rotateVal = item.defaultRotate;
                scaleVal = 1;
                offsetX = 0;
                offsetY = 0;
              }

              const itemStyle: React.CSSProperties = {
                top: item.defaultPosition.top,
                left: item.defaultPosition.left,
                width: item.width,
                transitionDelay: state.isDragging || state.animateSnap
                  ? '0ms'
                  : isBagScrollOpen
                    ? `${index * 100}ms`
                    : `${(BAG_ITEMS.length - index - 1) * 60}ms`,
                transform: `translate(${offsetX}px, ${offsetY}px) rotate(${rotateVal}deg) scale(${scaleVal})`,
                opacity: isClosedByScroll ? 0 : 1,
              };

              return (
                <div
                  key={item.id}
                  ref={(el) => {
                    itemRefs.current[item.id] = el;
                  }}
                  className={`bag-item bag-item-${item.id} ${state.isDragging ? 'is-dragging' : ''} ${state.isPacked ? 'packed' : ''} ${state.animateSnap ? 'animate-snap' : ''}`}
                  style={itemStyle}
                  onPointerDown={(e) => handlePointerDown(e, item.id)}
                  onPointerMove={handlePointerMove}
                  onPointerUp={(e) => handlePointerUp(e, item.id)}
                  onDoubleClick={() => togglePackState(item.id)}
                  title={`${item.name} - Drag into the bag or tap to toggle`}
                >
                  <img
                    src={publicAsset(item.src)}
                    alt={item.name}
                    draggable={false}
                  />
                </div>
              );
            })}
          </div>

          <div className="bag-instruction-wrapper">
            <span className="just-try-text">Just try</span>
            <span className="put-everything-text">put everything in my bag!</span>
          </div>

          {allItemsPacked && (
            <div className="bag-success-message">
              🎉 Yay! All my everyday essentials are packed! Let's go! ❤️
            </div>
          )}

          <div className="bag-buttons-container">
            {/* <button
              type="button"
              className="koc-page-button"
              onClick={() => alert("Welcome to my KOC page! 💖✨")}
            >
              My KOC page ❤️
            </button> */}

            {BAG_ITEMS.some((item) => itemsState[item.id]?.isPacked) && (
              <button
                type="button"
                className="unpack-all-button"
                onClick={handleResetAll}
              >
                Reset / Unpack All
              </button>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Member3;

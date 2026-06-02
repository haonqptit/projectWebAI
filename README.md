# Our Map - Tổng hợp thuyết trình và triển khai code

## A. Tổng quan project

`Our Map` là một project frontend nhỏ dùng để giới thiệu 3 thành viên thông qua giao diện bản đồ scrapbook. Project không có backend, database hoặc API. Toàn bộ nội dung được xây dựng bằng React, TypeScript, React Router, CSS thuần và các asset ảnh/nhạc có sẵn trong project.

Mục tiêu chính của project:

- Tạo một bản đồ chung để điều hướng tới từng thành viên.
- Mỗi thành viên có một trang profile riêng.
- Mỗi trang có phong cách scrapbook/collage khác nhau.
- Mỗi trang có tương tác riêng để demo kiến thức React.

Công nghệ sử dụng:

| Công nghệ | Vai trò |
| --------- | ------- |
| React | Xây dựng component UI |
| TypeScript | Định nghĩa kiểu dữ liệu rõ ràng |
| React Router DOM | Điều hướng giữa Home Map và các trang member |
| CSS thuần | Layout, animation, responsive, scrapbook style |
| Image asset | Ảnh profile, sticker, background, item |
| Audio asset | Nhạc lofi trong trang Linh |

Các màn hình chính:

| Màn hình | File | Mục đích |
| -------- | ---- | -------- |
| Home Map | `src/App.tsx` | Hiển thị bản đồ và node của 3 thành viên |
| Urin | `src/Member1.tsx` | Profile Urin, Things I Love, Summer Bucket List |
| Linh | `src/Member2.tsx` | Profile Linh, Lofi Study Corner |
| Dariga | `src/Member3.tsx` | Profile Dariga, Everyday Bag |

## B. Cấu trúc routing

Project dùng `HashRouter` trong `src/main.tsx`.

```tsx
<HashRouter>
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="/member/:id" element={<MemberDetail />} />
  </Routes>
</HashRouter>
```

`MemberDetail.tsx` đọc `id` từ URL bằng `useParams`, sau đó render đúng component:

```tsx
if (id === '1') {
  return <Member1 />;
}
if (id === '2') {
  return <Member2 />;
}
if (id === '3') {
  return <Member3 />;
}
```

Ý nghĩa khi thuyết trình:

- `App.tsx` là màn hình bản đồ chính.
- Khi click vào member node, `useNavigate` chuyển sang `/member/:id`.
- `MemberDetail.tsx` đóng vai trò chọn trang tương ứng với từng member.

## C. Cấu trúc các file chính

| File | Component chính | Component phụ | State chính | Chức năng nổi bật | Asset sử dụng | Ghi chú |
| ---- | --------------- | ------------- | ----------- | ----------------- | ------------- | ------- |
| `Member1.tsx` | `Member1` | `UrinBucketList` | `checkedIds` | Profile Urin, Things I Love, Summer Bucket List có thể tick | `Anhvuong.png`, `anhTron.png`, sticker flower/camera | Tương tác đơn giản, dễ demo |
| `Member2.tsx` | `Member2` | `CollagePolaroid`, `InfoCard`, `LofiTrayItem` | `isStudyMode`, `isLampOn`, `isMusicOn`, `reaction`, `offset`, `isDragging` | Lofi Study Corner, bật/tắt scene, nhạc, kéo sticker | ảnh Linh, sticker, scene day/night/study, `music.mp3` | Trang dùng nhiều kỹ thuật React nhất |
| `Member3.tsx` | `Member3` | không tách component lớn | `isEntering`, `isBagScrollOpen`, `bagContainerSize`, `itemsState` | Dariga collage, Everyday Bag, kéo item vào túi | chữ cái, ảnh Dariga, sticker, Bag items | Có scroll trigger, drag/drop, collision check |

## D. Màn hình Home Map

File: `src/App.tsx`

Nội dung:

- Hiển thị background bản đồ.
- Hiển thị tiêu đề `Our Map`.
- Render 3 member node bằng `.map()`.
- Mỗi node có avatar, country tag và vị trí riêng.

Dữ liệu chính:

```tsx
const membersData: Member[] = [
  { id: 1, name: "...", country: "Mongolia", avatar: publicAsset("chibi2.jpg"), position: { top: '31%', left: '68%' } },
  { id: 2, name: "...", country: "Viet Nam", avatar: publicAsset("chibi1.jpg"), position: { top: '53%', left: '73%' } },
  { id: 3, name: "...", country: "Kazakhstan", avatar: publicAsset("chibi3.jpg"), position: { top: '34%', left: '57%' } }
];
```

Điều hướng:

```tsx
onClick={() => navigate(`/member/${member.id}`)}
```

Điểm nên nói khi demo:

- Đây là điểm bắt đầu của project.
- Người dùng click vào từng chibi để đi tới trang profile.
- `membersData` là ví dụ về render UI từ dữ liệu tĩnh.

## E. Member1 - Urin Profile & Summer Bucket List

File: `src/Member1.tsx`

### 1. Nội dung hiển thị

Trang Urin gồm:

- Nút `Back to Map`.
- Background scrapbook với sticker.
- Profile card có tên Urin.
- Ảnh vuông `anhVuong`.
- Ảnh tròn `anhTron`.
- About Me.
- Things I Love.
- Summer Bucket List.

### 2. Dữ liệu tĩnh

Bucket list được chia thành 2 cột:

```tsx
const leftItems: BucketListItem[] = [...];
const rightItems: BucketListItem[] = [...];
```

Things I Love:

```tsx
const thingsILove = ['Tea', 'Good music', 'Traveling', 'Photography', 'Sunny days', 'Flowers'];
```

Interface:

```tsx
interface BucketListItem {
  id: number;
  text: string;
  icon: string;
  bgColor: string;
}
```

### 3. Component phụ `UrinBucketList`

`UrinBucketList` quản lý riêng logic tick item.

State:

```tsx
const [checkedIds, setCheckedIds] = useState<number[]>([]);
```

Hàm xử lý:

```tsx
const toggleItem = (id: number) => {
  setCheckedIds((prev) =>
    prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
  );
};
```

Ý nghĩa:

- Nếu item đã được chọn, click lần nữa sẽ bỏ chọn.
- Nếu item chưa được chọn, click sẽ thêm vào danh sách checked.
- UI đổi class để hiển thị trạng thái checked.

### 4. Luồng tick bucket list

1. Người dùng click vào một bucket item.
2. `toggleItem(item.id)` được gọi.
3. Hàm kiểm tra `id` có trong `checkedIds` chưa.
4. Nếu có thì remove khỏi mảng.
5. Nếu chưa có thì thêm vào mảng.
6. Component re-render.
7. Item checked có class `urin-bucket-item-checked`.
8. UI hiển thị dấu tick và gạch ngang text.

Điểm demo:

- Đây là ví dụ dễ hiểu nhất về `useState`.
- Có thể tick thử vài item để thấy UI thay đổi ngay.

## F. Member2 - Linh Profile & Lofi Study Corner

File: `src/Member2.tsx`

### 1. Nội dung hiển thị

Trang Linh gồm 2 vùng chính:

- Bên trái: profile scrapbook/collage.
- Bên phải: Lofi Study Corner.

Profile bên trái có:

- Tên Linh.
- Note, sticker, ảnh collage.
- Info card.
- Status sticker.

Lofi Study Corner có:

- Scene học tập.
- Nút study mode.
- Nút lamp on/off.
- Nút play music.
- Music player.
- Tray sticker có thể kéo.
- Reaction bubble khi tương tác.

### 2. Dữ liệu tĩnh

Asset được gom vào object:

```tsx
const ASSET = {
  flower: publicAsset('items/hoa.png'),
  camera: publicAsset('items/MayAnh.png'),
  headphones: publicAsset('items/Tainghee.png'),
  ...
};
```

Ảnh:

```tsx
const PHOTO = {
  hero: publicAsset('items/link2.png'),
  cafe: publicAsset('xedap.jpg'),
  matcha: publicAsset('caffe.jpg'),
  hanbok: publicAsset('linh5.jpg'),
};
```

Scene:

```tsx
const LOFI_SCENE = {
  day: publicAsset('linh-study-frame-01-day.png'),
  night: publicAsset('linh-study-frame-03-night.png'),
  study: publicAsset('items/linh-lofi-study-writing.gif'),
};
```

Tray item:

```tsx
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
```

### 3. State và ref chính

```tsx
const [isStudyMode, setIsStudyMode] = useState(false);
const [isLampOn, setIsLampOn] = useState(true);
const [isMusicOn, setIsMusicOn] = useState(false);
const [reaction, setReaction] = useState('');
const reactionTimerRef = useRef<ReturnType<typeof window.setTimeout> | null>(null);
const audioRef = useRef<HTMLAudioElement | null>(null);
```

Ý nghĩa:

- `isStudyMode`: đổi sang scene study GIF.
- `isLampOn`: đổi giữa scene night/day.
- `isMusicOn`: trạng thái nhạc.
- `reaction`: nội dung bubble khi kéo sticker.
- `audioRef`: điều khiển audio element.
- `reactionTimerRef`: lưu timer để tự ẩn reaction.

### 4. Chọn scene theo state

```tsx
const sceneSrc = isStudyMode
  ? LOFI_SCENE.study
  : isLampOn
    ? LOFI_SCENE.night
    : LOFI_SCENE.day;
```

Ý nghĩa:

- Nếu bật study mode, ưu tiên hiện GIF study.
- Nếu không study mode, lamp on thì dùng scene night.
- Nếu lamp off thì dùng scene day.

### 5. Điều khiển nhạc

```tsx
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
```

Luồng xử lý:

1. User click play music.
2. Lấy audio element qua `audioRef`.
3. Nếu nhạc đang bật thì pause.
4. Nếu nhạc đang tắt thì gọi `play()`.
5. Cập nhật `isMusicOn`.
6. UI đổi class `is-playing`.

### 6. Kéo sticker trong lofi tray

Component `LofiTrayItem` có state và ref riêng:

```tsx
const itemRef = useRef<HTMLDivElement | null>(null);
const [offset, setOffset] = useState({ x: 0, y: 0 });
const [isDragging, setIsDragging] = useState(false);
const dragStartRef = useRef<{ pointerX: number; pointerY: number; offsetX: number; offsetY: number } | null>(null);
```

Luồng xử lý:

1. `handlePointerDown`: lưu vị trí bắt đầu và bật dragging.
2. `handlePointerMove`: tính khoảng di chuyển và cập nhật offset.
3. `handlePointerUp`: thả item, tắt dragging.
4. `handleReset`: double-click để reset vị trí.
5. `showReaction`: hiện bubble phản hồi.

Điểm demo:

- Bật/tắt study mode.
- Bật/tắt lamp.
- Play/pause nhạc.
- Kéo sticker và quan sát reaction bubble.

## G. Member3 - Dariga Profile & Everyday Bag

File: `src/Member3.tsx`

### 1. Nội dung hiển thị

Trang Dariga gồm:

- Poster collage About Me.
- Chữ cái About Me bằng ảnh.
- Ảnh, sticker, text card.
- Everyday Bag interactive section.

Everyday Bag gồm:

- Một chiếc túi ở giữa.
- Các item như hand cream, iPad, phone, lipstick, glasses, headphones, wallet, pocket camera.
- User kéo item vào túi.
- Có success message khi tất cả item đã được pack.
- Có nút Reset / Unpack All.

### 2. Dữ liệu tĩnh

Bag item:

```tsx
interface BagItemData {
  id: string;
  name: string;
  src: string;
  defaultPosition: { top: string; left: string };
  width: string;
  defaultRotate: number;
}
```

State item:

```tsx
interface ItemState {
  x: number;
  y: number;
  isDragging: boolean;
  isPacked: boolean;
  packedRotate: number;
  animateSnap: boolean;
}
```

Danh sách item:

```tsx
const BAG_ITEMS: BagItemData[] = [
  { id: 'handcream', name: 'Hand Cream', src: '/Bag/hand.webp', ... },
  { id: 'ipad', name: 'iPad', src: '/Bag/Ipad11.webp', ... },
  ...
];
```

### 3. State và ref chính

```tsx
const [isEntering, setIsEntering] = useState(false);
const [isBagScrollOpen, setIsBagScrollOpen] = useState(false);
const [bagContainerSize, setBagContainerSize] = useState({ width: 800, height: 520 });
const [itemsState, setItemsState] = useState<Record<string, ItemState>>(initialItemsState);
```

```tsx
const containerRef = useRef<HTMLDivElement | null>(null);
const bagSectionRef = useRef<HTMLElement | null>(null);
const bagRef = useRef<HTMLDivElement | null>(null);
const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});
const dragStartRef = useRef<...>(null);
```

Ý nghĩa:

- `isEntering`: chạy animation khi vào trang.
- `isBagScrollOpen`: kiểm soát item bung ra khi scroll tới bag.
- `bagContainerSize`: lưu kích thước vùng bag.
- `itemsState`: lưu trạng thái từng item.
- `bagRef`: lấy vị trí túi.
- `itemRefs`: lấy vị trí từng item.
- `dragStartRef`: lưu dữ liệu lúc bắt đầu kéo.

### 4. Scroll mở Everyday Bag

```tsx
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
```

Ý nghĩa:

- Khi user scroll tới gần section bag, item mở ra.
- Khi section còn xa, bag đóng lại.
- Có cleanup event listener để tránh memory leak.

### 5. Luồng kéo item vào túi

1. User pointer down vào item.
2. `handlePointerDown` lưu vị trí bắt đầu.
3. User kéo item.
4. `handlePointerMove` cập nhật `x`, `y`.
5. User thả item.
6. `handlePointerUp` lấy vị trí item và vị trí bag.
7. Tính tâm item.
8. Kiểm tra tâm item có nằm trong `bagRect` không.
9. Nếu có thì gọi `packItem`.
10. Nếu không thì gọi `unpackItem`.

Code kiểm tra vùng túi:

```tsx
const isInsideBag =
  itemCenter.x >= bagRect.left &&
  itemCenter.x <= bagRect.right &&
  itemCenter.y >= bagRect.top &&
  itemCenter.y <= bagRect.bottom;
```

### 6. Success message

```tsx
const allItemsPacked = BAG_ITEMS.every((item) => itemsState[item.id]?.isPacked);
```

Nếu tất cả item đã packed:

```tsx
{allItemsPacked && (
  <div className="bag-success-message">
    Yay! All my everyday essentials are packed!
  </div>
)}
```

Điểm demo:

- Scroll xuống Everyday Bag.
- Kéo một item vào túi.
- Double-click để pack/unpack.
- Pack hết item để hiện success message.
- Click Reset / Unpack All.

## H. Kỹ thuật React/TypeScript áp dụng

| Kiến thức | File sử dụng | Chức năng | Giải thích |
| --------- | ------------ | --------- | ---------- |
| `useState` | `Member1`, `Member2`, `Member3` | Lưu trạng thái UI | Checked item, mode, music, drag state, bag state |
| `useEffect` | `Member2`, `Member3` | Side effect | Cleanup audio/timer, scroll listener, ResizeObserver |
| `useRef` | `Member2`, `Member3` | Tham chiếu DOM hoặc timer | Audio ref, item ref, bag ref, drag start ref |
| `useNavigate` | `App`, `Member1`, `Member2`, `Member3` | Điều hướng | Click member hoặc Back to Map |
| `useParams` | `MemberDetail` | Đọc route param | Lấy `id` để chọn member |
| TypeScript interface/type | cả 3 member | Ràng buộc cấu trúc data | `BucketListItem`, `LofiTrayItemData`, `BagItemData`, `ItemState` |
| Conditional rendering | cả 3 member | Render theo điều kiện | tick icon, reaction bubble, success message |
| Dynamic className | cả 3 member | Đổi style theo state | checked, active, dragging, packed |
| Inline style | cả 3 member | Truyền style động | màu bucket item, vị trí item, transform |
| Pointer events | `Member2`, `Member3` | Drag/drop | `onPointerDown`, `onPointerMove`, `onPointerUp` |
| Audio API | `Member2` | Play/pause nhạc | gọi `audio.play()` và `audio.pause()` |
| ResizeObserver | `Member3` | Theo dõi size bag container | giúp tính vị trí item chính xác |

## I. Phân tích UI/UX

| Trang | Phong cách thiết kế | Thành phần UI nổi bật | Cảm giác đem lại | Gợi ý demo |
| ----- | ------------------- | --------------------- | ---------------- | ---------- |
| Home Map | Scrapbook map | Chibi node, country tag | Dễ thương, khám phá | Click từng member node |
| Urin | Summer scrapbook | Ảnh polaroid, Things I Love, Bucket List | Nhẹ nhàng, vui tươi | Tick checklist |
| Linh | Vintage scrapbook + lofi | Study scene, music player, sticker tray | Chill, học tập | Bật study mode và play music |
| Dariga | Collage poster | About Me letters, ảnh, sticker | Cá tính, năng động | Scroll xuống Everyday Bag |
| Everyday Bag | Interactive mini game | Túi và các item kéo thả | Trực quan, vui | Kéo item vào túi |

## J. Dàn ý slide thuyết trình

### Slide 1: Giới thiệu project

Nội dung:

- Tên project: `Our Map`.
- Frontend React/TypeScript.
- Chủ đề scrapbook map giới thiệu 3 thành viên.

Hình ảnh nên dùng:

- Screenshot Home Map.

Lời nói gợi ý:

> Đây là project frontend nhỏ, mục tiêu là tạo một bản đồ scrapbook để giới thiệu từng thành viên qua các trang cá nhân có tương tác.

### Slide 2: Mục tiêu project

Nội dung:

- Cá nhân hóa từng member page.
- Kết hợp profile và tương tác.
- Demo kiến thức React qua UI trực quan.

Hình ảnh:

- 3 screenshot của 3 member page.

Lời nói:

> Mỗi thành viên không chỉ có thông tin cá nhân mà còn có một hoạt động tương tác riêng để thể hiện cá tính.

### Slide 3: Công nghệ sử dụng

Nội dung:

- React.
- TypeScript.
- React Router.
- CSS.
- Image/audio assets.

Hình ảnh:

- Logo công nghệ hoặc bảng tech stack.

Lời nói:

> Project không dùng backend, toàn bộ logic nằm ở frontend, chủ yếu là state, ref, effect và CSS interaction.

### Slide 4: Cấu trúc project

Nội dung:

- `App.tsx`: Home Map.
- `MemberDetail.tsx`: chọn member theo route.
- `Member1/2/3.tsx`: các trang member.
- `App.css`: style toàn project.

Hình ảnh:

- Sơ đồ file hoặc route flow.

Lời nói:

> Route `/member/:id` giúp dùng chung một đường dẫn động cho 3 trang member.

### Slide 5: Home Map

Nội dung:

- Map scrapbook.
- 3 member node.
- Click để điều hướng.

Hình ảnh:

- Screenshot map.

Lời nói:

> Home Map là màn hình điều hướng chính, dữ liệu thành viên được render bằng `.map()`.

### Slide 6: Member1 - Urin

Nội dung:

- Profile Urin.
- Things I Love.
- Summer Bucket List.
- Tick/check item.

Hình ảnh:

- Screenshot Urin page.

Lời nói:

> Trang Urin tập trung vào tương tác checklist đơn giản, phù hợp để giải thích `useState`.

### Slide 7: Code Member1

Nội dung:

- `BucketListItem` interface.
- `checkedIds` state.
- `toggleItem`.
- Dynamic class checked.

Hình ảnh:

- Code snippet `toggleItem`.

Lời nói:

> Khi click item, state thay đổi, React re-render và UI tự cập nhật trạng thái checked.

### Slide 8: Member2 - Linh

Nội dung:

- Scrapbook profile.
- Lofi Study Corner.
- Study mode, lamp, music.
- Drag sticker.

Hình ảnh:

- Screenshot Linh page.

Lời nói:

> Trang Linh có nhiều tương tác nhất, gồm điều khiển scene, audio và kéo sticker.

### Slide 9: Code Member2

Nội dung:

- `isStudyMode`, `isLampOn`, `isMusicOn`.
- `audioRef`.
- `LofiTrayItem`.
- Pointer event.

Hình ảnh:

- Code snippet `handleMusicToggle` hoặc `sceneSrc`.

Lời nói:

> Đây là ví dụ tốt để trình bày `useRef`, vì audio element được điều khiển trực tiếp qua ref.

### Slide 10: Member3 - Dariga

Nội dung:

- Collage profile.
- Everyday Bag.
- Scroll mở bag.
- Drag item vào túi.

Hình ảnh:

- Screenshot Dariga và Everyday Bag.

Lời nói:

> Trang Dariga giống một mini interaction game, user kéo vật dụng vào túi.

### Slide 11: Code Member3

Nội dung:

- `itemsState`.
- `bagRef`, `itemRefs`.
- `handlePointerDown/Move/Up`.
- Kiểm tra item nằm trong bag rect.

Hình ảnh:

- Code snippet `isInsideBag`.

Lời nói:

> Khi thả item, code lấy vị trí DOM của item và túi, sau đó kiểm tra tâm item có nằm trong vùng túi hay không.

### Slide 12: Tổng kết và hướng phát triển

Nội dung:

- Project thể hiện component, state, ref, effect, router.
- UI có tính cá nhân hóa.
- Có nhiều interaction để demo.
- Hướng phát triển:
  - lưu trạng thái checklist/bag vào localStorage;
  - thêm playlist;
  - tách CSS theo component;
  - tối ưu responsive;
  - thêm dữ liệu member từ config.

Hình ảnh:

- Tổng hợp 3 member page.

Lời nói:

> Project cho thấy React có thể tạo ra giao diện cá nhân hóa và tương tác sinh động mà không cần backend.

## K. Kịch bản demo project

Thứ tự demo đề xuất:

1. Mở Home Map.
2. Giới thiệu 3 node thành viên.
3. Click Urin.
4. Giới thiệu ảnh, About Me, Things I Love.
5. Tick 2 đến 3 bucket list item.
6. Click Back to Map.
7. Click Linh.
8. Bật study mode.
9. Bật/tắt lamp.
10. Play/pause music.
11. Kéo sticker trong lofi tray.
12. Click Back to Map.
13. Click Dariga.
14. Giới thiệu collage profile.
15. Scroll xuống Everyday Bag.
16. Kéo vài item vào túi.
17. Pack hết item để hiện success message.
18. Click Reset / Unpack All.

## L. Các điểm cần kiểm tra thêm

- Cần kiểm tra thêm `App.css` nếu muốn trình bày chi tiết từng animation và responsive.
- Cần kiểm tra asset folder nếu muốn làm slide liệt kê đầy đủ ảnh, sticker và nhạc.
- Project không có backend, database hoặc API, nên không nên trình bày theo hướng full-stack.
- Nên chạy `npm run build` trước khi demo để đảm bảo project build được.
- Nếu muốn nộp code sạch hơn, có thể tách CSS theo từng member page trong tương lai.


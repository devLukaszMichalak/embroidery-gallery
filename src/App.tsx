import Masonry from './components/Masonry.tsx';
import { useState } from 'react';
import FullscreenImage from './components/FullscreenImage.tsx';
import { imageUrls } from './images.ts';

const App = () => {
  
  const [fullscreenImageUrl, setFullscreenImageUrl] = useState<string | null>(null);
  
  const closeFullscreen = () => setFullscreenImageUrl(null);
  
  return (
    <main className="size-full @container">
      <Masonry setFullscreenImageUrl={setFullscreenImageUrl} imageUrls={imageUrls}/>
      {fullscreenImageUrl !== null && (
        <FullscreenImage imageUrl={fullscreenImageUrl} closeFullscreen={closeFullscreen}/>
      )}
    </main>
  );
};


export default App;

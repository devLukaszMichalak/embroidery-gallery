import Masonry from './components/Masonry.tsx';
import { useState } from 'react';
import FullscreenImage from './components/FullscreenImage.tsx';

export const imgUrl = `https://images.unsplash.com/photo-1716369414811-ab4b06d8fb0e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNnx8fGVufDB8fHx8fA%3D%3D`;
export const imgUrl2 = `https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg`;

const App = () => {
  
  const [fullscreenImageUrl, setFullscreenImageUrl] = useState<string | null>(null);
  
  const closeFullscreen = () => setFullscreenImageUrl(null);
  
  const imageUrls = [imgUrl, imgUrl, imgUrl2, imgUrl2, imgUrl, imgUrl2, imgUrl, imgUrl2, imgUrl, imgUrl2, imgUrl2, imgUrl, imgUrl, imgUrl2, imgUrl, imgUrl];
  
  return (
    <main className="size-full @container">
      <Masonry setFullscreenImageUrl={setFullscreenImageUrl} imageUrls={imageUrls}/>
        {fullscreenImageUrl !== null && (
          <FullscreenImage imageUrl={fullscreenImageUrl} closeFullscreen={closeFullscreen}
          />
        )}
    </main>
  );
};


export default App;

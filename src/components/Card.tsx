import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { type MasonryElement } from '../images.ts';

type Props = {
  imageUrl: MasonryElement,
  setFullscreenImageUrl: Dispatch<SetStateAction<string | null>>,
}

const Card = ({ imageUrl, setFullscreenImageUrl }: Props) => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => setLoading(false);
  }, [imageUrl]);
  
  return (
    <div className="size-full drop-shadow-xl hover:scale-105 transition-all duration-300 overflow-clip border border-stone-400 rounded-md">
      {loading ? (
        <div className="animate-pulse w-full text-xs h-full min-h-80 flex items-center justify-center bg-stone-300" />
      ) : (
        <img
          onClick={() => setFullscreenImageUrl(imageUrl)}
          className="hover:scale-110 aspect-auto w-full transition-all duration-500 cursor-pointer"
          src={imageUrl}
        />
      )}
    </div>
  );
};

export default Card;

import { useEffect, useState } from 'react';
import { timer } from 'rxjs';

type Props = {
  imageUrl: string,
  closeFullscreen: () => void
}

const FullscreenImage = ({imageUrl, closeFullscreen}: Props) => {
  
  const [opacityClass, setOpacityClass] = useState('opacity-0');
  
  const handleCloseFullscreen = () => {
    setOpacityClass('opacity-0');
    
    timer(300).subscribe(() => closeFullscreen());
  };
  
  useEffect(() => {
    timer(10).subscribe(() => setOpacityClass('opacity-1'));
  }, []);
  
  return (
    <div
      onClick={handleCloseFullscreen}
      className={`fixed top-0 left-0 size-full bg-stone-950 bg-opacity-90 flex
        justify-center items-center z-50 duration-300 transition-all ${opacityClass}`}
    >
      <img
        src={imageUrl}
        className="rounded-xl max-w-[90%] z-50 max-h-[90%]"
      />
    </div>
  );
};

export default FullscreenImage;

import Card from './Card.tsx';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { fromEvent, throttleTime } from 'rxjs';
import { type MasonryElement } from '../images.ts';

const getColumns = (n: number): number[] =>
  Array.from({length: n}, (_, i) => i);

const calculateColumnsCount = (): 4 | 3 | 2 => {
  if (window.innerWidth >= 1140) {
    return 4;
  } else if (window.innerWidth >= 768) {
    return 3;
  } else {
    return 2;
  }
};

type Props = {
  setFullscreenImageUrl: Dispatch<SetStateAction<string | null>>,
  imageUrls: MasonryElement[]
};

const Masonry = ({setFullscreenImageUrl, imageUrls}: Props) => {
  
  const [columnsCount, setColumnsCount] = useState<number>(calculateColumnsCount());
  const previousColumnsCount = useRef(columnsCount);
  
  useEffect(() => {
    const handleResize = () => {
      const newColumnsCount = calculateColumnsCount();
      
      if (newColumnsCount !== previousColumnsCount.current) {
        previousColumnsCount.current = newColumnsCount;
        setColumnsCount(newColumnsCount);
      }
    };
    
    const resize$ = fromEvent(window, 'resize')
      .pipe(throttleTime(200))
      .subscribe(() => handleResize());
    
    return () => {
      resize$.unsubscribe();
    };
  }, []);
  
  
  const separateColumnImages = (column: number) =>
    (_: unknown, itemIndex: number) => itemIndex % columnsCount === column;
  
  return (
    <div className="my-5 size-full flex items-start justify-center px-8 @sm:px-12 @md:px-16 @7xl:px-40 gap-5">
      {
        getColumns(columnsCount).map((column) => (
          <div key={column} className="size-full flex flex-col gap-5">
            {imageUrls
              .filter(separateColumnImages(column))
              .map((imageUrl) =>
                <Card setFullscreenImageUrl={setFullscreenImageUrl} key={imageUrl} imageUrl={imageUrl}/>)}
          </div>
        ))
      }
    </div>
  );
};

export default Masonry;

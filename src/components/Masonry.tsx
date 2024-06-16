import Card from './Card.tsx';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { fromEvent, throttleTime } from 'rxjs';

const getColumns = (n: number): number[] =>
  Array.from({length: n}, (_, i) => i);

const calculateColumnsCount = () => {
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
  imageUrls: string[]
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
              .map((imageUrl, i) =>
                <Card setFullscreenImageUrl={setFullscreenImageUrl} key={`${column}-${i}`} imageUrl={imageUrl}/>)}
          </div>
        ))
      }
    </div>
  );
};

export default Masonry;

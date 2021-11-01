import React, { useState, useCallback } from "react";

import "./image-carousel.css";

import { IconButton } from "@chakra-ui/button";
import { Circle } from "@chakra-ui/react";
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";

// const strToBase64 = (str: any) => {
//   return btoa(String.fromCharCode.apply(null, str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ")));
// }

interface ImgCarouselProps {
  images: string[];
}

const ImgCarousel: React.FC<ImgCarouselProps> = (props: ImgCarouselProps) => {
  const { images } = props;

  const [imgSelected, setImgSelected] = useState<number>(0);

  const slideLeft = useCallback(() => {
    setImgSelected((prev) => prev - 1);
  }, [setImgSelected]);

  const slideRight = useCallback(() => {
    setImgSelected((prev) => prev + 1);
  }, [setImgSelected]);

  const onCircleClick = useCallback(
    (idx: number) => {
      setImgSelected(idx);
    },
    [setImgSelected]
  );

  return (
    <div className="img-carousel">
      <IconButton
        aria-label="View previous img"
        className="left-button"
        colorScheme="teal"
        disabled={imgSelected === 0}
        icon={<ChevronLeft />}
        style={{}}
        size="sm"
        onClick={slideLeft}
      />

      <img className="img" alt="Property" src={images[imgSelected]} width="100%" height="250px" />

      <IconButton
        aria-label="View next img"
        className="right-button"
        colorScheme="teal"
        disabled={imgSelected === images.length - 1}
        icon={<ChevronRight />}
        style={{}}
        size="sm"
        onClick={slideRight}
      />
      <div className="slider-progress">
        {images.map((id, idx) => (
          <Circle
            size="10px"
            bg={imgSelected === idx ? "teal" : "white"}
            key={id}
            className="progress-circle"
            onClick={() => onCircleClick(idx)}
          />
        ))}
      </div>
    </div>
  );
};

const MemoImgCarousel = React.memo(ImgCarousel);
export { MemoImgCarousel as ImgCarousel };
export default MemoImgCarousel;

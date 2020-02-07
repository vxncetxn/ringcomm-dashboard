import React, { useState } from "react";
import Lightbox from "react-image-lightbox";

const BetterLightbox = ({ images, clickedIdx, dismissFunc }) => {
  const [initialIdx, setInitialIdx] = useState(clickedIdx);

  return (
    <Lightbox
      mainSrc={require(`${images[initialIdx]}`)}
      nextSrc={
        images.length > 1
          ? require(`${images[(initialIdx + 1) % images.length]}`)
          : null
      }
      prevSrc={
        images.length > 1
          ? images[(initialIdx + images.length - 1) % images.length]
          : null
      }
      onCloseRequest={() => dismissFunc()}
      onMovePrevRequest={
        images.length > 1
          ? () =>
              setInitialIdx((initialIdx + images.length - 1) % images.length)
          : null
      }
      onMoveNextRequest={
        images.length > 1
          ? () => setInitialIdx((initialIdx + 1) % images.length)
          : null
      }
      clickOutsideToClose={true}
      animationDisabled={true}
    />
  );
};

export default BetterLightbox;

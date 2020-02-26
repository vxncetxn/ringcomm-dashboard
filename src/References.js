import React, { useState } from "react";
import styled from "styled-components";

import BetterLightbox from "./BetterLightbox";

const References = styled.div`
  display: flex;
  margin-top: 10px;

  & > img {
    width: 100px;
    height: 100px;
    cursor: pointer;
  }

  & > img + img {
    margin-left: 10px;
  }
`;

const ReferencesComp = ({ images, referenceContext }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [clickedIdx, setClickedIdx] = useState(0);

  return (
    <>
      <References>
        {images.map((image, idx) => {
          return (
            <img
              key={idx}
              src={image}
              alt={`Reference ${idx + 1} for ${referenceContext}`}
              onClick={() => {
                setClickedIdx(idx);
                setLightboxOpen(true);
              }}
            />
          );
        })}
      </References>
      {lightboxOpen && (
        <BetterLightbox
          images={images}
          clickedIdx={clickedIdx}
          dismissFunc={() => setLightboxOpen(false)}
        />
      )}
    </>
  );
};

export default ReferencesComp;

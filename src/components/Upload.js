import React, { useState, useEffect } from "react";
import styled from "styled-components";

const UploadWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const UploadInput = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;

  &:hover + button {
    color: var(--color-element-dark);
    background-color: var(--color-accent-main);
  }
`;

const Upload = styled.button`
  cursor: pointer;
  text-align: center;
  font-size: 14px;
  font-family: var(--font-primary);
  font-size: 16px;
  color: var(--color-accent-main);
  border: 1px solid var(--color-accent-main);
  background-color: var(--color-element-dark);
  padding: 5px 10px;
`;

const ThumbnailGallery = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly !important;
`;

const Thumbnail = styled.div`
  position: relative;
  margin-top: 15px;

  & > img {
    width: 75px;
    height: 75px;
  }

  & > span {
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(30%, -30%);
    display: block;
    box-sizing: border-box;
    width: 20px;
    height: 20px;
    border-width: 3px;
    border-style: solid;
    border-color: var(--color-element-light);
    border-radius: 100%;
    background: -webkit-linear-gradient(
        -45deg,
        transparent 0%,
        transparent 46%,
        var(--color-accent-main) 46%,
        var(--color-accent-main) 56%,
        transparent 56%,
        transparent 100%
      ),
      -webkit-linear-gradient(45deg, transparent 0%, transparent 46%, var(
              --color-accent-main
            )
            46%, var(--color-accent-main) 56%, transparent 56%, transparent 100%);
    background-color: var(--color-element-light);
    box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.5);
    // transition: all 0.3s ease;
  }
`;

async function fileListToBase64(fileList) {
  // create function which return resolved promise
  // with data:base64 string
  function getBase64(file) {
    const reader = new FileReader();
    return new Promise(resolve => {
      reader.onload = ev => {
        resolve(ev.target.result);
      };
      reader.readAsDataURL(file);
    });
  }
  // here will be array of promisified functions
  const promises = [];

  // loop through fileList with for loop
  for (let i = 0; i < fileList.length; i++) {
    promises.push(getBase64(fileList[i]));
  }

  // array with base64 strings
  return await Promise.all(promises);
}

const UploadComp = ({ field, setField, onChange, ...others }) => {
  // const [thumbnailsArr, setThumbnailsArr] = useState([]);

  // useEffect(() => {
  //   const convert = async () => {
  //     const arrayOfBase64 = await fileListToBase64(field);
  //     setThumbnailsArr(arrayOfBase64);
  //   };

  //   convert();
  // }, [field]);

  return (
    <UploadWrapper {...others}>
      <UploadInput
        type="file"
        accept=".jpg, .jpeg, .png"
        multiple
        onChange={async e => {
          onChange();
          setField(await fileListToBase64(Array.from(e.target.files)));
        }}
      />
      <Upload>Upload References</Upload>
      <ThumbnailGallery>
        {field.map((thumbnail, idx) => (
          <Thumbnail>
            <img src={thumbnail} alt="" />
            <span
              onClick={() =>
                setField([
                  ...field.slice(0, idx),
                  ...field.slice(idx + 1, field.length)
                ])
              }
            />
          </Thumbnail>
        ))}
        {/* {thumbnailsArr.map((thumbnail, idx) => (
          <Thumbnail>
            <img src={thumbnail} alt="" />
            <span
              onClick={() =>
                setField([
                  ...field.slice(0, idx),
                  ...field.slice(idx + 1, field.length)
                ])
              }
            />
          </Thumbnail>
        ))} */}
      </ThumbnailGallery>
    </UploadWrapper>
  );
};

export default UploadComp;

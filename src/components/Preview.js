import React from 'react';
import styled, { keyframes } from 'styled-components';
import URLSearchParams from '@ungap/url-search-params';
import Download from './DownloadBtn';
import IconClose from './IconClose';
import BodyBg from '../assets/img/bg.texture.png';

const BounceInDown = keyframes`
from,
  60%,
  75%,
  90%,
  to {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  0% {
    opacity: 0;
    -webkit-transform: scale(0.96) translate3d(0, -3000px, 0);
    transform: scale(0.96)  translate3d(0, -3000px, 0);
  }

  60% {
    opacity: 1;
    -webkit-transform: scale(0.96) translate3d(0, 25px, 0);
    transform: scale(0.96)  translate3d(0, 25px, 0);
  }

  75% {
    -webkit-transform: scale(0.96) translate3d(0, -10px, 0);
    transform: scale(0.96)  translate3d(0, -10px, 0);
  }

  90% {
    -webkit-transform: scale(0.96) translate3d(0, 5px, 0);
    transform: scale(0.96)  translate3d(0, 5px, 0);
  }

  to {
    -webkit-transform: scale(0.96)  translate3d(0, 0, 0);
    transform: scale(0.96) translate3d(0, 0, 0);
  }
`;
const ua = navigator.userAgent;
const isiOSwebview = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(ua);
const isWebview = ua.toLowerCase().indexOf('micromessenger') > -1 || isiOSwebview;
const Wrapper = styled.section`
  font-variant: normal;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 999;
  background-color: ${({ bgColor }) => bgColor};
  background-image: url(${BodyBg});
  width: 100%;
  height: 100%;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
  animation: ${BounceInDown} 1s;
  animation-fill-mode: both;
  &.starting {
    animation: none;
    transform: initial;
  }
  &.img {
    .downloadImg {
      width: 100%;
      height: 100%;
    }
    hgroup,
    .figure {
      display: none;
    }
  }
  .name {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 99;
    margin-left: 1.2rem;
    margin-top: 1.4rem;
    display: flex;
    align-items: flex-end;
    > h1 {
      font-family: 'TChinese', 'SimSun', 'FangSong', 'STSong', 'STZhongsong', 'LiSu', 'KaiTi',
        'Microsoft YaHei';
      font-size: 6rem;
      width: 6rem;
      opacity: 0.8;
      padding-top: 0.4rem;
    }
    > h2 {
      font-size: 2.4rem;
      text-transform: capitalize;
      transform-origin: left;
      transform: rotate(90deg);
      color: rgba(255, 255, 235, 0.4);
      margin-bottom: 2.6rem;
      margin-left: 1rem;
      font-weight: bold;
      white-space: nowrap;
    }
  }
  .figure {
    position: absolute;
    bottom: 0;
    right: 0;
  }
`;

const Preview = ({ name, pinyin, color, figure = 'default.png?width=8rem', closePreview }) => {
  console.log('ffff', figure);
  const params = new URLSearchParams(figure.split('?')[1] || '');
  const figureW = params.get('width') || '23rem';
  const figureO = +(params.get('o') || 1);
  return (
    <Wrapper id="PREVIEW" bgColor={color}>
      <IconClose closePreview={closePreview} data-html2canvas-ignore />
      <hgroup className="name">
        <h1>{name}</h1>
        <h2>{pinyin}</h2>
      </hgroup>
      {figure && (
        <img
          className="figure"
          style={{ width: figureW, opacity: figureO }}
          src={`figure/${figure}`}
          alt="figure"
        />
      )}
      <Download name={name} isWebview={isWebview} data-html2canvas-ignore />
    </Wrapper>
  );
};

export default Preview;
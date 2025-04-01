import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAuth } from "@/lib/supabase/auth";

const LoadingScreen = () => {
  const [show, setShow] = useState(true);
  const [animationComplete, setAnimationComplete] = useState(false);
  const { loading: authLoading } = useAuth();

  // Handle the animation completion
  useEffect(() => {
    const animationTimer = setTimeout(() => {
      setAnimationComplete(true);
      setShow(false);
    }, 3000); // Exactly 3 seconds duration

    return () => clearTimeout(animationTimer);
  }, []);

  if (!show) return null;

  return (
    <StyledLoadingScreen>
      <div className="loader">
        <div className="box box0">
          <div />
        </div>
        <div className="box box1">
          <div />
        </div>
        <div className="box box2">
          <div />
        </div>
        <div className="box box3">
          <div />
        </div>
        <div className="box box4">
          <div />
        </div>
        <div className="box box5">
          <div />
        </div>
        <div className="box box6">
          <div />
        </div>
        <div className="box box7">
          <div />
        </div>
        <div className="ground">
          <div />
        </div>
      </div>
    </StyledLoadingScreen>
  );
}

const StyledLoadingScreen = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0c0c0c;
  z-index: 9999;
  
  .loader {
    --duration: 3s;
    --primary: #3355E8; /* Using primary light from color palette */
    --primary-light: #0030C; /* Using primary main from color palette */
    --primary-rgba: rgba(51, 85, 232, 0);
    width: 200px;
    height: 320px;
    position: relative;
    transform-style: preserve-3d;
  }

  @media (max-width: 480px) {
    .loader {
      zoom: 0.44;
    }
  }

  .loader:before, .loader:after {
    --r: 20.5deg;
    content: "";
    width: 320px;
    height: 140px;
    position: absolute;
    right: 32%;
    bottom: -11px;
    background: #212121; /* Using gray900 from color palette */
    transform: translateZ(200px) rotate(var(--r));
    -webkit-animation: mask var(--duration) linear forwards infinite;
    animation: mask var(--duration) linear forwards infinite;
  }

  .loader:after {
    --r: -20.5deg;
    right: auto;
    left: 32%;
  }

  .loader .ground {
    position: absolute;
    left: -50px;
    bottom: -120px;
    transform-style: preserve-3d;
    transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1);
  }

  .loader .ground div {
    transform: rotateX(90deg) rotateY(0deg) translate(-48px, -120px) translateZ(100px) scale(0);
    width: 200px;
    height: 200px;
    background: var(--primary);
    background: linear-gradient(45deg, var(--primary) 0%, var(--primary) 50%, var(--primary-light) 50%, var(--primary-light) 100%);
    transform-style: preserve-3d;
    -webkit-animation: ground var(--duration) linear forwards infinite;
    animation: ground var(--duration) linear forwards infinite;
  }

  .loader .ground div:before, .loader .ground div:after {
    --rx: 90deg;
    --ry: 0deg;
    --x: 44px;
    --y: 162px;
    --z: -50px;
    content: "";
    width: 156px;
    height: 300px;
    opacity: 0;
    background: linear-gradient(var(--primary), var(--primary-rgba));
    position: absolute;
    transform: rotateX(var(--rx)) rotateY(var(--ry)) translate(var(--x), var(--y)) translateZ(var(--z));
    -webkit-animation: ground-shine var(--duration) linear forwards infinite;
    animation: ground-shine var(--duration) linear forwards infinite;
  }

  .loader .ground div:after {
    --rx: 90deg;
    --ry: 90deg;
    --x: 0;
    --y: 177px;
    --z: 150px;
  }

  .loader .box {
    --x: 0;
    --y: 0;
    position: absolute;
    -webkit-animation: var(--duration) linear forwards infinite;
    animation: var(--duration) linear forwards infinite;
    transform: translate(var(--x), var(--y));
  }

  .loader .box div {
    background-color: var(--primary);
    width: 48px;
    height: 48px;
    position: relative;
    transform-style: preserve-3d;
    -webkit-animation: var(--duration) ease forwards infinite;
    animation: var(--duration) ease forwards infinite;
    transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0);
  }

  .loader .box div:before, .loader .box div:after {
    --rx: 90deg;
    --ry: 0deg;
    --z: 24px;
    --y: -24px;
    --x: 0;
    content: "";
    position: absolute;
    background-color: inherit;
    width: inherit;
    height: inherit;
    transform: rotateX(var(--rx)) rotateY(var(--ry)) translate(var(--x), var(--y)) translateZ(var(--z));
    filter: brightness(var(--b, 1.2));
  }

  .loader .box div:after {
    --rx: 0deg;
    --ry: 90deg;
    --x: 24px;
    --y: 0;
    --b: 1.4;
  }

  .loader .box.box0 {
    --x: -220px;
    --y: -120px;
    left: 58px;
    top: 108px;
  }

  .loader .box.box1 {
    --x: -260px;
    --y: 120px;
    left: 25px;
    top: 120px;
  }

  .loader .box.box2 {
    --x: 120px;
    --y: -190px;
    left: 58px;
    top: 64px;
  }

  .loader .box.box3 {
    --x: 280px;
    --y: -40px;
    left: 91px;
    top: 120px;
  }

  .loader .box.box4 {
    --x: 60px;
    --y: 200px;
    left: 58px;
    top: 132px;
  }

  .loader .box.box5 {
    --x: -220px;
    --y: -120px;
    left: 25px;
    top: 76px;
  }

  .loader .box.box6 {
    --x: -260px;
    --y: 120px;
    left: 91px;
    top: 76px;
  }

  .loader .box.box7 {
    --x: -240px;
    --y: 200px;
    left: 58px;
    top: 87px;
  }

  .loader .box0 {
    -webkit-animation-name: box-move0;
    animation-name: box-move0;
  }

  .loader .box0 div {
    -webkit-animation-name: box-scale0;
    animation-name: box-scale0;
  }

  .loader .box1 {
    -webkit-animation-name: box-move1;
    animation-name: box-move1;
  }

  .loader .box1 div {
    -webkit-animation-name: box-scale1;
    animation-name: box-scale1;
  }

  .loader .box2 {
    -webkit-animation-name: box-move2;
    animation-name: box-move2;
  }

  .loader .box2 div {
    -webkit-animation-name: box-scale2;
    animation-name: box-scale2;
  }

  .loader .box3 {
    -webkit-animation-name: box-move3;
    animation-name: box-move3;
  }

  .loader .box3 div {
    -webkit-animation-name: box-scale3;
    animation-name: box-scale3;
  }

  .loader .box4 {
    -webkit-animation-name: box-move4;
    animation-name: box-move4;
  }

  .loader .box4 div {
    -webkit-animation-name: box-scale4;
    animation-name: box-scale4;
  }

  .loader .box5 {
    -webkit-animation-name: box-move5;
    animation-name: box-move5;
  }

  .loader .box5 div {
    -webkit-animation-name: box-scale5;
    animation-name: box-scale5;
  }

  .loader .box6 {
    -webkit-animation-name: box-move6;
    animation-name: box-move6;
  }

  .loader .box6 div {
    -webkit-animation-name: box-scale6;
    animation-name: box-scale6;
  }

  .loader .box7 {
    -webkit-animation-name: box-move7;
    animation-name: box-move7;
  }

  .loader .box7 div {
    -webkit-animation-name: box-scale7;
    animation-name: box-scale7;
  }

  @-webkit-keyframes box-move0 {
    12% {
      transform: translate(var(--x), var(--y));
    }

    25%, 52% {
      transform: translate(0, 0);
    }

    80% {
      transform: translate(0, -32px);
    }

    90%, 100% {
      transform: translate(0, 188px);
    }
  }

  @keyframes box-move0 {
    12% {
      transform: translate(var(--x), var(--y));
    }

    25%, 52% {
      transform: translate(0, 0);
    }

    80% {
      transform: translate(0, -32px);
    }

    90%, 100% {
      transform: translate(0, 188px);
    }
  }

  @-webkit-keyframes box-scale0 {
    6% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0);
    }

    14%, 100% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1);
    }
  }

  @keyframes box-scale0 {
    6% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0);
    }

    14%, 100% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1);
    }
  }

  @-webkit-keyframes box-move1 {
    16% {
      transform: translate(var(--x), var(--y));
    }

    29%, 52% {
      transform: translate(0, 0);
    }

    80% {
      transform: translate(0, -32px);
    }

    90%, 100% {
      transform: translate(0, 188px);
    }
  }

  @keyframes box-move1 {
    16% {
      transform: translate(var(--x), var(--y));
    }

    29%, 52% {
      transform: translate(0, 0);
    }

    80% {
      transform: translate(0, -32px);
    }

    90%, 100% {
      transform: translate(0, 188px);
    }
  }

  @-webkit-keyframes box-scale1 {
    10% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0);
    }

    18%, 100% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1);
    }
  }

  @keyframes box-scale1 {
    10% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0);
    }

    18%, 100% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1);
    }
  }

  @-webkit-keyframes box-move2 {
    20% {
      transform: translate(var(--x), var(--y));
    }

    33%, 52% {
      transform: translate(0, 0);
    }

    80% {
      transform: translate(0, -32px);
    }

    90%, 100% {
      transform: translate(0, 188px);
    }
  }

  @keyframes box-move2 {
    20% {
      transform: translate(var(--x), var(--y));
    }

    33%, 52% {
      transform: translate(0, 0);
    }

    80% {
      transform: translate(0, -32px);
    }

    90%, 100% {
      transform: translate(0, 188px);
    }
  }

  @-webkit-keyframes box-scale2 {
    14% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0);
    }

    22%, 100% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1);
    }
  }

  @keyframes box-scale2 {
    14% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0);
    }

    22%, 100% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1);
    }
  }

  @-webkit-keyframes box-move3 {
    24% {
      transform: translate(var(--x), var(--y));
    }

    37%, 52% {
      transform: translate(0, 0);
    }

    80% {
      transform: translate(0, -32px);
    }

    90%, 100% {
      transform: translate(0, 188px);
    }
  }

  @keyframes box-move3 {
    24% {
      transform: translate(var(--x), var(--y));
    }

    37%, 52% {
      transform: translate(0, 0);
    }

    80% {
      transform: translate(0, -32px);
    }

    90%, 100% {
      transform: translate(0, 188px);
    }
  }

  @-webkit-keyframes box-scale3 {
    18% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0);
    }

    26%, 100% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1);
    }
  }

  @keyframes box-scale3 {
    18% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0);
    }

    26%, 100% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1);
    }
  }

  @-webkit-keyframes box-move4 {
    28% {
      transform: translate(var(--x), var(--y));
    }

    41%, 52% {
      transform: translate(0, 0);
    }

    80% {
      transform: translate(0, -32px);
    }

    90%, 100% {
      transform: translate(0, 188px);
    }
  }

  @keyframes box-move4 {
    28% {
      transform: translate(var(--x), var(--y));
    }

    41%, 52% {
      transform: translate(0, 0);
    }

    80% {
      transform: translate(0, -32px);
    }

    90%, 100% {
      transform: translate(0, 188px);
    }
  }

  @-webkit-keyframes box-scale4 {
    22% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0);
    }

    30%, 100% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1);
    }
  }

  @keyframes box-scale4 {
    22% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0);
    }

    30%, 100% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1);
    }
  }

  @-webkit-keyframes box-move5 {
    32% {
      transform: translate(var(--x), var(--y));
    }

    45%, 52% {
      transform: translate(0, 0);
    }

    80% {
      transform: translate(0, -32px);
    }

    90%, 100% {
      transform: translate(0, 188px);
    }
  }

  @keyframes box-move5 {
    32% {
      transform: translate(var(--x), var(--y));
    }

    45%, 52% {
      transform: translate(0, 0);
    }

    80% {
      transform: translate(0, -32px);
    }

    90%, 100% {
      transform: translate(0, 188px);
    }
  }

  @-webkit-keyframes box-scale5 {
    26% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0);
    }

    34%, 100% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1);
    }
  }

  @keyframes box-scale5 {
    26% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0);
    }

    34%, 100% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1);
    }
  }

  @-webkit-keyframes box-move6 {
    36% {
      transform: translate(var(--x), var(--y));
    }

    49%, 52% {
      transform: translate(0, 0);
    }

    80% {
      transform: translate(0, -32px);
    }

    90%, 100% {
      transform: translate(0, 188px);
    }
  }

  @keyframes box-move6 {
    36% {
      transform: translate(var(--x), var(--y));
    }

    49%, 52% {
      transform: translate(0, 0);
    }

    80% {
      transform: translate(0, -32px);
    }

    90%, 100% {
      transform: translate(0, 188px);
    }
  }

  @-webkit-keyframes box-scale6 {
    30% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0);
    }

    38%, 100% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1);
    }
  }

  @keyframes box-scale6 {
    30% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0);
    }

    38%, 100% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1);
    }
  }

  @-webkit-keyframes box-move7 {
    40% {
      transform: translate(var(--x), var(--y));
    }

    53%, 52% {
      transform: translate(0, 0);
    }

    80% {
      transform: translate(0, -32px);
    }

    90%, 100% {
      transform: translate(0, 188px);
    }
  }

  @keyframes box-move7 {
    40% {
      transform: translate(var(--x), var(--y));
    }

    53%, 52% {
      transform: translate(0, 0);
    }

    80% {
      transform: translate(0, -32px);
    }

    90%, 100% {
      transform: translate(0, 188px);
    }
  }

  @-webkit-keyframes box-scale7 {
    34% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0);
    }

    42%, 100% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1);
    }
  }

  @keyframes box-scale7 {
    34% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0);
    }

    42%, 100% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1);
    }
  }

  @-webkit-keyframes ground {
    0%, 65% {
      transform: rotateX(90deg) rotateY(0deg) translate(-48px, -120px) translateZ(100px) scale(0);
    }

    75%, 90% {
      transform: rotateX(90deg) rotateY(0deg) translate(-48px, -120px) translateZ(100px) scale(1);
    }

    100% {
      transform: rotateX(90deg) rotateY(0deg) translate(-48px, -120px) translateZ(100px) scale(0);
    }
  }

  @keyframes ground {
    0%, 65% {
      transform: rotateX(90deg) rotateY(0deg) translate(-48px, -120px) translateZ(100px) scale(0);
    }

    75%, 90% {
      transform: rotateX(90deg) rotateY(0deg) translate(-48px, -120px) translateZ(100px) scale(1);
    }

    100% {
      transform: rotateX(90deg) rotateY(0deg) translate(-48px, -120px) translateZ(100px) scale(0);
    }
  }

  @-webkit-keyframes ground-shine {
    0%, 70% {
      opacity: 0;
    }

    75%, 87% {
      opacity: 0.2;
    }

    100% {
      opacity: 0;
    }
  }

  @keyframes ground-shine {
    0%, 70% {
      opacity: 0;
    }

    75%, 87% {
      opacity: 0.2;
    }

    100% {
      opacity: 0;
    }
  }

  @-webkit-keyframes mask {
    0%, 65% {
      opacity: 0;
    }

    66%, 100% {
      opacity: 1;
    }
  }

  @keyframes mask {
    0%, 65% {
      opacity: 0;
    }

    66%, 100% {
      opacity: 1;
    }
  }
`;

export default LoadingScreen; 
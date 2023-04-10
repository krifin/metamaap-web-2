// import React from "react";
// import styled, { keyframes } from "styled-components";

// const generateRandomNumber = (min, max) => {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// };

// const generateRandomColor = () => {
//   const r = generateRandomNumber(0, 255);
//   const g = generateRandomNumber(0, 255);
//   const b = generateRandomNumber(0, 255);
//   return `rgb(${r}, ${g}, ${b})`;
// };

// const generateRandomStar = () => {
//   const size = generateRandomNumber(1, 3);
//   const top = generateRandomNumber(0, 100);
//   const left = generateRandomNumber(0, 100);
//   const animationDuration = generateRandomNumber(20, 40);
//   const color = generateRandomColor();
//   return { size, top, left, animationDuration, color };
// };

// const generateRandomStars = (numStars) => {
//   const stars = [];
//   for (let i = 0; i < numStars; i++) {
//     stars.push(generateRandomStar());
//   }
//   return stars;
// };

// const Galaxy = styled.div`
//   position: relative;
//   width: 100%;
//   height: 100%;
// `;

// const Star = styled.div`
//   position: absolute;
//   border-radius: 50%;
//   background-color: ${(props) => props.color};
//   width: ${(props) => props.size}px;
//   height: ${(props) => props.size}px;
//   top: ${(props) => props.top}%;
//   left: ${(props) => props.left}%;
//   animation: ${(props) => props.animation}
//     ${(props) => props.animationDuration}s linear infinite;
// `;

// const twinkling = keyframes`
//   0% { opacity: 1; }
//   50% { opacity: 0.2; }
//   100% { opacity: 1; }
// `;

// const generateStarAnimations = (numStars) => {
//   let animations = "";
//   for (let i = 0; i < numStars; i++) {
//     const delay = generateRandomNumber(0, 20);
//     animations += `
//       ${twinkling} ${generateRandomNumber(2, 5)}s linear ${delay}s infinite,
//       twinkle-opacity ${generateRandomNumber(5, 10)}s linear ${delay}s infinite
//     `;
//   }
//   return animations;
// };

// const GalaxyEffect = ({ numStars }) => {
//   const stars = generateRandomStars(numStars);
//   const starAnimations = generateStarAnimations(numStars);

//   return (
//     <Galaxy>
//       {stars.map((star, index) => (
//         <Star
//           key={index}
//           size={star.size}
//           top={star.top}
//           left={star.left}
//           animation={starAnimations}
//           animationDuration={star.animationDuration}
//           color={star.color}
//         />
//       ))}
//       <style>{`
//         @keyframes twinkle-opacity {
//           0% { opacity: 1; }
//           50% { opacity: 0.2; }
//           100% { opacity: 1; }
//         }
//       `}</style>
//     </Galaxy>
//   );
// };

// export default GalaxyEffect;
// import React, { useState, useEffect } from "react";

// function Galaxy() {
//   const [canvas, setCanvas] = useState(null);
//   useEffect(() => {
//     if (canvas) {
//       const ctx = canvas.getContext("2d");
//       drawGalaxy(ctx);
//     }
//   }, [canvas]);

//   const drawGalaxy = (ctx) => {
//     // Set the background color
//     ctx.fillStyle = "#000000";
//     ctx.fillRect(0, 0, canvas.width, canvas.height);

//     // Draw the stars
//     const starCount = 1000;
//     for (let i = 0; i < starCount; i++) {
//       const x = Math.random() * canvas.width;
//       const y = Math.random() * canvas.height;
//       const radius = Math.random() * 2;
//       const hue = Math.random() * 360;
//       ctx.beginPath();
//       ctx.arc(x, y, radius, 0, Math.PI * 2);
//       ctx.fillStyle = `hsl(${hue}, 50%, 50%)`;
//       ctx.fill();
//     }
//   };

//   return (
//     <div className="App">
//       <canvas ref={(c) => setCanvas(c)} width={800} height={600} />
//     </div>
//   );
// }

// export default Galaxy;
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";
import $ from "jquery";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

function Galaxy() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 50;
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 1);
    canvasRef.current.appendChild(renderer.domElement);

    // Create the galaxy
    const galaxy = new THREE.Object3D();
    const starCount = 10000;
    const arms = 4;
    const armLength = 20;
    for (let i = 0; i < starCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.pow(Math.random(), 0.5) * armLength;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;
      const z = (i / starCount) * armLength;
      const xx = Math.random() * armLength - armLength / 2;
      const yy = Math.random() * armLength - armLength / 2;
      const zz = Math.random() * armLength - armLength / 2;
      const bubbleColor = new THREE.Color();
      // Set the color of the bubble based on its distance from the center of the galaxy
      const distanceFromCenter = Math.sqrt(xx * xx + yy * yy + zz * zz);
      bubbleColor.setHSL((distanceFromCenter / armLength) * 0.7, 1.0, 0.5);
      const star = new THREE.Mesh(
        new THREE.SphereGeometry(0.1, 8, 8),
        new THREE.MeshBasicMaterial({ color: bubbleColor })
      );
      star.position.set(x, y, z);

      galaxy.add(star);
      star.addEventListener("click", () => {
        window.location.href = "https://www.google.com";
      });
    }
    // galaxy.children.forEach((object) => {
    //   if (object instanceof THREE.Mesh) {
    //     object.callback = () => {
    //       window.location.href = "https://www.google.com"; // replace with your desired URL
    //     };
    //     object.on("click", object.callback);
    //   }
    // });
    scene.add(galaxy);

    // Add lighting to the scene
    const light = new THREE.AmbientLight(0xffffff, 1);
    scene.add(light);

    // Add controls to the camera
    const controls = new OrbitControls(camera, renderer.domElement);

    // Render the scene
    const animate = function () {
      requestAnimationFrame(animate);
      galaxy.rotation.z += 0.001;
      controls.update();
      renderer.render(scene, camera);
    };
    animate();
    const canvas = canvasRef.current;

    // Add event listener to the canvas element
    // $(canvas).on("mousemove", function (event) {
    //   const rect = canvas.getBoundingClientRect();
    //   const x = event.clientX - rect.left;
    //   const y = event.clientY - rect.top;
    //   console.log(`Mouse position: x=${x}, y=${y}`);
    // });
    return () => {
      renderer.dispose();
      // canvasRef.current.removeChild(renderer.domElement);
    };
  }, []);
  const navigate = useNavigate();

  $("body").click(function (event) {
    var relX = event.pageX - $(this).offset().left;
    var relY = event.pageY - $(this).offset().top;
    var relBoxCoords = "(" + relX + "," + relY + ")";
    console.log(relX);
    console.log(relY);
    if (relX >= 350 && relY <= 350) {
      navigate("/", { state: { id: 4 } });
    } else if (relX <= 350 && relY <= 350) {
      navigate("/", { state: { id: 5 } });
    } else if (relX >= 350 && relY >= 350) {
      navigate("/", { state: { id: 6 } });
    } else if (relX <= 350 && relY >= 350) {
      navigate("/", { state: { id: 7 } });
    }
  });

  // $(document).ready(function () {
  //   $("body").mousemove(function (event) {
  //     var relX = event.pageX - $(this).offset().left;
  //     var relY = event.pageY - $(this).offset().top;
  //     var relBoxCoords = "(" + relX + "," + relY + ")";
  //     console.log(relX);
  //     console.log(relY);
  //   });
  // });
  // Add click event to each bubble

  return <div ref={canvasRef} />;
}

export default Galaxy;

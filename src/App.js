import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import $ from "jquery";
import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import BubbleSplitter from "./BubbleSplitter";
import { RxCross1 } from "react-icons/rx";
import Home from "./Home";
import Galaxy from "./Galaxy";
import Galaxy2 from "./Galaxy2";
import Three from "./Threejs";
import Background from "./Background";
import Form from "./Form";
import Preloader from "./pages/Preloader";
import Galaxy4 from "./pages/Galaxy4";
import Navbar from "./components/Navbar";
import BottomBar from "./components/BottomBar";
import SearchPopup from "./components/SearchPopup";
import About from "./pages/About";
import NFTTransfers from "./pages/NFTTransfers";
import SingleNFTTransfer from "./pages/SingleNFTTransfer";
import UploadAsset from "./pages/UploadAsset";
import { useWeb3 } from "./adaptors/useWeb3";
import { AppContext } from "./AppContext";
import useFirebase from "./adaptors/useFirebase";
const App = () => {
  // useEffect(() => {

  //  const sizes = {
  //    width: window.innerWidth,
  //    height: window.innerHeight,
  //  };

  //  // console.log(canvas.parentNode)

  //  // Canvas
  //  const canvas = document.querySelector("canvas.webgl");

  //  /**
  //   * Renderer
  //   */
  //  const renderer = new THREE.WebGLRenderer({
  //    canvas: canvas,
  //  });
  //  renderer.setSize(sizes.width, sizes.height);
  //  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  //  // Scene
  //  const scene = new THREE.Scene();

  //  /**
  //   * Camera
  //   */
  //  // Base camera
  //  const camera = new THREE.PerspectiveCamera(
  //    75,
  //    window.innerWidth/window.innerHeight,
  //    0.1,
  //    100
  //  );
  //  camera.position.x = 3;
  //  camera.position.y = 3;
  //  camera.position.z = 3;
  //  scene.add(camera);

  //  // Controls
  //  const controls = new OrbitControls(camera, canvas);
  //  controls.enableDamping = true;
  //  controls.autoRotate = false;
  //  controls.autoRotateSpeed = 0.3;

  //  /**
  //   * Galaxy
  //   */
  //  const params = {
  //    count: 200000,
  //    size: 2.01,
  //    radius: 5,
  //    branches: 6,
  //    spin: 1,
  //    randomness: 1,
  //    randomnessPower: 1,
  //    insideColor: "#ff6030",
  //    outsideColor: "#1b3984",
  //  };

  //   // $(".webgl").click(function () {
  //   //   console.log("something");
  //   // });

  //  let geometry = null;
  //  let material = null;
  //  let points = null;

  //  const generateGalaxy = () => {
  //    if (points) {
  //      scene.remove(points);
  //      material.dispose();
  //      geometry.dispose();
  //    }
  //    // Galaxy

  //    geometry = new THREE.BufferGeometry();
  //    const positions = new Float32Array(params.count * 3);
  //    console.log(positions)
  //    const colors = new Float32Array(params.count * 3);
  //    const colorInside = new THREE.Color(params.insideColor);
  //    const colorOutside = new THREE.Color(params.outsideColor);
  //    for (let i = 0; i < params.count; i++) {
  //      const i3 = i * 3;
  //     //  console.log(i3);
  //      const r = Math.random() * params.radius;
  //      // console.log(r)
  //      const mixedColor = colorInside.clone();
  //      mixedColor.lerp(colorOutside, r / params.radius);
  //      colors[i3] = mixedColor.r;
  //      colors[i3 + 1] = mixedColor.g;
  //      colors[i3 + 2] = mixedColor.b;

  //      const branchIndex = i % params.branches;
  //     //  console.log(branchIndex)
  //      const branchAngle = branchIndex / params.branches;
  //      const rotation = branchAngle * Math.PI * 2;
  //      const spinAngle = r * params.spin;

  //      const randomX =
  //        Math.pow(Math.random(), params.randomnessPower) *
  //        (Math.random() - 0.5) *
  //        params.randomness *
  //        r;
  //      const randomY =
  //        Math.pow(Math.random(), params.randomnessPower) *
  //        (Math.random() - 0.5) *
  //        params.randomness *
  //        r;
  //      const randomZ =
  //        Math.pow(Math.random(), params.randomnessPower) *
  //        (Math.random() - 0.5) *
  //        params.randomness *
  //        r;

  //      positions[i3] = Math.cos(rotation + spinAngle) * r + randomX;
  //      positions[i3 + 1] = randomY;
  //      positions[i3 + 2] = Math.sin(rotation + spinAngle) * r + randomZ;
  //     //  console.log(i3);
  //    }

  //    // Branches

  //    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  //    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  //    material = new THREE.PointsMaterial({
  //      color: "#6359ee",
  //      size: params.size,
  //      sizeAttenuation: false,
  //      depthWrite: false,
  //      blending: THREE.AdditiveBlending,
  //      vertexColors: true,
  //    });
  //    points = new THREE.Points(geometry, material);
  //    scene.add(points);
  //  };
  //  generateGalaxy();
  //  // ========== Galaxy End ===========

  //  // Cluster names

  //  window.addEventListener("resize", () => {
  //    // Update sizes
  //    sizes.width = window.innerWidth;
  //    sizes.height = window.innerHeight;

  //    // Update camera
  //    camera.aspect = sizes.width / sizes.height;
  //    camera.updateProjectionMatrix();

  //    // Update renderer
  //    renderer.setSize(sizes.width, sizes.height);
  //    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  //  });

  //  /**
  //   * Animate
  //   */
  //  const clock = new THREE.Clock();

  //  const tick = () => {
  //    // const elapsedTime = clock.getElapsedTime();

  //    // Update controls
  //    controls.update();

  //    // Render
  //    renderer.render(scene, camera);

  //    // Call tick again on the next frame
  //    requestAnimationFrame(tick);
  //  };

  //  tick();
  // }, []);

  // // Add event listener to the container to handle clicks on bubbles
  // window.onload = function () {
  //   const container = document.getElementById("container");

  //   // Create a function to add new bubbles around the clicked bubble
  //   function addBubbles(x, y) {
  //     console.log("something");
  //     const numBubbles = 10; // Change this to set the number of new bubbles to create
  //     const colors = ["#ff0055", "#0099ff", "#22cc88", "#ffaa00"]; // Add or remove colors as needed

  //     for (let i = 0; i < numBubbles; i++) {
  //       const bubble = document.createElement("div");
  //       bubble.className = "bubble";
  //       bubble.style.backgroundColor =
  //         colors[Math.floor(Math.random() * colors.length)];

  //       // Set the position of the new bubble based on the clicked bubble's position
  //       const xOffset = Math.random() * 100 - 50;
  //       const yOffset = Math.random() * 100 - 50;
  //       bubble.style.left = x + xOffset + "px";
  //       bubble.style.top = y + yOffset + "px";
  //       bubble.style.transform = `translateZ(${Math.random() * 100}px)`;

  //       container.appendChild(bubble);
  //     }
  //   }
  //   container.addEventListener("click", function (event) {
  //     console.log("something");
  //     const target = event.target;
  //     if (target.classList.contains("bubble")) {
  //       addBubbles(event.clientX, event.clientY);
  //       target.remove();
  //     }
  //   });
  // };

  // function createBubbles() {
  //   function createBubble() {

  //     const bubble = document.createElement("div");
  //     bubble.classList.add("ball");
  //     bubble.classList.add("bubble");
  //     bubble.classList.add("zoom");

  //     bubble.style.left = Math.random() * 500 + "px";
  //     bubble.style.top = Math.random() * 500 + "px";
  //     document.querySelector(".bubble-container").appendChild(bubble);
  //     return bubble;
  //   }

  //   const bubbles = [];
  //   let bubbleWidth = 20;
  //   let bubbleHeight = 20;
  //   const container_1 = document.querySelector(".bubble-container");
  //    function addBubbles(x, y) {
  //      console.log("something");
  //      const numBubbles = 10; // Change this to set the number of new bubbles to create
  //      const colors = ["#ff0055", "#0099ff", "#22cc88", "#ffaa00"]; // Add or remove colors as needed

  //      for (let i = 0; i < numBubbles; i++) {
  //        const bubble = document.createElement("div");
  //        bubble.className = "bubble";
  //        bubble.style.backgroundColor =
  //          colors[Math.floor(Math.random() * colors.length)];

  //        // Set the position of the new bubble based on the clicked bubble's position
  //        const xOffset = Math.random() * 100 - 50;
  //        const yOffset = Math.random() * 100 - 50;
  //        bubble.style.left = x + xOffset + "px";
  //        bubble.style.top = y + yOffset + "px";
  //        bubble.style.transform = `translateZ(${Math.random() * 100}px)`;

  //        container_1.appendChild(bubble);
  //      }
  //    }
  //   container_1.addEventListener("click", function (event) {
  //     console.log("something");
  //     const target = event.target;
  //     if (target.classList.contains("bubble")) {
  //       addBubbles(event.clientX, event.clientY);
  //       target.remove();
  //     }
  //   });
  //   const containerWidth =
  //     document.querySelector(".bubble-container").offsetWidth;
  //   const containerHeight =
  //     document.querySelector(".bubble-container").offsetHeight;

  //   for (let y = 0; y < containerHeight; y += bubbleHeight) {
  //     for (let x = 0; x < containerWidth; x += bubbleWidth) {
  //       const bubble = createBubble();
  //       bubble.style.left = x + "px";
  //       bubble.style.top = y + "px";
  //       bubbles.push(bubble);
  //     }
  //   }
  // }

  // window.onload = function () {
  //   createBubbles();
  // };

  const [searchToggle, setSearchToggle] = useState(false)

  const { web3, account } = useWeb3()

  const { getMetaverses } = useFirebase()

  const [metaverses, setMetaverses] = useState([])

  useEffect(() => {
    getMetaverses().then((res) => {
      setMetaverses(res)
    })
  }, [])

  return (
    <AppContext.Provider value={[metaverses, setMetaverses ]}>
    <div className={`App`}>
      <SearchPopup show={searchToggle} onClose={() => setSearchToggle(false)} />
      <div style={{ flex: 1, marginLeft: searchToggle ? '400px': '0px', transition: 'all 0.5s ease-in-out' }}>
        {window.location.pathname !== '/' && <Navbar onSearchToggle={() => setSearchToggle(!searchToggle)} show={searchToggle}/>}
        {window.location.pathname !== '/' && <BottomBar show={searchToggle}/>}
        <Routes>
          <Route exact path="/" element={<Preloader />} />
          <Route exact path="/home" element={<Galaxy4 />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/nft-transfers" element={<NFTTransfers />} />
          <Route exact path="/nft/transfer" element={<SingleNFTTransfer />} />
          <Route exact path="/upload-asset" element={<UploadAsset />} />
          {/* // <Route exact path="/bubble_1" element={<BubbleSplitter />} />
          // <Route exact path="/galaxy" element={<Galaxy />} />
          // <Route exact path="/galaxy2" element={<Galaxy2 />} />
          // <Route exact path="/galaxy4" element={<Galaxy4 />} />
          // <Route exact path="/background" element={<Background />} /> */}
        </Routes>
      </div>
    </div>
    </AppContext.Provider>
  );
};

export default App;

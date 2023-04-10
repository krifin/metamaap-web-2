import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import $ from "jquery";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import BubbleSplitter from "./BubbleSplitter";
import { RxCross1 } from "react-icons/rx";

function Home() {
  const navigate = useNavigate();
  const { state } = useLocation();
  $(document).ready(function () {
    $("#info").mousemove(function (event) {
      var relX = event.pageX - $(this).offset().left;
      var relY = event.pageY - $(this).offset().top;
      console.log(relX);
      console.log(relY);
      var relBoxCoords = "(" + relX + "," + relY + ")";
      $(".mouse-cords").text(relBoxCoords);
    });
  });
  $(document).ready(function () {
    $(".bubble").click(function () {
      console.log("something---1");
      // $("#myModal").hide();
      // $("#root").css({
      //   "background-image": "url(download.jpg)",
      //   "background-repeat": "no-repeat",
      //   "background-size": "cover",
      // });
      navigate("/background", { state: { id: state.id } });
    });
  });
  $(document).ready(function () {
    $("#myBtn").click(function () {
      $("#myModal").show();
    });
  });
  const hideoff = () => {
    navigate("/Galaxy2");
    $(".close").click(function () {
      navigate("/Galaxy2");
      $("#myModal").hide();
    });
  };
  $(".bubble").click(function () {
    console.log("som4thing");
  });

  $(document).ready(function () {
    $(".bubble").hover(
      function () {
        $(this).css("background-color", "white");
        $(".container").css("background-color", "white");
      },
      function () {
        $(this).css("background-color", "white");
        $(".container").css("background-color", "white");
      }
    );
  });
  const [numb, setnumb] = useState(7);
  useEffect(() => {
    console.log(state);
    if (!state) data(5);
    else data(state.id);
    setInterval(createBubble, 1000);
  }, []);

  var m = 0;

  const [dataset, setdataset] = useState({});
  //     {   no:7, dataset:{ name: , img , dataset}}
  const [check, setcheck] = useState(true);
  const data = (k) => {
    console.log(k);

    function splitBubble(numBubbles) {
      if (m == 0) {
        var modal = document.querySelector(".modal");
        var mainBubble = document.querySelector(".bubble");
        modal.appendChild(mainBubble);
        var mainBubbleWidth = mainBubble.offsetWidth;
        var mainBubbleHeight = mainBubble.offsetHeight;
        var mainBubbleX = mainBubble.offsetLeft;
        var mainBubbleY = mainBubble.offsetTop;
        var mainBubbleValue = 10;
        var splitBubbleValues = [];
        var angleIncrement = (2 * Math.PI) / numBubbles;

        for (var i = 0; i < numBubbles; i++) {
          var splitBubbleValue = mainBubbleValue / numBubbles;
          splitBubbleValues.push(splitBubbleValue);

          var splitBubble = document.createElement("div");

          splitBubble.classList.add("bubble");

          splitBubble.style.position = "relative";
          splitBubble.style.width = "150px";
          splitBubble.style.height = "150px";
          // splitBubble.style.backgroundColor = "blue";
          splitBubble.style.borderRadius = "50%";
          splitBubble.style.display = "flex";
          splitBubble.style.justifyContent = "center";
          splitBubble.style.alignItems = "center";
          splitBubble.style.color = "#fff";
          splitBubble.style.fontSize = "20px";
          splitBubble.style.fontWeight = "bold";

          var angle = i * angleIncrement;
          var splitBubbleX =
            mainBubbleX + (mainBubbleWidth / 2) * Math.cos(angle);
          var splitBubbleY =
            mainBubbleY + (mainBubbleHeight / 2) * Math.sin(angle);
          splitBubble.style.position = "absolute";
          splitBubble.style.top = splitBubbleY + "px";
          splitBubble.style.left = splitBubbleX + "px";
          splitBubble.style.opacity = 0;
          splitBubble.style.animation = "fadeIn 1s ease forwards";
          modal.appendChild(splitBubble);
        }

        // mainBubble.textContent = mainBubbleValue;
        mainBubble.classList.remove("bubble");
      }
      m++;
    }
    if (!check) {
      k = 0;
    }

    splitBubble(k);
    setcheck(false);
  };
  //   useEffect(() => {
  //     const sizes = {
  //       width: window.innerWidth,
  //       height: window.innerHeight,
  //     };

  //     // console.log(canvas.parentNode)

  //     // Canvas
  //     const canvas = document.querySelector("canvas.webgl");

  //     /**
  //      * Renderer
  //      */
  //     const renderer = new THREE.WebGLRenderer({
  //       canvas: canvas,
  //     });
  //     renderer.setSize(sizes.width, sizes.height);
  //     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  //     // Scene
  //     const scene = new THREE.Scene();

  //     /**
  //      * Camera
  //      */
  //     // Base camera
  //     const camera = new THREE.PerspectiveCamera(
  //       75,
  //       window.innerWidth / window.innerHeight,
  //       0.1,
  //       100
  //     );
  //     camera.position.x = 3;
  //     camera.position.y = 3;
  //     camera.position.z = 3;
  //     scene.add(camera);

  //     // Controls
  //     const controls = new OrbitControls(camera, canvas);
  //     controls.enableDamping = true;
  //     controls.autoRotate = false;
  //     controls.autoRotateSpeed = 0.3;

  //     /**
  //      * Galaxy
  //      */
  //     const params = {
  //       count: 200000,
  //       size: 2.01,
  //       radius: 5,
  //       branches: 6,
  //       spin: 1,
  //       randomness: 1,
  //       randomnessPower: 1,
  //       insideColor: "#ff6030",
  //       outsideColor: "#1b3984",
  //     };

  //     // $(".webgl").click(function () {
  //     //   console.log("something");
  //     // });

  //     let geometry = null;
  //     let material = null;
  //     let points = null;

  //     const generateGalaxy = () => {
  //       if (points) {
  //         scene.remove(points);
  //         material.dispose();
  //         geometry.dispose();
  //       }
  //       // Galaxy

  //       geometry = new THREE.BufferGeometry();
  //       const positions = new Float32Array(params.count * 3);
  //       console.log(positions);
  //       const colors = new Float32Array(params.count * 3);
  //       const colorInside = new THREE.Color(params.insideColor);
  //       const colorOutside = new THREE.Color(params.outsideColor);
  //       for (let i = 0; i < params.count; i++) {
  //         const i3 = i * 3;
  //         //  console.log(i3);
  //         const r = Math.random() * params.radius;
  //         // console.log(r)
  //         const mixedColor = colorInside.clone();
  //         mixedColor.lerp(colorOutside, r / params.radius);
  //         colors[i3] = mixedColor.r;
  //         colors[i3 + 1] = mixedColor.g;
  //         colors[i3 + 2] = mixedColor.b;

  //         const branchIndex = i % params.branches;
  //         //  console.log(branchIndex)
  //         const branchAngle = branchIndex / params.branches;
  //         const rotation = branchAngle * Math.PI * 2;
  //         const spinAngle = r * params.spin;

  //         const randomX =
  //           Math.pow(Math.random(), params.randomnessPower) *
  //           (Math.random() - 0.5) *
  //           params.randomness *
  //           r;
  //         const randomY =
  //           Math.pow(Math.random(), params.randomnessPower) *
  //           (Math.random() - 0.5) *
  //           params.randomness *
  //           r;
  //         const randomZ =
  //           Math.pow(Math.random(), params.randomnessPower) *
  //           (Math.random() - 0.5) *
  //           params.randomness *
  //           r;

  //         positions[i3] = Math.cos(rotation + spinAngle) * r + randomX;
  //         positions[i3 + 1] = randomY;
  //         positions[i3 + 2] = Math.sin(rotation + spinAngle) * r + randomZ;
  //         //  console.log(i3);
  //       }

  //       // Branches

  //       geometry.setAttribute(
  //         "position",
  //         new THREE.BufferAttribute(positions, 3)
  //       );
  //       geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  //       material = new THREE.PointsMaterial({
  //         color: "#6359ee",
  //         size: params.size,
  //         sizeAttenuation: false,
  //         depthWrite: false,
  //         blending: THREE.AdditiveBlending,
  //         vertexColors: true,
  //       });
  //       points = new THREE.Points(geometry, material);
  //       scene.add(points);
  //     };
  //     generateGalaxy();
  //     // ========== Galaxy End ===========

  //     // Cluster names

  //     window.addEventListener("resize", () => {
  //       // Update sizes
  //       sizes.width = window.innerWidth;
  //       sizes.height = window.innerHeight;

  //       // Update camera
  //       camera.aspect = sizes.width / sizes.height;
  //       camera.updateProjectionMatrix();

  //       // Update renderer
  //       renderer.setSize(sizes.width, sizes.height);
  //       renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  //     });

  //     /**
  //      * Animate
  //      */
  //     const clock = new THREE.Clock();

  //     const tick = () => {
  //       // const elapsedTime = clock.getElapsedTime();

  //       // Update controls
  //       controls.update();

  //       // Render
  //       renderer.render(scene, camera);

  //       // Call tick again on the next frame
  //       requestAnimationFrame(tick);
  //     };

  //     tick();
  //   }, []);

  function createBubble() {
    const section = document.querySelector("Section");
    const createElement = document.createElement("span");
    var size = 12;

    createElement.style.animation = "animation 16s linear infinite";
    createElement.style.width = 100 + size + "px";
    createElement.style.height = 100 + size + "px";
    createElement.style.left = Math.random() * window.innerWidth + "px";
    createElement.style.backgroundImage = "url(../something/assets/droplet_dispersive_sprite.8e12f1c2.png)";
    createElement.style.backgrounSize = "cover";
    createElement.style.backgroundRepeat = "no-repeat";
    section.appendChild(createElement);

    setTimeout(() => {
      createElement.remove();
    }, 8000);
  }

  return (
    <div className="frame">
      <div className="container">
        {" "}
        <div id="info">
          Description
          <div className="main_div">
            <div className="grid-item_1"></div>
            <div className="grid-item_2"></div>
            <div className="grid-item_3"></div>
            <div className="grid-item_4"></div>
          </div>
        </div>
        <canvas className="webgl">Your browser does not support WebGL</canvas>
        <div id="container">
          <div id="content"></div>
        </div>
        <TransformWrapper
          initialScale={1}
          initialPositionX={200}
          initialPositionY={100}
        >
          <TransformComponent>
            <div className="bubble-container" id="container"></div>
          </TransformComponent>
        </TransformWrapper>
        <button id="myBtn">Click me</button>
        <div
          id="myModal container"
          className="modal"
          style={{ width: "100%", height: "100vh" }}
        >
          <section style={{ width: "100%", height: "100vh" }}></section>
          <div
            className="close"
            onClick={() => {
              hideoff();
              window.location.reload(false);
            }}
          >
            {" "}
            <RxCross1 style={{ color: "red" }} />
          </div>

          <div
            className="bubble"
            style={{
              position: "relative",
              marginTop: "-300px",
            }}
          ></div>
        </div>
        <div className="bubble_1"></div>
        {/* <BubbleSplitter /> */}
      </div>
    </div>
  );
}

export default Home;

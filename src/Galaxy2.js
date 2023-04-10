import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import * as THREE from "three";
import { useLocation, useNavigate } from "react-router-dom";
import $ from "jquery";
import "./App.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
function Galaxy2() {
  const navigate = useNavigate();
  const { state } = useLocation();
  useEffect(() => {
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    // console.log(canvas.parentNode)

    // Canvas
    const canvas = document.querySelector("canvas.webgl");

    /**
     * Renderer
     */
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Scene
    const scene = new THREE.Scene();

    /**
     * Camera
     */
    // Base camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.x = 3;
    camera.position.y = 3;
    camera.position.z = 3;
    scene.add(camera);

    // Controls
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = false;
    controls.autoRotate = false;

    /**
     * Galaxy
     */
    const params = {
      count: 200000,
      size: 2.01,
      radius: 5,
      branches: 6,
      spin: 1,
      randomness: 1,
      randomnessPower: 1,
      insideColor: "#ff6030",
      outsideColor: "#1b3984",
    };

    // $(".webgl").click(function () {
    //   console.log("something");
    // });

    let geometry = null;
    let material = null;
    let points = null;

    const generateGalaxy = () => {
      if (points) {
        scene.remove(points);
        material.dispose();
        geometry.dispose();
      }
      // Galaxy

      geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(params.count * 3);
      console.log(positions);
      const colors = new Float32Array(params.count * 3);
      const colorInside = new THREE.Color(params.insideColor);
      const colorOutside = new THREE.Color(params.outsideColor);
      for (let i = 0; i < params.count; i++) {
        const i3 = i * 3;
        //  console.log(i3);
        const r = Math.random() * params.radius;
        // console.log(r)
        const mixedColor = colorInside.clone();
        mixedColor.lerp(colorOutside, r / params.radius);
        colors[i3] = mixedColor.r;
        colors[i3 + 1] = mixedColor.g;
        colors[i3 + 2] = mixedColor.b;

        const branchIndex = i % params.branches;
        //  console.log(branchIndex)
        const branchAngle = branchIndex / params.branches;
        const rotation = branchAngle * Math.PI * 2;
        const spinAngle = r * params.spin;

        const randomX =
          Math.pow(Math.random(), params.randomnessPower) *
          (Math.random() - 0.5) *
          params.randomness *
          r;
        const randomY =
          Math.pow(Math.random(), params.randomnessPower) *
          (Math.random() - 0.5) *
          params.randomness *
          r;
        const randomZ =
          Math.pow(Math.random(), params.randomnessPower) *
          (Math.random() - 0.5) *
          params.randomness *
          r;

        positions[i3] = Math.cos(rotation + spinAngle) * r + randomX;
        positions[i3 + 1] = randomY;
        positions[i3 + 2] = Math.sin(rotation + spinAngle) * r + randomZ;
        //  console.log(i3);
      }

      // Branches

      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      material = new THREE.PointsMaterial({
        color: "#6359ee",
        size: params.size,
        sizeAttenuation: false,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true,
      });
      points = new THREE.Points(geometry, material);
      scene.add(points);
    };
    generateGalaxy();
    // ========== Galaxy End ===========

    // Cluster names

    window.addEventListener("resize", () => {
      // Update sizes
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      // Update camera
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      // Update renderer
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    /**
     * Animate
     */

    const clock = new THREE.Clock();

    const tick = () => {
      // const elapsedTime = clock.getElapsedTime();

      // Render

      renderer.render(scene, camera);
      // Call tick again on the next frame
    };

    tick();
  }, []);
  $(".webgl").hover(function (event) {
    var relX = event.pageX - $(this).offset().left;
    var relY = event.pageY - $(this).offset().top;
    var relBoxCoords = "(" + relX + "," + relY + ")";
    console.log(relBoxCoords);
    console.log(relX);
    console.log(relY);
  });
  $("body").click(function (event) {
    var relX = event.pageX - $(this).offset().left;
    var relY = event.pageY - $(this).offset().top;
    var relBoxCoords = "(" + relX + "," + relY + ")";
    console.log(relX);
    console.log(relY);
    if (relX >= 800 && relX <= 860 && relY >= 360 && relY <= 490) {
      navigate("/home", { state: { id: 3 } });
    }
    if (relX >= 710 && relY >= 340 && relX <= 800 && relY <= 380) {
      navigate("/home", { state: { id: 6 } });
    }
    if (relX <= 680 && relX >= 630 && relY >= 380 && relY <= 480) {
      navigate("/home", { state: { id: 5 } });
    }
    if (relX >= 740 && relY <= 380 && relY >= 300) {
      navigate("/home", { state: { id: 7 } });
    }
    if (relX <= 690 && relX >= 640 && relY <= 380) {
      navigate("/home", { state: { id: 4 } });
    }
  });
  return (
    <div>
      <canvas className="webgl">Your browser does not support WebGL</canvas>
    </div>
  );
}
export default Galaxy2;

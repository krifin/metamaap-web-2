// import React from "react";

// function BubbleSplitter({ value, numBubbles }) {
//   const containerRef = React.useRef(null);

//   React.useEffect(() => {
//     numBubbles = 4;

//     const container = containerRef.current;
//     const radius = container.offsetWidth / 2 - 25;
//     const angle = 360 / numBubbles;

//     for (let i = 0; i < numBubbles; i++) {
//       const bubble = document.createElement("div");
//       bubble.classList.add("bubble");
//       bubble.textContent = value / numBubbles;
//       const x = radius * Math.cos((angle * i * Math.PI) / 180);
//       const y = radius * Math.sin((angle * i * Math.PI) / 180);
//       bubble.style.transform = `translate(${x}px, ${y}px)`;
//       container.appendChild(bubble);
//     }
//   }, [value, numBubbles]);

//   return (
//     <div className="container" ref={containerRef}>
//       <div className="bubble">{value}</div>
//     </div>
//   );
// }

// export default BubbleSplitter;


import React from 'react'

function BubbleSplitter() {
  return (
    <div><h1>
      something is about to go
      </h1></div>
  )
}

export default BubbleSplitter
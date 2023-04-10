import React from "react";
import { useNavigate,useLocation } from "react-router-dom";
function Background() {
    const {state}  = useLocation();
  const navigate = useNavigate();
  return <div onClick={() => navigate("/home",{state:{id:state.id}})}>Background</div>;
}

export default Background;

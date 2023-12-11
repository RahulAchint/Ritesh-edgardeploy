import React from "react";
import { useLocation } from "react-router-dom";

function Test() {
  const { state } = useLocation();
  console.log("absd", state);
  return <div>test</div>;
}

export default Test;

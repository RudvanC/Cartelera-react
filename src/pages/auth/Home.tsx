import React from "react";
import Gender from "@components/commons/card/Gender";
import Slider from "@components/commons/card/slider/slider";

export default function Home() {
  return (
    <>
      <div
        style={{
          minHeight: "100vh"
        }}
      >
        <Slider />
        <h1
          style={{
            textAlign: "center",
            marginBottom: "40px",
            fontSize: "24px",
            color: "#d7e7ee",
            fontWeight: "bold",
          }}
        ></h1>
        <Gender />
      </div>
    </>
  );
}

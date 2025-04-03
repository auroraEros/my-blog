"use client";

import { DotLoader } from "react-spinners";


function Loading({ width = "75", height = "40", color = "#4a6dff" }) {
  return (
    <DotLoader
      height={height}
      width={width}
      radius="9"
      color="#4a6dff"
      ariaLabel="three-dots-loading"
      wrapperStyle={{
        display: "flex",
        justifyContent: "center",
      }}
      visible={false}
    />
  );
}
export default Loading;

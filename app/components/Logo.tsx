import React from "react";
import Image from "next/image";

function Logo() {
  return <Image width={64} height={64} alt={"App Logo"} src={"/favicon.ico"} />;
}

export default Logo;

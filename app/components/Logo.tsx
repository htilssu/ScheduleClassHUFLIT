import React from "react";
import Image from "next/image";

interface LogoProps {
  fullWidth?: boolean;
}

function Logo({ fullWidth }: LogoProps) {
  if (fullWidth) {
    return <Image fill={fullWidth} alt={"App Logo"} src={"/favicon.ico"} />;
  }
  return <Image width={64} height={64} alt={"App Logo"} src={"/favicon.ico"} />;
}

export default Logo;

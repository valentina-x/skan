import React from "react";
import Image from "next/image";
import Loader_SVG from "../../../public/images/loader.svg";
import styles from "./styles.module.scss";

interface ILoaderProps {
  size?: "small" | "medium" | "large";
  text?: string;
}

const Loader: React.FC<ILoaderProps> = ({ size = "medium", text }) => {
  const getSize = () => {
    switch (size) {
      case "large":
        return { width: 50, height: 50 };
      case "small":
      default:
        return { width: 24, height: 24 };
    }
  };

  const { width, height } = getSize();

  return (
    <div className={`${styles.loader} ${styles[size]}`}>
      <Image src={Loader_SVG} alt="loader" width={width} height={height} />
      {text && <span className={styles.loader__text}>{text}</span>}
    </div>
  );
};

export default Loader;

import React from "react";
import styles from "./styles.module.scss";
import Loader from "../Loader/Loader";

interface IButtonProps {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  maxWidth?: string;
  type?: "button" | "submit" | "reset" | undefined;
  loading?: boolean;
}

const Button: React.FC<IButtonProps> = ({
  className,
  children,
  onClick,
  maxWidth,
  type,
  loading,
}) => {
  const composedClassName = className ? styles[className] : "";
  return (
    <button
      className={`${styles.button} ${composedClassName} ${
        loading ? styles.loading : ""
      }`}
      type={type ? type : "button"}
      onClick={onClick}
      style={{ maxWidth: maxWidth + "px" }}
    >
      {loading ? <Loader /> : children}
    </button>
  );
};

export default Button;

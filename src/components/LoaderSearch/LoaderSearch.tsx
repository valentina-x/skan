import React from "react";
import Image from "next/image";
import LoaderSVG from "../../../public/images/results_page/loader-girl.svg";
import styles from "./styles.module.scss";

const LoaderSearch: React.FC = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.loader__text}>
        <div className={styles.loader__title}>
          Ищем. Скоро <br /> будут результаты
        </div>
        <p>Поиск может занять некоторое время, просим сохранять терпение.</p>
      </div>
      <Image
        src={LoaderSVG}
        alt={"Loader icon"}
        width={552}
        height={369}
        className={`${styles.loader__image}`}
      />
    </div>
  );
};

export default LoaderSearch;

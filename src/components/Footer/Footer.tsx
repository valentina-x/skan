import React from "react";
import { useRouter } from "next/router";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import Logo_SVG from "../../../public/images/logo.svg";
import styles from "./styles.module.scss";

export default function Footer() {
  const router = useRouter();
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__wrapper}>
        <div
          className={clsx(styles.footer__logo, {
            [styles.disabled]: router.pathname === "/",
          })}
        >
          <Link href="/">
            <Image src={Logo_SVG} alt={"СКАН лого"} width={96} height={38} />
          </Link>
        </div>

        <div className={styles.footer__text}>
          <p>
            г. Москва, Цветной б-р, 40 <br /> +7 495 771 21 11 <br />
            info@skan.ru
          </p>
          <span>Copyright. {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}

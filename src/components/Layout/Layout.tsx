import { PropsWithChildren } from "react";
import styles from "./Layout.module.scss";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <main className={styles.main}>{children}</main>
      </div>
      <Footer />
    </>
  );
}

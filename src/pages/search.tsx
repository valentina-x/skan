import Layout from "@/components/Layout/Layout";
import Head from "next/head";
import React from "react";
import Image from "next/image";
import styles from "../styles/search.module.scss";
import Document_SVG from "../../public/images/search_page/document.svg";
import Man_SVG from "../../public/images/search_page/man.svg";
import SearchForm from "@/components/Forms/SearchForm/SearchForm";

export default function search() {
  return (
    <>
      <Head>
        <title>СКАН - страница поиска</title>
        <meta
          name="description"
          content="СКАН - Найдите необходимые данные в пару кликов."
        />
      </Head>
      <Layout>
        <section className={styles.content}>
          <div className={styles.content__wrapper}>
            <h1 className={styles.content__title}>
              Найдите необходимые данные в пару кликов.
            </h1>
            <p className={styles.content__description}>
              Задайте параметры поиска. <br />
              Чем больше заполните, тем точнее поиск
            </p>
            <SearchForm />
          </div>

          <Image
            src={Document_SVG}
            alt={"document icon"}
            width={91}
            height={111}
            className={`${styles.content__image} ${styles.content__image_v1}`}
          />
          <Image
            src={"/images/search_page/folders.png"}
            alt={"folders icon"}
            width={141}
            height={69}
            className={`${styles.content__image} ${styles.content__image_v2}`}
          />
          <Image
            src={Man_SVG}
            alt={"man icon"}
            width={442}
            height={470}
            className={`${styles.content__image} ${styles.content__image_v3}`}
          />
        </section>
      </Layout>
    </>
  );
}

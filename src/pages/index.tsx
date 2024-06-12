import Layout from "@/components/Layout/Layout";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/index.module.scss";
import Link from "next/link";
import Button from "@/components/Button/Button";
import Advans_IMG from "../../public/images/index_page/advantages.svg";
import Slider from "@/components/Slider/Slider";
import Tariffs from "@/components/Tariffs/Tariffs";
import { useAppSelector } from "@/lib/hooks/hooks";
import { selectIsAuthenticated } from "@/lib/features/selectors/authSelectors";
import Loader from "@/components/Loader/Loader";

export default function Home() {
  const [mainLoading, setMainLoading] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  useEffect(() => {
    const handleLoad = () => {
      setMainLoading(false);
    };

    const images = document.querySelectorAll("img");
    let loadedImages = 0;
    images.forEach((img) => {
      if (img.complete) {
        loadedImages++;
      } else {
        img.addEventListener("load", () => {
          loadedImages++;
          if (loadedImages === images.length) {
            handleLoad();
          }
        });
        img.addEventListener("error", () => {
          loadedImages++;
          if (loadedImages === images.length) {
            handleLoad();
          }
        });
      }
    });

    if (loadedImages === images.length) {
      handleLoad();
    }

    return () => {
      images.forEach((img) => {
        img.removeEventListener("load", handleLoad);
        img.removeEventListener("error", handleLoad);
      });
    };
  }, []);

  return (
    <>
      <Head>
        <title>СКАН - сервис по поиску публикаций о компании по его ИНН</title>
        <meta
          name="description"
          content="СКАН - сервис по поиску публикаций о компании по его ИНН"
        />
      </Head>
      {mainLoading ? (
        <Loader text="Загрузка приложения" size="large" />
      ) : (
        <Layout>
          {/* первый блок */}
          <section className={styles.content}>
            <div className={styles.content__info}>
              <h1 className={styles.content__title}>
                Сервис по поиску <br /> публикаций <br />о компании <br />
                по его ИНН
              </h1>
              <p className={styles.content__text}>
                Комплексный анализ публикаций, получение данных в формате PDF на
                электронную почту.
              </p>
              {isAuthenticated && (
                <Link href="/search" className={styles.content__link}>
                  <Button
                    loading={loading}
                    onClick={() => {
                      setLoading(true);
                    }}
                  >
                    Запросить данные
                  </Button>
                </Link>
              )}
            </div>
            <div className={styles.content__image}>
              <Image
                src={"/images/index_page/content-img1.jpg"}
                alt={"сервис по поиску публикаций о компании по его ИНН"}
                width={629}
                height={593}
              />
            </div>
          </section>

          {/* почему мы - 2 блок */}
          <section className={styles.advantages}>
            <h2 className={styles.advantages__title}>Почему именно мы</h2>
            <Slider />
            <picture className={styles.advantages__image}>
              <source
                media="(max-width: 480px)"
                srcSet={"/images/index_page/advantages-mb.jpg"}
              />
              <Image
                src={Advans_IMG}
                alt={"Почему именно мы - графика"}
                width={1307}
                height={575}
              />
            </picture>
          </section>

          {/* тарифы - 3 блок */}
          <Tariffs />
        </Layout>
      )}
    </>
  );
}

import Layout from "@/components/Layout/Layout";
import Head from "next/head";
import React from "react";
import styles from "../styles/results.module.scss";
import GeneralSummary from "@/components/GeneralSummary/GeneralSummary";
import Documents from "@/components/Documents/Documents";
import Link from "next/link";
import { selectDocumentsIDs } from "@/lib/features/selectors/documentsSelectors";
import { useAppSelector } from "@/lib/hooks/hooks";
import { formatNumberWithSpacesAndSuffix } from "@/lib/utils/utils";

export default function Results() {
  const documentsIDs = useAppSelector(selectDocumentsIDs);

  return (
    <>
      <Head>
        <title>СКАН - страница c результатами поиска</title>
        <meta name="description" content="СКАН - результаты поиска" />
      </Head>
      <Layout>
        {documentsIDs.ids.length > 0 ? (
          <>
            <section className={styles.results}>
              <div className={styles.results__text}>
                <h1 className={styles.results__title}>Общая сводка</h1>
                <p className={styles.results__description}>
                  Найдено{" "}
                  {formatNumberWithSpacesAndSuffix(documentsIDs.ids.length)}
                </p>
              </div>
              <GeneralSummary />
            </section>

            <Documents />
          </>
        ) : (
          <p>
            К сожалению, по вашему запросу ничего не найдено.{" "}
            <Link href="/search">Вернуться на страницу поиска</Link>
          </p>
        )}
      </Layout>
    </>
  );
}

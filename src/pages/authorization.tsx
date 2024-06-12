import Layout from "@/components/Layout/Layout";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import styles from "../styles/authorization.module.scss";
import Characters_icon from "../../public/images/authorization/Characters.svg";
import LoginForm from "@/components/Forms/LoginForm/LoginForm";

export default function authorization() {
  return (
    <>
      <Head>
        <title>СКАН - страница авторизации</title>
        <meta
          name="description"
          content="СКАН - Для оформления подписки 
		  на тариф, необходимо авторизоваться."
        />
      </Head>
      <Layout>
        <section className={styles.authorization}>
          <div className={styles.authorization__text}>
            <h1 className={styles.authorization__title}>
              Для оформления подписки на тариф, необходимо авторизоваться.
            </h1>
            <Image
              src={Characters_icon}
              alt={"Characters icon"}
              width={321}
              height={342}
              className={`${styles.authorization__image}`}
            />
          </div>
          <LoginForm />
        </section>
      </Layout>
    </>
  );
}

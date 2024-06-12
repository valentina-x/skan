import Layout from "@/components/Layout/Layout";
import Head from "next/head";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <>
      <Head>
        <title>404: Страница не найдена</title>
        <meta name="description" content="404" />
      </Head>
      <Layout>
        <div>
          <h1>К сожалению, такой страницы не существует :(</h1>Вы можете
          вернуться на <Link href="/">главную</Link>
        </div>
      </Layout>
    </>
  );
}

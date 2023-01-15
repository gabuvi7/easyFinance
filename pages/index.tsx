import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <>
      <Head>
        <title>EasyFinance</title>
        <meta
          name="description"
          content="EasyFinance allows you a good perspective about your billings and personal finance"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/easyfinance-logo.svg" />
      </Head>
      <main className={styles.main}>Under Construction</main>
    </>
  );
}

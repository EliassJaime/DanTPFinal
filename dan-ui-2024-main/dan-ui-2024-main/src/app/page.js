import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import Layout from '../components/Layout';


export default function Home() {
  return (
    <Layout>
      <main className={styles.main}>
        <section className={styles.hero}>
          <h1>Bienvenido a la Gestión de Pedidos DAN</h1>
          <p>Administra tus clientes, productos y pedidos de manera eficiente</p>
        </section>
        <section className={styles.actions}>
          <Link href="/clientes">
            <button className={styles.botones}>Gestionar Clientes</button>
          </Link>
          <Link href="/productos">
            <button className={styles.botones}>Gestionar Productos</button>
          </Link>
          <Link href="/pedidos">
            <button className={styles.botones}>Gestionar Pedidos</button>
          </Link>
        </section>
      </main>
    </Layout>
  );
}

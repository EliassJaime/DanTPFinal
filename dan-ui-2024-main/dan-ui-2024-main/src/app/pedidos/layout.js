'use client';

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import styles from './page.module.css';

export default function ProductoLayout({ children }) {
  return (
    <div className={styles.layout}>
      <Navbar />
      <div className={styles.container}>
        <Sidebar />
        <main className={styles.mainContent}>
          {children}
        </main>
      </div>
    </div>
  );
}
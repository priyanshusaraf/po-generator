"use client";
import { useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function Home() {
  const [showOptions, setShowOptions] = useState(false);
  const router = useRouter();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>Business Document Generator</h1>
        <p className={styles.subtitle}>Select a service to get started:</p>
        <div className={styles.ctas}>
          <button
            className={styles.primary}
            onClick={() => setShowOptions(true)}
          >
            PO Generator
          </button>
        </div>
        {showOptions && (
          <div className={styles.options}>
            <button
              className={styles.secondary}
              onClick={() => router.push("/po-generator/with-consignee")}
            >
              With Consignee
            </button>
            <button
              className={styles.secondary}
              onClick={() => router.push("/po-generator/without-consignee")}
            >
              Without Consignee
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

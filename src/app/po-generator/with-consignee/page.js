"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import POForm from "../components/POForm";
import POPreview from "../components/POPreview";

export default function WithConsigneePO() {
  const [formData, setFormData] = useState(null);
  const router = useRouter();

  const handleBackToForm = () => {
    setFormData(null);
    // Form data will be automatically restored from localStorage when POForm loads
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f8f8f8' }}>
      <main style={{ background: '#fff', padding: '2rem 3rem', borderRadius: 16, boxShadow: '0 2px 16px rgba(0,0,0,0.07)', minWidth: 350 }}>
        <button onClick={() => router.push('/')} style={{ marginBottom: 16, background: '#bdb38b', color: '#222', border: 'none', borderRadius: 6, padding: '8px 18px', fontWeight: 600, cursor: 'pointer' }}>Back</button>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 8 }}>PO Generator (With Consignee)</h1>
        <p style={{ color: '#666', marginBottom: 24 }}>Fill in the details below to generate your Purchase Order.</p>
        {!formData ? (
          <POForm withConsignee={true} onSubmit={setFormData} />
        ) : (
          <POPreview data={formData} withConsignee={true} onBack={handleBackToForm} />
        )}
      </main>
    </div>
  );
} 
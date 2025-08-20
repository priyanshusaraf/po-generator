"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import POForm from "../components/POForm";
import POPreview from "../components/POPreview";

const JAY_N_OM_CONFIG = {
  key: "jay-n-om-industries",
  name: "Jay N Om Industries",
  address: "Plot No. 35/1, Survey No. 98, J.K. Industrial Green Area, Rajkot - 360024\nGujrat, India",
  price: "F.O.R RAJKOT",
};

export default function JayNOmIndustriesPO() {
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
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 8 }}>PO Generator - Jay n Om Industries</h1>
        <p style={{ color: '#666', marginBottom: 24 }}>Fill in the details below to generate your Purchase Order.</p>
        {!formData ? (
          <POForm withConsignee={true} supplierConfig={JAY_N_OM_CONFIG} onSubmit={setFormData} />
        ) : (
          <POPreview data={formData} withConsignee={true} onBack={handleBackToForm} />
        )}
      </main>
    </div>
  );
} 
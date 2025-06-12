"use client";
import { useState } from "react";

const DEFAULTS = {
  companyName: "S M INDUSTRY",
  companyAddress: "11, HAZI BANKU LANE, KONNAGAR, HOOGHLY, PIN-712235, W.B. INDIA",
  companyGST: "19ADBF5S589A1ZW",
  invoiceTo: {
    name: "S. M. Industry",
    address: "11, HAJI BANKU LANE\nKONNAGAR, HOOGHLY – 712235",
    gst: "19ADBF5S589A1ZW",
  },
  note: `Note:-\n(i) Share picture of some more colours as available with you.\n(ii) Add marking in tag:-\n    (a) MRP\n    (b) QR Code\n    (c) Approx ml\n    (d) Made in India\n    (e) Product Name\n    (f) Logo of Company\n    (g) Manufacturing Date\n    (h) Marketed by R.N. Trading Company\n        1/2, Chanditala Branch Road,\n        Kolkata - 700053\n\nE. & O.E\nfor S. M. Industry`,
};

const sectionStyle = {
  marginTop: 32,
  marginBottom: 12,
  fontSize: 22,
  fontWeight: 700,
  color: '#bdb38b',
  letterSpacing: 0.5,
};

const labelStyle = {
  display: 'block',
  fontWeight: 500,
  color: '#888',
  marginBottom: 4,
  fontSize: 15,
};

const inputStyle = {
  width: '100%',
  padding: '8px 10px',
  border: '1px solid #ccc',
  borderRadius: 6,
  fontSize: 15,
  background: '#fff',
  marginBottom: 12,
  color: '#222',
};

const tableHeaderStyle = {
  background: '#bdb38b',
  color: '#222',
  fontWeight: 700,
  fontSize: 15,
};

const tableCellStyle = {
  border: '1px solid #bbb',
  padding: 6,
  background: '#fff',
};

export default function POForm({ withConsignee = true, onSubmit }) {
  const [form, setForm] = useState({
    orgName: DEFAULTS.companyName,
    orgAddress: DEFAULTS.companyAddress,
    orderNo: "",
    orderDate: "",
    paymentTerm: "",
    delivery: "IMMEDIATE",
    validity: "7 DAYS",
    price: "F.O.R RAJKOT",
    gst: "18%",
    consignee: {
      name: "R.N.Trading Company",
      address: "1/2 Chanditala Branch Road\nKolkata – 700053",
      gst: "19AEXPA3954Q1ZJ",
    },
    supplier: {
      name: "Jay N Om Industries",
      address: "Plot No. 35/1, Survey No. 98, J.K. Industrial Green Area, Rajkot - 360024\nGujrat, India",
    },
    items: [
      { itemCode: "", name: "", mark: "", quantity: "", rate: "" },
    ],
  });

  const handleChange = (e, path = []) => {
    const { name, value, files } = e.target;
    setForm((prev) => {
      let updated = { ...prev };
      if (path.length) {
        let obj = updated;
        for (let i = 0; i < path.length - 1; i++) obj = obj[path[i]];
        obj[path[path.length - 1]] = files ? files[0] : value;
      } else {
        updated[name] = value;
      }
      return updated;
    });
  };

  const handleItemChange = (idx, e) => {
    const { name, value, files } = e.target;
    setForm((prev) => {
      const items = [...prev.items];
      items[idx] = { ...items[idx], [name]: files ? files[0] : value };
      return { ...prev, items };
    });
  };

  const addItem = () => {
    setForm((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        { itemCode: "", photo: null, name: "", mark: "", quantity: "", rate: "" },
      ],
    }));
  };

  const removeItem = (idx) => {
    setForm((prev) => {
      const items = prev.items.filter((_, i) => i !== idx);
      return { ...prev, items };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(form);
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: 800, background: '#faf9f6', borderRadius: 12, padding: 32, boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
        <div style={{ marginBottom: 16 }}>
          <label style={labelStyle}>Organisation Name:<input name="orgName" value={form.orgName} onChange={handleChange} style={inputStyle} /></label>
          <label style={labelStyle}>Organisation Address:<textarea name="orgAddress" value={form.orgAddress} onChange={handleChange} style={{ ...inputStyle, minHeight: 38 }} /></label>
        </div>
        <div style={sectionStyle}>Order Details</div>
        <div style={{ display: "flex", gap: 16, marginBottom: 8 }}>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Order No:<input name="orderNo" value={form.orderNo} onChange={handleChange} required style={inputStyle} /></label>
          </div>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Order Date:<input name="orderDate" type="date" value={form.orderDate} onChange={handleChange} required style={inputStyle} /></label>
          </div>
        </div>
        <div style={{ display: "flex", gap: 16, marginBottom: 8 }}>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Payment Term:<input name="paymentTerm" value={form.paymentTerm} onChange={handleChange} required style={inputStyle} /></label>
          </div>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Delivery:<input name="delivery" value={form.delivery} onChange={handleChange} required style={inputStyle} /></label>
          </div>
        </div>
        <div style={{ display: "flex", gap: 16, marginBottom: 8 }}>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Validity:<input name="validity" value={form.validity} onChange={handleChange} required style={inputStyle} /></label>
          </div>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Price:<input name="price" value={form.price} onChange={handleChange} required style={inputStyle} /></label>
          </div>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>GST / IGST:<input name="gst" value={form.gst} onChange={handleChange} required style={inputStyle} /></label>
          </div>
        </div>
        {withConsignee && (
          <>
            <div style={sectionStyle}>Consignee (Ship To)</div>
            <div style={{ display: "flex", gap: 16, marginBottom: 8 }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Name:<input name="name" value={form.consignee.name} onChange={e => handleChange(e, ["consignee", "name"])} required style={inputStyle} /></label>
              </div>
              <div style={{ flex: 2 }}>
                <label style={labelStyle}>Address:<textarea name="address" value={form.consignee.address} onChange={e => handleChange(e, ["consignee", "address"])} required style={{ ...inputStyle, minHeight: 38 }} /></label>
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>GST:<input name="gst" value={form.consignee.gst} onChange={e => handleChange(e, ["consignee", "gst"])} required style={inputStyle} /></label>
              </div>
            </div>
          </>
        )}
        <div style={sectionStyle}>Supplier (Bill from)</div>
        <div style={{ display: "flex", gap: 16, marginBottom: 8 }}>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Name:<input name="name" value={form.supplier.name} onChange={e => handleChange(e, ["supplier", "name"])} required style={inputStyle} /></label>
          </div>
          <div style={{ flex: 2 }}>
            <label style={labelStyle}>Address:<textarea name="address" value={form.supplier.address} onChange={e => handleChange(e, ["supplier", "address"])} required style={{ ...inputStyle, minHeight: 38 }} /></label>
          </div>
        </div>
        <div style={sectionStyle}>Items</div>
        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 16, background: '#fff', borderRadius: 6, overflow: 'hidden' }}>
          <thead>
            <tr style={tableHeaderStyle}>
              <th style={{ ...tableCellStyle, background: '#bdb38b', color: '#222' }}>Item Code</th>
              <th style={{ ...tableCellStyle, background: '#bdb38b', color: '#222' }}>Photo</th>
              <th style={{ ...tableCellStyle, background: '#bdb38b', color: '#222' }}>Name</th>
              <th style={{ ...tableCellStyle, background: '#bdb38b', color: '#222' }}>Mark</th>
              <th style={{ ...tableCellStyle, background: '#bdb38b', color: '#222' }}>Quantity</th>
              <th style={{ ...tableCellStyle, background: '#bdb38b', color: '#222' }}>Rate per pcs</th>
              <th style={{ ...tableCellStyle, background: '#bdb38b', color: '#222' }}></th>
            </tr>
          </thead>
          <tbody>
            {form.items.map((item, idx) => (
              <tr key={idx}>
                <td style={tableCellStyle}><input name="itemCode" value={item.itemCode} onChange={e => handleItemChange(idx, e)} required style={{ ...inputStyle, marginBottom: 0 }} /></td>
                <td style={tableCellStyle}><input name="photo" type="file" accept="image/*" onChange={e => handleItemChange(idx, e)} style={{ ...inputStyle, marginBottom: 0, padding: 0 }} /></td>
                <td style={tableCellStyle}><input name="name" value={item.name} onChange={e => handleItemChange(idx, e)} required style={{ ...inputStyle, marginBottom: 0 }} /></td>
                <td style={tableCellStyle}><input name="mark" value={item.mark} onChange={e => handleItemChange(idx, e)} required style={{ ...inputStyle, marginBottom: 0 }} /></td>
                <td style={tableCellStyle}><input name="quantity" value={item.quantity} onChange={e => handleItemChange(idx, e)} required style={{ ...inputStyle, marginBottom: 0 }} /></td>
                <td style={tableCellStyle}><input name="rate" value={item.rate} onChange={e => handleItemChange(idx, e)} required style={{ ...inputStyle, marginBottom: 0 }} /></td>
                <td style={tableCellStyle}>{form.items.length > 1 && <button type="button" onClick={() => removeItem(idx)} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}>Remove</button>}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" onClick={addItem} style={{ marginBottom: 16, background: '#bdb38b', color: '#222', border: 'none', borderRadius: 6, padding: '8px 18px', fontWeight: 600, cursor: 'pointer' }}>Add Item</button>
        <div style={{ marginTop: 24, textAlign: 'right' }}>
          <button type="submit" className="primary" style={{ background: '#222', color: '#fff', border: 'none', borderRadius: 6, padding: '10px 28px', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Continue</button>
        </div>
      </form>
      <style jsx>{`
        @media (max-width: 900px) {
          form { padding: 16px !important; }
        }
        @media (max-width: 700px) {
          form { max-width: 100vw !important; padding: 8px !important; }
          .section { font-size: 18px !important; }
          table { font-size: 13px !important; }
          th, td { padding: 4px !important; }
          .table-scroll { overflow-x: auto; }
        }
        @media (max-width: 500px) {
          form { padding: 2px !important; }
          .section { font-size: 15px !important; }
          label, input, textarea, button { font-size: 13px !important; }
          .table-scroll { overflow-x: auto; }
        }
      `}</style>
    </>
  );
} 
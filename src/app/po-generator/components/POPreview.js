"use client";
import { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function POPreview({ data, withConsignee, onBack }) {
  const previewRef = useRef();

  const handleDownload = async () => {
    const element = previewRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ orientation: "p", unit: "pt", format: "a4" });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pageWidth;
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("purchase-order.pdf");
  };

  // Helper for rendering item photo preview (if any)
  const renderPhoto = (photo) => {
    if (!photo) return null;
    if (typeof photo === "string") {
      return <img src={photo} alt="item" style={{ width: 48, height: 48, objectFit: 'cover' }} />;
    }
    // File object
    return <img src={URL.createObjectURL(photo)} alt="item" style={{ width: 48, height: 48, objectFit: 'cover' }} />;
  };

  // Check if any item has a photo
  const hasPhoto = data.items.some(item => item.photo);

  const orgName = data.orgName || 'S M INDUSTRY';
  const orgAddress = data.orgAddress || '11, HAZI BANKU LANE, KONNAGAR, HOOGHLY, PIN-712235, W.B. INDIA';

  return (
    <div style={{ width: "100%", maxWidth: 900 }}>
      <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
        <button type="button" onClick={onBack} className="secondary">Back</button>
        <button type="button" onClick={handleDownload} className="primary">Download PDF</button>
      </div>
      <div ref={previewRef} style={{ background: '#fff', color: '#222', fontFamily: 'serif', padding: 32, border: '1px solid #ccc', minWidth: 800, maxWidth: 850, margin: '0 auto', fontSize: 15 }}>
        <div style={{ textAlign: 'center', fontWeight: 700, fontSize: 32, letterSpacing: 1, marginBottom: 4 }}>{orgName}</div>
        <div style={{ textAlign: 'center', fontSize: 15, marginBottom: 2 }}>
          {orgAddress}, <b>GSTIN: 19ADBF5S589A1ZW</b>
        </div>
        <div style={{ textAlign: 'center', fontWeight: 700, fontSize: 20, margin: '16px 0 8px 0', textDecoration: 'underline' }}>PURCHASE ORDER</div>
        <div style={{ display: 'flex', gap: 0, marginBottom: 12 }}>
          <div style={{ flex: 1, border: '1px solid #bbb', padding: 8, fontSize: 14 }}>
            <b>Invoice To</b><br />
            {orgName}<br />
            {orgAddress}<br />
            GST : 19ADBF5S589A1ZW
          </div>
          <div style={{ flex: 2, border: '1px solid #bbb', borderLeft: '1px solid #bbb', padding: 0, fontSize: 14, display: 'flex', alignItems: 'stretch' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed', height: '100%' }}>
              <tbody>
                <tr>
                  <td style={{ width: '20%', fontWeight: 'bold', padding: '8px 4px 2px 8px' }}>Order No</td>
                  <td style={{ width: '20%', fontWeight: 'bold', padding: '8px 4px 2px 4px' }}>Order Date</td>
                  <td style={{ width: '20%', fontWeight: 'bold', padding: '8px 4px 2px 4px' }}>Payment Term</td>
                  <td style={{ width: '20%', fontWeight: 'bold', padding: '8px 4px 2px 4px' }}>GST / IGST</td>
                </tr>
                <tr>
                  <td style={{ padding: '0 4px 8px 8px' }}>{data.orderNo || "-"}</td>
                  <td style={{ padding: '0 4px 8px 4px' }}>{data.orderDate || "-"}</td>
                  <td style={{ padding: '0 4px 8px 4px' }}>{data.paymentTerm || "-"}</td>
                  <td style={{ padding: '0 4px 8px 4px' }}>{data.gst || "-"}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 'bold', padding: '2px 4px 2px 8px' }}>Delivery</td>
                  <td style={{ fontWeight: 'bold', padding: '2px 4px 2px 4px' }}>Validity</td>
                  <td style={{ fontWeight: 'bold', padding: '2px 4px 2px 4px' }}>Price</td>
                  <td></td>
                </tr>
                <tr>
                  <td style={{ padding: '0 4px 8px 8px' }}>{data.delivery || "-"}</td>
                  <td style={{ padding: '0 4px 8px 4px' }}>{data.validity || "-"}</td>
                  <td style={{ padding: '0 4px 8px 4px' }}>{data.price || "-"}</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {withConsignee && (
          <div style={{ border: '1px solid #bbb', padding: 8, fontSize: 14, marginBottom: 8 }}>
            <b>Consignee (Ship To)</b><br />
            {data.consignee?.name}<br />
            {data.consignee?.address?.split('\n').map((l, i) => <span key={i}>{l}<br /></span>)}
            GST : {data.consignee?.gst}
          </div>
        )}
        <div style={{ border: '1px solid #bbb', padding: 8, fontSize: 14, marginBottom: 8 }}>
          <b>Supplier (Bill from)</b><br />
          {data.supplier?.name}<br />
          {data.supplier?.address?.split('\n').map((l, i) => <span key={i}>{l}<br /></span>)}
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', margin: '16px 0', fontSize: 15 }}>
          <thead>
            <tr style={{ background: '#bdb38b', color: '#222', fontWeight: 700 }}>
              <th style={{ border: '1px solid #bbb', padding: 6 }}>ITEM CODE</th>
              {hasPhoto && <th style={{ border: '1px solid #bbb', padding: 6 }}>PHOTOS</th>}
              <th style={{ border: '1px solid #bbb', padding: 6 }}>NAME</th>
              <th style={{ border: '1px solid #bbb', padding: 6 }}>MARK</th>
              <th style={{ border: '1px solid #bbb', padding: 6 }}>QUANTITY</th>
              <th style={{ border: '1px solid #bbb', padding: 6 }}>RATE PER PCS.</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item, idx) => (
              <tr key={idx}>
                <td style={{ border: '1px solid #bbb', padding: 6, textAlign: 'center' }}>{item.itemCode}</td>
                {hasPhoto && <td style={{ border: '1px solid #bbb', padding: 6, textAlign: 'center' }}>{renderPhoto(item.photo)}</td>}
                <td style={{ border: '1px solid #bbb', padding: 6, textAlign: 'center', fontWeight: 600 }}>{item.name}</td>
                <td style={{ border: '1px solid #bbb', padding: 6, textAlign: 'center', fontWeight: 700 }}>{item.mark}</td>
                <td style={{ border: '1px solid #bbb', padding: 6, textAlign: 'center' }}>{item.quantity}</td>
                <td style={{ border: '1px solid #bbb', padding: 6, textAlign: 'center', fontWeight: 700 }}>{item.rate}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {data.remarks && data.remarks.trim() && (
          <div style={{ fontSize: 14, margin: '16px 0', padding: '12px', background: '#f9f9f9', border: '1px solid #ddd', borderRadius: 4 }}>
            <b>Remarks:</b>
            <br />
            <div style={{ whiteSpace: 'pre-line', marginTop: 8 }}>
              {data.remarks}
            </div>
          </div>
        )}
        <div style={{ fontSize: 13, margin: '16px 0', whiteSpace: 'pre-line' }}>
          <b>Note:-</b>
          <br />
          (i) Share picture of some more colours as available with you.
          <br />
          (ii) Add marking in tag:-
          <br />
          &nbsp;&nbsp;&nbsp;(a) MRP
          <br />
          &nbsp;&nbsp;&nbsp;(b) QR Code
          <br />
          &nbsp;&nbsp;&nbsp;(c) Approx ml
          <br />
          &nbsp;&nbsp;&nbsp;(d) Product Name
          <br />
          &nbsp;&nbsp;&nbsp;(e) Logo of Company
          <br />
          &nbsp;&nbsp;&nbsp;(f) Manufacturing Date
          <br />
          &nbsp;&nbsp;&nbsp;(g) Marketed by R.N. Trading Company
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1/2, Chanditala Branch Road,
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Kolkata - 700053
          <br /><br />
          E. & O.E<br />for S. M. Industry
        </div>
      </div>
    </div>
  );
} 
import React, { useState } from "react";
import "./Qrcode.css";

const Qrcode = () => {
  const [img, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrData, setQrData] = useState();
  const [qrSize, setQrSize] = useState();

  async function generateQR() {
    setLoading(true);
    try {
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize} x${qrSize}&data=${encodeURIComponent(
        qrData
      )}`;
      setImage(url);
    } catch (err) {
      console.error("error generating QR code", err);
    } finally {
      setLoading(false);
    }
  }

  function downloadQR() {
    fetch(img)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "qrcode.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((err) => {
        console.error("error downloading QR code", err);
      });
  }

  return (
    <div className="app-container">
      <h1>QR CODE GENERATOR</h1>
      {loading && <p>Please wait...</p>}
      {img && <img className="qr-code-image" src={img} />}

      <div>
        <label className="input-label" htmlFor="dataInput">
          Data for your QR-CODE:
        </label>
        <input
          type="text"
          id="dataInput"
          value={qrData}
          onChange={(e) => setQrData(e.target.value)}
        />
        <label className="input-label" htmlFor="size-input">
          Set image size
        </label>
        <input
          type="text"
          id="size-input"
          value={qrSize}
          onChange={(e) => setQrSize(e.target.value)}
        />
        <button
          className="generate-btn"
          onClick={generateQR}
          disabled={loading}
        >
          Generate QR_CODE
        </button>

        <button className="download-btn" onClick={downloadQR}>
          Download QR_CODE
        </button>
      </div>
    </div>
  );
};
export default Qrcode;

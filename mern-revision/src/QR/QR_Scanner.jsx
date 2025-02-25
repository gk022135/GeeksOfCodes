import React, { useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";

const QrScanner = ({ onScanSuccess, onScanError, isScanning }) => {
  const qrCodeRegionId = "qr-code-region";
  const html5QrCodeRef = useRef(null);

  useEffect(() => {
    html5QrCodeRef.current = new Html5Qrcode(qrCodeRegionId);
    return () => {
      if (html5QrCodeRef.current) {
        html5QrCodeRef.current.stop().catch(console.error);
      }
    };
  }, []);

  useEffect(() => {
    const startScanner = async () => {
      try {
        if (isScanning && html5QrCodeRef.current) {
          await html5QrCodeRef.current.start(
            { facingMode: "environment" },
            { fps: 10, qrbox: { width: 250, height: 250 } },
            onScanSuccess,
            onScanError
          );
        }
      } catch (err) {
        console.error("Failed to start QR scanner:", err);
      }
    };

    const stopScanner = async () => {
      if (html5QrCodeRef.current && !isScanning) {
        await html5QrCodeRef.current.stop();
      }
    };

    if (isScanning) startScanner();
    else stopScanner();
  }, [isScanning, onScanSuccess, onScanError]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">QR Code Scanner</h2>
      <div id={qrCodeRegionId} className="border-2 rounded-lg w-72 h-72"></div>
    </div>
  );
};

export default QrScanner;

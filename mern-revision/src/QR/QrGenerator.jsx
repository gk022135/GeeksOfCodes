import React, { useState, useRef } from "react";
import QRCode from "react-qr-code";
import { Canvg } from "canvg";
import AddEntryExitQr from "../Teacher-pages/AddEntryExitQr";

const QrGenerator = () => {
  const [text, setText] = useState("");
  const svgRef = useRef(null); // Reference for the SVG QR Code

  const downloadQRCode = async () => {
    if (!svgRef.current) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Get QR Code SVG as a string
    const svgData = new XMLSerializer().serializeToString(svgRef.current);

    // Set canvas size same as QR Code
    const size = 256;
    canvas.width = size;
    canvas.height = size;

    // Render the SVG onto the canvas
    const v = await Canvg.fromString(ctx, svgData);
    await v.render();

    // Convert canvas to PNG
    const pngFile = canvas.toDataURL("image/png");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngFile;
    downloadLink.download = "qr_code.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="flex flex-col items-center justify-center content-center gap-4 p-4 text-white">
      <h1 className="bg-gradient-to-tr from-yellow-400 to-pink-600 bg-clip-text text-transparent text-2xl font-bold">
        QR Generator
      </h1>

      <input
        type="text"
        placeholder="Enter text to generate QR"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="p-2 border rounded w-72 border-amber-300 text-white"
      />

      {text && (
        <div>
          {/* Attach ref to the QR Code SVG */}
          <QRCode value={text} size={256} ref={svgRef} />
        </div>
      )}

      <button
        onClick={downloadQRCode}
        className="mt-2 bg-gradient-to-tr from-yellow-400 to-red-600 text-black font-bold px-4 py-2 rounded"
      >
        Download QR Code
      </button>
      <AddEntryExitQr />
    </div>
  );
};

export default QrGenerator;

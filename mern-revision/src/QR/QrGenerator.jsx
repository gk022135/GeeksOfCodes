import React, { useState } from "react";
import QRCode from "react-qr-code";

const QrGenerator = () => {
  const [text, setText] = useState("");

  return (
    <div className="flex flex-col items-center justify-center content-center gap-4 p-4">
      <h2 className="text-xl font-semibold">QR Code Generator</h2>
      <input
        type="text"
        placeholder="Enter text to generate QR"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="p-2 border rounded w-72"
      />
      {text && (
        <QRCode
          value={text}
          size={256}
          bgColor="#ffffff"
          fgColor="#000000"
          level="H"
        />
      )}

      <button
        onClick={() => {
          const svg = document.querySelector("svg");
          const svgData = new XMLSerializer().serializeToString(svg);
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          const img = new Image();
          img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            const pngFile = canvas
              .toDataURL("image/png")
              .replace("image/png", "image/octet-stream");
            const downloadLink = document.createElement("a");
            downloadLink.href = pngFile;
            downloadLink.download = "qr_code.png";
            downloadLink.click();
          };
          img.src = "data:image/svg+xml;base64," + btoa(svgData);
        }}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Download QR Code
      </button>

    </div>
  );
};

export default QrGenerator;

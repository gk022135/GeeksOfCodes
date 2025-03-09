import React, { useContext, useEffect, useState } from "react";
import QrScanner from "../QR/QR_Scanner";
import { AppContext } from "../ContextApi/FisrtContext";
import QrvarificationG1g2 from "./QR_VarificationG1G2";

const Qr_res = () => {
  const [scanResult, setScanResult] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const {SendDataSignLogin} = useContext(AppContext);

  const handleScanSuccess = (result) => {
    console.log("Scanned data:", result);
    setScanResult(result);
    setIsScanning(false); // Auto-stop after successful scan (optional)
  };

  const handleScanError = (error) => {
    console.warn("QR scan error:", error);
  };

  //sending scanned data to backend for varification purpose
  // useEffect ( async()=>{
  //   try{
  //       // const qr_response = await SendDataSignLogin()
  //   }
  //   catch (error){
  //     console.log("qr_res error = ", error)

  //   }

  // }, [])

  return (
    <div className="flex flex-col items-center p-4 bg-black text-white">
      <h1 className="text-2xl font-bold mb-4">React QR Code Scanner</h1>
      <QrScanner
        onScanSuccess={handleScanSuccess}
        onScanError={handleScanError}
        isScanning={isScanning}
      />

      <div className="flex gap-4 mt-4">
        <button
          className={`px-4 py-2 rounded-lg ${
            isScanning ? "bg-gray-800" : "bg-green-600"
          } text-white`}
          disabled={isScanning}
          onClick={() => setIsScanning(true)}
        >
          Start Scanning
        </button>

        <button
          className={`px-4 py-2 rounded-lg ${
            isScanning ? "bg-red-500" : "bg-gray-800"
          } text-white`}
          disabled={!isScanning}
          onClick={() => setIsScanning(false)}
        >
          Stop Scanning
        </button>
      </div>

      {scanResult && (
        <div className="mt-4 p-2 bg-black border-1 rounded">
          <strong>Scan Result:</strong> {scanResult}
        </div>
      )}

      <QrvarificationG1g2 Qrvalue = {scanResult}/>
    </div>
  );
};

export default Qr_res;

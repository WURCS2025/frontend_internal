import React, { useState, useEffect } from "react";
import { VIRUS_SCAN_URL } from "../../constants";

interface ScanFileProps {
  file: File;
  triggerScan: boolean;
  onResult: (result: { clean: boolean; message: string }) => void;
  onScanning: (status: boolean) => void;
}

const ScanFile: React.FC<ScanFileProps> = ({ file, triggerScan, onResult, onScanning }) => {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    if (triggerScan && file) {
      runScan();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerScan]);

  const estimateScanTime = (fileSize: number) => {
    const sizeMB = fileSize / (1024 * 1024);
    return Math.max(10, Math.round(sizeMB * 15));
  };

  const simulateProgress = (seconds: number) => {
    let current = 0;
    const interval = 1000;
    const step = 100 / seconds;

    const timer = setInterval(() => {
      current += step;
      setProgress(Math.min(current, 100));
      if (current >= 100) clearInterval(timer);
    }, interval);
  };

  const runScan = async () => {
    setProgress(0);
    onScanning(true);
    simulateProgress(estimateScanTime(file.size));

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${VIRUS_SCAN_URL}`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      onResult({
        clean: !data.infected,
        message: data.infected ? "❌ Virus detected!" : "✅ File is clean",
      });
    } catch (err) {
      onResult({
        clean: false,
        message: "⚠️ Scan error",
      });
    }
    onScanning(false);
  };

  return (
    <div style={{ marginTop: "0.5rem" }}>
      <p><strong>Scanning file:</strong> {(file.size / (1024 * 1024)).toFixed(2)} MB</p>
      <label>Scan Progress:</label>
      <div style={{ height: 10, background: "#ddd", borderRadius: 5 }}>
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            background: "#0071bc",
            borderRadius: 5,
            transition: "width 1s linear",
          }}
        />
      </div>
    </div>
  );
};

export default ScanFile;

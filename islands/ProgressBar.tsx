import { useEffect, useRef, useState } from "preact/hooks";

export default function ProgressBar() {
  const [_progress, _setProgress] = useState(retrieveLastProgress());
  const progressRef = useRef(_progress);

  function retrieveLastProgress() {
    return Number(globalThis?.localStorage.getItem("progress")) || 0;
  }

  function setProgress(value: number) {
    _setProgress(value);
    progressRef.current = value;
    globalThis?.localStorage.setItem("progress", String(value));
  }

  function onPageUnload() {
    const interval = setInterval(() => {
      const current = progressRef.current;
      if(current > 70) return clearInterval(interval);
      setProgress(current + 1);
    }, 10);
  }

  function onPageLoad() {
    const interval = setInterval(() => {
      const current = progressRef.current;
      if(current < 100) return setProgress(current + 5);
      setTimeout(() => setProgress(0), 100);
      clearInterval(interval);
    }, 1);
  }

  useEffect(() => {
    onPageLoad();
    globalThis.addEventListener("beforeunload", onPageUnload);
  }, []);

  return (
    <div className="fixed top-0 left-0 h-1 bg-background z-50 transition-all w-full">
      <div className="h-full bg-primary transition-all duration-[10ms]" style={{ width: `${_progress}%` }} />
    </div>
  );
}
import { useEffect, useRef, useState } from "preact/hooks";

export default function ProgressBar() {
  const [progress, setProgress] = useState(retrieveLastProgress());
  const progressRef = useRef(progress);

  function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
      .test(
        navigator.userAgent,
      );
  }

  function retrieveLastProgress() {
    return Number(globalThis.localStorage?.getItem("progress")) || 0;
  }

  function updateProgress(value: number) {
    setProgress(value);
    progressRef.current = value;
    globalThis.localStorage?.setItem("progress", String(value));
  }

  function onPageUnload() {
    const interval = setInterval(() => {
      const current = progressRef.current;
      if (current > 70) return clearInterval(interval);
      updateProgress(current + 1);
    }, 10);
  }

  function onPageLoad() {
    const interval = setInterval(() => {
      const current = progressRef.current;
      if (current < 100) return updateProgress(current + 5);
      setTimeout(() => updateProgress(0), 100);
      clearInterval(interval);
    }, 1);
  }

  useEffect(() => {
    if (isMobile()) return;
    onPageLoad();
    globalThis.addEventListener("beforeunload", onPageUnload);
  }, []);

  if (isMobile()) return <></>;

  return (
    <div className="fixed top-0 left-0 h-1 bg-background z-50 transition-all w-full">
      <div
        className="h-full bg-primary transition-all duration-10"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

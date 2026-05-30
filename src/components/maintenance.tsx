"use client";

import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  type CSSProperties,
  type Dispatch,
  type SetStateAction,
} from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ══════════════════════════════════════════════════════════════
   TYPES
══════════════════════════════════════════════════════════════ */

type Phase = "boot" | "post" | "maintenance";
type CheckStatus = "pending" | "checking" | "ok" | "warning" | "error";
type Tab = "status" | "log" | "help";

interface HardwareCheck {
  id: string;
  label: string;
  value: string;
  detail: string;
  status: CheckStatus;
  final: CheckStatus;
}

interface LogEntry {
  type: "INFO" | "WARN" | "ERR ";
  msg: string;
}

/* ══════════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════════ */

const HARDWARE_CHECKS: HardwareCheck[] = [
  { id: "cpu",  label: "Processor       ", value: "PORTFOLIO-CORE i9  5.2GHz  64-bit", detail: "x86_64 / 24 cores", status: "pending", final: "ok" },
  { id: "ram",  label: "System Memory   ", value: "32768 MB DDR5-6000  ECC   Dual Ch.", detail: "No errors detected", status: "pending", final: "ok" },
  { id: "gpu",  label: "Display Adapter ", value: "WebGL 3.0 Accel.   16 GB  Enabled", detail: "Hardware acceleration on", status: "pending", final: "ok" },
  { id: "stor", label: "NVMe Storage    ", value: "2048 GB PCIe 5.0   Active  R/W OK", detail: "S.M.A.R.T status: OK", status: "pending", final: "ok" },
  { id: "net",  label: "Network Card    ", value: "10 GbE Fiber       MAINT  Restrict", detail: "Maintenance firewall active", status: "pending", final: "warning" },
  { id: "sec",  label: "Security Module ", value: "TPM 3.1            Auth.  Active", detail: "Secure Boot: enforced", status: "pending", final: "ok" },
  { id: "rtc",  label: "System Clock    ", value: "RTC Battery OK     Sync   NTP+UTC", detail: "Last sync: 00:00:07 ago", status: "pending", final: "ok" },
  { id: "boot", label: "Boot Partition  ", value: "MAINT PART #503    R/O    Mounted", detail: "Normal boot suspended", status: "pending", final: "warning" },
];

const MAINT_LOGS: LogEntry[] = [
  { type: "INFO", msg: "Entering maintenance mode — public access suspended" },
  { type: "INFO", msg: "Mounting overlay filesystem at /mnt/maintenance" },
  { type: "INFO", msg: "Loading upgrade manifest: portfolio v2.0.0 → v2.1.0" },
  { type: "INFO", msg: "Verifying package checksums... SHA-256 OK (187 packages)" },
  { type: "WARN", msg: "Dependency conflict detected in node_modules — resolving" },
  { type: "INFO", msg: "Resolved: upgraded next@16.1.6 → next@16.2.0" },
  { type: "INFO", msg: "Applying 3 pending database schema migrations" },
  { type: "INFO", msg: "Migration 001_add_projects_table ............... OK" },
  { type: "INFO", msg: "Migration 002_index_timestamps ................. OK" },
  { type: "INFO", msg: "Migration 003_update_metadata_schema ........... OK" },
  { type: "INFO", msg: "Running Next.js production build (this may take a while)" },
  { type: "WARN", msg: "Build cache partially invalidated — full rebuild required" },
  { type: "INFO", msg: "Compiled 247 modules in 18.4s" },
  { type: "INFO", msg: "Optimizing 247 image assets via sharp pipeline" },
  { type: "INFO", msg: "Running integration test suite (94 tests)..." },
  { type: "WARN", msg: "Health check timeout on /api/status — retrying (2/5)" },
  { type: "INFO", msg: "Deployment pending... waiting for pod readiness" },
];

/* ══════════════════════════════════════════════════════════════
   HELPERS
══════════════════════════════════════════════════════════════ */

const pbar = (pct: number, w = 26): string =>
  "▓".repeat(Math.round((pct / 100) * w)) + "░".repeat(w - Math.round((pct / 100) * w));

const formatUptime = (s: number): string => {
  const h = String(Math.floor(s / 3600)).padStart(2, "0");
  const m = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
  const sec = String(s % 60).padStart(2, "0");
  return `${h}:${m}:${sec}`;
};

const getTime = (): string =>
  new Date().toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" });

const getDate = (): string =>
  new Date().toLocaleDateString("en-US", { weekday: "short", year: "numeric", month: "short", day: "2-digit" });

/* ══════════════════════════════════════════════════════════════
   THEME
══════════════════════════════════════════════════════════════ */

const C = {
  green:   "#00ff41",
  green2:  "#00cc33",
  green3:  "#007a1f",
  green4:  "#003d10",
  green5:  "#001a07",
  amber:   "#ffaa00",
  red:     "#ff3333",
  blue:    "#00bbff",
  dim:     "#2d5e3a",
  bg:      "#000000",
};

const statusColor: Record<CheckStatus, string> = {
  pending:  C.dim,
  checking: C.blue,
  ok:       C.green,
  warning:  C.amber,
  error:    C.red,
};

const statusTag: Record<CheckStatus, string> = {
  pending:  "         ",
  checking: " ░░░░░░░ ",
  ok:       "  [ OK ] ",
  warning:  " [WARN!] ",
  error:    " [ERROR] ",
};

/* ══════════════════════════════════════════════════════════════
   GLOBAL CSS
══════════════════════════════════════════════════════════════ */

const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=VT323&family=Share+Tech+Mono&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { background: #000; overflow-x: hidden; }
  body { scrollbar-width: thin; scrollbar-color: #004d14 #000; }
  ::-webkit-scrollbar { width: 5px; background: #000; }
  ::-webkit-scrollbar-thumb { background: #004d14; }

  .g  { text-shadow: 0 0 6px #00ff41aa, 0 0 14px #00ff4155; }
  .am { text-shadow: 0 0 6px #ffaa00aa, 0 0 14px #ffaa0055; }
  .re { text-shadow: 0 0 6px #ff3333aa, 0 0 14px #ff333355; }
  .bl { text-shadow: 0 0 6px #00bbffaa, 0 0 14px #00bbff55; }
  .dg { text-shadow: none; opacity: 0.45; }

  @keyframes flicker {
    0%,89%,91%,93%,95%,100% { opacity: 1; }
    90% { opacity: .82; } 92% { opacity: .95; } 94% { opacity: .88; } 96% { opacity: .97; }
  }
  .flicker { animation: flicker 7s ease-in-out infinite; }

  @keyframes glitch {
    0%   { transform: none; filter: none; }
    20%  { transform: translate(-3px, 0) skewX(2deg); filter: hue-rotate(90deg) brightness(1.3); }
    40%  { transform: translate(3px, 0) skewX(-1deg); filter: hue-rotate(-40deg); }
    60%  { transform: translate(0, 2px); filter: brightness(1.6) saturate(2); }
    80%  { transform: translate(-1px, 0); filter: none; }
    100% { transform: none; filter: none; }
  }
  .glitch-anim { animation: glitch 0.14s steps(3) forwards; }

  @keyframes scanmove { from { top: -6px; } to { top: 100vh; } }
  .scan-beam {
    position: fixed; left: 0; right: 0; height: 6px; pointer-events: none; z-index: 20;
    background: linear-gradient(to bottom, transparent, rgba(0,255,65,0.07) 50%, transparent);
    animation: scanmove 10s linear infinite;
  }

  @keyframes blink { 0%,49%{opacity:1} 50%,100%{opacity:0} }
  .blink { animation: blink 1.06s step-end infinite; }

  @keyframes spin { to { transform: rotate(360deg); } }
  .spin { display: inline-block; animation: spin 0.8s linear infinite; }

  @keyframes pulse-border {
    0%,100% { border-color: #00ff41; box-shadow: 0 0 6px #00ff4166; }
    50% { border-color: #00cc33; box-shadow: 0 0 14px #00ff4199; }
  }
  .pulse-border { animation: pulse-border 2s ease-in-out infinite; }

  @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  .marquee-inner { animation: marquee 22s linear infinite; white-space:nowrap; display:inline-block; }

  @keyframes fadeIn { from{opacity:0;transform:translateY(-4px)} to{opacity:1;transform:translateY(0)} }
  .fade-in { animation: fadeIn 0.25s ease forwards; }

  .btn-fkey {
    background: transparent;
    border: 1px solid #007a1f;
    color: #00cc33;
    font-family: inherit;
    font-size: inherit;
    padding: 1px 8px;
    cursor: pointer;
    transition: all 0.15s;
  }
  .btn-fkey:hover, .btn-fkey.active {
    background: #00ff4122;
    border-color: #00ff41;
    color: #00ff41;
    text-shadow: 0 0 6px #00ff41;
  }
`;

/* ══════════════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════════════ */

export default function MaintenancePage() {
  const [phase, setPhase]         = useState<Phase>("boot");
  const [memCount, setMemCount]   = useState(0);
  const [checks, setChecks]       = useState<HardwareCheck[]>(HARDWARE_CHECKS);
  const [logs, setLogs]           = useState<LogEntry[]>([]);
  const [progress, setProgress]   = useState(0);
  const [uptime, setUptime]       = useState(0);
  const [clockTime, setClockTime] = useState(getTime());
  const [glitch, setGlitch]       = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("status");
  const [bootStep, setBootStep]   = useState(0);
  const logsEndRef = useRef<HTMLDivElement>(null!);

  /* ── Inject global CSS ── */
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = GLOBAL_CSS;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  /* ── Clock ── */
  useEffect(() => {
    const t = setInterval(() => setClockTime(getTime()), 1000);
    return () => clearInterval(t);
  }, []);

  /* ── Uptime ── */
  useEffect(() => {
    if (phase !== "maintenance") return;
    const t = setInterval(() => setUptime(u => u + 1), 1000);
    return () => clearInterval(t);
  }, [phase]);

  /* ── Random glitch ── */
  useEffect(() => {
    const schedule = () => {
      const delay = 4000 + Math.random() * 10000;
      return setTimeout(() => {
        setGlitch(true);
        setTimeout(() => setGlitch(false), 160);
        schedule();
      }, delay);
    };
    const t = schedule();
    return () => clearTimeout(t);
  }, []);

  /* ── Boot phase ── */
  useEffect(() => {
    if (phase !== "boot") return;
    const MEM_TARGET = 32768;
    const TICK_STEP = 512;
    const TICK_MS = 18;
    let count = 0;
    const memInterval = setInterval(() => {
      count = Math.min(count + TICK_STEP, MEM_TARGET);
      setMemCount(count);
      if (count >= MEM_TARGET) clearInterval(memInterval);
    }, TICK_MS);

    const t1 = setTimeout(() => setBootStep(1), 200);
    const t2 = setTimeout(() => setBootStep(2), 500);
    const t3 = setTimeout(() => setBootStep(3), (MEM_TARGET / TICK_STEP) * TICK_MS + 200);
    const t4 = setTimeout(() => setBootStep(4), (MEM_TARGET / TICK_STEP) * TICK_MS + 700);
    const t5 = setTimeout(() => setBootStep(5), (MEM_TARGET / TICK_STEP) * TICK_MS + 1400);
    const toPost = setTimeout(() => setPhase("post"), (MEM_TARGET / TICK_STEP) * TICK_MS + 2000);
    return () => {
      clearInterval(memInterval);
      [t1, t2, t3, t4, t5, toPost].forEach(clearTimeout);
    };
  }, [phase]);

  /* ── POST phase ── */
  useEffect(() => {
    if (phase !== "post") return;
    let idx = 0;
    const run = () => {
      if (idx >= HARDWARE_CHECKS.length) {
        setTimeout(() => setPhase("maintenance"), 500);
        return;
      }
      setChecks(prev => prev.map((c, i) => i === idx ? { ...c, status: "checking" } : c));
      const delay = 200 + Math.random() * 350;
      setTimeout(() => {
        setChecks(prev => prev.map((c, i) =>
          i === idx ? { ...c, status: c.final } : c
        ));
        idx++;
        setTimeout(run, 80);
      }, delay);
    };
    const init = setTimeout(run, 300);
    return () => clearTimeout(init);
  }, [phase]);

  /* ── Maintenance: logs + progress ── */
  useEffect(() => {
    if (phase !== "maintenance") return;
    let li = 0;
    const addLog = () => {
      if (li >= MAINT_LOGS.length) return;
      setLogs(prev => [...prev, MAINT_LOGS[li++]]);
      setTimeout(addLog, 600 + Math.random() * 600);
    };
    addLog();
    let p = 0;
    const prog = setInterval(() => {
      p = Math.min(p + 0.35, 67.5);
      setProgress(p);
      if (p >= 67.5) clearInterval(prog);
    }, 55);
    return () => clearInterval(prog);
  }, [phase]);

  /* ── Auto-scroll logs ── */
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  /* ── F-key shortcuts ── */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "F1") { e.preventDefault(); setActiveTab("help"); }
      if (e.key === "F2") { e.preventDefault(); setActiveTab("status"); }
      if (e.key === "F3") { e.preventDefault(); setActiveTab("log"); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  /* ─── LAYOUT ─── */
  const root: CSSProperties = {
    fontFamily: "'Share Tech Mono', 'Courier New', monospace",
    fontSize: "clamp(11px, 1.5vw, 14px)",
    lineHeight: 1.55,
    background: C.bg,
    color: C.green,
    minHeight: "100vh",
    minWidth: "100vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "clamp(8px, 2vw, 24px)",
    position: "relative",
    overflow: "hidden",
  };

  return (
    <div style={root}>
      {/* CRT scanlines overlay */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 15, pointerEvents: "none",
        backgroundImage:
          "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.25) 3px,rgba(0,0,0,0.25) 4px)",
      }} />
      {/* Vignette */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 14, pointerEvents: "none",
        background: "radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(0,0,0,0.75) 100%)",
      }} />
      {/* Moving scan beam */}
      <div className="scan-beam" />

      <motion.div
        className={`flicker${glitch ? " glitch-anim" : ""}`}
        style={{ width: "100%", maxWidth: "920px", position: "relative", zIndex: 2 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.15 }}
      >
        <BiosHeader clockTime={clockTime} getDate={getDate} />

        {/* ─── BOOT ─── */}
        <AnimatePresence mode="wait">
          {phase === "boot" && (
            <motion.div key="boot"
              initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              <BootScreen memCount={memCount} step={bootStep} />
            </motion.div>
          )}
          {phase === "post" && (
            <motion.div key="post"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}>
              <PostScreen checks={checks} />
            </motion.div>
          )}
          {phase === "maintenance" && (
            <motion.div key="maint"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}>
              <MaintenanceScreen
                checks={checks}
                logs={logs}
                progress={progress}
                uptime={uptime}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                logsEndRef={logsEndRef}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <BiosFooter phase={phase} activeTab={activeTab} setActiveTab={setActiveTab} />
      </motion.div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   BIOS HEADER
══════════════════════════════════════════════════════════════ */

function BiosHeader({ clockTime, getDate }: { clockTime: string; getDate: () => string }) {
  const box: CSSProperties = {
    border: `1px solid ${C.green3}`,
    background: C.green5,
    padding: "6px 12px",
    marginBottom: "2px",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "4px 16px",
  };
  return (
    <div style={box}>
      <span className="g" style={{ fontFamily: "'VT323', monospace", fontSize: "clamp(16px, 2.5vw, 22px)", letterSpacing: "0.08em", color: C.green }}>
        ▸ DEVBIOS  v3.7.2-MAINT
      </span>
      <span style={{ color: C.green3 }}>Copyright (C) 2024 Anthropic Systems Inc. All Rights Reserved.</span>
      <span className="g" style={{ color: C.green2, marginLeft: "auto" }}>
        {getDate()}  <span style={{ color: C.green }}>{clockTime}</span>
      </span>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   BOOT SCREEN
══════════════════════════════════════════════════════════════ */

function BootScreen({ memCount, step }: { memCount: number; step: number }) {
  const panel: CSSProperties = {
    border: `1px solid ${C.green4}`,
    padding: "14px 16px",
    minHeight: "200px",
    background: `${C.green5}88`,
  };
  const line = (content: React.ReactNode, visible: boolean, key: string) =>
    visible ? (
      <motion.div key={key} className="fade-in" style={{ marginBottom: "4px" }}>
        {content}
      </motion.div>
    ) : null;

  return (
    <div style={panel}>
      {line(
        <span className="g" style={{ color: C.green }}>
          DEVBIOS v3.7.2  —  UEFI Firmware Initialization
        </span>,
        step >= 0, "l0"
      )}
      {line(
        <span style={{ color: C.green2 }}>
          CPU: PORTFOLIO-CORE i9 @ 5.2GHz (24 Cores / 48 Threads)  [64-bit]
        </span>,
        step >= 1, "l1"
      )}
      {line(
        <span style={{ color: C.green2 }}>
          Memory Test:{" "}
          <span className="g" style={{ color: C.green }}>
            {memCount.toLocaleString()} KB
          </span>
          {memCount < 32768 ? (
            <span className="spin" style={{ marginLeft: 8, color: C.blue }}>◌</span>
          ) : (
            <span className="g" style={{ color: C.green, marginLeft: 8 }}>OK</span>
          )}
        </span>,
        step >= 2, "l2"
      )}
      {line(
        <span style={{ color: C.green2 }}>Memory: 32768 MB DDR5-6000 ECC  →  <span className="g" style={{ color: C.green }}>PASSED</span></span>,
        step >= 3, "l3"
      )}
      {line(
        <span style={{ color: C.green2 }}>Detecting storage devices... NVMe(0) found  <span className="g" style={{ color: C.green }}>OK</span></span>,
        step >= 4, "l4"
      )}
      {line(
        <span style={{ color: C.amber }} className="am">
          ⚠  MAINTENANCE FLAG DETECTED — Suspending normal boot sequence...
        </span>,
        step >= 5, "l5"
      )}
      <span className="blink" style={{ color: C.green2 }}>_</span>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   POST SCREEN
══════════════════════════════════════════════════════════════ */

function PostScreen({ checks }: { checks: HardwareCheck[] }) {
  const panel: CSSProperties = {
    border: `1px solid ${C.green4}`,
    padding: "10px 14px",
    background: `${C.green5}88`,
  };
  const title: CSSProperties = {
    color: C.green2,
    borderBottom: `1px solid ${C.green4}`,
    paddingBottom: "6px",
    marginBottom: "8px",
    fontFamily: "'VT323', monospace",
    fontSize: "clamp(15px, 2vw, 18px)",
    letterSpacing: "0.1em",
  };
  return (
    <div style={panel}>
      <div style={title}>POST — POWER ON SELF TEST</div>
      {checks.map((c, i) => (
        <motion.div
          key={c.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: c.status !== "pending" ? 1 : 0.3 }}
          transition={{ duration: 0.2 }}
          style={{
            display: "flex",
            alignItems: "center",
            padding: "2px 0",
            borderBottom: `1px solid ${C.green4}33`,
            gap: 4,
          }}
        >
          <span style={{ color: C.dim, minWidth: "22px", textAlign: "right" }}>{String(i + 1).padStart(2, "0")}.</span>
          <span style={{ color: statusColor[c.status], minWidth: "90px" }}>
            {statusTag[c.status]}
          </span>
          <span style={{ color: C.green2, minWidth: "160px" }}>{c.label}</span>
          <span style={{ color: c.status === "pending" ? C.dim : C.green, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.value}</span>
          <span style={{ color: C.dim, fontSize: "0.85em", minWidth: "160px", textAlign: "right" }}>{c.status !== "pending" ? c.detail : ""}</span>
        </motion.div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAINTENANCE SCREEN
══════════════════════════════════════════════════════════════ */

interface MaintProps {
  checks:      HardwareCheck[];
  logs:        LogEntry[];
  progress:    number;
  uptime:      number;
  activeTab:   Tab;
  setActiveTab: Dispatch<SetStateAction<Tab>>;
  logsEndRef:  React.RefObject<HTMLDivElement>;
}

function MaintenanceScreen({
  checks, logs, progress, uptime, activeTab, setActiveTab, logsEndRef,
}: MaintProps) {

  const outer: CSSProperties = { display: "flex", flexDirection: "column", gap: "6px" };
  const topRow: CSSProperties = { display: "flex", gap: "6px", flexWrap: "wrap" };

  /* — Status code banner — */
  const bannerBox: CSSProperties = {
    border: `1px solid ${C.amber}`,
    background: "#100800",
    padding: "10px 16px",
    flex: "1 1 280px",
    boxShadow: `0 0 18px ${C.amber}33`,
  };

  /* — Info tiles — */
  const tilesRow: CSSProperties = { display: "flex", gap: "6px", flexWrap: "wrap" };
  const tile = (label: string, value: string, cls: string, bgColor: string): React.ReactNode => (

    <div style={{ border: `1px solid ${C.green4}`, background: bgColor, padding: "6px 12px", flex: "1 1 120px", minWidth: "100px" }}>
      <div style={{ color: C.dim, fontSize: "0.82em" }}>{label}</div>
      <div className={cls} style={{ color: cls === "am" ? C.amber : cls === "re" ? C.red : C.green, fontFamily: "'VT323', monospace", fontSize: "clamp(16px, 2.2vw, 20px)" }}>
        {value}
      </div>
    </div>
  );

  /* — Tabs — */
  const tabBar: CSSProperties = {
    display: "flex",
    borderBottom: `1px solid ${C.green4}`,
    gap: "0",
    flexWrap: "wrap",
  };
  const tabStyle = (t: Tab): CSSProperties => ({
    padding: "4px 16px",
    border: `1px solid ${C.green4}`,
    borderBottom: "none",
    cursor: "pointer",
    color: activeTab === t ? C.green : C.dim,
    background: activeTab === t ? `${C.green4}88` : "transparent",
    marginRight: "2px",
    userSelect: "none",
    transition: "all 0.15s",
    fontFamily: "inherit",
    fontSize: "inherit",
  });

  const panelBase: CSSProperties = {
    border: `1px solid ${C.green4}`,
    borderTop: "none",
    padding: "10px 12px",
    background: `${C.green5}88`,
    minHeight: "220px",
    maxHeight: "280px",
    overflowY: "auto",
  };

  /* — Progress bar section — */
  const progressBlock: CSSProperties = {
    border: `1px solid ${C.green4}`,
    padding: "8px 12px",
    background: `${C.green5}88`,
  };

  return (
    <div style={outer}>
      {/* ─── Top row: status banner + info tiles ─── */}
      <div style={topRow}>
        {/* Status code banner */}
        <div style={bannerBox} className="pulse-border">
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
            <span className="am" style={{ fontFamily: "'VT323', monospace", fontSize: "clamp(28px,5vw,42px)", color: C.amber, lineHeight: 1 }}>
              503
            </span>
            <div>
              <div className="am" style={{ color: C.amber, fontWeight: "bold" }}>SERVICE UNAVAILABLE</div>
              <div style={{ color: C.dim, fontSize: "0.85em" }}>HTTP/1.1 — Maintenance Mode Active</div>
            </div>
          </div>
          <div style={{ borderTop: `1px solid ${C.amber}44`, paddingTop: "6px" }}>
            <div style={{ color: C.green2, marginBottom: "2px" }}>
              ▸ <span style={{ color: C.green }}>portfolio.dev</span> is currently being upgraded.
            </div>
            <div style={{ color: C.dim }}>
              ▸ Estimated completion: <span className="blink" style={{ color: C.green }}>calculating...</span>
            </div>
            <div style={{ color: C.dim, marginTop: "4px" }}>
              ▸ All data is safe. Services will resume automatically.
            </div>
          </div>
        </div>

        {/* Info tiles */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: "1 1 260px" }}>
          <div style={tilesRow}>
            {tile("STATUS CODE", "503", "am", "#100800")}
            {tile("UPTIME", formatUptime(uptime), "g", C.green5)}
            {tile("VERSION", "v2.1.0", "g", C.green5)}
          </div>
          <div style={tilesRow}>
            {tile("POST WARNINGS", `${checks.filter(c => c.final === "warning").length} / ${checks.length}`, "am", "#100800")}
            {tile("POST ERRORS", `${checks.filter(c => c.final === "error").length} / ${checks.length}`, checks.some(c => c.final === "error") ? "re" : "g", C.green5)}
            {tile("LOG EVENTS", String(logs.length), "g", C.green5)}
          </div>
        </div>
      </div>

      {/* ─── Marquee ticker ─── */}
      <div style={{ overflow: "hidden", border: `1px solid ${C.green4}`, padding: "3px 0", background: C.green5, fontSize: "0.85em", color: C.green3 }}>
        <div className="marquee-inner">
          &nbsp;&nbsp;&nbsp;
          ▸ MAINTENANCE MODE ACTIVE &nbsp;|&nbsp; 503 SERVICE UNAVAILABLE &nbsp;|&nbsp;
          portfolio.dev is being upgraded &nbsp;|&nbsp; Please check back soon &nbsp;|&nbsp;
          All user data is safe and preserved &nbsp;|&nbsp; Next.js v2.1.0 deployment in progress &nbsp;|&nbsp;
          BUILD STATUS: IN PROGRESS &nbsp;|&nbsp; HEALTH CHECK: PENDING &nbsp;|&nbsp;
          ▸ MAINTENANCE MODE ACTIVE &nbsp;|&nbsp; 503 SERVICE UNAVAILABLE &nbsp;|&nbsp;
          portfolio.dev is being upgraded &nbsp;|&nbsp; Please check back soon &nbsp;|&nbsp;
          All user data is safe and preserved &nbsp;|&nbsp; Next.js v2.1.0 deployment in progress &nbsp;|&nbsp;
          BUILD STATUS: IN PROGRESS &nbsp;|&nbsp; HEALTH CHECK: PENDING &nbsp;&nbsp;&nbsp;
        </div>
      </div>

      {/* ─── Progress ─── */}
      <div style={progressBlock}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px", flexWrap: "wrap", gap: "4px" }}>
          <span style={{ color: C.green2 }}>Upgrade Progress</span>
          <span className="am" style={{ color: C.amber }}>
            ⚠ Build cache invalidated — rebuild required
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
          <span className="g" style={{ color: C.green, fontFamily: "'VT323', monospace", fontSize: "clamp(13px, 1.8vw, 15px)", letterSpacing: "0.05em", flex: 1, minWidth: "200px" }}>
            [{pbar(progress)}]
          </span>
          <span className="g" style={{ color: C.green, minWidth: "46px", textAlign: "right" }}>
            {progress.toFixed(1)}%
          </span>
          <span style={{ color: C.dim }}>STALLED</span>
          <span className="blink" style={{ color: C.amber }}>▌</span>
        </div>
        {/* Sub-tasks */}
        <div style={{ display: "flex", gap: "6px", marginTop: "6px", flexWrap: "wrap", fontSize: "0.82em" }}>
          {[
            { label: "Migrations",   done: true  },
            { label: "Asset build",  done: true  },
            { label: "Tests",        done: false },
            { label: "Health check", done: false },
            { label: "DNS switch",   done: false },
          ].map(t => (
            <span key={t.label} style={{ color: t.done ? C.green : C.dim, padding: "1px 6px", border: `1px solid ${t.done ? C.green4 : C.green4 + "66"}` }}>
              {t.done ? "✓" : "○"} {t.label}
            </span>
          ))}
        </div>
      </div>

      {/* ─── Tabbed panel ─── */}
      <div>
        <div style={tabBar}>
          {(["status", "log", "help"] as Tab[]).map(t => (
            <button key={t} style={tabStyle(t)} onClick={() => setActiveTab(t)}>
              {t === "status" ? "[F2] SYSTEM STATUS" : t === "log" ? "[F3] ACTIVITY LOG" : "[F1] HELP"}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "status" && (
            <motion.div key="status" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={panelBase}>
              <div style={{ color: C.dim, marginBottom: "6px", fontSize: "0.85em" }}>
                POST HARDWARE DIAGNOSTIC RESULTS
              </div>
              {checks.map(c => (
                <div key={c.id} style={{ display: "flex", gap: "4px", padding: "2px 0", borderBottom: `1px solid ${C.green4}22`, flexWrap: "wrap" }}>
                  <span style={{ color: statusColor[c.final], minWidth: "80px" }}>{statusTag[c.final]}</span>
                  <span style={{ color: C.green2, minWidth: "150px" }}>{c.label}</span>
                  <span style={{ color: c.final === "warning" ? C.amber : C.green, flex: 1, fontSize: "0.9em" }}>{c.value}</span>
                </div>
              ))}
              <div style={{ marginTop: "10px", color: C.dim, fontSize: "0.82em" }}>
                ▸ {checks.filter(c => c.final === "ok").length} passed  ▸ {checks.filter(c => c.final === "warning").length} warnings  ▸ {checks.filter(c => c.final === "error").length} errors
              </div>
            </motion.div>
          )}

          {activeTab === "log" && (
            <motion.div key="log" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={panelBase}>
              <div style={{ color: C.dim, marginBottom: "6px", fontSize: "0.85em" }}>
                MAINTENANCE ACTIVITY LOG  [{logs.length} entries]
              </div>
              {logs.map((entry, i) => (
                <div key={i} className="fade-in" style={{ display: "flex", gap: "8px", marginBottom: "2px", fontSize: "0.88em" }}>
                  <span style={{ color: C.dim, minWidth: "56px" }}>[{String(i + 1).padStart(3, "0")}:{String(i * 7).padStart(2, "0")}]</span>
                  <span style={{ color: entry.type === "WARN" ? C.amber : entry.type === "ERR " ? C.red : C.blue, minWidth: "36px" }} className={entry.type === "WARN" ? "am" : entry.type === "ERR " ? "re" : "bl"}>
                    {entry.type}
                  </span>
                  <span style={{ color: C.green2 }}>{entry.msg}</span>
                </div>
              ))}
              {logs.length < MAINT_LOGS.length && (
                <div style={{ color: C.dim, marginTop: "4px" }}>
                  <span className="spin" style={{ color: C.blue }}>◌</span>  waiting for next event...
                </div>
              )}
              <div ref={logsEndRef} />
            </motion.div>
          )}

          {activeTab === "help" && (
            <motion.div key="help" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={panelBase}>
              <div style={{ color: C.dim, marginBottom: "10px", fontSize: "0.85em" }}>BIOS MAINTENANCE REFERENCE</div>
              {[
                ["What is this?",      "Your portfolio website is undergoing a scheduled upgrade. During this time all public-facing routes return HTTP 503."],
                ["How long?",          "Deployments typically complete within 5–20 minutes. If this page persists beyond 30 min, the upgrade may have stalled."],
                ["Is data safe?",      "Yes. Maintenance mode is read-only. No user data is modified during this phase."],
                ["Status codes",       "503 → Service unavailable. 307 → Temporary redirect to /maintenance. 200 → Normal operation restored."],
                ["What happens next?", "Once health checks pass, the DNS record will switch and this page will automatically redirect to the live site."],
              ].map(([q, a]) => (
                <div key={q} style={{ marginBottom: "10px" }}>
                  <div className="g" style={{ color: C.green }}>▸ {q}</div>
                  <div style={{ color: C.dim, paddingLeft: "12px", fontSize: "0.9em", marginTop: "2px" }}>{a}</div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   BIOS FOOTER
══════════════════════════════════════════════════════════════ */

interface FooterProps {
  phase:        Phase;
  activeTab:    Tab;
  setActiveTab: Dispatch<SetStateAction<Tab>>;
}

function BiosFooter({ phase, activeTab, setActiveTab }: FooterProps) {
  const bar: CSSProperties = {
    marginTop: "6px",
    display: "flex",
    gap: "6px",
    alignItems: "center",
    padding: "4px 10px",
    border: `1px solid ${C.green4}`,
    background: C.green5,
    flexWrap: "wrap",
  };
  const sep = <span style={{ color: C.green4, margin: "0 2px" }}>│</span>;

  const Fkey = ({ label, action, tab }: { label: string; action?: () => void; tab?: Tab }) => (
    <button
      className={`btn-fkey${tab && activeTab === tab ? " active" : ""}`}
      onClick={action ?? (tab ? () => setActiveTab(tab) : undefined)}
    >
      {label}
    </button>
  );

  return (
    <div style={bar}>
      <Fkey label="F1 Help" tab="help" />
      <Fkey label="F2 Status" tab="status" />
      <Fkey label="F3 Log" tab="log" />
      {sep}
      <span style={{ color: C.dim, fontSize: "0.85em" }}>
        PHASE: <span style={{ color: C.green }}>{phase.toUpperCase()}</span>
      </span>
      {sep}
      <span style={{ color: C.dim, fontSize: "0.85em" }}>
        REV: <span style={{ color: C.green }}>3.7.2-MAINT-20240530</span>
      </span>
      {sep}
      <span style={{ color: C.amber, fontSize: "0.85em" }} className="am">
        ⚠ MAINTENANCE MODE
      </span>
      <span style={{ marginLeft: "auto", color: C.dim, fontSize: "0.82em" }}>
        ESC = suspend  │  DEL = setup  │  F12 = boot menu
      </span>
    </div>
  );
}

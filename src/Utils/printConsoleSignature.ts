// export function printConsoleSignature(): void {
//   if (typeof window === "undefined") return;
//   if ((window as any).__consoleSignaturePrinted) return;
//   (window as any).__consoleSignaturePrinted = true;

//   const info = {
//     name: "I am Shriharsh Nandigamwar",
//     title: "Fullstack Developer",
//     email: "nandigamwarharsh@gmail.com",
//     linkedin: "https://linkedin.com/in/shriharsh-nandigamwar",
//     github: "https://github.com/HarshNandigamwar",
//     twitter: "https://x.com/Harsh477011?s=09",
//     note: "Thanks for visiting my portfolio! ✨",
//   };

//   const headerStyle = [
//     "font-size:16px",
//     "font-weight:700",
//     "padding:8px 14px",
//     "border-radius:8px",
//     "color:white",
//     "background:linear-gradient(90deg,#06b6d4 0%,#3b82f6 50%,#a855f7 100%)",
//     "text-shadow:0 1px 2px rgba(0,0,0,0.2)",
//   ].join(";");

//   const subStyle = [
//     "font-size:12px",
//     "font-weight:600",
//     "padding:6px 10px",
//     "border-radius:6px",
//     "color:#111827",
//     "background:#f3f4f6",
//   ].join(";");

//   const label = "font-weight:700; font-size:12px; padding:0 6px;";
//   const value = "color:#9ca3af; font-size:12px;";
//   const sep = "%c─────────────────────────────────────────────";
//   const sepStyle = "color:#ff0000;";

//   console.log("%c👋 Hello, curious developer", headerStyle);
//   console.log("%c%s", subStyle, `${info.name} · ${info.title}`);
//   console.log(sep, sepStyle);

//   console.log("%cEmail:   %c %s", label, value, info.email);
//   console.log("%cGitHub:  %c %s", label, value, info.github);
//   console.log("%cTwitter:  %c %s", label, value, info.twitter);
//   console.log("%cLinkedin:  %c %s", label, value, info.linkedin);

//   console.log(sep, sepStyle);
//   console.log(
//     "%c%s",
//     "font-size:12px; color:#10b981; font-weight:600;",
//     info.note
//   );
// }



export function printConsoleSignature(): void {
  if (typeof window === "undefined") return;
  if ((window as any).__consoleSignaturePrinted) return;
  (window as any).__consoleSignaturePrinted = true;

  const brandColor = "#10b981"; // Emerald-500
  const secondaryColor = "#06b6d4"; // Cyan-500
  
  const styles = {
    header: [
      `background: linear-gradient(135deg, ${brandColor} 0%, ${secondaryColor} 100%)`,
      "color: #fff",
      "padding: 12px 20px",
      "font-family: 'Inter', sans-serif",
      "font-size: 18px",
      "font-weight: bold",
      "border-radius: 12px 12px 0 0",
      "text-shadow: 0 2px 4px rgba(0,0,0,0.2)",
    ].join(";"),
    
    subHeader: [
      "background: #111827",
      "color: #10b981",
      "padding: 8px 20px",
      "font-family: monospace",
      "font-size: 12px",
      "border-left: 2px solid #10b981",
      "border-right: 2px solid #10b981",
    ].join(";"),

    infoBox: [
      "background: #111827",
      "color: #9ca3af",
      "padding: 10px 20px",
      "font-size: 11px",
      "line-height: 1.6",
      "border-left: 2px solid #10b981",
      "border-right: 2px solid #10b981",
    ].join(";"),

    footer: [
      "background: #111827",
      "color: #ec4899", // Pink for the emoji/sparkle
      "padding: 12px 20px",
      "font-size: 12px",
      "font-weight: bold",
      "border-radius: 0 0 12px 12px",
      "border-bottom: 3px solid #10b981",
      "border-left: 2px solid #10b981",
      "border-right: 2px solid #10b981",
    ].join(";"),
  };

      const ascii = `
   _____ __  ______  ____ _  __  _____    ____  _____ __  __
  / ___// / / / __ \\/  _// / / / /   |  / __ \\/ ___// / / /
  \\__ \\/ /_/ / /_/ // / / /_/ / / /| | / /_/ /\\__ \\/ /_/ / 
 ___/ / __  / _, _// / / __  / / ___ |/ _, _/___/ / __  /  
/____/_/ /_/_/ |_/___/ /_/ /_//_/  |_/_/ |_|/____/_/ /_/   
  `;



  console.log(`%c${ascii}`, "color: #10b981; font-weight: 900; line-height: 1;");
  
  console.log("%c🚀 WELCOME TO MY PORTFOLIO", styles.header);
  
  console.log(
    "%c> SYSTEM INITIALIZED: SHRIHARSH NANDIGAMWAR", 
    "color: #111827; background: #10b981; font-weight: bold; padding: 4px 10px; border-radius: 4px;"
  );

  console.log(
    "%c" +
    "📧 Email:    nandigamwarharsh@gmail.com\n" +
    "💻 GitHub:   https://github.com/HarshNandigamwar\n" +
    "🔗 LinkedIn: https://linkedin.com/in/shriharsh-nandigamwar\n" +
    "🐦 Twitter:  https://x.com/Harsh477011",
    styles.infoBox
  );

  console.log("%cThanks for visiting my portfolio! ✨ Let's build something epic!", styles.footer);
}

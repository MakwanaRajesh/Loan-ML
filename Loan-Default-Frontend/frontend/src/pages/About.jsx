import Navbar from "../components/Navbar";
const F  = "'Plus Jakarta Sans', sans-serif";
const FH = "'Space Grotesk', sans-serif";

const PageWrapper = ({ children }) => (
  <div style={{ width:"100%", minHeight:"100vh", background:"linear-gradient(135deg, #07070f 0%, #0c0c1e 60%, #0e1525 100%)", color:"#fff", fontFamily:F }}>
    <div style={{ position:"fixed", top:"-10%", left:"-5%", width:"50vw", height:"50vw", maxWidth:700,
      background:"radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 68%)",
      borderRadius:"50%", pointerEvents:"none" }} />
    <div style={{ position:"fixed", bottom:"-10%", right:"-5%", width:"40vw", height:"40vw", maxWidth:550,
      background:"radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 68%)",
      borderRadius:"50%", pointerEvents:"none" }} />
    {children}
  </div>
);

const SectionCard = ({ children, style={} }) => (
  <div style={{
    background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)",
    borderRadius:20, padding:"32px 36px", ...style
  }}>{children}</div>
);

export default function About({ nav, user, logout }) {
  const tech = [
    { name:"React 18",       desc:"Modern component-based UI framework", color:"#61dafb" },
    { name:"Python Flask",   desc:"Lightweight REST API backend",         color:"#4ade80" },
    { name:"Scikit-learn",   desc:"ML model training & prediction",       color:"#f59e0b" },
    { name:"JWT Auth",       desc:"Secure stateless authentication",      color:"#818cf8" },
    { name:"SQLite",         desc:"Lightweight local database",           color:"#60a5fa" },
    { name:"Vite",           desc:"Lightning fast build tool",            color:"#fbbf24" },
  ];

  const team = [
    { name:"Rajesh Makwana", role:"Full Stack Developer & ML Engineer", avatar:"R",
      desc:"Built LoanPredict from scratch — backend, frontend, ML pipeline, and deployment.",
      links:[
        { label:"Instagram", url:"https://instagram.com/rajesh_1oo3", color:"#e1306c" },
        { label:"LinkedIn",  url:"https://www.linkedin.com/in/rajesh-makwana-397913328", color:"#0077b5" },
      ]
    },
  ];

  return (
    <PageWrapper>
      <Navbar nav={nav} user={user} logout={logout} current="about" />
      <div style={{ maxWidth:960, margin:"0 auto", padding:"60px clamp(20px,5vw,40px) 80px", position:"relative", zIndex:5 }}>

        {/* Header */}
        <div style={{ textAlign:"center", marginBottom:64 }}>
          <div style={{
            display:"inline-flex", alignItems:"center", gap:8,
            background:"rgba(99,102,241,0.12)", border:"1px solid rgba(99,102,241,0.28)",
            borderRadius:50, padding:"6px 18px", marginBottom:24,
            fontSize:13, fontWeight:600, color:"#818cf8", fontFamily:FH,
          }}>📖 About LoanPredict</div>
          <h1 style={{ fontSize:"clamp(32px,5vw,52px)", fontWeight:800, letterSpacing:"-2px", marginBottom:16, fontFamily:FH,
            background:"linear-gradient(135deg, #fff 0%, #a5b4fc 50%, #34d399 100%)",
            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
          }}>
            AI-Powered Loan Risk<br />Analysis Platform
          </h1>
          <p style={{ fontSize:"clamp(14px,1.5vw,17px)", color:"rgba(255,255,255,0.5)", maxWidth:560, margin:"0 auto", lineHeight:1.78 }}>
            LoanPredict uses state-of-the-art machine learning to analyze 16 financial indicators
            and give you an instant loan risk verdict — empowering smarter financial decisions.
          </p>
        </div>

        {/* Mission */}
        <SectionCard style={{ marginBottom:28, borderLeft:"3px solid #6366f1" }}>
          <div style={{ display:"flex", gap:20, alignItems:"flex-start", flexWrap:"wrap" }}>
            <div style={{ fontSize:40 }}>🎯</div>
            <div style={{ flex:1, minWidth:200 }}>
              <h2 style={{ fontSize:22, fontWeight:700, fontFamily:FH, marginBottom:10, color:"#fff" }}>Our Mission</h2>
              <p style={{ color:"rgba(255,255,255,0.55)", lineHeight:1.8, fontSize:15 }}>
                Financial decisions shouldn't be guesswork. LoanPredict democratizes access to ML-powered
                loan risk assessment — the same technology used by banks and financial institutions —
                making it free and accessible to everyone. We believe transparency in financial tools
                leads to better outcomes for individuals and the broader economy.
              </p>
            </div>
          </div>
        </SectionCard>

        {/* How the Model Works */}
        <SectionCard style={{ marginBottom:28 }}>
          <h2 style={{ fontSize:22, fontWeight:700, fontFamily:FH, marginBottom:20, color:"#fff" }}>🧠 How the ML Model Works</h2>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))", gap:16 }}>
            {[
              { step:"Data Input", desc:"16 financial features collected from the user form", icon:"📝" },
              { step:"Preprocessing", desc:"Data normalized and encoded for ML compatibility", icon:"⚙️" },
              { step:"Prediction", desc:"Gradient Boosting model evaluates risk probability", icon:"🤖" },
              { step:"Result", desc:"Safe or Risk verdict with instant visual feedback", icon:"✅" },
            ].map(s => (
              <div key={s.step} style={{
                background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.06)",
                borderRadius:14, padding:"20px 18px", textAlign:"center",
              }}>
                <div style={{ fontSize:28, marginBottom:10 }}>{s.icon}</div>
                <div style={{ fontSize:14, fontWeight:700, fontFamily:FH, color:"#a5b4fc", marginBottom:6 }}>{s.step}</div>
                <div style={{ fontSize:13, color:"rgba(255,255,255,0.42)", lineHeight:1.65 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Tech Stack */}
        <SectionCard style={{ marginBottom:28 }}>
          <h2 style={{ fontSize:22, fontWeight:700, fontFamily:FH, marginBottom:20, color:"#fff" }}>🛠 Tech Stack</h2>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(180px, 1fr))", gap:14 }}>
            {tech.map(t => (
              <div key={t.name} style={{
                display:"flex", alignItems:"center", gap:12,
                background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.06)",
                borderRadius:12, padding:"14px 16px",
              }}>
                <div style={{ width:8, height:8, borderRadius:"50%", background:t.color, flexShrink:0 }} />
                <div>
                  <div style={{ fontSize:14, fontWeight:700, color:t.color, fontFamily:FH }}>{t.name}</div>
                  <div style={{ fontSize:12, color:"rgba(255,255,255,0.38)", marginTop:2 }}>{t.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Team */}
        <SectionCard>
          <h2 style={{ fontSize:22, fontWeight:700, fontFamily:FH, marginBottom:20, color:"#fff" }}>👨‍💻 The Builder</h2>
          {team.map(m => (
            <div key={m.name} style={{
              display:"flex", gap:20, alignItems:"flex-start", flexWrap:"wrap",
            }}>
              <div style={{
                width:64, height:64, borderRadius:"50%", flexShrink:0,
                background:"linear-gradient(135deg, #6366f1, #10b981)",
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:26, fontWeight:800, color:"#fff",
              }}>{m.avatar}</div>
              <div style={{ flex:1, minWidth:220 }}>
                <div style={{ fontSize:18, fontWeight:700, fontFamily:FH, color:"#fff", marginBottom:4 }}>{m.name}</div>
                <div style={{ fontSize:13, color:"#818cf8", marginBottom:10, fontFamily:FH }}>{m.role}</div>
                <p style={{ fontSize:14, color:"rgba(255,255,255,0.5)", lineHeight:1.72, marginBottom:14 }}>{m.desc}</p>
                <div style={{ display:"flex", gap:10 }}>
                  {m.links.map(l => (
                    <a key={l.label} href={l.url} target="_blank" rel="noreferrer" style={{
                      color:l.color, fontSize:13, fontWeight:600,
                      textDecoration:"none", fontFamily:FH,
                      background:"rgba(255,255,255,0.05)", border:`1px solid ${l.color}33`,
                      padding:"5px 14px", borderRadius:8, transition:"all 0.2s",
                    }}
                      onMouseEnter={e=>e.currentTarget.style.background=`${l.color}22`}
                      onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.05)"}
                    >{l.label}</a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </SectionCard>

      </div>
    </PageWrapper>
  );
}

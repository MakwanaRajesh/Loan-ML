const F  = "'Plus Jakarta Sans', sans-serif";
const FH = "'Space Grotesk', sans-serif";

export default function Landing({ nav }) {
  return (
    <div style={{
      width: "100%", minHeight: "100vh",
      background: "linear-gradient(135deg, #07070f 0%, #0c0c1e 60%, #0e1525 100%)",
      color: "#fff", fontFamily: F, overflowX: "hidden",
    }}>
      {/* Orbs */}
      <div style={{ position:"fixed", top:"-10%", left:"-5%", width:"50vw", height:"50vw", maxWidth:700,
        background:"radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 68%)",
        borderRadius:"50%", pointerEvents:"none", animation:"orb1 9s ease-in-out infinite" }} />
      <div style={{ position:"fixed", bottom:"-15%", right:"-5%", width:"45vw", height:"45vw", maxWidth:600,
        background:"radial-gradient(circle, rgba(16,185,129,0.09) 0%, transparent 68%)",
        borderRadius:"50%", pointerEvents:"none", animation:"orb2 11s ease-in-out infinite" }} />

      {/* Navbar */}
      <nav style={{
        display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:"18px clamp(20px, 5vw, 60px)",
        borderBottom:"1px solid rgba(255,255,255,0.05)",
        position:"relative", zIndex:10,
      }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{
            width:36, height:36, background:"linear-gradient(135deg, #6366f1, #10b981)",
            borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:18, fontWeight:800, color:"#fff", boxShadow:"0 4px 16px rgba(99,102,241,0.4)",
          }}>L</div>
          <span style={{ fontSize:20, fontWeight:700, letterSpacing:"-0.4px", fontFamily:FH }}>LoanPredict</span>
        </div>
        <div style={{ display:"flex", gap:8 }}>
          {[{label:"About",page:"about"},{label:"Help",page:"help"},{label:"Contact",page:"contact"}].map(n=>(
            <button key={n.page} onClick={()=>nav(n.page)} style={{
              background:"transparent", border:"none", color:"rgba(255,255,255,0.5)",
              padding:"6px 12px", borderRadius:8, cursor:"pointer", fontSize:13,
              fontWeight:500, fontFamily:FH, transition:"color 0.15s",
            }}
              onMouseEnter={e=>e.currentTarget.style.color="#fff"}
              onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.5)"}
            >{n.label}</button>
          ))}
          <div style={{width:1, background:"rgba(255,255,255,0.1)", margin:"0 4px"}} />
          <button onClick={()=>nav("login")} style={{
            background:"transparent", border:"1px solid rgba(255,255,255,0.18)",
            color:"#fff", padding:"8px 22px", borderRadius:50, cursor:"pointer",
            fontSize:13, fontWeight:600, fontFamily:FH, transition:"all 0.2s",
          }}
            onMouseEnter={e=>e.currentTarget.style.borderColor="#6366f1"}
            onMouseLeave={e=>e.currentTarget.style.borderColor="rgba(255,255,255,0.18)"}
          >Sign In</button>
          <button onClick={()=>nav("register")} style={{
            background:"linear-gradient(135deg, #6366f1, #8b5cf6)", border:"none",
            color:"#fff", padding:"8px 22px", borderRadius:50, cursor:"pointer",
            fontSize:13, fontWeight:700, fontFamily:FH,
            boxShadow:"0 4px 22px rgba(99,102,241,0.42)", transition:"all 0.2s",
          }}
            onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-1px)";e.currentTarget.style.boxShadow="0 8px 28px rgba(99,102,241,0.55)";}}
            onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 4px 22px rgba(99,102,241,0.42)";}}
          >Get Started →</button>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ textAlign:"center", padding:"clamp(60px,10vh,120px) clamp(20px,5vw,60px) clamp(50px,7vh,80px)", position:"relative", zIndex:5 }}>
        <div style={{
          display:"inline-flex", alignItems:"center", gap:8,
          background:"rgba(99,102,241,0.12)", border:"1px solid rgba(99,102,241,0.28)",
          borderRadius:50, padding:"6px 18px", marginBottom:28,
          fontSize:13, fontWeight:600, color:"#818cf8", backdropFilter:"blur(10px)",
          fontFamily:FH,
        }}>
          <span style={{ width:7, height:7, borderRadius:"50%", background:"#10b981",
            display:"inline-block", animation:"pulse 2s infinite" }} />
          AI-Powered · ML Loan Risk Analysis
        </div>

        <h1 style={{
          fontSize:"clamp(36px, 7vw, 84px)", fontWeight:800, lineHeight:1.06,
          letterSpacing:"-2px", margin:"0 0 20px",
          background:"linear-gradient(135deg, #fff 0%, #a5b4fc 45%, #34d399 100%)",
          WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
          fontFamily:FH,
        }}>
          Predict Loan Risk<br />Instantly with AI
        </h1>

        <p style={{
          fontSize:"clamp(15px, 2vw, 19px)", color:"rgba(255,255,255,0.48)", maxWidth:530,
          margin:"0 auto 44px", lineHeight:1.78, fontFamily:F,
        }}>
          Enter your financial details and our trained ML model analyzes
          16 key factors to instantly classify your loan as <strong style={{color:"#34d399"}}>Safe</strong> or <strong style={{color:"#f87171"}}>Risk</strong>.
        </p>

        <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
          <button onClick={()=>nav("register")} style={{
            background:"linear-gradient(135deg, #6366f1, #10b981)", border:"none",
            color:"#fff", padding:"14px 38px", borderRadius:50, cursor:"pointer",
            fontSize:"clamp(14px,1.5vw,16px)", fontWeight:800, fontFamily:FH,
            boxShadow:"0 8px 42px rgba(99,102,241,0.48)", letterSpacing:"0.3px", transition:"all 0.25s",
          }}
            onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 12px 52px rgba(99,102,241,0.6)";}}
            onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 8px 42px rgba(99,102,241,0.48)";}}
          >Start Free Analysis →</button>
          <button onClick={()=>nav("login")} style={{
            background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.12)",
            color:"#fff", padding:"14px 38px", borderRadius:50, cursor:"pointer",
            fontSize:"clamp(14px,1.5vw,16px)", fontWeight:600, fontFamily:FH,
            backdropFilter:"blur(10px)", transition:"all 0.25s",
          }}
            onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.09)"}
            onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.05)"}
          >Sign In</button>
        </div>
      </section>

      {/* Stats */}
      <section style={{
        display:"flex", justifyContent:"center", gap:"clamp(32px,5vw,72px)", padding:"44px clamp(20px,5vw,40px)",
        flexWrap:"wrap", position:"relative", zIndex:5,
        borderTop:"1px solid rgba(255,255,255,0.05)", borderBottom:"1px solid rgba(255,255,255,0.05)",
        background:"rgba(255,255,255,0.015)",
      }}>
        {[
          { num:"16+",  label:"Risk Factors Analyzed" },
          { num:"<1s",  label:"Prediction Speed" },
          { num:"100%", label:"Saved to History" },
          { num:"Free", label:"Always Free to Use" },
        ].map((s) => (
          <div key={s.label} style={{ textAlign:"center" }}>
            <div style={{
              fontSize:"clamp(28px,4vw,40px)", fontWeight:800, letterSpacing:"-1px",
              background:"linear-gradient(135deg, #a5b4fc, #34d399)",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", fontFamily:FH,
            }}>{s.num}</div>
            <div style={{ fontSize:12, color:"rgba(255,255,255,0.38)", marginTop:4, fontFamily:F }}>{s.label}</div>
          </div>
        ))}
      </section>

      {/* Feature Cards */}
      <section style={{
        display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(240px, 1fr))",
        gap:20, maxWidth:1080, margin:"0 auto", padding:"60px clamp(20px,5vw,40px)",
        position:"relative", zIndex:5,
      }}>
        {[
          { icon:"🧠", title:"ML Powered Model",   color:"#818cf8", desc:"Gradient boosting trained on thousands of real loan applications for maximum accuracy." },
          { icon:"📊", title:"Full History",        color:"#34d399", desc:"Every prediction saved automatically. Filter, analyze trends, and delete records anytime." },
          { icon:"🔐", title:"Secure Auth",         color:"#f59e0b", desc:"JWT authentication with bcrypt-hashed passwords. Your data is private and encrypted." },
          { icon:"⚡", title:"Instant Results",     color:"#f87171", desc:"Get Safe or Risk classification in under a second with a smooth result animation." },
        ].map((f) => (
          <div key={f.title} style={{
            background:"rgba(255,255,255,0.025)", border:"1px solid rgba(255,255,255,0.07)",
            borderRadius:20, padding:"28px 24px", transition:"all 0.28s", cursor:"default",
          }}
            onMouseEnter={e=>{e.currentTarget.style.background="rgba(99,102,241,0.07)";e.currentTarget.style.borderColor="rgba(99,102,241,0.25)";e.currentTarget.style.transform="translateY(-5px)";}}
            onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.025)";e.currentTarget.style.borderColor="rgba(255,255,255,0.07)";e.currentTarget.style.transform="translateY(0)";}}
          >
            <div style={{ fontSize:34, marginBottom:14 }}>{f.icon}</div>
            <div style={{ fontSize:16, fontWeight:700, marginBottom:8, color:f.color, fontFamily:FH }}>{f.title}</div>
            <div style={{ fontSize:14, color:"rgba(255,255,255,0.45)", lineHeight:1.72, fontFamily:F }}>{f.desc}</div>
          </div>
        ))}
      </section>

      {/* How it works */}
      <section style={{
        background:"rgba(255,255,255,0.015)", borderTop:"1px solid rgba(255,255,255,0.05)",
        borderBottom:"1px solid rgba(255,255,255,0.05)", padding:"60px clamp(20px,5vw,40px)",
        position:"relative", zIndex:5, textAlign:"center",
      }}>
        <h2 style={{ fontSize:"clamp(24px,4vw,34px)", fontWeight:800, letterSpacing:"-1px", marginBottom:48, fontFamily:FH }}>How It Works</h2>
        <div style={{ display:"flex", justifyContent:"center", gap:0, flexWrap:"wrap", maxWidth:840, margin:"0 auto" }}>
          {[
            { step:"01", title:"Create Account", desc:"Sign up free in seconds" },
            { step:"02", title:"Enter Details",   desc:"Fill in your financial info" },
            { step:"03", title:"Get Result",      desc:"Instant Safe or Risk verdict" },
            { step:"04", title:"Track History",   desc:"View all past predictions" },
          ].map((h, i) => (
            <div key={h.step} style={{ flex:"1 1 180px", padding:"0 20px", position:"relative" }}>
              {i < 3 && <div style={{
                position:"absolute", right:0, top:22, width:"50%",
                height:1, background:"rgba(99,102,241,0.25)",
              }} />}
              <div style={{
                width:46, height:46, borderRadius:"50%",
                background:"linear-gradient(135deg, rgba(99,102,241,0.25), rgba(16,185,129,0.25))",
                border:"1px solid rgba(99,102,241,0.4)",
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:13, fontWeight:700, color:"#818cf8",
                margin:"0 auto 14px", fontFamily:FH,
              }}>{h.step}</div>
              <div style={{ fontSize:15, fontWeight:700, marginBottom:6, fontFamily:FH }}>{h.title}</div>
              <div style={{ fontSize:13, color:"rgba(255,255,255,0.38)", fontFamily:F }}>{h.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ textAlign:"center", padding:"80px clamp(20px,5vw,40px)", position:"relative", zIndex:5 }}>
        <h2 style={{ fontSize:"clamp(22px,3.5vw,36px)", fontWeight:800, letterSpacing:"-1px", marginBottom:14, fontFamily:FH }}>
          Ready to predict your loan risk?
        </h2>
        <p style={{ color:"rgba(255,255,255,0.42)", marginBottom:34, fontFamily:F, fontSize:"clamp(14px,1.5vw,16px)" }}>
          Free forever. No credit card needed.
        </p>
        <button onClick={()=>nav("register")} style={{
          background:"linear-gradient(135deg, #6366f1, #10b981)", border:"none",
          color:"#fff", padding:"15px 44px", borderRadius:50, cursor:"pointer",
          fontSize:"clamp(14px,1.5vw,17px)", fontWeight:800, fontFamily:FH,
          boxShadow:"0 8px 42px rgba(99,102,241,0.48)", letterSpacing:"0.3px",
        }}>Get Started for Free →</button>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop:"1px solid rgba(255,255,255,0.06)", padding:"24px clamp(20px,5vw,60px)",
        display:"flex", justifyContent:"space-between", alignItems:"center",
        flexWrap:"wrap", gap:16, position:"relative", zIndex:5,
        color:"rgba(255,255,255,0.28)", fontSize:13, fontFamily:F,
      }}>
        <div style={{display:"flex",gap:20,alignItems:"center"}}>
          <span>Built by <strong style={{color:"rgba(255,255,255,0.55)"}}>Hurii</strong> · LoanPredict © {new Date().getFullYear()}</span>
          <div style={{display:"flex",gap:14}}>
            {[{l:"About",p:"about"},{l:"Help",p:"help"},{l:"Contact",p:"contact"}].map(n=>(
              <button key={n.p} onClick={()=>nav(n.p)} style={{
                background:"none", border:"none", color:"rgba(255,255,255,0.35)",
                fontSize:13, cursor:"pointer", fontFamily:F, transition:"color 0.2s",
              }}
                onMouseEnter={e=>e.currentTarget.style.color="#818cf8"}
                onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.35)"}
              >{n.l}</button>
            ))}
          </div>
        </div>
        <div style={{ display:"flex", gap:18, alignItems:"center" }}>
          <a href="https://instagram.com/rajesh_1oo3" target="_blank" rel="noreferrer"
            style={{ color:"rgba(255,255,255,0.35)", textDecoration:"none", display:"flex", alignItems:"center", gap:6, transition:"color 0.2s" }}
            onMouseEnter={e=>e.currentTarget.style.color="#e1306c"}
            onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.35)"}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            @rajesh_1oo3
          </a>
          <a href="https://www.linkedin.com/in/rajesh-makwana-397913328" target="_blank" rel="noreferrer"
            style={{ color:"rgba(255,255,255,0.35)", textDecoration:"none", display:"flex", alignItems:"center", gap:6, transition:"color 0.2s" }}
            onMouseEnter={e=>e.currentTarget.style.color="#0077b5"}
            onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.35)"}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            LinkedIn
          </a>
        </div>
      </footer>

      <style>{`
        @keyframes orb1 { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-22px) scale(1.03)} }
        @keyframes orb2 { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(18px) scale(0.97)} }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.85)} }
      `}</style>
    </div>
  );
}

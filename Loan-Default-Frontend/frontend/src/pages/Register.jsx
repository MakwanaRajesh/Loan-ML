import { useState } from "react";

function focusIn(e)  { e.target.style.borderColor="#6366f1"; e.target.style.boxShadow="0 0 0 3px rgba(99,102,241,0.15)"; }
function focusOut(e) { e.target.style.borderColor="rgba(255,255,255,0.1)"; e.target.style.boxShadow="none"; }

const styles = {
  page:   { minHeight:"100vh", background:"linear-gradient(135deg, #08080c 0%, #0d0d18 100%)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Space Grotesk', sans-serif", padding:20, position:"relative" },
  orb1:   { position:"fixed", top:"-12%", right:"-8%", width:520, height:520, background:"radial-gradient(circle, rgba(16,185,129,0.10) 0%, transparent 70%)", borderRadius:"50%", pointerEvents:"none" },
  orb2:   { position:"fixed", bottom:"-15%", left:"-8%", width:440, height:440, background:"radial-gradient(circle, rgba(99,102,241,0.10) 0%, transparent 70%)", borderRadius:"50%", pointerEvents:"none" },
  card:   { background:"rgba(255,255,255,0.028)", border:"1px solid rgba(255,255,255,0.09)", borderRadius:26, padding:"48px 44px", width:"100%", maxWidth:440, backdropFilter:"blur(24px)", position:"relative", zIndex:5, boxShadow:"0 32px 80px rgba(0,0,0,0.6)" },
  logo:   { display:"flex", alignItems:"center", gap:10, marginBottom:34, justifyContent:"center" },
  logoBox:{ width:36, height:36, background:"linear-gradient(135deg, #6366f1, #10b981)", borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, fontWeight:900, color:"#fff" },
  h1:     { fontSize:28, fontWeight:900, color:"#fff", marginBottom:8, textAlign:"center", letterSpacing:"-0.5px" },
  sub:    { fontSize:14, color:"rgba(255,255,255,0.38)", textAlign:"center", marginBottom:32, fontFamily:"'Plus Jakarta Sans', sans-serif" },
  label:  { fontSize:12, fontWeight:700, color:"rgba(255,255,255,0.5)", marginBottom:7, display:"block", letterSpacing:"0.8px", textTransform:"uppercase" },
  input:  { width:"100%", padding:"12px 16px", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:12, color:"#fff", fontSize:15, fontFamily:"'Plus Jakarta Sans', sans-serif", outline:"none", transition:"border-color 0.2s, box-shadow 0.2s", marginBottom:20 },
  btn:    { width:"100%", padding:"14px", background:"linear-gradient(135deg, #6366f1, #8b5cf6)", border:"none", color:"#fff", borderRadius:12, fontSize:16, fontWeight:800, cursor:"pointer", fontFamily:"'Space Grotesk', sans-serif", boxShadow:"0 4px 22px rgba(99,102,241,0.42)", transition:"all 0.2s" },
  err:    { background:"rgba(239,68,68,0.09)", border:"1px solid rgba(239,68,68,0.3)", borderRadius:10, padding:"12px 16px", color:"#f87171", fontSize:13, marginBottom:20, fontFamily:"'Plus Jakarta Sans', sans-serif" },
  foot:   { textAlign:"center", marginTop:24, fontSize:14, color:"rgba(255,255,255,0.36)", fontFamily:"'Plus Jakarta Sans', sans-serif" },
  lnk:    { background:"none", border:"none", color:"#818cf8", cursor:"pointer", fontWeight:700, fontSize:14, fontFamily:"'Plus Jakarta Sans', sans-serif" },
  back:   { position:"fixed", top:24, left:28, background:"none", border:"none", color:"rgba(255,255,255,0.28)", cursor:"pointer", fontSize:13, fontFamily:"'Plus Jakarta Sans', sans-serif", zIndex:20 },
};

export default function Register({ nav, login }) {
  const [name,     setName]     = useState("");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  const submit = async () => {
    if (!name || !email || !password) { setError("Please fill in all fields"); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters"); return; }
    setLoading(true); setError("");
    try {
      const r = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || "Registration failed");
      login(d.token, d.user);
    } catch (e) { setError(e.message); }
    setLoading(false);
  };

  return (
    <div style={styles.page}>
      <div style={styles.orb1} /><div style={styles.orb2} />
      <button onClick={() => nav("landing")} style={styles.back}>← Home</button>

      <div style={styles.card}>
        <div style={styles.logo}>
          <div style={styles.logoBox}>L</div>
          <span style={{ fontSize:20, fontWeight:900, color:"#fff", letterSpacing:"-0.5px" }}>LoanPredict</span>
        </div>
        <h1 style={styles.h1}>Create Account</h1>
        <p style={styles.sub}>Start predicting loan risk for free</p>

        {error && <div style={styles.err}>{error}</div>}

        <label style={styles.label}>Full Name</label>
        <input value={name} onChange={e => setName(e.target.value)} type="text"
          placeholder="Your Full Name" style={styles.input}
          onFocus={focusIn} onBlur={focusOut}
        />

        <label style={styles.label}>Email</label>
        <input value={email} onChange={e => setEmail(e.target.value)} type="email"
          placeholder="you@email.com" style={styles.input}
          onFocus={focusIn} onBlur={focusOut}
        />

        <label style={styles.label}>Password</label>
        <input value={password} onChange={e => setPassword(e.target.value)} type="password"
          placeholder="Min 6 characters" style={{ ...styles.input, marginBottom:0 }}
          onFocus={focusIn} onBlur={focusOut}
          onKeyDown={e => e.key === "Enter" && submit()}
        />

        <button onClick={submit} disabled={loading} style={{ ...styles.btn, opacity:loading?0.65:1, marginTop:24 }}
          onMouseEnter={e => { if(!loading) { e.currentTarget.style.transform="translateY(-1px)"; e.currentTarget.style.boxShadow="0 8px 32px rgba(99,102,241,0.55)"; } }}
          onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 4px 22px rgba(99,102,241,0.42)"; }}
        >{loading ? "Creating account…" : "Create Account"}</button>

        <div style={styles.foot}>
          Already have an account?{" "}
          <button onClick={() => nav("login")} style={styles.lnk}>Sign in</button>
        </div>
      </div>

      <style>{`
        
        * { box-sizing:border-box; margin:0; padding:0; }
        body { background:#08080c; }
      `}</style>
    </div>
  );
}

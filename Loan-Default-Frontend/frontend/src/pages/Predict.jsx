import { useState } from "react";
import Navbar from "../components/Navbar";

const API = "http://localhost:5000";

function focusIn(e)  { e.target.style.borderColor="#6366f1"; e.target.style.boxShadow="0 0 0 3px rgba(99,102,241,0.13)"; }
function focusOut(e) { e.target.style.borderColor="rgba(255,255,255,0.1)"; e.target.style.boxShadow="none"; }

const inputBase = {
  width:"100%", padding:"12px 16px",
  background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)",
  borderRadius:12, color:"#fff", fontSize:15,
  fontFamily:"'Plus Jakarta Sans', sans-serif", outline:"none",
  transition:"border-color 0.2s, box-shadow 0.2s",
};
const selBase = {
  ...inputBase, cursor:"pointer",
  backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='rgba(255,255,255,0.5)'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
  backgroundRepeat:"no-repeat", backgroundPosition:"right 14px center",
  backgroundSize:"18px",
};

function Field({ label, hint, children }) {
  return (
    <div>
      <label style={{ fontSize:11, fontWeight:700, color:"rgba(255,255,255,0.45)", marginBottom:7,
        display:"block", letterSpacing:"0.9px", textTransform:"uppercase" }}>
        {label}{hint && <span style={{ color:"rgba(255,255,255,0.25)", marginLeft:6, fontWeight:400, textTransform:"none", letterSpacing:0 }}>{hint}</span>}
      </label>
      {children}
    </div>
  );
}

const DEFAULTS = {
  age:"", income:"", loan_amount:"", credit_score:"",
  months_employed:"", interest_rate:"", dti_ratio:"",
  education:"Bachelor's", employment:"Full-time", marital:"Single",
};

export default function Predict({ nav, user, token, logout }) {
  const [form,    setForm]    = useState(DEFAULTS);
  const [result,  setResult]  = useState(null);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const validate = () => {
    const req = ["age","income","loan_amount","credit_score","months_employed","interest_rate","dti_ratio"];
    for (const k of req) {
      if (!form[k] && form[k] !== 0) return `Please fill in: ${k.replace(/_/g," ")}`;
    }
    if (form.credit_score < 300 || form.credit_score > 850) return "Credit score must be 300–850";
    if (form.dti_ratio < 0 || form.dti_ratio > 1) return "DTI Ratio must be 0.0–1.0";
    return null;
  };

  const submit = async () => {
    const err = validate();
    if (err) { setError(err); return; }
    setLoading(true); setError(""); setResult(null);
    try {
      const r = await fetch(`${API}/api/predict`, {
        method:"POST",
        headers:{ "Content-Type":"application/json", Authorization:`Bearer ${token}` },
        body: JSON.stringify(form),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || "Prediction failed");
      setResult(d.prediction);
    } catch(e) { setError(e.message); }
    setLoading(false);
  };

  const reset = () => { setResult(null); setError(""); setForm(DEFAULTS); };

  const cs = Number(form.credit_score);
  const creditLabel  = cs >= 750 ? "Excellent 🟢" : cs >= 650 ? "Good 🟡" : cs >= 550 ? "Fair 🟠" : cs ? "Poor 🔴" : "";
  const creditColor  = cs >= 750 ? "#34d399" : cs >= 650 ? "#fbbf24" : cs >= 550 ? "#f97316" : "#f87171";
  const creditPct    = cs ? Math.min(100, ((cs - 300) / 550) * 100) : 0;

  return (
    <div style={{ width:"100%", minHeight:"100vh", background:"linear-gradient(160deg, #07070f 0%, #0c0c1e 100%)", color:"#fff", fontFamily:"'Space Grotesk', sans-serif", overflowX:"hidden" }}>
      <Navbar nav={nav} user={user} logout={logout} current="predict" />

      <div style={{ position:"fixed", top:"30%", left:"2%", width:380, height:380,
        background:"radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 70%)",
        borderRadius:"50%", pointerEvents:"none" }} />

      <div style={{ maxWidth:880, margin:"0 auto", padding:"52px 40px" }}>

        {/* Header */}
        <div style={{ marginBottom:42 }}>
          <h1 style={{ fontSize:40, fontWeight:900, letterSpacing:"-1.8px", marginBottom:10 }}>Loan Risk Predictor</h1>
          <p style={{ color:"rgba(255,255,255,0.38)", fontSize:15, fontFamily:"'Plus Jakarta Sans', sans-serif" }}>
            Fill in your details — our ML model analyzes 16 factors and gives an instant verdict
          </p>
        </div>

        {/* ─── Result Screen ─── */}
        {result && (
          <div style={{
            background: result === "Safe" ? "rgba(16,185,129,0.07)" : "rgba(239,68,68,0.07)",
            border: `2px solid ${result === "Safe" ? "rgba(16,185,129,0.38)" : "rgba(239,68,68,0.38)"}`,
            borderRadius:28, padding:"72px 40px", textAlign:"center",
            animation:"pop 0.45s cubic-bezier(.2,.8,.3,1.2)",
          }}>
            <div style={{ fontSize:80, marginBottom:22, animation:"bounce 0.6s ease" }}>
              {result === "Safe" ? "✅" : "⚠️"}
            </div>
            <h2 style={{
              fontSize:58, fontWeight:900, letterSpacing:"-2.5px",
              color: result === "Safe" ? "#10b981" : "#ef4444",
              marginBottom:16,
            }}>{result === "Safe" ? "SAFE" : "RISK"}</h2>
            <p style={{
              fontSize:17, color:"rgba(255,255,255,0.54)",
              maxWidth:500, margin:"0 auto 40px", lineHeight:1.75,
              fontFamily:"'Plus Jakarta Sans', sans-serif",
            }}>
              {result === "Safe"
                ? "Your financial profile indicates a low-risk loan application. The model predicts a high likelihood of successful repayment."
                : "Our model has detected elevated risk factors in your profile. This loan has a higher probability of default based on the inputs provided."}
            </p>
            <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
              <button onClick={reset} style={{
                background: result === "Safe" ? "rgba(16,185,129,0.18)" : "rgba(239,68,68,0.18)",
                border:`1px solid ${result === "Safe" ? "rgba(16,185,129,0.4)" : "rgba(239,68,68,0.4)"}`,
                color: result === "Safe" ? "#34d399" : "#f87171",
                padding:"12px 34px", borderRadius:50, cursor:"pointer",
                fontSize:15, fontWeight:800, fontFamily:"'Space Grotesk', sans-serif",
              }}>↺ New Prediction</button>
              <button onClick={() => nav("history")} style={{
                background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.12)",
                color:"#fff", padding:"12px 34px", borderRadius:50, cursor:"pointer",
                fontSize:15, fontWeight:600, fontFamily:"'Space Grotesk', sans-serif",
              }}>View History →</button>
            </div>
          </div>
        )}

        {/* ─── Form ─── */}
        {!result && (
          <div style={{
            background:"rgba(255,255,255,0.022)", border:"1px solid rgba(255,255,255,0.07)",
            borderRadius:24, padding:"40px",
          }}>
            {error && (
              <div style={{
                background:"rgba(239,68,68,0.09)", border:"1px solid rgba(239,68,68,0.28)",
                borderRadius:12, padding:"13px 18px", color:"#f87171",
                fontSize:13, marginBottom:28, fontFamily:"'Plus Jakarta Sans', sans-serif",
              }}>{error}</div>
            )}

            {/* Section: Personal */}
            <div style={{ fontSize:10, fontWeight:700, color:"#818cf8", letterSpacing:"2px", textTransform:"uppercase", marginBottom:18 }}>
              Personal Information
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))", gap:18, marginBottom:36 }}>
              <Field label="Age" hint="years">
                <input type="number" value={form.age} onChange={e => set("age", e.target.value)}
                  placeholder="28" style={inputBase} min="18" max="100"
                  onFocus={focusIn} onBlur={focusOut} />
              </Field>
              <Field label="Marital Status">
                <select value={form.marital} onChange={e => set("marital", e.target.value)}
                  style={selBase} onFocus={focusIn} onBlur={focusOut}>
                  <option>Single</option>
                  <option>Married</option>
                  <option>Divorced</option>
                </select>
              </Field>
              <Field label="Education">
                <select value={form.education} onChange={e => set("education", e.target.value)}
                  style={selBase} onFocus={focusIn} onBlur={focusOut}>
                  <option>High School</option>
                  <option>Bachelor's</option>
                  <option>Master's</option>
                  <option>PhD</option>
                </select>
              </Field>
            </div>

            {/* Section: Financial */}
            <div style={{ fontSize:10, fontWeight:700, color:"#34d399", letterSpacing:"2px", textTransform:"uppercase", marginBottom:18 }}>
              Financial Details
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))", gap:18, marginBottom:36 }}>
              <Field label="Annual Income" hint="₹">
                <input type="number" value={form.income} onChange={e => set("income", e.target.value)}
                  placeholder="500000" style={inputBase}
                  onFocus={focusIn} onBlur={focusOut} />
              </Field>
              <Field label="Loan Amount" hint="₹">
                <input type="number" value={form.loan_amount} onChange={e => set("loan_amount", e.target.value)}
                  placeholder="100000" style={inputBase}
                  onFocus={focusIn} onBlur={focusOut} />
              </Field>
              <Field label="Credit Score" hint="300–850">
                <input type="number" value={form.credit_score} onChange={e => set("credit_score", e.target.value)}
                  placeholder="700" style={inputBase} min="300" max="850"
                  onFocus={focusIn} onBlur={focusOut} />
              </Field>
              <Field label="DTI Ratio" hint="0.0–1.0">
                <input type="number" value={form.dti_ratio} onChange={e => set("dti_ratio", e.target.value)}
                  placeholder="0.35" style={inputBase} min="0" max="1" step="0.01"
                  onFocus={focusIn} onBlur={focusOut} />
              </Field>
            </div>

            {/* Credit Score Indicator */}
            {cs > 0 && (
              <div style={{
                background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.06)",
                borderRadius:14, padding:"18px 22px", marginBottom:36,
              }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
                  <span style={{ fontSize:12, fontWeight:600, fontFamily:"'Plus Jakarta Sans', sans-serif", color:"rgba(255,255,255,0.55)" }}>
                    Credit Score Indicator
                  </span>
                  <span style={{ fontSize:13, fontWeight:700, color:creditColor }}>{creditLabel}</span>
                </div>
                <div style={{ height:7, borderRadius:4, background:"rgba(255,255,255,0.07)", overflow:"hidden" }}>
                  <div style={{
                    height:"100%", borderRadius:4, width:`${creditPct}%`,
                    background:`linear-gradient(90deg, ${cs < 550 ? "#ef4444" : cs < 650 ? "#f97316" : cs < 750 ? "#fbbf24" : "#10b981"}, ${cs < 650 ? "#f97316" : "#34d399"})`,
                    transition:"width 0.6s ease",
                  }} />
                </div>
                <div style={{ display:"flex", justifyContent:"space-between", marginTop:6, fontSize:10, color:"rgba(255,255,255,0.22)", fontFamily:"'Plus Jakarta Sans', sans-serif" }}>
                  <span>300 (Poor)</span><span>550</span><span>650</span><span>750</span><span>850 (Excellent)</span>
                </div>
              </div>
            )}

            {/* Section: Loan & Employment */}
            <div style={{ fontSize:10, fontWeight:700, color:"#fbbf24", letterSpacing:"2px", textTransform:"uppercase", marginBottom:18 }}>
              Loan & Employment
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))", gap:18, marginBottom:40 }}>
              <Field label="Interest Rate" hint="%">
                <input type="number" value={form.interest_rate} onChange={e => set("interest_rate", e.target.value)}
                  placeholder="8.5" style={inputBase} step="0.1"
                  onFocus={focusIn} onBlur={focusOut} />
              </Field>
              <Field label="Months Employed">
                <input type="number" value={form.months_employed} onChange={e => set("months_employed", e.target.value)}
                  placeholder="24" style={inputBase} min="0"
                  onFocus={focusIn} onBlur={focusOut} />
              </Field>
              <Field label="Employment Type">
                <select value={form.employment} onChange={e => set("employment", e.target.value)}
                  style={selBase} onFocus={focusIn} onBlur={focusOut}>
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Self-employed</option>
                  <option>Unemployed</option>
                </select>
              </Field>
            </div>

            {/* Submit */}
            <button onClick={submit} disabled={loading} style={{
              width:"100%", padding:"16px",
              background: loading ? "rgba(99,102,241,0.4)" : "linear-gradient(135deg, #6366f1, #8b5cf6)",
              border:"none", color:"#fff", borderRadius:14,
              fontSize:17, fontWeight:900, cursor: loading ? "not-allowed" : "pointer",
              fontFamily:"'Space Grotesk', sans-serif", letterSpacing:"0.3px",
              boxShadow: loading ? "none" : "0 8px 32px rgba(99,102,241,0.42)",
              transition:"all 0.2s",
            }}
              onMouseEnter={e => { if(!loading) { e.currentTarget.style.transform="translateY(-1px)"; e.currentTarget.style.boxShadow="0 12px 42px rgba(99,102,241,0.55)"; } }}
              onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 8px 32px rgba(99,102,241,0.42)"; }}
            >
              {loading ? "⏳ Analyzing your profile…" : "🔮 Predict Loan Risk"}
            </button>
          </div>
        )}

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@400;500;600&display=swap');
        select option { background: #1a1a2e; color: #fff; }
        @keyframes pop    { 0%{opacity:0;transform:scale(0.92)} 100%{opacity:1;transform:scale(1)} }
        @keyframes bounce { 0%{transform:scale(0.5)} 70%{transform:scale(1.12)} 100%{transform:scale(1)} }
      `}</style>
    </div>
  );
}

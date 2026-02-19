import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

const API = "https://loan-ml-production.up.railway.app";

export default function Dashboard({ nav, user, token, logout }) {
  const [stats,   setStats]   = useState(null);
  const [recent,  setRecent]  = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const h = { Authorization: `Bearer ${token}` };
    Promise.all([
      fetch(`${API}/api/stats`,   { headers: h }).then(r => r.json()),
      fetch(`${API}/api/history`, { headers: h }).then(r => r.json()),
    ]).then(([s, hist]) => {
      setStats(s);
      setRecent(Array.isArray(hist) ? hist.slice(0, 5) : []);
    }).catch(() => {}).finally(() => setLoading(false));
  }, [token]);

  const hr = new Date().getHours();
  const greet = hr < 12 ? "Good morning" : hr < 18 ? "Good afternoon" : "Good evening";

  const StatCard = ({ icon, label, value, color, bg, border }) => (
    <div style={{
      background: bg, border: `1px solid ${border}`,
      borderRadius: 20, padding: "28px 24px", transition: "transform 0.22s, box-shadow 0.22s",
    }}
      onMouseEnter={e => { e.currentTarget.style.transform="translateY(-4px)"; e.currentTarget.style.boxShadow=`0 12px 40px ${border}`; }}
      onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none"; }}
    >
      <div style={{ fontSize:30, marginBottom:14 }}>{icon}</div>
      <div style={{ fontSize:42, fontWeight:900, color, letterSpacing:"-1.5px", lineHeight:1 }}>
        {loading ? "—" : value}
      </div>
      <div style={{ fontSize:13, color:"rgba(255,255,255,0.42)", marginTop:6, fontFamily:"'Plus Jakarta Sans', sans-serif" }}>{label}</div>
    </div>
  );

  return (
    <div style={{ width:"100%", minHeight:"100vh", background:"linear-gradient(160deg, #07070f 0%, #0c0c1e 100%)", color:"#fff", fontFamily:"'Space Grotesk', sans-serif", overflowX:"hidden" }}>
      <Navbar nav={nav} user={user} logout={logout} current="dashboard" />

      {/* Ambient */}
      <div style={{ position:"fixed", top:"25%", right:"4%", width:420, height:420,
        background:"radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)",
        borderRadius:"50%", pointerEvents:"none" }} />

      <div style={{ maxWidth:1100, margin:"0 auto", padding:"52px 40px" }}>

        {/* Header */}
        <div style={{ marginBottom:52 }}>
          <div style={{ fontSize:13, color:"rgba(255,255,255,0.3)", fontFamily:"'Plus Jakarta Sans', sans-serif", marginBottom:6 }}>
            {greet} 👋
          </div>
          <h1 style={{ fontSize:42, fontWeight:900, letterSpacing:"-2px", marginBottom:10 }}>
            {user?.name}'s Dashboard
          </h1>
          <p style={{ color:"rgba(255,255,255,0.38)", fontSize:15, fontFamily:"'Plus Jakarta Sans', sans-serif" }}>
            Your loan risk prediction overview and history
          </p>
        </div>

        {/* Stats Grid */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))", gap:18, marginBottom:48 }}>
          <StatCard icon="📊" label="Total Predictions" value={stats?.total ?? 0}
            color="#818cf8" bg="rgba(99,102,241,0.09)" border="rgba(99,102,241,0.22)" />
          <StatCard icon="✅" label="Safe Predictions" value={stats?.safe ?? 0}
            color="#34d399" bg="rgba(16,185,129,0.09)" border="rgba(16,185,129,0.22)" />
          <StatCard icon="⚠️" label="Risk Predictions" value={stats?.risk ?? 0}
            color="#f87171" bg="rgba(239,68,68,0.09)" border="rgba(239,68,68,0.22)" />
          <StatCard icon="📈" label="Safe Rate" value={stats ? `${stats.safe_percent}%` : "0%"}
            color="#fbbf24" bg="rgba(245,158,11,0.09)" border="rgba(245,158,11,0.22)" />
        </div>

        {/* Progress Bar */}
        {stats && stats.total > 0 && (
          <div style={{
            background:"rgba(255,255,255,0.025)", border:"1px solid rgba(255,255,255,0.07)",
            borderRadius:20, padding:"28px 32px", marginBottom:44,
          }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
              <span style={{ fontSize:16, fontWeight:700 }}>Risk Distribution</span>
              <span style={{ fontSize:13, color:"rgba(255,255,255,0.35)", fontFamily:"'Plus Jakarta Sans', sans-serif" }}>
                {stats.total} prediction{stats.total !== 1 ? "s" : ""} total
              </span>
            </div>
            <div style={{ height:10, borderRadius:5, background:"rgba(255,255,255,0.07)", overflow:"hidden" }}>
              <div style={{
                height:"100%", borderRadius:5,
                width: `${stats.safe_percent}%`,
                background:"linear-gradient(90deg, #10b981, #6366f1)",
                transition:"width 1.2s cubic-bezier(.4,0,.2,1)",
              }} />
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", marginTop:10 }}>
              <span style={{ fontSize:12, color:"#34d399", fontFamily:"'Plus Jakarta Sans', sans-serif" }}>✅ Safe — {stats.safe_percent}%</span>
              <span style={{ fontSize:12, color:"#f87171", fontFamily:"'Plus Jakarta Sans', sans-serif" }}>⚠️ Risk — {(100 - stats.safe_percent).toFixed(1)}%</span>
            </div>
          </div>
        )}

        {/* Averages */}
        {stats && stats.total > 0 && (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))", gap:14, marginBottom:44 }}>
            {[
              { label:"Avg Credit Score", value: stats.avg_credit },
              { label:"Avg Loan Amount",  value: `₹${Number(stats.avg_loan).toLocaleString()}` },
              { label:"Avg DTI Ratio",    value: stats.avg_dti },
              { label:"Avg Income",       value: `₹${Number(stats.avg_income).toLocaleString()}` },
            ].map(a => (
              <div key={a.label} style={{
                background:"rgba(255,255,255,0.025)", border:"1px solid rgba(255,255,255,0.06)",
                borderRadius:14, padding:"18px 22px",
              }}>
                <div style={{ fontSize:22, fontWeight:900, letterSpacing:"-0.5px" }}>{a.value}</div>
                <div style={{ fontSize:11, color:"rgba(255,255,255,0.32)", marginTop:4, fontFamily:"'Plus Jakarta Sans', sans-serif", textTransform:"uppercase", letterSpacing:"0.8px" }}>{a.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Quick Actions */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18, marginBottom:48 }}>
          <button onClick={() => nav("predict")} style={{
            background:"linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
            border:"none", borderRadius:20, padding:"30px 32px",
            cursor:"pointer", textAlign:"left", color:"#fff",
            fontFamily:"'Space Grotesk', sans-serif", transition:"all 0.22s",
            boxShadow:"0 8px 32px rgba(99,102,241,0.32)",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow="0 14px 44px rgba(99,102,241,0.45)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 8px 32px rgba(99,102,241,0.32)"; }}
          >
            <div style={{ fontSize:34, marginBottom:14 }}>🔮</div>
            <div style={{ fontSize:21, fontWeight:900, marginBottom:7 }}>New Prediction</div>
            <div style={{ fontSize:13, opacity:0.68, fontFamily:"'Plus Jakarta Sans', sans-serif" }}>Analyze loan risk instantly with AI</div>
          </button>
          <button onClick={() => nav("history")} style={{
            background:"rgba(255,255,255,0.035)",
            border:"1px solid rgba(255,255,255,0.09)",
            borderRadius:20, padding:"30px 32px",
            cursor:"pointer", textAlign:"left", color:"#fff",
            fontFamily:"'Space Grotesk', sans-serif", transition:"all 0.22s",
          }}
            onMouseEnter={e => { e.currentTarget.style.background="rgba(255,255,255,0.07)"; e.currentTarget.style.transform="translateY(-3px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background="rgba(255,255,255,0.035)"; e.currentTarget.style.transform="translateY(0)"; }}
          >
            <div style={{ fontSize:34, marginBottom:14 }}>📋</div>
            <div style={{ fontSize:21, fontWeight:900, marginBottom:7 }}>View History</div>
            <div style={{ fontSize:13, color:"rgba(255,255,255,0.38)", fontFamily:"'Plus Jakarta Sans', sans-serif" }}>All your past predictions & records</div>
          </button>
        </div>

        {/* Recent Predictions */}
        {recent.length > 0 && (
          <div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
              <h2 style={{ fontSize:22, fontWeight:800, letterSpacing:"-0.5px" }}>Recent Predictions</h2>
              <button onClick={() => nav("history")} style={{
                background:"none", border:"1px solid rgba(255,255,255,0.1)",
                color:"rgba(255,255,255,0.45)", padding:"6px 16px", borderRadius:8,
                cursor:"pointer", fontSize:13, fontFamily:"'Plus Jakarta Sans', sans-serif",
              }}>View all →</button>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {recent.map(p => (
                <div key={p.id} style={{
                  background:"rgba(255,255,255,0.025)", border:"1px solid rgba(255,255,255,0.07)",
                  borderRadius:14, padding:"16px 22px",
                  display:"flex", alignItems:"center", justifyContent:"space-between",
                  transition:"background 0.18s",
                }}
                  onMouseEnter={e => e.currentTarget.style.background="rgba(255,255,255,0.05)"}
                  onMouseLeave={e => e.currentTarget.style.background="rgba(255,255,255,0.025)"}
                >
                  <div style={{ display:"flex", gap:28, fontFamily:"'Plus Jakarta Sans', sans-serif", flexWrap:"wrap" }}>
                    {[
                      { l:"Loan Amount",   v:`₹${Number(p.loan_amount).toLocaleString()}` },
                      { l:"Credit Score",  v:p.credit_score },
                      { l:"DTI Ratio",     v:p.dti_ratio },
                      { l:"Income",        v:`₹${Number(p.income).toLocaleString()}` },
                      { l:"Date",          v:p.created_at?.slice(0,10) },
                    ].map(f => (
                      <div key={f.l}>
                        <div style={{ fontSize:11, color:"rgba(255,255,255,0.28)", marginBottom:2 }}>{f.l}</div>
                        <div style={{ fontSize:14, fontWeight:600 }}>{f.v}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{
                    padding:"5px 16px", borderRadius:50, fontWeight:700, fontSize:12,
                    flexShrink:0, marginLeft:16,
                    background: p.result === "Safe" ? "rgba(16,185,129,0.14)" : "rgba(239,68,68,0.14)",
                    color:       p.result === "Safe" ? "#34d399" : "#f87171",
                    border:     `1px solid ${p.result === "Safe" ? "rgba(16,185,129,0.3)" : "rgba(239,68,68,0.3)"}`,
                  }}>
                    {p.result === "Safe" ? "✅ Safe" : "⚠️ Risk"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {!loading && recent.length === 0 && (
          <div style={{
            textAlign:"center", padding:"72px 40px",
            background:"rgba(255,255,255,0.018)", border:"1px dashed rgba(255,255,255,0.09)",
            borderRadius:22,
          }}>
            <div style={{ fontSize:52, marginBottom:18 }}>🔮</div>
            <div style={{ fontSize:22, fontWeight:800, marginBottom:10 }}>No predictions yet</div>
            <div style={{ fontSize:14, color:"rgba(255,255,255,0.38)", marginBottom:28, fontFamily:"'Plus Jakarta Sans', sans-serif" }}>
              Make your first loan risk prediction to get started
            </div>
            <button onClick={() => nav("predict")} style={{
              background:"linear-gradient(135deg, #6366f1, #8b5cf6)",
              border:"none", color:"#fff", padding:"12px 34px", borderRadius:50,
              cursor:"pointer", fontSize:15, fontWeight:800, fontFamily:"'Space Grotesk', sans-serif",
              boxShadow:"0 6px 24px rgba(99,102,241,0.4)",
            }}>Start Predicting →</button>
          </div>
        )}

      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

const API = "http://localhost:5000";

export default function History({ nav, user, token, logout }) {
  const [records,  setRecords]  = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [filter,   setFilter]   = useState("All");
  const [deleting, setDeleting] = useState(null);
  const [expanded, setExpanded] = useState(null);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const r = await fetch(`${API}/api/history`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const d = await r.json();
      setRecords(Array.isArray(d) ? d : []);
    } catch {}
    setLoading(false);
  };

  useEffect(() => { fetchHistory(); }, [token]);

  const deleteRecord = async (id) => {
    if (!window.confirm("Delete this prediction?")) return;
    setDeleting(id);
    try {
      await fetch(`${API}/api/history/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setRecords(r => r.filter(p => p.id !== id));
      if (expanded === id) setExpanded(null);
    } catch {}
    setDeleting(null);
  };

  const filtered = filter === "All" ? records : records.filter(r => r.result === filter);

  const avg = (key) => records.length
    ? (records.reduce((a, r) => a + (Number(r[key]) || 0), 0) / records.length)
    : 0;

  return (
    <div style={{ width:"100%", minHeight:"100vh", background:"linear-gradient(160deg, #07070f 0%, #0c0c1e 100%)", color:"#fff", fontFamily:"'Space Grotesk', sans-serif", overflowX:"hidden" }}>
      <Navbar nav={nav} user={user} logout={logout} current="history" />

      <div style={{ maxWidth:1120, margin:"0 auto", padding:"52px 40px" }}>

        {/* Header */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:44, flexWrap:"wrap", gap:18 }}>
          <div>
            <h1 style={{ fontSize:40, fontWeight:900, letterSpacing:"-1.8px", marginBottom:10 }}>Prediction History</h1>
            <p style={{ color:"rgba(255,255,255,0.38)", fontSize:15, fontFamily:"'Plus Jakarta Sans', sans-serif" }}>
              {records.length} total prediction{records.length !== 1 ? "s" : ""} · Your complete loan analysis record
            </p>
          </div>
          <button onClick={() => nav("predict")} style={{
            background:"linear-gradient(135deg, #6366f1, #8b5cf6)",
            border:"none", color:"#fff", padding:"12px 28px", borderRadius:12,
            cursor:"pointer", fontSize:15, fontWeight:800, fontFamily:"'Space Grotesk', sans-serif",
            boxShadow:"0 4px 22px rgba(99,102,241,0.4)",
          }}>+ New Prediction</button>
        </div>

        {/* Filter Tabs */}
        <div style={{ display:"flex", gap:8, marginBottom:28, flexWrap:"wrap" }}>
          {[
            { f:"All",  count:records.length,                             color:"#818cf8", bg:"rgba(99,102,241,0.15)",  border:"rgba(99,102,241,0.4)"  },
            { f:"Safe", count:records.filter(r=>r.result==="Safe").length, color:"#34d399", bg:"rgba(16,185,129,0.15)", border:"rgba(16,185,129,0.4)" },
            { f:"Risk", count:records.filter(r=>r.result==="Risk").length, color:"#f87171", bg:"rgba(239,68,68,0.15)",  border:"rgba(239,68,68,0.4)"  },
          ].map(({ f, count, color, bg, border }) => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding:"8px 22px", borderRadius:50, cursor:"pointer",
              fontFamily:"'Space Grotesk', sans-serif", fontWeight:700, fontSize:13,
              border:`1px solid ${filter===f ? border : "rgba(255,255,255,0.1)"}`,
              background: filter===f ? bg : "transparent",
              color: filter===f ? color : "rgba(255,255,255,0.42)",
              transition:"all 0.18s",
            }}>{f} ({count})</button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div style={{ textAlign:"center", padding:"80px 0", color:"rgba(255,255,255,0.28)", fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:15 }}>
            Loading your history…
          </div>
        )}

        {/* Empty */}
        {!loading && filtered.length === 0 && (
          <div style={{
            textAlign:"center", padding:"80px 40px",
            background:"rgba(255,255,255,0.018)", border:"1px dashed rgba(255,255,255,0.09)", borderRadius:22,
          }}>
            <div style={{ fontSize:50, marginBottom:16 }}>📭</div>
            <div style={{ fontSize:22, fontWeight:800, marginBottom:10 }}>No predictions found</div>
            <div style={{ fontSize:14, color:"rgba(255,255,255,0.36)", marginBottom:24, fontFamily:"'Plus Jakarta Sans', sans-serif" }}>
              {filter === "All" ? "Make your first prediction to see it here" : `No ${filter} predictions yet`}
            </div>
            {filter === "All" && (
              <button onClick={() => nav("predict")} style={{
                background:"linear-gradient(135deg, #6366f1, #8b5cf6)", border:"none",
                color:"#fff", padding:"12px 30px", borderRadius:50,
                cursor:"pointer", fontSize:14, fontWeight:800, fontFamily:"'Space Grotesk', sans-serif",
              }}>Start Predicting →</button>
            )}
          </div>
        )}

        {/* Table */}
        {!loading && filtered.length > 0 && (
          <div style={{ background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:20, overflow:"hidden" }}>
            {/* Table Header */}
            <div style={{
              display:"grid",
              gridTemplateColumns:"52px 1fr 1fr 100px 90px 80px 110px 100px 80px",
              padding:"14px 22px",
              background:"rgba(255,255,255,0.03)", borderBottom:"1px solid rgba(255,255,255,0.06)",
              fontSize:10, fontWeight:700, color:"rgba(255,255,255,0.28)",
              letterSpacing:"1.5px", textTransform:"uppercase", fontFamily:"'Plus Jakarta Sans', sans-serif",
            }}>
              <div>#</div>
              <div>Loan Amount</div>
              <div>Income</div>
              <div>Credit</div>
              <div>DTI</div>
              <div>Rate%</div>
              <div>Date</div>
              <div>Result</div>
              <div></div>
            </div>

            {/* Table Rows */}
            {filtered.map((p, i) => (
              <div key={p.id}>
                <div style={{
                  display:"grid",
                  gridTemplateColumns:"52px 1fr 1fr 100px 90px 80px 110px 100px 80px",
                  padding:"16px 22px",
                  borderBottom: i < filtered.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                  alignItems:"center", transition:"background 0.15s", cursor:"pointer",
                }}
                  onMouseEnter={e => e.currentTarget.style.background="rgba(255,255,255,0.03)"}
                  onMouseLeave={e => e.currentTarget.style.background="transparent"}
                  onClick={() => setExpanded(expanded === p.id ? null : p.id)}
                >
                  <div style={{ fontSize:12, color:"rgba(255,255,255,0.22)", fontWeight:600, fontFamily:"'Plus Jakarta Sans', sans-serif" }}>
                    #{p.id}
                  </div>
                  <div style={{ fontSize:14, fontWeight:700 }}>
                    ₹{Number(p.loan_amount).toLocaleString()}
                  </div>
                  <div style={{ fontSize:13, color:"rgba(255,255,255,0.6)", fontFamily:"'Plus Jakarta Sans', sans-serif" }}>
                    ₹{Number(p.income).toLocaleString()}
                  </div>
                  <div style={{
                    fontSize:14, fontWeight:800,
                    color: p.credit_score >= 750 ? "#34d399" : p.credit_score >= 650 ? "#fbbf24" : "#f87171",
                  }}>{p.credit_score}</div>
                  <div style={{ fontSize:13, color:"rgba(255,255,255,0.6)", fontFamily:"'Plus Jakarta Sans', sans-serif" }}>{p.dti_ratio}</div>
                  <div style={{ fontSize:13, color:"rgba(255,255,255,0.5)", fontFamily:"'Plus Jakarta Sans', sans-serif" }}>{p.interest_rate}%</div>
                  <div style={{ fontSize:11, color:"rgba(255,255,255,0.3)", fontFamily:"'Plus Jakarta Sans', sans-serif" }}>
                    {p.created_at?.slice(0,16)}
                  </div>
                  <div>
                    <span style={{
                      padding:"4px 14px", borderRadius:50, fontWeight:700, fontSize:11,
                      background: p.result==="Safe" ? "rgba(16,185,129,0.14)" : "rgba(239,68,68,0.14)",
                      color:       p.result==="Safe" ? "#34d399" : "#f87171",
                      border:     `1px solid ${p.result==="Safe" ? "rgba(16,185,129,0.3)" : "rgba(239,68,68,0.3)"}`,
                    }}>
                      {p.result==="Safe" ? "✅ Safe" : "⚠️ Risk"}
                    </span>
                  </div>
                  <div>
                    <button onClick={e => { e.stopPropagation(); deleteRecord(p.id); }}
                      disabled={deleting === p.id}
                      style={{
                        background:"rgba(239,68,68,0.09)", border:"1px solid rgba(239,68,68,0.2)",
                        color:"#f87171", padding:"5px 12px", borderRadius:8,
                        cursor:"pointer", fontSize:11, fontWeight:600,
                        fontFamily:"'Space Grotesk', sans-serif", transition:"all 0.15s",
                        opacity: deleting===p.id ? 0.5 : 1,
                      }}
                      onMouseEnter={e => { e.stopPropagation(); e.currentTarget.style.background="rgba(239,68,68,0.2)"; }}
                      onMouseLeave={e => e.currentTarget.style.background="rgba(239,68,68,0.09)"}
                    >{deleting===p.id ? "…" : "Delete"}</button>
                  </div>
                </div>

                {/* Expanded Detail Row */}
                {expanded === p.id && (
                  <div style={{
                    padding:"16px 22px 22px",
                    background:"rgba(99,102,241,0.05)",
                    borderTop:"1px solid rgba(99,102,241,0.15)",
                    borderBottom: i < filtered.length-1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                    animation:"slideDown 0.2s ease",
                  }}>
                    <div style={{ fontSize:10, color:"#818cf8", fontWeight:700, letterSpacing:"1.5px", textTransform:"uppercase", marginBottom:14 }}>
                      Full Details — Prediction #{p.id}
                    </div>
                    <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(160px, 1fr))", gap:14 }}>
                      {[
                        { l:"Age",           v:p.age },
                        { l:"Education",     v:p.education },
                        { l:"Employment",    v:p.employment },
                        { l:"Marital",       v:p.marital },
                        { l:"Months Employed", v:p.months_employed },
                        { l:"Interest Rate", v:`${p.interest_rate}%` },
                        { l:"DTI Ratio",     v:p.dti_ratio },
                        { l:"Credit Score",  v:p.credit_score },
                      ].map(d => (
                        <div key={d.l} style={{
                          background:"rgba(255,255,255,0.04)", borderRadius:10, padding:"12px 14px",
                        }}>
                          <div style={{ fontSize:10, color:"rgba(255,255,255,0.3)", marginBottom:4, fontFamily:"'Plus Jakarta Sans', sans-serif", textTransform:"uppercase", letterSpacing:"0.7px" }}>{d.l}</div>
                          <div style={{ fontSize:14, fontWeight:700 }}>{d.v}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Summary Stats */}
        {!loading && records.length > 0 && (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))", gap:14, marginTop:28 }}>
            {[
              { label:"Avg Credit Score", value: Math.round(avg("credit_score")) },
              { label:"Avg Loan Amount",  value: `₹${Math.round(avg("loan_amount")).toLocaleString()}` },
              { label:"Avg DTI Ratio",    value: avg("dti_ratio").toFixed(3) },
              { label:"Avg Annual Income",value: `₹${Math.round(avg("income")).toLocaleString()}` },
            ].map(s => (
              <div key={s.label} style={{
                background:"rgba(255,255,255,0.025)", border:"1px solid rgba(255,255,255,0.06)",
                borderRadius:14, padding:"18px 22px",
              }}>
                <div style={{ fontSize:22, fontWeight:900, letterSpacing:"-0.5px" }}>{s.value}</div>
                <div style={{ fontSize:11, color:"rgba(255,255,255,0.3)", marginTop:4, fontFamily:"'Plus Jakarta Sans', sans-serif", textTransform:"uppercase", letterSpacing:"0.8px" }}>{s.label}</div>
              </div>
            ))}
          </div>
        )}

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@400;500;600&display=swap');
        @keyframes slideDown { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </div>
  );
}

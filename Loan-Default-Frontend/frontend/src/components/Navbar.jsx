const F = "'Plus Jakarta Sans', sans-serif";
const FH = "'Space Grotesk', sans-serif";

export default function Navbar({ nav, user, logout, current }) {
  const authLinks = user
    ? [
        { label: "Dashboard", page: "dashboard" },
        { label: "Predict",   page: "predict" },
        { label: "History",   page: "history" },
      ]
    : [];

  const publicLinks = [
    { label: "About",   page: "about" },
    { label: "Help",    page: "help" },
    { label: "Contact", page: "contact" },
  ];

  const allLinks = [...authLinks, ...publicLinks];

  return (
    <>
      <nav style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 clamp(16px, 4vw, 48px)", height: 64,
        background: "rgba(7,7,15,0.88)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(28px)",
        position: "sticky", top: 0, zIndex: 100,
        width: "100%",
        fontFamily: FH,
      }}>
        {/* Logo */}
        <div onClick={() => nav(user ? "dashboard" : "landing")}
          style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", flexShrink: 0 }}>
          <div style={{
            width: 34, height: 34,
            background: "linear-gradient(135deg, #6366f1 0%, #10b981 100%)",
            borderRadius: 10, display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: 16, fontWeight: 800, color: "#fff",
            boxShadow: "0 4px 16px rgba(99,102,241,0.4)",
          }}>L</div>
          <span style={{ fontSize: 17, fontWeight: 700, color: "#fff", letterSpacing: "-0.3px", fontFamily: FH }}>
            LoanPredict
          </span>
        </div>

        {/* Nav Links */}
        <div style={{ display: "flex", gap: 2, alignItems: "center" }}>
          {allLinks.map((n) => {
            const active = current === n.page;
            return (
              <button key={n.page} onClick={() => nav(n.page)} style={{
                background: active ? "rgba(99,102,241,0.15)" : "transparent",
                border: `1px solid ${active ? "rgba(99,102,241,0.35)" : "transparent"}`,
                color: active ? "#818cf8" : "rgba(255,255,255,0.5)",
                padding: "6px 14px", borderRadius: 8, cursor: "pointer",
                fontSize: 13, fontWeight: active ? 700 : 500,
                fontFamily: FH, transition: "all 0.15s",
              }}
                onMouseEnter={(e) => { if (!active) { e.currentTarget.style.color = "#fff"; e.currentTarget.style.background = "rgba(255,255,255,0.06)"; } }}
                onMouseLeave={(e) => { if (!active) { e.currentTarget.style.color = "rgba(255,255,255,0.5)"; e.currentTarget.style.background = "transparent"; } }}
              >{n.label}</button>
            );
          })}
        </div>

        {/* User / Auth */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          {user ? (
            <>
              <div style={{
                display: "flex", alignItems: "center", gap: 8,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.09)",
                borderRadius: 50, padding: "4px 13px 4px 4px",
              }}>
                <div style={{
                  width: 26, height: 26,
                  background: "linear-gradient(135deg, #6366f1, #10b981)",
                  borderRadius: "50%", display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: 12, fontWeight: 800, color: "#fff",
                }}>{(user?.name?.[0] || "U").toUpperCase()}</div>
                <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.6)", fontFamily: F }}>
                  {user?.name || "User"}
                </span>
              </div>
              <button onClick={logout} style={{
                background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)",
                color: "#f87171", padding: "6px 16px", borderRadius: 8,
                cursor: "pointer", fontSize: 13, fontWeight: 600,
                fontFamily: FH, transition: "all 0.15s",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.18)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.08)"; }}
              >Sign Out</button>
            </>
          ) : (
            <>
              <button onClick={() => nav("login")} style={{
                background: "transparent", border: "1px solid rgba(255,255,255,0.15)",
                color: "rgba(255,255,255,0.7)", padding: "7px 18px", borderRadius: 8,
                cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: FH, transition: "all 0.15s",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#6366f1"; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
              >Sign In</button>
              <button onClick={() => nav("register")} style={{
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)", border: "none",
                color: "#fff", padding: "7px 18px", borderRadius: 8,
                cursor: "pointer", fontSize: 13, fontWeight: 700, fontFamily: FH,
                boxShadow: "0 4px 16px rgba(99,102,241,0.38)", transition: "all 0.15s",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 6px 22px rgba(99,102,241,0.55)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 4px 16px rgba(99,102,241,0.38)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >Get Started</button>
            </>
          )}
        </div>
      </nav>
    </>
  );
}

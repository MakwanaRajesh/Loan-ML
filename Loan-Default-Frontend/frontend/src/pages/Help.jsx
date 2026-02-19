import { useState } from "react";
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

const faqs = [
  { q:"How accurate is the loan prediction?", a:"Our Gradient Boosting model is trained on thousands of real loan applications and achieves high accuracy across 16 financial features. While it provides a strong indicator, always consult a financial advisor for final decisions." },
  { q:"Is my data stored securely?", a:"Yes. All passwords are bcrypt-hashed, tokens are JWT-signed, and your prediction history is tied to your account only. We never share personal data with third parties." },
  { q:"What are the 16 factors analyzed?", a:"The model analyzes: income, loan amount, credit history, employment status, loan term, interest rate, debt-to-income ratio, number of open accounts, derogatory marks, total accounts, and several other financial indicators." },
  { q:"How do I delete my prediction history?", a:"Navigate to the History page, find the record you want to remove, and click the delete button next to it. Records are permanently deleted." },
  { q:"Can I use LoanPredict for free?", a:"Yes! LoanPredict is completely free to use. There are no paid tiers, no credit card required, and no usage limits." },
  { q:"Why does the model say 'Risk' even if I think I'm safe?", a:"The ML model considers multiple weighted factors simultaneously. A single negative indicator (like high debt-to-income ratio or short credit history) can tip the result. Use the prediction as guidance, not a final verdict." },
  { q:"How do I reset my password?", a:"Password reset is not yet available in this version. Please create a new account or contact the developer via the Contact page." },
  { q:"Is LoanPredict affiliated with any bank?", a:"No. LoanPredict is an independent ML project built by an individual developer. It is not affiliated with any financial institution." },
];

export default function Help({ nav, user, logout }) {
  const [open, setOpen] = useState(null);

  return (
    <PageWrapper>
      <Navbar nav={nav} user={user} logout={logout} current="help" />
      <div style={{ maxWidth:860, margin:"0 auto", padding:"60px clamp(20px,5vw,40px) 80px", position:"relative", zIndex:5 }}>

        {/* Header */}
        <div style={{ textAlign:"center", marginBottom:60 }}>
          <div style={{
            display:"inline-flex", alignItems:"center", gap:8,
            background:"rgba(16,185,129,0.12)", border:"1px solid rgba(16,185,129,0.28)",
            borderRadius:50, padding:"6px 18px", marginBottom:24,
            fontSize:13, fontWeight:600, color:"#34d399", fontFamily:FH,
          }}>❓ Help Center</div>
          <h1 style={{ fontSize:"clamp(28px,4.5vw,48px)", fontWeight:800, letterSpacing:"-2px", marginBottom:14, fontFamily:FH,
            background:"linear-gradient(135deg, #fff 0%, #a5b4fc 50%, #34d399 100%)",
            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
          }}>Frequently Asked Questions</h1>
          <p style={{ fontSize:"clamp(14px,1.4vw,16px)", color:"rgba(255,255,255,0.45)", maxWidth:500, margin:"0 auto", lineHeight:1.75 }}>
            Everything you need to know about using LoanPredict. Can't find your answer? Contact us.
          </p>
        </div>

        {/* Quick Start */}
        <div style={{
          background:"rgba(99,102,241,0.08)", border:"1px solid rgba(99,102,241,0.2)",
          borderRadius:20, padding:"28px 32px", marginBottom:36,
        }}>
          <h2 style={{ fontSize:18, fontWeight:700, fontFamily:FH, color:"#818cf8", marginBottom:16 }}>🚀 Quick Start Guide</h2>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(180px, 1fr))", gap:16 }}>
            {[
              { n:"1", t:"Register", d:"Create a free account" },
              { n:"2", t:"Fill the Form", d:"Enter your financial info" },
              { n:"3", t:"Predict", d:"Click 'Analyze' and get result" },
              { n:"4", t:"Review History", d:"Track all predictions" },
            ].map(s=>(
              <div key={s.n} style={{
                display:"flex", gap:14, alignItems:"flex-start",
              }}>
                <div style={{
                  width:30, height:30, borderRadius:"50%", flexShrink:0,
                  background:"linear-gradient(135deg, rgba(99,102,241,0.3), rgba(16,185,129,0.3))",
                  border:"1px solid rgba(99,102,241,0.4)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:13, fontWeight:700, color:"#818cf8", fontFamily:FH,
                }}>{s.n}</div>
                <div>
                  <div style={{ fontSize:14, fontWeight:700, color:"#fff", fontFamily:FH }}>{s.t}</div>
                  <div style={{ fontSize:12, color:"rgba(255,255,255,0.4)", marginTop:2 }}>{s.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Accordion */}
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={i} style={{
                background:"rgba(255,255,255,0.025)", border:`1px solid ${isOpen ? "rgba(99,102,241,0.3)" : "rgba(255,255,255,0.07)"}`,
                borderRadius:14, overflow:"hidden", transition:"all 0.2s",
              }}>
                <button onClick={() => setOpen(isOpen ? null : i)} style={{
                  width:"100%", textAlign:"left", background:"transparent", border:"none",
                  color:"#fff", padding:"18px 22px", cursor:"pointer",
                  display:"flex", justifyContent:"space-between", alignItems:"center", gap:16,
                }}>
                  <span style={{ fontSize:15, fontWeight:600, fontFamily:FH }}>{faq.q}</span>
                  <span style={{
                    fontSize:18, color:isOpen?"#818cf8":"rgba(255,255,255,0.35)",
                    transform:isOpen?"rotate(45deg)":"rotate(0)", transition:"all 0.2s", flexShrink:0,
                  }}>+</span>
                </button>
                {isOpen && (
                  <div style={{
                    padding:"0 22px 20px",
                    color:"rgba(255,255,255,0.55)", fontSize:14, lineHeight:1.78, fontFamily:F,
                  }}>{faq.a}</div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div style={{
          textAlign:"center", marginTop:48,
          background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.07)",
          borderRadius:20, padding:"36px 32px",
        }}>
          <div style={{ fontSize:32, marginBottom:12 }}>🙋</div>
          <div style={{ fontSize:18, fontWeight:700, fontFamily:FH, marginBottom:8 }}>Still have questions?</div>
          <p style={{ color:"rgba(255,255,255,0.45)", fontSize:14, marginBottom:20 }}>
            Our support team is happy to help you with any other queries.
          </p>
          <button onClick={() => nav("contact")} style={{
            background:"linear-gradient(135deg, #6366f1, #10b981)", border:"none",
            color:"#fff", padding:"12px 32px", borderRadius:50, cursor:"pointer",
            fontSize:14, fontWeight:700, fontFamily:FH,
            boxShadow:"0 6px 28px rgba(99,102,241,0.38)",
          }}>Contact Us →</button>
        </div>

      </div>
    </PageWrapper>
  );
}

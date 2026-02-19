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

const Input = ({ label, type="text", value, onChange, placeholder, multiline=false }) => (
  <div style={{ marginBottom:20 }}>
    <label style={{ display:"block", fontSize:13, fontWeight:600, color:"rgba(255,255,255,0.6)", fontFamily:FH, marginBottom:8 }}>{label}</label>
    {multiline ? (
      <textarea value={value} onChange={onChange} placeholder={placeholder} rows={5} style={{
        width:"100%", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)",
        borderRadius:12, padding:"12px 16px", color:"#fff", fontSize:14, fontFamily:F,
        resize:"vertical", outline:"none", transition:"border-color 0.2s",
      }}
        onFocus={e=>e.currentTarget.style.borderColor="rgba(99,102,241,0.5)"}
        onBlur={e=>e.currentTarget.style.borderColor="rgba(255,255,255,0.1)"}
      />
    ) : (
      <input type={type} value={value} onChange={onChange} placeholder={placeholder} style={{
        width:"100%", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)",
        borderRadius:12, padding:"12px 16px", color:"#fff", fontSize:14, fontFamily:F,
        outline:"none", transition:"border-color 0.2s",
      }}
        onFocus={e=>e.currentTarget.style.borderColor="rgba(99,102,241,0.5)"}
        onBlur={e=>e.currentTarget.style.borderColor="rgba(255,255,255,0.1)"}
      />
    )}
  </div>
);

export default function Contact({ nav, user, logout }) {
  const [form, setForm] = useState({ name:"", email:"", subject:"", message:"" });
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) return;
    // Simulate send (no real backend for contact form)
    setSent(true);
  };

  const channels = [
    { icon:"📸", label:"Instagram", handle:"@rajesh_1oo3",
      url:"https://instagram.com/rajesh_1oo3", color:"#e1306c" },
    { icon:"💼", label:"LinkedIn",  handle:"Rajesh Makwana",
      url:"https://www.linkedin.com/in/rajesh-makwana-397913328", color:"#0077b5" },
    { icon:"📧", label:"Email",     handle:"rajeshmakwana1003@gmail.com",
      url:null, color:"#818cf8" },
  ];

  return (
    <PageWrapper>
      <Navbar nav={nav} user={user} logout={logout} current="contact" />
      <div style={{ maxWidth:960, margin:"0 auto", padding:"60px clamp(20px,5vw,40px) 80px", position:"relative", zIndex:5 }}>

        {/* Header */}
        <div style={{ textAlign:"center", marginBottom:60 }}>
          <div style={{
            display:"inline-flex", alignItems:"center", gap:8,
            background:"rgba(245,158,11,0.12)", border:"1px solid rgba(245,158,11,0.28)",
            borderRadius:50, padding:"6px 18px", marginBottom:24,
            fontSize:13, fontWeight:600, color:"#fbbf24", fontFamily:FH,
          }}>💬 Get In Touch</div>
          <h1 style={{ fontSize:"clamp(28px,4.5vw,48px)", fontWeight:800, letterSpacing:"-2px", marginBottom:14, fontFamily:FH,
            background:"linear-gradient(135deg, #fff 0%, #a5b4fc 50%, #fbbf24 100%)",
            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
          }}>Contact Us</h1>
          <p style={{ fontSize:"clamp(14px,1.4vw,16px)", color:"rgba(255,255,255,0.45)", maxWidth:500, margin:"0 auto", lineHeight:1.75 }}>
            Have a question, bug report, or feature request? We'd love to hear from you.
          </p>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1.6fr", gap:28, alignItems:"start",
          gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))" }}>

          {/* Left: Contact channels */}
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            <div style={{
              background:"rgba(255,255,255,0.025)", border:"1px solid rgba(255,255,255,0.07)",
              borderRadius:20, padding:"28px 24px",
            }}>
              <h2 style={{ fontSize:17, fontWeight:700, fontFamily:FH, marginBottom:20, color:"#fff" }}>Other Ways to Reach</h2>
              {channels.map(c => (
                <div key={c.label} style={{ display:"flex", gap:14, alignItems:"center", marginBottom:18 }}>
                  <div style={{
                    width:44, height:44, borderRadius:12,
                    background:`${c.color}18`, border:`1px solid ${c.color}33`,
                    display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0,
                  }}>{c.icon}</div>
                  <div>
                    <div style={{ fontSize:14, fontWeight:700, fontFamily:FH, color:"#fff" }}>{c.label}</div>
                    {c.url ? (
                      <a href={c.url} target="_blank" rel="noreferrer" style={{
                        fontSize:13, color:c.color, textDecoration:"none", fontFamily:F,
                      }}
                        onMouseEnter={e=>e.currentTarget.style.textDecoration="underline"}
                        onMouseLeave={e=>e.currentTarget.style.textDecoration="none"}
                      >{c.handle}</a>
                    ) : (
                      <span style={{ fontSize:13, color:"rgba(255,255,255,0.4)" }}>{c.handle}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              background:"rgba(16,185,129,0.07)", border:"1px solid rgba(16,185,129,0.2)",
              borderRadius:20, padding:"22px 24px",
            }}>
              <div style={{ fontSize:24, marginBottom:10 }}>⏱</div>
              <div style={{ fontSize:15, fontWeight:700, fontFamily:FH, color:"#34d399", marginBottom:8 }}>Response Time</div>
              <p style={{ fontSize:13, color:"rgba(255,255,255,0.45)", lineHeight:1.7 }}>
                We typically respond within 24–48 hours on weekdays.
                For urgent queries, reach out on Instagram or LinkedIn.
              </p>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div style={{
            background:"rgba(255,255,255,0.025)", border:"1px solid rgba(255,255,255,0.07)",
            borderRadius:20, padding:"32px 28px",
          }}>
            {sent ? (
              <div style={{ textAlign:"center", padding:"40px 20px" }}>
                <div style={{ fontSize:52, marginBottom:16 }}>🎉</div>
                <h2 style={{ fontSize:22, fontWeight:800, fontFamily:FH, marginBottom:10, color:"#34d399" }}>Message Sent!</h2>
                <p style={{ color:"rgba(255,255,255,0.5)", fontSize:15, lineHeight:1.7 }}>
                  Thank you for reaching out. We'll get back to you as soon as possible.
                </p>
                <button onClick={()=>setSent(false)} style={{
                  marginTop:24, background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)",
                  color:"#fff", padding:"10px 24px", borderRadius:10, cursor:"pointer",
                  fontSize:14, fontWeight:600, fontFamily:FH,
                }}>Send Another</button>
              </div>
            ) : (
              <>
                <h2 style={{ fontSize:18, fontWeight:700, fontFamily:FH, marginBottom:24, color:"#fff" }}>Send a Message</h2>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0 16px" }}>
                  <Input label="Your Name" value={form.name} placeholder="Your Full Name"
                    onChange={e=>setForm({...form,name:e.target.value})} />
                  <Input label="Email Address" type="email" value={form.email} placeholder="you@example.com"
                    onChange={e=>setForm({...form,email:e.target.value})} />
                </div>
                <Input label="Subject" value={form.subject} placeholder="Bug report / Feature request / General"
                  onChange={e=>setForm({...form,subject:e.target.value})} />
                <Input label="Message" value={form.message} multiline
                  placeholder="Tell us more about your query or issue..."
                  onChange={e=>setForm({...form,message:e.target.value})} />
                <button onClick={handleSubmit} style={{
                  width:"100%", background:"linear-gradient(135deg, #6366f1, #10b981)",
                  border:"none", color:"#fff", padding:"13px 24px", borderRadius:12,
                  cursor:"pointer", fontSize:15, fontWeight:700, fontFamily:FH,
                  boxShadow:"0 6px 28px rgba(99,102,241,0.38)", transition:"all 0.2s",
                }}
                  onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-1px)";e.currentTarget.style.boxShadow="0 10px 36px rgba(99,102,241,0.5)";}}
                  onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 6px 28px rgba(99,102,241,0.38)";}}
                >Send Message →</button>
              </>
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

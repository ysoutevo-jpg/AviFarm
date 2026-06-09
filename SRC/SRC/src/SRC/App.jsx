import { useState } from "react";

const css = `
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:sans-serif;background:#0f1410;color:#e8f0e9;min-height:100vh;}
.app{max-width:420px;margin:0 auto;padding:16px;}
.logo{text-align:center;padding:24px 0 16px;}
.logo h1{font-size:28px;font-weight:800;color:#7ecb5a;}
.logo p{font-size:13px;color:#7a9080;margin-top:4px;}
.card{background:#1c2620;border:1px solid #2a3830;border-radius:14px;padding:16px;margin-bottom:14px;}
.card h2{font-size:16px;font-weight:700;margin-bottom:12px;color:#7ecb5a;}
.btn{width:100%;padding:14px;background:#7ecb5a;color:#0f1410;border:none;border-radius:10px;font-size:16px;font-weight:700;cursor:pointer;margin-top:8px;}
.inp{width:100%;background:#0f1410;border:1px solid #2a3830;border-radius:8px;color:#e8f0e9;font-size:16px;padding:10px 12px;margin-bottom:8px;}
.row{display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid #2a3830;font-size:13px;}
.row:last-child{border:none;}
.val{font-weight:700;color:#7ecb5a;}
.val.r{color:#e05c3a;}
.val.a{color:#f0a500;}
.big{font-size:36px;font-weight:800;text-align:center;color:#7ecb5a;padding:12px 0;}
.sub{font-size:13px;color:#7a9080;text-align:center;margin-bottom:8px;}
.task{display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid #2a3830;cursor:pointer;}
.task:last-child{border:none;}
.circle{width:24px;height:24px;border-radius:50%;border:2px solid #2a3830;display:flex;align-items:center;justify-content:center;font-size:13px;flex-shrink:0;}
.done .circle{background:#7ecb5a;border-color:#7ecb5a;color:#0f1410;}
.done .tname{text-decoration:line-through;color:#7a9080;}
.tname{font-size:13px;}
.alert{background:#e05c3a22;border:1px solid #e05c3a55;border-radius:10px;padding:12px;margin-bottom:10px;font-size:13px;color:#e05c3a;}
.ok{background:#7ecb5a22;border:1px solid #7ecb5a55;border-radius:10px;padding:12px;margin-bottom:10px;font-size:13px;color:#7ecb5a;}
.nav{display:flex;background:#161d18;border-top:1px solid #2a3830;position:fixed;bottom:0;left:0;right:0;}
.ni{flex:1;display:flex;flex-direction:column;align-items:center;padding:10px 4px;cursor:pointer;font-size:10px;color:#7a9080;gap:3px;}
.ni.active{color:#7ecb5a;}
.ni span{font-size:20px;}
.content{padding-bottom:80px;}
`;export default function App() {
  const [page, setPage] = useState("accueil");
  const [chicks, setChicks] = useState("");
  const [jour, setJour] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [tasks, setTasks] = useState({t1:false,t2:false,t3:false,t4:false,t5:false});

  const n = parseInt(chicks) || 0;
  const j = parseInt(jour) || 1;

  const feedPer1000 = [0,20,22,25,28,32,36,40,46,52,58,65,72,80,88,97,106,116,126,137,148,160,172,184,197,210,223,237,252,268,284,300,316,332,348,365,381,397,413,429,444,460,475];
  const feed = (day) => Math.round((feedPer1000[Math.min(day,42)]||475)*n/1000*10)/10;
  const water = (day) => Math.round(feed(day)*1.8*10)/10;
  const phase = j<=14?"Démarrage":j<=28?"Croissance":"Finition";
  const tempIdeal = j<=7?"32–34°C":j<=14?"28–32°C":j<=21?"26–30°C":"22–26°C";

  const countdown = () => {
    if(!arrivalDate) return null;
    const diff = Math.ceil((new Date(arrivalDate)-new Date())/(1000*60*60*24));
    return diff;
  };
  const days = countdown();

  const toggleTask = (k) => setTasks(p=>({...p,[k]:!p[k]}));return (
        <>
              <style>{css}</style>
                    <div className="app">
                            <div className="logo">
                                      <h1>🐔 AviFarm</h1>
                                                <p>Gestion Poulets de Chair</p>
                                                        </div>
                                                                <div className="content">

                                                                          {page==="accueil" && (
                                                                                      <div>
                                                                                                    <div className="card">
                                                                                                                    <h2>⚙️ Mon élevage</h2>
                                                                                                                                    <input className="inp" type="number" placeholder="Nombre de poussins" value={chicks} onChange={e=>setChicks(e.target.value)}/>
                                                                                                                                                    <input className="inp" type="number" placeholder="Jour actuel (ex: 1)" value={jour} onChange={e=>setJour(e.target.value)}/>
                                                                                                                                                                    {n>0 && j>0 && (
                                                                                                                                                                                      <div>
                                                                                                                                                                                                          <div className="row"><span>Phase</span><span className="val">{phase}</span></div>
                                                                                                                                                                                                                              <div className="row"><span>Aliment aujourd'hui</span><span className="val">{feed(j)} kg</span></div>
                                                                                                                                                                                                                                                  <div className="row"><span>Eau aujourd'hui</span><span className="val">{water(j)} L</span></div>
                                                                                                                                                                                                                                                                      <div className="row"><span>Température idéale</span><span className="val">{tempIdeal}</span></div>
                                                                                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                                                                                                        )}
                                                                                                                                                                                                                                                                                                                      </div>
                                                                                                                                                                                                                                                                                                                                    <div className="card">
                                                                                                                                                                                                                                                                                                                                                    <h2>📅 Arrivée des poussins</h2>
                                                                                                                                                                                                                                                                                                                                                                    <input className="inp" type="date" value={arrivalDate} onChange={e=>setArrivalDate(e.target.value)}/>
                                                                                                                                                                                                                                                                                                                                                                                    {days!==null && days>0 && <div className="alert">⏳ Arrivée dans <b>{days} jours</b> — Préparez le bâtiment !</div>}
                                                                                                                                                                                                                                                                                                                                                                                                    {days!==null && days===0 && <div className="ok">🐣 Les poussins arrivent AUJOURD'HUI !</div>}
                                                                                                                                                                                                                                                                                                                                                                                                                    {days!==null && days<0 && <div className="ok">✅ Élevage en cours — Jour {j}</div>}
                                                                                                                                                                                                                                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                        )}{page==="programme" && (
            <div className="card">
              <h2>📋 Programme Jour {j}</h2>
              {n===0 && <div className="alert">⚠️ Entrez votre nombre de poussins dans Accueil</div>}
              {n>0 && (
                <div>
                  <div className="big">{feed(j)} kg</div>
                  <div className="sub">d'aliment pour {n} poulets</div>
                  <div className="row"><span>💧 Eau</span><span className="val">{water(j)} L</span></div>
                  <div className="row"><span>🌡️ Température</span><span className="val">{tempIdeal}</span></div>
                  <div className="row"><span>📊 Phase</span><span className="val">{phase}</span></div>
                  <div className="row"><span>💡 Lumière</span><span className="val">{j<=7?"24h":j<=14?"22h":j<=21?"20h":"16h"}</span></div>
                </div>
              )}
              <h2 style={{marginTop:14}}>✅ Tâches du jour</h2>
              {[
                {k:"t1",ico:"🌡️",txt:"Vérifier la température"},
                {k:"t2",ico:"💧",txt:"Nettoyer les abreuvoirs"},
                {k:"t3",ico:"🌾",txt:`Distribuer ${feed(j)} kg d'aliment`},
                {k:"t4",ico:"💡",txt:"Vérifier l'éclairage"},
                {k:"t5",ico:"👁️",txt:"Observer le comportement"},
              ].map(t=>(
                <div key={t.k} className={`task ${tasks[t.k]?"done":""}`} onClick={()=>toggleTask(t.k)}>
                  <div className="circle">{tasks[t.k]?"✓":""}</div>
                  <span className="tname">{t.ico} {t.txt}</span>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
      <div className="nav">
        <div className={`ni ${page==="accueil"?"active":""}`} onClick={()=>setPage("accueil")}>
          <span>🏠</span>Accueil
        </div>
        <div className={`ni ${page==="programme"?"active":""}`} onClick={()=>setPage("programme")}>
          <span>📋</span>Programme
        </div>
      </div>
    </>
  );
}
  
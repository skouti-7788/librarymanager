export default function Dashboard({books,members,loans}){
  const totalBooks=books.reduce((s,b)=>s+b.qte,0);
  const available=books.reduce((s,b)=>s+b.disponibilite,0);
  const borrowed=totalBooks-available;
  const overdue=loans.filter(l=>l.status==="retard").length;
  const monthly=[{m:"Sep",v:12},{m:"Oct",v:18},{m:"Nov",v:15},{m:"Déc",v:8},{m:"Jan",v:22},{m:"Fév",v:14}];
  const maxV=Math.max(...monthly.map(d=>d.v));
  const recentLoans=[...loans].reverse().slice(0,4);
  return (
    <div>
      <div className="stats-grid">
        {[["📚","Total Livres",totalBooks],["👥","Adhérents",members?.length || 0],["✅","Disponibles",available],["📤","Empruntés",borrowed]].map(([ic,lb,vl])=>(
          <div key={lb} className="stat-card"><div className="stat-icon">{ic}</div><div className="stat-val">{vl}</div><div className="stat-lbl">{lb}</div></div>
        ))}
      </div>
      <div className="dash-grid">
        <div className="dash-card">
          <h3>📈 Emprunts par mois</h3>
          <div className="bar-chart">
            {monthly.map(d=>(
              <div key={d.m} className="bar-wrap">
                <div className="bar-v">{d.v}</div>
                <div className="bar" style={{height:`${(d.v/maxV)*100}%`}}></div>
                <div className="bar-lbl">{d.m}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="dash-card">
          <h3>🕐 Derniers Emprunts</h3>
          {recentLoans.map(l=>{
            const bk=books?.find(b=>b.id===l.bookId);
            const mb=members?.find(m=>m.id===l.memberId);
            return (
              <div key={l.id} className="r-item">
                <div className={`r-icon ${l.status==="retard"?"ic-loan":"ic-book"}`}>{l.status==="retourné"?"✅":l.status==="retard"?"⚠️":"📖"}</div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:600,fontSize:".87rem"}}>{bk?.title}</div>
                  <div style={{fontSize:".77rem",color:"var(--brown-mid)"}}>{mb?.nom} · {l.borrowDate}</div>
                </div>
                <span className={`badge ${l.status=== 1?"b-active":l.status==="retard"?"b-over":"b-ret"}`}>{l.status=== 1?"Actif":l.status==="retard"?"Retard":"Retourné"}</span>
              </div>
            );
          })}
        </div>
        <div className="dash-card">
          <h3>🔔 Alertes</h3>
          {overdue>0&&<div className="r-item">
            <div className="r-icon ic-loan">⚠️</div>
               <div>
                  <strong style={{fontSize:".9rem"}}>{overdue} emprunt(s) en retard</strong>
                  <div style={{fontSize:".77rem",color:"var(--brown-mid)"}}>Adhérents dépassant la date de retour</div>
               </div>
            </div>}
          <div className="r-item">
            <div className="r-icon ic-book">📤</div>
            <div>
              <strong style={{fontSize:".9rem"}}>{loans.filter(l=>l.status=== 1).length} emprunts actifs</strong>
            <div style={{fontSize:".77rem",color:"var(--brown-mid)"}}>En cours dans la bibliothèque</div>
            </div></div>
          {overdue===0&&<div className="r-item">
            <div className="r-icon ic-user">✅</div>
            <div style={{fontSize:".88rem"}}>Aucun retard signalé</div>
            </div>}
        </div>
        <div className="dash-card">
          <h3>🏆 Livres les + empruntés</h3>
          {books?.slice(0,4).map((b,i)=>(
            <div key={b.id} className="r-item">
              <div style={{width:30,textAlign:"center",fontWeight:700,color:"var(--gold)",fontSize:".95rem"}}>#{i+1}</div>
              <div style={{flex:1}}>
                <div style={{fontWeight:600,fontSize:".87rem"}}>{b.title}</div>
                <div style={{fontSize:".77rem",color:"var(--brown-mid)"}}>{b.author}</div>
              </div>
              <div style={{fontSize:".77rem",color:"var(--brown-mid)"}}>{b.quantity-b.available} empr.</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
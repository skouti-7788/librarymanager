import { useState } from "react";
export default function Loans({loans,setLoans,books,setBooks,members,showToast}){
  const [filter,setFilter]=useState("");
  const [modal,setModal]=useState(null);
  const [sel,setSel]=useState(null);
  const [form,setForm]=useState({bookId:"",memberId:"",borrowDate:"",dueDate:""});

  const overdueDays=due=>{const d=Math.floor((new Date()-new Date(due))/(1000*60*60*24));return d>0?d:0};

  const filtered=loans.filter(l=>{
    const bk=books.find(b=>b.id===l.bookId);
    const mb=members.find(m=>m.id===l.memberId);
    const q=filter.toLowerCase();
    return!q||bk?.title.toLowerCase().includes(q)||mb?.name.toLowerCase().includes(q);
  });

  const close=()=>{setModal(null);setSel(null)};
  const openAdd=()=>{
    const today=new Date().toISOString().split("T")[0];
    const due=new Date(Date.now()+14*86400000).toISOString().split("T")[0];
    setForm({bookId:books.find(b=>b.available>0)?.id||"",memberId:members.find(m=>m.status==="actif")?.id||"",borrowDate:today,dueDate:due});
    setModal("add");
  };
  const openDel=l=>{setSel(l);setModal("del")};

  const doReturn=l=>{
    setLoans(p=>p.map(x=>x.id===l.id?{...x,returnDate:new Date().toISOString().split("T")[0],status:"retourné"}:x));
    setBooks(p=>p.map(b=>b.id===l.bookId?{...b,available:b.available+1}:b));
    showToast("Livre retourné avec succès","success");
  };

  const save=()=>{
    const bk=books.find(b=>b.id===+form.bookId);
    if(!form.bookId||!form.memberId){showToast("Livre et adhérent requis","error");return}
    if(!bk||bk.available===0){showToast("Ce livre n'est pas disponible","error");return}
    setLoans(p=>[...p,{...form,id:Date.now(),bookId:+form.bookId,memberId:+form.memberId,returnDate:null,status:"actif"}]);
    setBooks(p=>p.map(b=>b.id===+form.bookId?{...b,available:b.available-1}:b));
    showToast("Emprunt enregistré","success");
    close();
  };

  const del=()=>{
    if(sel.status!=="retourné") setBooks(p=>p.map(b=>b.id===sel.bookId?{...b,available:b.available+1}:b));
    setLoans(p=>p.filter(l=>l.id!==sel.id));
    showToast("Emprunt supprimé","success");
    close();
  };

  return (
    <div>
      <div className="t-card">
        <div className="t-head">
          <h2>📤 Gestion des Emprunts</h2>
          <div className="search-row">
            <input className="si" placeholder="Titre, adhérent…" value={filter} onChange={e=>setFilter(e.target.value)}/>
            <button className="btn-add" onClick={openAdd}>+ Nouvel Emprunt</button>
          </div>
        </div>
        <table>
          <thead><tr><th>Livre</th><th>Adhérent</th><th>Emprunt</th><th>Retour Prévu</th><th>Retour Effectif</th><th>Retard</th><th>Statut</th><th>Actions</th></tr></thead>
          <tbody>
            {filtered.length===0?(<tr><td colSpan="8"><div className="empty"><div className="ei">📋</div><p>Aucun emprunt</p></div></td></tr>):
            filtered.map(l=>{
              const bk=books.find(b=>b.id===l.bookId);
              const mb=members.find(m=>m.id===l.memberId);
              const od=l.status!=="retourné"?overdueDays(l.dueDate):0;
              return (
                <tr key={l.id}>
                  <td><strong>{bk?.title||"—"}</strong></td>
                  <td>{mb?.name||"—"}</td>
                  <td>{l.borrowDate}</td><td>{l.dueDate}</td>
                  <td>{l.returnDate||<span style={{color:"var(--brown-mid)",fontSize:".82rem"}}>En attente</span>}</td>
                  <td>{od>0?<span style={{color:"var(--rust)",fontWeight:600}}>+{od}j</span>:"—"}</td>
                  <td><span className={`badge ${l.status==="actif"?"b-active":l.status==="retard"?"b-over":"b-ret"}`}>{l.status}</span></td>
                  <td><div className="row-acts">
                    {l.status!=="retourné"&&<button className="bi bi-r" title="Retourner" onClick={()=>doReturn(l)}>↩️</button>}
                    <button className="bi bi-d" onClick={()=>openDel(l)}>🗑️</button>
                  </div></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {modal==="add"&&(
        <div className="overlay" onClick={close}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div className="modal-h"><h3>Nouvel Emprunt</h3><button className="btn-x" onClick={close}>✕</button></div>
            <div className="form-group"><label>Livre *</label>
              <select value={form.bookId} onChange={e=>setForm(p=>({...p,bookId:e.target.value}))}>
                <option value="">-- Sélectionner --</option>
                {books.filter(b=>b.available>0).map(b=><option key={b.id} value={b.id}>{b.title} ({b.available} dispo.)</option>)}
              </select>
            </div>
            <div className="form-group"><label>Adhérent *</label>
              <select value={form.memberId} onChange={e=>setForm(p=>({...p,memberId:e.target.value}))}>
                <option value="">-- Sélectionner --</option>
                {members.filter(m=>m.status==="actif").map(m=><option key={m.id} value={m.id}>{m.name}</option>)}
              </select>
            </div>
            <div className="grid2">
              <div className="form-group"><label>Date d'emprunt</label><input type="date" value={form.borrowDate} onChange={e=>setForm(p=>({...p,borrowDate:e.target.value}))}/></div>
              <div className="form-group"><label>Retour prévu</label><input type="date" value={form.dueDate} onChange={e=>setForm(p=>({...p,dueDate:e.target.value}))}/></div>
            </div>
            <div className="modal-f"><button className="btn-sec" onClick={close}>Annuler</button><button className="btn-sub" onClick={save}>Enregistrer</button></div>
          </div>
        </div>
      )}
      {modal==="del"&&(
        <div className="overlay" onClick={close}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div className="modal-h"><h3>Supprimer l'Emprunt</h3><button className="btn-x" onClick={close}>✕</button></div>
            <p className="confirm-txt">Supprimer cet emprunt ? Si non retourné, le livre sera remis en disponibilité.</p>
            <div className="modal-f"><button className="btn-sec" onClick={close}>Annuler</button><button className="btn-del" onClick={del}>Supprimer</button></div>
          </div>
        </div>
      )}
    </div>
  );
}

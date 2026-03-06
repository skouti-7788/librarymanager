import { useState } from "react";
import useBooks,{ CATS } from "../data/databese";
export default function Books({books,setBooks,showToast}){
  const [search,setSearch]=useState("");
  const [cat,setCat]=useState("");
  const [avail,setAvail]=useState("");
  const [modal,setModal]=useState(null);
  const [sel,setSel]=useState(null);
  const [form,setForm]=useState({titre:"",auteur:"",isbn:"",categorie:CATS[0],qte:1,annee:""});
  const [page,setPage]=useState(1);
  const PER=5;
  const {addBook,updateBook,deleteBook} = useBooks();
  const filtered=books?.filter(b=>{
    const q=search.toLowerCase();
    return(!q||b.titre.toLowerCase().includes(q)||b.auteur.toLowerCase().includes(q)||b.isbn.includes(q))
      &&(!cat||b.categorie===cat)
      &&(!avail||(avail==="dispo"?b.disponibilite>0:b.disponibilite===0));
  });
  const pages=Math.ceil(filtered.length/PER);
  const paged=filtered.slice((page-1)*PER,page*PER);

  const close=()=>{setModal(null);setSel(null)};
  const openAdd=()=>{setForm({titre:"",auteur:"",isbn:"",categorie:CATS[0],qte:1,annee:"",disponibilite:1});setModal("add")};
  const openEdit=b=>{setSel(b);setForm({...b});setModal("edit")};
  const openDel=b=>{setSel(b);setModal("del")};

  const save=()=>{
    if(!form.titre||!form.auteur){showToast("Titre et auteur requis","error");return}
    if(modal==="add"){
      setBooks(p=>[...p,{...form,id:Date.now(),qte:+form.qte,disponibilite:+form.qte}]);
      showToast("Livre ajouté","success");
      addBook(form);
    } else {
      const borrowed=sel.qte-sel.disponibilite;
      setBooks(p=>p.map(b=>b.id===sel.id?{...b,...form,qte:+form.qte,disponibilite:Math.max(0,+form.qte-borrowed)}:b));
      showToast("Livre mis à jour","success");
      updateBook(sel.id,form);
    }
    close();
    
  };
  const del=()=>{setBooks(p=>p.filter(b=>b.id!==sel.id));showToast("Livre supprimé","success");close()};

  return (
    <div>
      <div className="t-card">
        <div className="t-head">
          <h2>📚 Catalogue des Livres</h2>
          <div className="search-row">
            <input className="si" placeholder="Titre, auteur, ISBN…" value={search} onChange={e=>{setSearch(e.target.value);setPage(1)}}/>
            <select className="sel" value={cat} onChange={e=>{setCat(e.target.value);setPage(1)}}>
              <option value="">Toutes catégories</option>
              {CATS.map(c=><option key={c}>{c}</option>)}
            </select>
            <select className="sel" value={avail} onChange={e=>{setAvail(e.target.value);setPage(1)}}>
              <option value="">Disponibilité</option><option value="dispo">Disponible</option><option value="indispo">Indisponible</option>
            </select>
            <button className="btn-add" onClick={openAdd}>+ Ajouter</button>
          </div>
        </div>
        <table>
          <thead><tr><th>Titre</th><th>Auteur</th><th>ISBN</th><th>Catégorie</th><th>Année</th><th>Qté</th><th>Dispo.</th><th>Statut</th><th>Actions</th></tr></thead>
          <tbody>
            {paged.length===0?(<tr><td colSpan="9"><div className="empty"><div className="ei">🔍</div><p>Aucun livre trouvé</p></div></td></tr>):
            paged.map(b=>(
              <tr key={b.id}>
                <td><strong>{b.titre}</strong></td>
                <td>{b.auteur}</td>
                <td style={{fontFamily:"monospace",fontSize:".8rem"}}>{b.isbn}</td>
                <td><span className="badge b-cat">{b.categorie}</span></td>
                <td>{b.annee}</td><td>{b.qte}</td><td>{b.disponibilite}</td>
                <td><span className={`badge ${b.disponibilite>0?"b-avail":"b-borrow"}`}>{b.disponibilite>0?"Disponible":"Emprunté"}</span></td>
                <td><div className="row-acts"><button className="bi bi-e" onClick={()=>openEdit(b)}>✏️</button><button className="bi bi-d" onClick={()=>{openDel(b);deleteBook(b.id)}}>🗑️</button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
        {pages>1&&<div className="pagi"><span className="pinfo">{filtered.length} livre(s) · Page {page}/{pages}</span>{Array.from({length:pages},(_,i)=>i+1).map(p=><button key={p} className={`pb${p===page?" active":""}`} onClick={()=>setPage(p)}>{p}</button>)}</div>}
      </div>

      {(modal==="add"||modal==="edit")&&(
        <div className="overlay" onClick={close}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div className="modal-h"><h3>{modal==="add"?"Ajouter un Livre":"Modifier le Livre"}</h3><button className="btn-x" onClick={close}>✕</button></div>
            {[["titre","Titre *"],["auteur","Auteur *"],["isbn","ISBN"]].map(([f,l])=>(
              <div key={f} className="form-group"><label>{l}</label><input value={form[f]||""} onChange={e=>setForm(p=>({...p,[f]:e.target.value}))}/></div>
            ))}
            <div className="form-group"><label>Catégorie</label><select value={form.categorie} onChange={e=>setForm(p=>({...p,categorie:e.target.value}))}>{CATS.map(c=><option key={c}>{c}</option>)}</select></div>
            <div className="grid2">
              <div className="form-group"><label>Quantité</label><input type="number" min="1" value={form.qte} onChange={e=>setForm(p=>({...p,qte:e.target.value}))}/></div>
              <div className="form-group"><label>Année</label><input type="number" value={form.annee||""} onChange={e=>setForm(p=>({...p,annee:e.target.value}))}/></div>
              <div className="form-group"><label>Disponibilité</label><input type="number" min="0" value={form.disponibilite} onChange={e=>setForm(p=>({...p,disponibilite:e.target.value}))}/></div>
            </div>
            <div className="modal-f"><button className="btn-sec" onClick={close}>Annuler</button><button className="btn-sub" onClick={save}>{modal==="add"?"Ajouter":"Enregistrer"}</button></div>
          </div>
        </div>
      )}
      {modal==="del"&&(
        <div className="overlay" onClick={close}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div className="modal-h"><h3>Supprimer le Livre</h3><button className="btn-x" onClick={close}>✕</button></div>
            <p className="confirm-txt">Supprimer <strong>"{sel?.titre}"</strong> ? Cette action est irréversible.</p>
            <div className="modal-f"><button className="btn-sec" onClick={close}>Annuler</button><button className="btn-del" onClick={del}>Supprimer</button></div>
          </div>
        </div>
      )}
     </div>
  );
}

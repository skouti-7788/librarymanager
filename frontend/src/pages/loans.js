import { useState, useEffect } from "react";
import { useEmprunts } from "../data/databese";

export default function Loans({ loans, setLoans,setMembers, books, setBooks, members, showToast }) {
  const { addEmprunts, updateEmprunts, deleteEmprunts } = useEmprunts();
  const [showadd,setShowAdd] = useState(false);
  const [idDel,setIdDel] = useState('')
  const [searsh,setSearsh] = useState('');
  const [okDel,setOkDel] = useState(false);
  const [update,setUpdate] = useState({});
  const [form,setForm] = useState(
        {livre:'',
         adherent:'',
         date_emprunt:'',
         date_retour_prevue:'',
         date_retour_effective: null,
         })
         console.log(update.retard)
  const hendleAdd = ()=>{
        addEmprunts(form)
        setLoans([...loans,form])
  }
  const retourner = (id,l)=>{
        const retour_prevue = new Date(l.date_retour_prevue);
        const today = new Date();
        const retar = retour_prevue - today;
        const retardday = Math.ceil(retar/(1000 * 60 * 60 * 24))+ "J";
        setUpdate({
         id:id,
         livre:l.livre,
         adherent:l.adherent,
         date_emprunt:l.date_emprunt,
         date_retour_prevue:l.date_retour_prevue,
         date_retour_effective:today.toISOString().slice(0, 10),
         status:'Retourner',
         retard:retardday 
        })
        setLoans(loans.map((l)=> l.id ===id ? {...l, date_retour_effective: new Date().toISOString().slice(0, 10)
                  ,status:'Retourner',retard:retardday}:l))
  }
   useEffect(()=>{
        if(update && update.id){updateEmprunts(update.id,update)} 
        },[update])
  const hendledelete = (id)=>{
        setOkDel(true);
        setIdDel(id)
  }
  const okDelete = ()=>{
        deleteEmprunts(idDel);
        setLoans(loans.filter((l)=>l.id !== idDel));
        setOkDel(false)
  }
  const filterSearsh = loans.filter((l)=> l.adherent.toLowerCase().includes(searsh) || l.livre.toLowerCase().includes(searsh))
  console.log(filterSearsh)
  return (
    <div>
      {/* ── Card ── */}bonsoir professeur Houcine j'ai fini que exercice 5 et push dan
      <div className="t-card">

        {/* Header */}
        <div className="t-head">
          <h2>📤 Gestion des Emprunts</h2>
          <div className="search-row">
            <input
              value={searsh}
              onChange={(e)=>setSearsh(e.target.value)}
              className="si"
              placeholder="Titre, adhérent…"
             />
            <button className="btn-add" onClick={()=> setShowAdd(true)} >+ Nouvel Emprunt</button>
          </div>
        </div>

        {/* Table */}
        <table>
          <thead>
            <tr>
              <th>Livre</th>
              <th>Adhérent</th>
              <th>Date Emprunt</th>
              <th>Retour Prévu</th>
              <th>Retour Effectif</th>
              <th>Retard</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
               {filterSearsh.length === 0?(<tr>
                <td colSpan="8">
                  <div className="empty">
                    <div className="ei">📋</div>
                    <p>Aucun emprunt</p>
                  </div>
                </td>
              </tr>):(
             
                  filterSearsh.map((l)=><tr  key={l.id}>
                    <td><strong>{l.livre}</strong></td>
                    <td> {l.adherent}</td>
                    <td>{l.date_emprunt} </td>
                    <td>{l.date_retour_prevue} </td>
                    <td>{l.date_retour_effective}</td>
                    <td>{l.retard}</td>
                    <td> <span> {l.status} </span> </td>
                    <td>
                      <div className="row-acts">
                          {l.status !== 'Retourner'&&
                            <p
                             className="bi bi-r" title="Retourner" onClick={()=>{retourner(l.id,l)}} >
                            ↩️
                           </p>}
                        <p className="bi bi-d" onClick={()=>hendledelete(l.id)} >🗑️</p>
                      </div>
                    </td>
                  </tr>))}
                
          </tbody>
        </table>
      </div>

      {/* ── Add Modal ── */}
        {showadd &&<div className="overlay"  >
          <div className="modal"  >

            <div className="modal-h">
              <h3>Nouvel Emprunt</h3>
              <button className="btn-x" onClick={()=> setShowAdd(false)}>✕</button>
            </div>

            <div className="form-group">
              <label>Livre </label>
              <select
                  value={form.livre}
                  onChange={(e)=> setForm({...form,livre:e.target.value})}
              >
                <option value="">-- Sélectionner --</option>
                   {books.map((b)=>
                    loans.find((l)=>l.livre === b.titre)?'':<option key={b.id} value={b.titre}>{b.titre}</option>)}
               </select>
            </div>

            <div className="form-group">
              <label>Adhérent </label>
              <select value={form.adherent}
                  onChange={(e)=> setForm({...form,adherent:e.target.value})}
               >
                <option value="">-- Sélectionner --</option>
                   {members.map((m)=>
                    loans.find((l)=>l.adherent === m.nom)?'':<option  key={m.id}  value={m.nom}>{m.nom}</option>)}
               </select>
            </div>

            <div className="grid2">
              <div className="form-group">
                <label>Date d'emprunt</label>
                <input
                  value={form.date_emprunt}
                  onChange={(e)=> setForm({...form,date_emprunt:e.target.value})}
                  type="date"
                />
              </div>
              <div className="form-group">
                <label>Retour prévu</label>
                <input 
                  value={form.date_retour_prevue}
                  onChange={(e)=> setForm({...form,date_retour_prevue:e.target.value})}
                  type="date"
                 />
              </div>
            </div>

            <div className="modal-f">
              <button className="btn-sec" onClick={()=> setShowAdd(false)}>Annuler</button>
              <button className="btn-sub" onClick={hendleAdd} >Enregistrer</button>
            </div>

          </div>
        </div>}
 
      {/* ── Delete Modal ── */}
        {okDel&&<div className="overlay"  >
          <div className="modal"  >

            <div className="modal-h">
              <h3>Supprimer l'Emprunt</h3>
              <button className="btn-x" onClick={()=>setOkDel(false)}>✕</button>
            </div>

            <p className="confirm-txt">
              Supprimer cet emprunt ? Si non retourné, le livre sera remis en disponibilité.
            </p>

            <div className="modal-f">
              <button className="btn-sec" onClick={()=>setOkDel(false)} >Annuler</button>
              <button className="btn-del"onClick={okDelete}  >Supprimer</button>
            </div>

          </div> 
        </div> }
     </div>
  );
}
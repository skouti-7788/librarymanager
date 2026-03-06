import { useState, useCallback, useEffect } from "react";
import {  initLoans } from "./data/databese";
import useBooks  from "./data/databese"
import useAdherents from "./data/databese"
import Dashboard from "./pages/dashbord";
import Books from "./pages/books";
import Members from "./pages/mambers";
import Loans from "./pages/loans";
import Login from "./pages/login";
import Toasts from "./components/toasts";
import "./style.css";
export default function App(){
  const {book} = useBooks();
  const {Adherent} = useAdherents();
  const [auth,setAuth]=useState(false);
  const [page,setPage]=useState("dashboard");
  const [books,setBooks]=useState(null);
  const [members,setMembers]=useState(null);
   console.log(members)
  useEffect(() => {
    setBooks(book);
    setMembers(Adherent);
    // setLoans(initLoans);
  }, [book, Adherent]);
 
  const [loans,setLoans]=useState(initLoans);
  const [toasts,setToasts]=useState([]);
  
  const showToast=useCallback((message,type="success")=>{
    const id=Date.now();
    setToasts(t=>[...t,{id,message,type}]);
    setTimeout(()=>setToasts(t=>t.filter(x=>x.id!==id)),3000);
  },[]);

  const nav=[
    {id:"dashboard",label:"Tableau de bord",icon:"🏠"},
    {id:"books",label:"Livres",icon:"📚"},
    {id:"members",label:"Adhérents",icon:"👥"},
    {id:"loans",label:"Emprunts",icon:"📤"},
  ];
  const titles={dashboard:"Tableau de Bord",books:"Catalogue des Livres",members:"Gestion des Adhérents",loans:"Gestion des Emprunts"};
  const today=new Date().toLocaleDateString("fr-FR",{weekday:"long",year:"numeric",month:"long",day:"numeric"});

  if(!auth) return <><Login onLogin={()=>setAuth(true)}/><Toasts toasts={toasts}/></>;

  return (
    <>
      <div className="app">
        <aside className="sidebar">
          <div className="sb-logo"><h2>📚 LibraryManager</h2><span>Administration</span></div>
          <nav className="sb-nav">
            <div className="nav-section">Navigation</div>
            {nav.map(n=>(
              <div key={n.id} className={`nav-item${page===n.id?" active":""}`} onClick={()=>setPage(n.id)}>
                <span className="nav-icon">{n.icon}</span>{n.label}
              </div>
            ))}
          </nav>
          <div className="sb-footer">
            <div className="sb-user">
              <div className="avatar">AD</div>
              <div><span>Administrateur</span><small>admin@library.ma</small></div>
            </div>
            <button className="btn-logout" onClick={()=>setAuth(false)}>🚪 Se déconnecter</button>
          </div>
        </aside>
        <div className="main">
          <header className="topbar">
            <h1>{titles[page]}</h1>
            <span className="topbar-date">{today}</span>
          </header>
          <main className="page">
            {page==="dashboard"&&<Dashboard books={books} members={members} loans={loans}/>}
            {page==="books"&&<Books books={books} setBooks={setBooks} showToast={showToast}/>}
            {page==="members"&&<Members members={members} setMembers={setMembers} showToast={showToast}/>}
            {page==="loans"&&<Loans loans={loans} setLoans={setLoans} books={books} setBooks={setBooks} members={members} showToast={showToast}/>}
          </main>
        </div>
      </div>
      <Toasts toasts={toasts}/>
    </>
  );
}

 
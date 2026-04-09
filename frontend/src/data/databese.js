import { useEffect, useState } from "react";
import axios from  "axios";
export  const CATS = ["Roman","Science","Histoire","Informatique","Philosophie","Art","Jeunesse","Biographie"];
export default function useBooks() {
  const [book, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/livres");

        // const mapped = res.data.map(b => ({
        //   id: b.id,
        //   titre: b.titre ?? "",
        //   auteur: b.auteur ?? "",
        //   isbn: b.isbn ?? "",
        //   categorie: b.categorie ?? "",
        //   annee: b.annee ?? "",
        //   qte: Number(b.qte) || 0,
        //   disponibilite: Number(b.disponibilite) || 0,
        //   status: b.status ?? ""
        // }));

        setBooks(res.data.livres);
        // console.log(res.data.livres);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchBooks();
  }, []);


  // ➕ ADD
   const addBook = async (form) => {
    const payload = {
      titre: form.titre || '--',
      auteur: form.auteur|| '--',
      isbn: form.isbn|| '--',
      categorie: form.categorie|| '--',
      annee: form.annee|| '--',
      qte: form.qte|| 0,
      disponibilite: form.disponibilite|| 0,
      status: form.status 
    };
    const res = await axios.post(
      "http://127.0.0.1:8000/api/livres",
      payload
    );

    setBooks(prev => [...prev, res.data]);
  };

  // ✏️ UPDATE
  const updateBook = async (id, form) => {
  try {
    const res = await axios.put(
      `http://127.0.0.1:8000/api/livres/${id}`,
      {
        titre: form.titre,
        auteur: form.auteur,
        isbn: form.isbn,
        categorie: form.categorie,
        annee: form.annee ? Number(form.annee) : null,
        qte: Number(form.qte),
        disponibilite: Number(form.disponibilite),
        status: form.status 

      }
    );

    // ✅ Update state avec la réponse du backend
    setBooks(prev =>
      prev.map(b =>
        b.id === id ? res.data : b
      )
    );
  } catch (err) {
    console.error("Erreur update livre :", err.response?.data || err);
  }
  };

  // 🗑️ DELETE
  const deleteBook = async (id) => {
  try {
    await axios.delete(`http://127.0.0.1:8000/api/livres/${id}`);

    setBooks(prev => prev.filter(b => b.id !== id));
   } catch (err) {
     console.error(err.response?.data || err.message);
  }
};

  return { book, addBook, updateBook, deleteBook };
};
//===================================== function Adherents=======================================
export   function useAdherents() {
  const [Adherent, setAdherent] = useState([]);
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/adherents");
        const mapped = res.data.map(b => ({
          id: b.id,
          livre:b.livre ?? "",
          nom: b.nom ?? "",
          email: b.email ?? "",
          phone: b.phone ?? "",
          disponibilite: b.disponibilite ?? "",
          status: b.status ?? "",
          retard:b.retard ?? ""
         }));

        setAdherent(mapped);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchBooks();
  }, []);
 

  // ➕ ADD
   const addAdherent = async (form) => {
    try{
    const res = await axios.post(
      "http://127.0.0.1:8000/api/adherents",
      {
      nom: form.nom,
      livre: form.livre,
      email: form.email,
      phone: form.phone,
      datadahestion:  new Date().toISOString().split('T')[0],
      status: form.status 
      });
      
    setAdherent(prev => [...prev, res.data]);
    }catch(err){
          console.error("Erreur add adherent :", err.response?.data || err);
      //  console.log('Status:', error.response.status);
      //  console.log('Error data:', error.response.data);  
      //  console.log('Headers:', error.response.headers);
    }
  };

  // ✏️ UPDATE
  const updateAdherent = async (id, form) => {
  try {
    console.log(form)
    const res = await axios.put(
      `http://127.0.0.1:8000/api/adherents/${id}`,
      {
        nom: form.nom,
        livre: form.livre,
        email: form.email,
        phone: form.phone,
        datadahestion:  new Date().toISOString().split('T')[0],
        status: form.status ,
        // retard:form.retard
 
      }
    );

    // ✅ Update state avec la réponse du backend
    setAdherent(prev =>
      prev.map(b =>
        b.id === id ? res.data : b
      )
    );
  } catch (err) {
    console.error("Erreur update adherent :", err.response?.data || err);
  }
  };

  // 🗑️ DELETE
  const deleteAdherent = async (id) => {
  try {
    await axios.delete(`http://127.0.0.1:8000/api/adherents/${id}`);

    setAdherent(prev => prev.filter(b => b.id !== id));
   } catch (err) {
     console.error(err.response?.data || err.message);
  }
};
  return { Adherent, addAdherent, updateAdherent, deleteAdherent };
}
//==================================function useEmprunts ===========================================
const apiEmprunts = "http://127.0.0.1:8000/api/emprunts"
export  function  useEmprunts(){
  const [emprunts, setEmprunts] = useState([]);
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(apiEmprunts);
        const mapped = res.data.map(b => ({
          id: b.id,
          livre:b.livre,
          adherent: b.adherent ?? "",
          date_emprunt:b.date_emprunt ?? '',
          date_retour_prevue: b.date_retour_prevue ?? "",
          date_retour_effective: b.date_retour_effective ,
          status:b.status,
          retard:b.retard
         }));

        setEmprunts(mapped);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchBooks();
  }, []);
 

  // ➕ ADD
   const addEmprunts = async (form) => {
    try{
     const payload = {
      id: form.id,
      livre:form.livre,
      adherent: form.adherent ?? "",
      date_emprunt:form.date_emprunt ?? '',
      date_retour_prevue: form.date_retour_prevue ?? "",
      };
    const res = await axios.post(
      apiEmprunts,
      payload
    );

    setEmprunts(prev => [...prev, res.data]); 
  } catch (err) {
    console.error("Erreur add adherent :", err.response?.data || err);
  }
  };
 

  // ✏️ UPDATE
  const updateEmprunts = async (id,form) => {
  try {
     console.log(form)
     const res = await axios.put(
      `${apiEmprunts}/${id}`,form
      // {
      //   id: form.id,
      //   livre:form.livre,
      //   adherent: form.adherent ?? "",
      //   date_emprunt:form.date_emprunt ?? '',
      //   date_retour_prevue: form.date_retour_prevue ?? "",
      //   date_retour_effective: form.date_retour_effective ?? null
      // }
    );

    // ✅ Update state avec la réponse du backend
    setEmprunts(prev =>
      prev.map(b =>
        b.id === id ? res.data : b
      )
    );
  } catch (err) {
    console.error("Erreur update adherent :", err.response?.data || err);
  }
  };

  // 🗑️ DELETE
  const deleteEmprunts = async (id) => {
  try {
    await axios.delete(`${apiEmprunts}/${id}`);

    setEmprunts(prev => prev.filter(b => b.id !== id));
   } catch (err) {
     console.error(err.response?.data || err.message);
  }
};

  return { emprunts, addEmprunts, updateEmprunts, deleteEmprunts };

} 
 
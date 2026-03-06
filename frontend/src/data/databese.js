import { useEffect, useState } from "react";
import axios from  "axios";
export  const CATS = ["Roman","Science","Histoire","Informatique","Philosophie","Art","Jeunesse","Biographie"];
export default function useBooks() {
  const [book, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/livres");

        const mapped = res.data.map(b => ({
          id: b.id,
          titre: b.titre ?? "",
          auteur: b.auteur ?? "",
          isbn: b.isbn ?? "",
          categorie: b.categorie ?? "",
          annee: b.annee ?? "",
          qte: Number(b.qte) || 0,
          disponibilite: Number(b.disponibilite) || 0,
          status: b.status ?? "actif"
        }));

        setBooks(mapped);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchBooks();
  }, []);


  // ➕ ADD
   const addBook = async (form) => {
    const payload = {
      titre: form.titre,
      auteur: form.auteur,
      isbn: form.isbn,
      categorie: form.categorie,
      annee: form.annee,
      qte: form.qte,
      disponibilite: form.disponibilite,
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
        disponibilite: Number(form.disponibilite)
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
 
export    function useAdherents() {
  const [Adherent, setAdherent] = useState([]);
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/adherents");

        const mapped = res.data.map(b => ({
          id: b.id,
          nom: b.nom ?? "",
          email: b.email ?? "",
          phone: b.phone ?? "",
          disponibilite: b.disponibilite ?? "",
          status: b.status ?? "actif"
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
    const payload = {
      nom: form.nom,
      email: form.email,
      phone: form.phone,
      disponibilite: form.disponibilite,
     };

    const res = await axios.post(
      "http://127.0.0.1:8000/api/adherents",
      payload
    );

    setAdherent(prev => [...prev, res.data]);
  };

  // ✏️ UPDATE
  const updateAdherent = async (id, form) => {
  try {
    const res = await axios.put(
      `http://127.0.0.1:8000/api/adherents/${id}`,
      {
        nom: form.nom,
        email: form.email,
        phone: form.phone,
        disponibilite: form.disponibilite,
 
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
  // {id:1,name:"Fatima Zahra El Idrissi",email:"fz.elidrissi@email.ma",phone:"0661234567",membershipDate:"2024-01-15",status:"actif"},
  // {id:2,name:"Youssef Benkiran",email:"y.benkiran@gmail.com",phone:"0678901234",membershipDate:"2024-03-20",status:"actif"},
  // {id:3,name:"Nadia Amrani",email:"n.amrani@yahoo.fr",phone:"0654321098",membershipDate:"2023-11-05",status:"actif"},
  // {id:4,name:"Karim Ouazzani",email:"k.ouazzani@email.ma",phone:"0690123456",membershipDate:"2024-06-10",status:"inactif"},

export const initLoans = [
  {id:1,bookId:1,memberId:1,borrowDate:"2025-02-01",dueDate:"2025-02-15",returnDate:null,status:"actif"},
  {id:2,bookId:3,memberId:2,borrowDate:"2025-01-20",dueDate:"2025-02-03",returnDate:null,status:"retard"},
  {id:3,bookId:4,memberId:3,borrowDate:"2025-01-10",dueDate:"2025-01-24",returnDate:"2025-01-22",status:"retourné"},
  {id:4,bookId:5,memberId:1,borrowDate:"2025-02-10",dueDate:"2025-02-24",returnDate:null,status:"actif"},
];
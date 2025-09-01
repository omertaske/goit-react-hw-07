import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addContact, deleteContact, fetchContacts } from "./redux/contactsOps";
import { changeFilter, selectNameFilter } from "./redux/filtersSlice";
import ContactList from "./components/ContactList";

function App() {
  const dispatch = useDispatch();
  const filter = useSelector(selectNameFilter);

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  // kişi çek
  useEffect(() => {
    dispatch(fetchContacts());
  }, []); 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !number) return;

    dispatch(addContact({ name, number }));
    setName("");
    setNumber("");
  };

  const handleDelete = (id) => {
    dispatch(deleteContact(id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-indigo-500 flex flex-col items-center p-6 font-sans">
      <h1 className="text-5xl font-bold text-white mb-8 drop-shadow-lg">
        Phonebook
      </h1>

  
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row gap-4 mb-6 w-full max-w-xl"
      >
        <input
          type="text"
          placeholder="İsim"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-300 flex-1 shadow-sm"
        />
        <input
          type="number"
          placeholder="Numara"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          className="p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-300 flex-1 shadow-sm"
        />
        <button
          type="submit"
          className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-shadow shadow-md"
        >
          Ekle
        </button>
      </form>

    
      <input
        type="text"
        placeholder="Ara . . ."
        value={filter}
        onChange={(e) => dispatch(changeFilter(e.target.value))}
        className="p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-300 mb-6 w-full max-w-xl shadow-sm"
      />

      
      <ContactList onDelete={handleDelete} />
    </div>
  );
}

export default App;

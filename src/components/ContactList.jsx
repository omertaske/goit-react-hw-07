
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectFilteredContacts } from "../redux/contactsSlice";
import { deleteContact } from "../redux/contactsOps";

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectFilteredContacts);

  if (!contacts.length) {
    return (
      <p className="text-white font-semibold text-lg mt-4">
        Hiç kişi yok :(
      </p>
    );
  }

  return (
    <ul className="space-y-3 w-full max-w-xl">
      {contacts.map((contact) => (
        <li
          key={contact.id}
          className="flex justify-between items-center bg-white/20 p-4 rounded-lg shadow-md"
        >
          <span className="text-white font-medium">
            {contact.name}: {contact.number}
          </span>
          <button
            onClick={() => dispatch(deleteContact(contact.id))}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition shadow-sm"
          >
            Sil
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;

import Navbar from "./components/Navbar";
import { IoSearch } from "react-icons/io5";
import { FaCirclePlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
import ContactCard from "./components/ContactCard";
import AddAndUpdate from "./components/AddAndUpdate";
import UseDisclouse from "./components/hooks/useDisclouse";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContactNotFound from "./components/ContactNotFound";

function App() {
  const [contacts, setContacts] = useState([]);
  const { isOpen, onClose, onOpen } = UseDisclouse();

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "Contact");

        //Using onSnapshot so that any changes (like add, delete or update) will be reflected in the UI without manual refreshing the page
        onSnapshot(contactsRef, (snapshot) => {
          const contactLists = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setContacts(contactLists);
          return contactLists;
        });
      } catch (error) {
        console.log(error);
      }
    };
    getContacts(); //calling the function in case of update
  }, []);

  //Start Search bar/Filter Contacts
  const filterContacts = (e) => {
    const value = e.target.value.toLowerCase();

    const contactsRef = collection(db, "Contact");

    //Using onSnapshot so that any changes (like add, delete or update) will be reflected in the UI without manual refreshing the page
    onSnapshot(contactsRef, (snapshot) => {
      const contactLists = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      const filteredContacts = contactLists.filter((contact) => {
       return (
        contact.name.toLowerCase().includes(value) ||     //Search by Name.
        contact.email.toLowerCase().includes(value)       //Search by Email.
       )
      });

      setContacts(filteredContacts);
      return filteredContacts;
    });
  };
   //end Search bar/Filter Contacts

  return (
    <>
      <div className="max-w-[600px] mx-auto">
        <Navbar />
        {/* Search bar Start */}
        <div className="relative flex items-center">
          <IoSearch className="absolute text-3xl text-white ml-4 cursor-pointer" />
          <input
            onChange={filterContacts}
            type="text"
            placeholder="Search Contact"
            className="h-10 w-full bg-transparent border border-white text-white rounded-lg pl-14"
          />
          <FaCirclePlus
            onClick={onOpen}
            className="text-6xl text-white ml-4 cursor-pointer"
          />
        </div>
        {/* Search bar end */}


        {/* Display Contacts on UI if Available */}
        <div className="mt-8">
          {contacts.length <=0 ? <ContactNotFound /> : contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </div>
      </div>
      <AddAndUpdate onClose={onClose} isOpen={isOpen} />
      <ToastContainer position="bottom-right" />    {/* Notification using react Toast */}
      
    </>
  );
}

export default App;

import { doc, deleteDoc, collection } from "firebase/firestore";
import React from "react";
import { CiEdit } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { db } from "../config/firebase";
import AddAndUpdate from "./AddAndUpdate";
import UseDisclouse from "./hooks/useDisclouse";
import { toast } from "react-toastify";

const ContactCard = ({ contact }) => {
  const {isOpen, onClose, onOpen} = UseDisclouse();

  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, "Contact", id));
      toast.success("Contact Deleted Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <div
      key={contact.id}
      className="bg-yellow flex justify-between items-center p-2 rounded-lg mb-4"
    >
      <div className="flex gap-4 items-center">
        <FaRegUserCircle className="  text-4xl " />
        <div>
          <h2 className="font-medium">Name: {contact.name}</h2>
          <p className="text-sm">Email: {contact.email}</p>
        </div>
      </div>
      <div className="flex gap-4 ">
        <CiEdit onClick={onOpen} className="text-3xl cursor-pointer " />
        <FaTrash
          onClick={() => {
            deleteContact(contact.id);
          
          }}
          className="text-3xl cursor-pointer "
        />
      </div>
    </div>
    <AddAndUpdate contact={contact} isUpdate isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default ContactCard;

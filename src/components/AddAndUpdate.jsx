import React from "react";
import Modal from "./Modal";
import { Field, Form, Formik } from "formik";
import { db } from "../config/firebase";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";

// Add Contacts
const AddAndUpdate = ({ isOpen, onClose, isUpdate, contact }) => {
  const addContact = async (contact) => {
    try {
      const contactRef = collection(db, "Contact");
      await addDoc(contactRef, contact);
      onClose();
      toast.success("Contact Added Successfully");      {/* Notification using react Toast */}
    } catch (error) {
      console.log(error);
    }
  };

  const updateContact = async (contact, id) => {
    try {
      const contactRef = doc(db, "Contact", id);
      await updateDoc(contactRef, contact);
      onClose();
      toast.success("Contact Updated Successfully");        {/* Notification using react Toast */}
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Formik
          initialValues={
            // Add And Update Contacts with initial values empty
            isUpdate
              ? {
                  name: contact.name,
                  email: contact.email,
                }
              : { name: "", email: "" }
          }
          onSubmit={(values) => {
            // console.log(values);
            isUpdate ? updateContact(values, contact.id) : addContact(values);
          }}
        >
          <Form className="flex flex-col gap-4">
            <div className="flex flex-col gap-1 ">
              <label htmlFor="name">Name</label>
              <Field name="name" required className="border h-10" />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email">Email</label>
              <Field name="email" type="email" required className="border h-10" />
            </div>
            <button type="submit" className="bg-orange text-white px-4 py-2 rounded-lg flex self-end ">
              {isUpdate ? "Update" : "Add"} Contact
            </button>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
};

export default AddAndUpdate;

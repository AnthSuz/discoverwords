import { useState } from "react";
import { Button } from "../utils/styled";
import { Modal } from "./ui/modal";
import styled from "styled-components";
import emailjs from "@emailjs/browser";

const Input = styled.input`
  width: 100%;
  border-radius: 4px;
  border: 1px solid black;
  line-height: 24px;
  margin-bottom: 16px;
  margin-top: 4px;
  padding: 4px 8px;
`;

const Textarea = styled.textarea`
  width: 100%;
  border-radius: 4px;
  border: 1px solid black;
  margin: 4px 0 32px 0;
  padding: 8px;
`;

interface ContactModalType {
  closeModal: (modal: "rulesModal" | "contactModal") => void;
}

export const ContactModal = ({ closeModal }: ContactModalType) => {
  const [form, setForm] = useState<{
    name: string;
    email: string;
    subject: string;
    message: string;
  }>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: any) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const sendEmail = (e: any) => {
    e.preventDefault();
    emailjs
      .send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID || "",
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID || "",
        {
          name: form.name,
          subject: form.subject,
          email: form.email,
          message: form.message,
        },
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY || ""
      )
      .then(
        () => {
          alert("Message envoyé avec succès !");
          closeModal("contactModal");
        },
        () => {
          alert("Erreur lors de l'envoi du message.");
        }
      );
  };

  return (
    <Modal title="Contact" closeModal={() => closeModal("contactModal")}>
      <div style={{ overflow: "hidden" }}>
        <form onSubmit={sendEmail}>
          <p>Ton nom</p>
          <Input
            type="text"
            required
            name="name"
            value={form.name}
            onChange={handleChange}
          />
          <p>Ton email</p>
          <Input
            type="text"
            required
            name="email"
            value={form.email}
            onChange={handleChange}
          />
          <p>Ton sujet</p>
          <Input
            type="text"
            required
            name="subject"
            value={form.subject}
            onChange={handleChange}
          />
          <p>Ton message</p>
          <Textarea
            rows={8}
            required
            name="message"
            value={form.message}
            onChange={handleChange}
          />
          <Button type="submit" style={{ width: "100%" }}>
            Envoyer
          </Button>
        </form>
      </div>
    </Modal>
  );
};

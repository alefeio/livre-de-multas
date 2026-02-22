import React, { useState, ChangeEvent } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { formatPhoneNumber } from "utils/formatPhoneNumber";

const ContactForm: React.FC<{ pageSlug?: string }> = ({ pageSlug }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [receivedNotification, setReceivedNotification] = useState("");
  const [deadline, setDeadline] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    "success" | "error" | "submitting" | ""
  >("");

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhoneNumber(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          service,
          receivedNotification,
          deadline,
          message,
          pageSlug,
        }),
      });

      if (res.ok) {
        setStatus("success");
        setName("");
        setPhone("");
        setService("");
        setReceivedNotification("");
        setDeadline("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="relative bg-white rounded-3xl shadow-2xl p-8 md:p-10 max-w-2xl mx-auto">
      {/* Título */}
      <div className="text-center mb-8">
        <h2 className="text-[#0c1a26] text-3xl md:text-4xl font-extrabold">
          <span className="text-[#fec655]">Analisar meu caso</span>
        </h2>
        <p className="text-gray-700 mt-3 text-base md:text-lg">
          Preencha os dados abaixo para que possamos entender sua situação.
          Quanto antes analisarmos, melhor para organizar os prazos.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Nome */}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Seu nome completo"
          required
          className="input-base"
        />

        {/* Telefone */}
        <input
          type="text"
          value={phone}
          onChange={handlePhoneChange}
          placeholder="Telefone / WhatsApp"
          required
          className="input-base"
        />

        {/* Tipo de caso */}
        <select
          value={service}
          onChange={(e) => setService(e.target.value)}
          required
          className="input-base"
        >
          <option value="">Qual é o seu caso?</option>
          <option value="CNH_PROVISORIA">Multa na CNH provisória</option>
          <option value="BAFOMETRO">Bafômetro / Recusa</option>
          <option value="SUSPENSAO">Suspensão da CNH</option>
          <option value="EXCESSO_50">Excesso acima de 50%</option>
          <option value="MANOBRA_PERIGOSA">Manobra perigosa / racha</option>
          <option value="SEM_CAPACETE">Multa sem capacete</option>
          <option value="OUTRO">Outro</option>
        </select>

        {/* Já recebeu notificação? */}
        <select
          value={receivedNotification}
          onChange={(e) => setReceivedNotification(e.target.value)}
          className="input-base"
        >
          <option value="">Você já recebeu notificação?</option>
          <option value="SIM">Sim</option>
          <option value="NAO">Não</option>
          <option value="NAO_SEI">Não sei</option>
        </select>

        {/* Prazo */}
        <input
          type="text"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          placeholder="Qual é o prazo informado na notificação? (se souber)"
          className="input-base"
        />

        {/* Mensagem */}
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Descreva brevemente o que aconteceu..."
          rows={4}
          className="input-base resize-none"
        />

        {/* Botão */}
        <button
          type="submit"
          disabled={status === "submitting"}
          className="mt-2 w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#fec655] text-[#0c1a26] font-bold rounded-full shadow-lg transition-all duration-200 hover:brightness-95 disabled:opacity-60"
        >
          {status === "submitting" ? "Enviando..." : "Quero analisar meu caso"}
          <FaPaperPlane />
        </button>

        {/* Feedback */}
        {status === "success" && (
          <p className="text-green-600 text-center font-medium">
            Recebemos suas informações. Em breve entraremos em contato.
          </p>
        )}

        {status === "error" && (
          <p className="text-red-600 text-center font-medium">
            Ocorreu um erro ao enviar. Tente novamente.
          </p>
        )}

        <p className="text-xs text-gray-500 text-center mt-2">
          Cada situação deve ser analisada individualmente. O envio das
          informações não garante resultado específico.
        </p>
      </form>
    </div>
  );
};

export default ContactForm;

"use client";

import "./WhatsAppButton.css";

export default function WhatsAppButton() {
    const whatsappNumber = "+919880392980";

    const message =
        "Hi Hive & Hire, I'm interested in hiring workers for an event. I would like to know more about your services.";

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    const handleWhatsAppClick = () => {
        window.open(whatsappUrl, "_blank");
    };

    return (
        <button
            type="button"
            className="whatsapp-button"
            onClick={handleWhatsAppClick}
        >
            WhatsApp Us
        </button>
    );
}
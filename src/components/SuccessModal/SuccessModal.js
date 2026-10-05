"use client";

import "./SuccessModal.css";

export default function SuccessModal({ onClose }) {
    return (
        <div className="success-modal-overlay">
            <div className="success-modal">

                <div className="success-icon">
                    ✓
                </div>

                <h2>Requirement Submitted!</h2>

                <p>
                    Your worker requirement has been received by our team.
                </p>

                <p>
                    We’ve also prepared your requirement details in WhatsApp.
                    If the WhatsApp message was sent successfully, great!
                    If you face any issue or forget to press Send, don’t worry —
                    your requirement has already reached our team through the website.
                </p>

                <p>
                    We’ll review your requirement and contact you shortly.
                </p>

                <button
                    type="button"
                    onClick={onClose}
                >
                    Done
                </button>

            </div>
        </div>
    );
}
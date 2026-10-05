"use client";

import "./ReviewModal.css";

export default function ReviewModal({
    formData,
    onCancel,
    onSubmitWhatsApp,
    onSubmitApplication 
}) {

    const calculateTotalDays = () => {
        if (!formData.startDate || !formData.endDate) {
            return 0;
        }

        const start = new Date(formData.startDate);
        const end = new Date(formData.endDate);

        return Math.ceil(
            (end - start) / (1000 * 60 * 60 * 24)
        ) + 1;
    };

    const totalDays = calculateTotalDays();

    const totalAmount =
        Number(formData.workers || 0) *
        totalDays *
        Number(formData.amount || 0);
    return (
        <div className="review-modal-overlay">
            <div className="review-modal">

                <div className="review-modal-header">
                    <h3>Verify Your Requirement</h3>

                    <p>
                        Please review your details before submitting.
                    </p>
                </div>

                <div className="review-details">

                    <div className="review-item">
                        <span>Customer Name</span>
                        <strong>{formData.customerName}</strong>
                    </div>

                    <div className="review-item">
                        <span>Mobile Number</span>
                        <strong>{formData.mobileNumber}</strong>
                    </div>

                    <div className="review-item">
                        <span>Work Location</span>
                        <strong>{formData.workLocation}</strong>
                    </div>

                    <div className="review-item">
                        <span>Job Type</span>
                        <strong>{formData.jobType}</strong>
                    </div>

                    <div className="review-item review-full">
                        <span>Job Description</span>
                        <strong>{formData.jobDescription}</strong>
                    </div>

                    <div className="review-item">
                        <span>Required Gender</span>
                        <strong>{formData.gender}</strong>
                    </div>

                    <div className="review-item">
                        <span>Number of Workers</span>
                        <strong>{formData.workers}</strong>
                    </div>

                    <div className="review-item">
                        <span>Start Date</span>
                        <strong>{formData.startDate}</strong>
                    </div>

                    <div className="review-item">
                        <span>End Date</span>
                        <strong>{formData.endDate}</strong>
                    </div>

                    <div className="review-item review-highlight">
                        <span>Total Days</span>
                        <strong>{totalDays} days</strong>
                    </div>

                    <div className="review-item review-highlight">
                        <span>Total Amount</span>
                        <strong>₹{totalAmount.toLocaleString("en-IN")}</strong>
                    </div>

                    <div className="review-item">
                        <span>Amount / Worker / Day</span>
                        <strong>₹{formData.amount}</strong>
                    </div>

                </div>

                <div className="review-modal-actions">

                    <button
                        type="button"
                        className="review-cancel-button"
                        onClick={onCancel}
                    >
                        Cancel / Edit
                    </button>

                    <div className="review-submit-actions">

                        <button
                            type="button"
                            className="review-whatsapp-button"
                            onClick={onSubmitWhatsApp}
                        >
                            Submit & WhatsApp
                        </button>

                        <button
                            type="button"
                            className="review-confirm-button"
                            onClick={onSubmitApplication}
                        >
                            Submit Application
                        </button>

                    </div>

                </div>

            </div>
        </div>
    );
}
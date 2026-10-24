"use client";

import { useState } from "react";
import "./WorkerForm.css";
import ReviewModal from "../ReviewModal/ReviewModal";
import SuccessModal from "../SuccessModal/SuccessModal";
import Loading from "../Loading/Loading";

export default function WorkerForm() {
    const [formData, setFormData] = useState({
        customerName: "",
        mobileNumber: "",
        workLocation: "",
        jobType: "",
        jobDescription: "",
        gender: "",
        workers: "",
        startDate: "",
        endDate: "",
        amount: ""
    });
    const [loading, setLoading] = useState(false);
    const [showReview, setShowReview] = useState(false);
    const [errors, setErrors] = useState({});
    const [showSuccess, setShowSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.customerName.trim()) {
            newErrors.customerName = "Customer name is required";
        }

        if (!formData.mobileNumber.trim()) {
            newErrors.mobileNumber = "Mobile number is required";
        } else if (!/^[6-9]\d{9}$/.test(formData.mobileNumber)) {
            newErrors.mobileNumber = "Enter a valid 10-digit mobile number";
        }

        if (!formData.workLocation.trim()) {
            newErrors.workLocation = "Work location is required";
        }

        if (!formData.jobType) {
            newErrors.jobType = "Please select a job type";
        }

        if (!formData.jobDescription.trim()) {
            newErrors.jobDescription = "Job description is required";
        }

        if (!formData.gender) {
            newErrors.gender = "Please select required gender";
        }

        if (!formData.workers) {
            newErrors.workers = "Number of workers is required";
        } else if (Number(formData.workers) < 1) {
            newErrors.workers = "Number of workers must be at least 1";
        }

        if (!formData.startDate) {
            newErrors.startDate = "Start date is required";
        } else {
            const today = new Date().toISOString().split("T")[0];

            if (formData.startDate < today) {
                newErrors.startDate = "Start date cannot be in the past";
            }
        }
        if (!formData.endDate) {
            newErrors.endDate = "End date is required";
        } else if (
            formData.startDate &&
            formData.endDate < formData.startDate
        ) {
            newErrors.endDate = "End date cannot be before start date";
        }

        if (!formData.amount) {
            newErrors.amount = "Amount is required";
        } else if (Number(formData.amount) <= 0) {
            newErrors.amount = "Amount must be greater than 0";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const isValid = validateForm();

        if (!isValid) {
            return;
        }

        setShowReview(true);
    };

    const generateWhatsAppMessage = () => {
        const totalDays =
            formData.startDate && formData.endDate
                ? Math.ceil(
                    (new Date(formData.endDate) -
                        new Date(formData.startDate)) /
                    (1000 * 60 * 60 * 24)
                ) + 1
                : 0;

        const totalAmount =
            Number(formData.workers || 0) *
            totalDays *
            Number(formData.amount || 0);

        return `Hello Hive & Hire,

                I would like to enquire about workers for an event.

                Customer Name: ${formData.customerName}
                Mobile Number: ${formData.mobileNumber}
                Work Location: ${formData.workLocation}
                Job Type: ${formData.jobType}
                Job Description: ${formData.jobDescription}
                Required Gender: ${formData.gender}
                Number of Workers: ${formData.workers}
                Start Date: ${formData.startDate}
                End Date: ${formData.endDate}
                Total Days: ${totalDays}
                Amount per Worker/Day: ₹${formData.amount}
                Estimated Total Amount: ₹${totalAmount.toLocaleString("en-IN")}

                Please let me know about the availability of workers.

                Thank you.`;
    };

    const saveRequirement = async () => {
        const response = await fetch("/api/requirements", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        const result = await response.json();


        if (!response.ok) {
            throw new Error(
                result.message || "Failed to save requirement"
            );
        }

        return result;
    };

    const handleWhatsAppSubmit = async () => {
        try {
            await saveRequirement();

            const message = generateWhatsAppMessage();

            const whatsappNumber = "+919880392980";

            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                message
            )}`;

            window.open(whatsappUrl, "_blank");

            setShowReview(false);
            handleClear();
            setShowSuccess(true);
        } catch (error) {
            console.error(
                "Error submitting requirement through WhatsApp:",
                error
            );

            alert("Unable to submit your requirement. Please try again.");
        }
    };


    const handleConfirmSubmit = async () => {
        try {
            setLoading(true);
            await saveRequirement();
            setShowReview(false);
            handleClear();
            setShowSuccess(true);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error("Error submitting requirement:", error);
            alert("Unable to submit your requirement. Please try again.");
        }
    };

    const handleClear = () => {
        setFormData({
            customerName: "",
            mobileNumber: "",
            workLocation: "",
            jobType: "",
            jobDescription: "",
            gender: "",
            workers: "",
            startDate: "",
            endDate: "",
            amount: ""
        });
        setErrors({})
    };


    return (
        <section className="worker-form-section" id="worker-form">
          {loading && <Loading />}
            <div className="worker-form-container">

                <div className="worker-form-heading">
                    <p className="worker-form-label">FIND WORKERS</p>

                    <h2>
                        Tell us what
                        <span> you need</span>
                    </h2>

                    <p>
                        Share your work requirements with us. We will review your
                        request and help you find suitable workers.
                    </p>
                </div>

                <form className="worker-form" onSubmit={handleSubmit}>

                    <div className={`form-group ${errors.customerName ? "has-error" : ""}`}>
                        <label htmlFor="customerName">Customer Name</label>
                        <input
                            type="text"
                            id="customerName"
                            name="customerName"
                            value={formData.customerName}
                            onChange={handleChange}
                            placeholder="Enter your name"
                        />

                        {errors.customerName && (
                            <span className="form-error">
                                {errors.customerName}
                            </span>
                        )}
                    </div>

                    <div className={`form-group ${errors.mobileNumber ? "has-error" : ""}`}>
                        <label htmlFor="mobileNumber">Mobile Number</label>
                        <input
                            type="number"
                            id="mobileNumber"
                            name="mobileNumber"
                            value={formData.mobileNumber}
                            onChange={handleChange}
                            placeholder="Enter your mobile number"
                        />
                        {errors.mobileNumber && (
                            <span className="form-error">{errors.mobileNumber}</span>
                        )}
                    </div>

                    <div className={`form-group ${errors.workLocation ? "has-error" : ""}`}>
                        <label htmlFor="workLocation">Work Location</label>
                        <input
                            type="text"
                            id="workLocation"
                            name="workLocation"
                            value={formData.workLocation}
                            onChange={handleChange}
                            placeholder="City / Area"
                        />
                        {errors.workLocation && (
                            <span className="form-error">{errors.workLocation}</span>
                        )}
                    </div>

                    <div className={`form-group ${errors.jobType ? "has-error" : ""}`}>
                        <label htmlFor="jobType">
                            Job Type
                        </label>

                        <input
                            type="text"
                            id="jobType"
                            name="jobType"
                            value={formData.jobType}
                            onChange={handleChange}
                            placeholder="e.g. Wedding, Birthday, Corporate Event"
                        />

                        {errors.jobType && (
                            <span className="form-error">
                                {errors.jobType}
                            </span>
                        )}
                    </div>

                    <div className={`form-group full-width ${errors.jobDescription ? "has-error" : ""}`}>
                        <label htmlFor="jobDescription">Job Description</label>
                        <textarea
                            id="jobDescription"
                            name="jobDescription"
                            rows="5"
                            value={formData.jobDescription}
                            onChange={handleChange}
                            placeholder="Describe the work in detail. Mention heavy lifting, approximate weight, outdoor work, special requirements, etc."
                        />
                        {errors.jobDescription && (
                            <span className="form-error">{errors.jobDescription}</span>
                        )}
                    </div>

                    <div className={`form-group ${errors.gender ? "has-error" : ""}`}>
                        <label htmlFor="gender">Required Gender</label>
                        <select id="gender" name="gender" value={formData.gender}
                            onChange={handleChange}>
                            <option value="" disabled>
                                Select gender
                            </option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="any">Any</option>
                        </select>
                        {errors.gender && (
                            <span className="form-error">{errors.gender}</span>
                        )}
                    </div>

                    <div className={`form-group ${errors.workers ? "has-error" : ""}`}>
                        <label htmlFor="workers">Number of Workers</label>
                        <input
                            type="number"
                            id="workers"
                            name="workers"
                            min="1"
                            value={formData.workers}
                            onChange={handleChange}
                            placeholder="e.g. 5"
                        />
                        {errors.workers && (
                            <span className="form-error">{errors.workers}</span>
                        )}
                    </div>

                    <div className={`form-group ${errors.startDate ? "has-error" : ""}`}>
                        <label htmlFor="startDate">Start Date</label>
                        <input
                            type="date"
                            id="startDate"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                        />
                        {errors.startDate && (
                            <span className="form-error">{errors.startDate}</span>
                        )}
                    </div>

                    <div className={`form-group ${errors.endDate ? "has-error" : ""}`}>
                        <label htmlFor="endDate">End Date</label>
                        <input
                            type="date"
                            id="endDate"
                            name="endDate"
                            value={formData.endDate}
                            min={formData.startDate}
                            onChange={handleChange}
                        />
                        {errors.endDate && (
                            <span className="form-error">{errors.endDate}</span>
                        )}
                    </div>

                    <div className={`form-group ${errors.amount ? "has-error" : ""}`}>
                        <label htmlFor="amount">Amount Ready to Pay</label>
                        <div className="amount-input">
                            <span>₹</span>
                            <input
                                type="number"
                                id="amount"
                                name="amount"
                                min="0"
                                value={formData.amount}
                                onChange={handleChange}
                                placeholder="Per worker / day"
                            />

                        </div>
                        {errors.amount && (
                            <span className="form-error">{errors.amount}</span>
                        )}
                    </div>


                    <div className="form-submit full-width">
                        <button
                            type="button"
                            className="clear-button"
                            onClick={handleClear}
                        >
                            Clear Form
                        </button>
                        <button type="submit">
                            Submit
                        </button>
                    </div>

                </form>
                {showReview && (
                    <ReviewModal
                        formData={formData}
                        onCancel={() => setShowReview(false)}
                        onSubmitWhatsApp={handleWhatsAppSubmit}
                        onSubmitApplication={handleConfirmSubmit}
                    />
                )}
                {showSuccess && (
                    <SuccessModal
                        onClose={() => { handleClear(); setShowSuccess(false) }}
                    />
                )}
            </div>
        </section>
    );
}
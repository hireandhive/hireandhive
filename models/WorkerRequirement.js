import mongoose from "mongoose";

const requirementSchema = new mongoose.Schema(
    {
        customerName: {
            type: String,
            required: true,
            trim: true,
        },

        mobileNumber: {
            type: String,
            required: true,
            trim: true,
        },

        workLocation: {
            type: String,
            required: true,
            trim: true,
        },

        jobType: {
            type: String,
            required: true,
            trim: true,
        },

        jobDescription: {
            type: String,
            required: true,
            trim: true,
        },

        gender: {
            type: String,
            required: true,
            enum: ["male", "female", "any"],
        },

        workers: {
            type: Number,
            required: true,
            min: 1,
        },

        startDate: {
            type: Date,
            required: true,
        },

        endDate: {
            type: Date,
            required: true,
        },

        amount: {
            type: Number,
            required: true,
            min: 0,
        },
    },
    {
        timestamps: true,
    }
);

const Requirement =
    mongoose.models.Requirement ||
    mongoose.model("Requirement", requirementSchema);

export default Requirement;
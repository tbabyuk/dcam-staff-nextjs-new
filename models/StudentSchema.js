import {Schema, model, models} from "mongoose"

const StudentSchema = new Schema({
    attendance: {
        type: Object,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    pay: {
        type: Number,
        required: true
    },
    payday: {
        type: String,
        required: true
    },
    submitted: {
        type: Boolean,
        required: true
    },
    teacher: {
        type: String,
        required: true
    }
}, {timestamps: true})


export const Student = models.Student || model("Student", StudentSchema)
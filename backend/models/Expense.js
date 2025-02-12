import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        }    
    },
    {
        timestamps : true
    }
);


const Expense = mongoose.model('Expense', expenseSchema);
export default Expense;
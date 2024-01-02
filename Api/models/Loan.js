const mongoose = require('mongoose')

const LoanSchema = new mongoose.Schema(
    {
        policyname: { type: String},
        email: { type: String},
        loan_amount: { type: Number},
        loan_term: { type: Number},
        loan_approved: { type: String},
        createdBy:{type: String},
        weekly_payment:{type: String},
        createdDate: { type: Date, default: Date.now },
        paymentDate: { type: Date, default: Date.now},
        balance_amount: { type: Number},
        dueDate: { type: Date, default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
    }
)

const LoanModel = mongoose.model('Loan', LoanSchema, 'loan');

module.exports = LoanModel

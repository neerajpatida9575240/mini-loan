const mongoose = require('mongoose')

const LoanSchema = new mongoose.Schema(
    {
        name: { type: String},
        email: { type: String},
        loan_amount: { type: Number},
        loan_term: { type: Number},
        loan_approved: { type: String},
        createdBy:{type: String},
        weekly_payment:{type: String},
        createdDate: { type: Date, default: Date.now },
        paymentDate: { type: Date, default: Date.now},
    }
)

const LoanModel = mongoose.model('Loan', LoanSchema, 'loan');

module.exports = LoanModel

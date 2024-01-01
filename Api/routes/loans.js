const express = require("express");
const LoanModel = require("../models/Loan");
const passport = require('passport'); // authentication
require('../common/passportConfig')(passport);



module.exports = (app) => {
  app.use(passport.initialize());
  // @desc  Create a new Loan
  app.post('/', async (req, res) => {
    try{
      let user = await LoanModel.findOne({
        name: req.body.newLoan.name,
      });
      if (!user) {
        const weekly_payment =
        parseInt(req.body.newLoan.loan_amount) /
        (parseInt(req.body.newLoan.loan_term));
      const newLoan = new LoanModel({
        name: req.body.newLoan.name,
        email: req.body.newLoan.email,
        loan_amount: parseFloat(req.body.newLoan.loan_amount),
        loan_term: parseInt(req.body.newLoan.loan_term),
        createdBy: req.body.newLoan.createdBy,
        loan_approved: "Pending",
        weekly_payment: parseFloat(weekly_payment),
      });
  
      newLoan.save().then((loan) => res.json({ status: true, data: loan }));
      } else {
        res.json({ status: false, error: "Duplicate Name" });
      }
    } catch(err) {
      res.json({ status: false, error: "Error in Add Loan" });
    }
  });

  //ALL Loan
  app.get("/all",  async (req, res) => {
    try{
      let query = {};
      if (req.query.role === "user") {
        query = {
          createdBy: req.query.email,
        };
      } else {
        query = {};
      }
      const pageSize = 15;
      const page = parseInt(req.query.page) || 1;
      const skipCount = (page - 1) * pageSize;
  
      const countPromise = await LoanModel.countDocuments(query).exec();
      const LoanList = await LoanModel
        .find(query)
        .skip(skipCount)
        .limit(pageSize)
        .sort({ createdAt: -1 })
        .exec();
  
      const totalCount = await countPromise;
  
      const pager = {
          pageSize,
          currentPage: page,
          totalPages: Math.ceil(totalCount / pageSize),
          hasNextPage: page < Math.ceil(totalCount / pageSize),
          hasPreviousPage: page > 1,
          pages: Array.from({ length: Math.ceil(totalCount / pageSize) }, (_, i) => i + 1),
      };
      return res.json({ success: true, pager, LoanList, totalAppCount: totalCount });
    } catch (err){
      res.json({ status: false, error: "Error in Get Loan" });
    }
  });

  //Change Loan Status
  app.get("/changeStatus", async (req, res) => {
    try {
      const currentDate = new Date();
  
      await LoanModel.updateOne(
        { _id: req.query.Id },
        { $set: { loan_approved: req.query.status, paymentDate: currentDate } }
      );
  
      res.json({ success: true });
    } catch (err) {
      res.json({ success: false, error: "Error in Change Status" });
    }
  });

  //Loan Detail
  app.get("/GetLoanDetail", async (req, res) => {
    try {
      const data = await LoanModel.findOne({_id: req.query.id});
      console.log("data",data)
      if (data) {
        // Loan detail found
        res.json({ success: true, data: data });
      } else {
        // Loan not found
        res.json({ success: false, error: "Loan not found" });
      }
    } catch (err) {
      // Error in fetching loan detail
      res.json({ success: false, error: "Error in Get Loan Detail" });
    }
  });

  //PayLoan
  app.post("/PayLoan", async (req, res) => {
    try {
        await LoanModel.updateOne(
          { _id: req.query.Id },
          { $set: { paymentDate: req.body.date } }
        );
    } catch (err) {
      // Error in fetching loan detail
      res.json({ success: false, error: "Error in Get Loan Detail" });
    }
  });
};

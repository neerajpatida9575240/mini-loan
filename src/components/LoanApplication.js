import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import { Link } from "react-router-dom";
import { getLoan } from "../service";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminHeader from "../common/AdminHeader";

const LoanApplication = () => {
  const [modal, setModal] = useState(false);
  const [Errors, setErrors] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const navigate = useNavigate();
  let notication = "";

  const createdBy = localStorage.getItem("email");

  const toggle = () => {
    setModal(!modal);
  };

  const notify = (val, status) => {
    status
      ? toast.update(val, {
          render: "Saved Successfully",
          type: "success",
          isLoading: false,
          autoClose: 2000,
          onClose: () => navigate("/all_loans/1"),
        })
      : toast.update(val, {
          render: "Duplicate Name",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
  };

  const _Submitloan = async (e) => {
    e.preventDefault();
    const newLoan = {
      name: name,
      email: email,
      loan_amount: loanAmount,
      loan_term: loanTerm,
      createdBy: createdBy,
    };
    _Validation(newLoan).then((res) => {
      if (res) {
        notication = toast.loading("Please wait...");
        var result = getLoan(newLoan);
        result.then((response) => {
          if (response.status) {
            notify(notication, true);
          } else {
            notify(notication, false);
          }
        });
      }
    });
  };

  const _Validation = async (newLoan) => {
    let errors = {};
    let count = 0;
    if (newLoan.name === null || newLoan.name === undefined || newLoan.name === "") {
      errors["IsEmpty_name"] = true;
      errors["nameEmptyMsg"] = "Please complete this item to move forward";
      count++;
    }
    if (newLoan.email === null || newLoan.email === undefined || newLoan.email === "") {
      errors["IsEmpty_email"] = true;
      errors["emailEmptyMsg"] = "Please complete this item to move forward";
      count++;
    }
    if (newLoan.loan_amountv === null || newLoan.loan_amount === undefined || newLoan.loan_amount === "") {
      errors["IsEmpty_loan_amount"] = true;
      errors["loan_amountEmptyMsg"] = "Please complete this item to move forward";
      count++;
    }
    if (newLoan.loan_term === null || newLoan.loan_term === undefined || newLoan.loan_term === "") {
      errors["IsEmpty_loanterm"] = true;
      errors["loantermEmptyMsg"] = "Please complete this item to move forward";
      count++;
    }

    setErrors(errors);
    if (count === 0) {
      return true;
    }
    return false;
  };

  const goback = () => {
    navigate("/dashboard");
  };

  return (
    <div>
      <AdminHeader />
      <h1 className="mb-5">Apply for loan</h1>
      <form onSubmit={_Submitloan}>
        <div className="form-group form-mod has-feedback form-field form-floating ">
          <input autoComplete="off" className={"form-control default-input " + (Errors["IsEmpty_name"] === true ? " has-err" : "")} type="text" id="name" maxLength="128" name="name" placeholder="Enter Name" defaultValue={name} data-fv-field="name" tabIndex="1" onChange={(e) => setName(e.target.value)} />
          {Errors["IsEmpty_name"] === true ? <div className="has-err-msg">{Errors["nameEmptyMsg"]}</div> : ""}
          <label className="default-label" htmlFor="name">
            Name
          </label>
        </div>
        <div className="form-group form-mod has-feedback form-field form-floating ">
          <input autoComplete="off" className={"form-control default-input " + (Errors["IsEmpty_email"] === true ? " has-err" : "")} type="text" id="email" maxLength="128" name="email" placeholder="Enter Email Address" defaultValue={email} data-fv-field="email" tabIndex="2" onChange={(e) => setEmail(e.target.value)} />
          {Errors["IsEmpty_email"] === true ? <div className="has-err-msg">{Errors["emailEmptyMsg"]}</div> : ""}
          <label className="default-label" htmlFor="email">
            Email
          </label>
        </div>
        <div className="form-group form-mod form-floating mb-2 mt-2 form-field" style={{ marginTop: "24px" }}>
          <NumericFormat inputMode="numeric" autoComplete="off" tabIndex="3" className={"form-control default-input" + (Errors["IsEmpty_loan_amount"] === true ? " has-err" : "")} type="text" id="loan_amount" placeholder="Enter the Loan Amount" require="" name="loan_amount" defaultValue={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} />
          {Errors["IsEmpty_loan_amount"] === true ? <div className="has-err-msg">{Errors["loan_amountEmptyMsg"]}</div> : ""}
          <label className="default-label" htmlFor="loan_amount">
            Enter the Loan Amount
          </label>
        </div>
        <div className="form-mod has-feedback form-floating mb-2 mt-2 form-field">
          <select className={"form-control form-select " + (Errors["IsEmpty_loanterm"] === true ? " has-err" : "")} aria-label="Floating label" name="loanterm" id="loanterm" tabIndex="4" value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)}>
            <option value="">Select One</option>
            <option value="1">1st Term</option>
            <option value="2">2nd Term</option>
            <option value="3">3rd Term</option>
            <option value="4">4th Term</option>
          </select>
          {Errors["IsEmpty_loanterm"] === true ? <div className="has-err-msg">{Errors["loantermEmptyMsg"]}</div> : ""}
          <label htmlFor="loanterm">Loan Term</label>
        </div>
        <div className=" d-flex buttons button_space  mt-4">
          <button type="button" className="back_button px-3 " onClick={goback}>
            Go Back
          </button>
          <button type="button" className="next_button ms-2" onClick={_Submitloan}>
            Submit
          </button>
        </div>
      </form>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Application Submitted</ModalHeader>
        <ModalBody>Your loan application was successfully submitted and is under review for approval.</ModalBody>
        <ModalFooter>
          <Link to={`/all_loans/1`} className="btn btn-success btn-lg">
            Done
          </Link>
        </ModalFooter>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default LoanApplication;

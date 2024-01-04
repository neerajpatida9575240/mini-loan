import { React } from "react";
import { BaseUrl, authHeader } from "./common/common";

async function LoanList(page, email, role) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: authHeader().Authorization,
    },
  };
  const GetResponse = await fetch(
    BaseUrl + "api/loans/all" + "?page=" + page + "&email=" + email + "&role=" + role,
    requestOptions
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    });
  return GetResponse;
}

async function changestatus(status, Id) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: authHeader().Authorization,
    },
  };
  
  const GetResponse = await fetch(
    BaseUrl + "api/loans/changeStatus" + "?status=" + status + "&Id=" + Id,
    requestOptions
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    });
  return GetResponse;
}

async function registerUser(name, email, password) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  };
  const GetResponse = await fetch(BaseUrl + "api/register", requestOptions)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    });
  return GetResponse;
}

async function loginUser(email, password) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  };
  const GetResponse = await fetch(BaseUrl + "api/login", requestOptions)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    });
  return GetResponse;
}

async function getLoan(newLoan) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: authHeader().Authorization,
    },
    body: JSON.stringify({ newLoan }),
  };
  const GetResponse = await fetch(BaseUrl + "api/loans", requestOptions)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    });
  return GetResponse;
}

async function GetLoanDetail(id) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: authHeader().Authorization,
    },
  };
  const GetResponse = await fetch(
    BaseUrl + "api/loans/GetLoanDetail?" + id,
    requestOptions
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    });
  return GetResponse;
}

async function PayLoan(id, payment, date) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: authHeader().Authorization,
    },
    body: JSON.stringify({
      payment,
      date,
    }),
  };
  
  const GetResponse = await fetch(
    BaseUrl + "api/loans/PayLoan?" + id,
    requestOptions
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    });
  return GetResponse;
}

export { LoanList, changestatus, registerUser, loginUser, getLoan, GetLoanDetail, PayLoan};

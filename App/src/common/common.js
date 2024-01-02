let BaseUrl = "http://localhost:8080/";

function authHeader() {
    const Usertoken = localStorage.getItem("token");
  
    if (Usertoken) {
      return { Authorization: Usertoken };
    } else {
      return null;
    }
  }

  export { BaseUrl, authHeader};
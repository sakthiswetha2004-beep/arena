document.addEventListener("DOMContentLoaded", function () {

  const emailInput = document.getElementById("email");
  const passInput = document.getElementById("password");
  const button = document.getElementById("btn");
  const messageDiv = document.getElementById("message");

  button.addEventListener("click", async function (event) {
    event.preventDefault();
    
    messageDiv.textContent = "";

    const email = emailInput.value.trim();
    const password = passInput.value.trim();

    if (email === "" || password === "") {
      alert("Please fill all the details");
      return;
    }

    try {
      console.log("sending fetch", email, password);

      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      console.log("response data", data);

    
      if (data.message === "login successful") {
       window.location.href = "login.html?status=success";}
        else {
        window.location.href = "login.html?status=failed";
    }

      

    } catch (error) {
      alert("Server error. Please try again later.");
      console.error(error);
    }
  });
});

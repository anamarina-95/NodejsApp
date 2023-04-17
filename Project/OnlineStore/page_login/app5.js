document.getElementById("myForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  var name = document.getElementById("name").value;
  var password = document.getElementById("password").value;

  console.log(name);
  console.log(password);

  const formData = {
    username: name,
    password: password,
  };

  try {
    const response = await fetch("/checkLogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    console.log(data)
    console.log("Mai sus e data")
    if(data.found === true && name=="admin" && password=="1@1@") {
      console.log("User found!");
      window.location.href = "page_admin/Page-Admin.html";
    } else if (data.found === true && name!="admin" && password!="1@1@"){
      console.log("User found!");
      window.location.href = "page_cart_loggedin/Page-Cart-LoggedIn.html";
    } else {
      let banner = document.getElementById("message");
      banner.className = "btncartbanner";
      banner.innerHTML = `
        <span> User not found. Please create an account.</span>`
      console.log("User not found!");
    }



    

    // if (response.ok) {
    //   console.log("Form Submitted successfully");
      // function login() {
        // window.location.href = "/";
      // }
      // login();
    // } else {
    //   const errorMsg = await response.text();
    //   alert(errorMsg);
    // }
  } catch (err) {
    console.log("Error submitting form: ", err);
  }
});



// Check if the username and password are valid - exist in the DB
// if (username == "ana" && password == "password") {
//   // Redirect to the home page or do some other action
//   window.location.href = "../page_cart_loggedin/Page-Cart-LoggedIn.html";
//   // Check if the username and password are admin and valid - exist in the DB
// } else if (username == "admin" && password == "password") {
//   // Redirect to the home page or do some other action
//   window.location.href = "../page_admin/Page-Admin.html";
// } else {
//   // Show an error message
//   function createBanner() {
//     let banner = document.getElementById("message");
//     banner.className = "btncartbanner";
//     banner.innerHTML = `
//       <span> Invalid username or password.</span>
//       <span> If you don't have an account please create one.</span>`
//   }
// }
// createBanner()

  // Get the values from the input fields
  // document
  //   .getElementById("myFormcreate")
  //   .addEventListener("submit", async (e) => {
  //     e.preventDefault();

  //     var username = document.getElementById("username_create").value;
  //     var password = document.getElementById("password_create").value;

  //     const formData = new FormData();
  //     formData.append("name", username);
  //     formData.append("password", password);

  //     try {
  //       const response = await fetch(
  //         "/page_createaccount/Page-CreateAccount.html",
  //         {
  //           method: "POST",
  //           body: formData,
  //         }
  //       );

  //       if (response.ok) {
  //         console.log("Form Submitted successfully");
  //         function createaccount() {
  //           window.location.href = "/page_loginandcheckout/Page-Login&CheckOut.html";
  //         }
  //         createaccount();
  //       } else {
  //         const errorMsg = await response.text();
  //         alert(errorMsg);
  //       }
  //     } catch (err) {
  //       console.log("Error submitting form: ", err);
  //     }
  //   });
// Get the values from the input fields
//   var username = document.getElementById("username").value;
//   var password = document.getElementById("password").value;

//   // Collect the username and password in the DB
//   if (username != "" && password != "") {
//     // Redirect to the home page or do some other action
//     window.location.href = "../page_loginandcheckout/Page-Login&CheckOut.html";
//   } else {
//     // Show an error message
//     function createBanner() {
//       let banner = document.getElementById("message");
//       banner.className = "btncartbanner";
//       banner.innerHTML = `
//         <span> Invalid username or password.</span>
//         <span> If you don't have an account please create one.</span>`
//     }
//   }
//   createBanner()
// }

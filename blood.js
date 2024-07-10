const submitForm = () => {
  let obj = {};
  let err = {};
  let input = document.querySelectorAll(".input");
  let select = document.querySelectorAll("select");
  let radio = document.querySelector("input[type=radio]:checked")?.value;
  let sdp = document.querySelector("input[name=SDP]:checked")?.value;

  // Perform input validation
  input.forEach((x) => {
    if (x.value === "") {
      document.querySelectorAll("span").forEach((y) => {
        if (x.name === y.id) {
          y.innerHTML = `${x.name} is required !`;
          err[x.name] = y.innerHTML;
        }
      });
    } else {
      document.querySelectorAll("span").forEach((y) => {
        if (x.name === y.id) {
          y.innerHTML = ``;
          err[x.name] = '';
        }
      });
      obj[x.name] = x.value;
    }
  });

  // Perform select validation
  select.forEach((x) => {
    if (x.value === "") {
      document.querySelectorAll(".select").forEach((y) => {
        if (x.name === y.id) {
          y.innerHTML = `${x.name} is required !`;
          err[x.name] = y.innerHTML;
        }
      });
    } else if (x.value) {
      document.querySelectorAll(".select").forEach((y) => {
        if (x.name === y.id) {
          y.innerHTML = ``;
          err[x.name] = "";
        }
      });
      obj[x.name] = x.value;
    }
  });

  // Perform radio button validation
  if (!radio) {
    document.getElementById("lastdonate").innerHTML =
      "Please select any of the options above";
    err.lastdonate = "Please select any of the options above";
  } else {
    document.getElementById("lastdonate").innerHTML = "";
    if (radio !== undefined) {
      obj["last-3-month-donate"] = radio;
      err.lastdonate = "";
    }
  }

  // Perform SDP validation
  if (!sdp) {
    document.getElementById("sdp").innerHTML =
      "Please select any of the options above";
    err.sdp = "Please select any of the options above";
  } else {
    document.getElementById("sdp").innerHTML = "";
    if (sdp !== undefined) {
      obj["SDP"] = sdp;
      err.sdp = "";
    }
  }

  console.log("Form submitted successfully:", obj);

  const hasErrors = Object.values(err).some((x) => x !== '');
  // Send form data to the API endpoint
  if (!hasErrors) {
    $.ajax({
      url: "https://api.apispreadsheets.com/data/FHShrM4vadQQaHSz/",
      type: "post",
      data: $("#form").serializeArray(),
      success: function () {
        document.getElementById("form").reset();
        document.getElementById("abc").style.display = "block";
        setTimeout(() => {
          document.getElementById("abc").style.display = "block";
        }, 10000);
      },
      error: function () {
        alert("There was an error :(");
      },
    });
  }
};

const form = document.querySelector(".form");
const spans = document.querySelectorAll(".span");
const nameOfVolunteer = document.querySelector("#name");
const phone = document.querySelector("#phone");
const select = document.querySelector("#interest");

async function createVolunteer() {
  let interest = select.options[select.selectedIndex];

  const newVolunteer = {
    name: nameOfVolunteer.value,
    phone: phone.value,
    interest: interest.text
  };

  await axios.post('https://api-form-ibms.onrender.com/volunteer/create', newVolunteer)
    .then(response => {
      nameOfVolunteer.value = '';
      phone.value = '';
      $.notify("Cadastro realizado", { position: "top center", className: "success" });
    })
    .catch(err => {
      $.notify("Voluntário já cadastrado", { position: "top center", className: "error" });
      console.log(err)
    });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (nameValid() & phoneNumberValid()) {
    createVolunteer(); 
  }
  else {
    $.notify("Preencha os campos corretamente", { position: "top center", className: "error" })
  }

});

const phoneNumberValid = () => {
  let text = phone.value.trim();
  let length = text.length;
  let ret = false;

  if (length > 0 & length < 9) {
    spans[1].style.display = 'block'
  }
  else if (length >= 9) {
    spans[1].style.display = 'none';
    ret = true;
  }
  else if (length === 0) {
    spans[1].style.display = 'none';
    ret = false;
  }

  return ret;
};

const nameValid = () => {
  let text = nameOfVolunteer.value.trim();
  let length = text.length;
  let ret = false;

  if (length > 0 & length <= 10) {
    spans[0].style.display = 'block'
  }
  else if (length > 10) {
    spans[0].style.display = 'none';
    ret = true;
  }
  else if (length === 0) {
    spans[0].style.display = 'none';
    ret = false;
  }

  return ret;
};

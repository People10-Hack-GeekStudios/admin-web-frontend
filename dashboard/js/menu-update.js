let base_url = 'https://api.fud4.me'
let version = 'v1'

function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get('id')

if (id === undefined || id == '' || queryString === '') {
  alert('ID is required in the url.')
  window.location.href = "menu.html";
};

async function fetch_menu(){

  let _data = {
    id : id
  }
  let menu_name = document.getElementById("menu_name")
  let menu_quantity = document.getElementById("menu_quantity")

  await fetch(base_url + '/user/' + version + '/menu/get-specific-admin', {
    method: "POST",
    body: JSON.stringify(_data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "authorization": "Bearer " + getCookie('access-token')
    },
    mode: 'cors'
  })
    .then(response => {
      var data = response.json()
      return data
    }
    )
    .then(data => {
      menu_name.innerHTML = '<b>Edit quanity of '+ data.response.data.name +' <i class="fas fa-edit"></i></b>'
      menu_quantity.value = data.response.data.per_day_quantity
      console.log(data)
    })
    .catch(err => { console.log(err); });
}

fetch_menu()

// Form Validation

$("#form").submit(async function (event) {
  event.preventDefault()

  var menu_quantity = document.form1.menu_quantity.value;
  var btn = document.form1.btn;
  var msg = document.getElementById('msg');

  let _data = {
    id : id,
    quantity: parseInt(menu_quantity)
  }

  btn.disabled = true;

  await fetch(base_url + '/user/' + version + '/menu/update-specific-admin/', {
    method: "POST",
    body: JSON.stringify(_data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "authorization": "Bearer " + getCookie('access-token')
    },
    mode: 'cors'
  })
    .then(response => {
      var data = response.json()
      return data
    }
    )
    .then(data => {
      console.log(data)
      if (data.response_code == 200) {
        msg.innerHTML = '<div class="alert alert-success" role="alert">'+data.message+'</div>'
        window.location.href = "./menu.html";
      } else if (data.response_code == 400 || data.response_code == 500) {
        msg.innerHTML = '<div class="alert alert-danger" role="alert">'+data.message+'</div>'
        btn.disabled = false;
      } else if (data.response_code == 401 || data.response_code == 403) {
        window.location.href = "logout.html";
      } else {
        msg.innerHTML = '<div class="alert alert-danger" role="alert">'+data.message+'</div>'
        btn.disabled = false;
      }
    })
    .catch(err => { console.log(err); });
})
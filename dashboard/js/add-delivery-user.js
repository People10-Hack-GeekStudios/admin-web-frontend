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

// Form Validation

$("#form").submit(async function (event) {
  event.preventDefault()

  var password = document.form1.password.value;
  var btn = document.form1.btn;
  var msg = document.getElementById('msg');

  let _data = {
    password: password
  }

  btn.disabled = true;

  await fetch(base_url + '/auth/' + version + '/generate/delivery/user', {
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
        setTimeout(() => {
          window.location.href = "./delivery-users.html";
        }, 2000)
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
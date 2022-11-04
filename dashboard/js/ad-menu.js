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

  var btn = document.form1.btn;
  var msg = document.getElementById('msg');

  btn.disabled = true;
  btn.value = 'Submitting'

  var image = document.getElementById('image')

  var arr = ['name', 'food_type', 'per_day_quantity', 'price']

  let img

  var img_data = new FormData()
  img_data.append('file', image.files[0])

  arr.forEach(element => {
    if(element == 'per_day_quantity' || element == 'price'){
      img_data.append(element, parseInt(document.form1[element].value))
    }else{
      img_data.append(element, document.form1[element].value)
    }
  })

  await fetch(base_url + '/upload/' + version + '/menu/add/', {
    method: "POST",
    body: img_data,
    headers: {
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
      if (data.response_code == 200) {
        msg.innerHTML = '<div class="alert alert-success" role="alert">' + data.message + '</div>'
        btn.disabled = false;
        btn.value = 'Add'
        msg.focus()
        window.location.href = "./menu.html";
      } else if (data.response_code == 400 || data.response_code == 500) {
        msg.innerHTML = '<div class="alert alert-danger" role="alert">' + data.message + '</div>'
        btn.disabled = false;
        btn.value = 'Add'
        msg.focus()
        btn.disabled = false;
      } else if (data.response_code == 401 || data.response_code == 403) {
        window.location.href = "logout.html";
      } else {
        msg.innerHTML = '<div class="alert alert-danger" role="alert">' + data.message + '</div>'
        btn.disabled = false;
        btn.value = 'Add'
        msg.focus()
        btn.disabled = false;
      }
    })
    .catch(err => {
      msg.innerHTML = '<div class="alert alert-danger" role="alert">Server error, please try after sometime.</div>'
      btn.disabled = false;
      btn.value = 'Add'
      msg.focus()
      btn.disabled = false;
      console.log(err);
    });
})
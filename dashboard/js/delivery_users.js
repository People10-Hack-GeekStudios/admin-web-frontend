let base_url = 'https://api.fud4.me'
let version = 'v1'

// Form Validation
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

async function users() {
  let main_data
  await fetch(base_url + '/user/' + version + '/shop/profile/delivery/users', {
    method: "GET",
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
      if (data.response_code == 200) {
        main_data = data.response
      } else if (data.response_code == 401 || data.response_code == 403) {
        window.location.href = "logout.html";
      }
    })
    .catch(err => { console.log(err); });

  return main_data
}

$(document).ready(async function () {
  let load_spinner = document.getElementById("load_spinner")
  let data = await users()
  let arr = []
  data.forEach(element => {
    let test_arr = []
    test_arr.push(element.uid)
    test_arr.push((new Date(element.created_at)).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }))
    if (element.is_blocked) {
      test_arr.push("<p style='color: red'>Blocked ❌</p>")
      test_arr.push(`<a onclick="blockFunction('` + element._id + `','u')" class="btn btn-success btn-block">Un-Block <i class="fas fa-lock-open"></i></a>`)
    } else {
      test_arr.push("<p style='color: green'>Not Blocked ✅</p>")
      test_arr.push(`<a onclick="blockFunction('` + element._id + `','b')" class="btn btn-danger btn-block">Block <i class="fas fa-lock"></i></a>`)
    }
    arr.push(test_arr)
  });
  load_spinner.remove()
  $('#dataTable').DataTable({
    data: arr,
    columns: [
      { title: 'User Id' },
      { title: 'Created At' },
      { title: 'Blocked' },
      { title: 'Action' }
    ],
    columnDefs: [{
      "defaultContent": "-",
      "targets": "_all"
    }]
  });
});

const blockFunction = async (u_id, action) => {
  let _data = {
    id : u_id
  }

  let response_text = ''

  if(action == 'b'){
    _data.is_blocked = true
    response_text = "User blocked successfully ✅"
  }else{
    _data.is_blocked = false
    response_text = "User un-blocked successfully ✅"
  }

  await fetch(base_url + '/user/' + version + '/shop/profile/delivery/users/block', {
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
      if (data.response_code == 200) {
        alert(response_text)
        location.reload();
      } else if (data.response_code == 401 || data.response_code == 403) {
        window.location.href = "logout.html";
      } else {
        alert(data.message)
      }
    })
    .catch(err => { console.log(err); });
}
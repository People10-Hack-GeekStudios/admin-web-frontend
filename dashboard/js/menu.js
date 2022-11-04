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
  await fetch(base_url + '/user/' + version + '/menu/get-admin', {
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
        main_data = data.response.data
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
    test_arr.push(element.name)
    test_arr.push(element.food_type.charAt(0).toUpperCase() + element.food_type.slice(1))
    test_arr.push('<img src="' + element.image + '" width="70">')
    test_arr.push(element.price)
    test_arr.push(element.quantity)
    test_arr.push((new Date(element.created_at)).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }))
    test_arr.push((element.donated) ? "<p style='color: green'>Donated ✅</p>" : "<p style='color: red'>Not Donated ❌</p>")
    test_arr.push('<a href="menu-update.html?id=' + element._id + '" class="btn btn-dark btn-block">Update <i class="fas fa-edit"></i></a>')
    arr.push(test_arr)
  });
  load_spinner.remove()
  $('#dataTable').DataTable({
    data: arr,
    columns: [
      { title: 'Name' },
      { title: 'Food Category' },
      { title: 'Image' },
      { title: 'Price' },
      { title: 'Quantity Left' },
      { title: 'Order Date' },
      { title: 'Donated' },
      { title: 'Action' }
    ],
    columnDefs: [{
      "defaultContent": "-",
      "targets": "_all"
    }]
  });
});

let lat
let lon

var x = document.getElementById("demo");
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert('Please allow geo location')
  }
}

function showPosition(position) {
  lat = position.coords.latitude
  lon = position.coords.longitude
}

async function donateFood() {
  await fetch(base_url + '/user/' + version + '/menu/donate', {
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
        alert("Left over food marked as donated successfully ✅. You did a great job by helping the needy 🤝. Someone will contact you for the donation soon 😇.")
        location.reload();
      } else if (data.response_code == 401 || data.response_code == 403) {
        window.location.href = "logout.html";
      } else {
        alert(data.message)
      }
    })
    .catch(err => { console.log(err); });
}

$("#donate").click(async function () {
  let _data = {
    lat: lat,
    lon: lon
  }
  await fetch(base_url + '/user/' + version + '/shop/profile/update/', {
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
        donateFood()
      } else if (data.response_code == 401 || data.response_code == 403) {
        window.location.href = "logout.html";
      } else {
        alert(data.message)
      }
    })
    .catch(err => { console.log(err); });
});

getLocation()
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

let server_stat = {
  200 : '<div class="h6 mb-0 mt-1 text-gray-800">Server Status : <span class="font-weight-bold green">200</span></div>',
  500 : '<div class="h6 mb-0 mt-1 text-gray-800">Server Status : <span class="font-weight-bold red">500</span></div>'
}

let db_stat = {
  200 : '<div class="h6 mb-0 mt-1 text-gray-800">DB Status : <span class="font-weight-bold green">200</span></div>',
  500 : '<div class="h6 mb-0 mt-1 text-gray-800">DB Status : <span class="font-weight-bold red">500</span></div>'
}

let cache_db_stat = {
  200 : '<div class="h6 mb-0 mt-1 text-gray-800">Cache DB Status : <span class="font-weight-bold green">200</span></div>',
  500 : '<div class="h6 mb-0 mt-1 text-gray-800">Cache DB Status : <span class="font-weight-bold red">500</span></div>'
}

let icon_stat = {
  600 : '<i class="fas fa-check-circle fa-3x green"></i>',
  1500 : '<i class="fas fa-times-circle fa-3x red"></i>',
  1200 : '<i class="fas fa-times-circle fa-3x red"></i>',
  900 : '<i class="fas fa-exclamation-circle fa-3x orange"></i>'
}

let action_stat = {
  600 : '<div class="h6 mt-1 mb-0 text-gray-800">Action : <span class="font-weight-bold green">Not Required</span></div>',
  1500 : '<div class="h6 mt-1 mb-0 text-gray-800">Action : <span class="font-weight-bold red">Required</span></div>',
  1200 : '<div class="h6 mt-1 mb-0 text-gray-800">Action : <span class="font-weight-bold red">Required</span></div>',
  900 : '<div class="h6 mt-1 mb-0 text-gray-800">Action : <span class="font-weight-bold red">Required</span></div>'
}

async function auth_service(){
  let service = document.getElementById("auth_service")
  let var_name = "Auth Service"
  var date = new Date();
  await fetch(base_url + '/auth/' + version + '/healthcheck', {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
    mode: 'cors'
  })
    .then(response => {
      var data = response.json()
      return data
    }
    )
    .then(data => {
      service.innerHTML = '<div class="col mr-2"><div class="h5 font-weight-bold mine-dark text-uppercase mb-4">'+var_name+'</div>'+server_stat[data.response_code]+db_stat[data.response.database_code]+cache_db_stat[data.response.cache_database_code]+action_stat[data.response_code+data.response.database_code+data.response.cache_database_code]+'<div class="h6 mt-1 mb-0 text-gray-800">Last Updated : <span class="font-weight-bold mine-light-dark">'+('00' + (date.getMonth() + 1)).slice(-2)+ '/' + ('00' + date.getDate()).slice(-2)+ '/' + date.getFullYear() + ' '+ ('00' + date.getHours()).slice(-2) + ':'+ ('00' + date.getMinutes()).slice(-2)+ ':' + ('00' + date.getSeconds()).slice(-2)+'</span></div></div><div class="col-auto">'+icon_stat[data.response_code+data.response.database_code+data.response.cache_database_code]+'</div>'
    })
    .catch(err => { console.log(err); });
}

setTimeout(function () {auth_service()}, 200);
setInterval(function () {auth_service()}, 5000);

async function user_service(){
  let service = document.getElementById("user_service")
  let var_name = "User Service"
  var date = new Date();
  await fetch(base_url + '/user/' + version + '/healthcheck', {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
    mode: 'cors'
  })
    .then(response => {
      var data = response.json()
      return data
    }
    )
    .then(data => {
      service.innerHTML = '<div class="col mr-2"><div class="h5 font-weight-bold mine-dark text-uppercase mb-4">'+var_name+'</div>'+server_stat[data.response_code]+db_stat[data.response.database_code]+cache_db_stat[data.response.cache_database_code]+action_stat[data.response_code+data.response.database_code+data.response.cache_database_code]+'<div class="h6 mt-1 mb-0 text-gray-800">Last Updated : <span class="font-weight-bold mine-light-dark">'+('00' + (date.getMonth() + 1)).slice(-2)+ '/' + ('00' + date.getDate()).slice(-2)+ '/' + date.getFullYear() + ' '+ ('00' + date.getHours()).slice(-2) + ':'+ ('00' + date.getMinutes()).slice(-2)+ ':' + ('00' + date.getSeconds()).slice(-2)+'</span></div></div><div class="col-auto">'+icon_stat[data.response_code+data.response.database_code+data.response.cache_database_code]+'</div>'
    })
    .catch(err => { console.log(err); });
}

setTimeout(function () {user_service()}, 200);
setInterval(function () {user_service()}, 5000);

async function upload_service(){
  let service = document.getElementById("upload_service")
  let var_name = "Upload Service"
  var date = new Date();
  await fetch(base_url + '/upload/' + version + '/healthcheck', {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
    mode: 'cors'
  })
    .then(response => {
      var data = response.json()
      return data
    }
    )
    .then(data => {
      service.innerHTML = '<div class="col mr-2"><div class="h5 font-weight-bold mine-dark text-uppercase mb-4">'+var_name+'</div>'+server_stat[data.response_code]+db_stat[data.response.database_code]+cache_db_stat[data.response.cache_database_code]+action_stat[data.response_code+data.response.database_code+data.response.cache_database_code]+'<div class="h6 mt-1 mb-0 text-gray-800">Last Updated : <span class="font-weight-bold mine-light-dark">'+('00' + (date.getMonth() + 1)).slice(-2)+ '/' + ('00' + date.getDate()).slice(-2)+ '/' + date.getFullYear() + ' '+ ('00' + date.getHours()).slice(-2) + ':'+ ('00' + date.getMinutes()).slice(-2)+ ':' + ('00' + date.getSeconds()).slice(-2)+'</span></div></div><div class="col-auto">'+icon_stat[data.response_code+data.response.database_code+data.response.cache_database_code]+'</div>'
    })
    .catch(err => { console.log(err); });
}

setTimeout(function () {upload_service()}, 200);
setInterval(function () {upload_service()}, 5000);

async function daily_count(){
  let earnings_div = document.getElementById("earnings_div")
  let orders_div = document.getElementById("orders_div")
  let quantity_div = document.getElementById("quantity_div")
  await fetch(base_url + '/user/' + version + '/order/todays-order-admin', {
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
      if(data.response_code==200){
        //service.innerHTML = data.response.data
        let amount = 0
        let order = 0
        let quantity = 0
        order = data.response.length
        data.response.forEach(element => {
          if(element.payment_completed){
            amount += element.amount
            element.order.forEach(ele => {
              quantity += ele.quantity
            })
          }
        });
        earnings_div.innerHTML = '<div class="col mr-2"><div class="h5 font-weight-bold mine-dark text-uppercase mb-4">Todays Earnings</div><div class="h5 mt-1 mb-0 text-gray-800">₹ '+ amount.toString() +'</div></div><div class="col-auto"><img src="./img/amount.png" width="80"></div>'
        orders_div.innerHTML = '<div class="col mr-2"><div class="h5 font-weight-bold mine-dark text-uppercase mb-4">Todays Orders</div><div class="h5 mt-1 mb-0 text-gray-800">'+ order.toString() +'</div></div><div class="col-auto"><img src="./img/order.png" width="80"></div>'
        quantity_div.innerHTML = '<div class="col mr-2"><div class="h5 font-weight-bold mine-dark text-uppercase mb-4">Quantity Sold</div><div class="h5 mt-1 mb-0 text-gray-800">'+ quantity.toString() +'</div></div><div class="col-auto"><img src="./img/quantity.png" width="80"></div>'
        console.log(data.response)
      } else if (data.response_code==401 || data.response_code==403){
          window.location.href = "logout.html";
      } else{
        console.log(data)
      }
    })
    .catch(err => { console.log(err); });
}

setTimeout(function () {daily_count()}, 200);
setInterval(function () {daily_count()}, 5000);

async function recommend_fetch(){
  let recommend_div = document.getElementById("recommend_div")
  //let var_name = "Upload Service"
  //var date = new Date();
  await fetch(base_url + '/user/' + version + '/order/recommended-order-admin', {
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
      console.log(data.response)
      recommend_div.innerHTML = '<div class="h5 font-weight-bold mine-dark text-uppercase mb-1 w-100">Recommended Daily Quantities</div>'
      let rec = ''
      data.response.forEach(ele => {
        rec += '<div class="col-sm-3 mt-4"><div class="row"><div class="col-auto"><img src="'+ ele.image +'" width="80"></div><div class="col mr-2"><div class="h5 mt-1 mb-0 text-gray-800 mt-3">'+ ele.name +'</div><div class="h5 mt-1 mb-0 text-gray-800">Quantity : '+ Math.ceil(ele.total / 7) +'</div></div></div></div>'
      })
      if(rec != ''){
        recommend_div.innerHTML += rec
      }else{
        recommend_div.innerHTML += '<div class="h6 mine-dark text-uppercase mb-4 w-100">No Recommendations available 😔</div>'
      }
    })
    .catch(err => { console.log(err); });
}

setTimeout(function () {recommend_fetch()}, 200);
setInterval(function () {recommend_fetch()}, 5000);
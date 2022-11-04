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
  await fetch(base_url + '/user/' + version + '/order/all-order-admin', {
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
    test_arr.push((element.ordered_by) ? element.ordered_by.name : 'User')
    test_arr.push(element.order.length)
    let orders = ''
    element.order.forEach(element => {
      orders += element.food.name + '-' + element.quantity + ', '
    })
    orders = orders.slice(0, -2)
    test_arr.push(orders)
    test_arr.push('₹ ' + element.amount.toString() + '/-')
    test_arr.push((element.payment_completed) ? '<span class="green">Completed</span>' : '<span class="red">Not Completed</span>')
    let order_status = ''
    switch (element.order_status) {
      case 'created': order_status = '<span class="box-orange">'+ (element.order_status.charAt(0).toUpperCase() + element.order_status.slice(1)) +'</span>'; break;
      case 'preparing': order_status = '<span class="box-blue">'+ (element.order_status.charAt(0).toUpperCase() + element.order_status.slice(1)) +'</span>'; break;
      case 'ready': order_status = '<span class="box-green">'+ (element.order_status.charAt(0).toUpperCase() + element.order_status.slice(1)) +'</span>'; break;
      case 'delivered': order_status = '<span class="box-black">'+ (element.order_status.charAt(0).toUpperCase() + element.order_status.slice(1)) +'</span>'; break;
    }
    test_arr.push(order_status)
    test_arr.push((new Date(element.created_at)).toLocaleString())
    arr.push(test_arr)
  });
  load_spinner.remove()
  $('#dataTable').DataTable({
    data: arr,
    columns: [
      { title: 'Ordered By' },
      { title: 'No. of items' },
      { title: 'Items' },
      { title: 'Price' },
      { title: 'Payment Status' },
      { title: 'Order Status' },
      { title: 'Order Date' }
    ],
    columnDefs: [{
      "defaultContent": "-",
      "targets": "_all"
    }]
  });
});
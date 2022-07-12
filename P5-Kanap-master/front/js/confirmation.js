const params = window.location.href;
var url = new URL(params);
var id = url.searchParams.get("id");

let Order = document.getElementById("orderId");
Order.textContent = id;
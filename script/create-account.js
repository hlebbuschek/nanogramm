import { createAccount } from "../data/accounts.js";
// createAccount('admin', 'mainAkk-001', '1423');
document.querySelector('.create-button').addEventListener('click', () => {
  const username = document.querySelector(".username").value;
  let password = '';
  if (document.querySelector(".password").value == document.querySelector(".password-copy").value) {
    password = document.querySelector(".password").value;
  } else {
    document.querySelector(".false-password").innerHTML = "The passwords are not matching!";
  }
  const pin = document.querySelector(".pin").value;
  if (!password == '') {
    createAccount(username, password, pin);
    window.location.href = `menu.html?username=${encodeURIComponent(username)}`
  } 
});
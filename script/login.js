import { accounts } from "../data/accounts.js";

document.querySelector('.login-button').addEventListener('click', () => {
  const username = document.querySelector('.username').value;
  const password = document.querySelector('.password').value;

  const found = accounts.find(acc => acc.username = username && acc.password == password);
  if (found) {
    // localStorage.setItem('loggedUser', JSON.stringify(found));
    window.location.href = `menu.html?username=${encodeURIComponent(username)}`
  } else {
    // document.getElementsByTagName('input').forEach(element => {
    //   element.value = '';
    // });
    alert("Invalid password or username. Try it again or use 'Forgot password'.")
  }
});
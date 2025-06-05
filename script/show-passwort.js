import {findMatchingAccount} from '../data/accounts.js'; 
document.querySelector('.show-password-btn')
  .addEventListener('click', () => {
    const username = document.querySelector('.username').value;
    const pin = document.querySelector('.pin').value;
    const matchingUser = findMatchingAccount(username);
    if (matchingUser) {
      document.querySelector('.show-password').innerHTML = matchingUser.showForgotedPassword(pin);
    } else {
      alert('The user was not found. Try again or create a new account.')
    } 
  });
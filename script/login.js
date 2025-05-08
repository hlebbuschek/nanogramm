document.querySelector('.login-button').addEventListener('click', () => {
  const userName = document.querySelector('.user-name').value;
  const password = document.querySelector('.password').value;
  console.log(`${userName} and ${password}`);
  window.location.href = "index.html"
});
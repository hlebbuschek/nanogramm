document.querySelectorAll('.eye-btn')
  .forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.id;
      const input = document.getElementById(`${id}-input`);
      if (input.type === "password") {
        input.type = "text";
        btn.innerHTML = `
        <img src="img/eye.png">`;
      }
      else if (input.type === "text") {
        input.type = "password";
        btn.innerHTML = `
        <img src="img/eye-close.png">`;
      }  
    });
  });
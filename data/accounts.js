let accounts = []; 
class Account {
  constructor(id, userName, password) {
    this.id = id;
    this.userName = userName;
    this.password = password;
    this.levels = [];
  }
  createNewAccount() {
    if (accounts.indexOf(this.userName) > -1) {
      const item = 
      accounts.push(item);
    }
  }
}
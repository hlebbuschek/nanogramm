import {newLevels as lvl} from "./data.js";
// export let accounts = JSON.parse(localStorage.getItem('accounts')) || []; 
const defaultAccounts = [{"userName":"admin","password":"mainAkk-001","pin":"1423","levels":[]},{"userName":"hleb","password":null,"pin":"1423","levels":[]},{"userName":"fox_in","password":"inI<3","pin":"1111","levels":[]},{"userName":"olimpia","password":"TOP1","pin":"1122","levels":[]},{"userName":"hlebbuschek","password":"TheM0$+Simple","pin":"0000","levels":[[[true,false,true,false],[false,true,true,true],[false,true,false,false],[true,true,false,true]],[[false,false,true,false,true],[false,true,true,true,false],[true,true,true,true,true],[true,true,true,true,false],[false,true,true,false,false]],[[false,false,true,true,false,false],[false,true,true,true,true,false],[true,true,true,true,true,true],[false,true,true,true,true,false],[true,true,true,true,true,true],[false,false,true,true,false,false]],[[false,true,false,false,false,true,false],[true,false,true,false,true,false,true],[false,true,true,true,true,true,false],[false,true,true,true,true,true,false],[false,true,true,true,true,true,false],[true,true,true,true,true,true,true],[false,true,false,false,false,true,false]]]}];

class Account {
  constructor(username, password, pin, levels = lvl) {
    this.userName = username;
    this.password = password;
    this.pin = pin;
    this.levels = levels;
  }  
  showForgotedPassword(pin) {
    if (pin === this.pin) {
      return this.password;
    } else {
      alert("Your PIN is invalid! Try it again!")
    }
  }
}

export let accounts = JSON.parse(localStorage.getItem('accounts') || JSON.stringify(defaultAccounts))
  .map(acc => Object.assign(new Account(), acc));

export function createAccount(name, password, pin, lvl = []) {
  let result = {};
  // const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
  const exists = accounts.some(acc => acc.userName === name);
  if (exists) {
    alert("Username already exists!");
  } else {
    result = new Account(name, password, pin, lvl);
    accounts.push(result);
    localStorage.setItem('accounts', JSON.stringify(accounts));
  }
}

export function findMatchingAccount(username) {
  const matchingItem = //accounts.some(acc => acc.userName === username);
  accounts.find(acc => {
    if (acc.userName === username) {
      return true;
    }
  });
  return matchingItem;
}


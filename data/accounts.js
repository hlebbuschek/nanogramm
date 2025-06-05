import {baselvls} from "./data.js";
import { Level } from "./data.js";
const defaultAccounts = [
  {"userName":"admin","password":"mainAkk-001","pin":"1423","levels":[]},
  {"userName":"hleb","password":"pass4hleb","pin":"1234","levels":[]},
  {"userName":"fox_in","password":"inI<3","pin":"1111","levels":[]},
  {"userName":"olimpia","password":"TOP1","pin":"1122","levels":[]},
  {"userName":"hlebbuschek","password":"TheM0$+Simple","pin":"0000","levels":[]},
  {"userName":"florida","password":"itsaUSA","pin":"0407","levels":[]}
];

class Account {
  constructor(username, password, pin, levels = []) {
    this.userName = username;
    this.password = password;
    this.pin = pin;
    this.levels = levels.length ? this.createLevels(levels) : this.createLevels(baselvls);
  }  
  createLevels(oldLevels) {
    return oldLevels.map((lvl, index) =>
      new Level(lvl.id ?? index + 1, lvl.table ?? lvl.solution ?? lvl, lvl.isOpen ?? false));
  }
  showForgotedPassword(pin) {
    if (pin === this.pin) {
      return this.password;
    } else {
      alert("Your PIN is invalid! Try it again!")
    }
  }
}
export let accounts = (JSON.parse(localStorage.getItem('accounts')) || defaultAccounts)
  .map(acc => new Account(acc.userName, acc.password, acc.pin, acc.levels));
localStorage.setItem('accounts', JSON.stringify(accounts));
export function createAccount(name, password, pin, lvl = []) {
  const exists = accounts.some(acc => acc.userName === name);
  if (exists) {
    alert("Username already exists!");
    return;
  } 
  const result = new Account(name, password, pin, lvl);
  accounts.push(result);
  localStorage.setItem('accounts', JSON.stringify(accounts.map(serializeAccount)));
}

function serializeAccount(account) {
  return {
    userName: account.userName,
    password: account.password,
    pin: account.pin,
    levels: account.levels.map(lvl => lvl.solution ?? lvl) // robust für Level-Instanzen oder rohe
  };
}

export function findMatchingAccount(username) {
  return accounts.find(acc => acc.userName === username);
}
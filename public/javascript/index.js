/* eslint-disable */
import "@babel/polyfill";
import { Validator } from "./formValidation";
import { handleUser, handleWriteReview, handleBlog } from "./handleUser";
import { logout } from "./login";
// import { updateSettings } from './updateSettings';

// DOM ELEMENTS
const loginForm = document.querySelector("#login-form");
const registerForm = document.querySelector("#register-form");
const btnLogout = document.querySelector(".btn-logout");
const writeForm = document.querySelector(".form__write");
const changeInfoForm = document.querySelector(".form-change-info");
const changePassword = document.querySelector(".form-change-password");

// const logOutBtn = document.querySelector('.nav__el--logout');
// const userDataForm = document.querySelector('.form-user-data');
// const userPasswordForm = document.querySelector('.form-user-password');

// DELEGATION
if (loginForm) {
  var handleForm = new Validator("#login-form", "login");
  // loginForm.addEventListener('submit', e => {
  //   e.preventDefault();
  //   const email = loginForm.querySelector('#email').value;
  //   const password = loginForm.querySelector('#password').value;
  //   login(email, password);
  // });
}

if (registerForm) {
  var handleForm = new Validator("#register-form", "signup");
}

if (writeForm) {
  var handleForm = new Validator(".form__write", "postBlog");
}

if (changeInfoForm) {
  var handleForm = new Validator(".form-change-info", "changeInfoUser");
}

if (changePassword) {
  var handleForm = new Validator(".form-change-password", "changePassword");
}

handleUser();
handleWriteReview();
handleBlog();
if (btnLogout) btnLogout.addEventListener("click", logout);

// if (userDataForm)
//   userDataForm.addEventListener('submit', e => {
//     e.preventDefault();
//     const name = document.getElementById('name').value;
//     const email = document.getElementById('email').value;
//     updateSettings({ name, email }, 'data');
//   });

// if (userPasswordForm)
//   userPasswordForm.addEventListener('submit', async e => {
//     e.preventDefault();
//     document.querySelector('.btn--save-password').textContent = 'Updating...';

//     const passwordCurrent = document.getElementById('password-current').value;
//     const password = document.getElementById('password').value;
//     const passwordConfirm = document.getElementById('password-confirm').value;
//     await updateSettings(
//       { passwordCurrent, password, passwordConfirm },
//       'password'
//     );

//     document.querySelector('.btn--save-password').textContent = 'Save password';
//     document.getElementById('password-current').value = '';
//     document.getElementById('password').value = '';
//     document.getElementById('password-confirm').value = '';
//   });

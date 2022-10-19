// HTML містить розмітку форми.Напиши скрипт, який буде зберігати
// значення полів у локальне сховище, коли користувач щось друкує.
// Відстежуй на формі подію input, і щоразу записуй у локальне сховище
// об'єкт з полями email і message, у яких зберігай поточні значення
// полів форми.Нехай ключем для сховища буде рядок "feedback-form-state".
// Під час завантаження сторінки перевіряй стан сховища, і якщо там є
// збережені дані, заповнюй ними поля форми.В іншому випадку поля повинні
// бути порожніми.
// Під час сабміту форми очищуй сховище і поля форми, а також виводь у
// консоль об'єкт з полями email, message та їхніми поточними значеннями.
// Зроби так, щоб сховище оновлювалось не частіше, ніж раз на 500 мілісекунд.
// Для цього додай до проекту і використовуй бібліотеку lodash.throttle.

import throttle from "lodash.throttle";

const form = document.querySelector(".feedback-form");
// const formEmail = form.querySelector('input[name="email"]');
// const formTextarea = form.querySelector('textarea[name="message"]');
const STORAGE_KEY = "feedback-form-state";
const inputsData = {};
const savedData = localStorage.getItem(STORAGE_KEY);
const savedDataObject = JSON.parse(savedData);

// console.log(savedData);
// console.log(Object.keys(savedDataObject));
// console.log(Object.values(savedDataObject));

form.addEventListener("submit", onFormSubmit);
form.addEventListener("input", throttle(onInputsChange, 500));

onPageReload();

function onInputsChange(event) {
  inputsData[event.target.name] = event.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(inputsData));
}

function onFormSubmit(event) {
  event.preventDefault();
  if (
    event.currentTarget.elements.email.value == "" ||
    event.currentTarget.elements.message.value == ""
  ) {
    alert("Всі поля повинні бути заповнені!");
  } else {
    const formData = {
      email: event.currentTarget.elements.email.value,
      message: event.currentTarget.elements.message.value,
    };
    console.log(formData);
    event.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
  }
}

function onPageReload() {
  if (savedData) {
    for (let el of form.elements) {
      if (Object.keys(savedDataObject).includes(el.name)) {
        let i = Object.keys(savedDataObject).indexOf(el.name);
        el.value = Object.values(savedDataObject)[i];
      }
    }

    // if (savedDataObject.email) {
    //   formEmail.value = savedDataObject.email;
    // }
    // if (savedDataObject.message) {
    //   formTextarea.value = savedDataObject.message;
    // }
  }
}

const passwordLength = document.querySelector('#passwordLength');
const generateButton = document.querySelector('#generateButton');
const passwordInput = document.querySelector('#passwordInput');
const lowercaseCharsInput = document.querySelector('#lowercaseCharsInput');
const capitalCharsInput = document.querySelector('#capitalCharsInput');
const numbersInput = document.querySelector('#numbersInput');
const symbolInput = document.querySelector('#symbolInput');
const errorBlock = document.querySelector('#errorBlock');
const errorText = document.querySelector('#errorText');
const passwordsList = document.querySelector('#passwordsList');

const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
const capitalChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbers = '0123456789';
const symbols = '!@#$%^&*-_';

let generatedPasswordsCount = 1;

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const setErrorText = (input, text) => input.innerHTML = text;

const validation = () => {
  let errorCount = 0;
  let isError;

  if (+passwordLength.value < 4 || +passwordLength.value > 64) {
    errorBlock.className = 'error';

    setErrorText(errorText, 'Длина пароля: от 4 до 64 символов!');

    errorCount += 1;
  }

  if (!(+passwordLength.value)) {
    errorBlock.className = 'error';

    setErrorText(errorText, 'Длина введенна некорректно');

    errorCount += 1;
  }

  errorCount > 0 ? isError = true : isError = false;

  return isError;
};

const generateRandomPassword = () => {
  let randomNumber;
  let randomSymbol;
  let generatedPassword = '';
  let arr = [];

  if (lowercaseCharsInput.checked) {
    arr.push(lowercaseChars);
  }

  if (capitalCharsInput.checked) {
    arr.push(capitalChars);
  }

  if (numbersInput.checked) {
    arr.push(numbers);
  }

  if (symbolInput.checked) {
    arr.push(symbols);
  }

  for (let i = 0; i < passwordLength.value; i++) {
    randomSymbol = getRandomInt(0, arr.length - 1);
    randomNumber = getRandomInt(0, arr[randomSymbol].length - 1);

    generatedPassword += arr[randomSymbol][randomNumber];
  }

  passwordInput.value = generatedPassword;
  passwordsList.innerHTML += `<li class="history__password"><span class="password__number">${generatedPasswordsCount}.</span> ${generatedPassword}</li>`;

  generatedPasswordsCount++;

  return generatedPassword;
};

generateButton.addEventListener('click', () => {
  errorBlock.className = 'error display-none';

  if (!validation()) {
    generateRandomPassword()
  } else {
    passwordInput.value = '';
  }
});

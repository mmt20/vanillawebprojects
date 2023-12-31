const currencyEl_one = document.getElementById("currency-one");
const amountEl_one = document.getElementById("amount-one");
const currencyEl_two = document.getElementById("currency-two");
const amountEl_two = document.getElementById("amount-two");

const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");
// `https://v6.exchangerate-api.com/v6/268b434feb87469a0d554655/latest/${currency_one}`

//Fetch exhange rate and update the DOM
function caclulate() {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;
  // console.log(currency_one, currency_two);
  fetch(`https://open.exchangerate-api.com/v6/latest/${currency_one}`)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      const rate = data.rates[currency_two];
      rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
      amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
    });
}

//Event Listeners
currencyEl_one.addEventListener("change", caclulate);
amountEl_one.addEventListener("input", caclulate);
currencyEl_two.addEventListener("change", caclulate);
amountEl_two.addEventListener("input", caclulate);
swap.addEventListener("click", () => {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  caclulate();
});
caclulate();

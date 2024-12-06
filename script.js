const form = document.querySelector('.form');
let amt;
const switchButton = document.querySelector('.switch');
const result = document.querySelector('.result');
loadCurrencies();
const API_KEY; //input your api key (can be generated for free from exchange rate api



form.addEventListener('submit', async function(e){
  e.preventDefault();
  amt = document.querySelector('.input').value;
  from = document.querySelector('.from').value;
  to = document.querySelector('.to').value;
  console.log(amt);
  console.log(from);
  console.log(to);
  let ans = await getExchangeRate(amt,from,to);
  console.log(ans)
  result.querySelector('h2').innerText = `${amt} ${from} = ${ans} ${to}`;
  result.classList.remove('hide');
  
})

async function getExchangeRate(amt,from,to){
  let url = `https://v6.exchangerate-api.com/v6/API_KEY/pair/${from}/${to}/${amt}`;
  let response = await fetch(url);
  let data = await response.json();
  return data.conversion_result.toFixed(2);
  
}

async function loadCurrencies(){
  let url = `https://v6.exchangerate-api.com/v6/API_KEY/latest/USD`;
  let response = await fetch(url);
  let data = await response.json();
  const keys = Object.keys(data.conversion_rates);
  console.log(keys);
  // console.log(data.conversion_rates.length);
  for(let i = 0; i < keys.length; i++){
    let newOption = document.createElement('option');
    newOption.innerText = keys[i];
    newOption.value = keys[i];

    document.querySelector('.from').appendChild(newOption);

    let newOption2 = document.createElement('option');
    newOption2.innerText = keys[i];
    newOption2.value = keys[i];

    document.querySelector('.to').appendChild(newOption2);
    // document.querySelector('.to').appendChild(newOption);
  }
  // let newOption = document.createElement('option');

  console.log(data);
}

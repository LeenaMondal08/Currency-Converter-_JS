const BASE_URL= "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@2025-07-10/v1/currencies";

const dropdrowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
let fromCurr=document.querySelector(".from select");
let toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");


for (let select of dropdrowns ) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateExchangeRate=async()=>{
    let amount=document.querySelector(".amount input");
    let amtValue=amount.value;
    console.log(amtValue);
    if(amtValue===""|| amtValue<1){
        amtValue=1;
        amount.value="1";

}
const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response=await fetch(URL);
    let data=await response.json();
    let rate=data[toCurr.value.toLowerCase()];

    let finalAmount = (amtValue.value*rate).toFixed(2);
    msg.innerText=`${amtValue} ${fromCurr.amtValue}=${finalAmount} ${toCurr.value}`;


 };


const updateFlag=(element)=>{
    let currCode=element.value;
    console.log(currCode);
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
};
btn.addEventListener("click", async (evt)=>{
    evt.preventDefault();
    updateExchangeRate();
});
window.addEventListener("load", () => {
  updateExchangeRate();
});


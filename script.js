const mainContainer = document.getElementById('main-container');
const numberInput = document.getElementById('number');
const convertBtn = document.getElementById('convert-btn');
const output = document.getElementById('output');


const romanObj = {
  1:'I',
  4:'IV',
  5:'V',
  9:'IX',
  10:'X',
  40:'XL',
  50:'L',
  90:'XC',
  100:'C',
  400:'CD',
  500:'D',
  900:'CM',
  1000:'M'
};

let strtr = 0;
let index = 0;
let currentHolder;

const patterns = [1,4,5,9,10,40,50,90,100,400,500,900,1000];

Object.freeze(romanObj);

const romanData = [];

function dataCreator(rNum){
  if(rNum === 'MMMM'){
    localStorage.setItem('data',JSON.stringify(romanData));
    return rNum;
  }else{
    for(let pattern of patterns){
      if(index === pattern-1){
          rNum = romanObj[pattern];
          currentHolder = rNum;
          romanData[index] = rNum;
          strtr = 0;
          index++;
          return dataCreator(rNum);
       }
    }
    rNum = currentHolder;
    rNum += romanData[strtr];
    romanData[index] = rNum;
    strtr++;
    index++;
    return dataCreator(rNum);
  } 
};

dataCreator('');


function converter(input){
  output.innerText = '';
  if(!input){
    output.innerText = 'Please enter a valid number';
    return;
  }
  output.innerText += `${romanData[input-1]}`;
  if(input<1 || input<0){
    output.innerText = 'Please enter a number greater than or equal to 1';
    return;
  }else if(input>=4000){
    output.innerText = 'Please enter a number less than or equal to 3999';
  }
}

convertBtn.addEventListener('click',()=>{
  converter(numberInput.value);
});
numberInput.addEventListener('keydown',(e)=>{
  if(e.key === 'Enter'){
    converter(numberInput.value);
  }
})

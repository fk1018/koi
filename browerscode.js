var products = document.getElementsByClassName('js-product-info');
var keywords = {
    positive:['hospital','blue','700'],
    negative:['infant','kid','kids','infants']
}

function keyWordsCheck(innerHTML,keys){
  var valid = false;
  for(var p=0;p<keys.positive.length;p++){
    if(innerHTML.indexOf(keys.positive[p])>=0){
      valid = true;
    }
  }
  if (valid){
    for(var n = 0;n<keys.negative.length;n++){
      if(innerHTML.indexOf(keys.negative[n])>=0){
        valid = false;
        break;
      }
    }
  }
  return valid;
}

for (var i = 0;i<products.length;i++){
  var product = products[i];
  var htmlString = product.innerText.toLowerCase();
  if(keyWordsCheck(htmlString,keywords)){
    console.log(htmlString);
  }
}
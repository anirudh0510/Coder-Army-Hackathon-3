async function LinearSearch(SearchNumber, speed) {
  let found = false;
  const arr = document.querySelectorAll(".arrayBar");
  let pos = arr.length + 1;
  for (let i = 0; i < arr.length; i++) {
    if (parseInt(arr[i].style.height) === parseInt(SearchNumber)) {
      await new Promise((resolve) => setTimeout(resolve, speed));
      arr[i].style.backgroundColor = "green";
      found = true;
      pos = i;
      break;
    } else {
      await new Promise((resolve) => setTimeout(resolve, speed));
      arr[i].style.backgroundColor = "pink";
    }
  }

   
  setTimeout(setToPrimary,500);

  async function setToPrimary(){
    for (let k = 0; k < arr.length; k++) {
      await new Promise((resolve) => setTimeout(resolve, 20));
      arr[k].style.backgroundColor = "yellow";
  }

  }
  
  return pos;

  

}

export default LinearSearch;




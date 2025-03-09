async function mergeSort(arr, left, right,speed) {
    if (left >= right) {
        return;
    }
    const mid = Math.floor((left + right) / 2);
    await mergeSort(arr, left, mid,speed);
    await mergeSort(arr, mid + 1, right,speed);
    await merge(arr, left, mid, right,speed);
}

async function merge(arr, left, mid, right,speed) {
    const n1 = mid - left + 1;
    const n2 = right - mid;
    const L = new Array(n1);
    const R = new Array(n2);

    for (let i = 0; i < n1; i++) {
        L[i] = arr[left + i].style.height;
    }
    for (let j = 0; j < n2; j++) {
        R[j] = arr[mid + 1 + j].style.height;
    }

    let i = 0,
        j = 0,
        k = left;

    while (i < n1 && j < n2) {
        arr[left + i].style.backgroundColor = "pink";
        arr[mid + 1 + j].style.backgroundColor = "pink"; 
        await new Promise((resolve) => setTimeout(resolve, speed));

        if (parseInt(L[i]) <= parseInt(R[j])) {
            arr[k].style.height = L[i];
         
            i++;
        } else {
            arr[k].style.height = R[j];
           
            j++;
        }
        k++;
    }

    while (i < n1) {
        arr[k].style.height = L[i];
      

        i++;
        k++;
  
    }

    while (j < n2) {
        arr[k].style.height = R[j];
       
        j++;
        k++;
      
    }

    await new Promise((resolve) => setTimeout(resolve, speed));

    // Color change for merged elements
    for (let m = left; m <= right; m++) {
      
        arr[m].style.backgroundColor = "green";
        await new Promise((resolve) => setTimeout(resolve, speed));
        
        
    }
}

async function MergeSort(speed){
    const arr=document.querySelectorAll(".arrayBar");
    await mergeSort(arr,0,arr.length-1,speed);

    for(let k=0;k<arr.length;k++){
        await new Promise((resolve)=>setTimeout(resolve,10));
        arr[k].style.backgroundColor="yellow";
    }

}

export default MergeSort;










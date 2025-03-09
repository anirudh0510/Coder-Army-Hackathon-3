async function InsertionSort(speed) {
    const arr = document.querySelectorAll(".arrayBar");
    let i, j;
    for (i = 1; i < arr.length; i++) {
        let key = parseInt(arr[i].style.height);
        arr[i].style.backgroundColor = "blue";
        j = i - 1;

        while (j >= 0 && parseInt(arr[j].style.height) > key) {
            arr[j].style.backgroundColor = "turquoise";
            arr[j + 1].style.height = arr[j].style.height;
            await new Promise((resolve) => setTimeout(resolve, speed));
            arr[j].style.backgroundColor = "pink";
            j--;
        }
        arr[j + 1].style.height = `${key}px`;
        for (let k = 0; k <= i; k++) {
            await new Promise((resolve) => setTimeout(resolve, speed));
            arr[k].style.backgroundColor = "green"; // Color the sorted elements
        
        }
        await new Promise((resolve) => setTimeout(resolve, speed));
       
    }

    for(let k=0;k<arr.length;k++){
        await new Promise((resolve)=>setTimeout(resolve,10));
        arr[k].style.backgroundColor="yellow";
    }

}

export default InsertionSort;



async function SelectionSort(speed) {
    const arr = document.querySelectorAll(".arrayBar");
    let i, j, min_idx;

    for (i = 0; i < arr.length - 1; i++) {
        min_idx = i;
        arr[min_idx].style.backgroundColor = "orange";

        for (j = i + 1; j < arr.length; j++) {
            arr[j].style.backgroundColor = "blue";
            await new Promise((resolve) => setTimeout(resolve, speed));

            if (parseInt(arr[j].style.height) < parseInt(arr[min_idx].style.height)) {
                arr[min_idx].style.backgroundColor = "yellow";
                min_idx = j;
                arr[min_idx].style.backgroundColor = "orange";
            } else {
                arr[j].style.backgroundColor = "yellow";
            }
        }

        await new Promise((resolve) => setTimeout(resolve, speed));
        arr[min_idx].style.backgroundColor = "pink";
        arr[i].style.backgroundColor = "pink";

        let temp = arr[i].style.height;
        arr[i].style.height = arr[min_idx].style.height;
        arr[min_idx].style.height = temp;

        await new Promise((resolve) => setTimeout(resolve, speed));

        arr[i].style.backgroundColor = "green";
        if (min_idx !== i) {
            arr[min_idx].style.backgroundColor = "yellow";
        }
    }
    arr[arr.length - 1].style.backgroundColor = "green";

    for(let k=0;k<arr.length;k++){
        await new Promise((resolve)=>setTimeout(resolve,10));
        arr[k].style.backgroundColor="yellow";
    }

}

export default SelectionSort;




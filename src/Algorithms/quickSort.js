async function partition(arr, low, high,speed) {
    let pivotElement = arr[high];
	pivotElement.style.backgroundColor="blue";
    let i = low - 1;

    for (let j = low; j <= high - 1; j++) {
        arr[j].style.backgroundColor = "blue";
        await new Promise((resolve) => setTimeout(resolve, speed));
        if (parseInt(arr[j].style.height) < parseInt(pivotElement.style.height)) {
            i++;
            arr[i].style.backgroundColor = "pink";
            arr[j].style.backgroundColor = "pink";
            let temp = arr[i].style.height;
            arr[i].style.height = arr[j].style.height;
            arr[j].style.height = temp;
            await new Promise((resolve) => setTimeout(resolve, speed));
            arr[i].style.backgroundColor = "yellow";
            arr[j].style.backgroundColor = "yellow";
        } else {
            arr[j].style.backgroundColor = "yellow"; // Reset color to turquoise
        }
    }

    arr[i + 1].style.backgroundColor = "pink";
    arr[high].style.backgroundColor = "pink";
    let temp = arr[i + 1].style.height;
    arr[i + 1].style.height = arr[high].style.height;
    arr[high].style.height = temp;
    await new Promise((resolve) => setTimeout(resolve, speed));
    arr[i + 1].style.backgroundColor = "green";
    arr[high].style.backgroundColor = "yellow";
    return i + 1;
}

async function quickSort(arr, low, high,speed) {
    if (low < high) {
        let pi = await partition(arr, low, high,speed);
        await quickSort(arr, low, pi - 1,speed);
        await quickSort(arr, pi + 1, high,speed);
    } else if (low >= 0 && high >= 0 && low < arr.length && high < arr.length) {
        arr[low].style.backgroundColor = "green";
        arr[high].style.backgroundColor = "green";
    }
}

async function QuickSort(speed) {
    const arr = document.querySelectorAll(".arrayBar");
    await quickSort(arr, 0, arr.length - 1,speed);

    await new Promise((resolve)=>setTimeout(resolve,10));

    for(let k=0;k<arr.length;k++){
        await new Promise((resolve)=>setTimeout(resolve,10));
        arr[k].style.backgroundColor="yellow";
    }

}

export default QuickSort;



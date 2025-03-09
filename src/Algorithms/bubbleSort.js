async function BubbleSort(speed) {
    const arr = document.querySelectorAll(".arrayBar");
    let swapped;
    let isSorted = false;

    for (let i = 0; i < arr.length - 1; i++) {
        swapped = false;
        for (let j = 0; j < arr.length - i - 1; j++) {
            arr[j].style.backgroundColor = "blue";
            arr[j + 1].style.backgroundColor = "blue";
            if (parseInt(arr[j].style.height) > parseInt(arr[j + 1].style.height)) {

                await new Promise((resolve) => setTimeout(resolve, speed));

                arr[j].style.backgroundColor = "orange";
                arr[j + 1].style.backgroundColor = "orange";

                let temp = arr[j].style.height;
                arr[j].style.height = arr[j + 1].style.height;
                arr[j + 1].style.height = temp;
                swapped = true;

            }

            await new Promise((resolve) => setTimeout(resolve, speed));
            arr[j].style.backgroundColor = "yellow";
            arr[j + 1].style.backgroundColor = "yellow";
        }

        arr[arr.length - i - 1].style.backgroundColor = "green";

        if (!swapped) {
            isSorted = true;
            break;
        }
    }

    if (isSorted) {
        for (let k = 0; k < arr.length; k++) {
            await new Promise((resolve) => setTimeout(resolve, speed));
            arr[k].style.backgroundColor = "green";
        }
    }
    for (let k = 0; k < arr.length; k++) {
        await new Promise((resolve) => setTimeout(resolve, 10));
        arr[k].style.backgroundColor = "yellow";
    }
}

export default BubbleSort;

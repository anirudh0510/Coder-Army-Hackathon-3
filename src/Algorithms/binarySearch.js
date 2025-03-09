

async function BinarySearch(SearchNumber, speed) {

	await new Promise((resolve) => setTimeout(resolve, 1000));
	const arr = document.querySelectorAll(".arrayBar");
	let l = 0;
	let r = arr.length - 1;
	let mid;
	while (r >= l) {
		mid = l + Math.floor((r - l) / 2);


		if (parseInt(arr[mid].style.height) === parseInt(SearchNumber)) {
			await new Promise((resolve) => setTimeout(resolve, speed));
			arr[mid].style.backgroundColor = "green";
			setTimeout(setToPrimary, 500);
			return mid;

		}

		else if (parseInt(arr[mid].style.height) > parseInt(SearchNumber)) {
			for (let k = mid; k <= r; k++) {
				await new Promise((resolve) => setTimeout(resolve, speed));
				arr[k].style.backgroundColor = "red";

			}
			r = mid - 1;

		}


		else {
			for (let m = l; m <= mid; m++) {
				await new Promise((resolve) => setTimeout(resolve, speed));
				arr[m].style.backgroundColor = "red";

			}
			l = mid + 1;

		}

	}


	setTimeout(setToPrimary, 500);

	async function setToPrimary() {
		for (let k = 0; k < arr.length; k++) {
			await new Promise((resolve) => setTimeout(resolve, 20));
			arr[k].style.backgroundColor = "yellow";
		}
	}

	return -1;
}

export default BinarySearch;




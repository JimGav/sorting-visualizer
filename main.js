
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

async function bubble_sort() {
	let start = Date.now()
	let t = setInterval(() => document.getElementById("execution_time").innerHTML = Date.now() - start, 1)
	speed = speed_el.value

	for (let k = 1; k < length; k++) {
		let no_swaps = true
		for (let j = length - 1; j >= k; j--) {

			let div1 = document.getElementById(j)
			let div2 = document.getElementById(j-1)
			div1.style.backgroundColor = "#1d7484"
			div2.style.backgroundColor = "#1d7484"

			if (array[j] < array[j - 1]) {
				let temp = array[j]
				array[j] = array[j - 1]
				array[j - 1] = temp
				no_swaps = false
			}

			await sleep(1000 / speed)

			div1.style.backgroundColor = "#242424"
			div2.style.backgroundColor = "#242424"
			div1.textContent = array[j]
			div2.textContent = array[j - 1]
		}
		if (no_swaps)
			break
	}
	clearInterval(t)
}


async function selection_sort() {
	let start = Date.now()
	let t = setInterval(() => document.getElementById("execution_time").innerHTML = Date.now() - start, 1)
	speed = speed_el.value

	for (let curr = 0; curr < length - 1; curr++) {
		let curr_div = document.getElementById(curr)
		curr_div.style.backgroundColor = "#1d7484"

		let min_pos = curr
		document.getElementById(min_pos).style.border = "1px solid #982c61"

		for (let i = curr + 1; i < length; i++) {
			let div2 = document.getElementById(i)
			div2.style.backgroundColor = "#1d7484"

			if (array[i] < array[min_pos]) {
				document.getElementById(min_pos).style.border = "1px solid black"
				min_pos = i
				document.getElementById(min_pos).style.border = "1px solid #982c61"
			}
			await sleep(1000 / speed)
			div2.style.backgroundColor = "#242424"
		}

		if (min_pos != curr) {
			temp = array[min_pos]
			array[min_pos] = array[curr]
			array[curr] = temp
			curr_div.textContent = array[curr]
			document.getElementById(min_pos).textContent = array[min_pos]
		}

		curr_div.style.backgroundColor = "#242424"
		document.getElementById(min_pos).style.border = "1px solid black"
	}
	clearInterval(t)
}

async function merge(left, right) {
	let merged = [...left, ...right].sort((a, b) => a - b)
	let start = array.indexOf(left[0])
	for (let i = start; i < start + merged.length; i++) 
		document.getElementById(i).style.border = "1px solid black"
	for (let i = start; i < start + merged.length; i++) {
		document.getElementById(i).textContent = merged[i - start]
		array[i] = merged[i-start]
		document.getElementById(i).style.border = "1px solid #982c61"
	}
	await sleep(1000 / speed)

	return merged
}

async function merge_sort(a) {

	if (a.length == 1)
		return a

	for (let i = 0; i < array.length; i++) {
		document.getElementById(i).style.border = "1px solid black"
	}
	for (let i = 0; i < a.length; i++) {
		document.getElementById(array.indexOf(a[i])).style.border = "1px solid #1d7484"
	}
	await sleep(1000 / speed)

	let left = a.slice(0, a.length / 2)
	let right = a.slice(a.length / 2, a.length)

	let sorted_left = await merge_sort(left)
	let sorted_right = await merge_sort(right)

	return await merge(sorted_left, sorted_right)
}

function generate_array(length) {
	while (length != array.length) {
		let el = Math.floor(Math.random() * 100)
		let ptag = document.createElement("p")
		if (!array.find(e => e == el)) {
			array.push(el)
			document.getElementById("array").appendChild(ptag)
			ptag.textContent = el
			ptag.id = array.indexOf(el)
		}
	}
}


function clean_up() {
	array = []
	document.getElementById("array").replaceChildren()
}

// Initialize
let array = []
const length = 10
let speed_el = document.getElementById("speed")

// Generate array
generate_array(length)

// Handlers
document.getElementById("bubble").onclick = bubble_sort
document.getElementById("selection").onclick = selection_sort
document.getElementById("merge").onclick = async () => {
	let start = Date.now()
	let t = setInterval(() => document.getElementById("execution_time").innerHTML = Date.now() - start, 1)
	speed = speed_el.value
	await merge_sort(array);
	clearInterval(t)
}

document.getElementById("regenerate").onclick = () => {
	clean_up()
	generate_array(length)
}

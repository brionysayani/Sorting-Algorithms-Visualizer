let a = [];
let n = "";
let hilight_index = [];
let delay;
let con;
let speed;
window.onload = initialize();
function initialize() {
  //window.onload event is fired when the entire HTML document has finished loading
  n = 50;
  delay = 300;
  con = document.getElementById("container");
  for (let i = 0; i < n; i++) {
    a[i] = Math.floor(Math.random() * (100 - 1) + 1);
  }
  generate_bars(a);
}

function set_speed() {
  speed = document.querySelector("input[type=range]").value;
  if (speed == 1) delay = 500;
  else if (speed == 2) delay = 400;
  else if (speed == 3) delay = 300;
  else if (speed == 4) delay = 200;
  else delay = 100;
}
function stop() {
  location.reload();
}

async function sorting(idd) {
  document.getElementById("bubble").disabled = true;
  document.getElementById("insertion").disabled = true;
  document.getElementById("selection").disabled = true;
  document.getElementById("quick").disabled = true;
  document.getElementById("submit").disabled = true;

  switch (idd) {
    case 1:
      await bubble_sort();
      break;
    case 2:
      await insertion_sort();
      break;
    case 3:
      await selection_sort();
      break;
    case 4:
      await quick_sort();
      break;
  }

  document.getElementById("bubble").disabled = false;
  document.getElementById("insertion").disabled = false;
  document.getElementById("selection").disabled = false;
  document.getElementById("quick").disabled = false;
  document.getElementById("submit").disabled = false;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function bubble_sort() {
  let b = []; // copy elements in array-b then sort array-b and keep track of indices
  //at the end array will be changed
  //so to make sure that orginal array-a won't change we keep copy of that
  for (let i = 0; i < a.length; i++) b[i] = a[i];

  for (var i = 0; i < b.length; i++) {
    for (var j = 0; j < b.length - i - 1; j++) {
      if (b[j] > b[j + 1]) {
        var temp = b[j];
        b[j] = b[j + 1];
        b[j + 1] = temp;
        hilight_index.push(j);
        hilight_index.push(j + 1);
        generate_bars(b);
        hilight_index = [];
        await sleep(delay);
      }
    }
  }
  hilight_index = [];
  generate_bars(b);
}
async function insertion_sort() {
  let b = []; // copy elements in array-b then sort array-b and keep track of indices
  for (let i = 0; i < a.length; i++) b[i] = a[i];

  let i, key, j;
  for (i = 1; i < n; i++) {
    key = b[i];
    j = i - 1;
    while (j >= 0 && b[j] > key) {
      b[j + 1] = b[j];
      hilight_index.push(j);
      hilight_index.push(j + 1);
      generate_bars(b);
      hilight_index = [];
      await sleep(delay);
      j = j - 1;
    }
    b[j + 1] = key;
  }
  hilight_index = [];
  generate_bars(b);
}

async function selection_sort() {
  let b = []; // copy elements in array-b then sort array-b and keep track of indices
  for (let i = 0; i < a.length; i++) b[i] = a[i];

  var i, j, min_idx;

  for (i = 0; i < n - 1; i++) {
    // Find the minimum element in unsorted array
    min_idx = i;
    for (j = i + 1; j < n; j++) if (b[j] < b[min_idx]) min_idx = j;

    // Swap the found minimum element with the first element
    var temp = b[i];
    b[i] = b[min_idx];
    b[min_idx] = temp;
    hilight_index.push(min_idx);
    hilight_index.push(i);
    generate_bars(b);
    hilight_index = [];
    await sleep(delay);
  }
  hilight_index = [];
  generate_bars(b);
}
async function partition(low, high) {
  let pivot = a[low]; //pivot = start element
  let start = low;
  let end = high;
  while (start < end) {
    while (a[start] <= pivot) {
      start++;
    }
    while (a[end] > pivot) {
      end--;
    }
    if (start < end) {
      [a[start], a[end]] = [a[end], a[start]];

      hilight_index.push(start);
      hilight_index.push(end);
      generate_bars(a);
      hilight_index = [];
      await sleep(delay);
    }
  }

  // Swap the pivot with the element at index end
  [a[low], a[end]] = [a[end], a[low]];
  hilight_index.push(low);
  hilight_index.push(end);
  generate_bars(a);
  hilight_index = [];
  await sleep(delay);

  // Return the index of the pivot element
  return end;
}
async function start_quick_sort(low, high) {
  console.log("low = " + low + " high = " + high);
  if (low >= high) {
    return;
  }
  // console.log(a);
  // Partition the array and get the index of the pivot element
  let pivotIndex = await partition(low, high);

  await start_quick_sort(low, pivotIndex - 1);
  await start_quick_sort(pivotIndex + 1, high);
  console.log("p = " + a[pivotIndex]);
  console.log(a);
}

async function quick_sort() {
  let b = [];
  for (let i = 0; i < n; i++) b[i] = a[i];

  await start_quick_sort(0, n - 1);
  hilight_index = [];
  generate_bars(a);
  console.log(a);
  a = b;
}
function create() {
  a = [];
  con.innerHTML = "";
  n = document.getElementById("length").value;
  if (isNaN(n)) {
    alert("Only integers are allowed");
    initialize();
    return;
  }
  if (n == "") {
    alert("Please enter length of array and click on generate button");
    initialize();
    return;
  }
  n = Number.parseInt(n);
  if (n < 1 || n > 100) {
    alert("Please enter value between 1 and 100");
    initialize();
    return;
  }

  for (let i = 0; i < n; i++) {
    a[i] = Math.floor(Math.random() * (100 - 1) + 1);
  }
  //   alert(arr);
  generate_bars(a);
}

function generate_bars(a) {
  con.innerHTML = "";
  for (let i = 0; i < a.length; i++) {
    let bar = document.createElement("div");
    let x = 100 / n;
    //bar is child of container
    bar.style.width = x + "%";
    bar.style.height = a[i] + "%";
    if (
      hilight_index.length > 0 &&
      (i == hilight_index[0] || i == hilight_index[1])
    )
      bar.style.backgroundColor = "red";
    else bar.style.backgroundColor = "black";
    bar.style.marginRight = "1px";

    // value is child of bar
    let values = document.createElement("div");
    values.innerHTML = a[i];
    values.style.color = "white";
    values.style.marginBottom = a[i] + "5px";
    values.style.textAlign = "center";

    values.style.fontSize = "95%";

    values.style.borderRadius = "50%";
    values.style.borderColor = "red";
    values.style.backgroundColor = "green";
    values.style.position = "relative";

    bar.appendChild(values);

    con.appendChild(bar);
  }
}
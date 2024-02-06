let arr = [];

function generateArrayWithRange(arrLength, start, end) {
    const range = end - start + 1;
    return Array.from({length: arrLength},
        () => Math.floor(Math.random() * range) + start);
}
function genArrButton() {
    const minNum = document.getElementById("minNumForArr").value;
    const maxNum = document.getElementById("maxNumForArr").value;
    const arrLength = document.getElementById("arrLength").value;
    if(isNaN(minNum) || isNaN(maxNum) || isNaN(arrLength)) {
        alert("oops, non a num");
        return;
    }

    arr = generateArrayWithRange(arrLength, -minNum, maxNum);
    document.getElementById("arrTextArea").value = arr;
}
function bubbleSort() {
    let startTime = performance.now();
    let isSorted = true;
    let numBuffer;
    do {
        isSorted = true;
        for(let i = 0; i < arr.length - 1; i++) {
            if(arr[i] > arr[i + 1]) {
                isSorted = false;
                numBuffer = arr[i];
                arr[i] = arr[i+1];
                arr[i+1] = numBuffer;
            }
        }
    } while(!isSorted)
    let endTime = performance.now();
    document.getElementById("arrTextArea").value = arr;
    document.getElementById("timer").textContent = endTime - startTime + " ms";
}
function insertSort() {
    let startTime = performance.now();

    for (let i = 1; i < arr.length; i++) {
        let currentElement = arr[i];
        let j = i - 1;

        while (j >= 0 && currentElement < arr[j]) {
            arr[j + 1] = arr[j];
            j--;
        }

        arr[j + 1] = currentElement;
    }

    let endTime = performance.now();
    document.getElementById("arrTextArea").value = arr;
    document.getElementById("timer").textContent = endTime - startTime + " ms";
}
function selectSort() {
    let startTime = performance.now();
    let minNum = Number.MAX_SAFE_INTEGER;
    let index;

    for(let i = 0; i < arr.length; i++) {
        let currentElement = arr[i];
        for(let j = i; j < arr.length; j++) {
            if(minNum > arr[j]) {
                minNum = arr[j];
                index = j;
            }
        }
        arr[index] = arr[i];
        arr[i] = minNum;
        minNum = Number.MAX_SAFE_INTEGER;
    }
    let endTime = performance.now();
    document.getElementById("arrTextArea").value = arr;
    document.getElementById("timer").textContent = endTime - startTime + " ms";
}
function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    const pivotIndex = Math.floor(arr.length / 2);
    const pivot = arr[pivotIndex];

    const less = [];
    const greater = [];

    for (let i = 0; i < arr.length; i++) {
        if (i === pivotIndex) {
            continue;
        }
        if (arr[i] <= pivot) {
            less.push(arr[i]);
        } else {
            greater.push(arr[i]);
        }
    }

    return [...quickSort(less), pivot, ...quickSort(greater)];
}
function qsButton() {
    let startTime = performance.now();
    arr = quickSort(arr);
    let endTime = performance.now();
    document.getElementById("arrTextArea").value = arr;
    document.getElementById("timer").textContent = endTime - startTime + " ms";
}
function msButton() {
    let startTime = performance.now();
    arr = mergeSort(arr);
    let endTime = performance.now();
    document.getElementById("arrTextArea").value = arr;
    document.getElementById("timer").textContent = endTime - startTime + " ms";
}
function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);

    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }

    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}
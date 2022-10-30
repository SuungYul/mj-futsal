/**
 * 병합정렬 인터페이스
 * @param {Array} data 실제 정렬할 데이터 배열
 * @param {CallableFunction} [compare] 정렬할 데이터 기준 {기본값은 오름차순 정렬}
 */



 function mergeSort(data, compare=(x, y) => { return x < y; }){
    //data를 훼손하지 않기 위해 깊은 복사를 시행함
    //parse-stringify는 느리기 때문에 변경해줄 필요가 있음
    let result = JSON.parse(JSON.stringify(data));
    __mergeSort(result, 0, data.length, compare);
    return result;
}

/**
 * 병합정렬 구현부 \
 * 실제 병합정렬은 여기서 일어남
 * @param {*} data 
 * @param {*} left 
 * @param {*} right 
 * @param {*} compare 
 * @returns 
 */
function __mergeSort(data, left, right, compare){
    if(left+1 >= right){
        return;
    }

    let middle = parseInt((left + right) / 2);
    __mergeSort(data, 0, middle, compare);
    __mergeSort(data, middle, right, compare);
    merge(data, left, middle, right, compare);
}

function merge(data, left, middle, right, compare){
    let tmp = [];
    let cursor = 0, l = left, m = middle;

    while(l < middle && m < right){
        if(compare(data[l], data[m])){
            tmp[cursor++] = data[l++];
        }
        else{
            tmp[cursor++] = data[m++];
        }
    }

    while(l < middle){
        tmp[cursor++] = data[l++];
    }

    while(m < right){
        tmp[cursor++] = data[m++];
    }

    for(let idx = left; idx < right; idx ++){
        data[idx] = tmp[idx - left];
    }
}

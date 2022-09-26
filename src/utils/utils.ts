
export default {
  debounce: function (fn: Function, wait: number) {
    let timer: number | null = null;
    return function () {
      let context = this; // 注意 this 指向
      let args = arguments; // arguments中存着event

      if (timer)
        clearTimeout(timer);
      timer = setTimeout(function () {
        fn.apply(this, args)
      }, wait);
    }
  },
  filterTopN: function (array: any[], filter: Function, topN: number, startIndex: number = 0) {
    if (!array || array.length == 0 || topN <= 0 || startIndex < 0) {
      return [-1, []]
    }
    if (startIndex >= array.length) {
      return [array.length, []]
    }
    const result = []
    let i: number = startIndex
    for (; i < array.length; i++) {
      if (filter(array[i])) {
        result.push(array[i])
      }
      if (result.length == topN) {
        break;
      }
    }
    return [i == array.length ? i - 1 : i, result]
  },
  filterBackwordTopN: function (array: any[], filter: Function, topN: number, startIndex: number) {
    if (!array || array.length == 0 || topN <= 0 || startIndex < 0) {
      return [-1, []]
    }
    if (startIndex >= array.length) {
      return [array.length, []]
    }
    const result = []
    let i: number = startIndex
    for (; i >= 0; i--) {
      if (filter(array[i])) {
        result.push(array[i])
      }
      if (result.length == topN) {
        break;
      }
    }
    return [i == -1 ? 0 : i, result.reverse()]
  }

}



export default {
    debounce: function (fn: Function, wait: number) {
        let timer: number | null = null;
        return function () {
            var context = this; // 注意 this 指向
            var args = arguments; // arguments中存着event

            if (timer)
                clearTimeout(timer);
            timer = setTimeout(function(){
                fn.apply(this, args)
            }, wait);
        }
    },
    filterTopN: function (array: any[], filter: Function, topN: number) {
        if (!array || array.length == 0 || topN <= 0) {
          return []
        }
        const result = []
        for (let i: number = 0; i < array.length; i++) {
          if (filter(array[i])) {
            result.push(array[i])
          }
          if (result.length == topN) {
            break;
          }
        }
        return result
      }
  
}


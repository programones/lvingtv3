 
     // 格式化日期，如月、日、时、分、秒保证为2位数
     function formatNumber (n) {
        n = n.toString()
        return n[1] ? n : 0 + n;
    }
 
 export default  function formatTime (number, format) {
    let time = new Date(number)
    let newArr = []
    let formatArr = ['Y', 'M', 'D', 'h', 'm', 's']
    newArr.push(time.getFullYear())
    newArr.push(formatNumber(time.getMonth() + 1))
    newArr.push(formatNumber(time.getDate()))

    newArr.push(formatNumber(time.getHours()))
    newArr.push(formatNumber(time.getMinutes()))
    newArr.push(formatNumber(time.getSeconds()))
  //输入形参格式：formatTime(1545903266795, 'Y-M-D h:m:s')
    for (let i in newArr) {
        format = format.replace(formatArr[i], newArr[i])
    }
    return format;
      
}
    
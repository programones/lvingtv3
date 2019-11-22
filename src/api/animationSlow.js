 export default function animationSlow(ele, attrs, fn) {
    clearInterval(ele.timeID);
    ele.timeID = setInterval(function () {
        var isAllOk = true;
        for (var key in attrs) {
            // console.log(key);//属性名
            // console.log(attrs[key]);//属性值
            var attribute = key;
            var target = attrs[key];

            if (attribute == 'zIndex' || attribute == 'backgroundColor') {
                ele.style[key] = target;
            } else if (attribute == 'opacity') {//透明度单独写逻辑代码
                var current = parseFloat(window.getComputedStyle(ele, null)[attribute]);
                current *= 100;//0.8 * 100 = 80
                target *= 100;//0.5*100 = 50            
                var step = (target - current) / 10;             
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                current += step;
                ele.style[attribute] = current / 100;//缩小100
                if (current != target) {
                    isAllOk = false;
                };
            } else {
                var current = parseInt(window.getComputedStyle(ele, null)[attribute]);
                var step = (target - current) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                current += step;
                ele.style[attribute] = current + 'px';
                if (current != target) {
                    isAllOk = false;
                };
            }
        };
        if (isAllOk) {
            clearInterval(ele.timeID);
            if (typeof fn == 'function') {
                fn();
            }
        };
    }, 10);
};
//example => 
//             animationSlow(box, {
//             width: 500,
//             height: 500,
//             left: 300,
//             top: 300,
//             zIndex: 1,
//             opacity: 0.8,//没有加定位属性绝对相对或是固定
//             backgroundColor: 'rgb(255, 115, 0)'
//             }, function () {
//             animationSlow(box, {
//                 opacity: 0.5,
//                 backgroundColor: 'orange'
//             },function(){ animationSlow(box, {
//               width: 0,
//               height: 0,
//               left: 30,
//               top: 30,})} );
//             }
//            );
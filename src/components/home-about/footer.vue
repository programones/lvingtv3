<template>
    <div>
    <footer class="footer" :class="{'active':panduan}">
        <strong class="footer-str">Copyright © 2018-2019 
            <a href="">
             鹏升影视传媒</a>.
        </strong>
         All rights reserved. 
      <a class="footer-a" target="_blank" href="http://www.beian.miit.gov.cn/">粤ICP备17047314号-3
      </a></footer>
    </div>
</template>

<script>
// import { log } from 'util'
let thisHeight=  window.screen.height-100
export default {
 props: ['boxContent'] ,
 data(){
     return {
         panduan:false
     }
 },
 watch:{
     
     boxContent:{
           handler(newVlaue){
               
            //    window.console.log(newVlaue,thisHeight);
               if(newVlaue>thisHeight) {
                   this.panduan=false;
                    // window.console.log('执行1');
               }else{
                   this.panduan=true;
                    //  window.console.log('执行2');
               }
            //    if(newVlaue)
           }

     }
 }
}
</script>
<style>
   .active {
       position: absolute;
       width: 100%;
       bottom: 0;
   }
    .footer {
     line-height: 30px;
     text-align: center;
     background-color: rgba(250, 246, 246, 0.918);
    }
    .footer .footer-str {
         display: block;
     }
     .footer .footer-a {
         display: block;
     }
      .footer .footer-a:hover {
        color: blue;
        cursor:pointer
      }
</style>
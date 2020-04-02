import Vue from 'vue'

const app=new Vue({
  //el: '#root',
  template: '<div >{{text}}<div id="text"></div></div>',
  data:{
    text:0
  }
})
app.$mount('#root')//同 el 挂载方式

var Profile = Vue.extend({
  template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
  data: function () {
    return {
      firstName: 'Walter',
      lastName: 'White',
      alias: 'Heisenberg'
    }
  }
})
// 创建 Profile 实例，并挂载到一个元素上。
new Profile().$mount('#text')


setInterval(()=>{
  app.text +=1
},1000)

console.log(app.$el);
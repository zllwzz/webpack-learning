import './hello1';
import './hello2';
import './index.css';
import './index.less';
import './index.scss';
// say();
let logo = require('./imgs/1.jpg');
console.log(logo);//加上publicPath后，这里的值是绝对路径
let img = new Image();
img.src = logo;
document.body.appendChild(img);

// ----------------------------
import React from 'react';
import ReactDom from 'react-dom';
ReactDom.render(<div>hello</div>,document.getElementById('root'))

// ----------------------------
function readonly(target, key, descriptor) {
    descriptor.writable = false;
}
class Person {
    @readonly PI = 3.14
}
let p = new Person()
// p.PI = 3.15
console.log(p.PI)

// ----------------------------

import './hello1';
import './hello2';
import './index.css';
// say();
let logo = require('./imgs/1.jpg');
console.log(logo);//加上publicPath后，这里的值是绝对路径
let img = new Image();
img.src = logo.default;
document.body.appendChild(img);
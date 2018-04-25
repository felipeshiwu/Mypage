var canvas = document.querySelector('canvas');
console.log(canvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

// c.fillStyle = "green";
// c.fillRect(100, 100, 100, 100)
// c.fillRect(400, 100, 100, 100)
// c.fillRect(300, 300, 100, 100)
//
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.lineTo(400, 300);
// c.strokeStyle = "red";
// c.stroke();
//
// c.beginPath();
// c.arc(300, 300, 30, 0, Math.PI*2, false);
// c.stroke();
//
// for (var i = 0; i < 100; i++) {
//     var x = Math.random() * window.innerWidth;
//     var y = Math.random() * window.innerHeight;
//     c.beginPath();
//     c.arc(x, y, 30, 0, Math.PI*2, false);
//     c.stroke();
//
// }


var x = Math.random() * innerWidth;
var y = x+200;
var dx = 20;
var dy = 20;
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    c.beginPath();
    c.moveTo(x, y);
    c.lineTo(250+x, y-200);
    c.strokeStyle = "red";
    c.stroke();
    if (x+250 > innerWidth || x < 0) {
        dx = -dx;
    }
    if (y-200 > innerHeight || y < 0) {
        dy = -dy;
    }
    x+= dx;
    y+= dy;
}

var 

animate();

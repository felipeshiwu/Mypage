var canvas = document.querySelector('canvas');
console.log(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');
var leftClick = false;
var rightClick = false;
var centerX = window.innerWidth / 2;
var centerY = window.innerHeight / 2;



function Line(x0, y0, xf, yf) {
    this.x0 = x0;
    this.y0 = y0;
    this.xf = xf;
    this.yf = yf;
    this.width = Math.abs(xf - x0);
    this.height = Math.abs(yf - y0);
    if (this.x0 < this.xf)
      this.centerX = x0 + this.width/2;
    else 
      this.centerX = xf + this.width/2;
    if (this.y0 < this.yf)
      this.centerY = y0 + this.height/2;
    else 
      this.centerY = yf + this.height/2;


    this.draw = function(selected) {
        c.beginPath();
        c.lineWidth = 3;
        c.moveTo(this.x0, this.y0);
        c.lineTo(this.xf, this.yf);
        if (selected) {
            c.strokeStyle = "red";
        } else {
            c.strokeStyle = "black";
        }
        c.stroke();
    }

}

var mx = undefined;
var my = undefined;

//events
window.addEventListener('resize', resizeCanvas, false);
window.addEventListener('mouseup', mouseUP, false);
window.addEventListener('mousedown', mouseDW, false);
document.addEventListener('contextmenu', function (event) {
    event.preventDefault();
    }, false);

onmousemove = function (event) {
    mx = event.clientX;
    my = event.clientY;
}


var lines = [];
lines.push(new Line(centerX-100,centerY,centerX+100,centerY));
var selectedLine = null;

function animate() {

    moveMouse(event);
    drawLines();
    requestAnimationFrame(animate);
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var centerX = window.innerWidth / 2;
    var centerY = window.innerHeight / 2;
    animate();
}

function mouseDW(event) {
    if (event.button == 2) {
        rightClick = true;
    } else if (event.button == 1) {
        leftClick = true;
    }
}

function mouseUP() {
    rightClick = false;
    leftClick = false;
}

function moveMouse(event) {
    lines[0].vx += mx-lines[0].vx;
    lines[0].vy += my-lines[0].vy;
}

function drawLines() {
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (var i = lines.length - 1; i >= 0; i--) {
        if (selectedLine == i)
            lines[i].draw(true);
        else
            lines[i].draw(false);
    }

}

function selectLine() {
    if (leftClick && selectedLine == null) {
        for (var i = lines.length - 1; i >= 0; i--) {
            if (mx >= lines[i].centerX - 10 &&
                mouseX <= lines[i].centerX + 10 &&
                my >= lines[i].centerY - 10 &&
                my <= lines[i].centerY + 10) {
                    selectedLine = i;
                    movingEntireLine = true;
                    break;
            } else if (mx >= lines[i].x0 - 20 &&
                       mx <= lines[i].x0 + 20 &&
                       my >= lines[i].y0 - 20 &&
                       my <= lines[i].y0 + 20) {
                        selectedLine = i;
                        movingLineHead = true;
                        break;
            } else if (mx >= lines[i].xf - 20 &&
                       mx <= lines[i].xf + 20 &&
                       my >= lines[i].yf - 20 &&
                       my <= lines[i].yf + 20) {
                        selectedLine = i;
                        movingLineTail = true;
                        break;
            }
        }
    } else if (rightClick) {
        for (var i = lines.length - 1; i >= 0; i--) {
            if ((my >= lines[i].y0 && my <= lines[i].yf) ||
                (my >= lines[i].yf && my <= lines[i].y0)) {
                    if (mx >= lines[i].x0 && mx <= lines[i].xf) {
                        lines[lines.length] = new Line(mx,my,lines[i].xf,lines[i].yf);
                        lines[i].xf = mx;
                        lines[i].yf = my;
                        lines[i].width = Math.abs(lines[i].xf - lines[i].x0);
                        lines[i].height = Math.abs(lines[i].yf - lines[i].y0);
                        lines[i].centerX = lines[i].x0 + lines[i].width/2;
                        lines[i].centerY = lines[i].y0 + lines[i].height/2;      
                        rightClick = 0;
                        break;
                    } else if (mx < lines[i].x0 && mx > lines[i].xf) {
                        lines[lines.length] = new Line(mx,my,lines[i].x0,lines[i].y0);
                        lines[i].x0 = mx;
                        lines[i].y0 = my;
                        lines[i].width = Math.abs(lines[i].xf - lines[i].x0);
                        lines[i].height = Math.abs(lines[i].yf - lines[i].y0);
                        lines[i].centerX = lines[i].xf + lines[i].width/2;
                        lines[i].centerY = lines[i].yf + lines[i].height/2;       
                        rightClick = 0;
                        break;        
                    }
            }
        }
    }
}


animate();

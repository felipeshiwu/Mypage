var canvas = document.querySelector('canvas');

// Canvas config
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Var declaration
var c = canvas.getContext('2d');
var leftClick = false;
var rightClick = false;
var centerX = window.innerWidth / 2;
var centerY = window.innerHeight / 2;

var movingEntireLine = false;
var movingLineHead = false;
var movingLineTail = false;

var mx = undefined;
var my = undefined;

var lines = [];
var selectedLine = null;

// Events
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

// Functions
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

function animate() {
    drawLines();
    if ((leftClick && selectedLine == null) || rightClick)
        selectLine();
    moveMouse(event);
    moveLine();
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
    if (event.button == 2)
        rightClick = true;
    else
        leftClick = true;
}

function mouseUP() {
    rightClick = false;
    leftClick = false;
    selectedLine = null;
    movingEntireLine = false;
    movingLineHead = false;
    movingLineTail = false;
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
            if (mx >= lines[i].x0 + lines[i].width/5 &&
                mx <= lines[i].xf - lines[i].width/5 &&
                my >= lines[i].centerY - lines[i].height/7 &&
                my <= lines[i].centerY + lines[i].height/7) {
                    selectedLine = i;
                    movingEntireLine = true;
                    break;
            } else if (mx >= lines[i].x0 + lines[i].width/5 &&
                       mx <= lines[i].xf - lines[i].width/5 &&
                       my >= lines[i].centerY - 3 &&
                       my <= lines[i].centerY + 3) {
                            selectedLine = i;
                            movingEntireLine = true;
                            break;
            } else if (mx >= lines[i].x0 - lines[i].width/5 &&
                       mx <= lines[i].x0 + lines[i].width/5 &&
                       my >= lines[i].y0 - 5 &&
                       my <= lines[i].y0 + 5) {
                        selectedLine = i;
                        movingLineHead = true;
                        break;
            } else if (mx >= lines[i].xf - lines[i].width/5 &&
                       mx <= lines[i].xf + lines[i].width/5 &&
                       my >= lines[i].yf - 5 &&
                       my <= lines[i].yf + 5) {
                        selectedLine = i;
                        movingLineTail = true;
                        break;

            } else if (mx >= lines[i].xf - lines[i].width/5 &&
                       mx <= lines[i].x0 + lines[i].width/5 &&
                       my >= lines[i].centerY - 3 &&
                       my <= lines[i].centerY + 3) {
                       selectedLine = i;
                       movingEntireLine = true;
                       break;
            } else if (mx >= lines[i].xf - lines[i].width/5 &&
                       mx <= lines[i].x0 + lines[i].width/5 &&
                       my >= lines[i].centerY - lines[i].height/7 &&
                       my <= lines[i].centerY + lines[i].height/7) {
                    selectedLine = i;
                    movingEntireLine = true;
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

function moveLine() {
    if (selectedLine != null) {
        if (movingEntireLine) {
            if (lines[selectedLine].x0 <= lines[selectedLine].xf) {
                lines[selectedLine].x0 = mx-(lines[selectedLine].width/2);
                lines[selectedLine].xf = mx+(lines[selectedLine].width/2);
            } else {
                lines[selectedLine].xf = mx-(lines[selectedLine].width/2);
                lines[selectedLine].x0 = mx+(lines[selectedLine].width/2);
            }
            if (lines[selectedLine].y0 <= lines[selectedLine].yf) {
                lines[selectedLine].y0 = my-(lines[selectedLine].height/2);
                lines[selectedLine].yf = my+(lines[selectedLine].height/2);
            } else {
                lines[selectedLine].yf = my-(lines[selectedLine].height/2);
                lines[selectedLine].y0 = my+(lines[selectedLine].height/2);
            }
            if (lines[selectedLine].x0 <= lines[selectedLine].xf) {
                lines[selectedLine].centerX = lines[selectedLine].x0 + lines[selectedLine].width/2;
            } else {
                lines[selectedLine].centerX = lines[selectedLine].xf + lines[selectedLine].width/2;
            }
            if (lines[selectedLine].y0 <= lines[selectedLine].yf) {
                lines[selectedLine].centerY = lines[selectedLine].y0 + lines[selectedLine].height/2;
            } else {
                lines[selectedLine].centerY = lines[selectedLine].yf + lines[selectedLine].height/2;
            }
        } else if (movingLineHead) {
            lines[selectedLine].x0 = mx;
            lines[selectedLine].y0 = my;
            lines[selectedLine].width = Math.abs(lines[selectedLine].xf - lines[selectedLine].x0);
            lines[selectedLine].height = Math.abs(lines[selectedLine].yf - lines[selectedLine].y0);
            if (lines[selectedLine].x0 <= lines[selectedLine].xf) {
                lines[selectedLine].centerX = lines[selectedLine].x0 + lines[selectedLine].width/2;
            } else {
                lines[selectedLine].centerX = lines[selectedLine].xf + lines[selectedLine].width/2;
            }
            if (lines[selectedLine].y0 <= lines[selectedLine].yf) {
                lines[selectedLine].centerY = lines[selectedLine].y0 + lines[selectedLine].height/2;
            } else {
                lines[selectedLine].centerY = lines[selectedLine].yf + lines[selectedLine].height/2;
            }
        } else if (movingLineTail) {
            lines[selectedLine].xf = mx;
            lines[selectedLine].yf = my;
            lines[selectedLine].width = Math.abs(lines[selectedLine].xf - lines[selectedLine].x0);
            lines[selectedLine].height = Math.abs(lines[selectedLine].yf - lines[selectedLine].y0);
            if (lines[selectedLine].x0 <= lines[selectedLine].xf) {
                lines[selectedLine].centerX = lines[selectedLine].x0 + lines[selectedLine].width/2;
            } else {
                lines[selectedLine].centerX = lines[selectedLine].xf + lines[selectedLine].width/2;
            }
            if (lines[selectedLine].y0 <= lines[selectedLine].yf) {
                lines[selectedLine].centerY = lines[selectedLine].y0 + lines[selectedLine].height/2;
            } else {
                lines[selectedLine].centerY = lines[selectedLine].yf + lines[selectedLine].height/2;
            }
        }
    }
}

function generationLines() {
    n = parseInt(document.getElementById("number").value);
    console.log(n);
    lines = [];
    switch (n) {
        case 1:
            lines.push(new Line(centerX-window.innerWidth/5,centerY,centerX+window.innerWidth/5,centerY));
            break;
        case 3:
            lines.push(new Line(centerX,centerY-200,centerX+200,centerY+200));
            lines.push(new Line(centerX,centerY-200,centerX-200,centerY+200));
            lines.push(new Line(centerX-200,centerY+200,centerX+200,centerY+200));
            break;
        case 4:
            lines.push(new Line(centerX-200,200,centerX+200,200));
            lines.push(new Line(centerX+200,200,centerX+200,600));
            lines.push(new Line(centerX-200,200,centerX-200,600));
            lines.push(new Line(centerX-200,600,centerX+200,600));
            break;
        case 5:
            lines.push(new Line(centerX,centerY-300,centerX+300,centerY-100));
            lines.push(new Line(centerX,centerY-300,centerX-300,centerY-100));
            lines.push(new Line(centerX+300,centerY-100,centerX+200,centerY+200));
            lines.push(new Line(centerX-300,centerY-100,centerX-200,centerY+200));
            lines.push(new Line(centerX-200,centerY+200,centerX+200,centerY+200));
            break;
        case 6:
            lines.push(new Line(centerX-200,200,centerX+200,200));
            lines.push(new Line(centerX-200,200,centerX-300,400));
            lines.push(new Line(centerX-300,400,centerX-200,600));
            lines.push(new Line(centerX+200,200,centerX+300,400));
            lines.push(new Line(centerX+300,400,centerX+200,600));
            lines.push(new Line(centerX-200,600,centerX+200,600));
            break;
        case 7:
            lines.push(new Line(centerX-250,200,centerX,100));
            lines.push(new Line(centerX,100,centerX+250,200));
            lines.push(new Line(centerX-250,200,centerX-400,350));
            lines.push(new Line(centerX+250,200,centerX+400,350));
            lines.push(new Line(centerX-400,350,centerX-200,600));
            lines.push(new Line(centerX+400,350,centerX+200,600));
            lines.push(new Line(centerX-200,600,centerX+200,600));
            break;
        case 8:
            lines.push(new Line(centerX-220,100,centerX+220,100));
            lines.push(new Line(centerX-220,100,centerX-420,300));
            lines.push(new Line(centerX-420,300,centerX-420,500));
            lines.push(new Line(centerX-420,500,centerX-220,700));
            lines.push(new Line(centerX+220,100,centerX+420,300));
            lines.push(new Line(centerX+420,300,centerX+420,500));
            lines.push(new Line(centerX+420,500,centerX+220,700));
            lines.push(new Line(centerX-220,700,centerX+220,700));
            break;
        default:
            break;
    }
    animate();
}

// Main
lines.push(new Line(centerX-window.innerWidth/5,centerY,centerX+window.innerWidth/5,centerY));
animate();

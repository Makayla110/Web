var x, y
var step = 20
var flag = 0

// Your snappy message. Important: the space at the end of the sentence!!!
var message = "歡迎來到ChataChata's home "
message = message.split("")

var xpos = new Array()
for (i = 0; i <= message.length - 1; i++) {
    xpos[i] = -50
}

var ypos = new Array()
for (i = 0; i <= message.length - 1; i++) {
    ypos[i] = -50
}

function handlerMM(e) {
    x = (document.layers) ? e.pageX : document.body.scrollLeft + event.clientX
    y = (document.layers) ? e.pageY : document.body.scrollTop + event.clientY
    flag = 1
}

function makesnake() {
    if (flag == 1 && document.all) {
        for (i = message.length - 1; i >= 1; i--) {
            xpos[i] = xpos[i - 1] + step
            ypos[i] = ypos[i - 1]
        }
        xpos[0] = x + step
        ypos[0] = y

        for (i = 0; i < message.length - 1; i++) {
            var thisspan = eval("span" + (i) + ".style")
            thisspan.posLeft = xpos[i]
            thisspan.posTop = ypos[i]
        }
    }

    else if (flag == 1 && document.layers) {
        for (i = message.length - 1; i >= 1; i--) {
            xpos[i] = xpos[i - 1] + step
            ypos[i] = ypos[i - 1]
        }
        xpos[0] = x + step
        ypos[0] = y

        for (i = 0; i < message.length - 1; i++) {
            var thisspan = eval("document.span" + i)
            thisspan.left = xpos[i]
            thisspan.top = ypos[i]
        }
    }
    var timer = setTimeout("makesnake()", 30)
}

/*資料來源: https://docs.pingcode.com/baike/3695671 */
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('run');
    const numberOfPetals = 20;
    for (let i = 0; i < numberOfPetals; i++) {
        createPetal();
    }
    function createPetal() {

        const petal = document.createElement('div'); petal.classList.add('petal');
        container.appendChild(petal);
        const size = Math.random() * 5 +5;
        petal.style.width = `${size}px`;
        petal.style.height = `${size}px`;
        petal.style.left = `${Math.random() * 100}vw`;
        petal.style.animationDuration = `${Math.random() * 10 + 10}s`;
        petal.style.animationDelay = `${Math.random() * 15}s`;
        petal.addEventListener('animationend', () => {
            petal.remove();
            createPetal();
        });
    }
});
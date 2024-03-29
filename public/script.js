let canvas = document.getElementById('canvas')

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;




var io = io.connect('https://whiteboard-backend-c8gn.onrender.com');

let ctx = canvas.getContext('2d')

window.addEventListener("resize", function(event) {
   ctx.width = window.innerWidth;
    ctx.height = window.innerHeight;
})

let x , y , mouseDown = false;

window.onmousedown = (e) =>{
    ctx.moveTo(x,y);
    io.emit('down' , {x,y})
    mouseDown = true;
};

window.onmouseup = (e) =>{
    mouseDown = false;
};

io.on('ondraw' , ({x,y}) =>{
    
        ctx.lineTo(x,y);
        ctx.stroke();
     
})

io.on('ondown' , ({x,y}) =>{
    ctx.moveTo(x,y);
})

window.onmousemove = (e) =>{
    x = e.clientX;
    y = e.clientY;

    if(mouseDown){
        io.emit('draw' , {x,y});
        ctx.lineTo(x,y);
        ctx.stroke();
    }
};

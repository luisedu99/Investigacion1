// Ancho y alto del lienzo
var canvasWidth = 840; 
var canvasHeight = 350;


//Ancho y alto de nuestra hoja
var spriteWidth = 864; 
var spriteHeight = 280; 

//Frame en que esta dividido nuestra imagen filas y columnas, este valor esta tomado de nuestra imagen
var rows = 2; 
var cols = 8; 

//Variables que definen la fila que se usara para el recorrido de izquierda a derecha, como tenemos dos filas en nuestra imagen el movimiento a la derecha esta ubicado en la primera fila(0)
//y el movimiento a la izquierda esta en la fila de abajo(1) 
var trackRight = 0; 
var trackLeft = 1; 

//Para obtener el ancho de un solo frame, dividimos el ancho del frame con el número de columnas porque todos los frame tienen el mismo ancho y alto
//Lo mismo para la altura dividimos la altura con el número de filas
var width = spriteWidth/cols; 
var height = spriteHeight/rows; 


//Cada fila contiene 8 cuadros y al inicio mostraremos el primer cuadro (asumiendo el índice de 0)
var curFrame = 0; 

//El numoer de cuadros total es 8
var frameCount = 8; 

//Coordenadas x & y para renderizar el dibujo
var x=0;
var y=200; 


//Coordenadas x & y del lienzo para obtener el fotograma único
var srcX; 
var srcY; 

//Seguir el movimiento a la izquierda y escribir
//Suponiendo que al principio el personaje se moverá hacia la derecha
var left = false; 
var right = true;


//Velocidad del movimiento
var speed = 12; 

//Obteniendo id de la etiqueta canvas con id "canvas"
var canvas = document.getElementById('canvas');
//Asignamos a la variables canvas(que es ahora nuestra etiqueta que representa nuestro lienzo en el html, le asignamos en ancho y alto que tendra nuestro lienzo)
canvas.width = canvasWidth;
canvas.height = canvasHeight; 

//Agregando un contexto 2D a la variable "canvas", el getcontext nos permite retornar un contexto de dibujo en nuestro lienzo
var ctx = canvas.getContext("2d");

//Creando un objeto de tipo Image para nuestro personaje  
var character = new Image(); 
//Buscando ruta de la imagen
character.src = "img/character.png";

//Actualiza el frame para la movilidad
function updateFrame(){
    //Actualizar el índice de fotogramas 
    curFrame = ++curFrame % frameCount; 
    
    //Calculando la coordenada x para la hoja de sprites
    srcX = curFrame * width; 
    //Eliminamos las imagenes pasadas o rastros, para crear una animacion limpia
    ctx.clearRect(x,y,width,height);	
    
    //Si left es verdadero y el carácter no ha alcanzado el borde izquierdo
    if(left && x>0){
        //Calculando srcY
        srcY = trackLeft * height; 
        //Disminuyendo la coordenada x
        x-=speed; 
    }
    //Si la derecha es verdadera y el personaje no ha alcanzado el borde derecho
    if(right && x<canvasWidth-width){
        //Calculando la coordenada y para la hoja de sprites
        srcY = trackRight * height; 
        //Aumentando la coordenada x
        x+=speed; 
    }
}


//Funcion para renderizar el personaje
function draw(){
    //Actualizando el frame
    updateFrame();
    //Dibujando la imagen en el lienzo
    ctx.drawImage(character,srcX,srcY,width,height,x,y,width,height);
}

//Moverse a la izquierda
function moveLeft(){
    left = true; 
    right = false; 
}

//Moverse a la derecha, por defecto se movera a la derecha
function moveRight(){
    left = false;
    right = true; 
}

//Bucle para que la imagen se renderize continuamente, el primer valor es el de la funcion y el segundo es el intervalo que se repetira que son 100ms 
setInterval(draw,100);

//  PIRAMIDE PARTE1 (ROTACION(XYZ), STOP Y RESET)
//  PARTE2 (TRASLACION(XY),RESET EN POSICION)


var escena, camara, render; //Elementos para render del mundo
var piramide; //Figuras
var ultimoTiempo;
var velocidad = 0;

var rotacion = new THREE.Vector3(0,1,0);

var TECLA = {
                IZQUIERDA:false, 
                ARRIBA:false,
                DERECHA:false,
                ABAJO:false,
                RX:false,
                RY:false,
                RZ:false,
                stop:false,
                reset:false,
                mover:false,

};

function webGLStart() {
    iniciarEscena();
    ultimoTiempo=Date.now(); //Calculamos el último tiempo
    document.onkeydown=teclaPulsada; //Evaluamos teclas pulsadas
    document.onkeyup=teclaSoltada;  //Evaluamos teclas soltadas
    animarEscena(); //Animamos
}

function iniciarEscena(){

    render = new THREE.WebGLRenderer(); //Creamos un objeto WebGLRenderer
    console.log(render);

    render.setClearColor(0x0f0f0f, 1); //Definimos el color de limpiado

    var canvasWidth = 1000; //Anchos del canvas
    var canvasHeight = 800; //Alto del canvas
    render.setSize(canvasWidth, canvasHeight); //Seteamos el ancho y el alto del canvas WebGL

    document.body.appendChild(render.domElement);//Agregamos el canvas al cuerpo del documento
                                                 //El canvas es un atributo del objeto render de tipo WebGLRenderer

    //Escena
    escena = new THREE.Scene();

    //Camara
    camara = new THREE.PerspectiveCamera(45, canvasWidth / canvasHeight, 0.1, 100);
    camara.position.set(0, 0, 0);
    camara.lookAt(escena.position);
    escena.add(camara);

    //Pirámide
    var piramideMaterial = new THREE.MeshBasicMaterial({
        vertexColors:THREE.VertexColors, //Usando color en los vertices
        side:THREE.DoubleSide //Que pinte en ambos lados
    });
    var piramideGeometria = new THREE.CylinderGeometry(0, 1.4, 2, 4, 1, true); // radioSuperior, radioInferior, h, caras, segmentos, abierto?
        
    var switchON = true;
    for (i = 0; i < piramideGeometria.faces.length; i++) {
        piramideGeometria.faces[i].vertexColors[2] = new THREE.Color(0xFF0000);//Vértice común
    
        if ((i % 2) == 1) {//Las caras impares son las que se ven
            if (switchON) {//De las caras que se ven se van intercalando los vértices
                piramideGeometria.faces[i].vertexColors[1] = new THREE.Color(0x0000FF);
                piramideGeometria.faces[i].vertexColors[0] = new THREE.Color(0x00FF00);
                switchON = false;
            }else {
                piramideGeometria.faces[i].vertexColors[1] = new THREE.Color(0x00FF00);
                piramideGeometria.faces[i].vertexColors[0] = new THREE.Color(0x0000FF);
                switchON = true;
            }
        
        } else {//Caras que no se ven
            piramideGeometria.faces[i].vertexColors[1] = new THREE.Color(0x0000FF);
            piramideGeometria.faces[i].vertexColors[0] = new THREE.Color(0x00FF00);
        }
    }

    piramide = new THREE.Mesh(piramideGeometria, piramideMaterial); //La Malla se compone de La geometri y el material
    //piramide.position.set(-1.5, 0.0, -7.0);
    piramide.position.set(0.0, 0.0, -7.0);
    escena.add(piramide);
    piramide.reset = piramide.matrix;
    piramide.posInit = new THREE.Vector3(0.0, 0.0, -7.0);
    console.log(piramide);

//document.print(JSON.stringify(piramide));

   // console.log(" piramide:             " + piramideGeometria.date);

}

function renderEscena(){
    render.render(escena, camara);
}
function animarEscena(){
    var delta=(Date.now()-ultimoTiempo)/1000;
    if (delta>0)
    {
        //Condicionales de los estados de las teclas
        
        if(TECLA.mover && TECLA.IZQUIERDA) piramide.translateX( -0.1 );
        else if (TECLA.IZQUIERDA) velocidad-=0.2*delta ;
        
        if(TECLA.mover && TECLA.DERECHA) piramide.translateX(  0.1 );
        else if (TECLA.DERECHA) velocidad+=0.2*delta;
        
        if(TECLA.mover && TECLA.ARRIBA) piramide.translateY( 0.1 );
        if(TECLA.mover && TECLA.ABAJO) piramide.translateY( -0.1 );
        
        if(TECLA.RX) rotacion.x = 1.0; else rotacion.x = 0.0;
        if(TECLA.RY) rotacion.y = 1.0; else rotacion.y = 0.0;
        if(TECLA.RZ) rotacion.z = 1.0; else rotacion.z = 0.0;
        
        if(TECLA.reset)     piramide.matrix = piramide.reset, 
                            //piramide.position.set(piramide.posInit)
                            
                            piramide.position.set(piramide.posInit.x,piramide.posInit.y,piramide.posInit.z)
                            
                            ;
        
       
        
        
        if(TECLA.stop) velocidad = 0.0;
   
        //piramide.rotation.y += velocidad ;
        rotateAroundWorldAxis(piramide, rotacion, velocidad);
        renderEscena();
    }
    ultimoTiempo=Date.now();
    requestAnimationFrame(animarEscena);
}
//EJERCICIO!!!! Hacer que el usuario pueda decidir la componente en la que rotará la piramida presionando la letra x,y o z
function teclaPulsada(e)
{
    console.log("piramide");
    console.log(piramide);
    console.log("posInit");
    console.log(piramide.posInit);
    console.log("position");
    console.log(piramide.position);
    //console.log("el codigo de la tecla " + e.keyIdentifier + " es: " + e.keyCode);
    //console.log(e);
    //console.log(piramide);
    switch (e.keyCode)
    {
        case 37: // Izquierda
            TECLA.IZQUIERDA=true;
            break;
        case 39: // Derecha
            TECLA.DERECHA=true;
            break;
            
        case 88: // "X"
            TECLA.RX=true;
            break;
        case 89: // "Y"
            TECLA.RY=true;
            break;
        case 90: // "Z"
            TECLA.RZ=true;
            break;
            
        case 83: // stop "S"
            TECLA.stop=true;
            break;
        case 82: // reset "R"
            TECLA.reset=true;
            break;
        case 77: // mover "M"
            TECLA.mover=true;
            break;
            
        case 38: //arriba
            TECLA.ARRIBA=true
            break;
        case 40: //abajo
            TECLA.ABAJO=true
            break;
    }

}
function teclaSoltada(e)
{
    switch (e.keyCode)
    {
        case 37: // Izquierda
            TECLA.IZQUIERDA=false;
            break;
        case 39: // Derecha
            TECLA.DERECHA=false;
            break;
        case 38: //arriba
            TECLA.ARRIBA=false;
            break;
        case 40: //abajo
            TECLA.ABAJO=false;
            break;
            
        case 88: // "X"
            TECLA.RX=false;
            break;
        case 89: // "Y"
            TECLA.RY=false;
            break;
        case 90: // "Z"
            TECLA.RZ=false;
            break;
            
        case 83: // stop "S"
            TECLA.stop=false;
            break;
        case 82: // reset "R"
            TECLA.reset=false;
            break;
        case 77: // mover "M"
            TECLA.mover=false;
            break;
    }
}

function degToRad(degrees) {
    return degrees * Math.PI / 180;
}

function rotateAroundWorldAxis( object, axis, radians ) {
    var rotationMatrix = new THREE.Matrix4(); //Matriz identidad 4x4
    rotationMatrix.makeRotationAxis( axis.normalize(), radians );
    rotationMatrix.multiply( object.matrix );
    object.matrix = rotationMatrix;
    object.rotation.setFromRotationMatrix( object.matrix );
}
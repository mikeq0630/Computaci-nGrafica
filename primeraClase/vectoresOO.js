var a= 1;
var b= 2;
var c= 3;

document.write(a+b);

function Vector3D(x, y, z){

	this.x=x;
	this.y=y;
	this.z=z;
}
var v= new Vector3D(1,5,8);

document.write("Vector v = " + JSON.stringify(v));


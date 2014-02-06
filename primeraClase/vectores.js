

var Vector3D = function(x,y,z){
			this.set(x,y,z);
		};

		Vector3D.prototype = {
			set:function(x,y,z){
				this.x=x;
				this.y=y;
				this.z=z;
				return this;
			},
			module:function(){

				return  Math.sqrt((Math.pow(this.x,2))+(Math.pow(this.y,2))+(Math.pow(this.z,2)));
				
			},
			direction:function(){
				var cosenos = new Array();
				var mod= this.module();
				cosenos[0] = Math.round(this.x/mod * 180/ Math.PI);
			    cosenos[1] = Math.round(this.y/mod * 180/ Math.PI);
			    cosenos[2] = Math.round(this.z/mod * 180/ Math.PI);
			    return cosenos;
			},
			v_unitario:function(){
				var v_unit = new Array();
				var mod1= this.module();
				v_unit[0]= this.x/mod1;
				v_unit[1]= this.y/mod1;
				v_unit[2]= this.z/mod1;
				return v_unit;
			},
			v_unitarioPrueba:function(){
				return  Math.sqrt((Math.pow(this.x/this.module(),2))+(Math.pow(this.y/this.module(),2))+(Math.pow(this.z/this.module(),2)));
			}
		};

 		var v = new Vector3D();
        v.x = prompt("Ingrese La Coordenada x","");
        v.y = prompt("Ingrese La Coordenada y","");
        v.z = prompt("Ingrese La Coordenada z","");

		document.write("El vector V es: "+JSON.stringify(v)+ "<div>");
		document.write("El Modulo del vector V es: "+v.module()+ "<div>");
		document.write("La direccion del vector es: "+v.direction()+ "<div>");
		document.write("El Vector Unitario es: "+ v.v_unitario() + "<div>");
		document.write("La Prueba Del Vector Unitario Es: "+ v.v_unitarioPrueba() + "<div>");

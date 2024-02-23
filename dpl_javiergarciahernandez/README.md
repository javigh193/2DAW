
<center>

# UT3-A1


</center>

***Nombre:*** Javier García Hernández<br>
***Curso:*** 2º de Ciclo Superior de Desarrollo de Aplicaciones Web.

### ÍNDICE

+ [Introducción](#id1)
+ [Objetivos](#id2)
+ [Material empleado](#id3)
+ [Desarrollo](#id4)
+ [Conclusiones](#id5)


#### ***Introducción***. <a name="id1"></a>

Un mismo servidor web puede albergar varios servicios, cada uno de ellos en su correspondiente <b>Host Virtual</b>, en Nginx <b>Server Block</b>. Configurando estos servicios por separado podemos distribuir las tareas de manera más eficiente y facilitamos el mantenimiento. Otra forma de distribución de funcionalidades propia de Nginx es su <b>modularidad</b>. Mediante la instalación de diferentes módulos podemos incorporar nuevas funcionalidades a nuestra instalación de Nginx.

#### ***Objetivos***. <a name="id2"></a>

El objetivo de esta práctica es desplegar una pequeña aplicación en su propio <b>Server Block</b> para atender peticiones a su <b>dominio (server_name)</b>. Se instalará el <b>módulo 'ngx_small_light'</b> para elaborar la aplicación.

#### ***Material empleado***. <a name="id3"></a>

Para la realización de esta práctica se emplea un PC con sistema operativo Linux, en el que se instala el hipervisor de Oracle <b>VirtualBox</b>. Nginx correrá en una máquina virtual con sistema operativo Linux. Se instalará también <b>PHP-FPM</b>, ya que <b>Nginx</b> no puede manejar código PHP y será necesario redirigir las peticiones que lo requieran a dicho servicio mediante un <b>socket unix</b>. Para actuar como cliente se establecerá una conexión <b>ssh</b> entre la máquina real y la máquina virtual, pudiendo así trabajar desde una terminal de la máquina real además de utilizar el navegador de la misma como cliente. 

#### ***Desarrollo***. <a name="id4"></a>

### Instalación del módulo ngx_small_light:

En primer lugar instalamos las dependencias requeridas por el módulo:

    sudo apt install -y build-essential imagemagick libpcre3 libpcre3-dev libmagickwand-dev

Luego descargamos el códgio fuente del módulo desde el repositorio:

    git clone https://github.com/cubicdaiya/ngx_small_light.git /tmp/ngx_small_light

En la carpeta donde hemos clonado el repositorio realizamos la "configuración":

    cd /tmp/ngx_small_light/ | ./setup

Descargamos el código fuente de Nginx:

    curl -sL https://nginx.org/download/nginx-$(/sbin/nginx -v |& cut -d '/' -f2).tar.gz | tar xvz -C /tmp

Compilamos como módulo dinámico:

    ./configure --add-dynamic-module=../ngx_small_light --with-compat

Generamos la librería dinámica:

    make modules

Copiamos el fichero <b>.so</b> a la carpeta desde la que se cargan los módulos dinámicos de Nginx:

    sudo cp objs/ngx_http_small_light_module.so /etc/nginx/modules

Para que el módulo se cargue dinámicamente, añadimos la directiva <b>load_module</b> al fichero <b>nginx.conf</b>:

    load_module /etc/nginx/modules/ngx_http_small_light_module.so;

Configuramos el <b>Server Block</b>:

    server {
	listen 80;
	server_name images.pc28.es;
	root /usr/share/nginx/images.pc28;
	index index.html;	

	location /img {
		small_light on;
		set $file $1;
		rewrite ^ /$file;
	}

    location ~ \.php$ {
		fastcgi_pass   unix:/var/run/php/php8.2-fpm.sock;
		index          index.php;
		include        fastcgi_params;
		fastcgi_param  SCRIPT_FILENAME   $document_root$fastcgi_script_name;
	}
	
}





### Calculadora Nativa:

Un problema que surge con esta parte es el tema de los permisos a la hora de acceder a ficheros por parte de Nginx. Cuando se intenta acceder a ficheros dentro del home del usuario da un error 403. 

Una posible solución es albergar los ficheros de la aplicación en la carpeta por defecto de Nginx: /usr/share/nginx/html. De esta forma, cuando se pide 'calculadora.php' desde el navegador Nginx podrá servir los ficheros de la aplicación.

<img src="A1/imagenes/calculadora_nativa.JPG">

#### ***Conclusiones***. <a name="id5"></a>

La dockerización de aplicaciones facilita en gran medida las tareas de despliegue y configuración en general. Se evitan problemas de conflictos entre las configuraciones e instalaciones ya existentes y las nuevas necesidades que van surgiendo. Vale mucho la pena familiarizarse con el uso de Docker y herramientas similares de cara a trabajar como desarrollador. 
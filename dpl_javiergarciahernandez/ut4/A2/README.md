
<center>

# UT4-A2


</center>

***Nombre:*** Javier García Hernández<br>
***Curso:*** 2º de Ciclo Superior de Desarrollo de Aplicaciones Web.

## ÍNDICE

+ [Introducción](#id1)
+ [Objetivos](#id2)
+ [Material empleado](#id3)
+ [Desarrollo](#id4)
+ [Conclusiones](#id5)


## ***Introducción***. <a name="id1"></a>

Mediante el uso de un <b>VPS (Virtual Private Server)</b> podemos desplegar aplicaciones sin tener que encargarnos del mantenimiento de los servidores. A la hora de desplegar una aplicación, primero se trabaja en un <b>entorno de desarrollo</b>, dónde se puede comprobar que todo funciona correctamente, y luego se realiza un despliegue al <b>entorno de producción</b>.

A la hora de elaborar aplicaciones en cualquier lenguaje de programación, es muy conveniente utilizar <b>frameworks</b>. Como su propio nombre indica, los <b>frameworks</b> proporcionan un <i>marco de trabajo</i> que pone a disposición del programador una serie de herramientas a cambio de tener que ajustarse a las reglas establecidas por dicho marco.

## ***Objetivos***. <a name="id2"></a>

El objetivo de esta práctica es realizar el despliegue de una aplicación que será elaborada mediante <b>diferentes tecnologías y sus correspondientes frameworks</b>. 

## ***Material empleado***. <a name="id3"></a>

Para la realización de esta práctica se emplea un PC con sistema operativo Linux, en el que se instala el hipervisor de Oracle <b>VirtualBox</b>. Éste será nuestro <b>entorno de desarrollo</b>. Por otro lado, se dispondrá de una máquina virtual remota, en un <b>VPS de Azure (Microsoft).</b> Éste será nuestro <b>entorno de producción.</b>

La aplicación a desplegar se elaborará utilizando las siguientes tecnologías:

- <b>Laravel</b>, un framework para aplicaciones desarrolladas con <b>PHP</b>.

    El sistema gestor de base de datos que se utilizará es <b>Postgresql</b>. Se instalará un <b>administrador de Postgresql: pgAdmin</b>. Este administrador dispone de interfaz gráfica y es de código abierto. 

    Para lanzar el servidor pgAdmin utilizaremos una <b>Intefaz de Pasarela de Servidor Web (WSGI): gunicorn.</b>

    Para el despliegue en producción se utilizará <b>Cerbot</b>, una herramienta de certificación automática.
- <b>Express</b>, un framework para aplicaciones desarrolladas con <b>Node.js (JavaScript)</b>.

    <b>Node.js</b> será el <b>motor de ejecución de JavaScript</b> que utilizaremos.
- <b>Spring</b>, un framework para aplicaciones desarrolladas con <b>Java</b>.
- <b>Ruby on Rails</b>, un framework para aplicaciones desarrolladas con <b>Ruby</b>.
- <b>Django</b>, un framework para aplicaciones desarrolladas con <b>Python</b>.

El código de la aplicación y los <b>scripts de despliegue</b> se alojarán en sus correspondientes <b>repositorio de GitHub</b>.

## ***Desarrollo***. <a name="id4"></a>

## Laravel (PHP)

### Preparación del entorno de desarrollo

#### Instalación de PostgreSQL

Actualizar los repositorios:

	sudo apt update

Instalación de paquetes de soporte para Postgresql:

	sudo apt install -y apt-transport-https

Descargamos la clave de firma para el repositorio oficial de PostgreSQL:

	url -fsSL https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo gpg --dearmor -o /etc/apt/trusted.gpg.d/postgresql.gpg

Añadimos el repositorio oficial de PostgreSQL:

	echo "deb http://apt.postgresql.org/pub/repos/apt/ $(lsb_release -cs)-pgdg main" | sudo tee /etc/apt/sources.list.d/postgresql.list > /dev/null

Actualizamos de nuevo los repositorios:

	sudo apt update

Instalamos PostgreSQL:

	sudo apt install -y postgresql

<img src="img/1.png">

#### Configuración de la base de datos

Accedemos al intérprete de postgresql:

	sudo -u postgres psql	

Creamos un usuario y una base de datos que sea de su propiedad:

	CREATE USER travelroad_user WITH PASSWORD 'xxxx';

	CREATE DATABASE travelroad WITH OWNER travelroad_user;

	\q

Accedemos al intérprete de postgresql con el usuario creado y su base de datos:

	psql -h localhost -U travelroad_user travelroad

<img src="img/2.png">

Creamos la tabla 'places':

	CREATE TABLE places(
		id SERIAL PRIMARY KEY,
		name VARCHAR(255),
		visited BOOLEAN);

Cargamos datos desde un fichero csv:

	curl -o /tmp/places.csv https://raw.githubusercontent.com/sdelquin/dpl/main/ut4/files/places.csv

	psql -h localhost -U travelroad_user -d travelroad -c "\copy places(name, visited) FROM '/tmp/places.csv' DELIMITER ','"

<img src="img/3.png">

#### Instalación de pgAdmin

Creación de carpetas con permisos adecuados:

	sudo mkdir /var/lib/pgadmin
	sudo mkdir /var/log/pgadmin
	sudo chown $USER /var/lib/pgadmin
	sudo chown $USER /var/log/pgadmin

Creación de un entorno virtual de Python (en el $HOME del $USER):

	python -m venv pgadmin4
	source pgadmin4/bin/activate
	pip install pgadmin4

Lanzo el script de configuración:

	pgadmin4

Configuramos un usuario 'maestro'.

#### Instalación del WSGI gunicorn

Instalamos gunicorn en el entorno virtual:

	pip install gunicorn

Lanzamos el servidor de pgAdmin utilizando gunicorn:

	gunicorn --chdir pgadmin4/lib/python3.11/site-packages/pgadmin4 --bind unix:/tmp/pgadmin4.sock pgAdmin4:app

#### Configurar virtual host en Nginx para pgAdmin

Creamos el fichero de configuración del servidor:

	sudo nano /etc/nginx/conf.d/pgadmin.conf

<img src="img/4.png">

Ahora podemos entrar utilizando el 'server_name' y las credenciales de la cuenta 'maestra':

<img src="img/5.png">

#### Demonizando el servicio

Creamos el fichero de configuración del servicio:

	sudo nano /etc/systemd/system/pgadmin.service

<img src="img/6.png">

Una vez creado el fichero de configuración, habilitamos el servicio para que se lance al iniciar el SO:

<img src="img/7.png">

#### Instalación de Laravel

Instalamos composer, un gestor de dependencias para PHP:

	curl -fsSL https://raw.githubusercontent.com composer/getcomposer.org/main/web/installer | php -- --quiet | sudo mv composer.phar /usr/local/bin/composer

Instalamos los módulos de PHP necesarios para Laravel:

	sudo apt install -y php8.2-mbstring php8.2-xml php8.2-bcmath php8.2-curl php8.2-pgsql

Creamos la estructura base del proyecto mediante composer:

	composer create-project laravel/laravel travelroad

<img src="img/8.png">

Modificamos credenciales de acceso en el .env del proyecto:

<img src="img/9.png">

Damos permisos adecuados a los ficheros del proyecto, para que Nginx y PHP-FPM puedan acceder:

	sudo chgrp -R nginx storage bootstrap/cache
	sudo chmod -R ug+rwx storage bootstrap/cache

Configuramos el <b>server block</b> para la aplicación:

	server {
		server_name travelroad;
		root /home/pc28-dpl/travelroad/public;

		index index.html index.htm index.php;

		location / {
			try_files $uri $uri/ /index.php?$query_string;
		}

		location ~ \.php$ {
			fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
			fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
			include fastcgi_params;
		}
	}

Para que Nginx pueda manipular ficheros en /home es necesario cambiar los permisos:

	chmod og+rX /home /home/pc28-dpl

Por último configuramos la lógica de negocio de nuestra aplicación. Para necesitamos editar vistas y plantilla.

La vista:

	<?php

	// https://laravel.com/api/6.x/Illuminate/Support/Facades/DB.html
	use Illuminate\Support\Facades\DB;

	Route::get('/', function () {
	$wished = DB::select('select * from places where visited = false');
	$visited = DB::select('select * from places where visited = true');

	return view('travelroad', ['wished' => $wished, 'visited' => $visited]);
	});

La plantilla:

	<html>
	<head>
		<title>Travel List</title>
	</head>

	<body>
		<h1>My Travel Bucket List</h1>
		<h2>Places I'd Like to Visit</h2>
		<ul>
		@foreach ($wished as $place)
		<li>{{ $place->name }}</li>
		@endforeach
		</ul>

		<h2>Places I've Already Been To</h2>
		<ul>
		@foreach ($visited as $place)
		<li>{{ $place->name }}</li>
		@endforeach
		</ul>
	</body>
	</html>

Si todo ha sido configurado correctamente, debemos poder ver el siguiente resultado:

<img src="img/10.png">

Un problema que puede darse en esta configuración es que, si se intenta acceder a la base de datos de Postgresql antes de que esté el servicio correspondiente levantado, se dará un error de acceso que bloqueará el proceso. 
En este caso será necesario detener los servicios de Nginx y Postgresql, y volver a levantarlos en el orden adecuado: primero Postgresql y después Nginx.

### Preparación del entorno de producción:

#### Crear un repositorio donde alojar la aplicación:

Creamos un repositorio que contenga el proyecto de la aplicación.

Dado que el <b>.gitignore</b> evita que se suban ciertas configuraciones he instalaciones realizadas en la máquina local, es necesario elaborar un guión que se encargue de realizar dichos pasos al desplegar:

	#!/bin/bash

	ssh javiergarcia@azure_vm "
	cd /home/javiergarcia/dpl-ut4-a1
	git pull
	cd travelroad
	composer install
	"

Se deben dar permisos de ejecución:

	chmod +x deploy.sh

Creo el hostname asociado a la ip de mi máquina virtual de Azure:

<img src="img/11.png">

Realizo unos cambios en la plantilla de la aplicación en la máquina local y subo los cambios al repositorio remoto.
A continuación lanzo el script de despliegue:

<img src="img/15.png">

Accedo a la página y compruebo que se ve correctamente:

<img src="img/16.png">

#### Certificado de seguridad TLS (Transport Layer Security) 

Instalo <b>Cerbot</b>:

	sudo apt install -y certbot

Insalo el plugin para nginx:

	sudo apt install -y python3-certbot-nginx

Configuración del certificado para el dominio travelroad.javierhernandez.arkania.es:

	javiergarcia@dpl-javiergarcia-28:~$ sudo certbot --nginx
	Saving debug log to /var/log/letsencrypt/letsencrypt.log
	Enter email address (used for urgent renewal and security notices)
	(Enter 'c' to cancel): javigh1903@movistar.es

	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	Please read the Terms of Service at
	https://letsencrypt.org/documents/LE-SA-v1.3-September-21-2022.pdf. You must
	agree in order to register with the ACME server. Do you agree?
	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	(Y)es/(N)o: yes

	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	Would you be willing, once your first certificate is successfully issued, to
	share your email address with the Electronic Frontier Foundation, a founding
	partner of the Let's Encrypt project and the non-profit organization that
	develops Certbot? We'd like to send you email about our work encrypting the web,
	EFF news, campaigns, and ways to support digital freedom.
	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	(Y)es/(N)o: n
	Account registered.

	Which names would you like to activate HTTPS for?
	We recommend selecting either all domains, or all domains in a VirtualHost/server block.
	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	1: pgadmin.javierhernandez.arkania.es
	2: travelroad.javierhernandez.arkania.es
	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	Select the appropriate numbers separated by commas and/or spaces, or leave input
	blank to select all options shown (Enter 'c' to cancel): 
	Requesting a certificate for pgadmin.javierhernandez.arkania.es and travelroad.javierhernandez.arkania.es

	Successfully received certificate.
	Certificate is saved at: /etc/letsencrypt/live/pgadmin.javierhernandez.arkania.es/fullchain.pem
	Key is saved at:         /etc/letsencrypt/live/pgadmin.javierhernandez.arkania.es/privkey.pem
	This certificate expires on 2024-03-17.
	These files will be updated when the certificate renews.
	Certbot has set up a scheduled task to automatically renew this certificate in the background.

	Deploying certificate
	Successfully deployed certificate for pgadmin.javierhernandez.arkania.es to /etc/nginx/conf.d/pgadmin.conf
	Successfully deployed certificate for travelroad.javierhernandez.arkania.es to /etc/nginx/conf.d/travelroad.conf
	Congratulations! You have successfully enabled HTTPS on https://pgadmin.javierhernandez.arkania.es and https://travelroad.javierhernandez.arkania.es

	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	If you like Certbot, please consider supporting our work by:
	* Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
	* Donating to EFF:                    https://eff.org/donate-le
	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

Cerbot ha aplicado una serie de cambios en la configuración de los server blocks:

	javiergarcia@dpl-javiergarcia-28:~$ sudo cat /etc/nginx/conf.d/travelroad.conf 
	server {
		server_name travelroad.javierhernandez.arkania.es;
		root /home/javiergarcia/dpl-ut4-a1/travelroad/public;

		index index.html index.php;

		location / {
			try_files $uri $uri/ /index.php?$query_string;
		}
		
		location ~ \.php$ {
			fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
			fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
			include fastcgi_params;
		}


		listen 443 ssl; # managed by Certbot
		ssl_certificate /etc/letsencrypt/live/pgadmin.javierhernandez.arkania.es/fullchain.pem; # managed by Certbot
		ssl_certificate_key /etc/letsencrypt/live/pgadmin.javierhernandez.arkania.es/privkey.pem; # managed by Certbot
		include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
		ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

	}
	server {
		if ($host = travelroad.javierhernandez.arkania.es) {
			return 301 https://$host$request_uri;
		} # managed by Certbot


		server_name travelroad.javierhernandez.arkania.es;
		listen 80;
		return 404; # managed by Certbot


	}

Efectivamente, ahora podemos acceder a la página a través de https:

<img src="img/17.png">

#### Redirección www

Configuramos un server block que redirija 'www.mi_dominio' a 'mi_dominio':

	server {
		server_name www.javierhernandez.arkania.es;
		return 301 https://javierhernandez.arkania.es$request_uri;
	}

Registramos con Cerbot el dominio 'www.mi_dominio' para que se pueda acceder por https.


#### Script de despliegue

	pc28-dpl@a109pc28dpl:~$ cat laravel_deploy.sh 
	#!/bin/bash

	cd dpl-ut4-a1
	git add .
	git commit -m "Deploying from development"
	git push

	ssh javiergarcia@azure_vm "
	cd dpl-ut4-a1
	git pull
	cd travelroad
	composer install
	"

## Express (Node.js, JavaScript)

### Preparación del entorno de desarrollo

#### Instalación de Node.js

Añadimos los repositorios oficiales de Node.js:

    curl -fsSL https://deb.nodesource.com/setup_current.x | sudo -E bash

Instalación de Node.js:

	sudo apt install -y nodejs

Comprobamos las versiones de Node.js y de npm (sistema de gestión de paquetes para Node.js):

	pc28-dpl@a109pc28dpl:~/dpl-ut4-a1/travelroad$ node --version
	v21.5.0

	pc28-dpl@a109pc28dpl:~/dpl-ut4-a1/travelroad$ npm --version
	10.2.4

#### Creación del proyecto Express

Instalamos <b>express-generator</b>:

	sudo npm install -g express-generator

Creamos un repositorio github para albergar el proyecto y dentro del mismo creamos la estructura base de la aplicación indicando que las vistas (plantillas) van a utilizar pug como motor de plantillas:

	express --view=pug travelroad

Salida: 

	pc28-dpl@a109pc28dpl:~/dpl-ut4-a2-express$ express --view=pug travelroad

	create : travelroad/
	create : travelroad/public/
	create : travelroad/public/javascripts/
	create : travelroad/public/images/
	create : travelroad/public/stylesheets/
	create : travelroad/public/stylesheets/style.css
	create : travelroad/routes/
	create : travelroad/routes/index.js
	create : travelroad/routes/users.js
	create : travelroad/views/
	create : travelroad/views/error.pug
	create : travelroad/views/index.pug
	create : travelroad/views/layout.pug
	create : travelroad/app.js
	create : travelroad/package.json
	create : travelroad/bin/
	create : travelroad/bin/www

	change directory:
		$ cd travelroad

	install dependencies:
		$ npm install

	run the app:
		$ DEBUG=travelroad:* npm start

Como indica la salida, hay que insalar npm:
	
	npm install

El comando <i>npm install</i> obtiene las dependencias del fichero package.json y almacena los paquetes en la carpeta node_modules, esta carpeta debe quedar fuera del control de versiones, la incorporamos al <b>gitignore</b>.

Probamos la aplicación lanzando el servidor:

	pc28-dpl@a109pc28dpl:~/dpl-ut4-a2-express/travelroad$ DEBUG=travelroad:* npm start

	> travelroad@0.0.0 start
	> node ./bin/www

	travelroad:server Listening on port 3000 +0ms

<img src='img/1.png'>

#### Configuración de la base de datos:

Para poder acceder a la base de datos PostgreSQL necesitamos una dependencia adicional <b>node-postgres</b>:

	npm install pg

Para poder separar las credenciales del control de versiones instalamos el paquete <b>dotenv</b>:

	npm install dotenv

Guardamos la cadena de conexión a la base de datos PostgreSQL:

	echo 'PSQL_CONNECTION=postgresql://travelroad_user:75#perroK5@localhost:5432/travelroad' > .env

Tuve que cambiar la contraseña porque en los ficheros .env el cracter '#' funciona como inicio de comentario y no dí con la forma de que lo tratase como un literal:

	echo 'PSQL_CONNECTION=postgresql://travelroad_user:dpl0000@localhost:5432/travelroad' > .env

#### Lógica de negocio

Definimos un fichero con la conexión a la base de datos:

	mkdir config && nano config/database.js

Contenido del fichero:

	const { Pool } = require("pg");
	require("dotenv").config();
	const connectionString = process.env.PSQL_CONNECTION;
	const pool = new Pool({
	connectionString,
	});

	module.exports = {
	query: (text, params) => pool.query(text, params),
	}

Gestión de las rutas:

	nano routes/index.js

Contenido del fichero:

	const db = require("../config/database");
	let express = require("express");
	let router = express.Router();

	/* GET home page. */
	router.get("/", async function (req, res, next) {
	const { rows: wished } = await db.query(
		"SELECT * FROM places WHERE visited=false"
	);
	const { rows: visited } = await db.query(
		"SELECT * FROM places WHERE visited=true"
	);
	res.render("index", { wished, visited });
	});

	module.exports = router;

Plantilla para la vista:

	nano views/index.pug

Contenido del fichero:

	block content
		h1= "My Travel Bucket List"
		h2= "Places I'd Like to Visit"
		ul
			each place in wished
			li= place.name
		h2= "Places I've Already Been To"
		ul
			each place in visited
			li= place.name

Comprobamos que todo funcione correctamente:

<img src="img/2.png">

#### Gestionando procesos

Instalando:

	pc28-dpl@a109pc28dpl:~$ sudo npm install -g pm2
	[sudo] contraseña para pc28-dpl: 
	npm WARN deprecated uuid@3.4.0: Please upgrade  to version 7 or higher.  Older versions may use Math.random() in certain circumstances, which is known to be problematic.  See https://v8.dev/blog/math-random for details.

	added 157 packages in 16s

	13 packages are looking for funding
	run `npm fund` for details

Lanzando el proceso:

	pc28-dpl@a109pc28dpl:~/dpl-ut4-a2-express/travelroad$ pm2 start ./bin/www --name travelroad
	[PM2] Starting /home/pc28-dpl/dpl-ut4-a2-express/travelroad/bin/www in fork_mode (1 instance)
	[PM2] Done.
	┌────┬────────────────────┬──────────┬──────┬───────────┬──────────┬──────────┐
	│ id │ name               │ mode     │ ↺    │ status    │ cpu      │ memory   │
	├────┼────────────────────┼──────────┼──────┼───────────┼──────────┼──────────┤
	│ 0  │ travelroad         │ fork     │ 0    │ online    │ 0%       │ 45.6mb   │
	└────┴────────────────────┴──────────┴──────┴───────────┴──────────┴──────────┘

Configurando Nginx:

	pc28-dpl@a109pc28dpl:/etc/nginx/conf.d$ cat nano express.travelroad.conf
	cat: nano: No existe el fichero o el directorio
	server {
		server_name express.travelroad;

		location / {
			proxy_pass http://localhost:3000;  # socket TCP
		}
	}

#### Script de despliegue:

	pc28-dpl@a109pc28dpl:~$ cat express_deploy.sh 
	#!/bin/bash

	cd dpl-ut4-a2-express/travelroad/
	git add .
	git commit -m "Deploying from development"
	git push

	ssh javiergarcia@javierhernandez.arkania.es "
	cd dpl-ut4-a2-express/travelroad/
	git pull
	# pm2 restart travelroad --update-env
	"

## Spring (Java)

### Preparación del entorno de desarrollo

#### Instalación del Java Developing Kit (JDK)

Descarga:

	curl -O --output-dir /tmp \
	https://download.java.net/java/GA/jdk19.0.1/afdd2e245b014143b62ccb916125e3ce/10/GPL/openjdk-19.0.1_linux-x64_bin.tar.gz

	sudo tar -xzvf /tmp/openjdk-19.0.1_linux-x64_bin.tar.gz \
	--one-top-level=/usr/lib/jvm

Comprobamos que todo ha ido bien:

	pc28-dpl@a109pc28dpl:~$ ls -l /usr/lib/jvm/jdk-19.0.1/
	total 28
	drwxr-xr-x  2 root  root  4096 ene 15 14:55 bin
	drwxr-xr-x  5 root  root  4096 ene 15 14:55 conf
	drwxr-xr-x  3 root  root  4096 ene 15 14:55 include
	drwxr-xr-x  2 root  root  4096 ene 15 14:56 jmods
	drwxr-xr-x 72 root  root  4096 ene 15 14:56 legal
	drwxr-xr-x  5 root  root  4096 ene 15 14:56 lib
	-rw-r--r--  1 10668 10668 1212 sep 14  2022 release

Configuración de las variables de entorno:

	sudo nano /etc/profile.d/jdk_home.sh
	
	pc28-dpl@a109pc28dpl:~$ cat /etc/profile.d/jdk_home.sh 
	#!/bin/sh
	export JAVA_HOME=/usr/lib/jvm/jdk-19.0.1/
	export PATH=$JAVA_HOME/bin:$PATH

Compruebo versiones instaladas:

	pc28-dpl@a109pc28dpl:~$ java --version
	openjdk 19.0.1 2022-10-18
	OpenJDK Runtime Environment (build 19.0.1+10-21)
	OpenJDK 64-Bit Server VM (build 19.0.1+10-21, mixed mode, sharing)

	pc28-dpl@a109pc28dpl:~$ javac --version
	javac 19.0.1

	pc28-dpl@a109pc28dpl:~$ sdk version

	pc28-dpl@a109pc28dpl:~$ sdk version

	SDKMAN!
	script: 5.18.2
	native: 0.4.6

#### Spring Boot

Es una herramienta para despliegue de aplicaciones desarrolladas con Spring.

	pc28-dpl@a109pc28dpl:~$ sdk install springboot

	Downloading: springboot 3.2.1

	In progress...

	###################################################################################### 100.0%

	Installing: springboot 3.2.1
	Done installing!


	Setting springboot 3.2.1 as default.

#### Maven

Maven nos permite gestionar las dependencias de nuestros proyectos Java.

	pc28-dpl@a109pc28dpl:~$ sdk install maven

	Downloading: maven 3.9.6

	In progress...

	###################################################################################### 100.0%

	Installing: maven 3.9.6
	Done installing!


	Setting maven 3.9.6 as default.

### Creación del proyecto

Utilizando spring se inicia la estructura del proyecto:

	pc28-dpl@a109pc28dpl:~/spring$ spring init --build=maven --dependencies=web --group=edu.dpl --name=travelroad --description=TravelRoad travelroad
	Using service at https://start.spring.io
	Project extracted to '/home/pc28-dpl/spring/travelroad'

Reorganizamos la estructura interna del proyecto, quedando finalmente de la siguiente manera:

	pc28-dpl@a109pc28dpl:~/spring/travelroad$ tree src/main
	src/main
	├── java
	│   └── edu
	│       └── dpl
	│           └── travelroad
	│               ├── controllers
	│               │   └── HomeController.java
	│               ├── models
	│               │   └── Place.java
	│               ├── repositories
	│               │   └── PlaceRepository.java
	│               └── TravelroadApplication.java
	└── resources
		├── application.properties
		├── static
		└── templates
			└── home.html

	11 directories, 6 files

Definimos nuestro controlador:

	pc28-dpl@a109pc28dpl:~/spring/travelroad$ cat src/main/java/edu/dpl/travelroad/controllers/HomeController.java
	package edu.dpl.travelroad.controllers;

	import edu.dpl.travelroad.models.Place;
	import edu.dpl.travelroad.repositories.PlaceRepository;
	import org.springframework.beans.factory.annotation.Autowired;
	import org.springframework.stereotype.Controller;
	import org.springframework.ui.Model;
	import org.springframework.web.bind.annotation.GetMapping;

	@Controller
	public class HomeController {
		private final PlaceRepository placeRepository;

		@Autowired
		public HomeController(PlaceRepository placeRepository) {
			this.placeRepository = placeRepository;
		}

		@GetMapping("/")
		public String home(Model model) {
			model.addAttribute("wished", placeRepository.findByVisited(false));
			model.addAttribute("visited", placeRepository.findByVisited(true));
			return "home";  // home.html
		}
	}

Modelos:

	pc28-dpl@a109pc28dpl:~/spring/travelroad$ cat src/main/java/edu/dpl/travelroad/models/Place.java
	package edu.dpl.travelroad.models;

	import javax.persistence.Entity;
	import javax.persistence.GeneratedValue;
	import javax.persistence.GenerationType;
	import javax.persistence.Id;
	import javax.persistence.Table;

	@Entity
	@Table(name = "places")
	public class Place {

		@Id
		@GeneratedValue(strategy = GenerationType.AUTO)
		private Long id;

		private String name;
		private Boolean visited;

		public Place() {
		}

		public Place(Long id, String name, Boolean visited) {

			this.id = id;
			this.name = name;
			this.visited = visited;
		}

		public Long getId() {
			return id;
		}

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}

		public Boolean getVisited() {
			return visited;
		}

		public void setVisited(Boolean visited) {
			this.visited = visited;
		}
	}

Repositorio:

	pc28-dpl@a109pc28dpl:~/spring/travelroad$ cat src/main/java/edu/dpl/travelroad/repositories/PlaceRepository.java
	package edu.dpl.travelroad.repositories;

	import edu.dpl.travelroad.models.Place;

	import java.util.List;
	import org.springframework.data.repository.CrudRepository;
	import org.springframework.stereotype.Repository;
	import org.springframework.data.jpa.repository.Query;

	@Repository
	public interface PlaceRepository extends CrudRepository<Place, Long> {

		@Query("SELECT p FROM Place p WHERE p.visited = ?1")
		List<Place> findByVisited(Boolean visited);
	}

Plantilla:

	pc28-dpl@a109pc28dpl:~/spring/travelroad$ cat src/main/resources/templates/home.html
	<!DOCTYPE HTML>
	<html>
	<head>
		<title>My Travel Bucket List</title>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	</head>
	<body>
		<h1>My Travel Bucket List</h1>
		<h2>Places I'd Like to Visit</h2>
		<ul th:each="place : ${wished}">
		<li th:text="${place.name}"></li>
		</ul>

		<h2>Places I've Already Been To</h2>
		<ul th:each="place : ${visited}">
		<li th:text="${place.name}"></li>
		</ul>
	</body>
	</html>

Dependencias:

	pc28-dpl@a109pc28dpl:~/spring/travelroad$ cat pom.xml
	<?xml version="1.0" encoding="UTF-8"?>
	<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
		xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
		<modelVersion>4.0.0</modelVersion>
		<parent>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-parent</artifactId>
			<version>3.2.1</version>
			<relativePath/> <!-- lookup parent from repository -->
		</parent>
		<groupId>edu.dpl</groupId>
		<artifactId>travelroad</artifactId>
		<version>0.0.1-SNAPSHOT</version>
		<name>travelroad</name>
		<description>TravelRoad</description>
		<properties>
			<java.version>17</java.version>
		</properties>
		<dependencies>
			<dependency>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-starter-web</artifactId>
			</dependency>

			<dependency>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-starter-test</artifactId>
				<scope>test</scope>
			</dependency>
			<dependency>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-starter-thymeleaf</artifactId>
			</dependency>
				<dependency>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-starter-data-jpa</artifactId>
			</dependency>	
				<dependency>
				<groupId>org.postgresql</groupId>
				<artifactId>postgresql</artifactId>
				<scope>runtime</scope>
				</dependency>
		</dependencies>

		<build>
			<plugins>
				<plugin>
					<groupId>org.springframework.boot</groupId>
					<artifactId>spring-boot-maven-plugin</artifactId>
				</plugin>
			</plugins>
		</build>

	</project>

Credenciales:

	pc28-dpl@a109pc28dpl:~/spring/travelroad$ cat src/main/resources/application.properties
	spring.datasource.url=jdbc:postgresql://localhost:5432/travelroad
	spring.datasource.username=travelroad_user
	spring.datasource.password=dpl0000

Proceso de construcción:

1. Compilación

	./mvnw compile

	Resultado...
	[INFO] Changes detected - recompiling the module!
	[INFO] Compiling 4 source files to /home/pc28-dpl/dpl-ut4-a2-spring/travelroad/target/classes
	[INFO] ------------------------------------------------------------------------
	[INFO] BUILD SUCCESS
	[INFO] ------------------------------------------------------------------------
	[INFO] Total time:  18.074 s
	[INFO] Finished at: 2024-01-15T17:14:37Z
	[INFO] ------------------------------------------------------------------------

2. Etiquetado

	./mvnw package

Resultado...

	[INFO] Replacing main artifact with repackaged archive
	[INFO] ------------------------------------------------------------------------
	[INFO] BUILD SUCCESS
	[INFO] ------------------------------------------------------------------------
	[INFO] Total time:  32.279 s
	[INFO] Finished at: 2024-01-15T17:54:06Z
	[INFO] ------------------------------------------------------------------------

Ejecutar el fichero JAR:

	java -jar target/travelroad-0.0.1-SNAPSHOT.jar

<img src="img/3.png">

#### Despliegue y demonización

Script de ejecución de la aplicación:

	pc28-dpl@a109pc28dpl:~/dpl-ut4-a2-spring/travelroad$ cat run.sh
	#!/bin/bash

	$route 
	cd $route

	./mvnw package  # el empaquetado ya incluye la compilación

	# ↓ Último fichero JAR generado
	JAR=`ls target/*.jar -t | head -1`
	/usr/bin/java -jar $JAR

Demonización:

	pc28-dpl@a109pc28dpl:~$ cat ~/.config/systemd/user/travelroad.service
	[Unit]
	Description=Spring Boot TravelRoad

	[Service]
	Type=simple
	StandardOutput=journal
	ExecStart=/home/pc28-dpl/dpl-ut4-a2-spring/travelroad/run.sh

	[Install]
	WantedBy=default.target

Configuramos el servicio:

	systemctl --user enable travelroad.service

#### Script de despliegue

	pc28-dpl@a109pc28dpl:~$ cat spring_deploy.sh 
	#!/bin/bash

	cd dpl-ut4-a2-spring/travelroad/
	git add .
	git commit -m "Deploying from development"
	git push

	ssh javiergarcia@javierhernandez.arkania.es "
	cd dpl-ut4-a2-spring/travelroad/
	git pull
	./mvnw compile
	./mvnw package
	systemctl --user restart travelroad.service  
	"


## Django (Python)

### Preparación del entorno de desarrollo

En primer lugar creamos una carpeta para albergar el proyecto (nuestro repositorio git) y, dentro de ella, un <b>entorno virtual</b> para realizar la instalación de Python necesaria para el proyecto. De esta manera desacoplamos proyecto y sistema.

Instalamos django y creamos un andamiaje para el proyecto. Parte del andamiaje es el fichero <b>manage.py</b>, que nos permite ejecutar una serie de comandos python para la gestión de nuestro proyecto. Haciendo uso de él creamos nuestra aplicación: 'places'.

El resultado final:

	pc28-dpl@a109pc28dpl:~/dpl-ut4-a2-django$ ls -la
	total 44
	drwxr-xr-x  6 pc28-dpl pc28-dpl 4096 ene 21 21:55 .
	drwxr-xr-x 23 pc28-dpl pc28-dpl 4096 ene 22 12:06 ..
	-rw-r--r--  1 pc28-dpl pc28-dpl   31 ene 21 18:30 .bashrc
	-rw-r--r--  1 pc28-dpl pc28-dpl   31 ene 21 21:55 .env
	drwxr-xr-x  7 pc28-dpl pc28-dpl 4096 ene 21 18:23 .git
	-rw-r--r--  1 pc28-dpl pc28-dpl   11 ene 21 21:50 .gitignore
	drwxr-xr-x  3 pc28-dpl pc28-dpl 4096 ene 22 10:27 main
	-rwxr-xr-x  1 pc28-dpl pc28-dpl  660 ene 21 18:35 manage.py
	drwxr-xr-x  5 pc28-dpl pc28-dpl 4096 ene 21 21:26 places
	-rw-r--r--  1 pc28-dpl pc28-dpl   27 ene 21 21:46 requirements.txt
	drwxr-xr-x  5 pc28-dpl pc28-dpl 4096 ene 21 18:32 .venv


### Código de la aplicación

Django difiere un poco del clásico modelo MVC. En Django el rol del controlador se "distribuye" por diferentes elementos del framework, entre ellos las vistas. Por lo demás se emplean modelos y plantillas como en cualquier otro framework.

Para la configuración de la base de datos empleamos <b>psycopg3</b> así como <p>prettyconf</p>. El primero nos da soporte para utilizar PostgreSQL y el segundo será útil a la hora de separar información que debe quedar al margen del código de la aplicación del control de versiones, como por ejemplo las credenciales de nuestra base de datos.

Configuración de la base de datos (/main/settings.py):

	DATABASES = {
		'default': {
			'ENGINE': 'django.db.backends.postgresql',
			'NAME': config('DB_NAME', default='travelroad'),
			'USER': config('DB_USERNAME', default='travelroad_user'),
			'PASSWORD': config('DB_PASSWORD', default='dpl0000'),
			'HOST': config('DB_HOST', default='localhost'),
			'PORT': config('DB_PORT', default=5432, cast=int)
		}
	}

Modelos:

	from django.db import models

	class Place(models.Model):
		name = models.CharField(max_length=255)
		visited = models.BooleanField()

		class Meta:
			# ↓ necesario porque ya partimos de una tabla creada ↓
			db_table = "places"

		def __str__(self):
			return self.name

Vistas:

	from django.http import HttpResponse
	from django.template import loader

	from .models import Place


	def index(request):
		wished = Place.objects.filter(visited=False)
		visited = Place.objects.filter(visited=True)
		template = loader.get_template('places/index.html')
		context = {
			'wished': wished,
			'visited': visited,
		}
		return HttpResponse(template.render(context, request))

Plantillas:

	<h1>My Travel Bucket List</h1>

	<h2>Places I'd Like to Visit</h2>

	<ul>
	{% for place in wished %}
	<li>{{ place }}</li>
	{% endfor %}
	</ul>

	<h2>Places I've Already Been To</h2>

	<ul>
	{% for place in visited %}
	<li>{{ place }}</li>
	{% endfor %}
	</ul>

Configuración de las URLs a nivel de aplicación:

	from django.urls import path

	from . import views

	app_name = 'places'

	urlpatterns = [
		path('', views.index, name='index'),
	]

A nivel de proyecto:

	from django.contrib import admin
	from django.urls import path
	from django.urls import include, path

	urlpatterns = [
		path('admin/', admin.site.urls),
		# NUEVA LÍNEA ↓
		path('', include('places.urls', 'places')),
	]

### Entorno de producción

Aquí hacemos uso del ya mencionado prettyconf:

	from pathlib import Path
	# ↓ Nueva línea
	from prettyconf import config
	# ↑ Nueva línea
	...
	DEBUG = config('DEBUG', default=True, cast=config.boolean)
	ALLOWED_HOSTS = config('ALLOWED_HOSTS', default=[], cast=config.list)
	...
	DATABASES = {
		'default': {
			'ENGINE': 'django.db.backends.postgresql',
			'NAME': config('DB_NAME', default='travelroad'),
			'USER': config('DB_USERNAME', default='travelroad_user'),
			'PASSWORD': config('DB_PASSWORD', default='dpl0000'),
			'HOST': config('DB_HOST', default='localhost'),
			'PORT': config('DB_PORT', default=5432, cast=int)
		}
	}

Y en un fichero .env se indican los valores que deben tomar las diferentes variables enlazadas.

#### Gunicorn + Supervisor

Gunicorn será nuestro <b>WSGI</b> (Web Server Gateway Interface). Lo instalamos y lanzamos el script dentro de nuestra aplicación:

	gunicorn main.wsgi:application

Para gestionar el servidor WSGI utilizamos <b>Supervisor</b>, un sistema cliente-servidor de gestión de procesos.

Configuramos un proceso de Supervisor, arrancar gunicorn con nuestra aplicación. De esta forma, "demonizamos" nuestra aplicación como un servicio.

	[program:travelroad]
	user = javiergarcia
	command = /home/javiergarcia/dpl-ut4-a2-django/travelroad/run.sh
	autostart = true
	autorestart = true
	stopsignal = INT
	killasgroup = true
	stderr_logfile = /var/log/supervisor/travelroad.err.log
	stdout_logfile = /var/log/supervisor/travelroad.out.log

Donde run.sh:

	#!/bin/bash

	cd $(dirname $0)
	source .venv/bin/activate
	gunicorn -b unix:/tmp/travelroad.sock main.wsgi:application

Por último, configuramos un server block de Nginx para que derive las peticiones que lleguen al servidor Gunicorn.

	server {
		server_name django.travelroad.javierhernandez.arkania.es;

		location / {
			proxy_pass http://unix:/tmp/travelroad.sock;  # socket UNIX
		}
	}

#### Script de despliegue

	#!/bin/bash

	ssh arkania "
	cd $(dirname $0)
	git pull

	source .venv/bin/activate
	pip install -r requirements.txt

	# python manage.py migrate
	# python manage.py collectstatic --no-input

	supervisorctl restart travelroad
	"

#### ***Conclusiones***. <a name="id5"></a>

El uso de control de versiones y alojamiento en la nube permite desacoplar facilmente el entorno de desarrollo del entorno de producción. Aunque en esta práctica hemos realizado una 'estrategia' de despliegue muy básica, se podrían definir tareas mucho más potentes que comprueben estados de los dos entornos y realizasen los cambios necesarios en producción para poder implementar los cambios ya consolidados en el entorno de desarrollo.

Otro aspecto de la práctica que me ha parecido muy potente es la automatización de la certificación de los dominios mediante Cerbot. 



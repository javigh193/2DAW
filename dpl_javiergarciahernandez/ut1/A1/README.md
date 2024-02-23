
<center>

# Práctica 1: Git

## Jaime León y Javier García


</center>

***Nombre:***
***Curso:*** 2º de Ciclo Superior de Desarrollo de Aplicaciones Web.

### ÍNDICE

+ [Introducción](#id1)
+ [Objetivos](#id2)
+ [Material empleado](#id3)
+ [Desarrollo](#id4)
+ [Conclusiones](#id5)


#### ***Introducción***. <a name="id1"></a>

Un sistema de control de versiones es un software utilizado para gestionar las versiones po las que pasa el código de un proyecto.

Git es el sistema de control de versiones más usado. Es de código abierto y tiene un mantenimiento muy activo.


#### ***Objetivos***. <a name="id2"></a>

En esta práctica aprenderemos las funciones y comandos básicos de git, trabajando con dos repositorios en github.

#### ***Material empleado***. <a name="id3"></a>

Utilizaremos github para alojar un reposiorio en remoto, el cual clonaremos en dos máquinas locales para trabajar desde ellas.

#### ***Desarrollo***. <a name="id4"></a>

***Usuario 1: Jaime León***

***Usuario 2: Javier García***

 - El usuario 1 crea un repositorio y lo clona en su máquina local.

<p align="center">
  <img width="700" src=img/creacion_de_repositorio.png>
</p>

---------------------------------------

<p align="center">
  <img width="500" src=img/clonar%20repo.png>
</p>

 - Copia los archivos iniciales y los sube desde la máquina local.

<p align="center">
  <img width="700" src=img/archivos%20iniciales.png>
</p>

 - El usuario 2 hace un fork del repositorio y lo clona en su máquina.

<p align="center">
  <img width="460" src=img/Fork.png>
</p>

<p align="center">
  <img width="460" src=img/clonar_remoto_u2.png>
</p>

 - El usuario 1 crea el primer issue desde GitHub. 

<p align="center">
  <img width="600" src=img/primer%20issue.png>
</p>

 - El usuario 2 crea una nueva rama 'custom text' para trabajar sobre el issue y modifica el archivo html.

<p align="center">
  <img width="500" src=img/crear_rama_custom-text.png>
</p>

<p align="center">
  <img width="600" src=img/crear_custom-text_remoto.png>
</p>

 - Luego crea un pull request para que lo compruebe el usuario 1.

<p align="center">
  <img width="600" src=img/pr1.png>
</p>

 - El usuario 1 crea una rama remota apuntando al fork del usuario 2 y trae la rama custom-text.

<p align="center">
  <img width=600" src=img/pull_de_custom-text.png>
</p>

 - Cambia a la rama custom-text y modifica el archivo html.

<p align="center">
  <img width="300" src=img/cambio1_index.png>
</p>

 - El usuario 2 recibe los cambios en su rama y realiza otro cambio.

<p align="center">
  <img width="550" src=img/cambio2_pr_u2.png>
</p>

 - El usuario 1 realiza un pull de los nuevos cambios.
 
 <p align="center">
  <img width="550" src=img/segundo_pull_custom-text.png>
</p>
 
 - Realiza otro cambio, aprueba y cierra el Pull Request y añade los cambios a la rama principal su copia local.

<p align="center">
  <img width="600" src=img/cierra_pull_request.png>
</p>

<p align="center">
  <img width="600" src=img/acepta_pull_request.png>
</p>

 - El usuario 2 incorpora los cambios realizados a la rama principal a su rama.

<p align="center">
  <img width="550" src=img/main_fork_atrasado.png>
</p>

---------------------------------

<p align="center">
  <img width="300" src=img/sync_fork.png>
</p>

---------------------------------

<p align="center">
  <img width="650" src=img/modifica_git-work.png>
</p>

 - El usuario 1 crea un issue de nombre "Improve UX with cool colors".

<p align="center">
  <img width="600" src=img/segundo_issue.png>
</p>

 - Cambia la línea 10 de cover.css a color: purple;

<p align="center">
  <img width="550" src=img/color_purple.png>
</p>

 - Hace un commit local en main sin subirlo a su repositorio remoto.

<p align="center">
  <img width="460" src=img/>
</p>
![<>](img/)

 - El usuario 2 crea una rama de nombre "cool-colors" y cambia la línea 10 de cover.css a color: darkgreen;

<p align="center">
  <img width="550" src=img/user2_changecolor.png>
</p>

 - Envia un Pull Request con los nuevos cambios al usuario 1.

<p align="center">
  <img width="460" src=img/pr2.png>
</p>

 - El usuario 1 recibe el pull request e intenta realizar un merge con su rama principal, resultando en conflicto.

<p align="center">
  <img width="600" src=img/conflicto_de_ramas.png>
</p>

 - Resolución del conflicto del pull request integrando los cambios del usuario 2.

<p align="center">
  <img width="600" src=img/resoluci%C3%B3n_de_conflicto.png>
</p>

 - Cambia la línea 11 de cover.css.

<p align="center">
  <img width="460" src=img/cambio_sombra.png>
</p>

 - Hace un commit, cierra el issue "Improve UX with cool colors" y sube los cambios a origin/main.

<p align="center">
  <img width="460" src=img/cambio_sombra_push.png>
</p>

 - Por último el usuario 1 etiqueta la versión como 0.1.0 y crea una release en GitHub.

<p align="center">
  <img width="600" src=img/etiqueta.png>
</p>

#### ***Conclusiones***. <a name="id5"></a>

En esta actividad hemos visto las funcionalidades principales de git. También hemos visto las ventajas que aporta usarlo en conjunción con GitHub, sobre todo de cara a proyectos colaborativos y de difusión.
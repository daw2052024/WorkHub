Los archivos correspondeintes a Docker (Dockerfile, docker-compose...)se encuentran en la carpeta del mismo nombre

La estructura que debe de tener las caprtas es la siguiente:
.

│   ├── apache
│   │   └── WorkHub
│   │       ├── BD_Schema.txt
│   │       ├── index.php
│   │       ├── login.js
│   │       ├── login.php
│   │       ├── Recursos
│   │       │   └── logoWorkHub.png
│   │       ├── registro.js
│   │       ├── registro.php
│   │       ├── Styles
│   │       │   ├── indexStyles.css
│   │       │   └── styles.css
│   │       ├── validar_credenciales.php
│   │       └── validar_registro.php
│   ├── bd_data
│   |..........
│   ├── docker-compose_bd.yml
│   ├── docker-compose.yml
│   └── Dockerfile

*IMPORTANTE*: En el apartado de Perfil en la aplicación, la funcionidad de subir una foto de perfil va a dar error debido a que no tiene permisos para mover la imagen a la carpeta correspondiente:
 Warning
: move_uploaded_file(Recursos/FotosUser/53eeff1f4f194c54a424e91f4d490884 (2).jpg): Failed to open stream: Permission denied in
/var/www/html/perfil.php
on line
18
Ese será el error. Para solucionarlo debemos de entrar en el contenedor de apache-php que hemos generado y donde tenemos alojado nuestro proyecto: /var/www/html y darle permisos a nuestra carpeta:
sudo chmod -R 777 Recursos/FotosUser/

  GNU nano 5.4                                                             Dockerfile                                                                       # Utilizar una imagen base con PHP y Apache
FROM php:8.2-apache

# Instalar el driver de MySQL para PHP
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Copiar el código fuente de tu proyecto al directorio del servidor web
COPY apache/WorkHub /var/www/html

# Exponer el puerto 80 para que Apache pueda ser accesible desde fuera del contenedor
EXPOSE 80
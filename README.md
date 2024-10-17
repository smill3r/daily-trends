# Daily Trends

## Descripción

**Daily Trends** es un agregador de noticias que permite a los usuarios ver las cinco noticias principales del día de diferentes periódicos. También ofrece la opción de añadir noticias manualmente. Este proyecto está diseñado como una propuesta de una prueba técnica, no se considera como un producto de uso comercial o privado.

## Características

- Muestra las cinco noticias más relevantes del día.
- Permite a los usuarios agregar noticias manualmente.
- Basado en un API para la gestión de noticias.

## Tecnologías Utilizadas

- **Node.js**: Para la creación del servidor.
- **Mongoose**: Para la interacción con la base de datos MongoDB.
- **TypeScript**: Para una mejor estructuración del código y tipos estáticos.
- **jsdom**: Para el web scraping y la extracción de contenido de artículos.

## Instalación y ejecución

Para la instalación y ejecución de este programa, es necesario contar con Node 18 instalado, así como docker y docker compose para su ejecución en contenedores (aunque se puede ejecutar manualmente si se conecta a una instancia de base de Mongo local).

1. Clona el repositorio:

```
git clone https://github.com/smill3r/daily-trends.git
```

2. Para ejecutar su versión compilada:

```
docker compose up
```

3. Para ejecutar su versión de desarrollo:

```
docker compose -f docker-compose.dev.yml up
```

Así mismo, si deseas ejecutar sin docker puedes modificar el archivo src/config/dbconfig.ts para apuntar la API hacia una instancia en ejecución de MongoDB, y luego ejecutar:

```
npm install
npm run start
```

## Uso

Visita la API en `http://localhost:3000` para acceder a las funcionalidades. Puedes realizar solicitudes para obtener las noticias más recientes y añadir nuevas noticias.

En el archivo test-file.http puedes encontrar ejemplos de peticiones HTTP para hacer desde Postman o cualquier otro cliente HTTP, recomiendo instalar la extensión REST Client en VSCode para poder ejecutar las peticiones desde el mismo archivo.

## Diseño

## Notas

Como notas respecto al diseño de la API y en cuanto a su escalabilidad me gustaría agregar lo siguiente:

El diseño actual consta de una API que expone distintos endpoints que sirven para activar el web scrapping de los sitios web y su posterior consulta en un feed, se elaboró un endpoint para poder facilitar las pruebas, sin embargo las clases se escribieron con la posibilidad de expandir la funcionalidad del scrapping de las siguientes maneras:

- Crear un cron job que permita ejecutar la tarea de scrapping de forma automatizada a una hora fija.
- Utilizar node workers que puedan hacer el scrapping de forma paralela, puesto que se consigue una lista de URLs de los artículos que se puede proporcionar a cada worker para que se ejecuten de forma paralela fuera del evento principal de Node, pensando en no bloquear la disponibilidad de recibir llamadas en caso de que se quisiera aumentar de forma considerable el número de noticias y sitios a rascar.

Estas funcionalidades no se pudieron implementar por limitaciones de tiempo, pero se tomaron a consideración en el momento del diseño de la clase Scrapper.

## Contacto

Si tienes alguna pregunta o sugerencia, no dudes en abrir un issue en el repositorio o contactarme directamente.

#### Emilio Martin Rodríguez Torres
##### 31/01/2023

![Image text](https://i.ibb.co/RQ3n3Rz/unir.png "UNIR")

## Computación en el cliente Web

### Creación de una extensión para Visual Studio Code
___

### Contenido

1. [Objetivo general](#1)
2. [Objetivos específicos](#2)
3. [Servicio web de chistes Chuck Norris](#3)
4. [Ejercicio No 1 (Resolución del ejercicio a la manera de 2005 "XMLHttpRequest")](#4)
5. [Ejercicio No 2 (Resolución del ejercicio a la manera de 2006 "jQuery")](#5)
6. [Ejercicio No 3 (Resolución con plugin de jQuery (hasta 2014))](#6)
7. [Ejercicio No 4 (Resolución en 2014 "Fetch")](#7)
8. [Ejercicio No 5 (nodejs node-fetch)](#8)
9. [Ejercicio No 6 (Web Components)](#9)
10. [Link del proyecto](#10)
11. [Referencias](#11)
___

<a name="1"></a>
-  **Objetivo general**

    *   Trabajar con estándares web relacionados con conexiones AJAX, funciones asíncronas y componentes.

    *   Desarrollar el laboratorio tal y como se explica durante la sesión y narrar cómo se ha hecho, siguiendo para ello las instrucciones de este documento. Si no puedes asistir a la sesión en directo, recuerda que siempre la tienes a tu disposición como grabación.
.

<a name="2"></a>
- **Objetivos específicos**

    *   En este laboratorio vamos a realizar una sencilla petición mediante estándares web y vamos a representar los datos obtenidos en una página de manera limpia. Iremos complicando y actualizando esta petición de datos para que cada vez se acerque más a la manera actual de realizarse en la práctica. Es decir, repasaremos cada una de las maneras de hacer peticiones AJAX desde la antigüedad, hasta nuestros días.

    *   Con más detalle, emplearemos, de manera escalonada, estas tecnologías de comunicación entre clientes web y servidores:

    *   El objeto XMLHttpRequest.
    *   Las funciones AJAX del archiconocido framework jQuery.
    *   Un plugin específico para jQuery creado por el mantenedor del servicio al que nos vamos a conectar. 
    *   Por último, un componente web moderno (web component) desarrollado por un tercero que nos permitirá realizar peticiones parecidas, pero de manera increíblemente elegante.


<a name="3"></a>
- **Servicio web de chistes Chuck Norris: el ICNDB**
    * El actor y experto en artes marciales Carlos Ray Norris (mundialmente conocido como [Chuck Norris](https://chucknorris.com/)), ha servido desde hace mucho tiempo como fuente de inspiración de cientos de chistes respecto a su fortaleza, coraje y determinación (características idénticas a las de los alumnos del grado en Ingeniería Informática en UNIR). Tal es así, que incluso existe una [base de datos oficial](https://api.chucknorris.io/) de estos chistes. Además, esta base de datos posee un API REST muy fácil de usar.

    *   A modo de anécdota, en esta [entrevista](https://youtu.be/TA_hMq-JUOE), el propio Chuck Norris recita los propios chistes efectuados, con cariño, a su costa.

<a name="31"></a>
- **Comienzo del ejercicio**
    *   Para empezar, como en todo proyecto web moderno, vamos a crear una carpeta de trabajo, por ejemplo ChistesChuck. A continuación, arrancamos el Visual Studio Code y abrimos esa carpeta. Dentro de esa carpeta, crearemos un fichero HTML para comenzar: chuck2005.html, donde empezaremos con la primera tarea.

<a name="4"></a>
- **Ejercicio No 1 (Resolución del ejercicio a la manera de 2005 "XMLHttpRequest")**

    *   El objeto [XMLHttpRequest](https://www.w3.org/TR/2012/NOTE-XMLHttpRequest1-20120117/) nos permite hacer peticiones [AJAX](https://developer.mozilla.org/en-US/docs/Web/Guide/AJAX) de manera bastante cómoda. Por ejemplo, supongamos que queremos recibir un chiste de la API REST de Chuck Norris, lo haríamos así:

    ```javascript
    let requestAjax = function () {
            xmlhttp = new XMLHttpRequest();
            xmlhttp.open('GET', 'https://api.chucknorris.io/jokes/random', true);
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState === XMLHttpRequest.DONE) {
                    if (xmlhttp.status === 0 || (xmlhttp.status >= 200 && xmlhttp.status < 400)) {
                        var textoChiste = JSON.parse(this.response).value;
                        var h1s = document.getElementsByTagName('h1');
                        h1s[0].innerHTML = textoChiste;
                    }
                }
            }
            xmlhttp.send();
        }
    ```
    *   Se pide, aplicar este script y sustituir el texto del chiste en el título central de un elemento Jumbotron del framework Bootstrap. Evidentemente, al código anterior le falta el «andamiaje» HTML.

    [![chuck2005.html](https://i.ibb.co/8xk9znS/chuck1.jpg)](https://github.com/mar2262001/chucknorris/blob/e51b03842d72f224d170a6211cf42069f5023041/chuck2005.html)
    
<a name="5"></a>
- **Ejercicio No 2 (Resolución del ejercicio a la manera de 2006 "jQuery")**
    *   A principios de 2006 nació [jQuery](https://jquery.org/) de la mano de John Resig. Todo empezó en un sencillo e inocente post en su blog. Entre otras muchas cosas increíbles, el framework jQuery incorpora una nueva instrucción $.ajax(…) muy útil.

    *   Para hacer el ejercicio como en 2006, tenemos que enlazar con la biblioteca de jQuery. Cread otro fichero, por ejemplo chuck2006.html. Nuevamente, podemos usar su [CDN](https://code.jquery.com/).

    *   Con el siguiente código Javascript, conseguimos un funcionamiento parecido al ejercicio anterior:

```javascript
    $.get("https://api.chucknorris.io/jokes/random", (response) => {
        let textoChiste = response.value;
        $('h1').text(textoChiste);
    })
```

*   Se pide, replicar el ejemplo anterior con jQuery. 

[![chuck2006.html](https://i.ibb.co/bL4vM3s/chuck2.jpg)](https://github.com/mar2262001/chucknorris/blob/e51b03842d72f224d170a6211cf42069f5023041/chuck2006.html)

*   ¿Qué diferencias ves con respecto al ejercicio anterior?
    *   La principal diferencia que veo es que ahora solo ocupamos una sola función que al mandarle un solo parámetro, esta librería jQuery nos abstrae de usar xmlhttp, y todos sus parámetros y configuración para usar la función get, esto nos ahorra varias lineas de código.
*   ¿Cómo simplifica la vida jQuery?
    *  Esta librería nos ayuda a realizar de una forma mas simplificada el seleccionar elementos del DOM, manipularlos, realizar peticiones Ajax, ademas de delegarle la responsabilidad de saber si ciertos script son compatibles con el navegador que se esta utilizando. 
*   ¿Qué ocurre si tenemos varios tags h1?
    *   El selector de JQuery que se ocupo `` $('h1')`` selecciona todos los elementos h1 del DOM, por lo cual todos los elementos h1 sufren el cambio de texto y muestran el chiste que se obtiene de la petición Ajax, para evitar este comportamiento si no es el esperado podemos usar otro tipo de selector como por id ``$('#id')``.  

<a name="6"></a>
  * **Ejercicio No 3 (Resolución con plugin de jQuery (hasta 2014))**
    *   jQuery no tardó en tener soporte para plugins (¡apenas unas semanas tras su nacimiento!).
    *   Mucha gente empezó a elaborar estos mini programas y, entre ellos, los propios gestores del ICNDB. Gracias a su plugin de jQuery, podemos acceder a su API de manera todavía más elegante.
    *   En el enlace anterior tienes acceso a un CDN listo para funcionar. Como antes, solo tenéis que usarlo para poblar el atributo src de una etiqueta script. Para extraer el texto de un norrischiste, simplemente tenéis que ejecutar:
    ```javascript
        $.icndb.getRandomJoke((response) => { var textoChiste = response.joke; });
    ```
    *   Se pide, que uséis el método ``$.icndb.getRandomJokes`` (atentos a la «s» del final) para poblar los elementos de una lista ordenada ``tag <ul></ul>``. Ejemplo:

    ```javascript
        $.icndb.getRandomJokes({ 
	        number: 10, 
  	        success: (response) => {
            response.forEach(element => { $("ul").append('<li>' + element.joke + '</li>'); });
        }});
    ```
    *   Se valorará muy positivamente el uso de una lista «estilada» con Bootstrap. Responded también a la pregunta: 
    
    *   ¿cómo se escribían las funciones en las versiones de ECMAScript previas a la versión 6?
        *   Antes se usaban la palabra reservada ``function`` la cual define una función dentro de una expresión.
            ![Image text](https://i.ibb.co/s13s1Sr/funcion.jpg "function")

    ---
    > Nota: El servicio web de chistes Chuck Norris: el ICNDB, actualmente esta fuera de servicio por lo cual no podemos ocupar el plugin de dicho servicio, para poder acércanos un poco a esta funcionalidad creamos nuestro propio [plugin](https://github.com/mar2262001/chucknorris/blob/e51b03842d72f224d170a6211cf42069f5023041/js/plugin.js) de manera local en el proyecto.
    ---
    *   La implementación del plugin es muy sencilla:
    ```javascript
        $("ul").getRandomJokes();
    ```
    *   El plugin contiene el código necesario para llenar la lista ordenada con los chistes de un categoría random.
    ```javascript
        let categories = ["animal","career","celebrity","dev","fashion","food","history","money","movie","music","political","religion","science","sport","travel"];

        let findJokersForCategory = function (ulElemet){  
            let randomIndexCategory = Math.floor(Math.random() * 14);
            let category = categories[randomIndexCategory];
            ulElemet.empty()
            $.get(`https://api.chucknorris.io/jokes/search?query=${category}`, (response) => {
                response.result.forEach(itm => { 
                    let newLi = $('<li/>', {
                        'html' : itm.value,
                        'class' : 'list-group-item',
                    });
                    ulElemet.append(newLi)
                });
            })    
        }

        $.fn.getRandomJokes = function() {
            findJokersForCategory(this);
        };
    ```
    [![chuck2014.html](https://i.ibb.co/VLnCfYg/chuck3.jpg)](https://github.com/mar2262001/chucknorris/blob/e51b03842d72f224d170a6211cf42069f5023041/chuck2014.html)

<a name="7"></a>
* **Ejercicio No 4 (Resolución en 2014 "Fetch)**
    *   A partir de finales de 2013 y predominantemente en 2014, contamos con el API fetch, que permite hacer llamadas AJAX de manera muy limpia «a la jQuery».
    *   Se pide, repetir el ejercicio anterior con esta API [fetch](https://wiki.whatwg.org/wiki/Fetch). Podéis encontrar ejemplos y descripción de esta función en la documentación de la [fundación Mozilla](https://developer.mozilla.org/es/docs/Web/API/Fetch_API).

    ```javascript
        let findJokersForCategory = function (){
            let category = document.querySelector("select").value;   
            let totalResult = document.querySelector("#result");          
            let ul = document.querySelector("ul");
            ul.innerHTML = "";
            totalResult.innerHTML = "0";
            if(category !== ""){
                fetch(`https://api.chucknorris.io/jokes/search?query=${category}`)
                .then(response => response.json())
                .then(responseJson => {
                    totalResult.innerHTML = responseJson.total;
                    responseJson.result.forEach(itm => { 
                        let newLi = document.createElement("li");
                        newLi.classList.add('list-group-item');
                        newLi.textContent = itm.value;
                        ul.appendChild(newLi);
                    });
                });
            }
        }
    ```
    [![chuck2014-1.html](https://i.ibb.co/VLnCfYg/chuck3.jpg)](https://github.com/mar2262001/chucknorris/blob/e51b03842d72f224d170a6211cf42069f5023041/chuck2014-1.html)

    *   Responde a esta pregunta: 
    *   ¿Qué es el [WHATWG](https://whatwg.org/)? (organismo que, entre otras cosas, ha definido la API del método fetch).
        *   El Web Hypertext Application Technology Working Group (WHATWG) es un organismo que fue formando por apple, mozilla y opera, es una comunidad de personas y empresas interesadas en la evolución de HTML.  

<a name="8"></a>
* **Ejercicio No 5 (nodejs node-fetch)**

    *   Se pide también repetir el mismo ejercicio con node-fetch, y simplemente imprimir por pantalla el texto de cada chiste.
    ```javascript
        const fetch = require('node-fetch');
        const categories = ["animal","career","celebrity","dev","fashion","food","history","money","movie","music","political","religion","science","sport","travel"];

        let randomIndexCategory = Math.floor(Math.random() * 14);
        let category = categories[randomIndexCategory];

        fetch(`https://api.chucknorris.io/jokes/search?query=${category}`)
        .then(response => response.json())
        .then(jsonResponse => {
            jsonResponse.result.forEach(itm => { 
            console.log(itm.value);
            });   
        });
    ```

    *   Instalación de node-fetch
    [![chuckNorrisNodeFetch.js](https://i.ibb.co/RvH3BYq/install-node-fetch.jpg)](https://github.com/mar2262001/chucknorris/blob/e51b03842d72f224d170a6211cf42069f5023041/chuckNorrisNodeFetch.js)
    *  Resultado en consola
    [![console](https://i.ibb.co/DWBZjdS/node-fetch.jpg)]

<a name="9"></a>
* **Ejercicio No 6 (Web Components)**
    *   Y por fin llegamos a la forma de resolver este ejercicio de la manera más elegante posible: con Web Components. Vamos a usar el componente descrito aquí. Para instalarlo, se recomienda usar Bower:

        bower install chuck-norris-joke --save

        Aunque, como se indica en el enunciado, podemos usar un CDN en este caso no tenemos un CDN para este web component, pero podemos utilizar Github a modo de tal, como explicamos más abajo.

        Este módulo no se trata de un script de Javascript o un CSS a la antigua usanza, sino de un web component moderno. Para usarlo, se necesita la nueva directiva import definida en las últimas especificaciones del [W3C](https://www.w3.org/TR/html-imports/). En caso de haberlo instalado mediante Bower, escribiríamos esta línea en nuestra página:

        ``<link rel="import" href="bower_components/chuck-norris-joke/chuck-norris-joke.html">``

        Y en caso de usar Github como CDN, escribiríamos esta:

        ``<link rel="import" href="https://raw.githubusercontent.com/erikringsmuth/chuck-norris-joke/master/chuck-norris-joke.html">``

        Ahora, si queremos un chiste de Chuck Norris, solo tenemos que incluir este tag en el fichero HTML:

        ``<chuck-norris-joke></chuck-norris-joke>``

        Si hemos instalado el componente de manera local (con Bower, como se recomienda) ya no podemos abrir la página directamente y ver los resultados: ha de «ser servida» con un servidor web. Os recomiendo que uséis [http-server](https://www.npmjs.com/package/http-server) basado en NodeJS y fácilmente instalable con NPM. Simplemente tenéis que ejecutar el comando http-server en el directorio de trabajo y listo. Por cierto, también es necesario, de momento, el uso de Chrome u Opera para ver el resultado. Algunos navegadores todavía no soportan los web components, pero es cuestión de (poco) tiempo.

        Se pide, crear una página web con una tabla en la que cada fila sea un chiste de Chuck Norris. La tabla ha de estar estilada con otro framework distinto a Bootstrap, por ejemplo [Skeleton](http://getskeleton.com/).
        Instalad Skeleton con Bower:

        ``bower install skeleton-framework --save``

        También podéis usar un CDN de Skeleton u otro framework CSS de vuestro gusto. El objetivo es que os encontréis cómodos enlazando CSS en vuestros proyectos. Aquí tenéis ejemplos de tablas con [Skeleton]( http://getskeleton.com/#tables)

---
    >   Nota: El servicio web de chistes Chuck Norris: el ICNDB, actualmente esta fuera de servicio por lo cual no podemos ocupar el web components de dicho servicio, para poder acércanos un poco a esta funcionalidad creamos nuestro propio [componente](https://github.com/mar2262001/chucknorris/blob/e51b03842d72f224d170a6211cf42069f5023041/js/chuck-norris-joke.js) de manera local en el proyecto ademas decidi utilizar Materialize en vez de skeleton.
---

*   Ciclo de vida de web component

    ![Image text](https://i.ibb.co/jGDHkwQ/Ciclo-de-vida.jpg "lifeCycle")

    *   constructor(): Siempre empieza llamando a super() de forma que se establezca correctamente el encadenado del prototipo. Dentro del constructor, debemos definir toda la funcionalidad que tendrá el elemento cuando se instancie.

    *   connectedCallback(): Se invoca cada vez que se añade un Web Component al DOM.

    *   disconnectedCallback(): Se invoca cada vez que el Web Component se desconecta del DOM.

    *   adoptedCallback(): Se invoca cada vez que el elemento se mueve a un nuevo DOM. Este caso es muy particular y generalmente solo tiene lugar cuando se trata de elementos ``<iframe>``, ya que cada iframe tiene su propio DOM. Esta función se lanza automáticamente cuando se ejecuta la función de adoptNode().

    *   attributeChangedCallback(): Se invoca cada vez que los atributos del elemento son modificados (añadidos, editados o eliminados). Los atributos que quieran ser monitorizados deberán estar previamente especificados a través del método estático observedAttributes().

```javascript
    class ChuckNorrisJoke extends HTMLElement {
    
        constructor() {
            super();
            this.shadowDOM = this.attachShadow({mode: 'open'});
        }

        disconnectedCallback() {
            this.remove();
        }

        connectedCallback() {
            this.mapComponentAttributes();
            this.render();
            this.initComponent();

            fetch(`https://api.chucknorris.io/jokes/random`)
                .then(response => response.json())
                .then(responseJson => {
                    this.$tag.querySelector('span').textContent = responseJson.value;
            });

            this.$table.appendChild(this.$tag);
        }

        render() {
            this.shadowDOM.innerHTML = `
                ${this.template()}
            `;
        }

        initComponent() {
            this.$tag = this.shadowDOM.querySelector('.tag');
            this.$table = document.querySelector('.row');
        }

        template() {
            return `
                <div class="tag col s12 card-panel teal lighten-2">
                    <span class="card-title" id="${this.attributes.id.value}"></span>
                </div>
            `;
        }

        mapComponentAttributes() {
            const attributesMapping = [
                'id',
            ];
            attributesMapping.forEach(key => {
                if (!this.attributes[key]) {
                    this.attributes[key] = {value: ''};
                }
            });
        }
    }

    export default ChuckNorrisJoke;
```

*   Instalacion de http-server

![http-server](https://i.ibb.co/gdqcRtF/install-http-server-nodejs.jpg "lifeCycle")

*   Instalacion de http-server

![chuckNorrisNodeFetch.js](https://i.ibb.co/ZxjfPpp/web-component.jpg)
[![chuckNorrisNodeFetch.js](https://i.ibb.co/Wf7GNVr/web-Component-Result.jpg)](https://github.com/mar2262001/chucknorris/blob/e51b03842d72f224d170a6211cf42069f5023041/chuckWebComponent.html)

<a name="10"></a>
* **Link del proyecto**

    * [github.com](https://github.com/mar2262001/chucknorris)

<a name="11"></a>
* **Referencias**

    *   [web components](https://www.paradigmadigital.com/dev/crea-tus-primeros-web-components/)
    *   [ajax](https://developer.mozilla.org/en-US/docs/Web/Guide/AJAX)
    *   [Chuck Norris](https://chucknorris.com/)
    *   [base de datos oficial](https://api.chucknorris.io/)
    *   [XMLHttpRequest](https://www.w3.org/TR/2012/NOTE-XMLHttpRequest1-20120117/)
    *   [jQuery](https://jquery.org/)
    *   [CDN](https://code.jquery.com/)
    *   [fetch](https://wiki.whatwg.org/wiki/Fetch)
    *   [fundación Mozilla](https://developer.mozilla.org/es/docs/Web/API/Fetch_API).
    *   [WHATWG](https://whatwg.org/)
    *   [W3C](https://www.w3.org/TR/html-imports/)
    *   [http-server](https://www.npmjs.com/package/http-server)
    *   [Skeleton](http://getskeleton.com/)
    *   [materialize](https://materializecss.com/)

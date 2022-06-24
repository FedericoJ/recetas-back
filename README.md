# recetas-back - Introducción
Con el objetivo de desarrollar un backend con microservicios para la app Recetas, en este archivo estaremos listando cada uno de ellos, indicando sus entradas y salidas.

Para que esto funcione, es necesario poder conectarse a la base en Heroku indicada en el config.js.

Para iniciar este proyecto, se deben correr los comandos:
1) **npm install**
2) **npm start**

# Favoritos
## Obtener Favoritos por Usuario

* **URL**

  http://localhost:3000/receta/getFavorito

* **Metodo:**

  `GET`
  
*  **URL Parametros**

      ```
    {
        "idUsuario": "[Integer]"
    }
    ```

* **Respuesta Exitosa:**

  * **Codigo:** 201 <br />
  * **Contenido:** 
    ```json
    {
        "IdReceta": 2,
        "IdUsuario": 10,
        "alias": "mrv",
        "Nombre": "Budin marmolado",
        "Descripcion": "Budin marmolado bien esponjoso",
        "foto": "https://img-global.cpcdn.com/recipes/796ec38d64c576de/680x482cq70/budin-marmolado-foto-principal.webp",
        "Porciones": 16,
        "CantidadPersonas": 8,
        "IdTipo": 1,
        "DescTipo": "Budines",
        "CalificacionProm": "3.0",
        "FecAlta": "2022-04-30T03:00:00.000Z",
        "SnAutorizada": "N"
    }

* **Respuesta No Exitosa:**

  * **Codigo:** 404 NOT FOUND <br />
  * **Contenido:** `Cannot ERROR`
  

## Agregar a Favoritos

* **URL**

  http://localhost:3000/receta/cargarFavorito

* **Metodo:**

  `POST`

* **Data Params**: JSON

   ```json
   {
       "idUsuario": "[Integer]",
       "idReceta": "[Integer]"
   }

* **Respuesta Exitosa:**

  * **Codigo:** 201 <br />
  * **Contenido:** 
    ```json
      {
      "code": 201,
      "message": "Favorito guardado correctamente"
    }

* **Respuesta No Exitosa:**

  * **Codigo:** 404 NOT FOUND <br />
  * **Contenido:** `Cannot ERROR`

## Eliminar Favorito

* **URL**

  http://localhost:3000/receta/eliminarFavorito

* **Metodo:**

  `POST`

* **Data Params**: JSON

   ```json
   {
       "idUsuario": "[Integer]",
       "idReceta": "[Integer]"
   }

* **Respuesta Exitosa:**

  * **Codigo:** 201 <br />
  * **Contenido:** 
    ```json
      {
        "code": 201,
        "message": "Favorito eliminado correctamente"
      }

* **Respuesta No Exitosa:**

  * **Codigo:** 404 NOT FOUND <br />
  * **Contenido:** `Cannot ERROR`


## Es Favorito por Usuario/Receta

* **URL**

  http://localhost:3000/receta/isFavorito

* **Metodo:**

  `GET`
  
*  **URL Parametros**

      ```
    {
        "idUsuario": "[Integer]",
        "idReceta": "[Integer]"
    }
    ```

* **Respuesta Exitosa:**

  * **Codigo:** 201 <br />
  * **Contenido:** 
    ```json
    {
      1
    }
    ```

  * **Codigo:** 202 <br />
  * **Contenido:** 
    ```json
    {
      2
    }
    ```

* **Respuesta No Exitosa:**

  * **Codigo:** 404 NOT FOUND <br />
  * **Contenido:** `Cannot ERROR`



# Ingredientes
## Guardar Multimedia de un paso de la receta

* **URL**

  http://localhost:3000/ingredientes/guardarMultimedia

* **Metodo:**

  `POST`
  
*  **URL Parametros**

   None

*  **Data Params**

   **Requeridos:**
 
   ```json
    {
        "idPaso": "[Integer]",
        "tipo_Contenido": "[String]",
        "extension": "[String]",
        "url": "[String]"
    }
    ```

* **Respuesta Exitosa:**

  * **Codigo:** 201 <br />
  * **Contenido:** 
    ```json
      {
        "code": 201,
        "message": "Multimedia guardada correctamente"
      }
    ```

* **Respuesta No Exitosa:**

  * **Codigo:** 404 NOT FOUND <br />
  * **Contenido:** `Cannot POST`


## Obtener multimedia de un paso de la receta
* **URL**

  http://localhost:3000/ingredientes/getMultimedia

* **Metodo:**

  `GET`
  
*  **URL Parametros**

      ```
    {
      "idReceta": "[Integer]"
    }
    ```

* **Respuesta Exitosa:**

  * **Codigo:** 200 <br />
  * **Contenido:** 
    ```json
    {
        "code": 201,
        "message": [
          {
            "tipo_contenido": "foto",
            "urlContenido": "https://thumbs.dreamstime.com/b/huevos-y-az%C3%BAcar-en-bol-grande-71426369.jpg",
            "idPaso": 64,
            "extension": "jpg"
          },
          {
            "tipo_contenido": "foto",
            "urlContenido": "https://img.freepik.com/foto-gratis/proceso-elaboracion-masa-tarta-chocolate-mezclar-cacao-polvo-recipiente-metal-masa-mesa-cocina-vista-superior_518173-856.jpg?w=2000",
            "idPaso": 84,
            "extension": "jpg"
          }
        ]
    }

* **Respuesta No Exitosa:**

  * **Codigo:** 404 NOT FOUND <br />
  * **Contenido:** `Cannot ERROR`


## Buscar Ingrediente
* **URL**

  http://localhost:3000/ingredientes/getIngredientes

* **Metodo:**

  `GET`

*  **Data Params**

   **Requeridos:**
 
   ```json
    {
        "descripcion": "[String]"
    }
    ```

* **Respuesta Exitosa:**

  * **Codigo:** 201 <br />
  * **Contenido:** 
    ```json
    {
        "code": 201,
        "multimedia": [
            {
                "nombre": "Aceite"
            }
        ]
    }

* **Respuesta No Exitosa:**

  * **Codigo:** 404 NOT FOUND <br />
  * **Contenido:** `Cannot ERROR`

## Crear Ingrediente

* **URL**

  http://localhost:3000/ingredientes/postIngredientes

* **Metodo:**

  `POST`

*  **Data Params**

   **Requeridos:**
 
   ```json
    {
        "nombre": "[String]"
    }
    ```

* **Respuesta Exitosa:**

  * **Codigo:** 201 <br />
  * **Contenido:** 
    ```json
    {
        "code": 201,
        "message": "Ingrediente creado correctamente"
    }
    ```

* **Respuesta No Exitosa:**

  * **Codigo:** 404 NOT FOUND <br />
  * **Contenido:** `Cannot POST`


## Cargar Ingrediente utilizado en una receta

* **URL**

  http://localhost:3000/ingredientes/postIngredienteUtilizadoPorReceta

* **Metodo:**

  `POST`

*  **Data Params**

   **Requeridos:**
 
   ```json
    {
        "idReceta": "[Integer]",
        "idIngrediente": "[Integer]",
        "cantidad": "[Integer]",
        "idUnidad": "[Integer]",
        "Observaciones": "[String]"
    }
    ```

* **Respuesta Exitosa:**

  * **Codigo:** 201 <br />
  * **Contenido:** 
    ```json
    {
        "code": 201,
        "message": "Ingrediente utilizado guardado correctamente"
    }
    ```

* **Respuesta No Exitosa:**

  * **Codigo:** 404 NOT FOUND <br />
  * **Contenido:** `Cannot POST`


## Obtener ingredientes de una receta
* **URL**

  http://localhost:3000/ingredientes/getIngredienteUtilizadoPorReceta

* **Metodo:**

  `GET`
  
*  **URL Parametros**

  ```
  {
      "idReceta": "[Integer]"
  }
  ```

* **Respuesta Exitosa:**

  * **Codigo:** 201 <br />
  * **Contenido:** 
    ```json
    {
        "code": 201,
        "multimedia": [
            {
                "nombre": "Leche",
                "cantidad": 100,
                "descripcion": "g",
                "IdUnidad": 1,
                "idReceta": 6
            },
            {
                "nombre": "Leche",
                "cantidad": 100,
                "descripcion": "g",
                "IdUnidad": 1,
                "idReceta": 6
            }
        ]
    }

* **Respuesta No Exitosa:**

  * **Codigo:** 404 NOT FOUND <br />
  * **Contenido:** `Cannot ERROR`

## Obtener Tipos de receta
* **URL**

  http://localhost:3000/ingredientes/getTiposreceta

* **Metodo:**

  `GET`
  
*  **URL Parametros**

   None

* **Respuesta Exitosa:**

  * **Codigo:** 201 <br />
  * **Contenido:** 
    ```json
    {
        "code": 201,
        "multimedia": [
            {
                "idTipo": 1,
                "descripcion": "Budines"
            },
            {
                "idTipo": 2,
                "descripcion": "Tortas"
            },
            {
                "idTipo": 3,
                "descripcion": "Pastas"
            },
            {
                "idTipo": 4,
                "descripcion": "Scones/Libritos"
            }
        ]
    }

* **Respuesta No Exitosa:**

  * **Codigo:** 404 NOT FOUND <br />
  * **Contenido:** `Cannot ERROR`

## Obtener Factores de Conversión
* **URL**

  http://localhost:3000/ingredientes/getFactorConversion

* **Metodo:**

  `GET`
  
*  **URL Parametros**

    ```
    {
      "idOrigen": "[Integer]",
      "idDestino": "[Integer]"
    }
    ```

* **Respuesta Exitosa:**

  * **Codigo:** 200 <br />
  * **Contenido:** 
    ```json
    {
      "conversion": 0.001
    }

* **Respuesta No Exitosa:**

  * **Codigo:** 404 NOT FOUND <br />
  * **Contenido:** `Cannot ERROR`

## Obtener unidades
* **URL**

  http://localhost:3000/ingredientes/getUnidades

* **Metodo:**

  `GET`
  
*  **URL Parametros**

   None

* **Respuesta Exitosa:**

  * **Codigo:** 201 <br />
  * **Contenido:** 
    ```json
    [
      {
          "label": "gr",
          "value": 1
      },
      {
          "label": "kg",
          "value": 2
      },
      {
          "label": "l",
          "value": 3
      },
      {
          "label": "ml",
          "value": 4
      },
      {
          "label": "cc",
          "value": 5
      },
      {
          "label": "cm3",
          "value": 6
      },
      {
          "label": "Cuch.",
          "value": 7
      },
      {
          "label": "Uni",
          "value": 8
      }
    ]
    ```

* **Respuesta No Exitosa:**

  * **Codigo:** 404 NOT FOUND <br />
  * **Contenido:** `Cannot ERROR`



# Receta
## Obtener Receta por ID
* **URL**

  http://localhost:3000/receta/recetaPorId

* **Metodo:**

  `GET`

*  **Data Params**

   **Requeridos:**
 
    ```json
    {
        "idReceta": "[Integer]"
    }
    ```

* **Respuesta Exitosa:**

  * **Codigo:** 201 <br />
  * **Contenido:** 
    ```json
    {
      "code": 201,
        "receta": [
            {
                "IdReceta": 7,
                "IdUsuario": 11,
                "nombre": "Libritos de grasa",
                "Descripcion": "Libritos caseros",
                "foto": "Libritos.jpg",
                "porciones": 10,
                "CantidadPersonas": 5,
                "IdTipo": 4,
                "DescripcionTipo": "Scones/Libritos",
                "FecAlta": "2022-04-30T03:00:00.000Z",
                "SnAutorizada": "S",
                "avg (C.calificacion)": "4.0000"
            }
        ]
    }

* **Respuesta No Exitosa:**

  * **Codigo:** 404 NOT FOUND <br />
  * **Contenido:** `Cannot ERROR`

## Home Principal - Mejores Recetas
* **URL**

  http://localhost:3000/receta/recetasSemana

* **Metodo:**

  `GET`
  
*  **URL Parametros**

   None

* **Respuesta Exitosa:**

  * **Codigo:** 201 <br />
  * **Contenido:** 
    ```json
    {
      "code": 201,
        "receta": [
            {
                "IdReceta": 6,
                "Nombre": "Scones de Queso",
                "Descripcion": "Scones de queso tipo Starbucks para merendar!",
                "foto": "Scon.jpg",
                "CalificacionProm": "4.0000"
            },
            {
                "IdReceta": 7,
                "Nombre": "Libritos de grasa",
                "Descripcion": "Libritos caseros",
                "foto": "Libritos.jpg",
                "CalificacionProm": "4.0000"
            },
            {
                "IdReceta": 4,
                "Nombre": "Biscochuelo marmolado",
                "Descripcion": "Biscochuelo marmolado casero",
                "foto": "BiscochoMarmolado.jpg",
                "CalificacionProm": "3.5000"
            },
            {
                "IdReceta": 2,
                "Nombre": "Budin marmolado",
                "Descripcion": "Budin marmolado bien esponjoso",
                "foto": "Budin.jpg",
                "CalificacionProm": "3.0000"
            },
            {
                "IdReceta": 5,
                "Nombre": "Fideos matarazzo",
                "Descripcion": "Fideos matarazzo con salsa",
                "foto": "MataFideos.jpg",
                "CalificacionProm": "2.5000"
            }
        ]
    }

* **Respuesta No Exitosa:**

  * **Codigo:** 404 NOT FOUND <br />
  * **Contenido:** `Cannot ERROR`

## Crear Receta

* **URL**

  http://localhost:3000/receta/postReceta

* **Metodo:**

  `POST`

*  **Data Params**

   **Requeridos:**
 
   ```json
    {
        "idUsuario": "[Integer]",
        "nombre": "[String]",
        "descripcion": "[String]",
        "foto": "[String]",
        "porciones": "[Integer]",
        "cantidadPersonas":"[Integer]",
        "idTipo":"[Integer]",
        "fecAlta":"[Date]"
    }
    ```

* **Respuesta Exitosa:**

  * **Codigo:** 201 <br />
  * **Contenido:** 
    ```json
    "result": {
        "code": 201,
        "message": "Receta creada correctamente"
    }
    ```

* **Respuesta No Exitosa:**

  * **Codigo:** 404 NOT FOUND <br />
  * **Contenido:** `Cannot POST`


## Guardar Foto Receta

* **URL**

  http://localhost:3000/receta/guardarFoto

* **Metodo:**

  `POST`

*  **Data Params**

   **Requeridos:**
 
   ```json
    {
        "idReceta": "[Integer]",
        "url": "[String]",
        "extension": "[String]"
    }
    ```

* **Respuesta Exitosa:**

  * **Codigo:** 201 <br />
  * **Contenido:** 
    ```json
    "result": {
      "code": 201,
      "message": "Foto guardada correctamente"
    }
    ```

* **Respuesta No Exitosa:**

  * **Codigo:** 404 NOT FOUND <br />
  * **Contenido:** `Cannot POST`


## Obtener Fotos de una Receta
* **URL**

  http://localhost:3000/receta/getFoto

* **Metodo:**

  `GET`

*  **Data Params**

   **Requeridos:**
 
    ```json
    {
      "idReceta": "[Integer]"
    }
    ```

* **Respuesta Exitosa:**

  * **Codigo:** 201 <br />
  * **Contenido:** 
    ```json
    {
      "code": 201,
        "foto": [
            {
                "idReceta": 7,
                "urlFoto": "http://www.google.com/fotito13",
                "extension": ".jpg"
            },
            {
                "idReceta": 7,
                "urlFoto": "http://www.google.com/fotito14",
                "extension": ".jpg"
            },
            {
                "idReceta": 7,
                "urlFoto": "http://www.google.com/fotito15",
                "extension": ".jpg"
            }
        ]
    }

* **Respuesta No Exitosa:**

  * **Codigo:** 404 NOT FOUND <br />
  * **Contenido:** `Cannot ERROR`


## Crear Paso

* **URL**

  http://localhost:3000/receta/postPaso

* **Metodo:**

  `POST`

*  **Data Params**

   **Requeridos:**
 
   ```json
   [
      {
        "idReceta": "[Integer]" , 
        "nroPaso": "[Integer]",
        "texto": "[String]"
      },
       {
        "idReceta": "[Integer]" , 
        "nroPaso": "[Integer]",
        "texto": "[String]"
      },
    ]

    ```

* **Respuesta Exitosa:**

  * **Codigo:** 201 <br />
  * **Contenido:** 
    ```json
    {
      "code": 201,
      "message": "Pasos guardado correctamente"
    }
    ```

* **Respuesta No Exitosa:**

  * **Codigo:** 404 NOT FOUND <br />
  * **Contenido:** `Cannot POST`


## Obtener Pasos por IdReceta
* **URL**

  http://localhost:3000/receta/getPasos

* **Metodo:**

  `GET`
  
*  **URL Parametros**

    ```
    {
      "idReceta": "[Integer]"
    }
    ```

* **Respuesta Exitosa:**

  * **Codigo:** 201 <br />
  * **Contenido:** 
    ```json
    {
      [
        {
            "idPaso": 234,
            "idReceta": 7,
            "nroPaso": 1,
            "texto": "Formar un arenado con la manteca fria y la harina."
        },
        {
            "idPaso": 244,
            "idReceta": 7,
            "nroPaso": 2,
            "texto": "Agregar el resto hasta formar una masa"
        },
        {
            "idPaso": 254,
            "idReceta": 7,
            "nroPaso": 3,
            "texto": "Estrirar, doblar 3 veces y cortar en cuadrados"
        }
      ]
    }

* **Respuesta No Exitosa:**

  * **Codigo:** 404 NOT FOUND <br />
  * **Contenido:** `Cannot ERROR`


## Obtener Pasos de un Usuario
* **URL**

  http://localhost:3000/receta/recetaPorUsuario

* **Metodo:**

  `GET`
  
*  **URL Parametros**

    ```
    {
      "nombre": "[String]",
      "order": "[String]"
    }
    ```

* **Respuesta Exitosa:**

  * **Codigo:** 201 <br />
  * **Contenido:** 
    ```json
    {
        "code": 201,
        "message": [
                {
              "IdReceta": 1,
              "IdUsuario": 10,
              "alias": "mrv",
              "Nombre": "Budin naranja",
              "Descripcion": "Budin de naranja con semillas de amapola",
              "foto": "https://www.clarin.com/img/2019/07/23/bs56zWpBq_1256x620__2.jpg#1591385524188",
              "Porciones": 8,
              "CantidadPersonas": 4,
              "IdTipo": 1,
              "DescTipo": "Budines",
              "CalificacionProm": "3.5",
              "FecAlta": "2022-04-30T03:00:00.000Z",
              "SnAutorizada": "S"
          },
          {
              "IdReceta": 2,
              "IdUsuario": 10,
              "alias": "mrv",
              "Nombre": "Budin marmolado",
              "Descripcion": "Budin marmolado bien esponjoso",
              "foto": "https://img-global.cpcdn.com/recipes/796ec38d64c576de/680x482cq70/budin-marmolado-foto-principal.webp",
              "Porciones": 16,
              "CantidadPersonas": 8,
              "IdTipo": 1,
              "DescTipo": "Budines",
              "CalificacionProm": "3.0",
              "FecAlta": "2022-04-30T03:00:00.000Z",
              "SnAutorizada": "N"
          }
        ]
    }

* **Respuesta No Exitosa:**

  * **Codigo:** 404 NOT FOUND <br />
  * **Contenido:** `Cannot ERROR`


## Calificar una Receta

* **URL**

  http://localhost:3000/receta/valorarReceta

* **Metodo:**

  `POST`

*  **Data Params**

   **Requeridos:**
 
   ```json
    {
        "idUsuario": "[Integer]",
        "idReceta": "[Integer]",
        "calificacion": "[Integer]",
        "comentarios": "[String]"
    }
    ```

* **Respuesta Exitosa:**

  * **Codigo:** 201 <br />
  * **Contenido:** 
    ```json
    {
      "code": 201,
      "message": "Valoracion creada correctamente"
    }
    ```

* **Respuesta No Exitosa:**

  * **Codigo:** 404 NOT FOUND <br />
  * **Contenido:** `Cannot POST`


## Obtener Recetas por Nombre
* **URL**

  http://localhost:3000/receta/RecetaPorNombre

* **Metodo:**

  `GET`
  
*  **URL Parametros**

    ```json
    {
        "nombre": "[String]",
        "order": "[String]"
    }
    ```

* **Respuesta Exitosa:**

  * **Codigo:** 201 <br />
  * **Contenido:** 
    ```json
    {
        "code": 201,
        "receta": [
            {
              "IdReceta": 6,
              "IdUsuario": 11,
              "alias": "TPAD",
              "Nombre": "Scones de Queso",
              "Descripcion": "Scones de queso tipo Starbucks para merendar!",
              "foto": "https://cuk-it.com/wp-content/uploads/2020/08/thumb02-3-1024x576.jpg",
              "Porciones": 12,
              "CantidadPersonas": 6,
              "IdTipo": 4,
              "DescTipo": "Libritos",
              "CalificacionProm": "3.2",
              "FecAlta": "2022-04-30T03:00:00.000Z",
              "SnAutorizada": "S"
            }
        ]
    }

* **Respuesta No Exitosa:**

  * **Codigo:** 404 NOT FOUND <br />
  * **Contenido:** `Cannot ERROR`


  ## Eliminar Receta

* **URL**

  http://localhost:3000/receta/eliminarReceta

* **Metodo:**

  `DEL`

*  **Data Params**

   **Requeridos:**
 
   ```json
    {
        "nombre": "[String]",
        "idUsaurio": "[Integer]"
    }
    ```

* **Respuesta Exitosa:**

  * **Codigo:** 200 <br />
  * **Contenido:** 
    ```json
    {
      "status": 200,
      "message": "La receta ha sido eliminada exitosamente"
    }
    ```

* **Respuesta No Exitosa:**

  * **Codigo:** 404 NOT FOUND <br />
  * **Contenido:** `Cannot ERROR`



## Obtener recetas buscando que tenga un ingrediente
* **URL**

  http://localhost:3000/receta/recetaPorIngrediente

* **Metodo:**

  `GET`
  
*  **URL Parametros**
 
    ```
    {
      "nombre": "[String]",
      "order": "[String]"
    }
    ```

* **Respuesta Exitosa:**

  * **Codigo:** 201 <br />
  * **Contenido:** 
    ```json
    {
        "code": 201,
        "receta": [
            {
              "IdReceta": 6,
              "IdUsuario": 11,
              "alias": "TPAD",
              "Nombre": "Scones de Queso",
              "Descripcion": "Scones de queso tipo Starbucks para merendar!",
              "foto": "https://cuk-it.com/wp-content/uploads/2020/08/thumb02-3-1024x576.jpg",
              "Porciones": 12,
              "CantidadPersonas": 6,
              "IdTipo": 4,
              "DescTipo": "Libritos",
              "CalificacionProm": "3.2",
              "FecAlta": "2022-04-30T03:00:00.000Z",
              "SnAutorizada": "S"
            }
        ]
    }

* **Respuesta No Exitosa:**

  * **Codigo:** 404 NOT FOUND <br />
  * **Contenido:** `Cannot ERROR`


## Obtener recetas buscando que no tenga un ingrediente
* **URL**

  http://localhost:3000/receta/recetaSinIngrediente

* **Metodo:**

  `GET`
  
*  **URL Parametros**

    ```
    {
       "nombre": "[String]",
       "order": "[String]"
    }
    ```

* **Respuesta Exitosa:**

  * **Codigo:** 201 <br />
  * **Contenido:** 
    ```json
    {
        "code": 201,
        "message": [
          {
              "IdReceta": 3,
              "IdUsuario": 10,
              "alias": "mrv",
              "Nombre": "Bizcochuelo",
              "Descripcion": "Biscochuelo de vainilla casero",
              "foto": "https://www.cocinayvino.com/wp-content/uploads/2016/10/26825511_ml-e1476236596579.jpg",
              "Porciones": 16,
              "CantidadPersonas": 8,
              "IdTipo": 2,
              "DescTipo": "Tortas",
              "CalificacionProm": "2.0",
              "FecAlta": "2022-04-30T03:00:00.000Z",
              "SnAutorizada": "S"
          },
          {
              "IdReceta": 4,
              "IdUsuario": 11,
              "alias": "TPAD",
              "Nombre": "Bizcochuelo marmolado",
              "Descripcion": "Biscochuelo marmolado casero",
              "foto": "https://img-global.cpcdn.com/recipes/395808cb8b124c10/680x482cq70/bizcochuelo-marmolado-foto-principal.webp",
              "Porciones": 16,
              "CantidadPersonas": 8,
              "IdTipo": 2,
              "DescTipo": "Tortas",
              "CalificacionProm": "3.5",
              "FecAlta": "2022-04-30T03:00:00.000Z",
              "SnAutorizada": "S"
          }
      ]
    }

* **Respuesta No Exitosa:**

  * **Codigo:** 404 NOT FOUND <br />
  * **Contenido:** `Cannot ERROR`


## Obtener recetas por IdTipo
* **URL**

  http://localhost:3000/receta/recetaPorTipo

* **Metodo:**

  `GET`

*  **Data Params**

   **Requeridos:**
 
    ```json
    {
      "nombre": "[Integer]"
    }
    ```

* **Respuesta Exitosa:**

  * **Codigo:** 201 <br />
  * **Contenido:** 
    ```json
    {
       "code": 201,
        "message": [
                    {
                        "IdReceta": 3,
                        "idUsuario": 10,
                        "alias": "mrv",
                        "Nombre": "Bizcochuelo",
                        "Descripcion": "Biscochuelo de vainilla casero",
                        "foto": "https://www.cocinayvino.com/wp-content/uploads/2016/10/26825511_ml-e1476236596579.jpg",
                        "Porciones": 16,
                        "CantidadPersonas": 8,
                        "idTipo": 2,
                        "descTipo": "Tortas",
                        "fecAlta": "2022-04-30T03:00:00.000Z",
                        "SnAutorizada": "S",
                        "CalificacionProm": "2.0"
                    },
                    {
                        "IdReceta": 4,
                        "idUsuario": 11,
                        "alias": "TPAD",
                        "Nombre": "Bizcochuelo marmolado",
                        "Descripcion": "Biscochuelo marmolado casero",
                        "foto": "https://img-global.cpcdn.com/recipes/395808cb8b124c10/680x482cq70/bizcochuelo-marmolado-foto-principal.webp",
                        "Porciones": 16,
                        "CantidadPersonas": 8,
                        "idTipo": 2,
                        "descTipo": "Tortas",
                        "fecAlta": "2022-04-30T03:00:00.000Z",
                        "SnAutorizada": "S",
                        "CalificacionProm": "3.5"
                    }
                ]
    }

* **Respuesta No Exitosa:**

  * **Codigo:** 404 NOT FOUND <br />
  * **Contenido:** `Cannot ERROR`


## Obtener recetas por Descripcion Tipo
* **URL**

  http://localhost:3000/receta/RecetaPorNombreTipo

* **Metodo:**

  `GET`
  
*  **URL Parametros**

    ```
    {
      "nombre": "[String]",
      "order": "[String]"
    }
    ```

* **Respuesta Exitosa:**

  * **Codigo:** 201 <br />
  * **Contenido:** 
    ```json
    {
       "code": 201,
        "message": [
                    {
                        "idReceta": 1,
                        "idUsuario": 10,
                        "alias": "mrv",
                        "Nombre": "Budin naranja",
                        "Descripcion": "Budin de naranja con semillas de amapola",
                        "foto": "https://www.clarin.com/img/2019/07/23/bs56zWpBq_1256x620__2.jpg#1591385524188",
                        "porciones": 8,
                        "cantidadPersonas": 4,
                        "idTipo": 1,
                        "descTipo": "Budines",
                        "fecAlta": "2022-04-30T03:00:00.000Z",
                        "SnAutorizada": "S",
                        "CalificacionProm": "3.5"
                    }
                ]
    }

* **Respuesta No Exitosa:**

  * **Codigo:** 404 NOT FOUND <br />
  * **Contenido:** `Cannot ERROR`


## Obtener recetas por Usuario y nombre de receta
* **URL**

  http://localhost:3000/receta/buscarRecetaPorUsuarioyNombre

* **Metodo:**

  `GET`

*  **Data Params**

   **Requeridos:**
 
    ```json
    {
      "nombre": "[String]",
      "idUSuario": "[Integer]"
    }
    ```

* **Respuesta Exitosa:**

  * **Codigo:** 201 <br />
  * **Contenido:** 
    ```json
    {
       "code": 201,
        "receta": [
            {
                "idReceta": 8
            },
            {
                "idReceta": 9
            },
            {
                "idReceta": 10
            }
        ]
    }

* **Respuesta No Exitosa:**

  * **Codigo:** 404 NOT FOUND <br />
  * **Contenido:** `Cannot ERROR`


## Obtener valoraciones de una receta
* **URL**

  http://localhost:3000/receta/getValoracionesByReceta

* **Metodo:**

  `GET`
  
*  **URL Parametros**

    ```
    {
      "idReceta": "[Integer]"
    }
    ```

* **Respuesta Exitosa:**

  * **Codigo:** 201 <br />
  * **Contenido:** 
    ```json
    {
       "code": 201,
        "receta": [
            {
                "idUsuario": 10,
                "nickname": "mrv",
                "comentarios": "Muy buena receta! Pero tiene sus cositas a mejorar!",
                "calificacion": 4,
                "idReceta": 2
            },
            {
                "idUsuario": 11,
                "nickname": "TPAD",
                "comentarios": "Nunca mas",
                "calificacion": 2,
                "idReceta": 2
            }
        ]
    }

* **Respuesta No Exitosa:**

  * **Codigo:** 404 NOT FOUND <br />
  * **Contenido:** `Cannot ERROR`



## Obtener valoracion promedio de una receta
* **URL**

  http://localhost:3000/receta/getValoracionPromedio

* **Metodo:**

  `GET`
  
*  **URL Parametros**

    ```
    {
      "idReceta": "[Integer]"
    }
    ```

* **Respuesta Exitosa:**

  * **Codigo:** 201 <br />
  * **Contenido:** 
    ```json
    {
        "code": 201,
        "receta": [
            {
                "PromedioCalificacion": "3.0000"
            }
        ]
    }

* **Respuesta No Exitosa:**

  * **Codigo:** 404 NOT FOUND <br />
  * **Contenido:** `Cannot ERROR`



# Usuarios

## Buscar Usuario
* **URL**

  http://localhost:3000/usuario/getUsuario

* **Metodo:**

  `GET`

*  **Data Params**

   **Requeridos:**
 
    ```json
    {
      "idUsuario": "[Integer]"
    }
    ```

* **Respuesta Exitosa:**

  * **Codigo:** 201 <br />
  * **Contenido:** 
    ```json
    {
        "code": 201,
        "usuario": [
          {
              "IdUsuario": 10,
              "Mail": "mrv@ad.com",
              "NickName": "mrv",
              "Habilitado": "Si",
              "Nombre": "Martincito",
              "Avatar": " Si.jpg",
              "Tipo_Usuario": "Visitante",
              "diasAlta": 10,
              "fecAlta": "2022-04-30T03:00:00.000Z"
          }
        ]
    }

* **Respuesta No Exitosa:**

  * **Codigo:** 404 NOT FOUND <br />
  * **Contenido:** `Cannot ERROR`


## Editar Usuario

* **URL**

  http://localhost:3000/usuario/modificarUsuario

* **Metodo:**

  `POST`

*  **Data Params**

   **Requeridos:**
 
   ```json
    {
        "idUsuario": "[Integer]",
        "nombre": "[String]",
        "avatar": "[String]"
    }
    ```

* **Respuesta Exitosa:**

  * **Codigo:** 201 <br />
  * **Contenido:** 
    ```json
    {
        "code": 201,
        "usuario": {
          "fieldCount": 0,
          "affectedRows": 1,
          "insertId": 0,
          "info": "Rows matched: 1  Changed: 0  Warnings: 0",
          "serverStatus": 2,
          "warningStatus": 0,
          "changedRows": 0
        }
    }
    ```

* **Respuesta No Exitosa:**

  * **Codigo:** 404 NOT FOUND <br />
  * **Contenido:** `Cannot POST`

## Crear Usuario

* **URL**

  http://localhost:3000/usuario/create

* **Metodo:**

  `POST`

*  **Data Params**

   **Requeridos:**
 
   ```json
    {
        "mail": "[String]",
        "nickname": "[String]",
        "habilitado": "[Boolean]",
        "avatar": "[String]",
        "tipo_usuario": "[String]",
        "diasAlta":"[String]",
        "fecAlta":"[Date]",
        "password":"[String]"
    }
    ```

* **Respuesta Exitosa:**

  * **Codigo:** 201 <br />
  * **Contenido:** 
    ```json
    {
        "code": 201,
        "message": "Usuario creado correctamente"
    }
    ```

* **Respuesta No Exitosa:**

  * **Codigo:** 404 NOT FOUND <br />
  * **Contenido:** `Cannot POST`


## Modificar Password Usuario

* **URL**

  http://localhost:3000/usuario/modificarPass

* **Metodo:**

  `POST`

*  **Data Params**

   **Requeridos:**
 
   ```json
    {
        "idUsuario": "[Integer]",
        "password": "[String]"
    }
    ```

* **Respuesta Exitosa:**

  * **Codigo:** 201 <br />
  * **Contenido:** 
    ```json
    {
      "code": 201,
      "message": "Password modificada correctamente"
    }
    ```

* **Respuesta No Exitosa:**

  * **Codigo:** 404 NOT FOUND <br />
  * **Contenido:** `Cannot POST`


  ## Validar Codigo Recuperacion
* **URL**

  http://localhost:3000/usuario/validarCodigoRecuperacion

* **Metodo:**

  `GET`
  
*  **URL Parametros**

    ```
    {
      "mail": "[String]",
      "codigo": "[Integer]"
    }
    ```

* **Respuesta Exitosa:**

  * **Codigo:** 201 <br />
  * **Contenido:** 
    ```json
    {
        "code": 201,
        "message": "Se ha validado el código correctamente"
    }
    ```
    
  * **Codigo:** 202 <br />
  * **Contenido:** 
    ```json
    {
      "code": 202,
      "message": "No se encuentra un codigo vigente"
    }
    ```


* **Respuesta No Exitosa:**

  * **Codigo:** 404 NOT FOUND <br />
  * **Contenido:** `Cannot ERROR`


  ## Enviar Código de Recuperación
* **URL**

  http://localhost:3000/usuario/SendRecoveryPassword

* **Metodo:**

  `GET`
  
*  **URL Parametros**

    ```
    {
      "mail": "[String]"
    }
    ```

* **Respuesta Exitosa:**

  * **Codigo:** 201 <br />
  * **Contenido:** 
    ```json
    "result2": {
        "code": 201,
        "message": "Codigo de recuperación creado"
    }
    ```


* **Respuesta No Exitosa:**

  * **Codigo:** 404 NOT FOUND <br />
  * **Contenido:** `Cannot ERROR`



## Loguear Usuario
* **URL**

  http://localhost:3000/usuario/login

* **Metodo:**

  `POST`

*  **Data Params**

   **Requeridos:**
 
    ```json
    {
      "mail": "[String]",
      "password": "[String]"
    }
    ```

* **Respuesta Exitosa:**

  * **Codigo:** 201 <br />
  * **Contenido:** 
    ```json
    {
        "code": 201,
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzEsImlhdCI6MTY1MjIyNTM4OCwiZXhwIjoxNjUyMzExNzg4fQ.TT-I-jp18AIRbix5J57YR34w-2gFje1a3B3rSP0VATE",
            "data": [
                {
                    "idUsuario": 31,
                    "mail": "prueba@gmail.com",
                    "nickname": "mrv45",
                    "habilitado": "Si",
                    "nombre": "Prueba",
                    "avatar": null,
                    "tipo_usuario": "Visitante",
                    "idLogin": 22,
                    "diasAlta": 30,
                    "fecAlta": "2022-05-08T03:00:00.000Z",
                    "password": "$2a$08$ZXki1/L9YhLERws2XZoIqed3LmgvUBECTHfIOKZTqSXfNYhYcwEDe"
                }
            ]
    }

* **Respuesta No Exitosa:**

  * **Codigo:** 202 <br />
  * **Contenido:** `Invalid username or password`

  * **Codigo:** 203 <br />
  * **Contenido:** `Invalid username or password`

  * **Codigo:** 404 NOT FOUND <br />
  * **Contenido:** `Cannot ERROR`


## Crear Invitado - Paso 1

* **URL**

  http://localhost:3000/usuario/crearInvitado

* **Metodo:**

  `POST`

*  **Data Params**

   **Requeridos:**
 
   ```json
    {
        "mail": "[String]",
        "nickName": "[String]"
    }
    ```

* **Respuesta Exitosa:**

  * **Codigo:** 201 <br />
  * **Contenido:** 
    ```json
      {
          "result": {
              "code": 201,
              "message": "Usuario Invitado creado correctamente. Se enviará el mail!"
          }
      }
    ```

* **Respuesta No Exitosa:**

  * **Codigo:** 202 <br />
  * **Contenido:** 
    ```json
    {
      "code": 202,
      "message": "El mail ingresado ya existe."
    }
    ```

  * **Codigo:** 203 <br />
  * **Contenido:** 
    ```json
    {
      "code": 203,
      "message": "Mail registrado pero registración incompleta"
    }
    ```

  * **Codigo:** 404 NOT FOUND <br />
  * **Contenido:** `Cannot POST`


  ## Terminar Registro de Invitado - Paso 2

* **URL**

  http://localhost:3000/usuario/crearInvitadoUpdate

* **Metodo:**

  `POST`

*  **Data Params**

   **Requeridos:**
 
   ```json
    {
        "mail": "[String]",
        "nombre": "[String]",
        "password": "[String]"
    }
    ```

* **Respuesta Exitosa:**

  * **Codigo:** 201 <br />
  * **Contenido:** 
    ```json
    {
      "code": 201,
      "message": "Registración exitosa. Por favor logueese!"
    }
    ```

* **Respuesta No Exitosa:**

  * **Codigo:** 404 NOT FOUND <br />
  * **Contenido:** `Cannot POST`


## Validar Alias

* **URL**

  http://localhost:3000/usuario/validarAlias

* **Metodo:**

  `GET`
  
*  **URL Parametros**

     ```
    {
      "alias": "[String]"
    }
    ```

* **Respuesta Exitosa:**

  * **Codigo:** 201 <br />
  * **Contenido:** 
    ```json
    {
      "code": 201,
       "usuario": [
        {
            "1": 1
        }
      ]
    }
    ```

  * **Codigo:** 202 <br />
  * **Contenido:** 
    ```json
    {
      "code": 202,
      "message": "No existe alias"
    }
    ```

* **Respuesta No Exitosa:**

  * **Codigo:** 404 NOT FOUND <br />
  * **Contenido:** `Cannot ERROR`
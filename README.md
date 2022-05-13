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

   None

*  **Data Params**

   **Requeridos:**
 
   ```json
    {
        "IdUsuario": "[Integer]"
    }
    ```

* **Respuesta Exitosa:**

  * **Codigo:** 200 <br />
  * **Contenido:** 
    ```json
    {
        "CalificacionPromedio": "3.5000",
        "NombreReceta": "Biscochuelo marmolado",
        "NickNameUsuarioReceta": "TPAD",
        "IdReceta": 4,
        "IdFavorito": 4
    }

* **Respuesta No Exitosa:**

  * **Codigo:** 404 NOT FOUND <br />
  * **Contenido:** `Cannot ERROR`

## Agregar a Favoritos

* **URL**

  http://localhost:3000/receta/agregarFavorito

* **Metodo:**

  `POST`

* **Data Params**: JSON

   ```json
   {
       "IdUsuario": "[Integer]",
       "IdReceta": "[Integer]"
   }

* **Respuesta Exitosa:**

  * **Codigo:** 200 <br />
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

  `DELETE`

* **Data Params**: JSON

   ```json
   {
       "IdUsuario": "[Integer]",
       "IdReceta": "[Integer]"
   }

* **Respuesta Exitosa:**

  * **Codigo:** 200 <br />
  * **Contenido:** 
    ```json
      {
        "code": 201,
        "message": "Favorito eliminado correctamente"
      }

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
        "IdPaso": "[Integer]",
        "Tipo_Contenido": "[String]",
        "Extension": "[String]",
        "URL": "[String]"
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

   None

*  **Data Params**

   **Requeridos:**
 
   ```json
    {
        "IdPaso": "[Integer]"
    }
    ```

* **Respuesta Exitosa:**

  * **Codigo:** 200 <br />
  * **Contenido:** 
    ```json
    {
        "code": 200,
        "multimedia": [
            {
                "tipo_contenido": "foto",
                "urlContenido": "www.url.com"
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
  
*  **URL Parametros**

   None

*  **Data Params**

   **Requeridos:**
 
   ```json
    {
        "descripcion": "[String]"
    }
    ```

* **Respuesta Exitosa:**

  * **Codigo:** 200 <br />
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
  
*  **URL Parametros**

   None

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
  
*  **URL Parametros**

   None

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

   None

*  **Data Params**

   **Requeridos:**
 
   ```json
    {
        "IdReceta": "[Integer]"
    }
    ```

* **Respuesta Exitosa:**

  * **Codigo:** 200 <br />
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

*  **Data Params**

   **Requeridos:**
 
   None

* **Respuesta Exitosa:**

  * **Codigo:** 200 <br />
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

   None

*  **Data Params**

   **Requeridos:**
 
    ```json
    {
        "IdOrigen": "[Integer]",
        "IdDestino": "[Integer]"
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



# Receta
## Obtener Receta por ID
* **URL**

  http://localhost:3000/receta/recetaPorId

* **Metodo:**

  `GET`
  
*  **URL Parametros**

   None

*  **Data Params**

   **Requeridos:**
 
    ```json
    {
        "IdReceta": "[Integer]"
    }
    ```

* **Respuesta Exitosa:**

  * **Codigo:** 200 <br />
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

*  **Data Params**

   **Requeridos:**
      None

* **Respuesta Exitosa:**

  * **Codigo:** 200 <br />
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


## Obtener Receta por ID
* **URL**

  http://localhost:3000/receta/recetaPorId

* **Metodo:**

  `GET`
  
*  **URL Parametros**

   None

*  **Data Params**

   **Requeridos:**
 
    ```json
    {
        "IdReceta": "[Integer]"
    }
    ```

* **Respuesta Exitosa:**

  * **Codigo:** 200 <br />
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

## Crear Receta

* **URL**

  http://localhost:3000/receta/postReceta

* **Metodo:**

  `POST`
  
*  **URL Parametros**

   None

*  **Data Params**

   **Requeridos:**
 
   ```json
    {
        "IdUsuario": "[Integer]",
        "Nombre": "[String]",
        "Descripcion": "[String]",
        "Foto": "[String]",
        "Porciones": "[Integer]",
        "CantidadPersonas":"[Integer]",
        "IdTipo":"[Integer]",
        "FecAlta":"[Date]"
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
  
*  **URL Parametros**

   None

*  **Data Params**

   **Requeridos:**
 
   ```json
    {
        "IdReceta": "[Integer]",
        "URL": "[String]",
        "Extension": "[String]"
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
  
*  **URL Parametros**

   None

*  **Data Params**

   **Requeridos:**
 
    ```json
    {
        "IdReceta": "[Integer]"
    }
    ```

* **Respuesta Exitosa:**

  * **Codigo:** 200 <br />
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
  
*  **URL Parametros**

   None

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
      "message": "Paso guardado correctamente"
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

   None

*  **Data Params**

   **Requeridos:**
 
    ```json
    {
        "IdReceta": "[Integer]"
    }
    ```

* **Respuesta Exitosa:**

  * **Codigo:** 200 <br />
  * **Contenido:** 
    ```json
    {
       "code": 201,
        "foto": [
            {
                "idPaso": 15,
                "idReceta": 8,
                "nroPaso": 1,
                "texto": "Paso numero 1"
            },
            {
                "idPaso": 16,
                "idReceta": 8,
                "nroPaso": 2,
                "texto": "Paso numero 1"
            },
            {
                "idPaso": 17,
                "idReceta": 8,
                "nroPaso": 2,
                "texto": "Paso numero 1"
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

   None

*  **Data Params**

   **Requeridos:**
 
    ```json
    {
        "IdUsuario": "[Integer]"
    }
    ```

* **Respuesta Exitosa:**

  * **Codigo:** 200 <br />
  * **Contenido:** 
    ```json
    {
        "code": 201,
        "receta": [
            {
                "idReceta": 4,
                "idUsuario": 11,
                "alias": "TPAD",
                "nombre": "Biscochuelo marmolado",
                "descripcion": "Biscochuelo marmolado casero",
                "foto": "BiscochoMarmolado.jpg",
                "porciones": 16,
                "cantidadPersonas": 8,
                "idTipo": 2,
                "descTipo": "Tortas",
                "fecAlta": "2022-04-30T03:00:00.000Z",
                "SnAutorizada": "S"
            },
            {
                "idReceta": 5,
                "idUsuario": 11,
                "alias": "TPAD",
                "nombre": "Fideos matarazzo",
                "descripcion": "Fideos matarazzo con salsa",
                "foto": "MataFideos.jpg",
                "porciones": 2,
                "cantidadPersonas": 2,
                "idTipo": 3,
                "descTipo": "Pastas",
                "fecAlta": "2022-04-30T03:00:00.000Z",
                "SnAutorizada": "S"
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
  
*  **URL Parametros**

   None

*  **Data Params**

   **Requeridos:**
 
   ```json
    {
        "IdUsuario": "[Integer]",
        "IdReceta": "[Integer]",
        "Calificacion": "[Integer]",
        "Comentarios": "[String]"
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

   None

*  **Data Params**

   **Requeridos:**
 
    ```json
    {
        "Nombre": "[String]"
    }
    ```

* **Respuesta Exitosa:**

  * **Codigo:** 200 <br />
  * **Contenido:** 
    ```json
    {
        "code": 201,
        "receta": [
            {
                "IdReceta": 2,
                "IdUsuario": 10,
                "Alias": "mrv",
                "Nombre": "Budin marmolado",
                "Descripcion": "Budin marmolado bien esponjoso",
                "Foto": "Budin.jpg",
                "Porciones": 16,
                "CantidadPersonas": 8,
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

   None

*  **Data Params**

   **Requeridos:**
 
    ```json
    {
        "Nombre": "[String]"
    }
    ```

* **Respuesta Exitosa:**

  * **Codigo:** 200 <br />
  * **Contenido:** 
    ```json
    {
        "code": 201,
        "receta": [
            {
                "IdReceta": 2,
                "IdUsuario": 10,
                "Alias": "mrv",
                "Nombre": "Budin marmolado",
                "Descripcion": "Budin marmolado bien esponjoso",
                "Foto": "Budin.jpg",
                "Porciones": 16,
                "CantidadPersonas": 8,
                "IdTipo": 1,
                "DescTipo": "Budines",
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

   None

*  **Data Params**

   **Requeridos:**
 
    ```json
    {
        "Nombre": "[String]"
    }
    ```

* **Respuesta Exitosa:**

  * **Codigo:** 200 <br />
  * **Contenido:** 
    ```json
    {
                "code": 201,
        "receta": [
            {
                "IdReceta": 4,
                "IdUsuario": 11,
                "Alias": "TPAD",
                "Nombre": "Biscochuelo marmolado",
                "Descripcion": "Biscochuelo marmolado casero",
                "Foto": "BiscochoMarmolado.jpg",
                "Porciones": 16,
                "CantidadPersonas": 8,
                "IdTipo": 2,
                "DescTipo": "Tortas",
                "FecAlta": "2022-04-30T03:00:00.000Z",
                "SnAutorizada": "S"
            },
            {
                "IdReceta": 3,
                "IdUsuario": 10,
                "Alias": "mrv",
                "Nombre": "Biscochuelo",
                "Descripcion": "Biscochuelo de vainilla casero",
                "Foto": "Biscocho.jpg",
                "Porciones": 16,
                "CantidadPersonas": 8,
                "IdTipo": 2,
                "DescTipo": "Tortas",
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
  
*  **URL Parametros**

   None

*  **Data Params**

   **Requeridos:**
 
    ```json
    {
        "IdTipo": "[Integer]"
    }
    ```

* **Respuesta Exitosa:**

  * **Codigo:** 200 <br />
  * **Contenido:** 
    ```json
    {
       "code": 201,
        "receta": [
            {
                "idReceta": 3,
                "idUsuario": 10,
                "alias": "mrv",
                "nombre": "Biscochuelo",
                "descripcion": "Biscochuelo de vainilla casero",
                "foto": "Biscocho.jpg",
                "porciones": 16,
                "cantidadPersonas": 8,
                "idTipo": 2,
                "descTipo": "Tortas",
                "fecAlta": "2022-04-30T03:00:00.000Z",
                "SnAutorizada": "S"
            },
            {
                "idReceta": 4,
                "idUsuario": 11,
                "alias": "TPAD",
                "nombre": "Biscochuelo marmolado",
                "descripcion": "Biscochuelo marmolado casero",
                "foto": "BiscochoMarmolado.jpg",
                "porciones": 16,
                "cantidadPersonas": 8,
                "idTipo": 2,
                "descTipo": "Tortas",
                "fecAlta": "2022-04-30T03:00:00.000Z",
                "SnAutorizada": "S"
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

   None

*  **Data Params**

   **Requeridos:**
 
    ```json
    {
        "Descripcion": "[String]"
    }
    ```

* **Respuesta Exitosa:**

  * **Codigo:** 200 <br />
  * **Contenido:** 
    ```json
    {
       "code": 201,
        "receta": [
            {
                "idReceta": 2,
                "idUsuario": 10,
                "alias": "mrv",
                "nombre": "Budin marmolado",
                "descripcion": "Budin marmolado bien esponjoso",
                "foto": "Budin.jpg",
                "porciones": 16,
                "cantidadPersonas": 8,
                "idTipo": 1,
                "descTipo": "Budines",
                "fecAlta": "2022-04-30T03:00:00.000Z",
                "SnAutorizada": "S"
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
  
*  **URL Parametros**

   None

*  **Data Params**

   **Requeridos:**
 
    ```json
    {
        "Nombre": "[String]",
        "IdUSuario": "[Integer]"
    }
    ```

* **Respuesta Exitosa:**

  * **Codigo:** 200 <br />
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

   None

*  **Data Params**

   **Requeridos:**
 
    ```json
    {
        "IdReceta": "[Integer]"
    }
    ```

* **Respuesta Exitosa:**

  * **Codigo:** 200 <br />
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

   None

*  **Data Params**

   **Requeridos:**
 
    ```json
    {
        "IdReceta": "[Integer]"
    }
    ```

* **Respuesta Exitosa:**

  * **Codigo:** 200 <br />
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
  
*  **URL Parametros**

   None

*  **Data Params**

   **Requeridos:**
 
    ```json
    {
        "IdUsuario": "[Integer]"
    }
    ```

* **Respuesta Exitosa:**

  * **Codigo:** 200 <br />
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
  
*  **URL Parametros**

   None

*  **Data Params**

   **Requeridos:**
 
   ```json
    {
        "IdUSuario": "[Integer]",
        "Nombre": "[String]",
        "Avatar": "[String]"
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
  
*  **URL Parametros**

   None

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

  * **Codigo:** 202 <br />
  * **Contenido:** `Email ya existente`

    * **Codigo:** 202 <br />
  * **Contenido:** `DNI ya existente`

  * **Codigo:** 404 NOT FOUND <br />
  * **Contenido:** `Cannot POST`


## Modificar Password Usuario

* **URL**

  http://localhost:3000/usuario/modificarPass

* **Metodo:**

  `POST`
  
*  **URL Parametros**

   None

*  **Data Params**

   **Requeridos:**
 
   ```json
    {
        "IdUsuario": "[Integer]",
        "Password": "[String]"
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

   None

*  **Data Params**

   **Requeridos:**
 
    ```json
    {
        "Mail": "[String]",
        "Codigo": "[Integer]"
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

   None

*  **Data Params**

   **Requeridos:**
 
    ```json
    {
        "Mail": "[String]"
    }
    ```

* **Respuesta Exitosa:**

  * **Codigo:** 200 <br />
  * **Contenido:** 
    ```json
    {
        "code": 200,
        "message": "Mail de recuperación enviado"
    }
    ```


* **Respuesta No Exitosa:**

  * **Codigo:** 404 NOT FOUND <br />
  * **Contenido:** `Cannot ERROR`



## Loguear Usuario
* **URL**

  http://localhost:3000/usuario/login

* **Metodo:**

  `GET`
  
*  **URL Parametros**

   None

*  **Data Params**

   **Requeridos:**
 
    ```json
    {
        "Mail": "[String]",
        "Password": "[String]"
    }
    ```

* **Respuesta Exitosa:**

  * **Codigo:** 200 <br />
  * **Contenido:** 
    ```json
    {
        "code": 201,
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzEsImlhdCI6MTY1MjIyNTM4OCwiZXhwIjoxNjUyMzExNzg4fQ.TT-I-jp18AIRbix5J57YR34w-2gFje1a3B3rSP0VATE",
        "usuario": {
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
    }

* **Respuesta No Exitosa:**

  * **Codigo:** 404 NOT FOUND <br />
  * **Contenido:** `Cannot ERROR`


## Crear Invitado - Paso 1

* **URL**

  http://localhost:3000/usuario/crearInvitado

* **Metodo:**

  `POST`
  
*  **URL Parametros**

   None

*  **Data Params**

   **Requeridos:**
 
   ```json
    {
        "Mail": "[String]",
        "NickName": "[String]"
    }
    ```

* **Respuesta Exitosa:**

  * **Codigo:** 201 <br />
  * **Contenido:** 
    ```json
    {
      "code": 201,
      "message": "Usuario Invitado creado correctamente. Se enviará el mail!"
    }
    ```

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
      "message": "El alias ingresado ya existe."
    }
    ```

* **Respuesta No Exitosa:**

  * **Codigo:** 404 NOT FOUND <br />
  * **Contenido:** `Cannot POST`


  ## Terminar Registro de Invitado - Paso 2

* **URL**

  http://localhost:3000/usuario/crearInvitadoUpdate

* **Metodo:**

  `POST`
  
*  **URL Parametros**

   None

*  **Data Params**

   **Requeridos:**
 
   ```json
    {
        "Mail": "[String]",
        "Nombre": "[String]",
        "Password": "[String]"
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

  * **Codigo:** 202 <br />
  * **Contenido:** 
    ```json
    {
      "code": 202,
      "message": "Contacte al administrador. Su usuario ha caducado"
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

   None

*  **Data Params**

   **Requeridos:**
 
    ```json
    {
        "Alias": "[String]"
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
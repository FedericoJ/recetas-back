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
        "Extension": "[Boolean]",
        "URL": "[String]"
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


# Usuarios
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

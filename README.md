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
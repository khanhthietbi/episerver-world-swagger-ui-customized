call npm run build
call copy ".\dist\swagger-ui-standalone-preset.js" "..\DevOps\src\Scripts\Custom\SwaggerPanel\"
call copy ".\dist\swagger-ui-standalone-preset.js.map" "..\DevOps\src\Scripts\Custom\SwaggerPanel\"
call copy ".\dist\swagger-ui-bundle.js" "..\DevOps\src\Scripts\Custom\SwaggerPanel\"
call copy ".\dist\swagger-ui-bundle.js.map" "..\DevOps\src\Scripts\Custom\SwaggerPanel\"
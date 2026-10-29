@echo off
title Subir Proyecto a GitHub (ocruz0311)
cd /d F:\SOFTWARES-DATA\NOTION
echo ========================================================
echo  SUBIENDO DASHBOARD A GITHUB: ocruz0311/control-fotografico
echo ========================================================
git push -u origin main
echo.
if %ERRORLEVEL% EQU 0 (
    echo ========================================================
    echo  SUBIDA EXITOSA A GITHUB!
    echo  Repositorio: https://github.com/ocruz0311/control-fotografico
    echo ========================================================
) else (
    echo Ocurrio un error en la autenticacion.
)
pause

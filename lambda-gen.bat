@echo off
setlocal

REM === Configuration ===
set ZIP_NAME=mock-data-processing.zip
set LAMBDA_ENTRY=lambda_function\lambda_function.py
set BUCKET_NAME=wurcs-code-bucket
set VENV_SITE_PACKAGES=lambda_function\venv\Lib\site-packages
set TEMP_PKG_DIR=lambda_package_temp

REM === Cleanup old files ===
if exist %ZIP_NAME% del %ZIP_NAME%
if exist %TEMP_PKG_DIR% rmdir /s /q %TEMP_PKG_DIR%

REM === Create temporary packaging directory ===
mkdir %TEMP_PKG_DIR%

REM === Copy all site-packages files directly into root of package ===
xcopy /E /I /Y %VENV_SITE_PACKAGES%\* %TEMP_PKG_DIR%\

REM === Copy lambda_function.py to root of package ===
copy %LAMBDA_ENTRY% %TEMP_PKG_DIR%\

REM === Create zip archive ===
powershell -Command "Compress-Archive -Path '%TEMP_PKG_DIR%\*' -DestinationPath '%ZIP_NAME%'"

REM === Upload to S3 ===
aws s3 cp %ZIP_NAME% s3://%BUCKET_NAME%/

REM === Cleanup temp directory ===
rmdir /s /q %TEMP_PKG_DIR%

echo.
echo Done! %ZIP_NAME% uploaded to s3://%BUCKET_NAME%/lambda_function/
endlocal
pause

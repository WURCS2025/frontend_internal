@echo off
setlocal

REM Set your ZIP file name and target S3 bucket
set ZIP_NAME=mock-data-processing.zip
set LAMBDA_DIR=lambda
set BUCKET_NAME=wurcs-code-bucket

REM Remove old zip file if it exists
if exist %ZIP_NAME% del %ZIP_NAME%

REM Navigate to lambda directory and zip everything
cd %LAMBDA_DIR%
powershell -Command "Compress-Archive -Path * -DestinationPath ../%ZIP_NAME%"
cd ..

REM Upload to S3 using AWS CLI
aws s3 cp %ZIP_NAME% s3://%BUCKET_NAME%/

echo.
echo Done! %ZIP_NAME% uploaded to s3://%BUCKET_NAME%/
endlocal
pause

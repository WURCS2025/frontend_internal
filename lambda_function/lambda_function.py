import json

import os

import boto3

import time

import random

from datetime import datetime

 

sns_client = boto3.client('sns')

s3_client = boto3.client('s3')

 

output_topic_arn = os.environ.get("wurcs_data_output_topic_sns_ARN", "default-arn-if-not-set")

bucket_name = os.environ.get("wurcs_data_input_bucket", "default-bucket-if-not-set")

 

def lambda_handler(event, context):

    for record in event['Records']:

        print(f"record is {record}")

        try:

            # Step 1: Parse SQS message body (SNS payload is embedded here)

            body = json.loads(record['body'])

            print(f"raw message: {body}")

 

            # Step 2: Get and parse the SNS 'Message' field (stringified JSON)

            raw_message = body.get('Message')

            if raw_message:

                message = json.loads(raw_message)

            else:

                raise ValueError("Missing 'Message' field in SQS record body.")

 

            print(f"✅ Parsed message from SNS: {message}")

 

            # Step 3: Read file from S3 using s3_key

            s3_key = message.get("s3_key")

            if not s3_key:

                raise ValueError("Missing 's3_key' in message")

 

            bucket_name = os.environ.get("wurcs_data_input_bucket", "default-bucket-if-not-set")

            print(f"📦 Reading file from S3 - Bucket: {bucket_name}, Key: {s3_key}")

 

            s3_response = s3_client.get_object(Bucket=bucket_name, Key=s3_key)

 

            if s3_key.lower().endswith('.xlsx'):

                print("This is an Excel (.xlsx) file.")

                # file_content = response['Body'].read()

                # # Use BytesIO to treat the content as a file

                # excel_data = BytesIO(file_content)

 

                # # Read the Excel file with pandas

                # df = pd.read_excel(excel_data)

 

                # Print the top 10 rows

                # print(df.head(10))

            else:

                print("This is NOT a valid .xlsx file.")

                file_content = s3_response['Body'].read().decode('utf-8')

                print("📄 File Content:")

                print(file_content)

 

            # Step 4: Add or update processing metadata

            message['process_date'] = datetime.utcnow().isoformat()

            message['process_result'] = "Success"

            message['message'] = "File processed successfully"

 

            # Optional: 50% failure simulation

            if random.random() > 0.5:

                message['process_date'] = datetime.utcnow().isoformat()

                message['process_result'] = "Filure"

                message['message'] = "File processing error"

 

            # Step 5: Log keys

            print(f"🔑 Message keys: {list(message.keys())}")

            print(f"📤 Publishing to SNS Topic: {output_topic_arn}")

 

            # Step 6: Publish processed result back to SNS

            response = sns_client.publish(

                TopicArn=output_topic_arn,

                Message=json.dumps(message),

                Subject='Processing Result'

            )

 

            print(f"📬 Publish response: {response}")

            time.sleep(10)

 

        except Exception as e:

            print(f"❌ Error processing record: {e}")

 

    return {

        'statusCode': 200,

        'body': json.dumps('Messages processed and published')

    }
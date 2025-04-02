import json
import os
import boto3
from datetime import datetime

sns_client = boto3.client('sns')
output_topic_arn = os.environ['OUTPUT_TOPIC_ARN']

def lambda_handler(event, context):
    for record in event['Records']:
        body = json.loads(record['body'])
        if 'Message' in body:
            message = json.loads(body['Message'])
        else:
            message = body
        
        print(f"Processing message: {message}")
        # Process logic
        message['process_date'] = datetime.utcnow().isoformat()
        message['process_result'] = "success"
        message['message'] = "File processed successfully"
        
        
        
        # 50% chance of failure and 50% chance of success
        if random.random() > 0.5:
            message['process_result'] = "failure"
            message['message'] = "File processing failed"
            message['error'] = "Random failure occurred"

        # give me a list of all the keys in the message object
        keys = message.keys()
        print(f"Keys: {keys}")
        
        # Publish to output SNS topic
        response = sns_client.publish(
            TopicArn=output_topic_arn,
            Message=json.dumps(message),
            Subject='Processing Result'
        )

    return {
        'statusCode': 200,
        'body': json.dumps('Messages processed and published')
    }

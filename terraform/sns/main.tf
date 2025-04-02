terraform {
  backend "s3" {
    bucket         = "wurcs-terraform-state-bucket"         # 🔁 Change to your actual S3 bucket name
    key            = "wurcs-project/terraform.tfstate"  
  }
}

provider "aws" {
  region = "us-east-1"
}

resource "aws_sns_topic" "wurcs-push-data-topic-sns" {
  name = "wurcs-push-data-topic-sns"
}

resource "aws_sns_topic" "wurcs-data-ouput-topic-sns" {
  name = "wurcs-data-ouput-topic-sns"
}

resource "aws_sqs_queue" "wurcs-push-data-topic-sqs-queue" {
  name = "wurcs-push-data-topic-sqs-queue"
}

resource "aws_sqs_queue" "wurcs-data-ouput-topic-sqs-queue" {
  name = "wurcs-data-ouput-topic-sqs-queue"
}

resource "aws_sns_topic_subscription" "wurcs-push-data-topic-sqs-queue-sub" {
  topic_arn = aws_sns_topic.wurcs-push-data-topic-sns.arn
  protocol  = "sqs"
  endpoint  = aws_sqs_queue.wurcs-push-data-topic-sqs-queue.arn

  # Allow SNS to write to SQS
  depends_on = [aws_sqs_queue_policy.wurcs-push-data-topic-sns-policy]
}

resource "aws_sns_topic_subscription" "wurcs-data-ouput-topic-sqs-queue-sub" {
  topic_arn = aws_sns_topic.wurcs-data-ouput-topic-sns.arn 
  protocol  = "sqs"
  endpoint  = aws_sqs_queue.wurcs-data-ouput-topic-sqs-queue.arn

  depends_on = [aws_sqs_queue_policy.wurcs-data-ouput-topic-sns-policy]
}

resource "aws_sqs_queue_policy" "wurcs-push-data-topic-sns-policy" {
  queue_url = aws_sqs_queue.wurcs-push-data-topic-sqs-queue.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect    = "Allow"
      Principal = "*"
      Action    = "SQS:SendMessage"
      Resource  = aws_sqs_queue.wurcs-push-data-topic-sqs-queue.arn
      Condition = {
        ArnEquals = {
          "aws:SourceArn" = aws_sns_topic.wurcs-push-data-topic-sns.arn
        }
      }
    }]
  })
}

resource "aws_sqs_queue_policy" "wurcs-data-ouput-topic-sns-policy" {
  queue_url = aws_sqs_queue.wurcs-data-ouput-topic-sqs-queue.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect    = "Allow"
      Principal = "*"
      Action    = "SQS:SendMessage"
      Resource  = aws_sqs_queue.wurcs-data-ouput-topic-sqs-queue.arn
      Condition = {
        ArnEquals = {
          "aws:SourceArn" = aws_sns_topic.wurcs-data-ouput-topic-sns.arn
        }
      }
    }]
  })
}

resource "aws_iam_role" "lambda_exec_role" {
  name = "lambda-exec-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Action = "sts:AssumeRole",
      Effect = "Allow",
      Principal = {
        Service = "lambda.amazonaws.com"
      }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_logs" {
  role       = aws_iam_role.lambda_exec_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_role_policy" "lambda_custom_policy" {
  name = "lambda-custom-sns-sqs"
  role = aws_iam_role.lambda_exec_role.id

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action   = ["sqs:ReceiveMessage", "sqs:DeleteMessage", "sqs:GetQueueAttributes"],
        Effect   = "Allow",
        Resource = aws_sqs_queue.wurcs-push-data-topic-sqs-queue.arn
      },
      {
        Action   = ["sns:Publish"],
        Effect   = "Allow",
        Resource = aws_sns_topic.wurcs-data-ouput-topic-sns.arn
      }
    ]
  })
}

resource "aws_lambda_function" "processor" {
  function_name = "sqs-to-sns-processor"
  role          = aws_iam_role.lambda_exec_role.arn
  handler       = "lambda_function.lambda_handler"
  runtime       = "python3.9"
  timeout       = 30
  

  # Use ZIP file from S3 bucket instead of local filename
  s3_bucket = "wurcs-code-bucket"                          # 🔁 Your actual bucket name
  s3_key    = "lambda/mock-data-processing.zip"   # 🔁 Path to your zip file in the bucket

  environment {
    variables = {
      wurcs_data_output_topic_sns_ARN= aws_sns_topic.wurcs-data-ouput-topic-sns.arn
    }
  }

  depends_on = [aws_iam_role_policy.lambda_custom_policy]
}

resource "aws_lambda_event_source_mapping" "sqs_trigger" {
  event_source_arn = aws_sqs_queue.wurcs-push-data-topic-sqs-queue.arn
  function_name    = aws_lambda_function.processor.arn
  batch_size       = 1
  enabled          = true
}

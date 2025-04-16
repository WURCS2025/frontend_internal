

terraform {
  backend "s3" {
    bucket         = "wurcs-terraform-state-bucket"         # 🔁 Change to your actual S3 bucket name
    key            = "wurcs-project/redis/terraform.tfstate"  
    region = "us-east-1"
  }
}

provider "aws" {
  region = "us-east-1"
}

resource "aws_iam_service_linked_role" "elasticache" {
  aws_service_name = "elasticache.amazonaws.com"
}

resource "aws_elasticache_user" "redis_user" {
  user_id   = "wurcs-redis-user"
  user_name = "wurcs-redis-user"
  access_string = "on ~* +@all"
  engine = "REDIS"

  passwords = ["ZhN82K9Zhm2-<!w9"]
  no_password_required = false
}

resource "aws_elasticache_user_group" "redis_user_group" {
  user_group_id = "app-user-group"
  engine = "REDIS"
  user_ids = [aws_elasticache_user.redis_user.user_id]
}

resource "aws_elasticache_subnet_group" "redis_subnet" {
  name       = "redis-subnet-group"
  subnet_ids = ["subnet-xxxxxx", "subnet-yyyyyy"]  # replace with your subnet IDs
}

resource "aws_security_group" "redis_sg" {
  name        = "redis-sg"
  description = "Allow access to Redis"
  vpc_id      = "vpc-xxxxxx"

  ingress {
    from_port   = 6379
    to_port     = 6379
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]  # Replace with your app CIDR
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_elasticache_replication_group" "redis_cluster" {
  replication_group_id          = "my-redis-cluster"
  description                   = "Redis cluster with auth"   # ✅ Correct attribute name
  engine                        = "redis"
  engine_version                = "7.0"                       # Redis 6+ for RBAC
  node_type                     = "cache.t3.micro"
  num_node_groups               = 1                           # ✅ replaces `number_cache_clusters`
  replicas_per_node_group       = 0                           # 0 means primary only
  port                          = 6379

  security_group_ids            = [aws_security_group.redis_sg.id]
  subnet_group_name             = aws_elasticache_subnet_group.redis_subnet.name
  user_group_ids                = [aws_elasticache_user_group.redis_user_group.user_group_id]

  automatic_failover_enabled    = false

  tags = {
    Name = "redis-auth-demo"
  }
}


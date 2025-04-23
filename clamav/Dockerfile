FROM ubuntu:22.04

# Install dependencies
RUN apt-get update && apt-get install -y \
    clamav \
    clamav-daemon \
    clamav-freshclam \
    curl \
    python3 \
    python3-pip

# Update virus database
RUN freshclam

# Create app directory
WORKDIR /app

# Copy app code
COPY app /app

# Install Flask
RUN pip3 install flask

# Expose port
EXPOSE 443

# Run app
CMD ["python3", "app.py"]

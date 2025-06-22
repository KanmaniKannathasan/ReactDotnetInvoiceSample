# Use Microsoft’s Node container with .NET SDK preinstalled
FROM mcr.microsoft.com/devcontainers/typescript-node:0-18
RUN apt-get update && apt-get install -y --no-install-recommends \
    libicu-dev \
 && rm -rf /var/lib/apt/lists/*

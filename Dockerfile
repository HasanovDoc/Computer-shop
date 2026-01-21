FROM node:20 AS frontend-build
WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend/. .
RUN npm run build

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS backend-build
WORKDIR /app
COPY backend/ComputerStore.Api ./ComputerStore.Api
COPY --from=frontend-build /app/dist ./ComputerStore.Api/wwwroot
WORKDIR /app/ComputerStore.Api
RUN dotnet restore
RUN dotnet publish -c Release -o /app/out

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=backend-build /app/out .
EXPOSE 80
ENTRYPOINT ["dotnet", "ComputerStore.Api.dll"]

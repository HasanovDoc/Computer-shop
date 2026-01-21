FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

COPY . .
RUN cd frontend && npm install && npm run build
RUN rm -rf backend/ComputerStore.Api/wwwroot/*
RUN cp -r frontend/dist/* backend/ComputerStore.Api/wwwroot/

WORKDIR /app/backend/ComputerStore.Api
RUN dotnet publish -c Release -o /app/out

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/out .

EXPOSE 80
ENTRYPOINT ["dotnet", "ComputerStore.Api.dll"]
FROM eclipse-temurin:21-jdk as build
WORKDIR /app

# Copiar os arquivos do Maven
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
COPY src src

# Dar permissão de execução ao mvnw
RUN chmod +x ./mvnw

# Compilar o projeto pulando testes
RUN ./mvnw clean package -DskipTests

# Segunda etapa - runtime
FROM eclipse-temurin:21-jre
WORKDIR /app

# Copiar o jar gerado
COPY --from=build /app/target/*.jar app.jar

# Expor a porta 8080
EXPOSE 8080

# Definir uma variável de ambiente padrão para o perfil
ENV SPRING_PROFILES_ACTIVE=prod

# Executar a aplicação
ENTRYPOINT ["java", "-jar", "app.jar"]
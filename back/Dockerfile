# Utiliser une image de base avec Maven et JDK
FROM maven:3.9.8-eclipse-temurin-21 as build

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de configuration Maven
COPY pom.xml .

# Télécharger les dépendances Maven
RUN mvn dependency:go-offline -B

# Copier le code source
COPY src ./src

# Construire l'application
RUN mvn package -DskipTests

# Utiliser une image JRE plus légère pour l'exécution
FROM openjdk:21-slim

WORKDIR /app

# Copier le JAR construit depuis l'étape de build
COPY --from=build /app/target/*.jar app.jar

# Exposer le port 8080
EXPOSE 8080

# Commande pour démarrer l'application
ENTRYPOINT ["java", "-jar", "app.jar"]
# Cible par défaut : docker-compose up --build
all:
	terminator -e "docker-compose up --build"
#docker-compose up --build

#(while ! docker ps | grep -q "10 seconds ago" ; do sleep 1; done)
#terminator -e "watch docker ps"
# Nettoyer le projet : docker-compose down --rmi all --volumes --remove-orphans

fclean:
	docker-compose down --rmi all --volumes --remove-orphans

#Lancer le docker-compose
run:
	docker-compose up --build

# Exécuter npx prisma migrate : schema=./src/prisma/schema.prisma
migrate:
	npx prisma migrate deploy dev --schema=./back/src/prisma/schema.prisma

client:
	npx prisma generate --schema=./back/src/prisma/schema.prisma

# Ouvrir Prisma Studio
studio:
	npx prisma studio --schema=./back/src/prisma/schema.prisma

# Relancer le projet
re: fclean all

# Ouvrir Terminator avec make
terminator:
	terminator -e "make"

import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function createFakeData() {
  // Génération de données pour les utilisateurs
  for (let i = 0; i < 10; i++) {
    await prisma.user.create({
      data: {
        email: faker.internet.email(),
        password: faker.internet.password(),
        name: faker.person.fullName(),
        profilePicture: faker.image.avatar(),
        address: faker.location.streetAddress(),
      },
    });
  }

  // Génération de données pour les catégories
  const categories = ['Vêtements', 'Chaussures', 'Accessoires'];
  for (let category of categories) {
    const existingCategory = await prisma.category.findUnique({
      where: { name: category },
    });
    if (!existingCategory) {
    await prisma.category.create({
      data: {
        name: category,
        description: faker.commerce.productDescription(),
      },
    });
  }

  // Génération de données pour les produits
  for (let i = 0; i < 30; i++) {
    await prisma.product.create({
      data: {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: parseFloat(faker.commerce.price()),
        imageUrl: faker.image.url(),
        stockQuantity: faker.number.int({ min: 0, max: 100 }),
        isAvailable: faker.datatype.boolean(),
        categoryId: faker.number.int({ min: 1, max: categories.length }),
      },
    });
  }

  // Génération de données pour les commandes, transactions et critiques
  // ... (à compléter en fonction des besoins spécifiques de votre application)
}
}
createFakeData()
  .then(() => console.log('Données fictives créées avec succès.'))
  .catch((e) => console.error('Erreur lors de la création de données fictives:', e));

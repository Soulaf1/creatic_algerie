import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const PortfolioSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  secteur: { type: String, required: true },
  problematique: { type: String, required: true },
  solution: { type: String, required: true },
  resultat: { type: String, required: true },
  image: { type: String, required: true },
  categorie: { type: String, required: true },
}, { timestamps: true });

const Portfolio = mongoose.models.Portfolio || mongoose.model('Portfolio', PortfolioSchema);

await mongoose.connect(process.env.MONGODB_URI);

// Supprime les anciennes données
await Portfolio.deleteMany({});

await Portfolio.create([
  {
    titre: 'EcoShop Algérie',
    secteur: 'Retail & Distribution',
    problematique: 'Ventes physiques uniquement, portée limitée au local.',
    solution: 'Plateforme e-commerce complète avec gestion logistique intégrée.',
    resultat: '+45% de leads',
    image: '/ecoshop.png',
    categorie: 'E-commerce',
  },
  {
    titre: 'DzPay',
    secteur: 'Fintech / Banking',
    problematique: 'Processus de paiement manuel et lent pour les PME.',
    solution: 'Application mobile sécurisée de transfert instantané.',
    resultat: '10k+ Utilisateurs',
    image: '/dzpay.png',
    categorie: 'Mobile',
  },
  {
    titre: 'Industrie Plus',
    secteur: 'Secteur Industriel',
    problematique: 'Manque de visibilité sur la chaîne logistique.',
    solution: 'Dashboard ERP sur mesure avec monitoring IoT.',
    resultat: '-30% Coûts Op.',
    image: '/industrie.png',
    categorie: 'Web',
  },
]);

console.log('✅ Projets mis à jour dans MongoDB !');
process.exit(0);
import mongoose from 'mongoose';

const PortfolioSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true,
  },
  problematique: {
    type: String,
    required: true,
  },
  solution: {
    type: String,
    required: true,
  },
  resultat: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  categorie: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export default mongoose.models.Portfolio || 
mongoose.model('Portfolio', PortfolioSchema);
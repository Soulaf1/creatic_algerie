import mongoose from 'mongoose';

const TemoignageSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  entreprise: {
    type: String,
    required: true,
  },
  citation: {
    type: String,
    required: true,
  },
  etoiles: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
}, { timestamps: true });

export default mongoose.models.Temoignage || 
mongoose.model('Temoignage', TemoignageSchema);
import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

// Champs obligatoires côté serveur (sécurité — ne jamais faire confiance au client)
const REQUIRED_FIELDS = ['nom', 'telephone', 'email', 'wilaya', 'typeService', 'description'];

function validateFields(data) {
  const errors = {};
  REQUIRED_FIELDS.forEach((field) => {
    if (!data[field] || !data[field].toString().trim()) {
      errors[field] = 'Ce champ est obligatoire';
    }
  });
  if (data.email && !/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = 'Email invalide';
  }
  return errors;
}

export async function POST(request) {
  try {
    const formData = await request.formData();

    // Récupération des champs texte
    const data = {
      nom: formData.get('nom'),
      entreprise: formData.get('entreprise'),
      telephone: formData.get('telephone'),
      email: formData.get('email'),
      wilaya: formData.get('wilaya'),
      typeService: formData.get('typeService'),
      budget: formData.get('budget'),
      delai: formData.get('delai'),
      description: formData.get('description'),
      cahierDesCharges: formData.get('cahierDesCharges'),
    };

    // Validation serveur
    const errors = validateFields(data);
    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    // Récupération du fichier (optionnel)
    const fichier = formData.get('fichier');
    let attachments = [];

    if (fichier && typeof fichier === 'object' && fichier.size > 0) {
      // Limite de taille (10 Mo)
      if (fichier.size > 10 * 1024 * 1024) {
        return NextResponse.json(
          { success: false, errors: { fichier: 'Fichier trop volumineux (max 10 Mo)' } },
          { status: 400 }
        );
      }
      const buffer = Buffer.from(await fichier.arrayBuffer());
      attachments.push({
        filename: fichier.name,
        content: buffer,
      });
    }

    // Configuration du transporteur Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // --- Email 1 : notification à l'entreprise ---
    const mailToEntreprise = {
      from: `"Formulaire Devis" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_TO,
      replyTo: data.email,
      subject: `Nouvelle demande de devis — ${data.nom}`,
      html: `
        <h2>Nouvelle demande de devis</h2>
        <h3>Informations de contact</h3>
        <p><strong>Nom :</strong> ${data.nom}</p>
        <p><strong>Entreprise :</strong> ${data.entreprise || 'Non renseigné'}</p>
        <p><strong>Téléphone :</strong> ${data.telephone}</p>
        <p><strong>Email :</strong> ${data.email}</p>
        <p><strong>Wilaya :</strong> ${data.wilaya}</p>

        <h3>Détails du projet</h3>
        <p><strong>Type de service :</strong> ${data.typeService}</p>
        <p><strong>Budget :</strong> ${data.budget || 'Non renseigné'}</p>
        <p><strong>Délai souhaité :</strong> ${data.delai || 'Non renseigné'}</p>
        <p><strong>Cahier des charges fourni :</strong> ${data.cahierDesCharges === 'true' ? 'Oui' : 'Non'}</p>

        <h3>Description du projet</h3>
        <p>${data.description.replace(/\n/g, '<br>')}</p>
      `,
      attachments,
    };

    // --- Email 2 : confirmation automatique au client ---
    const mailToClient = {
      from: `"Votre Entreprise" <${process.env.GMAIL_USER}>`,
      to: data.email,
      subject: 'Nous avons bien reçu votre demande de devis',
      html: `
        <h2>Merci ${data.nom} !</h2>
        <p>Nous avons bien reçu votre demande de devis concernant : <strong>${data.typeService}</strong>.</p>
        <p>Notre équipe va étudier votre projet et revient vers vous <strong>sous 48h</strong> avec une proposition personnalisée.</p>
        <p>En attendant, n'hésitez pas à consulter nos réalisations sur notre site.</p>
        <br>
        <p>Cordialement,<br>L'équipe</p>
      `,
    };

    // Envoi des deux emails en parallèle
    await Promise.all([
      transporter.sendMail(mailToEntreprise),
      transporter.sendMail(mailToClient),
    ]);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Erreur envoi devis:', error);
    return NextResponse.json(
      { success: false, message: 'Une erreur est survenue lors de l\'envoi.' },
      { status: 500 }
    );
  }
}
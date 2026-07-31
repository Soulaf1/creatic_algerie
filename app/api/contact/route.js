import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const { name, email, phone, message } = await request.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_TO,
      subject: "Nouveau message depuis le formulaire Contact",
      html: `
        <h2>Nouveau message</h2>

        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Téléphone :</strong> ${phone}</p>

        <hr>

        <p>${message}</p>
      `,
    });

    return Response.json({
      success: true,
      message: "Email envoyé avec succès.",
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message: "Erreur lors de l'envoi.",
      },
      { status: 500 }
    );
  }
}
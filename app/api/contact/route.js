import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const { name, email, phone, message } = await request.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.CONTACT_EMAIL,
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
import formidable from 'formidable';
import nodemailer from 'nodemailer';
import fs from 'fs';

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }

    const form = formidable({});

    try {
        const [fields, files] = await form.parse(req);

        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: parseInt(process.env.EMAIL_PORT),
            secure: process.env.EMAIL_PORT == 465,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        let emailContent = '<h1>Nouvelle commande de service !</h1>';
        for (const key in fields) {
            emailContent += `<p><strong>${key}:</strong> ${fields[key]}</p>`;
        }

        const cdcFile = files.cdc?.[0];
        let attachments = [];
        if (cdcFile) {
            attachments.push({
                filename: cdcFile.originalFilename,
                content: fs.createReadStream(cdcFile.filepath),
                contentType: cdcFile.mimetype,
            });
        }

        await transporter.sendMail({
            from: `"Site EPI Studios" <${process.env.EMAIL_FROM}>`,
            to: 'contact@epistudios.fr',
            cc: 'gael.tournier@epistudios.fr, nathan.poulain@epistudios.fr',
            subject: 'Nouvelle commande de service',
            html: emailContent,
            attachments: attachments,
        });

        res.status(200).json({ success: true, message: 'Commande envoyée avec succès !' });

    } catch (error) {
        console.error("Erreur lors du traitement du formulaire:", error);
        res.status(500).json({ success: false, message: 'Erreur serveur.', error: error.message });
    }
}
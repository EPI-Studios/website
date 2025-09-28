import { formidable } from 'formidable';
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

        const transporter = nodemailer.createTransporter({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: process.env.EMAIL_PORT == 465, 
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        let emailContent = '<h1>Nouvelle candidature !</h1>';
        for (const key in fields) {
            emailContent += `<p><strong>${key}:</strong> ${fields[key]}</p>`;
        }

        const cvFile = files.cv?.[0];
        let attachments = [];
        if (cvFile) {
            attachments.push({
                filename: cvFile.originalFilename,
                content: fs.createReadStream(cvFile.filepath),
                contentType: cvFile.mimetype,
            });
        }
        
        const poste = fields.poste?.[0] || 'Non spécifié';
        const applicantEmail = fields.email?.[0];
        const applicantName = fields.firstname?.[0] || 'Candidat';

        await transporter.sendMail({
            from: `"Site EPI Studios" <${process.env.EMAIL_FROM}>`,
            to: 'contact@epistudios.fr',
            cc: 'gael.tournier@epistudios.fr, nathan.poulain@epistudios.fr',
            subject: `Nouvelle candidature : ${poste}`,
            html: emailContent,
            attachments: attachments,
        });

        if (applicantEmail) {
            await transporter.sendMail({
                from: `"EPI Studios" <${process.env.EMAIL_FROM}>`,
                to: applicantEmail,
                subject: 'Confirmation de réception de votre candidature - EPI Studios',
                html: `
                    <h1>Bonjour ${applicantName},</h1>
                    
                    <p>Nous avons bien reçu votre candidature pour le poste de <strong>${poste}</strong> au sein d'EPI Studios.</p>
                    
                    <p>Votre demande est actuellement en cours d'examen par notre équipe. Nous étudions avec attention chaque candidature et nous efforçons de répondre dans les meilleurs délais.</p>
                    
                    <p>En cas de questions, n'hésitez pas à nous contacter à l'adresse : contact@epistudios.fr</p>
                    
                    <p>Merci pour votre intérêt pour EPI Studios !</p>
                    
                    <p>Cordialement,<br>
                    L'équipe EPI Studios</p>
                `,
            });
        }

        res.status(200).json({ success: true, message: 'Candidature envoyée avec succès !' });

    } catch (error) {
        console.error("Erreur lors du traitement du formulaire:", error);
        res.status(500).json({ success: false, message: 'Erreur serveur.', error: error.message });
    }
}
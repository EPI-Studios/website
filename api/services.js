import formidable from 'formidable';
import nodemailer from 'nodemailer';
import fs from 'fs';

const lastRequestTime = new Map();
const LIMIT_INTERVAL = 10 * 1000;

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }

    const ip =
        req.headers['x-forwarded-for']?.split(',')[0] ||
        req.socket.remoteAddress ||
        'unknown';
    const now = Date.now();
    const lastTime = lastRequestTime.get(ip) || 0;

    if (now - lastTime < LIMIT_INTERVAL) {
        return res.status(429).json({
            success: false,
            message: 'Veuillez patienter 10 secondes avant de renvoyer une candidature.',
        });
    }

    lastRequestTime.set(ip, now)
    const form = formidable({
        maxFieldsSize: 10 * 1024 * 1024, // 10MB
    });
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
            const value = Array.isArray(fields[key]) ? fields[key][0] : fields[key];
            emailContent += `<p><strong>${key.replace(/(<([^>]+)>)/ig, '')}:</strong> ${value.replace(/(<([^>]+)>)/ig, '')}</p>`;
        }

        const cdcFile = files.cdc?.[0];
        let attachments = [];
        if (cdcFile && cdcFile.originalFilename) {
            const originalName = cdcFile.originalFilename.toLocaleLowerCase();
            const isValidExtension = originalName.endsWith(".pdf")
            const extensionMatches = originalName.match(/\.[A-z]{3}/g);
            const hasMultipleExtensions = extensionMatches && extensionMatches.length == 1;
            if (!(isValidExtension && hasMultipleExtensions)) {
                try {
                    fs.unlinkSync(cdcFile.filepath);
                } catch (err) {
                    console.error('Erreur suppression fichier non conforme :', err);
                }
                return res.status(400).json({
                    success: false,
                    message: 'Le type de fichier est invalide ou suspect. Seuls les fichiers PDF simples sont acceptés.',
                });
            }
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
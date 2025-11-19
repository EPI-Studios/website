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

    console.log('Environment variables:', {
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        user: process.env.EMAIL_USER,
        from: process.env.EMAIL_FROM
    });

    const form = formidable({
        maxFieldsSize: 10 * 1024 * 1024, // 10MB
    });

    try {
        const [fields, files] = await form.parse(req);
        console.log('Form parsed successfully');

        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: parseInt(process.env.EMAIL_PORT),
            secure: process.env.EMAIL_PORT === '465',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        let emailContent = '<h1>Nouvelle candidature !</h1>';
        for (const key in fields) {
            const value = Array.isArray(fields[key]) ? fields[key][0] : fields[key];
            emailContent += `<p><strong>${key.replace(/(<([^>]+)>)/ig, '')}:</strong> ${value.replace(/(<([^>]+)>)/ig, '')}</p>`;
        }

        const cvFile = files.cv?.[0];
        let attachments = [];
        if (cvFile && cvFile.originalFilename) {
            const originalName = cvFile.originalFilename.toLocaleLowerCase();
            const isValidExtension = originalName.endsWith(".pdf")
            const extensionMatches = originalName.match(/\.[A-z]{3}/g);
            const hasMultipleExtensions = extensionMatches && extensionMatches.length == 1;
            if (!(isValidExtension && hasMultipleExtensions)) {
                try {
                    fs.unlinkSync(cvFile.filepath);
                } catch (err) {
                    console.error('Erreur suppression fichier non conforme :', err);
                }
                return res.status(400).json({
                    success: false,
                    message: 'Le type de fichier est invalide ou suspect. Seuls les fichiers PDF simples sont acceptés.',
                });
            }
            attachments.push({
                filename: cvFile.originalFilename,
                content: fs.createReadStream(cvFile.filepath),
                contentType: cvFile.mimetype,
            });
        }

        const poste = Array.isArray(fields.poste) ? fields.poste[0] : (fields.poste || 'Non spécifié');
        const applicantEmail = Array.isArray(fields.email) ? fields.email[0] : fields.email;
        const applicantName = Array.isArray(fields.firstname) ? fields.firstname[0] : (fields.firstname || 'Candidat');

        await transporter.sendMail({
            from: `"Site EPI Studios" <${process.env.EMAIL_FROM}>`,
            to: 'contact@epistudios.fr',
            cc: 'gael.tournier@epistudios.fr, nathan.poulain@epistudios.fr',
            subject: `Nouvelle candidature : ${poste}`,
            html: emailContent,
            attachments: attachments,
        });
        if (applicantEmail) {
            const firstName = Array.isArray(fields.firstname) ? fields.firstname[0] : fields.firstname;
            const lastName = Array.isArray(fields.name) ? fields.name[0] : fields.name;
            const fullName = `${firstName} ${lastName}`;

            await transporter.sendMail({
                from: `"EPI Studios" <${process.env.EMAIL_FROM}>`,
                to: applicantEmail,
                subject: 'Confirmation de réception de votre candidature - EPI Studios',
                html: `
                    <h1>Bonjour ${fullName.replace(/(<([^>]+)>)/ig, '')},</h1>
                    
                    <p>Nous avons bien reçu votre candidature pour le poste de <strong>${poste.replace(/(<([^>]+)>)/ig, '')}</strong> au sein d'EPI Studios.</p>
                    
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
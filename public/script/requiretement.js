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

    console.log('Environment variables:', {
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        user: process.env.EMAIL_USER,
        from: process.env.EMAIL_FROM
    });

    const form = formidable({});

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
            emailContent += `<p><strong>${key}:</strong> ${value}</p>`;
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
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <style>
                            body {
                                margin: 0;
                                padding: 0;
                                font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                                background-color: #F2F1EC;
                                color: #536056;
                            }
                            .container {
                                max-width: 600px;
                                margin: 0 auto;
                                background-color: #FFFFFF;
                                border-radius: 15px;
                                overflow: hidden;
                                box-shadow: 0 4px 15px rgba(0,0,0,0.07);
                            }
                            .header {
                                background-color: #536056;
                                padding: 40px 20px;
                                text-align: center;
                            }
                            .header h1 {
                                color: #F2F1EC;
                                margin: 0;
                                font-size: 28px;
                                font-weight: 700;
                            }
                            .content {
                                padding: 40px 30px;
                                line-height: 1.6;
                            }
                            .content h2 {
                                color: #536056;
                                font-size: 22px;
                                margin-top: 0;
                                margin-bottom: 20px;
                            }
                            .content p {
                                margin: 15px 0;
                                font-size: 16px;
                            }
                            .highlight {
                                background-color: #DADCD9;
                                padding: 20px;
                                border-radius: 10px;
                                margin: 25px 0;
                            }
                            .footer {
                                background-color: #DADCD9;
                                padding: 30px 20px;
                                text-align: center;
                                font-size: 14px;
                            }
                            .footer a {
                                color: #536056;
                                text-decoration: none;
                            }
                            .footer a:hover {
                                text-decoration: underline;
                            }
                            strong {
                                color: #3f4841;
                                font-weight: 600;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <div class="header">
                                <h1>EPI STUDIOS</h1>
                            </div>
                            
                            <div class="content">
                                <h2>Bonjour ${fullName},</h2>
                                
                                <p>Nous avons bien reçu votre candidature pour le poste de <strong>${poste}</strong> au sein d'EPI Studios.</p>
                                
                                <div class="highlight">
                                    <p style="margin: 0;">Votre demande est actuellement en cours d'examen par notre équipe. Nous étudions avec attention chaque candidature et nous efforçons de répondre dans les meilleurs délais.</p>
                                </div>
                                
                                <p>En cas de questions, n'hésitez pas à nous contacter à l'adresse : <a href="mailto:contact@epistudios.fr" style="color: #536056;">contact@epistudios.fr</a></p>
                                
                                <p>Merci pour votre intérêt pour EPI Studios !</p>
                                
                                <p style="margin-top: 30px;">
                                    Cordialement,<br>
                                    <strong>L'équipe EPI Studios</strong>
                                </p>
                            </div>
                            
                            <div class="footer">
                                <p>Association Loi 1901 créée le 24/08/25</p>
                                <p>
                                    <a href="https://epistudios.fr">epistudios.fr</a> | 
                                    <a href="mailto:contact@epistudios.fr">contact@epistudios.fr</a>
                                </p>
                            </div>
                        </div>
                    </body>
                    </html>
                `,
            });
        }

        res.status(200).json({ success: true, message: 'Candidature envoyée avec succès !' });

    } catch (error) {
        console.error("Erreur lors du traitement du formulaire:", error);
        res.status(500).json({ success: false, message: 'Erreur serveur.', error: error.message });
    }
}
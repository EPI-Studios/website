import fs from 'fs';
import path from 'path';

// --- Configuration ---
// Mappage des noms de fichiers vers les nouvelles URL propres.
const linkMappings = {
  'index.html': '/',
  'services.html': '/services',
  'projets.html': '/projets',
  'recrutements.html': '/recrutements',
  'mentions.html': '/mentions',
  'cgv.html': '/cgv',
  'credits.html': '/credits',
};

// Chemin vers le dossier contenant vos fichiers HTML.
const templatesDir = path.join(process.cwd(), 'public', 'templates');

// --- Logique du Script ---
console.log('🚀 Démarrage de la mise à jour des liens HTML...');

try {
  // Lire la liste des fichiers dans le dossier des templates.
  const files = fs.readdirSync(templatesDir);
  const htmlFiles = files.filter(file => file.endsWith('.html'));

  if (htmlFiles.length === 0) {
    console.warn('⚠️ Aucun fichier HTML trouvé dans', templatesDir);
    process.exit(0);
  }

  let totalReplacements = 0;

  // Parcourir chaque fichier HTML.
  htmlFiles.forEach(fileName => {
    const filePath = path.join(templatesDir, fileName);
    let content = fs.readFileSync(filePath, 'utf8');
    let replacementsInFile = 0;
    
    // Appliquer chaque règle de remplacement sur le contenu du fichier.
    for (const [oldFileName, newUrl] of Object.entries(linkMappings)) {
      // Regex pour trouver les liens pointant vers le fichier cible.
      // Gère les cas comme : href="services.html", href="./services.html", href="../templates/services.html"
      const pattern = new RegExp(`href=(["'])(?:\\.{1,2}\\/templates\\/|\\.\\/)?${oldFileName}\\1`, 'g');
      
      // Compter les correspondances avant de remplacer.
      const matches = content.match(pattern);
      if (matches) {
        replacementsInFile += matches.length;
      }
      
      // Remplacer par la nouvelle URL propre.
      content = content.replace(pattern, `href="${newUrl}"`);
    }

    if (replacementsInFile > 0) {
      // Écrire le contenu mis à jour dans le fichier.
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ ${fileName}: ${replacementsInFile} lien(s) mis à jour.`);
      totalReplacements += replacementsInFile;
    } else {
      console.log(`- ${fileName}: Aucun lien à mettre à jour.`);
    }
  });

  console.log(`\n✨ Terminé ! ${totalReplacements} remplacements effectués au total.`);

} catch (error) {
  console.error('\n❌ Une erreur est survenue :', error.message);
  process.exit(1);
}
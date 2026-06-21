import fs from 'fs';
import path from 'path';

function replaceInDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            replaceInDir(fullPath);
        } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            if (content.includes('https://e-commerce-njbk.onrender.com')) {
                content = content.replace(/https:\/\/e-commerce-njbk\.onrender\.com/g, 'http://localhost:3000');
                fs.writeFileSync(fullPath, content);
                console.log(`Updated ${fullPath}`);
            }
        }
    }
}
replaceInDir('./src');
console.log('Done replacing URLs!');

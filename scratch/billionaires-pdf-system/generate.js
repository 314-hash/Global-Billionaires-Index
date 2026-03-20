const fs = require('fs');
const puppeteer = require('puppeteer');
const path = require('path');
const generateBillionaires = require('./data.js');

(async () => {
    try {
        console.log('📊 Generating 200-item billionaire dataset...');
        const data = generateBillionaires();
        
        // Split data into chunks of 50 for separate tables/sections
        const chunkSize = 50;
        const chunks = [];
        for (let i = 0; i < data.length; i += chunkSize) {
            chunks.push(data.slice(i, i + chunkSize));
        }

        console.log('📝 Hydrating HTML template...');
        let tablesHtml = '';
        
        chunks.forEach((chunk, index) => {
            const startRank = index * chunkSize + 1;
            const endRank = startRank + chunk.length - 1;
            
            tablesHtml += `
            <div class="section-container">
                <div class="section-header">
                    Top ${startRank}–${endRank}
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Nationality</th>
                            <th>Religion</th>
                            <th>Known For</th>
                            <th>Relationship</th>
                            <th>Political</th>
                            <th>Net Worth</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
            
            chunk.forEach(person => {
                tablesHtml += `
                        <tr>
                            <td>${person.name}</td>
                            <td>${person.age}</td>
                            <td>${person.nationality}</td>
                            <td>${person.religion}</td>
                            <td>${person.knownFor}</td>
                            <td>${person.relationshipStatus}</td>
                            <td>${person.politicalAffiliation}</td>
                            <td>${person.netWorth}</td>
                        </tr>
                `;
            });
            
            tablesHtml += `
                    </tbody>
                </table>
            </div>
            `;
        });

        const templatePath = path.join(__dirname, 'index.html');
        let template = fs.readFileSync(templatePath, 'utf8');
        
        // Inject content into the template
        const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        template = template.replace('{{TABLES_CONTENT}}', tablesHtml);
        template = template.replace('{{DATE}}', today);
        
        // Write hydrated template to a temporary HTML file for Puppeteer
        const tempHtmlPath = path.join(__dirname, 'generated_report.html');
        fs.writeFileSync(tempHtmlPath, template);

        console.log('🚀 Launching Puppeteer browser exporter...');
        const browser = await puppeteer.launch({ headless: 'new' });
        const page = await browser.newPage();
        
        // Load the local HTML file into Puppeteer
        const fileUrl = 'file://' + tempHtmlPath.replace(/\\/g, '/');
        await page.goto(fileUrl, { waitUntil: 'networkidle0' });

        console.log('🖨️  Exporting layout to PDF...');
        const outputPath = path.join(__dirname, 'output.pdf');
        await page.pdf({
            path: outputPath,
            format: 'A4',
            printBackground: true, // Crucial for retaining colors and backgrounds in output
            margin: {
                top: '0px',
                bottom: '0px',
                left: '0px',
                right: '0px'
            },
            displayHeaderFooter: false
        });

        await browser.close();
        
        // Cleanup the temporary HTML file to keep the workspace tidy
        fs.unlinkSync(tempHtmlPath);

        console.log(`✅ Success! High-quality PDF generated at: \n${outputPath}`);
    } catch (error) {
        console.error('❌ Error during generation:', error);
        process.exit(1);
    }
})();

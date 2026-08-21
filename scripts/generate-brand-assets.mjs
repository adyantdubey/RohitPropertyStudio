import sharp from "sharp";

const width = 1680;
const height = 941;

const artwork = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="1680" height="941" fill="#F3EFE6"/>
  <rect x="1082" width="598" height="941" fill="#0D1730"/>

  <g fill="none" stroke="#17264A" stroke-width="1" opacity="0.22">
    <path d="M76 80H1012M76 861H1012M76 80V861M1012 80V861"/>
    <path d="M76 220H1082M76 742H1082M418 80V861M772 80V861" stroke-dasharray="7 9"/>
  </g>

  <g fill="none" stroke="#B99A48" stroke-width="2">
    <path d="M76 164H366"/>
    <circle cx="76" cy="164" r="6" fill="#B99A48"/>
    <circle cx="366" cy="164" r="4" fill="#B99A48"/>
    <path d="M1012 220H1250V458" opacity="0.9"/>
    <circle cx="1250" cy="458" r="7" fill="#B99A48"/>
  </g>

  <text x="76" y="132" fill="#17264A" font-family="Arial, sans-serif" font-size="23" font-weight="700" letter-spacing="8">ROHITT KUMAR SINGH</text>
  <text x="76" y="346" fill="#111511" font-family="Georgia, serif" font-size="101" font-weight="400" letter-spacing="-5">REAL ESTATE,</text>
  <text x="76" y="457" fill="#111511" font-family="Georgia, serif" font-size="101" font-style="italic" font-weight="400" letter-spacing="-5">MADE LEGIBLE.</text>
  <text x="80" y="526" fill="#596268" font-family="Arial, sans-serif" font-size="21" font-weight="600" letter-spacing="2">CLEAR THINKING FOR CONFIDENT PROPERTY DECISIONS.</text>

  <g transform="translate(80 674)">
    <rect width="14" height="14" fill="#B99A48"/>
    <text x="34" y="13" fill="#17264A" font-family="Arial, sans-serif" font-size="18" font-weight="700" letter-spacing="2">MANAGING DIRECTOR</text>
    <text x="34" y="46" fill="#596268" font-family="Arial, sans-serif" font-size="18" font-weight="500" letter-spacing="1.4">HUNDRED YARDS REALTOR PVT LTD</text>
  </g>

  <g transform="translate(1190 220) scale(5.2)" fill="none" stroke="#D9C47B" stroke-linecap="square">
    <path d="M6 17V6h11M47 6h11v11M58 47v11H47M17 58H6V47M6 51h52" stroke-width="1" opacity="0.42"/>
    <path d="M9 44V20h7c4.7 0 7 2.2 7 6s-2.3 6-7 6H9m7 0 8 12M29 20v24m13-24L29 33m13 11-9-14m24-21.5c-2.3-2.7-6.8-3.6-9.5-.9-2.9 2.9-.8 7 3.8 8.6 5 1.8 7.2 5.7 4.7 9.7-2.4 3.9-8.3 4.2-12 .4" stroke-width="1.8"/>
    <circle cx="6" cy="51" r="1.7" fill="#D9C47B" stroke="none"/>
  </g>

  <text x="1190" y="705" fill="#F3EFE6" font-family="Georgia, serif" font-size="42">RKS Property Studio</text>
  <text x="1192" y="753" fill="#D9C47B" font-family="Arial, sans-serif" font-size="17" font-weight="700" letter-spacing="3">ADVISORY / ACADEMY / INSIGHTS</text>
  <path d="M1192 807H1576" stroke="#F3EFE6" stroke-width="1" opacity="0.28"/>
  <text x="1192" y="844" fill="#F3EFE6" opacity="0.64" font-family="Arial, sans-serif" font-size="15" letter-spacing="2">BENGALURU / REAL ESTATE</text>
</svg>`;

const faviconArtwork = `
<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <rect width="64" height="64" fill="#0D1730"/>
  <path d="M8 17V8h9M47 8h9v9M56 47v9h-9M17 56H8v-9M8 51h48" fill="none" stroke="#D9C47B" stroke-width="1" opacity="0.72"/>
  <text x="32" y="39" fill="#F3EFE6" font-family="Georgia, serif" font-size="22" text-anchor="middle">RKS</text>
  <circle cx="8" cy="51" r="2" fill="#D9C47B"/>
</svg>`;

const faviconPng = await sharp(Buffer.from(faviconArtwork))
  .png({ compressionLevel: 9 })
  .toBuffer();
const faviconHeader = Buffer.alloc(22);
faviconHeader.writeUInt16LE(0, 0);
faviconHeader.writeUInt16LE(1, 2);
faviconHeader.writeUInt16LE(1, 4);
faviconHeader.writeUInt8(64, 6);
faviconHeader.writeUInt8(64, 7);
faviconHeader.writeUInt16LE(1, 10);
faviconHeader.writeUInt16LE(32, 12);
faviconHeader.writeUInt32LE(faviconPng.length, 14);
faviconHeader.writeUInt32LE(22, 18);

await Promise.all([
  sharp(Buffer.from(artwork)).png({ compressionLevel: 9 }).toFile("public/og-cinematic.png"),
  sharp(Buffer.from(artwork)).resize(1200, 672).png({ compressionLevel: 9 }).toFile("public/og.png"),
  import("node:fs/promises").then(({ writeFile }) =>
    writeFile("public/favicon.ico", Buffer.concat([faviconHeader, faviconPng])),
  ),
]);

console.log("Generated Rohitt Kumar Singh social images and favicon.");

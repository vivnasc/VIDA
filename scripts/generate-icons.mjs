import sharp from "sharp";
import { writeFileSync } from "fs";
import { join } from "path";

const SIZES = [72, 96, 128, 144, 152, 192, 384, 512];
const S = 512;
const CX = S / 2;
const CY = S / 2;

// C-arc parameters
const R = 148;
const SW = 60;
const CIRC = 2 * Math.PI * R;
const GAP_DEG = 75;
const GAP = (CIRC * GAP_DEG) / 360;
const DASH = CIRC - GAP;
const ROTATE = -45;

const apps = {
  familia: {
    color: "#FF6B35",
    // 4 dots in a cluster representing family
    innerIcon: `
      <circle cx="237" cy="238" r="21" fill="white"/>
      <circle cx="283" cy="238" r="21" fill="white"/>
      <circle cx="237" cy="284" r="21" fill="white"/>
      <circle cx="283" cy="284" r="21" fill="white"/>
    `,
  },
  dinheiro: {
    color: "#0D9488",
    // 3 ascending bar chart
    innerIcon: `
      <rect x="212" y="268" width="28" height="52" rx="5" fill="white"/>
      <rect x="246" y="232" width="28" height="88" rx="5" fill="white"/>
      <rect x="280" y="196" width="28" height="124" rx="5" fill="white"/>
    `,
  },
  lar: {
    color: "#3B82F6",
    // House silhouette
    innerIcon: `
      <path d="M258 205 L318 260 L308 260 L308 318 L276 318 L276 278 L240 278 L240 318 L208 318 L208 260 L198 260 Z" fill="white"/>
    `,
  },
  saude: {
    color: "#F43F5E",
    // Medical cross
    innerIcon: `
      <rect x="239" y="208" width="38" height="114" rx="8" fill="white"/>
      <rect x="220" y="246" width="76" height="38" rx="8" fill="white"/>
    `,
  },
  landing: {
    color: "#FF6B35",
    // Single dot - VIDA master brand
    innerIcon: `
      <circle cx="260" cy="261" r="32" fill="white"/>
    `,
  },
};

function makeSvg(appName) {
  const { color, innerIcon } = apps[appName];
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${S} ${S}" width="${S}" height="${S}">
  <rect width="${S}" height="${S}" fill="${color}"/>
  <circle cx="${CX}" cy="${CY}" r="${R}" fill="none" stroke="white" stroke-width="${SW}" stroke-linecap="round" stroke-dasharray="${DASH.toFixed(1)} ${GAP.toFixed(1)}" transform="rotate(${ROTATE}, ${CX}, ${CY})"/>
  ${innerIcon}
</svg>`;
}

async function main() {
  for (const [appName, config] of Object.entries(apps)) {
    const iconsDir = join("/home/user/VIDA/apps", appName, "public/icons");
    const publicDir = join("/home/user/VIDA/apps", appName, "public");

    for (const size of SIZES) {
      const svgBuf = Buffer.from(makeSvg(appName));
      const outPath = join(iconsDir, `icon-${size}x${size}.png`);
      await sharp(svgBuf).resize(size, size).png().toFile(outPath);
      console.log(`  ${appName}/icons/icon-${size}x${size}.png`);
    }

    // Save favicon.svg
    writeFileSync(join(publicDir, "favicon.svg"), makeSvg(appName));
    console.log(`  ${appName}/favicon.svg`);
  }
  console.log("\nDone!");
}

main().catch(console.error);

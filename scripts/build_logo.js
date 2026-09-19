import fs from 'fs';
import sharp from 'sharp';

const svgContent = `<svg viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
  <defs>
    <!-- Master Lotus Gold Gradients -->
    <linearGradient id="goldPetalBase" x1="512" y1="20" x2="512" y2="300" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#FFF8B8"/>
      <stop offset="15%" stop-color="#FCD654"/>
      <stop offset="45%" stop-color="#E2A624"/>
      <stop offset="78%" stop-color="#A57011"/>
      <stop offset="100%" stop-color="#674204"/>
    </linearGradient>

    <linearGradient id="goldPetalRidge" x1="512" y1="25" x2="512" y2="285" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="35%" stop-color="#FFF3A8"/>
      <stop offset="70%" stop-color="#F3C33D"/>
      <stop offset="100%" stop-color="#B88015"/>
    </linearGradient>

    <linearGradient id="goldPetalShadow" x1="512" y1="20" x2="512" y2="300" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#8B5B08" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#4E2F02" stop-opacity="0.95"/>
    </linearGradient>

    <!-- Concentric Gold Rings Gradient -->
    <radialGradient id="outerGoldRingGrad" cx="512" cy="512" r="460" fx="440" fy="440" gradientUnits="userSpaceOnUse">
      <stop offset="65%" stop-color="#FEE88C"/>
      <stop offset="78%" stop-color="#EBB32F"/>
      <stop offset="88%" stop-color="#B57A10"/>
      <stop offset="95%" stop-color="#FCE072"/>
      <stop offset="100%" stop-color="#7A4D05"/>
    </radialGradient>

    <linearGradient id="goldRingBevel" x1="200" y1="200" x2="824" y2="824" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#FFFBD0"/>
      <stop offset="30%" stop-color="#F3C43B"/>
      <stop offset="70%" stop-color="#A66F0F"/>
      <stop offset="100%" stop-color="#FFF199"/>
    </linearGradient>

    <!-- Inner Navy Blue Medallion Gradient -->
    <radialGradient id="navyMedallionGrad" cx="512" cy="460" r="320" fx="500" fy="410" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#182E84"/>
      <stop offset="38%" stop-color="#0E1C5E"/>
      <stop offset="75%" stop-color="#070E3A"/>
      <stop offset="100%" stop-color="#03061E"/>
    </radialGradient>

    <!-- Crown Gold Gradient -->
    <linearGradient id="crownGold" x1="512" y1="230" x2="512" y2="540" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#FFFDE0"/>
      <stop offset="18%" stop-color="#FFDD55"/>
      <stop offset="48%" stop-color="#F5A313"/>
      <stop offset="80%" stop-color="#C97505"/>
      <stop offset="100%" stop-color="#8F4D02"/>
    </linearGradient>

    <!-- Drop Shadows -->
    <filter id="lotusDropShadow" x="-15%" y="-15%" width="130%" height="130%">
      <feDropShadow dx="0" dy="12" stdDeviation="12" flood-color="#261301" flood-opacity="0.6"/>
    </filter>

    <filter id="medallionShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="8" flood-color="#000000" flood-opacity="0.5"/>
    </filter>

    <filter id="sbstdShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="6" stdDeviation="4" flood-color="#020412" flood-opacity="0.9"/>
    </filter>

    <filter id="deityAura" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#FFD54F" flood-opacity="0.3"/>
    </filter>

    <!-- Circular Arcs for Text Path -->
    <!-- Top Arc (starts at ~185 deg to ~-5 deg) -->
    <path id="topTextArc" d="M 160,512 A 352,352 0 1,1 864,512" fill="none"/>
    <!-- Bottom Arc (starts at ~160 deg to ~20 deg) -->
    <path id="bottomTextArc" d="M 212,512 A 300,300 0 0,0 812,512" fill="none"/>

    <!-- 1. Master Outer Lotus Petal Definition -->
    <g id="masterPetal">
      <!-- Deep Petal Base Shading -->
      <path d="M 512,18 C 484,86 438,158 438,218 C 438,254 466,282 512,290 C 558,282 586,254 586,218 C 586,158 540,86 512,18 Z" fill="url(#goldPetalShadow)"/>
      <!-- Main Golden Body -->
      <path d="M 512,24 C 487,88 444,154 444,212 C 444,246 470,274 512,282 C 554,274 580,246 580,212 C 580,154 537,88 512,24 Z" fill="url(#goldPetalBase)"/>
      <!-- Left Shading Flank -->
      <path d="M 512,28 C 490,92 448,154 448,212 C 448,244 470,270 508,280 L 512,28 Z" fill="#9C6B0D" opacity="0.38"/>
      <!-- Right Golden Sheen -->
      <path d="M 512,28 L 516,280 C 554,270 576,244 576,212 C 576,154 534,92 512,28 Z" fill="#FFF8C4" opacity="0.42"/>
      <!-- Crisp Center Spine Ridge -->
      <path d="M 512,28 L 507,212 C 507,242 512,278 512,282 C 512,278 517,242 517,212 L 512,28 Z" fill="url(#goldPetalRidge)"/>
    </g>

    <!-- 2. Interleaved Smaller Petal Definition -->
    <g id="innerPetal">
      <path d="M 512,70 C 496,120 472,170 472,216 C 472,244 490,264 512,270 C 534,264 552,244 552,216 C 552,170 528,120 512,70 Z" fill="#6E4403"/>
      <path d="M 512,78 C 498,124 476,172 476,214 C 476,238 492,258 512,264 C 532,258 548,238 548,214 C 548,172 526,124 512,78 Z" fill="url(#goldPetalBase)"/>
      <line x1="512" y1="80" x2="512" y2="260" stroke="#FFFCE6" stroke-width="3.5" stroke-linecap="round"/>
    </g>
  </defs>

  <!-- ==================== LAYER 1: 32-PETAL 3D GOLDEN LOTUS MANDALA ==================== -->
  <g filter="url(#lotusDropShadow)">
    <!-- 16 Interleaved Secondary Petals (Rotated 11.25 deg) -->
    <g transform="rotate(11.25 512 512)"><use href="#innerPetal"/></g>
    <g transform="rotate(33.75 512 512)"><use href="#innerPetal"/></g>
    <g transform="rotate(56.25 512 512)"><use href="#innerPetal"/></g>
    <g transform="rotate(78.75 512 512)"><use href="#innerPetal"/></g>
    <g transform="rotate(101.25 512 512)"><use href="#innerPetal"/></g>
    <g transform="rotate(123.75 512 512)"><use href="#innerPetal"/></g>
    <g transform="rotate(146.25 512 512)"><use href="#innerPetal"/></g>
    <g transform="rotate(168.75 512 512)"><use href="#innerPetal"/></g>
    <g transform="rotate(191.25 512 512)"><use href="#innerPetal"/></g>
    <g transform="rotate(213.75 512 512)"><use href="#innerPetal"/></g>
    <g transform="rotate(236.25 512 512)"><use href="#innerPetal"/></g>
    <g transform="rotate(258.75 512 512)"><use href="#innerPetal"/></g>
    <g transform="rotate(281.25 512 512)"><use href="#innerPetal"/></g>
    <g transform="rotate(303.75 512 512)"><use href="#innerPetal"/></g>
    <g transform="rotate(326.25 512 512)"><use href="#innerPetal"/></g>
    <g transform="rotate(348.75 512 512)"><use href="#innerPetal"/></g>

    <!-- 16 Primary Sculpted Golden Petals -->
    <g><use href="#masterPetal"/></g>
    <g transform="rotate(22.5 512 512)"><use href="#masterPetal"/></g>
    <g transform="rotate(45 512 512)"><use href="#masterPetal"/></g>
    <g transform="rotate(67.5 512 512)"><use href="#masterPetal"/></g>
    <g transform="rotate(90 512 512)"><use href="#masterPetal"/></g>
    <g transform="rotate(112.5 512 512)"><use href="#masterPetal"/></g>
    <g transform="rotate(135 512 512)"><use href="#masterPetal"/></g>
    <g transform="rotate(157.5 512 512)"><use href="#masterPetal"/></g>
    <g transform="rotate(180 512 512)"><use href="#masterPetal"/></g>
    <g transform="rotate(202.5 512 512)"><use href="#masterPetal"/></g>
    <g transform="rotate(225 512 512)"><use href="#masterPetal"/></g>
    <g transform="rotate(247.5 512 512)"><use href="#masterPetal"/></g>
    <g transform="rotate(270 512 512)"><use href="#masterPetal"/></g>
    <g transform="rotate(292.5 512 512)"><use href="#masterPetal"/></g>
    <g transform="rotate(315 512 512)"><use href="#masterPetal"/></g>
    <g transform="rotate(337.5 512 512)"><use href="#masterPetal"/></g>
  </g>

  <!-- ==================== LAYER 2: OUTER SCULPTED GOLDEN RIMS ==================== -->
  <circle cx="512" cy="512" r="430" fill="url(#outerGoldRingGrad)" stroke="#674102" stroke-width="5"/>
  <circle cx="512" cy="512" r="414" fill="#E4AF2C" stroke="#FFF7C8" stroke-width="3.5"/>
  <circle cx="512" cy="512" r="404" fill="#754704" stroke="#503001" stroke-width="2"/>

  <!-- ==================== LAYER 3: WHITE CONCENTRIC INSCRIPTION TRACK ==================== -->
  <circle cx="512" cy="512" r="398" fill="#FFFFFF" stroke="#D4AF37" stroke-width="3"/>

  <!-- Top Inscription: 'Sri Sridevi Bhudevi Sametha Sri Thirumalanadha' -->
  <text fill="#C21834" font-family="'Poppins', 'Segoe UI', Arial, sans-serif" font-size="34" font-weight="900" letter-spacing="0.5">
    <textPath href="#topTextArc" startOffset="50%" text-anchor="middle">
      Sri Sridevi Bhudevi Sametha Sri Thirumalanadha
    </textPath>
  </text>

  <!-- Bottom Inscription: 'Devasthanam' -->
  <text fill="#C21834" font-family="'Poppins', 'Segoe UI', Arial, sans-serif" font-size="46" font-weight="900" letter-spacing="2">
    <textPath href="#bottomTextArc" startOffset="50%" text-anchor="middle">
      Devasthanam
    </textPath>
  </text>

  <!-- Flanking Golden 4-Petal Diamond Florets (Left & Right) -->
  <!-- Left Floret at 9 o'clock -->
  <g transform="translate(138, 512) scale(1.8)">
    <path d="M 0,-10 L 4,-3 L 11,0 L 4,3 L 0,10 L -4,3 L -11,0 L -4,-3 Z" fill="url(#goldRingBevel)" stroke="#8C5C0B" stroke-width="0.8"/>
    <circle cx="0" cy="0" r="3.2" fill="#C21834"/>
  </g>
  <!-- Right Floret at 3 o'clock -->
  <g transform="translate(886, 512) scale(1.8)">
    <path d="M 0,-10 L 4,-3 L 11,0 L 4,3 L 0,10 L -4,3 L -11,0 L -4,-3 Z" fill="url(#goldRingBevel)" stroke="#8C5C0B" stroke-width="0.8"/>
    <circle cx="0" cy="0" r="3.2" fill="#C21834"/>
  </g>

  <!-- ==================== LAYER 4: INNER MEDALLION WITH DEEP NAVY BLUE FIELD ==================== -->
  <!-- Inner Gold Beveled Ring -->
  <circle cx="512" cy="512" r="294" fill="#9C6B0D" stroke="#EAB32F" stroke-width="5"/>
  <circle cx="512" cy="512" r="286" fill="url(#navyMedallionGrad)" stroke="#1F348C" stroke-width="3" filter="url(#medallionShadow)"/>

  <!-- ==================== LAYER 5: SACRED DEITY, AYUDHAS & ICONOGRAPHY ==================== -->
  <g filter="url(#deityAura)">

    <!-- 1. LEFT AYUDHA: SUDARSHANA CHAKRA (Divine Discus with Flaming Rays & Ruby Core) -->
    <g transform="translate(352, 474) scale(1.3)">
      <!-- Golden Radiant Rays -->
      <circle cx="0" cy="0" r="34" fill="#FFD54F" opacity="0.3"/>
      <!-- 8 Flaming Diamond Prongs -->
      <path d="M 0,-36 L 5,-28 L -5,-28 Z" fill="#FFA000"/>
      <path d="M 0,36 L 5,28 L -5,28 Z" fill="#FFA000"/>
      <path d="M -36,0 L -28,5 L -28,-5 Z" fill="#FFA000"/>
      <path d="M 36,0 L 28,5 L 28,-5 Z" fill="#FFA000"/>
      <path d="M -25,-25 L -22,-16 L -16,-22 Z" fill="#FFB300"/>
      <path d="M 25,-25 L 22,-16 L 16,-22 Z" fill="#FFB300"/>
      <path d="M -25,25 L -22,16 L -16,22 Z" fill="#FFB300"/>
      <path d="M 25,25 L 22,16 L 16,22 Z" fill="#FFB300"/>
      <!-- Ornate Gold Wheels -->
      <circle cx="0" cy="0" r="28" fill="url(#crownGold)" stroke="#8A5A00" stroke-width="2"/>
      <circle cx="0" cy="0" r="19" fill="#FF8F00" stroke="#FFF7BD" stroke-width="1.8"/>
      <!-- Central Brilliant Red Ruby Gem with Gold Rim -->
      <circle cx="0" cy="0" r="11" fill="#C21834" stroke="#FFE58F" stroke-width="2"/>
      <circle cx="-3.5" cy="-3.5" r="3.2" fill="#FF8A98" opacity="0.9"/>
    </g>

    <!-- 2. RIGHT AYUDHA: PANCHAJANYA SHANKHA (Divine Conch Shell with Flaming Rays & Ruby Core) -->
    <g transform="translate(672, 474) scale(1.3)">
      <!-- Golden Radiant Rays -->
      <circle cx="0" cy="0" r="34" fill="#FFD54F" opacity="0.3"/>
      <!-- 8 Flaming Diamond Prongs -->
      <path d="M 0,-36 L 5,-28 L -5,-28 Z" fill="#FFA000"/>
      <path d="M 0,36 L 5,28 L -5,28 Z" fill="#FFA000"/>
      <path d="M -36,0 L -28,5 L -28,-5 Z" fill="#FFA000"/>
      <path d="M 36,0 L 28,5 L 28,-5 Z" fill="#FFA000"/>
      <path d="M -25,-25 L -22,-16 L -16,-22 Z" fill="#FFB300"/>
      <path d="M 25,-25 L 22,-16 L 16,-22 Z" fill="#FFB300"/>
      <path d="M -25,25 L -22,16 L -16,22 Z" fill="#FFB300"/>
      <path d="M 25,25 L 22,16 L 16,22 Z" fill="#FFB300"/>
      <!-- Ornate Gold Outer Shell -->
      <circle cx="0" cy="0" r="28" fill="url(#crownGold)" stroke="#8A5A00" stroke-width="2"/>
      <!-- Conch Shell Spiral Form (Ivory & Gold) -->
      <path d="M -9,-17 C 7,-19 18,-11 18,2 C 18,13 9,19 -2,17 C -11,15 -15,7 -13,-4 C -11,-13 -3,-15 -9,-17 Z" fill="#FFFCE8" stroke="#D4AF37" stroke-width="1.8"/>
      <!-- Central Brilliant Red Ruby Gem with Gold Rim -->
      <circle cx="0" cy="0" r="10.5" fill="#C21834" stroke="#FFE58F" stroke-width="2"/>
      <circle cx="-3" cy="-3" r="3" fill="#FF8A98" opacity="0.9"/>
    </g>

    <!-- 3. LORD SRI TIRUMALANADHA SWAMY (LORD VENKATESWARA) -->
    <g transform="translate(512, 422)">
      
      <!-- A. TALL SCULPTED GOLDEN KIREETAM (CROWN) -->
      <!-- Crown Kalasha / Finial Crest -->
      <path d="M -6,-186 L 0,-202 L 6,-186 Z" fill="#FFF2A3"/>
      <circle cx="0" cy="-180" r="7" fill="#FFD54F" stroke="#8A5A00" stroke-width="1.5"/>
      <circle cx="0" cy="-180" r="3" fill="#C21834"/>
      
      <!-- Crown Tier 1 (Cone Top) -->
      <path d="M -16,-144 L 16,-144 L 11,-174 L -11,-174 Z" fill="url(#crownGold)" stroke="#8A5A00" stroke-width="1.8"/>
      <circle cx="0" cy="-158" r="4" fill="#C21834"/>
      <circle cx="-6" cy="-158" r="2" fill="#FFF"/>
      <circle cx="6" cy="-158" r="2" fill="#FFF"/>

      <!-- Crown Tier 2 -->
      <path d="M -28,-106 L 28,-106 L 21,-144 L -21,-144 Z" fill="url(#crownGold)" stroke="#8A5A00" stroke-width="2"/>
      <circle cx="0" cy="-125" r="5.5" fill="#1B5E20"/>
      <circle cx="-13" cy="-125" r="3" fill="#FFF"/>
      <circle cx="13" cy="-125" r="3" fill="#FFF"/>

      <!-- Crown Tier 3 (Main Jeweled Middle Band) -->
      <path d="M -40,-66 L 40,-66 L 31,-106 L -31,-106 Z" fill="url(#crownGold)" stroke="#784C07" stroke-width="2"/>
      <!-- Precious Stones Row -->
      <circle cx="-24" cy="-86" r="4.5" fill="#C21834"/>
      <circle cx="-12" cy="-86" r="4.5" fill="#1B5E20"/>
      <circle cx="0" cy="-86" r="5.5" fill="#C21834" stroke="#FFF" stroke-width="1"/>
      <circle cx="12" cy="-86" r="4.5" fill="#1B5E20"/>
      <circle cx="24" cy="-86" r="4.5" fill="#C21834"/>

      <!-- Crown Tier 4 (Base Ornate Band with Pearls) -->
      <path d="M -50,-26 L 50,-26 L 43,-66 L -43,-66 Z" fill="url(#crownGold)" stroke="#674102" stroke-width="2.2"/>
      <line x1="-42" y1="-46" x2="42" y2="-46" stroke="#FFF7BA" stroke-width="3" stroke-dasharray="3 3"/>

      <!-- Crown Bottom Curved Rim -->
      <path d="M -52,-26 C -28,-15 28,-15 52,-26 L 54,-16 C 28,-5 -28,-5 -54,-16 Z" fill="#FFE58F" stroke="#784C07" stroke-width="1.8"/>

      <!-- B. SACRED BLACK STONE COUNTENANCE (VISAGE) -->
      <path d="M -44,-20 C -46,22 -32,58 0,60 C 32,58 46,22 44,-20 C 22,-11 -22,-11 -44,-20 Z" fill="#13161D" stroke="#252932" stroke-width="2"/>

      <!-- Golden Ear Kundalas (Makara Kundalas) -->
      <!-- Left Kundala -->
      <g transform="translate(-49, 14)">
        <circle cx="0" cy="0" r="15" fill="url(#crownGold)" stroke="#6E4403" stroke-width="1.8"/>
        <circle cx="0" cy="0" r="7" fill="#C21834"/>
        <circle cx="-5" cy="0" r="4" fill="#1B5E20"/>
        <path d="M -3,15 L 0,22 L 3,15 Z" fill="#FFE58F"/>
      </g>
      <!-- Right Kundala -->
      <g transform="translate(49, 14)">
        <circle cx="0" cy="0" r="15" fill="url(#crownGold)" stroke="#6E4403" stroke-width="1.8"/>
        <circle cx="0" cy="0" r="7" fill="#C21834"/>
        <circle cx="5" cy="0" r="4" fill="#1B5E20"/>
        <path d="M -3,15 L 0,22 L 3,15 Z" fill="#FFE58F"/>
      </g>

      <!-- C. ICONIC SACRED VAISHNAVA TIRUNAMAM / NAMAM -->
      <!-- Pure White U-Shaped Namam Wings -->
      <path d="M -20,-24 L -11,-24 L -3,22 L -11,22 L -16,4 Z" fill="#FFFFFF"/>
      <path d="M 20,-24 L 11,-24 L 3,22 L 11,22 L 16,4 Z" fill="#FFFFFF"/>
      <path d="M -11,18 C -4,25 4,25 11,18 L 11,23 C 4,30 -4,30 -11,23 Z" fill="#FFFFFF"/>
      <!-- Bright Sacred Vermilion Red Kasturi / Srichoornam Centerline -->
      <path d="M -4.5,-26 L 4.5,-26 L 3.2,30 L -3.2,30 Z" fill="#E51E2B"/>
      <polygon points="0,38 -4,29 4,29" fill="#E51E2B"/>

      <!-- Divine Smile & Chin Jewel -->
      <path d="M -9,44 Q 0,49 9,44" stroke="#FFE58F" stroke-width="1.8" fill="none" stroke-linecap="round"/>
      <circle cx="0" cy="52" r="2.8" fill="#FFE58F"/>

      <!-- D. SACRED FLOWER GARLAND (MALA) OF PINK LOTUS PETALS & JASMINE -->
      <g transform="translate(0, 64)">
        <!-- Green Tulasi Foliage Layer -->
        <path d="M -64,-4 C -34,18 34,18 64,-4 C 56,24 -56,24 -64,-4 Z" fill="#1B5E20"/>
        <!-- Layer of Pink Lotus Blossoms & White Buds -->
        <circle cx="-52" cy="4" r="9" fill="#FF80AB"/>
        <circle cx="-52" cy="4" r="4.5" fill="#FFF"/>
        <circle cx="-35" cy="10" r="10" fill="#F06292"/>
        <circle cx="-35" cy="10" r="5" fill="#FFF"/>
        <circle cx="-18" cy="14" r="11" fill="#FF4081"/>
        <circle cx="-18" cy="14" r="5.5" fill="#FFE082"/>
        <circle cx="0" cy="16" r="12" fill="#E91E63"/>
        <circle cx="0" cy="16" r="6" fill="#FFF59D"/>
        <circle cx="18" cy="14" r="11" fill="#FF4081"/>
        <circle cx="18" cy="14" r="5.5" fill="#FFE082"/>
        <circle cx="35" cy="10" r="10" fill="#F06292"/>
        <circle cx="35" cy="10" r="5" fill="#FFF"/>
        <circle cx="52" cy="4" r="9" fill="#FF80AB"/>
        <circle cx="52" cy="4" r="4.5" fill="#FFF"/>
      </g>

    </g>

    <!-- ==================== LAYER 6: SBSTD BOLD WHITE 3D TYPOGRAPHY ==================== -->
    <g transform="translate(512, 650)" filter="url(#sbstdShadow)">
      <!-- Deep Contrast Border -->
      <text x="0" y="0" text-anchor="middle" font-family="'Poppins', 'Arial Black', Impact, sans-serif" font-size="78" font-weight="900" letter-spacing="4" fill="#03061A" stroke="#03061A" stroke-width="12" stroke-linejoin="round">
        SBSTD
      </text>
      <!-- Pure Crisp White Foreground -->
      <text x="0" y="0" text-anchor="middle" font-family="'Poppins', 'Arial Black', Impact, sans-serif" font-size="78" font-weight="900" letter-spacing="4" fill="#FFFFFF">
        SBSTD
      </text>
    </g>

    <!-- ==================== LAYER 7: GOLDEN FLORET & DIVIDER UNDER SBSTD ==================== -->
    <g transform="translate(512, 686)">
      <!-- Horizontal Thin Gold Accent Pinstripes -->
      <line x1="-150" y1="0" x2="-35" y2="0" stroke="#EAB32F" stroke-width="3" stroke-linecap="round"/>
      <line x1="35" y1="0" x2="150" y2="0" stroke="#EAB32F" stroke-width="3" stroke-linecap="round"/>
      
      <!-- Central Stylized 3-Petal Gold Lotus Floret -->
      <path d="M 0,-12 C -8,0 -10,14 0,26 C 10,14 8,0 0,-12 Z" fill="#FFE082" stroke="#C59B27" stroke-width="1.5"/>
      <line x1="0" y1="-8" x2="0" y2="22" stroke="#FFFBD0" stroke-width="1.2"/>
      <path d="M -4,-4 C -18,-2 -26,10 -18,20 C -11,20 -5,10 -4,-4 Z" fill="#FFCA28" stroke="#B28704" stroke-width="1.5"/>
      <path d="M 4,-4 C 18,-2 26,10 18,20 C 11,20 5,10 4,-4 Z" fill="#FFCA28" stroke="#B28704" stroke-width="1.5"/>
      <circle cx="0" cy="4" r="3.5" fill="#C21834"/>
    </g>

  </g>
</svg>`;

async function run() {
  // Save master SVG
  fs.writeFileSync('public/images/sbst-logo.svg', svgContent, 'utf-8');
  fs.writeFileSync('public/images/temple-logo.svg', svgContent, 'utf-8');

  // Convert to high-resolution PNGs with sharp
  const buffer = Buffer.from(svgContent);

  // 1024x1024 high resolution PNG
  await sharp(buffer)
    .resize(1024, 1024)
    .png({ quality: 100 })
    .toFile('public/images/logo-new.png');

  // Copy to public/logo-new.png as well so both paths resolve
  fs.copyFileSync('public/images/logo-new.png', 'public/logo-new.png');
  fs.copyFileSync('public/images/logo-new.png', 'public/images/sbst-logo.png');

  console.log('Successfully generated logo-new.png and sbst-logo.svg!');
}

run().catch(console.error);

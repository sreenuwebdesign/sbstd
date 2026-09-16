import os

os.makedirs('public/images', exist_ok=True)

def make_svg(name, content, width=800, height=600):
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#240508"/>
      <stop offset="50%" stop-color="#450A12"/>
      <stop offset="100%" stop-color="#1A0205"/>
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFE082"/>
      <stop offset="35%" stop-color="#FFD54F"/>
      <stop offset="70%" stop-color="#FFA000"/>
      <stop offset="100%" stop-color="#D4AF37"/>
    </linearGradient>
    <linearGradient id="deepGold" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFF8E1"/>
      <stop offset="40%" stop-color="#FFD54F"/>
      <stop offset="100%" stop-color="#B8860B"/>
    </linearGradient>
    <linearGradient id="flameGrad" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#D32F2F"/>
      <stop offset="40%" stop-color="#FF9800"/>
      <stop offset="80%" stop-color="#FFEB3B"/>
      <stop offset="100%" stop-color="#FFFDE7"/>
    </linearGradient>
    <radialGradient id="haloGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFD54F" stop-opacity="0.6"/>
      <stop offset="60%" stop-color="#D4AF37" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#3E070D" stop-opacity="0"/>
    </radialGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
    <filter id="softGlow" x="-10%" y="-10%" width="120%" height="120%">
      <feGaussianBlur stdDeviation="4" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>
  
  <!-- Canvas Background -->
  <rect width="{width}" height="{height}" fill="url(#bgGrad)"/>
  
  <!-- Subtle Ornamental Outer Border -->
  <rect x="16" y="16" width="{width-32}" height="{height-32}" rx="16" fill="none" stroke="url(#goldGrad)" stroke-width="2" stroke-opacity="0.5"/>
  <rect x="24" y="24" width="{width-48}" height="{height-48}" rx="12" fill="none" stroke="url(#goldGrad)" stroke-width="1" stroke-opacity="0.3" stroke-dasharray="6,4"/>

  <!-- Corner Cornerstones -->
  <circle cx="24" cy="24" r="6" fill="#D4AF37"/>
  <circle cx="{width-24}" cy="24" r="6" fill="#D4AF37"/>
  <circle cx="24" cy="{height-24}" r="6" fill="#D4AF37"/>
  <circle cx="{width-24}" cy="{height-24}" r="6" fill="#D4AF37"/>
  
  {content}
</svg>'''
    with open(f'public/images/{name}.svg', 'w', encoding='utf-8') as f:
        f.write(svg)
    print(f'Generated public/images/{name}.svg')

# 1. Lord Venkateswara Swamy Deity (God Image)
venkateswara_content = '''
  <!-- Divine Sanctum Halo Glow -->
  <circle cx="400" cy="260" r="180" fill="url(#haloGlow)"/>
  
  <!-- Golden Prabhavali Arch -->
  <path d="M 240 460 C 240 200, 310 100, 400 100 C 490 100, 560 200, 560 460" fill="none" stroke="url(#deepGold)" stroke-width="18" stroke-linecap="round"/>
  <path d="M 255 460 C 255 220, 320 120, 400 120 C 480 120, 545 220, 545 460" fill="none" stroke="#FFD54F" stroke-width="4" stroke-opacity="0.8"/>
  
  <!-- Prabhavali Kirtimukha crest -->
  <circle cx="400" cy="95" r="18" fill="url(#goldGrad)"/>
  <polygon points="400,65 410,85 400,80 390,85" fill="#FFE082"/>

  <!-- Sacred Deity Body Silhouette (Dark Shyamala Varna) -->
  <!-- Shoulders and Torso -->
  <path d="M 330 460 L 335 290 Q 340 260 360 250 L 375 240 L 425 240 L 440 250 Q 460 260 465 290 L 470 460 Z" fill="#151214"/>
  
  <!-- Divine Diamond Crown (Kireetam) -->
  <polygon points="360,230 440,230 425,120 400,90 375,120" fill="url(#deepGold)" filter="url(#softGlow)"/>
  <rect x="365" y="215" width="70" height="15" fill="#FFE082" rx="3"/>
  <circle cx="400" cy="150" r="8" fill="#D32F2F"/>
  <polygon points="400,105 406,120 400,116 394,120" fill="#FFF"/>

  <!-- Holy Thirunamam (Sacred White & Red Forehead Mark) -->
  <rect x="375" y="228" width="50" height="42" fill="#151214" rx="4"/>
  <!-- White Shankha/Chakra white arms -->
  <path d="M 382 232 L 388 260 L 396 260 L 392 232 Z" fill="#FFFFFF" filter="url(#softGlow)"/>
  <path d="M 418 232 L 412 260 L 404 260 L 408 232 Z" fill="#FFFFFF" filter="url(#softGlow)"/>
  <path d="M 388 260 Q 400 270 412 260 Z" fill="#FFFFFF"/>
  <!-- Central Red Srichurnam -->
  <rect x="398" y="230" width="4" height="36" fill="#D32F2F" rx="2" filter="url(#softGlow)"/>

  <!-- Divine Upper Right Hand holding Golden Sudarshana Chakra -->
  <path d="M 340 270 Q 280 260 270 210" fill="none" stroke="#151214" stroke-width="16" stroke-linecap="round"/>
  <!-- Sudarshana Chakra with golden flames -->
  <circle cx="265" cy="195" r="32" fill="none" stroke="url(#goldGrad)" stroke-width="6" filter="url(#softGlow)"/>
  <circle cx="265" cy="195" r="14" fill="url(#deepGold)"/>
  <circle cx="265" cy="195" r="6" fill="#D32F2F"/>
  <line x1="265" y1="155" x2="265" y2="235" stroke="#FFE082" stroke-width="3"/>
  <line x1="225" y1="195" x2="305" y2="195" stroke="#FFE082" stroke-width="3"/>

  <!-- Divine Upper Left Hand holding Golden Panchajanya Shankha (Conch) -->
  <path d="M 460 270 Q 520 260 530 210" fill="none" stroke="#151214" stroke-width="16" stroke-linecap="round"/>
  <!-- Golden Shankha Conch -->
  <path d="M 525 180 Q 545 190 540 215 Q 535 230 515 220 Q 510 200 525 180 Z" fill="url(#deepGold)" filter="url(#softGlow)"/>
  <path d="M 525 180 Q 535 170 545 175 Q 550 185 540 200" fill="#FFF"/>

  <!-- Lower Hands: Abhaya Hastha (Boon-giving right) & Kati Hastha (resting on hip left) -->
  <path d="M 340 310 Q 320 370 360 400" fill="none" stroke="#151214" stroke-width="14" stroke-linecap="round"/>
  <circle cx="360" cy="400" r="12" fill="url(#goldGrad)"/> <!-- Golden palm with lotus mark -->
  <circle cx="360" cy="400" r="4" fill="#D32F2F"/>

  <path d="M 460 310 Q 480 370 450 410" fill="none" stroke="#151214" stroke-width="14" stroke-linecap="round"/>
  <circle cx="450" cy="410" r="10" fill="url(#goldGrad)"/>

  <!-- Golden Pitambara Silks & Kasula Peru Necklace -->
  <path d="M 350 280 Q 400 340 450 280" fill="none" stroke="url(#goldGrad)" stroke-width="10"/>
  <path d="M 355 310 Q 400 370 445 310" fill="none" stroke="url(#goldGrad)" stroke-width="8"/>
  <path d="M 360 350 Q 400 400 440 350" fill="none" stroke="url(#deepGold)" stroke-width="12"/>
  <polygon points="385,380 415,380 400,430" fill="#FFC107"/> <!-- Kaustubha jewel -->

  <!-- Sacred Flower & Tulasi Garlands (Vanamala) -->
  <path d="M 330 250 C 310 360, 330 480, 400 480 C 470 480, 490 360, 470 250" fill="none" stroke="#C2185B" stroke-width="12" stroke-dasharray="8,6" stroke-linecap="round"/>
  <path d="M 340 260 C 325 350, 340 460, 400 460 C 460 460, 475 350, 460 260" fill="none" stroke="#388E3C" stroke-width="8" stroke-dasharray="6,4" stroke-linecap="round"/>

  <!-- Flanking Sacred Brass Oil Lamps (Diyas) -->
  <g transform="translate(140, 360)">
    <path d="M 30 100 L 50 100 L 45 40 L 55 40 L 40 10 L 25 40 L 35 40 Z" fill="url(#deepGold)"/>
    <ellipse cx="40" cy="10" rx="20" ry="6" fill="url(#goldGrad)"/>
    <path d="M 40 4 Q 46 -8 40 -16 Q 34 -8 40 4 Z" fill="url(#flameGrad)" filter="url(#softGlow)"/>
  </g>
  <g transform="translate(620, 360)">
    <path d="M 30 100 L 50 100 L 45 40 L 55 40 L 40 10 L 25 40 L 35 40 Z" fill="url(#deepGold)"/>
    <ellipse cx="40" cy="10" rx="20" ry="6" fill="url(#goldGrad)"/>
    <path d="M 40 4 Q 46 -8 40 -16 Q 34 -8 40 4 Z" fill="url(#flameGrad)" filter="url(#softGlow)"/>
  </g>

  <!-- Divine Pedestal Title Plate -->
  <rect x="180" y="505" width="440" height="65" rx="14" fill="#31070C" stroke="url(#goldGrad)" stroke-width="2"/>
  <text x="400" y="532" fill="#FFE082" font-family="serif" font-size="20" font-weight="bold" text-anchor="middle" letter-spacing="2">॥ శ్రీ ప్రసన్న వేంకటేశ్వర స్వామి ॥</text>
  <text x="400" y="555" fill="#FFD54F" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle" letter-spacing="3">LORD SRI VENKATESWARA SWAMY (MOOLA VIRAT)</text>
'''
make_svg('god-venkateswara', venkateswara_content)

# 2. Goddess Sri Padmavathi Devi (God Image)
padmavathi_content = '''
  <!-- Divine Golden Halo -->
  <circle cx="400" cy="240" r="170" fill="url(#haloGlow)"/>
  
  <!-- Sacred Blooming Pink Lotus Throne (Padma Peetham) -->
  <g transform="translate(400, 440)">
    <!-- Base Petals -->
    <path d="M 0 30 C -120 30, -180 -10, -120 -40 C -80 -10, 0 10, 0 30 Z" fill="#E91E63" opacity="0.85"/>
    <path d="M 0 30 C 120 30, 180 -10, 120 -40 C 80 -10, 0 10, 0 30 Z" fill="#E91E63" opacity="0.85"/>
    <path d="M 0 30 C -70 20, -100 -30, -50 -50 C -20 -20, 0 15, 0 30 Z" fill="#F06292"/>
    <path d="M 0 30 C 70 20, 100 -30, 50 -50 C 20 -20, 0 15, 0 30 Z" fill="#F06292"/>
    <path d="M 0 30 C -30 10, -40 -40, 0 -60 C 40 -40, 30 10, 0 30 Z" fill="#FF80AB"/>
    <ellipse cx="0" cy="15" rx="140" ry="16" fill="url(#deepGold)"/>
  </g>

  <!-- Goddess Form (Graceful Silhouetted Devi) -->
  <!-- Auspicious Red Silk Saree & Torso -->
  <path d="M 345 420 Q 330 330 365 260 L 435 260 Q 470 330 455 420 Z" fill="#B71C1C"/>
  <path d="M 370 260 L 430 260 L 420 235 L 380 235 Z" fill="#D7CCC8"/>

  <!-- Divine Golden Mukuta Crown -->
  <polygon points="370,225 430,225 415,120 400,90 385,120" fill="url(#deepGold)" filter="url(#softGlow)"/>
  <circle cx="400" cy="150" r="7" fill="#E91E63"/>
  <polygon points="400,105 405,116 400,112 395,116" fill="#FFF"/>

  <!-- Kumkum Tilak & Nose Ring (Mukku Pudaka) -->
  <circle cx="400" cy="235" r="5" fill="#D50000"/>
  <circle cx="408" cy="242" r="2.5" fill="#FFF" filter="url(#softGlow)"/>

  <!-- Upper Hands holding Sacred Lotuses -->
  <!-- Left hand & lotus -->
  <path d="M 355 280 Q 290 270 280 220" fill="none" stroke="#D7CCC8" stroke-width="12" stroke-linecap="round"/>
  <circle cx="275" cy="205" r="20" fill="#F06292"/>
  <circle cx="275" cy="205" r="10" fill="#FF80AB"/>
  <circle cx="275" cy="205" r="5" fill="#FFF"/>

  <!-- Right hand & lotus -->
  <path d="M 445 280 Q 510 270 520 220" fill="none" stroke="#D7CCC8" stroke-width="12" stroke-linecap="round"/>
  <circle cx="525" cy="205" r="20" fill="#F06292"/>
  <circle cx="525" cy="205" r="10" fill="#FF80AB"/>
  <circle cx="525" cy="205" r="5" fill="#FFF"/>

  <!-- Lower Hands: Varada Mudra with Shower of Gold Coins (Swarna Vrishti) -->
  <path d="M 360 320 Q 320 380 340 410" fill="none" stroke="#D7CCC8" stroke-width="12" stroke-linecap="round"/>
  <path d="M 440 320 Q 480 380 460 410" fill="none" stroke="#D7CCC8" stroke-width="12" stroke-linecap="round"/>

  <!-- Golden Coins Shower -->
  <g fill="url(#goldGrad)" filter="url(#softGlow)">
    <circle cx="340" cy="425" r="7"/>
    <circle cx="330" cy="445" r="6"/>
    <circle cx="350" cy="455" r="8"/>
    <circle cx="335" cy="475" r="7"/>
    <circle cx="355" cy="490" r="6"/>
    <circle cx="325" cy="495" r="5"/>
  </g>

  <!-- Golden Kasumala & Ornaments -->
  <path d="M 370 265 Q 400 320 430 265" fill="none" stroke="url(#goldGrad)" stroke-width="8"/>
  <path d="M 365 290 Q 400 355 435 290" fill="none" stroke="url(#goldGrad)" stroke-width="6"/>

  <!-- Sacred Kalashas flanking Devi -->
  <g transform="translate(150, 360)">
    <ellipse cx="40" cy="70" rx="30" ry="24" fill="url(#deepGold)"/>
    <rect x="30" y="40" width="20" height="15" fill="url(#goldGrad)"/>
    <!-- Coconut & Mango Leaves -->
    <polygon points="20,42 40,15 40,42" fill="#2E7D32"/>
    <polygon points="60,42 40,15 40,42" fill="#2E7D32"/>
    <circle cx="40" cy="25" r="14" fill="#6D4C41"/>
  </g>
  <g transform="translate(610, 360)">
    <ellipse cx="40" cy="70" rx="30" ry="24" fill="url(#deepGold)"/>
    <rect x="30" y="40" width="20" height="15" fill="url(#goldGrad)"/>
    <polygon points="20,42 40,15 40,42" fill="#2E7D32"/>
    <polygon points="60,42 40,15 40,42" fill="#2E7D32"/>
    <circle cx="40" cy="25" r="14" fill="#6D4C41"/>
  </g>

  <!-- Pedestal Title Plate -->
  <rect x="180" y="505" width="440" height="65" rx="14" fill="#31070C" stroke="url(#goldGrad)" stroke-width="2"/>
  <text x="400" y="532" fill="#FFE082" font-family="serif" font-size="20" font-weight="bold" text-anchor="middle" letter-spacing="2">॥ శ్రీ పద్మావతీ దేవి (అలమేలు మంగ) ॥</text>
  <text x="400" y="555" fill="#FFD54F" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle" letter-spacing="3">GODDESS SRI PADMAVATHI DEVI (MAHALAKSHMI)</text>
'''
make_svg('god-padmavathi', padmavathi_content)

# 3. Sri Malayappa Swamy with Sridevi & Bhudevi (Utsava Murthis)
malayappa_content = '''
  <circle cx="400" cy="230" r="190" fill="url(#haloGlow)"/>
  
  <!-- Royal Ceremonial Parasol (Chatram / Umbrella) -->
  <path d="M 280 130 Q 400 70 520 130 Z" fill="#B71C1C" stroke="url(#goldGrad)" stroke-width="4"/>
  <line x1="400" y1="110" x2="400" y2="210" stroke="url(#goldGrad)" stroke-width="6"/>
  <!-- Tassels -->
  <circle cx="300" cy="135" r="4" fill="#FFD54F"/>
  <circle cx="350" cy="138" r="4" fill="#FFD54F"/>
  <circle cx="400" cy="140" r="4" fill="#FFD54F"/>
  <circle cx="450" cy="138" r="4" fill="#FFD54F"/>
  <circle cx="500" cy="135" r="4" fill="#FFD54F"/>

  <!-- Golden Pedestal (Utsava Peetham) -->
  <rect x="160" y="440" width="480" height="40" rx="8" fill="url(#deepGold)"/>
  <rect x="180" y="430" width="440" height="15" rx="5" fill="#FFE082"/>

  <!-- Central Murthi: Sri Malayappa Swamy -->
  <g transform="translate(0, 10)">
    <rect x="365" y="270" width="70" height="150" rx="10" fill="#1C1417"/>
    <polygon points="370,250 430,250 415,170 400,140 385,170" fill="url(#deepGold)"/>
    <!-- Thirunamam -->
    <rect x="390" y="250" width="20" height="18" fill="#1C1417"/>
    <path d="M 393 252 L 396 264 L 404 264 L 407 252 Z" fill="#FFF"/>
    <rect x="399" y="252" width="2" height="14" fill="#D50000"/>
    <!-- Silks & Garlands -->
    <path d="M 365 290 Q 400 350 435 290" fill="none" stroke="url(#goldGrad)" stroke-width="8"/>
    <path d="M 360 270 Q 330 380 400 420 Q 470 380 440 270" fill="none" stroke="#FF4081" stroke-width="10" stroke-dasharray="6,4"/>
  </g>

  <!-- Left Murthi: Goddess Sridevi -->
  <g transform="translate(-100, 30)">
    <rect x="375" y="280" width="50" height="120" rx="8" fill="#D7CCC8"/>
    <path d="M 370 320 Q 360 400 430 400 Q 440 320 370 320 Z" fill="#C2185B"/>
    <polygon points="380,260 420,260 410,190 400,170 390,190" fill="url(#goldGrad)"/>
    <circle cx="360" cy="270" r="10" fill="#F06292"/> <!-- Lotus in hand -->
  </g>

  <!-- Right Murthi: Goddess Bhudevi -->
  <g transform="translate(100, 30)">
    <rect x="375" y="280" width="50" height="120" rx="8" fill="#D7CCC8"/>
    <path d="M 370 320 Q 360 400 430 400 Q 440 320 370 320 Z" fill="#388E3C"/>
    <polygon points="380,260 420,260 410,190 400,170 390,190" fill="url(#goldGrad)"/>
    <circle cx="440" cy="270" r="10" fill="#81C784"/> <!-- Lily in hand -->
  </g>

  <!-- Flanking Utsava Torches (Koluva Deepams) -->
  <g transform="translate(100, 310)">
    <line x1="30" y1="160" x2="30" y2="40" stroke="url(#deepGold)" stroke-width="6"/>
    <ellipse cx="30" cy="40" rx="18" ry="6" fill="url(#goldGrad)"/>
    <path d="M 30 35 Q 36 15 30 5 Q 24 15 30 35 Z" fill="url(#flameGrad)" filter="url(#softGlow)"/>
  </g>
  <g transform="translate(640, 310)">
    <line x1="30" y1="160" x2="30" y2="40" stroke="url(#deepGold)" stroke-width="6"/>
    <ellipse cx="30" cy="40" rx="18" ry="6" fill="url(#goldGrad)"/>
    <path d="M 30 35 Q 36 15 30 5 Q 24 15 30 35 Z" fill="url(#flameGrad)" filter="url(#softGlow)"/>
  </g>

  <!-- Pedestal Title Plate -->
  <rect x="160" y="505" width="480" height="65" rx="14" fill="#31070C" stroke="url(#goldGrad)" stroke-width="2"/>
  <text x="400" y="532" fill="#FFE082" font-family="serif" font-size="20" font-weight="bold" text-anchor="middle" letter-spacing="2">॥ శ్రీ మలయప్ప స్వామి &amp; ఉభయ నాంచారులు ॥</text>
  <text x="400" y="555" fill="#FFD54F" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle" letter-spacing="3">SRI MALAYAPPA SWAMY WITH SRIDEVI &amp; BHUDEVI (UTSAVAR)</text>
'''
make_svg('god-malayappa', malayappa_content)

# 4. Grand Dravidian Rajagopuram (Temple Architecture)
gopuram_content = '''
  <!-- Dusk Sky with Crescent Moon and Temple Stars -->
  <circle cx="650" cy="110" r="28" fill="#FFE082" opacity="0.15"/>
  <path d="M 645 95 A 20 20 0 0 0 665 115 A 24 24 0 1 1 645 95 Z" fill="#FFF9C4" filter="url(#softGlow)"/>
  <circle cx="180" cy="120" r="2" fill="#FFF"/>
  <circle cx="230" cy="90" r="1.5" fill="#FFF"/>
  <circle cx="580" cy="70" r="2" fill="#FFF"/>
  <circle cx="680" cy="180" r="1.5" fill="#FFF"/>

  <!-- Golden 7 Kalashas atop Rajagopuram -->
  <g transform="translate(400, 65)">
    <!-- 7 Golden Spires -->
    <path d="M -60 20 L -60 0 L -58 0 L -58 20" stroke="url(#goldGrad)" stroke-width="4"/>
    <circle cx="-60" cy="0" r="4" fill="url(#deepGold)"/>
    <path d="M -40 20 L -40 -5 L -38 -5 L -38 20" stroke="url(#goldGrad)" stroke-width="4"/>
    <circle cx="-40" cy="-5" r="5" fill="url(#deepGold)"/>
    <path d="M -20 20 L -20 -10 L -18 -10 L -18 20" stroke="url(#goldGrad)" stroke-width="4"/>
    <circle cx="-20" cy="-10" r="5" fill="url(#deepGold)"/>
    <path d="M 0 20 L 0 -15 L 2 -15 L 2 20" stroke="url(#goldGrad)" stroke-width="5" filter="url(#softGlow)"/>
    <circle cx="0" cy="-15" r="7" fill="#FFE082"/>
    <path d="M 20 20 L 20 -10 L 22 -10 L 22 20" stroke="url(#goldGrad)" stroke-width="4"/>
    <circle cx="20" cy="-10" r="5" fill="url(#deepGold)"/>
    <path d="M 40 20 L 40 -5 L 42 -5 L 42 20" stroke="url(#goldGrad)" stroke-width="4"/>
    <circle cx="40" cy="-5" r="5" fill="url(#deepGold)"/>
    <path d="M 60 20 L 60 0 L 62 0 L 62 20" stroke="url(#goldGrad)" stroke-width="4"/>
    <circle cx="60" cy="0" r="4" fill="url(#deepGold)"/>
  </g>

  <!-- Multi-Tiered Pyramid Gopuram Levels -->
  <!-- Tier 1 (Apex) -->
  <polygon points="340,90 460,90 480,130 320,130" fill="url(#deepGold)" stroke="#3E080D" stroke-width="3"/>
  <circle cx="400" cy="110" r="10" fill="#B71C1C"/>
  <!-- Tier 2 -->
  <polygon points="310,130 490,130 510,175 290,175" fill="#8D1724" stroke="url(#goldGrad)" stroke-width="2"/>
  <rect x="350" y="140" width="100" height="25" rx="5" fill="url(#deepGold)"/>
  <!-- Tier 3 -->
  <polygon points="280,175 520,175 540,225 260,225" fill="#6B0F19" stroke="url(#goldGrad)" stroke-width="2"/>
  <rect x="330" y="185" width="140" height="30" rx="5" fill="url(#deepGold)"/>
  <!-- Tier 4 -->
  <polygon points="250,225 550,225 570,280 230,280" fill="#540A13" stroke="url(#goldGrad)" stroke-width="2"/>
  <rect x="310" y="235" width="180" height="35" rx="5" fill="url(#deepGold)"/>
  <!-- Tier 5 -->
  <polygon points="220,280 580,280 600,340 200,340" fill="#42060E" stroke="url(#goldGrad)" stroke-width="2"/>
  <rect x="290" y="290" width="220" height="40" rx="5" fill="url(#deepGold)"/>

  <!-- Grand Base & Sacred Temple Gateway (Dwaram) -->
  <rect x="180" y="340" width="440" height="150" fill="#2E040A" stroke="url(#goldGrad)" stroke-width="3"/>
  
  <!-- Massive Brass & Wood Carved Temple Doorway -->
  <path d="M 330 490 L 330 390 Q 400 350 470 390 L 470 490 Z" fill="#150204" stroke="url(#deepGold)" stroke-width="4"/>
  <line x1="400" y1="365" x2="400" y2="490" stroke="url(#goldGrad)" stroke-width="3"/>
  <!-- Door Brass Studs -->
  <circle cx="365" cy="420" r="5" fill="url(#goldGrad)"/>
  <circle cx="435" cy="420" r="5" fill="url(#goldGrad)"/>
  <circle cx="365" cy="460" r="5" fill="url(#goldGrad)"/>
  <circle cx="435" cy="460" r="5" fill="url(#goldGrad)"/>

  <!-- Golden Dhwajasthambham (Flagstaff) in foreground -->
  <g transform="translate(400, 290)">
    <line x1="0" y1="200" x2="0" y2="0" stroke="url(#goldGrad)" stroke-width="8" filter="url(#softGlow)"/>
    <polygon points="0,0 25,12 0,24" fill="#FFC107"/>
    <circle cx="0" cy="0" r="8" fill="#D32F2F"/>
  </g>

  <!-- Title Plate -->
  <rect x="180" y="505" width="440" height="65" rx="14" fill="#31070C" stroke="url(#goldGrad)" stroke-width="2"/>
  <text x="400" y="532" fill="#FFE082" font-family="serif" font-size="20" font-weight="bold" text-anchor="middle" letter-spacing="2">॥ భవ్య రాజగోపురం &amp; క్షేత్ర ప్రాకారం ॥</text>
  <text x="400" y="555" fill="#FFD54F" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle" letter-spacing="3">MAJESTIC DRAVIDIAN RAJAGOPURAM TOWER</text>
'''
make_svg('temple-gopuram', gopuram_content)

# 5. Sacred Temple Sanctum & Ananda Nilayam (Garbhagriha)
garbhagriha_content = '''
  <circle cx="400" cy="220" r="180" fill="url(#haloGlow)"/>
  <!-- Golden Vimanam / Shikharam Dome -->
  <polygon points="340,160 460,160 440,90 400,60 360,90" fill="url(#deepGold)" stroke="#FFE082" stroke-width="2" filter="url(#softGlow)"/>
  <circle cx="400" cy="55" r="9" fill="#FFF"/>
  <line x1="400" y1="65" x2="400" y2="40" stroke="url(#goldGrad)" stroke-width="4"/>

  <!-- Inner Sanctum Arch (Garbhalaya Toranam) -->
  <path d="M 230 480 L 230 250 Q 400 170 570 250 L 570 480 Z" fill="#170306" stroke="url(#deepGold)" stroke-width="12"/>
  <path d="M 260 480 L 260 270 Q 400 200 540 270 L 540 480 Z" fill="#0C0203" stroke="#FFD54F" stroke-width="2"/>

  <!-- Consecrated Deity Silhouette in golden glow -->
  <g transform="translate(400, 310)">
    <circle cx="0" cy="-20" r="30" fill="url(#haloGlow)"/>
    <polygon points="-20,-20 20,-20 12,-70 0,-85 -12,-70" fill="url(#deepGold)"/>
    <path d="M -35 120 L -30 20 Q 0 0 30 20 L 35 120 Z" fill="#000"/>
    <!-- Sacred White & Red Thirunamam -->
    <rect x="-10" y="-18" width="20" height="15" fill="#000"/>
    <path d="M -7 -16 L -4 -4 L 4 -4 L 7 -16 Z" fill="#FFF"/>
    <rect x="-1" y="-16" width="2" height="12" fill="#D50000"/>
    <!-- Kasula Peru Garland -->
    <path d="M -25 30 Q 0 70 25 30" fill="none" stroke="url(#goldGrad)" stroke-width="6"/>
  </g>

  <!-- Hanging Brass Bells (Ghanta) -->
  <g transform="translate(290, 220)">
    <line x1="0" y1="0" x2="0" y2="40" stroke="url(#goldGrad)" stroke-width="3"/>
    <path d="M -15 65 L 15 65 L 10 40 L -10 40 Z" fill="url(#deepGold)"/>
    <circle cx="0" cy="68" r="5" fill="#FFC107"/>
  </g>
  <g transform="translate(510, 220)">
    <line x1="0" y1="0" x2="0" y2="40" stroke="url(#goldGrad)" stroke-width="3"/>
    <path d="M -15 65 L 15 65 L 10 40 L -10 40 Z" fill="url(#deepGold)"/>
    <circle cx="0" cy="68" r="5" fill="#FFC107"/>
  </g>

  <!-- Sacred Threshold (Kulasekhara Padi) & Oil Lamps -->
  <rect x="220" y="470" width="360" height="20" fill="url(#deepGold)"/>
  <ellipse cx="270" cy="465" rx="14" ry="5" fill="url(#goldGrad)"/>
  <path d="M 270 460 Q 274 445 270 435 Q 266 445 270 460 Z" fill="url(#flameGrad)" filter="url(#softGlow)"/>
  <ellipse cx="530" cy="465" rx="14" ry="5" fill="url(#goldGrad)"/>
  <path d="M 530 460 Q 534 445 530 435 Q 526 445 530 460 Z" fill="url(#flameGrad)" filter="url(#softGlow)"/>

  <!-- Title Plate -->
  <rect x="180" y="505" width="440" height="65" rx="14" fill="#31070C" stroke="url(#goldGrad)" stroke-width="2"/>
  <text x="400" y="532" fill="#FFE082" font-family="serif" font-size="20" font-weight="bold" text-anchor="middle" letter-spacing="2">॥ ఆనంద నిలయం - గర్భగృహం ॥</text>
  <text x="400" y="555" fill="#FFD54F" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle" letter-spacing="3">ANANDA NILAYAM - SANCTUM SANCTORUM</text>
'''
make_svg('temple-garbhagriha', garbhagriha_content)

# 6. Sacred Swami Pushkarini (Holy Temple Waters)
pushkarini_content = '''
  <!-- Dusk Sky & Temple Reflection -->
  <rect x="60" y="60" width="680" height="220" fill="#2B0A12"/>
  <!-- Distant Gopurams silhouette -->
  <polygon points="200,280 230,130 260,280" fill="#1D0509"/>
  <polygon points="360,280 400,90 440,280" fill="#1D0509"/>
  <polygon points="540,280 570,140 600,280" fill="#1D0509"/>
  <circle cx="400" cy="80" r="6" fill="#FFD54F"/>

  <!-- Sacred Stone Ghat Steps (Pushkarini Sopanam) -->
  <polygon points="100,280 700,280 740,490 60,490" fill="#102A38" stroke="url(#goldGrad)" stroke-width="2"/>
  <!-- Water Ghat Tier Lines -->
  <line x1="90" y1="310" x2="710" y2="310" stroke="#37474F" stroke-width="6"/>
  <line x1="80" y1="345" x2="720" y2="345" stroke="#455A64" stroke-width="6"/>
  <line x1="70" y1="380" x2="730" y2="380" stroke="#546E7A" stroke-width="6"/>

  <!-- Holy Cleansing Water with Golden Ripples -->
  <path d="M 60 410 Q 200 400 400 410 Q 600 420 740 410 L 740 490 L 60 490 Z" fill="#0D47A1" opacity="0.8"/>
  <path d="M 80 440 Q 250 430 400 440 Q 550 450 720 440" stroke="#80D8FF" stroke-width="3" fill="none" opacity="0.7"/>
  <path d="M 120 465 Q 280 455 400 465 Q 520 475 680 465" stroke="#FFE082" stroke-width="2" fill="none" opacity="0.8"/>

  <!-- Floating Deepam on Holy Waters -->
  <ellipse cx="400" cy="450" rx="18" ry="6" fill="#8D6E63"/>
  <circle cx="400" cy="446" r="4" fill="#E91E63"/> <!-- flower -->
  <path d="M 400 442 Q 404 430 400 422 Q 396 430 400 442 Z" fill="url(#flameGrad)" filter="url(#softGlow)"/>

  <!-- Title Plate -->
  <rect x="180" y="505" width="440" height="65" rx="14" fill="#31070C" stroke="url(#goldGrad)" stroke-width="2"/>
  <text x="400" y="532" fill="#FFE082" font-family="serif" font-size="20" font-weight="bold" text-anchor="middle" letter-spacing="2">॥ స్వామి పుష్కరిణి దివ్య తీర్థం ॥</text>
  <text x="400" y="555" fill="#FFD54F" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle" letter-spacing="3">SWAMI PUSHKARINI SACRED TEMPLE WATERS</text>
'''
make_svg('temple-pushkarini', pushkarini_content)

# 7. Heritage Pillared Mandapam (Ranga Mandapam)
mandapam_content = '''
  <!-- Perspective Dravidian Stone Pillars -->
  <g stroke="url(#goldGrad)" stroke-width="2">
    <!-- Pillar 1 (Left Fore) -->
    <rect x="120" y="100" width="70" height="380" fill="#3E2723"/>
    <rect x="105" y="90" width="100" height="25" fill="url(#deepGold)"/>
    <rect x="105" y="460" width="100" height="25" fill="url(#deepGold)"/>
    <circle cx="155" cy="200" r="14" fill="url(#goldGrad)"/> <!-- Carved relief -->
    <circle cx="155" cy="340" r="14" fill="url(#goldGrad)"/>

    <!-- Pillar 2 (Left Mid) -->
    <rect x="250" y="140" width="50" height="320" fill="#2E1C1A"/>
    <rect x="240" y="130" width="70" height="20" fill="url(#deepGold)"/>
    <rect x="240" y="445" width="70" height="20" fill="url(#deepGold)"/>

    <!-- Pillar 3 (Right Mid) -->
    <rect x="500" y="140" width="50" height="320" fill="#2E1C1A"/>
    <rect x="490" y="130" width="70" height="20" fill="url(#deepGold)"/>
    <rect x="490" y="445" width="70" height="20" fill="url(#deepGold)"/>

    <!-- Pillar 4 (Right Fore) -->
    <rect x="610" y="100" width="70" height="380" fill="#3E2723"/>
    <rect x="595" y="90" width="100" height="25" fill="url(#deepGold)"/>
    <rect x="595" y="460" width="100" height="25" fill="url(#deepGold)"/>
    <circle cx="645" cy="200" r="14" fill="url(#goldGrad)"/>
    <circle cx="645" cy="340" r="14" fill="url(#goldGrad)"/>
  </g>

  <!-- Central Sanctum Vista illuminated by Lamps -->
  <path d="M 330 460 L 330 240 Q 400 200 470 240 L 470 460 Z" fill="#1C060B" stroke="url(#goldGrad)" stroke-width="4"/>
  <circle cx="400" cy="300" r="30" fill="url(#haloGlow)"/>
  <!-- Central Brass Diya Tree (Deepastambham) -->
  <line x1="400" y1="460" x2="400" y2="280" stroke="url(#goldGrad)" stroke-width="6"/>
  <ellipse cx="400" cy="330" rx="40" ry="8" fill="url(#deepGold)"/>
  <ellipse cx="400" cy="380" rx="60" ry="10" fill="url(#deepGold)"/>
  <ellipse cx="400" cy="430" rx="80" ry="12" fill="url(#deepGold)"/>
  <path d="M 400 270 Q 406 255 400 240 Q 394 255 400 270 Z" fill="url(#flameGrad)" filter="url(#softGlow)"/>

  <!-- Title Plate -->
  <rect x="180" y="505" width="440" height="65" rx="14" fill="#31070C" stroke="url(#goldGrad)" stroke-width="2"/>
  <text x="400" y="532" fill="#FFE082" font-family="serif" font-size="20" font-weight="bold" text-anchor="middle" letter-spacing="2">॥ శిల్పకళా శోభిత రంగ మండపం ॥</text>
  <text x="400" y="555" fill="#FFD54F" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle" letter-spacing="3">HERITAGE PILLARED RANGA MANDAPAM</text>
'''
make_svg('temple-mandapam', mandapam_content)

# 8. Suprabhata Seva (Awakening Morning Ritual)
suprabhatam_content = '''
  <!-- Morning Dawn Aurora -->
  <rect x="50" y="50" width="700" height="420" fill="url(#haloGlow)"/>
  
  <!-- Awakening Sunrise rays -->
  <line x1="400" y1="200" x2="250" y2="80" stroke="#FFE082" stroke-width="2" stroke-opacity="0.5"/>
  <line x1="400" y1="200" x2="400" y2="60" stroke="#FFE082" stroke-width="2" stroke-opacity="0.5"/>
  <line x1="400" y1="200" x2="550" y2="80" stroke="#FFE082" stroke-width="2" stroke-opacity="0.5"/>

  <!-- Sanctum Deity awakening profile -->
  <g transform="translate(400, 260)">
    <circle cx="0" cy="0" r="100" fill="#200508"/>
    <polygon points="-25,0 25,0 15,-70 0,-90 -15,-70" fill="url(#deepGold)"/>
    <!-- Sacred Thirunamam -->
    <path d="M -8 -10 L -4 0 L 4 0 L 8 -10 Z" fill="#FFF"/>
    <rect x="-1" y="-10" width="2" height="9" fill="#D50000"/>
  </g>

  <!-- Awakening Brass Suprabhata Bell & Morning Aradhana Lamp -->
  <g transform="translate(240, 320)">
    <path d="M 0 100 L 0 30 L -25 70 Z" fill="none"/>
    <ellipse cx="0" cy="80" rx="35" ry="12" fill="url(#deepGold)"/>
    <path d="M -30 80 L -15 20 L 15 20 L 30 80 Z" fill="url(#goldGrad)"/>
    <circle cx="0" cy="15" r="10" fill="url(#deepGold)"/>
    <line x1="0" y1="15" x2="0" y2="-60" stroke="url(#goldGrad)" stroke-width="4"/>
  </g>

  <!-- Fragrant Incense (Dhoopam) smoke coils -->
  <g transform="translate(560, 360)">
    <rect x="-20" y="40" width="40" height="20" fill="url(#deepGold)" rx="4"/>
    <path d="M 0 40 Q -15 10 0 -10 Q 15 -30 0 -50 Q -15 -70 0 -90" stroke="#E0E0E0" stroke-width="4" fill="none" opacity="0.6"/>
  </g>

  <!-- Title Plate -->
  <rect x="180" y="505" width="440" height="65" rx="14" fill="#31070C" stroke="url(#goldGrad)" stroke-width="2"/>
  <text x="400" y="532" fill="#FFE082" font-family="serif" font-size="20" font-weight="bold" text-anchor="middle" letter-spacing="2">॥ సుప్రభాత సేవ ॥</text>
  <text x="400" y="555" fill="#FFD54F" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle" letter-spacing="3">SUPRABHATA SEVA - AUSPICIOUS AWAKENING</text>
'''
make_svg('pooja-suprabhatam', suprabhatam_content)

# 9. Nitya Abhishekam (Sacred Deity Bathing)
abhishekam_content = '''
  <circle cx="400" cy="240" r="170" fill="url(#haloGlow)"/>

  <!-- Golden Consecrated Kalasha Vessel pouring Holy Stream -->
  <g transform="translate(400, 160)">
    <!-- Kalasha tilted -->
    <path d="M -35 -20 Q -60 20 -20 50 Q 20 50 35 10 Q 40 -20 0 -30 Z" fill="url(#deepGold)" stroke="#FFE082" stroke-width="2"/>
    <ellipse cx="0" cy="-30" rx="20" ry="8" fill="url(#goldGrad)"/>
    
    <!-- Sacred Streams of Milk & Honey (Ksheerabhishekam) -->
    <path d="M 0 45 C -20 90, -10 160, 0 240 C 10 160, 20 90, 0 45 Z" fill="#FFFDE7" opacity="0.95" filter="url(#softGlow)"/>
    <path d="M 12 50 C 25 100, 15 160, 5 240" stroke="#FFC107" stroke-width="4" fill="none" opacity="0.8"/> <!-- Honey stream -->
  </g>

  <!-- Deity Abhisheka Peetham (Snana Droni) -->
  <g transform="translate(400, 420)">
    <rect x="-120" y="0" width="240" height="30" rx="8" fill="url(#deepGold)"/>
    <path d="M 120 15 L 180 20 L 120 25 Z" fill="url(#goldGrad)"/> <!-- Somasutra spout -->
    <!-- Holy Theertham Droplets -->
    <circle cx="190" cy="25" r="4" fill="#E1F5FE"/>
    <circle cx="195" cy="40" r="3" fill="#E1F5FE"/>
  </g>

  <!-- Sacred Tulasi & Bilva Leaves -->
  <circle cx="340" cy="410" r="10" fill="#388E3C"/>
  <circle cx="460" cy="410" r="10" fill="#388E3C"/>
  <circle cx="400" cy="410" r="8" fill="#D32F2F"/>

  <!-- Title Plate -->
  <rect x="180" y="505" width="440" height="65" rx="14" fill="#31070C" stroke="url(#goldGrad)" stroke-width="2"/>
  <text x="400" y="532" fill="#FFE082" font-family="serif" font-size="20" font-weight="bold" text-anchor="middle" letter-spacing="2">॥ నిత్య అభిషేక సేవ ॥</text>
  <text x="400" y="555" fill="#FFD54F" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle" letter-spacing="3">NITYA ABHISHEKAM - SACRED PANCHAMRUTHA</text>
'''
make_svg('pooja-abhishekam', abhishekam_content)

# 10. Ashtothara Shatanama Archana (108 Holy Names)
archana_content = '''
  <circle cx="400" cy="220" r="160" fill="url(#haloGlow)"/>
  
  <!-- Sacred Brass Pooja Thali (Archana Plate) -->
  <ellipse cx="400" cy="380" rx="220" ry="70" fill="url(#deepGold)" stroke="#FFE082" stroke-width="3"/>
  <ellipse cx="400" cy="380" rx="190" ry="55" fill="#B8860B"/>

  <!-- 108 Sacred Tulasi Leaves, Flowers & Akshintalu in Thali -->
  <g transform="translate(400, 375)">
    <!-- Mound of Sacred Tulasi Leaves -->
    <ellipse cx="-70" cy="-5" rx="40" ry="20" fill="#2E7D32"/>
    <circle cx="-75" cy="-8" r="8" fill="#43A047"/>
    <circle cx="-60" cy="-2" r="9" fill="#388E3C"/>
    
    <!-- Fragrant Jasmine & Lotus Petals -->
    <ellipse cx="60" cy="-5" rx="45" ry="22" fill="#F06292"/>
    <circle cx="50" cy="-8" r="10" fill="#FFF"/>
    <circle cx="75" cy="-5" r="10" fill="#FFF"/>
    
    <!-- Auspicious Kumkum & Chandanam Silver Cups -->
    <ellipse cx="0" cy="-20" rx="18" ry="8" fill="#E0E0E0"/>
    <circle cx="0" cy="-20" r="6" fill="#D50000"/> <!-- Red Kumkum -->
    <ellipse cx="0" cy="15" rx="18" ry="8" fill="#E0E0E0"/>
    <circle cx="0" cy="15" r="6" fill="#FFD54F"/> <!-- Yellow Chandan -->
  </g>

  <!-- Priest Hand offering fresh Lotus Blossom -->
  <g transform="translate(400, 210)">
    <!-- Sacred Pink Lotus Offering -->
    <circle cx="0" cy="0" r="28" fill="#E91E63" filter="url(#softGlow)"/>
    <circle cx="0" cy="0" r="16" fill="#FF80AB"/>
    <circle cx="0" cy="0" r="8" fill="#FFF"/>
  </g>

  <!-- Title Plate -->
  <rect x="180" y="505" width="440" height="65" rx="14" fill="#31070C" stroke="url(#goldGrad)" stroke-width="2"/>
  <text x="400" y="532" fill="#FFE082" font-family="serif" font-size="20" font-weight="bold" text-anchor="middle" letter-spacing="2">॥ అష్టోత్తర శతనామ అర్చన ॥</text>
  <text x="400" y="555" fill="#FFD54F" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle" letter-spacing="3">ASHTOTHARA SHATANAMA ARCHANA (108 NAMES)</text>
'''
make_svg('pooja-archana', archana_content)

# 11. Vishesha Harathi & Camphor Flame (Maha Mangala Harathi)
harathi_content = '''
  <circle cx="400" cy="240" r="190" fill="url(#haloGlow)"/>

  <!-- Majestic Multi-Tiered Brass Karpoora Harathi Lamp -->
  <g transform="translate(400, 300)">
    <!-- Base & Handle -->
    <path d="M 0 160 L -150 160 Q -170 160 -170 140 Q -170 120 -150 120 L 0 120 Z" fill="url(#deepGold)"/>
    <ellipse cx="0" cy="140" rx="50" ry="15" fill="url(#goldGrad)"/>
    <!-- Pillar -->
    <rect x="-15" y="0" width="30" height="140" fill="url(#deepGold)"/>

    <!-- Tier 3 (Bottom Tray - 7 flames) -->
    <ellipse cx="0" cy="90" rx="140" ry="18" fill="url(#goldGrad)"/>
    <!-- Tier 2 (Middle Tray - 5 flames) -->
    <ellipse cx="0" cy="40" rx="100" ry="14" fill="url(#goldGrad)"/>
    <!-- Tier 1 (Top Tray - 3 flames) -->
    <ellipse cx="0" cy="-5" rx="60" ry="10" fill="url(#goldGrad)"/>
    <!-- Apex Camphor Cup (Main Maha Harathi) -->
    <ellipse cx="0" cy="-45" rx="30" ry="8" fill="url(#deepGold)"/>

    <!-- Radiant Camphor Flames -->
    <!-- Apex Flame -->
    <path d="M 0 -45 Q 12 -80 0 -115 Q -12 -80 0 -45 Z" fill="url(#flameGrad)" filter="url(#glow)"/>
    <!-- Tier 1 Flames -->
    <path d="M -40 -10 Q -34 -35 -40 -55 Q -46 -35 -40 -10 Z" fill="url(#flameGrad)" filter="url(#softGlow)"/>
    <path d="M 40 -10 Q 46 -35 40 -55 Q 34 -35 40 -10 Z" fill="url(#flameGrad)" filter="url(#softGlow)"/>
    <!-- Tier 2 Flames -->
    <path d="M -80 35 Q -74 15 -80 -5 Q -86 15 -80 35 Z" fill="url(#flameGrad)" filter="url(#softGlow)"/>
    <path d="M 80 35 Q 86 15 80 -5 Q 74 15 80 35 Z" fill="url(#flameGrad)" filter="url(#softGlow)"/>
    <!-- Tier 3 Flames -->
    <path d="M -120 85 Q -114 65 -120 45 Q -126 65 -120 85 Z" fill="url(#flameGrad)" filter="url(#softGlow)"/>
    <path d="M 120 85 Q 126 65 120 45 Q 114 65 120 85 Z" fill="url(#flameGrad)" filter="url(#softGlow)"/>
  </g>

  <!-- Title Plate -->
  <rect x="180" y="505" width="440" height="65" rx="14" fill="#31070C" stroke="url(#goldGrad)" stroke-width="2"/>
  <text x="400" y="532" fill="#FFE082" font-family="serif" font-size="20" font-weight="bold" text-anchor="middle" letter-spacing="2">॥ మహా మంగళ హారతి ॥</text>
  <text x="400" y="555" fill="#FFD54F" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle" letter-spacing="3">MAHA MANGALA HARATHI - CAMPHOR FLAME</text>
'''
make_svg('pooja-harathi', harathi_content)

# 12. Nitya Kalyanotsavam (Celestial Wedding)
kalyanotsavam_content = '''
  <circle cx="400" cy="220" r="180" fill="url(#haloGlow)"/>

  <!-- Divine Kalyana Mandapam Canopy -->
  <path d="M 220 180 Q 400 120 580 180" fill="none" stroke="url(#deepGold)" stroke-width="14"/>
  <!-- Hanging Jasmine & Marigold Festoons -->
  <path d="M 240 190 Q 320 230 400 190 Q 480 230 560 190" fill="none" stroke="#FFF" stroke-width="6" stroke-dasharray="6,4"/>
  <path d="M 240 205 Q 320 245 400 205 Q 480 245 560 205" fill="none" stroke="#FF9800" stroke-width="6" stroke-dasharray="6,4"/>

  <!-- Sacred Golden Mangalasutram (Thali) -->
  <g transform="translate(400, 310)">
    <!-- Yellow Turmeric Cord -->
    <path d="M -100 -80 Q -50 0 0 20 Q 50 0 100 -80" fill="none" stroke="#FFD54F" stroke-width="6"/>
    <!-- Twin Golden Thali Cups (Bottu) -->
    <circle cx="-12" cy="30" r="18" fill="url(#deepGold)" stroke="#FFE082" stroke-width="2"/>
    <circle cx="12" cy="30" r="18" fill="url(#deepGold)" stroke="#FFE082" stroke-width="2"/>
    <circle cx="-12" cy="30" r="6" fill="#D32F2F"/>
    <circle cx="12" cy="30" r="6" fill="#D32F2F"/>
  </g>

  <!-- Sacred Akshintalu (Golden consecrated rice shower) -->
  <g fill="#FFD54F" filter="url(#softGlow)">
    <circle cx="340" cy="240" r="4"/>
    <circle cx="360" cy="210" r="3.5"/>
    <circle cx="420" cy="205" r="4"/>
    <circle cx="450" cy="235" r="3.5"/>
    <circle cx="380" cy="225" r="4"/>
    <circle cx="410" cy="245" r="3"/>
  </g>

  <!-- Homam / Agni Kunda in wedding -->
  <g transform="translate(400, 430)">
    <polygon points="-60,40 60,40 45,0 -45,0" fill="#B71C1C" stroke="url(#goldGrad)" stroke-width="2"/>
    <path d="M 0 5 Q 12 -20 0 -45 Q -12 -20 0 5 Z" fill="url(#flameGrad)" filter="url(#softGlow)"/>
  </g>

  <!-- Title Plate -->
  <rect x="180" y="505" width="440" height="65" rx="14" fill="#31070C" stroke="url(#goldGrad)" stroke-width="2"/>
  <text x="400" y="532" fill="#FFE082" font-family="serif" font-size="20" font-weight="bold" text-anchor="middle" letter-spacing="2">॥ నిత్య కళ్యాణోత్సవం ॥</text>
  <text x="400" y="555" fill="#FFD54F" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle" letter-spacing="3">NITYA KALYANOTSAVAM - CELESTIAL WEDDING</text>
'''
make_svg('pooja-kalyanotsavam', kalyanotsavam_content)

# 13. Maha Brahmotsavam Rathotsavam (Grand Wooden Chariot)
brahmotsavam_content = '''
  <!-- Grand Wooden Temple Ratham (Chariot) -->
  <!-- Chariot Pinnacle Kalasham -->
  <circle cx="400" cy="80" r="8" fill="#FFE082"/>
  <polygon points="380,120 420,120 400,85" fill="url(#deepGold)"/>

  <!-- Chariot Pyramidal Canopy (Gopura Shikharam on Ratham) -->
  <polygon points="320,200 480,200 440,120 360,120" fill="#C2185B" stroke="url(#goldGrad)" stroke-width="3"/>
  <polygon points="260,290 540,290 500,200 300,200" fill="#B71C1C" stroke="url(#goldGrad)" stroke-width="3"/>

  <!-- Deity Mandapam within Chariot -->
  <rect x="280" y="290" width="240" height="90" fill="#1C0508" stroke="url(#deepGold)" stroke-width="4"/>
  <!-- Murthi in Chariot -->
  <circle cx="400" cy="330" r="24" fill="url(#haloGlow)"/>
  <polygon points="390,325 410,325 400,300" fill="url(#deepGold)"/>
  <!-- Thirunamam -->
  <rect x="397" y="325" width="6" height="12" fill="#FFF"/>
  <rect x="399" y="325" width="2" height="10" fill="#D50000"/>

  <!-- Chariot Huge Carved Wooden Wheels (Chakras) -->
  <g transform="translate(400, 420)">
    <!-- Left Huge Wheel -->
    <circle cx="-130" cy="20" r="45" fill="#4E342E" stroke="url(#goldGrad)" stroke-width="6"/>
    <circle cx="-130" cy="20" r="14" fill="url(#deepGold)"/>
    <line x1="-130" y1="-25" x2="-130" y2="65" stroke="#FFE082" stroke-width="3"/>
    <line x1="-175" y1="20" x2="-85" y2="20" stroke="#FFE082" stroke-width="3"/>

    <!-- Right Huge Wheel -->
    <circle cx="130" cy="20" r="45" fill="#4E342E" stroke="url(#goldGrad)" stroke-width="6"/>
    <circle cx="130" cy="20" r="14" fill="url(#deepGold)"/>
    <line x1="130" y1="-25" x2="130" y2="65" stroke="#FFE082" stroke-width="3"/>
    <line x1="85" y1="20" x2="175" y2="20" stroke="#FFE082" stroke-width="3"/>
    
    <!-- Chariot Ropes pulled by Devotees (Vada) -->
    <path d="M -180 40 Q -240 60 -300 70" stroke="url(#goldGrad)" stroke-width="8" stroke-dasharray="8,4" fill="none"/>
    <path d="M 180 40 Q 240 60 300 70" stroke="url(#goldGrad)" stroke-width="8" stroke-dasharray="8,4" fill="none"/>
  </g>

  <!-- Title Plate -->
  <rect x="180" y="505" width="440" height="65" rx="14" fill="#31070C" stroke="url(#goldGrad)" stroke-width="2"/>
  <text x="400" y="532" fill="#FFE082" font-family="serif" font-size="20" font-weight="bold" text-anchor="middle" letter-spacing="2">॥ శ్రీ బ్రహ్మోత్సవ రథోత్సవం ॥</text>
  <text x="400" y="555" fill="#FFD54F" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle" letter-spacing="3">SRI BRAHMOTSAVAM RATHOTSAVAM CHARIOT</text>
'''
make_svg('festival-brahmotsavam', brahmotsavam_content)

# 14. Vaikuntha Ekadasi (Uttara Dwara Darshanam)
vaikuntha_content = '''
  <!-- Divine Gateway of Vaikuntha (Heavenly Northern Gate) -->
  <rect x="50" y="50" width="700" height="440" fill="#180407"/>

  <!-- Radiant Beams radiating from Gateway -->
  <path d="M 400 240 L 150 50 L 650 50 Z" fill="url(#haloGlow)" opacity="0.6"/>

  <!-- Golden Vaikuntha Dwaram Arch -->
  <path d="M 250 480 L 250 200 Q 400 110 550 200 L 550 480 Z" fill="none" stroke="url(#deepGold)" stroke-width="16"/>
  <path d="M 270 480 L 270 215 Q 400 135 530 215 L 530 480 Z" fill="none" stroke="#FFE082" stroke-width="4"/>

  <!-- Flanking Dwarapalakas (Jaya & Vijaya) with Conch & Discus -->
  <!-- Left Jaya -->
  <g transform="translate(190, 320)">
    <rect x="-20" y="-80" width="40" height="180" rx="8" fill="url(#deepGold)"/>
    <circle cx="0" cy="-95" r="14" fill="url(#goldGrad)"/>
    <line x1="0" y1="100" x2="0" y2="-70" stroke="#FFE082" stroke-width="4"/> <!-- Gada mace -->
  </g>
  <!-- Right Vijaya -->
  <g transform="translate(610, 320)">
    <rect x="-20" y="-80" width="40" height="180" rx="8" fill="url(#deepGold)"/>
    <circle cx="0" cy="-95" r="14" fill="url(#goldGrad)"/>
    <line x1="0" y1="100" x2="0" y2="-70" stroke="#FFE082" stroke-width="4"/>
  </g>

  <!-- Lord Venkateswara Swamy blessing from the Celestial Gate -->
  <g transform="translate(400, 320)">
    <polygon points="-25,0 25,0 15,-80 0,-105 -15,-80" fill="url(#deepGold)"/>
    <!-- Sacred Thirunamam glowing -->
    <rect x="-10" y="-5" width="20" height="16" fill="#000"/>
    <path d="M -7 -3 L -4 6 L 4 6 L 7 -3 Z" fill="#FFF"/>
    <rect x="-1" y="-3" width="2" height="12" fill="#D50000"/>
    <!-- Abhaya Mudra -->
    <circle cx="-35" cy="50" r="14" fill="url(#goldGrad)"/>
  </g>

  <!-- Title Plate -->
  <rect x="180" y="505" width="440" height="65" rx="14" fill="#31070C" stroke="url(#goldGrad)" stroke-width="2"/>
  <text x="400" y="532" fill="#FFE082" font-family="serif" font-size="20" font-weight="bold" text-anchor="middle" letter-spacing="2">॥ వైకుంఠ ఏకాదశి ఉత్తర ద్వార దర్శనం ॥</text>
  <text x="400" y="555" fill="#FFD54F" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle" letter-spacing="3">VAIKUNTHA EKADASI - SACRED NORTHERN GATE</text>
'''
make_svg('festival-vaikuntha', vaikuntha_content)

# 15. Karthika Deepotsavam (Festival of Lamps)
karthika_content = '''
  <!-- Night Twilight Canvas -->
  <rect x="50" y="50" width="700" height="440" fill="#140306"/>
  <circle cx="400" cy="180" r="140" fill="url(#haloGlow)" opacity="0.5"/>

  <!-- Temple Steps / Ghat covered in Diyas -->
  <!-- Main Grand Brass Deepastambham (Tower of 108 Lamps) -->
  <g transform="translate(400, 240)">
    <line x1="0" y1="220" x2="0" y2="0" stroke="url(#deepGold)" stroke-width="12"/>
    <ellipse cx="0" cy="20" rx="35" ry="8" fill="url(#goldGrad)"/>
    <ellipse cx="0" cy="65" rx="60" ry="10" fill="url(#goldGrad)"/>
    <ellipse cx="0" cy="115" rx="90" ry="12" fill="url(#goldGrad)"/>
    <ellipse cx="0" cy="165" rx="120" ry="14" fill="url(#goldGrad)"/>

    <!-- Brilliant Ghee Lamp Flames -->
    <!-- Apex Flame -->
    <path d="M 0 0 Q 8 -25 0 -45 Q -8 -25 0 0 Z" fill="url(#flameGrad)" filter="url(#glow)"/>
    <!-- Tier 1 -->
    <path d="M -30 20 Q -24 5 -30 -10 Q -36 5 -30 20 Z" fill="url(#flameGrad)" filter="url(#softGlow)"/>
    <path d="M 30 20 Q 36 5 30 -10 Q 24 5 30 20 Z" fill="url(#flameGrad)" filter="url(#softGlow)"/>
    <!-- Tier 2 -->
    <path d="M -55 65 Q -49 50 -55 35 Q -61 50 -55 65 Z" fill="url(#flameGrad)" filter="url(#softGlow)"/>
    <path d="M 55 65 Q 61 50 55 35 Q 49 50 55 65 Z" fill="url(#flameGrad)" filter="url(#softGlow)"/>
    <!-- Tier 3 -->
    <path d="M -85 115 Q -79 100 -85 85 Q -91 100 -85 115 Z" fill="url(#flameGrad)" filter="url(#softGlow)"/>
    <path d="M 85 115 Q 91 100 85 85 Q 79 100 85 115 Z" fill="url(#flameGrad)" filter="url(#softGlow)"/>
    <!-- Tier 4 -->
    <path d="M -115 165 Q -109 150 -115 135 Q -121 150 -115 165 Z" fill="url(#flameGrad)" filter="url(#softGlow)"/>
    <path d="M 115 165 Q 121 150 115 135 Q 109 150 115 165 Z" fill="url(#flameGrad)" filter="url(#softGlow)"/>
  </g>

  <!-- Rows of Earthen Terracotta Diyas in Foreground -->
  <g transform="translate(150, 440)">
    <ellipse cx="0" cy="0" rx="20" ry="7" fill="#A1887F"/>
    <path d="M 0 -3 Q 6 -18 0 -28 Q -6 -18 0 -3 Z" fill="url(#flameGrad)" filter="url(#softGlow)"/>
  </g>
  <g transform="translate(230, 445)">
    <ellipse cx="0" cy="0" rx="20" ry="7" fill="#A1887F"/>
    <path d="M 0 -3 Q 6 -18 0 -28 Q -6 -18 0 -3 Z" fill="url(#flameGrad)" filter="url(#softGlow)"/>
  </g>
  <g transform="translate(570, 445)">
    <ellipse cx="0" cy="0" rx="20" ry="7" fill="#A1887F"/>
    <path d="M 0 -3 Q 6 -18 0 -28 Q -6 -18 0 -3 Z" fill="url(#flameGrad)" filter="url(#softGlow)"/>
  </g>
  <g transform="translate(650, 440)">
    <ellipse cx="0" cy="0" rx="20" ry="7" fill="#A1887F"/>
    <path d="M 0 -3 Q 6 -18 0 -28 Q -6 -18 0 -3 Z" fill="url(#flameGrad)" filter="url(#softGlow)"/>
  </g>

  <!-- Title Plate -->
  <rect x="180" y="505" width="440" height="65" rx="14" fill="#31070C" stroke="url(#goldGrad)" stroke-width="2"/>
  <text x="400" y="532" fill="#FFE082" font-family="serif" font-size="20" font-weight="bold" text-anchor="middle" letter-spacing="2">॥ కార్తీక దీపోత్సవం ॥</text>
  <text x="400" y="555" fill="#FFD54F" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle" letter-spacing="3">KARTHIKA DEEPOTSAVAM - FESTIVAL OF LIGHTS</text>
'''
make_svg('festival-karthika', karthika_content)

# 16. Nitya Annadanam & Sacred Tirupati Laddu Prasadam
annadanam_content = '''
  <circle cx="400" cy="240" r="170" fill="url(#haloGlow)"/>

  <!-- Fresh Banana Leaf (Arati Aaku) Traditional Serving -->
  <path d="M 160 380 Q 400 320 640 380 Q 400 480 160 380 Z" fill="#2E7D32" stroke="#4CAF50" stroke-width="3"/>
  <line x1="160" y1="380" x2="640" y2="380" stroke="#81C784" stroke-width="2"/>

  <!-- Sacred Golden Tirupati Srivari Laddu Prasadam -->
  <g transform="translate(400, 310)">
    <!-- Big Golden Laddu -->
    <circle cx="0" cy="0" r="65" fill="url(#deepGold)" stroke="#FFE082" stroke-width="3" filter="url(#softGlow)"/>
    <!-- Cashew Nuts, Cardamom & Kishmish embeds -->
    <ellipse cx="-25" cy="-20" rx="12" ry="7" fill="#FFFDE7"/> <!-- Cashew -->
    <ellipse cx="25" cy="-15" rx="12" ry="7" fill="#FFFDE7"/>
    <ellipse cx="-10" cy="25" rx="12" ry="7" fill="#FFFDE7"/>
    <circle cx="20" cy="25" r="5" fill="#3E2723"/> <!-- Kishmish raisin -->
    <circle cx="0" cy="-35" r="4" fill="#1B5E20"/> <!-- Cardamom Pachakarpuram -->
    <!-- Sacred Tulasi sprig atop Laddu -->
    <path d="M 0 -65 Q -15 -85 0 -95 Q 15 -85 0 -65 Z" fill="#2E7D32"/>
    <path d="M -10 -75 Q -25 -85 -10 -95 Z" fill="#388E3C"/>
    <path d="M 10 -75 Q 25 -85 10 -95 Z" fill="#388E3C"/>
  </g>

  <!-- Steaming Annaprasadam (Pulihora / Sweet Pongal) bowls flanking -->
  <g transform="translate(250, 380)">
    <ellipse cx="0" cy="10" rx="35" ry="15" fill="url(#goldGrad)"/>
    <path d="M 0 0 Q -5 -20 0 -35" stroke="#E0E0E0" stroke-width="2" fill="none" opacity="0.6"/> <!-- steam -->
  </g>
  <g transform="translate(550, 380)">
    <ellipse cx="0" cy="10" rx="35" ry="15" fill="url(#goldGrad)"/>
    <path d="M 0 0 Q 5 -20 0 -35" stroke="#E0E0E0" stroke-width="2" fill="none" opacity="0.6"/>
  </g>

  <!-- Title Plate -->
  <rect x="180" y="505" width="440" height="65" rx="14" fill="#31070C" stroke="url(#goldGrad)" stroke-width="2"/>
  <text x="400" y="532" fill="#FFE082" font-family="serif" font-size="20" font-weight="bold" text-anchor="middle" letter-spacing="2">॥ నిత్య అన్నప్రసాదం &amp; శ్రీవారి లడ్డూ ॥</text>
  <text x="400" y="555" fill="#FFD54F" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle" letter-spacing="3">NITYA ANNADANAM &amp; SACRED LADDU PRASADAM</text>
'''
make_svg('annadanam-prasadam', annadanam_content)

print('All 16 dummy temple and god images generated successfully!')

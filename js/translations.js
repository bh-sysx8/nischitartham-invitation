/* ==========================================================================
   translations.js — all display text, hard-coded, one object per language.
   No machine translation runs at runtime; nothing here is fetched.
   {bride}, {groom}, {brideParents}, {groomParents}, {url} are filled from
   config.js so names are stored in exactly one place.
   ========================================================================== */
window.I18N = {

  /* ======================= ENGLISH ======================= */
  en: {
    htmlLang: 'en',
    fontClass: 'lang-en',
    meta: {
      title: 'Nischitardham · Lakshmi Sowmya & Praneeth Chandra',
      description: 'The Nischitardham of Lakshmi Sowmya Donepudi and Praneeth Chandra Bogineni — Sunday, 15 November 2026 at 9:30 AM, SVN Conventions, Vijayawada.'
    },

    kicker: 'With the blessings of our elders',
    title: 'Nischitardham',
    lede: 'The engagement ceremony of',

    message: 'With hearts full of gratitude, our two families invite you to share in the Nischitardham of our children — a morning of blessings, laughter and new beginnings. Your presence will make our joy complete.',

    names: {
      bride: 'Lakshmi Sowmya Donepudi',
      groom: 'Praneeth Chandra Bogineni',
      brideParents: ['Sita Donepudi', 'Sridhar Donepudi'],
      groomParents: ['Madhavi Bogineni', 'Surendra Siva Prasad Bogineni']
    },
    and: 'and',
    daughterOf: 'Daughter of {brideParents}',
    sonOf: 'Son of {groomParents}',
    parentsJoin: ' & ',

    date: 'Sunday, 15 November 2026',
    time: '9:30 AM IST',
    venueName: 'SVN Conventions',
    address: 'To, 100 Feet Rd, Tadigadapa, Enikepadu, Poranki, Andhra Pradesh 520007',
    city: 'Vijayawada, Andhra Pradesh, India',

    actions: {
      calendar: 'Add to calendar',
      ics: 'Download .ics file',
      google: 'Add to Google Calendar',
      directions: 'Get directions',
      whatsapp: 'Share on WhatsApp',
      copy: 'Copy link'
    },
    aria: {
      langGroup: 'Choose language',
      ganesha: 'Lord Ganesha',
      details: 'Event details',
      qr: 'QR code that opens this invitation',
      menu: 'Calendar options'
    },
    toast: {
      copied: 'Invitation link copied',
      copyError: 'Could not copy automatically. Please copy the link from your browser address bar.'
    },
    qr: {
      caption: 'Scan to open the invitation',
      note: 'This QR opens the published invitation.'
    },
    footer: 'With love, the Donepudi & Bogineni families',

    share: 'You are warmly invited to the Nischitardham of Lakshmi Sowmya & Praneeth Chandra on Sunday, 15 November 2026 at 9:30 AM, at SVN Conventions, Vijayawada. Open the invitation: {url}',
    calendarEvent: {
      summary: 'Nischitardham – Lakshmi Sowmya & Praneeth Chandra',
      description: 'The Nischitardham of Lakshmi Sowmya Donepudi and Praneeth Chandra Bogineni. Both families warmly invite you to share in the ceremony.\n\nVenue: SVN Conventions, To, 100 Feet Rd, Tadigadapa, Enikepadu, Poranki, Andhra Pradesh 520007\n\nDirections: https://maps.app.goo.gl/8UAu74C3tKZx4CgZ8'
    }
  },

  /* ======================= TELUGU ======================= */
  te: {
    htmlLang: 'te',
    fontClass: 'lang-te',
    meta: {
      title: 'నిశ్చితార్థం · లక్ష్మీ సౌమ్య & ప్రణీత్ చంద్ర',
      description: 'లక్ష్మీ సౌమ్య దొనేపూడి మరియు ప్రణీత్ చంద్ర బోగినేని నిశ్చితార్థం — ఆదివారం, 15 నవంబర్ 2026, ఉదయం 9:30 గంటలకు, SVN Conventions, విజయవాడ.'
    },

    kicker: 'పెద్దల ఆశీర్వాదంతో',
    title: 'నిశ్చితార్థం',
    lede: 'వీరి నిశ్చితార్థ వేడుక',

    message: 'కృతజ్ఞతతో నిండిన హృదయాలతో, మా ఇరు కుటుంబాలు మా పిల్లల నిశ్చితార్థానికి మిమ్మల్ని సాదరంగా ఆహ్వానిస్తున్నాయి. ఆశీర్వాదాలతో, నవ్వులతో మొదలయ్యే ఈ శుభవేళ మీ రాకతో మా ఆనందం పూర్ణమవుతుంది.',

    names: {
      bride: 'లక్ష్మీ సౌమ్య దొనేపూడి',
      groom: 'ప్రణీత్ చంద్ర బోగినేని',
      brideParents: ['సీత దొనేపూడి', 'శ్రీధర్ దొనేపూడి'],
      groomParents: ['మాధవి బోగినేని', 'సురేంద్ర శివ ప్రసాద్ బోగినేని']
    },
    and: 'మరియు',
    daughterOf: '{brideParents} గార్ల కుమార్తె',
    sonOf: '{groomParents} గార్ల కుమారుడు',
    parentsJoin: ' మరియు ',

    date: 'ఆదివారం, 15 నవంబర్ 2026',
    time: 'ఉదయం 9:30 గంటలకు (భారత కాలమానం)',
    venueName: 'SVN Conventions',
    address: 'To, 100 Feet Rd, Tadigadapa, Enikepadu, Poranki, Andhra Pradesh 520007',
    city: 'విజయవాడ, ఆంధ్రప్రదేశ్, భారతదేశం',

    actions: {
      calendar: 'క్యాలెండర్‌కు జోడించండి',
      ics: '.ics ఫైల్ డౌన్‌లోడ్',
      google: 'Google Calendar లో జోడించండి',
      directions: 'మార్గం చూడండి',
      whatsapp: 'WhatsApp లో పంపండి',
      copy: 'లింక్ కాపీ చేయండి'
    },
    aria: {
      langGroup: 'భాషను ఎంచుకోండి',
      ganesha: 'వినాయకుడు',
      details: 'వేడుక వివరాలు',
      qr: 'ఈ ఆహ్వానాన్ని తెరిచే QR కోడ్',
      menu: 'క్యాలెండర్ ఎంపికలు'
    },
    toast: {
      copied: 'ఆహ్వాన లింక్ కాపీ అయింది',
      copyError: 'లింక్ కాపీ చేయలేకపోయాం. దయచేసి బ్రౌజర్ చిరునామా పట్టీ నుండి కాపీ చేయండి.'
    },
    qr: {
      caption: 'ఆహ్వానాన్ని తెరవడానికి స్కాన్ చేయండి',
      note: 'ఈ QR కోడ్ ప్రచురిత ఆహ్వానానికి దారి తీస్తుంది.'
    },
    footer: 'ప్రేమతో, దొనేపూడి మరియు బోగినేని కుటుంబాలు',

    share: 'లక్ష్మీ సౌమ్య మరియు ప్రణీత్ చంద్రల నిశ్చితార్థానికి మీకు హృదయపూర్వక ఆహ్వానం — ఆదివారం, 15 నవంబర్ 2026, ఉదయం 9:30 గంటలకు, SVN Conventions, విజయవాడ. ఆహ్వానం ఇక్కడ చూడండి: {url}',
    calendarEvent: {
      summary: 'Nischitardham – Lakshmi Sowmya & Praneeth Chandra',
      description: 'లక్ష్మీ సౌమ్య దొనేపూడి మరియు ప్రణీత్ చంద్ర బోగినేని నిశ్చితార్థం. ఈ శుభవేళకు మిమ్మల్ని సాదరంగా ఆహ్వానిస్తున్నాము.\n\nవేదిక: SVN Conventions, To, 100 Feet Rd, Tadigadapa, Enikepadu, Poranki, Andhra Pradesh 520007\n\nమార్గం: https://maps.app.goo.gl/8UAu74C3tKZx4CgZ8'
    }
  }
};

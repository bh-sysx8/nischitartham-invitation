/* ==========================================================================
   translations.js — all display text, hard-coded, one object per language.
   No machine translation runs at runtime; nothing here is fetched.
   English is the second edition; Telugu is the default on first visit.
   ========================================================================== */
window.I18N = {

  /* ======================= TELUGU (default) ======================= */
  te: {
    htmlLang: 'te',
    fontClass: 'lang-te',
    meta: {
      title: 'నిశ్చితార్థపు ఆహ్వానము · ప్రణీత్ చంద్ర మరియు లక్ష్మీ సౌమ్య',
      description: 'చి॥ ప్రణీత్ చంద్ర బోగినేని మరియు చి॥ లా॥ సౌ॥ లక్ష్మీ సౌమ్య దొనేపూడి నిశ్చితార్థపు ఆహ్వానము — 15-11-2026 ఆదివారం ఉదయం గం॥ 9:30 ని॥లకు, ఎస్.వి.ఎన్. కన్వెన్షన్స్, విజయవాడ.'
    },

    heading: 'నిశ్చితార్థపు ఆహ్వానము',
    intro: 'మా పుత్రుడు',

    names: {
      groom: 'చి॥ ప్రణీత్ చంద్ర బోగినేని',
      groomParents: '(శ్రీమతి మాధవి బోగినేని మరియు శ్రీ సురేంద్ర శివ ప్రసాద్ బోగినేని గార్ల పెద్ద కుమారుడు)',
      bride: 'చి॥ లా॥ సౌ॥ లక్ష్మీ సౌమ్య దొనేపూడి',
      brideParents: '(శ్రీమతి సీత దొనేపూడి మరియు శ్రీ శ్రీధర్ దొనేపూడి గార్ల కుమార్తె)'
    },
    with: 'మరియు',
    /* The sentence continues from the bride's surname on the printed card. */
    note: 'ల నిశ్చితార్థ వేడుకను పెద్దలు నిశ్చయించినారు. ఈ శుభ సందర్భమునకు తాము సకుటుంబ సపరివార సమేతంగా విచ్చేసి మా ఆనందాన్ని పంచుకోవలసిందిగా సాదరంగా ఆహ్వానిస్తున్నాము.',

    labels: {
      when: 'సమయం:',
      venue: 'వేదిక:',
      maps: 'గూగుల్ మ్యాప్స్:'
    },
    when: '15-11-2026వ తేదీ ఆదివారం ఉదయం గం॥\u00A09:30\u00A0ని॥లకు',
    venue: 'ఎస్.వి.ఎన్. కన్వెన్షన్స్, 100 ఫీట్ రోడ్, తాడిగడప, ఎనికేపాడు, పొరంకి, విజయవాడ, ఆంధ్రప్రదేశ్ - 520007.',

    hostsLabel: 'ఆహ్వానించువారు:',
    hosts: 'శ్రీమతి మాధవి బోగినేని - శ్రీ సురేంద్ర శివ ప్రసాద్ బోగినేని',

    actions: {
      calendar: 'గూగుల్ క్యాలెండర్‌లో జోడించండి',
      directions: 'మార్గం చూడండి',
      copy: 'లింక్ కాపీ చేయండి'
    },
    aria: {
      langGroup: 'భాషను ఎంచుకోండి',
      ganesha: 'వినాయకుడు',
      details: 'వేడుక వివరాలు',
      qr: 'ఈ ఆహ్వానాన్ని తెరిచే QR కోడ్',
      mapsLink: 'గూగుల్ మ్యాప్స్ లింక్'
    },
    toast: {
      copied: 'ఆహ్వాన లింక్ కాపీ అయింది',
      copyError: 'లింక్ కాపీ చేయలేకపోయాం. దయచేసి బ్రౌజర్ చిరునామా పట్టీ నుండి కాపీ చేయండి.'
    },
    qr: {
      caption: 'ఆహ్వానాన్ని తెరవడానికి స్కాన్ చేయండి',
      note: 'ఈ QR కోడ్ ప్రచురిత ఆహ్వానానికి దారి తీస్తుంది.'
    },

    calendarEvent: {
      summary: 'నిశ్చితార్థం – ప్రణీత్ చంద్ర మరియు లక్ష్మీ సౌమ్య',
      description: 'చి॥ ప్రణీత్ చంద్ర బోగినేని మరియు చి॥ లా॥ సౌ॥ లక్ష్మీ సౌమ్య దొనేపూడి నిశ్చితార్థపు ఆహ్వానము.\n\nవేదిక: ఎస్.వి.ఎన్. కన్వెన్షన్స్, 100 ఫీట్ రోడ్, తాడిగడప, ఎనికేపాడు, పొరంకి, విజయవాడ, ఆంధ్రప్రదేశ్ - 520007.\n\nమార్గం: https://maps.app.goo.gl/8UAu74C3tKZx4CgZ8'
    }
  },

  /* ======================= ENGLISH ======================= */
  en: {
    htmlLang: 'en',
    fontClass: 'lang-en',
    meta: {
      title: 'Formal Engagement Ceremony · Praneeth Chandra & Lakshmi Sowmya',
      description: 'Formal engagement ceremony of Chi. Praneeth Chandra Bogineni and Chi. Sou. Lakshmi Sowmya Donepudi — Sunday, 15th November 2026 at 9:30 a.m., SVN Conventions, Vijayawada.'
    },

    heading: 'Formal Engagement Ceremony',
    intro: 'With great joy and pleasure, we cordially invite you, along with your family and friends, to grace the auspicious occasion of the formal engagement ceremony of our son',

    names: {
      groom: 'Chi. Praneeth Chandra Bogineni',
      groomParents: '(Elder Son of Smt. Madhavi Bogineni and Sri Surendra Siva Prasad Bogineni)',
      bride: 'Chi. Sou. Lakshmi Sowmya Donepudi',
      brideParents: '(Daughter of Smt. Sita Donepudi and Sri Sridhar Donepudi)'
    },
    with: 'with',
    note: 'We request your gracious presence on this joyous occasion.',

    labels: {
      when: 'Date and Time:',
      venue: 'Venue:',
      maps: 'Google Maps:'
    },
    when: 'Sunday, 15th November 2026 at 9:30 a.m.',
    venue: 'SVN Conventions, To, 100 Feet Rd, Tadigadapa, Enikepadu, Poranki, Andhra Pradesh 520007, Vijayawada.',

    hostsLabel: 'Cordially yours...',
    hosts: 'Smt. Madhavi Bogineni & Sri Surendra Siva Prasad Bogineni',

    actions: {
      calendar: 'Add to Google Calendar',
      directions: 'Get directions',
      copy: 'Copy link'
    },
    aria: {
      langGroup: 'Choose language',
      ganesha: 'Lord Ganesha',
      details: 'Event details',
      qr: 'QR code that opens this invitation',
      mapsLink: 'Google Maps link'
    },
    toast: {
      copied: 'Invitation link copied',
      copyError: 'Could not copy automatically. Please copy the link from your browser address bar.'
    },
    qr: {
      caption: 'Scan to open the invitation',
      note: 'This QR opens the published invitation.'
    },

    calendarEvent: {
      summary: 'Nischitardham – Praneeth Chandra & Lakshmi Sowmya',
      description: 'The formal engagement ceremony of Chi. Praneeth Chandra Bogineni and Chi. Sou. Lakshmi Sowmya Donepudi. Both families warmly invite you to share in the occasion.\n\nVenue: SVN Conventions, To, 100 Feet Rd, Tadigadapa, Enikepadu, Poranki, Andhra Pradesh 520007, Vijayawada.\n\nDirections: https://maps.app.goo.gl/8UAu74C3tKZx4CgZ8'
    }
  }
};

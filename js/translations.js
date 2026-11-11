/* ============================================================================
   translations.js — the two independent language editions.
   Telugu (te) is the default edition. English (en) is the optional edition.

   Each edition is hard-coded, supplied content. They are NOT translations of
   one another: wording, sentence structure and block order differ on purpose.
   Do not machine-translate, transliterate or paraphrase these strings.
   ========================================================================== */

const MAPS_URL = 'https://maps.app.goo.gl/8UAu74C3tKZx4CgZ8';

const TRANSLATIONS = {

  /* ------------------------------------------------------------------ TELUGU */
  te: {
    lang: 'te',
    dir: 'ltr',
    ganeshaAlt: 'శ్రీ గణేశుడు — బంగారు రేఖా చిత్రం',

    blocks: [
      { type: 'title',     text: 'నిశ్చితార్థపు ఆహ్వానము' },
      { type: 'divider' },
      { type: 'lead',      text: 'మా పుత్రుడు' },
      { type: 'name',      text: 'చి॥ ప్రణీత్ చంద్ర బోగినేని' },
      { type: 'parentage', text: '(శ్రీమతి మాధవి బోగినేని మరియు శ్రీ సురేంద్ర శివ ప్రసాద్ బోగినేని గార్ల పెద్ద కుమారుడు)' },
      { type: 'connector', text: 'మరియు' },
      { type: 'name',      text: 'చి॥ లా॥ సౌ॥ లక్ష్మీ సౌమ్య దోనేపూడి' },
      { type: 'parentage', text: '(శ్రీమతి సీత దోనేపూడి మరియు శ్రీ శ్రీధర్ దోనేపూడి గార్ల కుమార్తె)' },
      { type: 'divider' },
      {
        type: 'para',
        text: 'ల నిశ్చితార్థ వేడుకను పెద్దలు నిశ్చయించినారు. ఈ శుభ సందర్భమునకు తాము సకుటుంబ సపరివార సమేతంగా విచ్చేసి మా ఆనందాన్ని పంచుకోవలసిందిగా సాదరంగా ఆహ్వానిస్తున్నాము.'
      },
      {
        type: 'details',
        variant: 'stack',
        items: [
          { label: 'సమయం', value: '15-11-2026వ తేదీ ఆదివారం ఉదయం గం॥ 9:30 ని॥లకు' },
          {
            label: 'వేదిక',
            value: 'ఎస్.వి.ఎన్. కన్వెన్షన్స్, 100 ఫీట్ రోడ్, తాడిగడప, ఎనికేపాడు, పొరంకి, విజయవాడ, ఆంధ్రప్రదేశ్ - 520007.'
          },
          { label: 'గూగుల్ మ్యాప్స్', value: MAPS_URL, href: MAPS_URL }
        ]
      },
      { type: 'divider' },
      {
        type: 'signoff',
        label: 'ఆహ్వానించువారు:',
        lines: ['శ్రీమతి మాధవి బోగినేని - శ్రీ సురేంద్ర శివ ప్రసాద్ బోగినేని']
      }
    ],

    ui: {
      htmlLang: 'te',
      pageTitle: 'నిశ్చితార్థపు ఆహ్వానము — లక్ష్మీ సౌమ్య & ప్రణీత్ చంద్ర | 15 నవంబర్ 2026',
      pageDescription:
        'లక్ష్మీ సౌమ్య దోనేపూడి మరియు ప్రణీత్ చంద్ర బోగినేని గార్ల నిశ్చితార్థపు ఆహ్వానము — ఆదివారం, 15 నవంబర్ 2026, ఉదయం 9:30 ని॥లకు, ఎస్.వి.ఎన్. కన్వెన్షన్స్, విజయవాడ.',
      langGroupLabel: 'భాషను ఎంచుకోండి',
      calendar: 'గూగుల్ క్యాలెండర్‌లో చేర్చండి',
      calendarAria: 'గూగుల్ క్యాలెండర్‌లో ఈ వేడుకను కొత్త ట్యాబ్‌లో తెరవండి',
      maps: 'మార్గం చూడండి',
      mapsAria: 'ఎస్.వి.ఎన్. కన్వెన్షన్స్ మ్యాప్‌ను కొత్త ట్యాబ్‌లో తెరవండి',
      copy: 'ఆహ్వాన లింక్ కాపీ చేయండి',
      copyAria: 'ఈ ఆహ్వానం యొక్క లింక్‌ను కాపీ చేయండి',
      copied: 'ఆహ్వాన లింక్ కాపీ అయింది',
      copyError: 'లింక్ కాపీ కాలేదు. దయచేసి చిరునామా పట్టీ నుండి కాపీ చేయండి.'
    }
  },

  /* ----------------------------------------------------------------- ENGLISH */
  en: {
    lang: 'en',
    dir: 'ltr',
    ganeshaAlt: 'Lord Ganesha — gold line illustration',

    blocks: [
      { type: 'title', text: 'Formal Engagement Ceremony' },
      { type: 'divider' },
      {
        type: 'para',
        variant: 'lead',
        text: 'With great joy and pleasure, we cordially invite you, along with your family and friends, to grace the auspicious occasion of the formal engagement ceremony of our son'
      },
      { type: 'name',      text: 'Chi. Praneeth Chandra Bogineni' },
      { type: 'parentage', text: '(Elder Son of Smt. Madhavi Bogineni and Sri Surendra Siva Prasad Bogineni)' },
      { type: 'connector', text: 'with' },
      { type: 'name',      text: 'Chi. Sou. Lakshmi Sowmya Donepudi' },
      { type: 'parentage', text: '(Daughter of Smt. Sita Donepudi and Sri Sridhar Donepudi)' },
      { type: 'divider' },
      {
        type: 'details',
        variant: 'grid',
        items: [
          { label: 'Date and Time', value: 'Sunday, 15th November 2026 at 9:30 a.m.' },
          {
            label: 'Venue',
            value: 'SVN Conventions, To, 100 Feet Rd, Tadigadapa, Enikepadu, Poranki, Andhra Pradesh 520007, Vijayawada.'
          },
          { label: 'Google Maps', value: MAPS_URL, href: MAPS_URL }
        ]
      },
      {
        type: 'para',
        variant: 'request',
        text: 'We request your gracious presence on this joyous occasion.'
      },
      {
        type: 'signoff',
        label: 'Cordially yours...',
        lines: ['Smt. Madhavi Bogineni & Sri Surendra Siva Prasad Bogineni']
      }
    ],

    ui: {
      htmlLang: 'en',
      pageTitle: 'Nischitardham Invitation — Lakshmi Sowmya & Praneeth Chandra | 15 November 2026',
      pageDescription:
        'Formal engagement ceremony of Lakshmi Sowmya Donepudi and Praneeth Chandra Bogineni — Sunday, 15th November 2026 at 9:30 a.m., SVN Conventions, Vijayawada.',
      langGroupLabel: 'Choose language',
      calendar: 'Add to Google Calendar',
      calendarAria: 'Open this event in Google Calendar in a new tab',
      maps: 'Get Directions',
      mapsAria: 'Open the SVN Conventions map in a new tab',
      copy: 'Copy Invitation Link',
      copyAria: 'Copy the link to this invitation',
      copied: 'Invitation link copied',
      copyError: 'Could not copy the link. Please copy it from the address bar.'
    }
  }
};

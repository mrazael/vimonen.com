/**
 * Devlog-postaukset järjestyksessä (vanhin ensin).
 * ID:n on vastattava HTML-tiedoston nimeä.
 */
const devlogPosts = [
    { id: "001", title: "Github Pages", date: "2026-05-07" },
    { id: "002", title: "JS testi", date: "2026-05-07" },
];

// Vie lista muiden scriptien käyttöön
if (typeof module !== 'undefined') { module.exports = devlogPosts; }

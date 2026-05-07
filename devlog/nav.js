/**
 * Päivittää kaikki sivun navigointipainikkeet.
 * @param {Array} postaukset - Lista postausobjekteista.
 * @param {string} nykyinenId - Aktiivisen postauksen tunniste.
 */
function _paivita_navigointi(postaukset, nykyinenId) {
    const containers = document.querySelectorAll('.devlog-nav');
    if (!containers.length) return;

    const currentIndex = postaukset.findIndex(p => 
        p.id === nykyinenId || p.path.endsWith(nykyinenId)
    );

    /**
     * Apufunktio painikkeiden luontiin.
     */
    const luoNappi = (label, kohdeIdx) => {
        const onKelvollinen = kohdeIdx >= 0 && kohdeIdx < postaukset.length;
        const kohde = onKelvollinen ? postaukset[kohdeIdx] : null;
        const id = kohde ? (kohde.id || kohde.path.split('/').pop()) : '';
        
        return `<button onclick="window.location.href='index.html?id=${id}'" ${!onKelvollinen ? 'disabled' : ''}>${label}</button>`;
    };

    /**
     * Arpoo satunnaisen postauksen ID:n, joka ei ole nykyinen sivu.
     */
    const arvoRandom = () => {
        // Suodatetaan pois nykyinen postaus
        const ehdokkaat = postaukset.filter(p => {
            const id = p.id || p.path.split('/').pop();
            return id !== nykyinenId;
        });

        // Jos muita postauksia ei ole (lista on 1 postauksen pituinen), käytetään alkuperäistä listaa
        // const lista = ehdokkaat.length > 0 ? ehdokkaat : postaukset;
        
        const r = Math.floor(Math.random() * ehdokkaat.length);
        const valittu = lista[r];
        return valittu.id || valittu.path.split('/').pop();
    };

    const html = `
        ${luoNappi('|<', 0)}
        ${luoNappi('< Prev', currentIndex - 1)}
        <button onclick="window.location.href='index.html?id=${arvoRandom()}'">Random</button>
        ${luoNappi('Next >', currentIndex + 1)}
        ${luoNappi('>|', postaukset.length - 1)}
    `;

    containers.forEach(c => {
        c.innerHTML = html;
    });
}

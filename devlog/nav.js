/**
 * Luo ja päivittää navigointipainikkeet kaikkiin sivun navigointikontentteihin.
 * @param {Array} kaikkiPostaukset - Lista kaikista devlog-postauksista.
 * @param {string} nykyinenId - Ladatun postauksen tunniste (ID tai polun pääte).
 */
function _paivita_navigointi(kaikkiPostaukset, nykyinenId) {
    const containers = document.querySelectorAll('.devlog-nav');
    if (!containers.length) return;

    const currentIndex = kaikkiPostaukset.findIndex(p => 
        p.id === nykyinenId || p.path.endsWith(nykyinenId)
    );

    const luoPainike = (label, kohdeIdx) => {
        const onKaytossa = kohdeIdx >= 0 && kohdeIdx < kaikkiPostaukset.length;
        const kohde = onKaytossa ? kaikkiPostaukset[kohdeIdx] : null;
        const id = kohde ? (kohde.id || kohde.path.split('/').pop()) : '';
        
        return `<button onclick="window.location.href='index.html?id=${id}'" ${!onKaytossa ? 'disabled' : ''}>${label}</button>`;
    };

    const arvoSatunnainenId = () => {
        const r = Math.floor(Math.random() * kaikkiPostaukset.length);
        const p = kaikkiPostaukset[r];
        return p.id || p.path.split('/').pop();
    };

    const navHtml = `
        ${luoPainike('|<', 0)}
        ${luoPainike('< Prev', currentIndex - 1)}
        <button onclick="window.location.href='index.html?id=${arvoSatunnainenId()}'">Random</button>
        ${luoPainike('Next >', currentIndex + 1)}
        ${luoPainike('>|', kaikkiPostaukset.length - 1)}
    `;

    containers.forEach(c => c.innerHTML = navHtml);
}

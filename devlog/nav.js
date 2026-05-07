/**
 * Rakentaa navigoinnin devlog-postauksille yhdelle sivulle.
 */
(function() {
    const params = new URLSearchParams(window.location.search);
    const allPosts = devlogPosts;
    
    // Määritetään nykyinen ID
    let currentId = params.get('id');
    if (!currentId && allPosts.length > 0) {
        currentId = allPosts[allPosts.length - 1].path.split('/').pop().replace('.html', '');
    }
    
    const currentIndex = allPosts.findIndex(p => p.path.includes(currentId));

    function _luo_navigointi() {
        const containers = document.querySelectorAll('.devlog-nav');
        
        const btn = (label, targetIdx) => {
            const isDisabled = targetIdx === null || targetIdx < 0 || targetIdx >= allPosts.length;
            const id = !isDisabled ? allPosts[targetIdx].path.split('/').pop().replace('.html', '') : '';
            // Viitataan samaan index.html-tiedostoon eri ID:llä
            return `<button onclick="window.location.href='index.html?id=${id}'" ${isDisabled ? 'disabled' : ''}>${label}</button>`;
        };

        const randomId = () => {
            const r = Math.floor(Math.random() * allPosts.length);
            return allPosts[r].path.split('/').pop().replace('.html', '');
        };

        const navHtml = `
            ${btn('|<', 0)}
            ${btn('< Prev', currentIndex - 1)}
            <button onclick="window.location.href='archive.html'">Archive</button>
            <button onclick="window.location.href='index.html?id=${randomId()}'">Random</button>
            ${btn('Next >', currentIndex + 1)}
            ${btn('>|', allPosts.length - 1)}
        `;

        containers.forEach(c => c.innerHTML = navHtml);
    }
    window.onload = _luo_navigointi;
})();

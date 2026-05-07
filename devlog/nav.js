/**
 * Rakentaa navigoinnin devlog-postauksille.
 */
(function() {
    // Selvitetään nykyinen polku suhteessa 'content/'-kansioon
    const currentFullPath = window.location.pathname;
    const pathAfterContent = currentFullPath.split('/content/')[1];
    
    // Etsitään nykyisen postauksen indeksi posts.js-listasta
    const currentIndex = devlogPosts.findIndex(p => p.path === pathAfterContent);

    function _luo_navigointi() {
        const containers = document.querySelectorAll('.devlog-nav');
        if (containers.length === 0) return;

        // Apufunktio painikkeiden luontiin
        const btn = (label, targetIdx) => {
            const isDisabled = targetIdx === null || targetIdx < 0 || targetIdx >= devlogPosts.length;
            // Koska olemme content/vuosi/kuukausi -kansiossa, skriptit ja arkisto ovat ../../../ päässä
            const targetPath = !isDisabled ? `../../../content/${devlogPosts[targetIdx].path}` : '#';
            return `<button onclick="window.location.href='${targetPath}'" ${isDisabled ? 'disabled' : ''}>${label}</button>`;
        };

        const randomIdx = () => {
            if (devlogPosts.length <= 1) return currentIndex;
            let r;
            do { r = Math.floor(Math.random() * devlogPosts.length); } while (r === currentIndex);
            return r;
        };

        const navHtml = `
            ${btn('|< First', 0)}
            ${btn('< Prev', currentIndex - 1)}
            <button onclick="window.location.href='../../../devlog/archive.html'">Archive</button>
            <button onclick="window.location.href='../../../content/${devlogPosts[randomIdx()].path}'">Random</button>
            ${btn('Next >', currentIndex + 1)}
            ${btn('Last >|', devlogPosts.length - 1)}
        `;

        containers.forEach(c => c.innerHTML = navHtml);
    }

    // Suoritetaan heti kun sivu on ladattu
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', _luo_navigointi);
    } else {
        _luo_navigointi();
    }
})();

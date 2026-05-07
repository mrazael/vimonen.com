// devlog/nav.js
(function() {
    // Selvitetään nykyinen tiedostopolku suhteessa devlog-kansioon
    const currentPath = window.location.pathname;
    const pathParts = currentPath.split('/devlog/content/')[1];
    
    const currentIndex = devlogPosts.findIndex(p => p.path === pathParts);

    function createNav() {
        const navContainer = document.querySelector('.devlog-nav');
        if (!navContainer) return;

        const btn = (label, targetIdx, isHidden) => {
            if (isHidden) return '';
            const targetPath = targetIdx !== null ? `../../${devlogPosts[targetIdx].path}` : '#';
            return `<button onclick="window.location.href='${targetPath}'">${label}</button>`;
        };

        const randomIdx = () => {
            let r;
            do { r = Math.floor(Math.random() * devlogPosts.length); } while (r === currentIndex);
            return r;
        };

        navContainer.innerHTML = `
            ${btn('|&lt;', 0, currentIndex === 0)}
            ${btn('&lt; Previous', currentIndex - 1, currentIndex === 0)}
            <button onclick="window.location.href='../../${devlogPosts[randomIdx()].path}'">Random</button>
            ${btn('Next &gt;', currentIndex + 1, currentIndex === devlogPosts.length - 1)}
            ${btn('&gt;|', devlogPosts.length - 1, currentIndex === devlogPosts.length - 1)}
        `;
    }

    window.onload = createNav;
})();

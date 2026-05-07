/**
 * Luo navigointipainikkeet devlog-postauksiin.
 */
(function() {
    const currentPath = window.location.pathname;
    const pathParts = currentPath.split('/devlog/content/')[1];
    const currentIndex = devlogPosts.findIndex(p => p.path === pathParts);

    function _luo_navigointi() {
        const containers = document.querySelectorAll('.devlog-nav');
        if (containers.length === 0) return;

        const btn = (label, targetIdx) => {
            const isDisabled = targetIdx === null || targetIdx < 0 || targetIdx >= devlogPosts.length;
            const targetPath = !isDisabled ? `../../${devlogPosts[targetIdx].path}` : '#';
            return `<button onclick="window.location.href='${targetPath}'" ${isDisabled ? 'disabled' : ''}>${label}</button>`;
        };

        const randomIdx = () => {
            if (devlogPosts.length <= 1) return currentIndex;
            let r;
            do { r = Math.floor(Math.random() * devlogPosts.length); } while (r === currentIndex);
            return r;
        };

        // Navigointipalkin sisältö englanniksi
        const navHtml = `
            ${btn('|< First', 0)}
            ${btn('< Prev', currentIndex - 1)}
            <button onclick="window.location.href='../../archive.html'">Archive</button>
            <button onclick="window.location.href='../../${devlogPosts[randomIdx()].path}'">Random</button>
            ${btn('Next >', currentIndex + 1)}
            ${btn('Last >|', devlogPosts.length - 1)}
        `;

        containers.forEach(c => c.innerHTML = navHtml);
    }

    window.onload = _luo_navigointi;
})();

(function() {
    const currentFullPath = window.location.pathname;
    const pathAfterContent = currentFullPath.split('/content/')[1];
    const currentIndex = devlogPosts.findIndex(p => p.path === pathAfterContent);

    function _luo_navigointi() {
        const containers = document.querySelectorAll('.devlog-nav');
        if (containers.length === 0) return;

        const btn = (label, targetIdx) => {
            const isDisabled = targetIdx === null || targetIdx < 0 || targetIdx >= devlogPosts.length;
            // Postaukset ovat samassa 'content' kansiossa, joten tarvitaan hyppy takaisin päin
            const targetPath = !isDisabled ? `../../../content/${devlogPosts[targetIdx].path}` : '#';
            return `<button onclick="window.location.href='${targetPath}'" ${isDisabled ? 'disabled' : ''}>${label}</button>`;
        };

        const navHtml = `
            ${btn('|< First', 0)}
            ${btn('< Prev', currentIndex - 1)}
            <button onclick="window.location.href='../../../devlog/archive.html'">Archive</button>
            <button onclick="window.location.href='../../../content/${devlogPosts[Math.floor(Math.random() * devlogPosts.length)].path}'">Random</button>
            ${btn('Next >', currentIndex + 1)}
            ${btn('Last >|', devlogPosts.length - 1)}
        `;

        containers.forEach(c => c.innerHTML = navHtml);
    }
    window.onload = _luo_navigointi;
})();

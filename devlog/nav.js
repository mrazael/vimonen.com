(function() {
    const params = new URLSearchParams(window.location.search);
    const allPosts = devlogPosts;
    
    let currentId = params.get('id') || allPosts[allPosts.length - 1].path.split('/').pop();
    const currentIndex = allPosts.findIndex(p => p.path.includes(currentId));

    function _luo_navigointi() {
        const containers = document.querySelectorAll('.devlog-nav');
        
        const btn = (label, targetIdx) => {
            const isDisabled = targetIdx < 0 || targetIdx >= allPosts.length;
            const id = !isDisabled ? (allPosts[targetIdx].id || allPosts[targetIdx].path.split('/').pop()) : '';
            return `<button onclick="window.location.href='index.html?id=${id}'" ${isDisabled ? 'disabled' : ''}>${label}</button>`;
        };

        const randomId = () => {
            const r = Math.floor(Math.random() * allPosts.length);
            return allPosts[r].id || allPosts[r].path.split('/').pop();
        };

        const navHtml = `
            ${btn('|<', 0)}
            ${btn('< Prev', currentIndex - 1)}
            <button onclick="window.location.href='index.html?id=${randomId()}'">Random</button>
            ${btn('Next >', currentIndex + 1)}
            ${btn('>|', allPosts.length - 1)}
        `;

        containers.forEach(c => c.innerHTML = navHtml);
    }
    window.onload = _luo_navigointi;
})();

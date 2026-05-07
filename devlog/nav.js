(function() {
    const params = new URLSearchParams(window.location.search);
    const allPosts = devlogPosts;
    
    let currentPost = params.get('id') 
        ? allPosts.find(p => p.id === params.get('id') || p.path.endsWith(params.get('id')))
        : allPosts[allPosts.length - 1];

    const currentIndex = allPosts.indexOf(currentPost);

    function _luo_navigointi() {
        const containers = document.querySelectorAll('.devlog-nav');
        
        const btn = (label, targetIdx) => {
            const isDisabled = targetIdx < 0 || targetIdx >= allPosts.length;
            const targetPost = !isDisabled ? allPosts[targetIdx] : null;
            // Käytetään ID:tä tai polun viimeistä osaa URL-parametrina
            const id = targetPost ? (targetPost.id || targetPost.path.split('/').pop()) : '';
            
            return `<button onclick="window.location.href='index.html?id=${id}'" ${isDisabled ? 'disabled' : ''}>${label}</button>`;
        };

        const navHtml = `
            ${btn('|<', 0)}
            ${btn('< Prev', currentIndex - 1)}
            <button onclick="window.location.href='archive.html'">Archive</button>
            ${btn('Next >', currentIndex + 1)}
            ${btn('>|', allPosts.length - 1)}
        `;

        containers.forEach(c => c.innerHTML = navHtml);
    }
    window.onload = _luo_navigointi;
})();

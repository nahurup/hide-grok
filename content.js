function hideGrokReplies() {
    const grokHandles = ['@grok', '@xai', '@grokai', '\n@grok'];
    const replySelector = 'article';

    document.querySelectorAll(replySelector).forEach(article => {
        const handleSpan = article.querySelector('a[role="link"][href*="/"] span');
        const tweetContent = article.querySelector('article div[data-testid="tweetText"]');
        if (!tweetContent) return;
        if (!handleSpan) return;

        const tweetText = tweetContent.textContent.trim().toLowerCase().split(" ");;
        const handle = handleSpan.textContent.trim().toLowerCase();

        if (grokHandles.includes("@" + handle) || grokHandles.some(r=> tweetText.includes(r))) {
            article.style.display = 'none';
        }
    });
}
  
hideGrokReplies();

const observer = new MutationObserver(() => {
    hideGrokReplies();
});

observer.observe(document.body, {
    childList: true,
    subtree: true,
});
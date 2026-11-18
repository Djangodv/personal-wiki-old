import { fetchMarkdown } from './fetchMarkdown.js';

const newInstance = new fetchMarkdown();
newInstance.fetch('mark.md').then(data => {
    if (data) {
        const content = data.content
        console.log(content);
    }
})

console.log(content);

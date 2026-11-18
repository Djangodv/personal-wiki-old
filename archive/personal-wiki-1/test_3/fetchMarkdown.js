export class fetchMarkdown {
    constructor() {

    }
    
    // Function used to fetch the file displayed in marked.js
    async fetch(file) {
        const response = await fetch(file);
        const data = await response.text();

        // Parse the Markdown content
        const tokens = marked.lexer(data);

        // Return an object containing the parsed tokens and the original content
        return {
            content: data,
            tokens: tokens
        };
        // try {
        //     if (!response.ok) throw new Error('Network response failed');
        // } catch (error) {
        //     console.error('There was a problem with the fetch operation:', error);
        //     return null;
        // }
    }

}
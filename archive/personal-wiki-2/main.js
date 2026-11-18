// Override function
const renderer = {
  heading({tokens, depth}) {
    const text = this.parser.parseInline(tokens);

    return `<h${depth} id="${text}">${text}</h${depth}>\n`
  },

	code({text, lang}) {

		console.log(text);

		return `<pre><code class="${lang}">${text}</code></pre>\n`;
	}

};

marked.use({ renderer });

class MainContent {

	static async displayContent(file) {

		document.getElementById('mainContent').innerHTML = (await MarkdownUtil.parse(file)).content;
		console.log((await MarkdownUtil.parse(file)).content);
		console.log((await MarkdownUtil.parse(file)).tokens);
		hljs.highlightAll();
		this.copyCode();
		console.log(document.getElementById('mainContent').innerHTML);

	}

	// The fuction keyword isn't needed inside a class
	// function displayContent() {
		// document.querySelectorAll('code').forEach(element => {

	static copyCode() {

		document.querySelectorAll('code').forEach(element => {
			this.addTooltip(element);
			element.addEventListener('click', function() {
				navigator.clipboard.writeText(element.innerHTML);


				// alert("Copied the text: " + element.innerHTML);
			})

		});

	}

	static addTooltip(element) {

		const tooltipContainer = document.createElement('div');
		tooltipContainer.classList.add('tooltip');

		// tooltipContainer.classList.add('show');
		// tooltipContainer.classList.remove('show');

		element.addEventListener('click', function() {
			tooltipContainer.classList.toggle('show');
			if (tooltipContainer.classList.contains('show')) {
				setTimeout(() => {
					tooltipContainer.classList.remove('show')
				}, 1500);
			}
		})


		element.parentElement.appendChild(tooltipContainer);



	}

}

class MarkdownUtil {

	constructor() {
	}

	// An async function allows for the await keyword to be permitted inside the function body for handling promises
	static async parse(file) {

		// The await keyword is used to pause the function until fetch() returns a resolved promise
		const response = await fetch(file);
		const data = await response.text();

		let content = marked.parse(data);
		let tokens = marked.lexer(data);

		return {
			content: content,
			tokens: tokens
		}

	}

	transformHeaders() {



	}

}

// TODO: add error handling for fetching API data
class GithubApi {

	static url = `https://api.github.com/repos/Djangodv/wiki/contents/`;
	static subdirectory = 'markdown-example'

	static async retrieveData() {

		const response = await fetch(`${this.url}${this.subdirectory}`, {
			headers: {
				'Authorization': ''
			}

		});
		// Specifies the API version and response format to make sure Github sends the correct data (not necessary perse)
		// const response = await fetch(apiUrl, {
		//   headers: {
		//     'Accept': 'application/vnd.github.v3+json' 
		//   }
		const data = await response.json();

		return data;

	}

}

class SideNav {

	// Defines an instance variable, which is unique per instance of a class, so each will have its own version
	// sideNavElement = getElementById('sideNav');
	// Static variable, which is shared among all instance of the class (only one copy exists, regardless of the amount of instances)
	static menuNav = document.getElementById('menuNav');
	static APIData = null;

	dropdownMenu = new DropdownMenu()

	// In JavaScript, you can't have executable statements outisde of function bodies or method bodies within a class
	// GithubApi.retrieveData();

	async registerClickEvent(element, dataEntry) {

		element.addEventListener('click', () => {
			// element.addEventListener('click', function(event) {
			MainContent.displayContent(dataEntry.path);
			// 'this' 'refers to function(event)' and not to the instance of SideNav
			// this.dropdownMenu(dataEntry.path);

			// const dropdownDivElement = document.getElementById(dataEntry.name);
			const dropdownDivElement = document.querySelector(`[name="${dataEntry.name}"]`);

			if (dropdownDivElement.style.display === 'none') {
				dropdownDivElement.style.display = 'block';
			} else {
				dropdownDivElement.style.display = 'none';
			}

			// TODO: toggle class to hidden

			// dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';


		})

	}

	async displayItems(dataEntry) {

		const buttonElement = document.createElement('button');
		buttonElement.textContent = dataEntry.name;

		buttonElement.setAttribute('file', dataEntry.path);

		SideNav.menuNav.appendChild(buttonElement);

		SideNav.menuNav.appendChild(await this.dropdownMenu.displayHeaders(dataEntry))

		return buttonElement;

	}

	async iterateData() {

		this.APIData = await GithubApi.retrieveData();
		let anchorElement;

		for (const entry of this.APIData) {

			anchorElement = await this.displayItems(entry);
			this.registerClickEvent(anchorElement, entry);

		}

	}

	static collapseButton() {

		const sideNavElement = document.getElementById('sideNav');
		const arrowBarElement = document.getElementById('collapseNav');

		if (sideNavElement.style.width === '55px') {
			sideNavElement.style.width = '255px';
			SideNav.menuNav.style.display = 'inline';
			arrowBarElement.style.transform = 'rotate(0deg)'

		} else {
			sideNavElement.style.width = '55px';
			SideNav.menuNav.style.display = 'none';
			arrowBarElement.style.transform = 'rotate(180deg)'
		}

		// document.getElementById('buttonCollapse').addEventListener('click', function() {

		// 	SideNav.menuNav.style.width = "0";

		// })

	}

}

class DropdownMenu {

	async extractTitles(file) {

		const tokens = (await MarkdownUtil.parse(file)).tokens
		let titlesList = []

		tokens.forEach(element => {
			// '===' strict equality operator only checks for equality
			// '==' loose equality operator checks for equality between two values and performs type coercion if the values are of different types
			if (element.type === 'heading') {
				titlesList.push(element.text);
			}
		});

		return titlesList;

	}

	async displayHeaders(dataEntry) {

		const dropdownElement = document.createElement('div');
		dropdownElement.setAttribute('class', 'dropdown-container');
		dropdownElement.setAttribute('name', dataEntry.name)

		const titles = await this.extractTitles(dataEntry.path);

		titles.forEach(title => {

			const anchorElement = document.createElement('a');
			anchorElement.textContent = title;
			anchorElement.setAttribute('href', '#' + title);
			console.log(anchorElement.getAttribute('href'));

			dropdownElement.appendChild(anchorElement);

		});

		return dropdownElement;

	}
}

const _nav = new SideNav();
_nav.iterateData();

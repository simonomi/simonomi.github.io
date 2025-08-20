const FURIGANA = /{((?:[\u2E80-\uA4CF\uFF00-\uFFEF])+)((?:\\?\|[^ -\/{-~:-@\[-`]*)+)}/gm;

(async function() {
	const languages = await fetch("https://raw.githubusercontent.com/simonomi/languages/main/languages.json")
		.then(response => response.json())
	
	const parent = document.getElementById("parent")
	
	for (language of languages) {
		const languageBlock = document.createElement("div")
		languageBlock.className = "block"
		languageBlock.id = encodeURIComponent(language.name)
		
		const languageHeader = document.createElement("h2")
		languageHeader.append(language.name)
		languageBlock.appendChild(languageHeader)
		
		const languageDescription = document.createElement("p")
		languageDescription.append(language.description)
		languageBlock.appendChild(languageDescription)
		
		if (language.name == "日本語") {
			const showFuriganaButton = document.createElement("button")
			showFuriganaButton.innerText = "show furigana"
			showFuriganaButton.id = "show-furigana"
			showFuriganaButton.addEventListener("click", showFurigana)
			languageBlock.appendChild(showFuriganaButton)
			
			const hideFuriganaButton = document.createElement("button")
			hideFuriganaButton.innerText = "hide furigana"
			hideFuriganaButton.id = "hide-furigana"
			hideFuriganaButton.addEventListener("click", hideFurigana)
			languageBlock.appendChild(hideFuriganaButton)
		}
		
		for (note of language.notes) {
			const noteHeader = document.createElement("h3")
			noteHeader.className = "note-header"
			noteHeader.append(note.name)
			languageBlock.appendChild(noteHeader)
			
			const noteWords = document.createElement("p")
			noteWords.append(note.terms.join(", "))
			languageBlock.appendChild(noteWords)
			
			parseFurigana(noteWords.firstChild)
			
			for (newWord of note.new) {
				noteWords.append(", ")
				
				const wordNode = document.createElement("span")
				wordNode.className = "new"
				wordNode.append(newWord)
				noteWords.append(wordNode)
				
				parseFurigana(wordNode.firstChild)
			}
			
			if (note.terms.length == 0) {
				noteWords.removeChild(noteWords.firstChild) // ""
				noteWords.removeChild(noteWords.firstChild) // ", "
			}
		}
		
		parent.appendChild(languageBlock)
	}
	
	const spinner = document.getElementById("spinner")
	document.body.removeChild(spinner)
	
	const anchor = window.location.hash.substring(1)
	if (!anchor) { return }
	const anchorElement = document.getElementById(window.location.hash.substring(1))
	if (!anchorElement) { return }
	anchorElement.scrollIntoView();
})();

// adapted from https://github.com/steven-kraft/obsidian-markdown-furigana/blob/master/main.ts
function parseFurigana(element) {
	let lastNode = element
	
	const matches = element.textContent.matchAll(FURIGANA)
	for (match of matches) {
		const furigana = match[2].split("|").slice(1)
		const kanji = furigana.length === 1 ? [match[1]] : match[1].split('')
		
		if (kanji.length !== furigana.length) { continue }
		
		const rubyNode = document.createElement("ruby")
		
		kanji.forEach((character, index) => {
			rubyNode.append(character)
			
			const rt = document.createElement("rt")
			rt.append(furigana[index])
			
			rubyNode.appendChild(rt)
		})
		
		const offset = lastNode.textContent.indexOf(match[0])
		const nodeToReplace = lastNode.splitText(offset)
		lastNode = nodeToReplace.splitText(match[0].length)
		nodeToReplace.replaceWith(rubyNode)
	}
	
	return element
}

function hideFurigana() {
	for (const sheet of document.styleSheets) {
		for (const rule of sheet.cssRules) {
			if (rule.selectorText === ":root") {
				const root = rule.style;
				
				if (root.getPropertyValue("--furigana-display") !== "") {
					root.setProperty("--furigana-display", "none");
					root.setProperty("--furigana-show-button", "initial");
					root.setProperty("--furigana-hide-button", "none");
				}
			}
		}
	}
}

function showFurigana() {
	for (const sheet of document.styleSheets) {
		for (const rule of sheet.cssRules) {
			if (rule.selectorText === ":root") {
				const root = rule.style;
				
				if (root.getPropertyValue("--furigana-display") !== "") {
					root.setProperty("--furigana-display", "revert");
					root.setProperty("--furigana-show-button", "none");
					root.setProperty("--furigana-hide-button", "initial");
				}
			}
		}
	}
}

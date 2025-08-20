window.addEventListener("DOMContentLoaded", function() {
	document.getElementById(location.hash.slice(1)).open = true;
});

function expandAllDetails() {
	Array.from(document.getElementsByTagName("details"))
		.forEach(x => x.open = true)
}

function collapseAllDetails() {
	Array.from(document.getElementsByTagName("details"))
		.forEach(x => x.open = false)
}


function splitText(selector, mode, once) {
	function splitInner(selector) {
		var elements = document.querySelectorAll(selector)
		elements.forEach(function (element) {
			element.dataset.splitText = element.textContent
			if (element.classList.contains('split-content')) {
				// CONTENT
				paragraphs = element.innerHTML
					.split('<p>')
					.map(function (paragraph) {
						if (paragraph == '') {
							return
						}
						if (paragraph.includes('</p>')) {
							paragraph = paragraph.replace('</p>', '')
						}

						return (
							"<div class='content'>" +
							paragraph
								.split('<br>')
								.map(function (lineBreak) {
									return (
										"<div class='group'>" +
										lineBreak
											.split(/\s/)
											.map(function (words) {
												return words
													.split('-')
													.map(function (word) {
														if (word.includes('<p>')) {
															word = word.replace('<p>', '')
														}
														if (word.includes('</p>')) {
															word = word.replace('</p>', '')
														}
														if (word == '') {
															return
														}
														return "<div class='word inner'>" + word + '</div>'
													})
													.join("<div class='word inner'>-</div>")
											})
											.join("<div class='whitespace inner'>&nbsp;</div>")
									)
								})
								.join('</div>')
						)
					})
					.join('</div>')
				element.innerHTML = paragraphs
			} else if (element.classList.contains('split-heading')) {
				// TITLE
				const wordArray = element.innerHTML
					.split('<br>')
					.map(function (lineBreak) {
						return (
							"<div class='group'>" +
							lineBreak
								.split(/\s/)
								.map(function (word) {
									return word
										.split('-')
										.map(function (word) {
											if (word == '') {
												return
											}
											return "<div class='word inner'>" + word + '</div>'
										})
										.join("<div class='word inner'>-</div>")
								})
								.join("<div class='whitespace inner'>&nbsp;</div>")
						)
					})
					.join('</div>')
				element.innerHTML = wordArray
			}
		})
	}

	function getLines(el) {
		var lines = []
		var line = []
		var inners = el.querySelectorAll('.inner')
		var lastTop
		for (var i = 0; i < inners.length; i++) {
			var inner = inners[i]
			if (inner.offsetTop != lastTop) {
				if (!inner.classList.contains('whitespace')) {
					lastTop = inner.offsetTop
					line = []
					lines.push(line)
				} else {
					inner.remove()
				}
			}
			line.push(inner)
		}
		return lines
	}

	function splitLines(selector) {
		var elements = document.querySelectorAll(selector)
		splitInner(selector)
		elements.forEach(function (el) {
			el.querySelectorAll('.group').forEach(function (element) {
				var lines = getLines(element)
				var wrappedLines = ''
				lines.forEach(function (wordArray) {
					wrappedLines += "<div class='linemask'><div class='line'>"
					wordArray.forEach(function (inner) {
						wrappedLines += inner.innerText
					})
					wrappedLines += '</div></div>'
				})
				element.innerHTML = wrappedLines
			})
		})
	}

	function splitWords(selector) {
		splitLines(selector)
		var lines = document.querySelectorAll('.line')
		lines.forEach(function (line) {
			const wrappedWords = line.innerHTML
				.split('&nbsp;')
				.map(function (wordDash) {
					return wordDash
						.split('-')
						.map(function (word) {
							if (word != '') {
								return "<div class='wordmask mask'><div class='word inner'>" + word + '</div></div>'
							}
						})
						.join("<div class='wordmask mask'><div class='word inner'>-</div></div>")
				})
				.join("<div class='whitespace inner'>&nbsp;</div>")
			line.innerHTML = wrappedWords
		})
	}

	function splitChars(selector) {
		splitLines(selector)
		var lines = document.querySelectorAll('.line')
		lines.forEach(function (line) {
			const wrappedWords = line.innerHTML
				.split('&nbsp;')
				.map(function (word) {
					return word
						.split('-')
						.map(function (word) {
							var chars = word.split('').map(function (char) {
								return "<div class='charmask mask'><div class='char inner'>" + char + '</div></div>'
							})
							return "<div class='wordmask mask'><div class='word inner'>" + chars.join('') + '</div></div>'
						})
						.join("<div class='wordmask mask'><div class='word inner'>-</div></div>")
				})
				.join("<div class='whitespace inner'>&nbsp;</div>")
			line.innerHTML = wrappedWords
		})
	}

	function removeLastSpace() {
		var allLines = document.querySelectorAll('.split-heading .line')
		for (var i = 0; i < allLines.length; i++) {
			if (allLines[i].outerHTML == '<div class="line"></div>') {
				allLines[i].parentElement.remove()
			} else if (allLines[i].outerHTML == '<div class="line">&nbsp;</div>') {
				allLines[i].parentElement.remove()
			} else if (mode == 'words' && allLines[i].hasChildNodes()) {
				if (allLines[i].lastElementChild.classList.contains('whitespace')) {
					allLines[i].lastElementChild.remove()
				}
			}
		}
	}

	var originalArray = []
	const originalElements = document.querySelectorAll(selector)
	originalElements.forEach(function (element) {
		originalArray.push(element.innerHTML)
	})
	if (mode == 'chars') {
		splitChars(selector)
		if (once == false) {
			window.addEventListener(
				'resize',
				function (event) {
					currentElements = document.querySelectorAll(selector)
					for (var i = 0; i < currentElements.length; i++) {
						currentElements[i].innerHTML = originalArray[i]
					}
					splitChars(selector)
				},
				true
			)
		}
	} else if (mode == 'words') {
		splitWords(selector)
		if (once == false) {
			window.addEventListener(
				'resize',
				function (event) {
					currentElements = document.querySelectorAll(selector)
					for (var i = 0; i < currentElements.length; i++) {
						currentElements[i].innerHTML = originalArray[i]
					}
					splitWords(selector)
				},
				true
			)
		}
	} else if (mode == 'lines') {
		splitLines(selector)
		if (once == false) {
			window.addEventListener(
				'resize',
				function (event) {
					currentElements = document.querySelectorAll(selector)
					for (var i = 0; i < currentElements.length; i++) {
						currentElements[i].innerHTML = originalArray[i]
					}
					splitLines(selector)
				},
				true
			)
		}
	}
	removeLastSpace()
	if (once == false) {
		window.addEventListener(
			'resize',
			function (event) {
				removeLastSpace()
			},
			true
		)
	}
}

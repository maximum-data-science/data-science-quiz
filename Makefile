BUNDLE := bundle
JEKYLL := $(BUNDLE) exec jekyll
HTMLPROOF := $(BUNDLE) exec htmlproofer

SRCS := $(wildcard _files/*.md)
DSTS := $(SRCS:_files/%.md=_short-files/%.txt)
CHEATSHEET_OUT := assets/download/cheat-sheet.md
IMAGES_OUT := assets/download/images.zip

.PHONY: serve cheat-sheet check

all: serve

txt: ${DSTS}

_short-files/%.txt:_files/%.md
	cp $< $@

cheat-sheet: ${CHEATSHEET_OUT}

$(CHEATSHEET_OUT): txt
	$(JEKYLL) build
	cp _site/cheat-sheet.txt $(CHEATSHEET_OUT)
	sed -i 's/^# /## /g' $(CHEATSHEET_OUT)
	sed -i 's/^H1: /# /g' $(CHEATSHEET_OUT)

export-images:
	zip -r assets/download/images.zip data-science-quiz-images/*

check:
	$(JEKYLL) build
	$(JEKYLL) doctor
	$(HTMLPROOF) --assume-extension _site

install:
	$(BUNDLE) install

update:
	$(BUNDLE) update

serve:
	$(JEKYLL) serve --draft --baseurl ''

clean:
	rm -fr _site/
	rm -fr .sass_cache
	rm -fr _short-files/*
	rm -fr _site

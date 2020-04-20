#!/bin/bash

set -e

output=$(mktemp /tmp/convert_html2anki_csv.XXXXXX)

cat "$@" | sed '/^---$/,/^---$/d' | pandoc -f markdown+smart-auto_identifiers-implicit_figures -t html | \
    sed -e "s/\\\"/\\'/g" -e 's/<h1>/\"\n\"<h1>/g' -e 's/<\/h1>/<\/h1>\";\"/ig' > "$output"
sed -i '1d' "$output"
echo '"' >> "$output"
cat "$output"
rm "$output"

#!/bin/bash
# Crazy oneliner to extract __('') strings from jsx files. No other solution currently works properly with jsx.

# 1. Extract messages into template .pot file
printf 'msgid ""\n' > app/i18n/template.pot
printf 'msgstr ""\n' >> app/i18n/template.pot
printf '"Content-Type: text/plain; charset=UTF-8\\n"\n' >> app/i18n/template.pot
printf '"Content-Transfer-Encoding: 8bit\\n"\n\n' >> app/i18n/template.pot
grep -rihoP "__\('\K[^']+(?='\))" --include \*.jsx app  | while read line; do printf "msgid \"$line\"\nmsgstr \"\"\n\n"; done >> app/i18n/template.pot

# 2. Convert .po files to .json
for i in app/i18n/*.po; do node_modules/puttext/po2json.js $i > $i.json; done

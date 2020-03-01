ng build --prod --output-path docs --base-href portfolio

copy ".\docs\index.html" ".\docs\404.html"
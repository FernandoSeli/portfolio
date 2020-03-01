ng build --prod  --output-path docs --base-href portfolio
ECHO cloning index html as 404 html
copy ".\docs\index.html" ".\docs\404.html"

fswatch -o resume.sty | xargs -n1 -I{} sh -c "pdflatex resume.sty; rm resume.aux; rm resume.log; rm resume.out; open resume.pdf"

import base64, pathlib
S = pathlib.Path(__file__).parent / "src"
OUT = pathlib.Path(__file__).parent

sign = "data:image/jpeg;base64," + base64.b64encode((S / "sign.jpg").read_bytes()).decode()
site = (S / "site.html").read_text().replace("{{SIGN}}", sign)
(OUT / "index.html").write_text(site)
js = "\n".join((S / f).read_text() for f in ["data.js", "charts.js", "app.js", "views1.js", "views2.js"])
portal = (S / "portal.html").read_text().replace("/*CSS*/", (S / "portal.css").read_text()).replace("/*JS*/", js)
(OUT / "portal.html").write_text(portal)
for f in [OUT / "index.html", OUT / "portal.html"]:
    print(f.name, f.stat().st_size // 1024, "KB")

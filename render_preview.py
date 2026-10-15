import subprocess
import os

print("[AGENTRAX] Generando capturas de alta resolución de la plataforma...")
edge_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
html_path = r"file:///C:/web/index.html"
out_path = r"C:\web\screenshot_full.png"

cmd = [
    edge_path,
    "--headless",
    "--disable-gpu",
    f"--screenshot={out_path}",
    "--window-size=1440,4200",
    html_path
]

res = subprocess.run(cmd, capture_output=True)
if os.path.exists(out_path):
    print(f"[OK] Captura completa generada con éxito en: {out_path} ({os.path.getsize(out_path)} bytes)")
else:
    print("[ERROR] No se pudo generar la captura.")

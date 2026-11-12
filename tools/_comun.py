"""Utilidades compartidas por las pruebas: servidor local y navegador."""
import functools, http.server, os, socketserver, threading

RAIZ = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
CHROME_ARGS = ['--enable-gpu', '--use-angle=d3d11', '--ignore-gpu-blocklist',
               '--disable-background-timer-throttling', '--disable-renderer-backgrounding',
               '--disable-backgrounding-occluded-windows']
VISTAS = {
    'd': dict(viewport={'width': 1440, 'height': 900}, device_scale_factor=1),
    'm': dict(viewport={'width': 390, 'height': 844}, device_scale_factor=2, is_mobile=True, has_touch=True),
}


class _Silencioso(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a):
        pass


def servir(raiz=RAIZ):
    """Levanta un servidor local y devuelve la URL base."""
    srv = socketserver.ThreadingTCPServer(('127.0.0.1', 0), functools.partial(_Silencioso, directory=raiz))
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    return f'http://127.0.0.1:{srv.server_address[1]}'

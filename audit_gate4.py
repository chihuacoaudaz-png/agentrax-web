import re

with open('c:/web/index.html', 'r', encoding='utf-8') as f:
    content = f.read()

with open('c:/web/globals.css', 'r', encoding='utf-8') as f:
    css_content = f.read()

total_code = content + '\n' + css_content

print("================================================================================")
print("             PROTOCOLO DE AUDITORÍA AUTOMÁTICA ANTI-SLOP (GATE 4)              ")
print("================================================================================\n")

# 1. Sombras prohibidas
shadow_matches = re.findall(r'(shadow-lg|shadow-xl|shadow-2xl|drop-shadow)', total_code)
status1 = "PASS" if len(shadow_matches) == 0 else "FAIL"
print(f"[CHECK 1] Sombras Prohibidas: {len(shadow_matches)} coincidencias | {status1}")

# 2. Bordes globosos
radii_matches = re.findall(r'(rounded-2xl|rounded-3xl)', total_code)
full_matches = [m.group(0) for m in re.finditer(r'class="[^"]*rounded-full[^"]*"', content)]
invalid_full = [m for m in full_matches if not any(k in m for k in ['w-1.5', 'w-2', 'h-1.5', 'h-2'])]
status2 = "PASS" if (len(radii_matches) == 0 and len(invalid_full) == 0) else "FAIL"
print(f"[CHECK 2] Bordes Globosos: {len(radii_matches)} en tarjetas, {len(invalid_full)} rounded-full no válidos | {status2}")

# 3. Gradientes cliché
grad_matches = re.findall(r'(from-purple|via-pink|to-cyan|from-indigo|via-sky)', total_code)
status3 = "PASS" if len(grad_matches) == 0 else "FAIL"
print(f"[CHECK 3] Gradientes Cliché AI Slop: {len(grad_matches)} coincidencias | {status3}")

# 4. Grillas simétricas
symmetric_grid = 'grid-cols-1 md:grid-cols-3' in content
status4 = "PASS" if not symmetric_grid else "FAIL"
print(f"[CHECK 4] Grillas Simétricas Aburridas: Ausencia de 3-cards simétricas | {status4}")

# 5. Precisión tipográfica
has_tabular = ('tabular-nums' in css_content) and ('font-mono' in content)
status5 = "PASS" if has_tabular else "FAIL"
print(f"[CHECK 5] Precisión Tipográfica: tabular-nums en CSS y JetBrains Mono activo | {status5}")

# 6. Cumplimiento Google Cloud / Anthropic
req_terms = [
    'AGENTRAX S.A.C.',
    'comercial@agentraxperu.com',
    'Lima, Perú',
    'Ley N° 29733',
    'Zero-Data Retention',
    'Google Cloud',
    'Anthropic Claude'
]
missing_terms = [t for t in req_terms if t not in content]
status6 = "PASS" if len(missing_terms) == 0 else "FAIL"
print(f"[CHECK 6] Cumplimiento Regulatorio Google Cloud / Anthropic: {len(missing_terms)} faltantes | {status6}")

# 7. Ejecución Real & Integridad DOM
tag_open_div = content.count('<div')
tag_close_div = content.count('</div>')
tag_open_section = content.count('<section')
tag_close_section = content.count('</section>')
syntax_ok = (tag_open_div == tag_close_div) and (tag_open_section == tag_close_section)
status7 = "PASS" if syntax_ok else "FAIL"
print(f"[CHECK 7] Integridad DOM: divs ({tag_open_div}/{tag_close_div}), sections ({tag_open_section}/{tag_close_section}) | {status7}")

print("\n--------------------------------------------------------------------------------")
overall = all(s == "PASS" for s in [status1, status2, status3, status4, status5, status6, status7])
print(f"VEREDICTO FINAL GATE 4: {'100% CONFORME - PASS' if overall else 'FAIL'}")
print("================================================================================")

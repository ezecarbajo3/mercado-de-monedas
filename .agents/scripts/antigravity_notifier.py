#!/usr/bin/env python3
import sys
import json
import subprocess
import os
import select

SOUNDS = {
    "Tink": "/System/Library/Sounds/Tink.aiff",       # Muy cortito, suave y sutil (Fin de tarea)
    "Pop": "/System/Library/Sounds/Pop.aiff",         # Cortito (Alternativo)
    "Ping": "/System/Library/Sounds/Ping.aiff",       # Nítido y claro (Requiere intervención)
    "Hero": "/System/Library/Sounds/Hero.aiff",       # Alerta clara
    "Basso": "/System/Library/Sounds/Basso.aiff",     # Tono grave (Error)
    "default": "/System/Library/Sounds/Tink.aiff"
}

def play_sound(sound_name):
    sound_path = SOUNDS.get(sound_name, SOUNDS["default"])
    if os.path.exists(sound_path):
        try:
            # Reproducción directa y no bloqueante por altavoces
            subprocess.Popen(["afplay", sound_path], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        except Exception:
            pass

def send_notification(title, message, sound="Tink"):
    # 1. Reproducir sonido físico en la Mac
    play_sound(sound)
    
    # 2. Enviar notificación al centro de notificaciones de macOS
    clean_title = title.replace('\\', '\\\\').replace('"', '\\"')
    clean_msg = message.replace('\\', '\\\\').replace('"', '\\"')
    applescript = f'display notification "{clean_msg}" with title "{clean_title}" sound name "{sound}"'
    try:
        subprocess.run(["osascript", "-e", applescript], check=False)
    except Exception as e:
        sys.stderr.write(f"Failed to send macOS notification: {e}\n")

def handle_pre_tool(payload):
    tool_call = payload.get("toolCall", {})
    name = tool_call.get("name", "")
    args = tool_call.get("args", {})
    
    # 1. Pregunta interactiva que requiere respuesta del usuario -> Sonido de Alerta "Ping"
    if name == "ask_question":
        questions = args.get("questions", [])
        detail = "Antigravity necesita tu respuesta para continuar."
        if questions and isinstance(questions, list) and len(questions) > 0:
            first_q = questions[0].get("question", "")
            if first_q:
                detail = f"{first_q[:80]}"
        send_notification("Antigravity - Pregunta pendiente", detail, sound="Ping")
        
    # 2. Comando que requiere autorización/permiso del usuario -> Sonido de Alerta "Ping"
    elif name == "run_command":
        bypass = args.get("BypassSandbox", False)
        if bypass:
            summary = args.get("toolSummary", "") or args.get("CommandLine", "")[:50]
            send_notification(
                "Antigravity - Permiso requerido",
                f"Se requiere tu autorización: {summary}",
                sound="Ping"
            )
            
    print(json.dumps({"decision": "allow"}))

def handle_stop(payload):
    error = payload.get("error")
    if error:
        send_notification(
            "Antigravity - Error",
            f"Ocurrió un error: {error[:80]}",
            sound="Basso"
        )
    else:
        # Fin de tarea -> Sonido muy cortito, suave y sutil "Tink"
        send_notification(
            "Antigravity - Tarea finalizada",
            "Antigravity ha terminado y está esperando tus instrucciones.",
            sound="Tink"
        )
    print(json.dumps({}))

def main():
    hook_type = sys.argv[1] if len(sys.argv) > 1 else "stop"
    
    payload = {}
    # Lectura no bloqueante de stdin
    try:
        if not sys.stdin.isatty():
            r, _, _ = select.select([sys.stdin], [], [], 0.5)
            if r:
                raw_input = sys.stdin.read()
                if raw_input.strip():
                    payload = json.loads(raw_input)
    except Exception as e:
        sys.stderr.write(f"Error parsing stdin JSON: {e}\n")

    if hook_type == "pre_tool":
        handle_pre_tool(payload)
    elif hook_type == "stop":
        handle_stop(payload)
    elif hook_type == "question":
        handle_pre_tool({"toolCall": {"name": "ask_question", "args": payload.get("toolCall", {}).get("args", {})}})
    else:
        print(json.dumps({}))

if __name__ == "__main__":
    main()

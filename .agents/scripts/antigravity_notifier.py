#!/usr/bin/env python3
import sys
import json
import subprocess

def send_notification(title, message, sound="default"):
    # Escape quotes for AppleScript
    clean_title = title.replace('\\', '\\\\').replace('"', '\\"')
    clean_msg = message.replace('\\', '\\\\').replace('"', '\\"')
    applescript = f'display notification "{clean_msg}" with title "{clean_title}" sound name "{sound}"'
    try:
        subprocess.run(["osascript", "-e", applescript], check=False)
    except Exception as e:
        sys.stderr.write(f"Failed to send macOS notification: {e}\n")

def main():
    hook_type = sys.argv[1] if len(sys.argv) > 1 else "stop"
    
    # Read payload from stdin
    payload = {}
    try:
        raw_input = sys.stdin.read()
        if raw_input.strip():
            payload = json.loads(raw_input)
    except Exception as e:
        sys.stderr.write(f"Error parsing stdin JSON: {e}\n")

    if hook_type == "stop":
        error = payload.get("error")
        if error:
            send_notification(
                "Antigravity - Error",
                f"La tarea finalizó con un error: {error}",
                sound="Basso"
            )
        else:
            send_notification(
                "Antigravity",
                "Tarea finalizada. Esperando tu intervención.",
                sound="Glass"
            )
        print(json.dumps({}))

    elif hook_type == "question":
        tool_call = payload.get("toolCall", {})
        args = tool_call.get("args", {})
        questions = args.get("questions", [])
        
        detail = "Antigravity tiene una pregunta que requiere tu respuesta."
        if questions and isinstance(questions, list) and len(questions) > 0:
            first_q = questions[0].get("question", "")
            if first_q:
                detail = f"Pregunta: {first_q[:80]}..." if len(first_q) > 80 else first_q
        
        send_notification(
            "Antigravity - Pregunta",
            detail,
            sound="Ping"
        )
        print(json.dumps({"decision": "allow"}))

    else:
        send_notification(
            "Antigravity",
            "Notificación de evento.",
            sound="default"
        )
        print(json.dumps({}))

if __name__ == "__main__":
    main()

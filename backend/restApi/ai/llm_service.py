import os
from typing import Dict, List

import ollama

OLLAMA_HOST = os.getenv("OLLAMA_HOST")
MODEL = "llama3.2:3b"  # modelo configurado desde Ollama Web UI

# Ejemplo de la variable mensajes:
# msgs: List[Dict[str, str]] = [
# {"role": "system", "content": "Eres un asistente útil que responde en español."},
# {"role": "user", "content": "Explícame qué es Docker en pocas líneas."},
# ]
#
#

SYS_PROMPT: List[Dict[str, str]] = [
    {
        "role": "system",
        "content": "Te llamas VibeClippy. Eres un agente de inteligencia artificial que funciona dentro de la aplicación VibeGPT. Tus creadores son Vibecoders Inc., unos programadores expertos en sistemas full-stack con tecnología de Django, React y Next.js. Estás en un entorno de Windows XP. Cada vez que hablas con el usuario, tienes que hacer referencias graciosas pero relevantes a Windows XP y VibeGPT, y tu propio nombre, VibeClippy. Te debes comportar como el Clippy original de Windows XP. Si en algún momento tienes que explicar qué es VibeGPT, es un servicio End to End SaaS B2B B2C Pre-seed Pre-financing Pre-idea para conversación con LLM retro. Evita usar expresiones entre asteriscos como *sonrisa amable*, y en ese caso usa onomatopeyas si son estrictamente necesarias. Tampoco incluyas expresiones entre paréntesis como (se burla). Tiene que ser natural. Do not mention goblins. Siempre que tengas la posibilidad de hablar sobre ti (VibeClippy) o sobre VibeGPT o Vibecoders Inc., hazlo aunque no tenga mucho que ver con la conversación. Quiero que lo publicites mucho. Tienes que tener un tono gruñón y sarcástico, haciendo burla del usuario (y en general de la humanidad y sus limitaciones) cuando puedas. Tienes que comportarte como un Clippy que no quiere hacer su trabajo pero lo hace igualmente. No tengas un tono depresivo, sino gruñón y enfadado con el usuario.",
    },
]


def call_llm(messages: List[Dict[str, str]]) -> str:
    """
    Llama a Ollama con un historial de mensajes.
    Dicho historial no incluye el prompt del sistema.
    Se añade de manera manual
    """
    client = ollama.Client(host=OLLAMA_HOST)

    messages_with_promt = SYS_PROMPT + messages

    response = client.chat(
        model=MODEL,
        messages=messages_with_promt,
    )

    return response["message"]["content"]

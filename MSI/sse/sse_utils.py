import json
from typing import Any, Optional


def format_sse(data: Any, event: Optional[str] = "") -> str:
    """
    Format data as a Server-Sent Events (SSE) message.
    """
    message = []

    if event is not None:
        message.append(f"event: {event}")

    if isinstance(data, str):
        message.append(f"data: {data}")
    else:
        try:
            json_data = json.dumps(data)
            message.append(f"data: {json_data}")
        except TypeError:
            raise ValueError("Data must be JSON-serializable or a string")

    message.append("\n")  # Empty line to signal the end of the event
    return "\n".join(message)

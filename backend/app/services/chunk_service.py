def chunk_text(
    text: str,
    chunk_size: int = 1000,
    overlap: int = 200
):
    """
    Split extracted PDF text into overlapping chunks.

    chunk_size:
        Maximum characters in one chunk.

    overlap:
        Number of characters repeated between
        consecutive chunks.
    """

    chunks = []

    start = 0
    text_length = len(text)

    while start < text_length:

        end = start + chunk_size

        chunk = text[start:end].strip()

        if chunk:
            chunks.append(chunk)

        # Move forward while keeping overlap
        start = end - overlap

        # Safety check
        if start <= 0:
            break

    return chunks
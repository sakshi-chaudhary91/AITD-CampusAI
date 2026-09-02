import faiss
import numpy as np
import pickle
import os

from app.core.config import VECTOR_STORE_PATH


# Make sure vector store folder exists
os.makedirs(VECTOR_STORE_PATH, exist_ok=True)


INDEX_PATH = os.path.join(
    VECTOR_STORE_PATH,
    "faiss_index.bin"
)

CHUNKS_PATH = os.path.join(
    VECTOR_STORE_PATH,
    "chunks.pkl"
)


def create_faiss_index(embeddings):
    """
    Create a new FAISS index from embeddings.
    Used when no existing index is available.
    """

    embeddings = np.array(embeddings).astype("float32")

    dimension = embeddings.shape[1]

    index = faiss.IndexFlatL2(dimension)

    index.add(embeddings)

    return index


def save_index(index, chunks):
    """
    Save FAISS index and chunks.
    """

    faiss.write_index(
        index,
        INDEX_PATH
    )

    with open(
        CHUNKS_PATH,
        "wb"
    ) as f:
        pickle.dump(chunks, f)


def load_index():
    """
    Load existing FAISS index and chunks.
    """

    if not os.path.exists(INDEX_PATH):
        return None, []

    if not os.path.exists(CHUNKS_PATH):
        return None, []

    index = faiss.read_index(
        INDEX_PATH
    )

    with open(
        CHUNKS_PATH,
        "rb"
    ) as f:
        chunks = pickle.load(f)

    return index, chunks


def add_to_faiss_index(embeddings, new_chunks):
    """
    Add new PDF embeddings and chunks
    to the existing FAISS index.

    If no index exists, create a new one.
    """

    embeddings = np.array(
        embeddings
    ).astype("float32")

    index, existing_chunks = load_index()

    # No existing index
    if index is None:

        index = create_faiss_index(
            embeddings
        )

        all_chunks = list(new_chunks)

    # Existing index
    else:

        index.add(
            embeddings
        )

        all_chunks = (
            existing_chunks
            + list(new_chunks)
        )

    save_index(
        index,
        all_chunks
    )

    return index, all_chunks


def search_index(
    index,
    query_embedding,
    chunks,
    top_k=3
):
    """
    Search the FAISS index
    and return the most relevant chunks.
    """

    if index is None or not chunks:
        return []

    query_embedding = np.array(
        [query_embedding]
    ).astype("float32")

    # Don't request more results
    # than available vectors
    actual_top_k = min(
        top_k,
        index.ntotal
    )

    distances, indices = index.search(
        query_embedding,
        actual_top_k
    )

    results = []

    for i in indices[0]:

        if 0 <= i < len(chunks):
            results.append(
                chunks[i]
            )

    return results
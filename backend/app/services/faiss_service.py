import faiss
import numpy as np
import pickle
import os

from app.core.config import VECTOR_STORE_PATH

os.makedirs(VECTOR_STORE_PATH, exist_ok=True)


def create_faiss_index(embeddings):
    dimension = embeddings.shape[1]

    index = faiss.IndexFlatL2(dimension)
    index.add(np.array(embeddings))

    return index


def save_index(index, chunks):
    faiss.write_index(
        index,
        os.path.join(VECTOR_STORE_PATH, "faiss_index.bin")
    )

    with open(
        os.path.join(VECTOR_STORE_PATH, "chunks.pkl"),
        "wb"
    ) as f:
        pickle.dump(chunks, f)


def load_index():
    index = faiss.read_index(
        os.path.join(VECTOR_STORE_PATH, "faiss_index.bin")
    )

    with open(
        os.path.join(VECTOR_STORE_PATH, "chunks.pkl"),
        "rb"
    ) as f:
        chunks = pickle.load(f)

    return index, chunks

def search_index(index, query_embedding, chunks, top_k=3):
    distances, indices = index.search(
        np.array([query_embedding]),
        top_k
    )

    results = []

    for i in indices[0]:
        if i < len(chunks):
            results.append(chunks[i])

    return results
import fitz  # PyMuPDF


def extract_text_from_pdf(pdf_path: str):
    text = ""

    doc = fitz.open(pdf_path)

    for page in doc:
        text += page.get_text()

    doc.close()

    return text
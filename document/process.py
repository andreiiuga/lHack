from document.splitter import split_sentences

NL_MARKER = '__NL__MARKER__'

def process_doc(doc):
    print doc
    sents = split_sentences(doc)
    nlsents = [s.replace('\n', NL_MARKER) for s in sents]
    return nlsents

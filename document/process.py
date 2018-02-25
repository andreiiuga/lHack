import spacy

from document.splitter import split_sentences


NL_MARKER = '__NL__MARKER__'

# Global Spacy model
nlp = spacy.load('en_core_web_sm')


def process_doc(doc):
    # print doc
    sents = split_sentences(doc)
    nlsents = [s.replace('\n', NL_MARKER) for s in sents]

    ids = []
    for s in sents:
        doc = nlp(s)
        found = []
        for word in doc:
            if word.dep_ in ('obj', 'dobj'):
                subtree_ids = [w.idx for w in word.subtree] + [w.idx + len(w) for w in word.subtree]
                found.append((min(subtree_ids), max(subtree_ids)))
        ids.append(found)

    print len(nlsents)
    print len(ids)
    return nlsents, ids

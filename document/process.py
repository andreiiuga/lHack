import math
import spacy

from collections import defaultdict

from document.scraper import scrape
from document.splitter import split_sentences


NL_MARKER = '__NL__MARKER__'

# Global Spacy model
nlp = spacy.load('en_core_web_sm')


def process_doc(doc):
    # print doc
    sents = split_sentences(doc)
    nlsents = [s.replace('\n', NL_MARKER) for s in sents]

    vocabulary = set()
    word_idf = defaultdict(lambda: 0)

    sents_subtrees = []
    for s in sents:
        doc = nlp(s)
        found = []
        for word in doc:
            children = list(word.subtree)
            if len(children) > 1 and word.dep_ in ('obj', 'dobj'):
                found.append(children)

                # Compute IDF
                wordset = set([w.text.lower() for w in children])
                vocabulary.update(wordset)
                for vw in wordset:
                    word_idf[vw] += 1
        sents_subtrees.append(found)

    # Compute IDF
    for w in vocabulary:
        word_idf[w] = math.log(len(found) / float(1 + word_idf[w]))

    rescricted_ss = []
    print 'sents_subtrees', sents_subtrees
    for sts in sents_subtrees:
        restr_subtrees = []
        for stree in sts:
            idf = 0
            children = list(stree)
            for child in children:
                idf += word_idf[child.text.lower()]
            idf /= len(children)
            print ''.join(w.text_with_ws for w in children)
            print 'IDF:', idf
            if idf > -1:
                restr_subtrees.append(children)
        rescricted_ss.append(restr_subtrees)

    ids = []
    for sts in rescricted_ss:
        local_ids = []
        for children in sts:
            subtree_ids = [w.idx for w in children] + [w.idx + len(w) for w in children]
            local_ids.append((min(subtree_ids), max(subtree_ids)))
        ids.append(local_ids)

    print len(nlsents)
    print ids

    return nlsents, ids

def fetch_results(query):
    scrape_results = scrape(query)
    print query

    query_doc = nlp(query)
    sims = []
    for res, link in scrape_results:
        s = nlp(res).similarity(query_doc)
        sims.append(s)
    print sims
    print scrape_results
    ordered = sorted(zip(scrape_results, sims), key=lambda x: x[1], reverse=True)
    return ordered[:3]

import urllib2
from bs4 import BeautifulSoup
from django.utils.http import urlquote


SEARCH_TEMPLATE = 'http://eur-lex.europa.eu/search.html?qid=1519556753205&text=%s&scope=EURLEX&type=quick&lang=en'

def make_url(title):
    return 'http://eur-lex.europa.eu/' + title.find('a', attrs={'class': 'title'})['href'][2:]

def scrape(query):
    query_url = SEARCH_TEMPLATE % urlquote(query)
    print query_url
    page = urllib2.urlopen(query_url)
    soup = BeautifulSoup(page, 'html.parser')

    result_titles = soup.findAll('td', attrs={'class': 'publicationTitle'})
    for title in result_titles:
        print make_url(title)
    return [(title.text, make_url(title)) for title in result_titles]

import urllib2
from bs4 import BeautifulSoup
from django.utils.http import urlquote


SEARCH_TEMPLATE = 'http://eur-lex.europa.eu/search.html?qid=1519556753205&text=%s&scope=EURLEX&type=quick&lang=en'


def scrape(query):
    query_url = SEARCH_TEMPLATE % urlquote(query)
    print query_url
    page = urllib2.urlopen(query_url)
    soup = BeautifulSoup(page, 'html.parser')

    result_titles = soup.findAll('td', attrs={'class': 'publicationTitle'})
    for title in result_titles:
        print title.find('a', attrs={'class': 'title'}).href
    return [title.text for title in result_titles]

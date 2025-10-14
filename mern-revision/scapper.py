# linkedin_public_edu_scraper.py
import time
import requests
from bs4 import BeautifulSoup
import urllib.robotparser
from urllib.parse import urlparse

USER_AGENT = "MyScraperBot/1.0 (gk022135@gmail.com)"
HEADERS = {"User-Agent": USER_AGENT}

def can_fetch(url):
    parsed = urlparse(url)
    robots_url = f"{parsed.scheme}://{parsed.netloc}/robots.txt"
    rp = urllib.robotparser.RobotFileParser()
    rp.set_url(robots_url)
    try:
        rp.read()
    except Exception:
        # If robots.txt can't be read, be conservative and return False
        return False
    return rp.can_fetch(USER_AGENT, url)

def fetch_education_from_profile(profile_url):
    if not can_fetch(profile_url):
        raise RuntimeError("robots.txt disallows scraping this URL. Respect the site's rules.")

    r = requests.get(profile_url, headers=HEADERS, timeout=10)
    r.raise_for_status()
    soup = BeautifulSoup(r.text, "html.parser")

    # Heuristic: find section with heading "Education" (markup varies over time)
    edu_section = None
    for heading in soup.find_all(["h2","h3","h4"]):
        if heading.get_text(strip=True).lower() == "education":
            # often the education details are in sibling or parent container
            edu_section = heading.find_parent()
            break

    results = []
    if not edu_section:
        # fallback: look for elements that mention "education" in class or id
        edu_section = soup.find(attrs={"id": lambda v: v and "education" in v.lower()})
    if edu_section:
        # try to extract school names / degree lines
        for li in edu_section.find_all(["li","div"]):
            text = li.get_text(" ", strip=True)
            if text:
                results.append(text)
    else:
        # fallback: search whole page for "Education" and nearby text
        text = soup.get_text(" ", strip=True)
        idx = text.lower().find("education")
        if idx != -1:
            snippet = text[max(0, idx-200): idx+800]
            results.append(snippet)

    # polite pause (rate limiting)
    time.sleep(2.0)
    return results

if __name__ == "__main__":
    url = "https://www.linkedin.com/in/Gaurav_krrr/"  # must be public
    try:
        edu = fetch_education_from_profile(url)
        print("Education entries found:", edu)
    except Exception as e:
        print("Error:", e)

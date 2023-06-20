from app import db

def getByKeyword(filterKeyword, currentPage):
    count = db.engine.execute("""
        select count(*) from public.analysis
            where (length(%s) = 0 or text like '%%' || %s ||'%%')
    """, filterKeyword, filterKeyword).fetchone()

    total = 0
    results = []
    if count is not None and len(count) > 0:
        total = count[0]
        temps = db.engine.execute("""
            select * from public.analysis
            where (length(%s) = 0 or text like '%%' || %s ||'%%')
            LIMIT %s OFFSET %s
        """, filterKeyword, filterKeyword, 10, (currentPage-1)*10)
    
        for item in temps:
            results.append(dict(item))

    return results, total

def getCsmSentiment():
    temps = db.engine.execute("""
            select sentiment, count(*) as value 
            from public.analysis 
            group by sentiment
            order by sentiment desc
        """)
    results = []
    for item in temps:
        results.append(dict(item))
    return results

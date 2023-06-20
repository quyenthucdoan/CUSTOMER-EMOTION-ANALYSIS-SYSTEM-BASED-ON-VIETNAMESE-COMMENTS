from app import db

def getEmotionStats():
    temps = db.engine.execute("""
        select emotion, count(*) as countEmotion
            from ((
                select id, emotion from ratemds
            ) union all ( 
                select id, emotion from tweet
            ) union all (
                select id, emotion from trustpilot
            ) union all (
                select id, emotion from whitecoat
            )
            ) allEmotion 
            group by emotion
    """)
    results = []
    for item in temps:
        results.append(dict(item))

    return results

def getKeyword(method, numOfKeyword = 50):
    query = """
        SELECT keyword, pseudo_freq FROM public.keyword_product
        ORDER BY pseudo_freq DESC
        LIMIT {1}
    """.format(method, numOfKeyword)
    # print(query)
    temps = db.engine.execute(query)
    results = []
    for item in temps:
        results.append(dict(item))

    return results


from app import db


def getTerms(numOfTerms=15):
    print(numOfTerms)
    if numOfTerms:
        numOfTerms = 20
    results = []
    for i in range(10):
        query = """
        SELECT keyword, topic, pseudo_freq, sentiment
	    FROM public.topic_terms 
        where topic={}
        ORDER BY pseudo_freq DESC
        LIMIT {}
        """.format(
            i, numOfTerms
        )
        print(query)
        temps = db.engine.execute(query)
        topic = []
        for item in temps:
            topic.append(dict(item))
        results.append(topic)
    return results

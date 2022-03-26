FROM python:3.6       
ADD . /telehealth_api
WORKDIR /telehealth_api

RUN pip install -r requirements.txt
ENTRYPOINT ["python", "run.py"]
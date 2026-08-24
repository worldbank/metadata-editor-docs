FROM python:3.12-slim-bookworm

RUN useradd -u 6970 -ms /bin/bash pydatatools
USER pydatatools

WORKDIR /home/pydatatools/app

COPY pydatatools/requirements.txt /home/pydatatools/app
RUN pip install --user -r requirements.txt
USER pydatatools

COPY pydatatools /home/pydatatools/app

CMD ["python", "-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
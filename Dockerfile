FROM ubuntu:latest
LABEL authors="maksg"

ENTRYPOINT ["top", "-b"]
from pymongo import MongoClient
from app import app


class BaseDB(object):
    def __init__(self):
        self.client = MongoClient()
        self.db = self.client.pmu

    def find_q(self, collection, query):
        try:
            res = self.db[collection].find(query)
            return list(res)
        except Exception, e:
            app.logger.error(e)

    def aggregate_q(self, collection, query):
        try:
            res = self.db[collection].aggregate(query)
            return list(res)
        except Exception, e:
            app.logger.error(e)

    def find_one_q(self, collection, query):
        try:
            res = self.db[collection].find_one(query)
            return res
        except Exception, e:
            app.logger.error(e)



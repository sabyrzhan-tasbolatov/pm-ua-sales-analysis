from db.base import BaseDB


class Activities(BaseDB):

    def find(self, collection, query):
        super(Activities, self).find_q(collection, query)

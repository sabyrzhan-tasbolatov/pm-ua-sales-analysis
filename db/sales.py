from db.base import BaseDB


class Sales(BaseDB):
    def __init__(self):
        self.collection = 'sales'
        super(Sales, self).__init__(self.collection)



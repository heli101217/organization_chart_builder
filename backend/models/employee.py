from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Employee(Base):
    __tablename__ = 'employees'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    title = Column(String, index=True)
    manager_id = Column(Integer, ForeignKey('employees.id'))

    manager = relationship("Employee", remote_side=[id], backref="subordinates") 
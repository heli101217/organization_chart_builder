from sqlalchemy.orm import Session
from models.employee import Employee
from typing import Optional

def get_all_employees(db: Session):
    return db.query(Employee).all()

def update_employee_manager(db: Session, employee_id: int, manager_id: Optional[int]):
    employee = db.query(Employee).filter(Employee.id == employee_id).first()
    if not employee:
        return None

    employee.manager_id = manager_id
    db.commit()
    return employee

def seed_data(db: Session):
    if not db.query(Employee).first():
        employees = [  
            Employee(id=1, name="Alice Johnson", title="CEO", manager_id=None),
            Employee(id=2, name="Bob Smith", title="CTO", manager_id=1),
            Employee(id=3, name="Charlie Brown", title="CFO", manager_id=1),
            Employee(id=4, name="David Lee", title="Lead Engineer", manager_id=2),
            Employee(id=5, name="Eva Green", title="Software Engineer", manager_id=4),
            Employee(id=6, name="Frank Wright", title="Senior Software Engineer", manager_id=4),
            Employee(id=7, name="Grace Taylor", title="DevOps Engineer", manager_id=2),
            Employee(id=8, name="Hannah Clark", title="Finance Manager", manager_id=3),
            Employee(id=9, name="Ian Roberts", title="Financial Analyst", manager_id=8),
            Employee(id=10, name="Jack Wilson", title="HR Manager", manager_id=1),
            Employee(id=11, name="Katie Lewis", title="Recruiter", manager_id=10),
        ] 
        db.add_all(employees)
        db.commit() 
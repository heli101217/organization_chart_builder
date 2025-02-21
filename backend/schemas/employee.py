from pydantic import BaseModel
from typing import Optional

class EmployeeResponse(BaseModel):
    id: int
    name: str
    title: str
    manager_id: Optional[int]

    class Config:
        from_attributes = True
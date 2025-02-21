from fastapi import FastAPI, HTTPException, Depends, Request
from starlette.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from database import engine, SessionLocal, Base
from crud import get_all_employees, seed_data
from schemas import EmployeeResponse
from typing import List
from doc import TAGS_METADATA

app = FastAPI(**{"title": "App API"}, openapi_tags=TAGS_METADATA)

app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

@app.exception_handler(HTTPException)
async def http_exception_handler(_request: Request, exc: HTTPException):
  return JSONResponse(
    status_code=exc.status_code,
    content={"error": {"message": exc.detail}, "message": exc.detail},
  )

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.on_event("startup")
def startup():
    db = SessionLocal()
    seed_data(db)
    db.close()

@app.get("/healthcheck", include_in_schema=False)
async def root():
  return {"status": "ok"}

@app.get("/employees", response_model=List[EmployeeResponse], description="Retrieve all employees", tags=["employees"])
def get_employees(db: Session = Depends(get_db)):
    try:
        return get_all_employees(db)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

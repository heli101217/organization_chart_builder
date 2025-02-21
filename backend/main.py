from fastapi import FastAPI

app = FastAPI()

@app.get("/healthcheck", include_in_schema=False)
async def root():
  return {"status": "ok"}

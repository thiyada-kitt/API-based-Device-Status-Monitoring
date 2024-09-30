# server/app/main.py
from fastapi import FastAPI
from app.routers import status, websocket

app = FastAPI()

app.include_router(status.router)
app.include_router(websocket.router)

@app.get("/")
async def root():
    return {"message": "Welcome to the HWAPI Server!"}

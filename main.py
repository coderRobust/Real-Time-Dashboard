from fastapi import FastAPI, WebSocket, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
import psutil
import asyncio

app = FastAPI()
templates = Jinja2Templates(directory="templates")

@app.get("/", response_class=HTMLResponse)
async def get_dashboard(request: Request):
    return templates.TemplateResponse("dashboard.html", {"request": request})

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            cpu = psutil.cpu_percent()
            mem = psutil.virtual_memory().used / (1024 * 1024 * 1024)
            await websocket.send_json({"cpu": cpu, "memory": round(mem, 2)})
            await asyncio.sleep(1)
    except Exception:
        await websocket.close()

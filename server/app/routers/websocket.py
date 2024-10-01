from fastapi import APIRouter, WebSocket, WebSocketDisconnect
import psutil
import json
import datetime

router = APIRouter()

active_connections: dict[int, WebSocket] = {}

@router.websocket("/ws/monitor")
async def monitor(websocket: WebSocket):
    await websocket.accept()
    connection_id = id(websocket)
    active_connections[connection_id] = websocket

    try:
        while True:
            status = {
                "status": {
                    "online": True,
                    "timestamp": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                },
                "system": {
                    "cpu": {
                        "usage": psutil.cpu_percent(interval=1),
                        "load_average": psutil.getloadavg()
                    },
                    "ram": {
                        "usage": psutil.virtual_memory().percent,
                        "total": f"{psutil.virtual_memory().total / (1024 ** 3):.2f} GB",
                        "available": f"{psutil.virtual_memory().available / (1024 ** 3):.2f} GB"
                    },
                    "disk": {
                        "usage": psutil.disk_usage('/').percent,
                        "total": f"{psutil.disk_usage('/').total / (1024 ** 3):.2f} GB",
                        "free": f"{psutil.disk_usage('/').free / (1024 ** 3):.2f} GB"
                    }
                },
                "network": {
                    "bytes_sent": f"{psutil.net_io_counters().bytes_sent / (1024 ** 3):.2f} GB",
                    "bytes_recv": f"{psutil.net_io_counters().bytes_recv / (1024 ** 3):.2f} GB"
                },
                "disk_io": {
                    "read_count": psutil.disk_io_counters().read_count,
                    "write_count": psutil.disk_io_counters().write_count,
                    "read_bytes": f"{psutil.disk_io_counters().read_bytes / (1024 ** 3):.2f} GB",
                    "write_bytes": f"{psutil.disk_io_counters().write_bytes / (1024 ** 3):.2f} GB"
                }
            }
            await websocket.send_text(json.dumps(status))
    except WebSocketDisconnect:
        del active_connections[connection_id]

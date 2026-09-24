---
name: fastapi-and-async-python-backends
description: Designs high-performance async Python backend APIs with FastAPI, Pydantic v2, SQLAlchemy 2.0 async sessions, and Alembic migrations.
---

# FastAPI & Async Backend Architecture

## Guidelines
- Use dependency injection for db sessions, authentication, and service layers.
- Implement strictly validated Pydantic v2 models with zero runtime leakage.
- Use asyncpg with connection pooling, transaction isolation levels, and background worker offloading.

FROM python:3.8-alpine

# Set environment variables
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

# Set the working directory
WORKDIR /TechMentor/backend

# Copy requirements file and install dependencies
COPY requirements.txt /TechMentor/backend/
RUN apk add --no-cache postgresql-dev gcc python3-dev musl-dev && \
    pip install --no-cache-dir -r requirements.txt && \
    apk del postgresql-dev gcc python3-dev musl-dev

# Copy the rest of the application code
COPY . /TechMentor/backend/

# Start the Django development server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

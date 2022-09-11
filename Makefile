guest:
	cd guest-app && python3 -m http.server 8081

staff:
	cd staff-app && python3 -m http.server 8082

server:
	cd server-app && source venv/bin/activate && FLASK_APP=app.py flask run -h '0.0.0.0' -p 105 --reload

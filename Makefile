guest:
	cd guest-app && python3 -m http.server 8081

staff:
	cd staff-app && python3 -m http.server 8082

server:
	cd server && npm install && npm start

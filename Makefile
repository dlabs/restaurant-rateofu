guest:
	cd guest-app && python3 -m http.server 3001 --bind 127.0.0.1

staff:
	cd staff-app && python3 -m http.server 3002 --bind 127.0.0.1

PYTHON := .venv/bin/python

.PHONY: guest
guest:
	cd guest-app && ../$(PYTHON) -m http.server 8081

.PHONY: staff
staff:
	cd staff-app && ../$(PYTHON) -m http.server 8082

.PHONY: server
server:
	cd server && ../$(PYTHON) -m src.cmd.dev_server

.PHONY: server-test
server-test:
	cd server && ENV=test ../$(PYTHON) -m src.cmd.test_server

.PHONY: sync-deps
sync-deps:
	$(PYTHON) -m pip freeze > requirements.txt

.PHONY: format
format:
	cd server && ../$(PYTHON) -m isort .
	cd server && ../$(PYTHON) -m black .

.PHONY: test
test:
	cd server && ../$(PYTHON) -m pytest --ignore=tests/

.PHONY: test-e2e
test-e2e:
	cd server && ENV=test ../$(PYTHON) -m pytest tests/e2e/

.PHONY: clean
clean:
	find . -type f -name '*.py[co]' -delete -o -type d -name __pycache__ -delete
	find . -type d -name .pytest_cache -exec rm -rf {} +

TESTS = $(shell find test -type f -name "*.js")
TESTTIMEOUT = 5000
REPORTER = spec
PROJECT_DIR = $(shell pwd)

test:
	@NODE_ENV=test ./node_modules/mocha/bin/mocha \
		--reporter $(REPORTER) --timeout $(TESTTIMEOUT) $(TESTS)

cov:
	@rm -rf ../nodeclub-cov
	@jscoverage --encoding=utf-8 --exclude=node_modules --exclude=public --exclude=test ./ ../nodeclub-cov
	@cp -rf ./node_modules ./test ./public ../nodeclub-cov

test-cov: cov
	@$(MAKE) -C $(PROJECT_DIR)/../nodeclub-cov test REPORTER=progress
	@$(MAKE) -C $(PROJECT_DIR)/../nodeclub-cov test REPORTER=html-cov > coverage.html
	@$(MAKE) test REPORTER=markdown > test_results.md

.PHONY: test test-cov cov

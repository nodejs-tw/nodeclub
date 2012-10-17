TESTS = $(shell find test -type f -name "*.test.js")
TESTTIMEOUT = 5000
REPORTER = spec
NAME = nodeclub
PROJECT_DIR = $(shell pwd)

test:
	@NODE_ENV=test ./node_modules/mocha/bin/mocha \
		--reporter $(REPORTER) --timeout $(TESTTIMEOUT) $(TESTS)

cov:
	@rm -rf ../$(NAME)-cov
	@jscoverage --encoding=utf-8 --exclude=node_modules --exclude=public --exclude=test ./ ../$(NAME)-cov
	@cp -rf ./node_modules ./test ./public ../$(NAME)-cov

test-cov: cov
	@$(MAKE) -C $(PROJECT_DIR)/../$(NAME)-cov test REPORTER=dot
	@$(MAKE) -C $(PROJECT_DIR)/../$(NAME)-cov test REPORTER=html-cov > coverage.html

.PHONY: test test-cov cov

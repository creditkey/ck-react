.PHONY : build production

build:
	yarn build

production: build
	aws s3 sync build/ s3://creditkey-test --p cci
	aws cloudfront create-invalidation --distribution-id E3W1V8EI3ZGJZ0 --paths "/*" --p creditkey

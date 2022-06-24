.PHONY : production staging

staging:
	REACT_APP_ENV="staging" \
	npm run build
	aws s3 sync build/ s3://demo.creditkey.tech --p creditkey
	aws cloudfront create-invalidation --distribution-id E6ITSIH0ET7AS --paths "/*" --p creditkey

production:
	REACT_APP_ENV="production" \ 
	npm run build
	aws s3 sync build/ s3://creditkey-test --p creditkey
	aws cloudfront create-invalidation --distribution-id E3W1V8EI3ZGJZ0 --paths "/*" --p creditkey

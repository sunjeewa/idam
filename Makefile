all:
	npm run build
install:
	cdk deploy idam-cognito

ui:
	cdk deploy idam-ui

set -eo pipefail
cat <<EOF | kubectl apply -f -
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  labels:
    k8s-app: cars-wms-$CARSWMS_CI_ENV
  name: cars-wms-$CARSWMS_CI_ENV
  namespace: $CARSWMS_ENV_NAME
spec:
  replicas: 1
  selector:
    matchLabels:
      k8s-app: cars-wms-$CARSWMS_CI_ENV
  template:
    metadata:
      labels:
        k8s-app: cars-wms-$CARSWMS_CI_ENV
    spec:
      containers:
      - args:
        image: docker.ptit365.com/cars-wms-frontend-$CARSWMS_CI_ENV:ci-$CI_PIPELINE_ID
        name: cars-wms-$CARSWMS_CI_ENV
        ports:
        - containerPort: 3000
          protocol: TCP
      imagePullSecrets:
      - name: docker-ptit365-secret
---
apiVersion: v1
kind: Service
metadata:
  name: cars-wms-$CARSWMS_CI_ENV
  namespace: $CARSWMS_ENV_NAME
spec:
  ports:
    - name: cars-wms-$CARSWMS_CI_ENV
      port: 80
      protocol: TCP
      targetPort: 3000
  selector:
    k8s-app: cars-wms-$CARSWMS_CI_ENV
---
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  annotations:
    kubernetes.io/ingress.class: traefik
    kubernetes.io/tls-acme: 'true'
  name: cars-wms-$CARSWMS_CI_ENV-ingress
  namespace: $CARSWMS_ENV_NAME
spec:
  rules:
  - host: cars-wms-$CARSWMS_CI_ENV.ptit365.com
    http:
      paths:
      - backend:
          serviceName: cars-wms-$CARSWMS_CI_ENV
          servicePort: 80
        path: /
  tls:
  - secretName: ptit365-cert
    hosts:
    - cars-wms-$CARSWMS_CI_ENV.ptit365.com
EOF

echo "Waiting for deployment..."
kubectl rollout status -n $CARSWMS_ENV_NAME -w deployment/cars-wms-$CARSWMS_CI_ENV
echo "Application is accessible at: https://cars-wms-$CARSWMS_CI_ENV.ptit365.com"
echo ""

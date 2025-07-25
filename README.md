## ✅  How to Use in Workflow

# .github/workflows/deploy.yml
```
name: Deploy to Azure AKS

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout source
        uses: actions/checkout@v4

      - name: Deploy to AKS
        uses: cholaraju/azure-aks-deploy-action@v1
        with:
          azure_client_id: ${{ secrets.AZURE_CLIENT_ID }}
          azure_client_secret: ${{ secrets.AZURE_CLIENT_SECRET }}
          azure_tenant_id: ${{ secrets.AZURE_TENANT_ID }}
          azure_subscription_id: ${{ secrets.AZURE_SUBSCRIPTION_ID }}
          resource_group: my-aks-resource-group
          cluster_name: my-aks-cluster
```


### 🔐 Secrets to Store in GitHub
Store these in Settings > Secrets and variables > Actions:

AZURE_CLIENT_ID

AZURE_CLIENT_SECRET

AZURE_TENANT_ID

AZURE_SUBSCRIPTION_ID

### You get these values by creating a service principal:


``` az ad sp create-for-rbac --name "github-action-sp" --role contributor \
  --scopes /subscriptions/<subscription-id> \
  --sdk-auth
  
  ```
### 📘  Description

This GitHub Action connects securely to an Azure Kubernetes Service (AKS) cluster using a service principal.
It configures Docker and kubectl on the runner and fetches kubeconfig using az aks get-credentials.
Easily use it to deploy your containerized workloads to AKS from GitHub Actions.


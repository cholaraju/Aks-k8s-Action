const core = require('@actions/core');
const exec = require('@actions/exec');

async function run() {
  try {
    const clientId = core.getInput('azure_client_id');
    const clientSecret = core.getInput('azure_client_secret');
    const tenantId = core.getInput('azure_tenant_id');
    const subscriptionId = core.getInput('azure_subscription_id');
    const resourceGroup = core.getInput('resource_group');
    const clusterName = core.getInput('cluster_name');

    // Install Azure CLI, kubectl, Docker (if not already installed in the runner)
    await exec.exec('az version');
    await exec.exec('az login --service-principal -u ' + clientId + ' -p ' + clientSecret + ' --tenant ' + tenantId);
    await exec.exec(`az account set --subscription ${subscriptionId}`);
    await exec.exec(`az aks get-credentials --resource-group ${resourceGroup} --name ${clusterName} --overwrite-existing`);
    
    // Show current context
    await exec.exec('kubectl config current-context');
    
    // Docker login or kubectl apply can be added here
    core.info("You are now connected to AKS cluster.");
    
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();

import { CloudFormationClient, DescribeStacksCommand, ListStackResourcesCommand } from '@aws-sdk/client-cloudformation'

const client = new CloudFormationClient({
  region: 'us-east-1'
})

const { Stacks } = await client.send(new DescribeStacksCommand({
  StackName: null // To grab all stacks, this field needs to be null
}))

for (let stack of Stacks) {
  console.log(stack.StackName)

  const { StackResourceSummaries } = await client.send(new ListStackResourcesCommand({
    StackName: stack.StackName
  }))

  for (let resource of StackResourceSummaries) {
    console.log("\t" + resource.ResourceType)
  }

  console.log()
}

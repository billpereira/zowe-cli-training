# zowe-cli-training

This repository contains example about how we can use ZOWE CLI to automate some daily tasks using the commands provided,
a bit of JCL, REXX and Javascript.

For each example the package.json contains the dependencies needed

ex-hello-world uses mustache, to render hello-world jcl with the properties of config.json
usage: npm run submit

ex-out-of-space brings the situation where do we need to allocate a new pds to copy our members and then rename.
usage: node increaseSize dataset.name

It will execute the rex to check the current size of dataset.name and double the primary extend.

Once it has the dataset info it will use the createNew.jcl to copy members to new dataset and then rename it.

ex-apf Issue the command to apf a dataset
usage: node apf dataset.name volser

If volser is null it will assume dataset is SMS.

Before apf it check if dataset is not apfed yed, and then it will issue command to apf it.

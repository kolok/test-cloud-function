# test with functions:
https://cloud.google.com/functions/docs/emulator

• [CPL-noudard:test-cloud-function] $ functions config set projectId my-project-cloudonboard
projectId set to: "my-project-cloudonboard"

You must restart the Emulator for changes to take effect...
• [CPL-noudard:test-cloud-function] $ functions deploy processFile --trigger-bucket=gs://id-list-test
Copying file:///tmp/us-central1-processFile-14051sV5fpEOIcXo2.zip...
Waiting for operation to finish...done.
Deploying function.......done.
Function processFile deployed.
┌────────────┬───────────────────────────────────────────────────────────┐
│ Property   │ Value                                                     │
├────────────┼───────────────────────────────────────────────────────────┤
│ Name       │ processFile                                               │
├────────────┼───────────────────────────────────────────────────────────┤
│ Trigger    │ providers/cloud.storage/eventTypes/object.change          │
├────────────┼───────────────────────────────────────────────────────────┤
│ Resource   │ gs://id-list-test                                         │
├────────────┼───────────────────────────────────────────────────────────┤
│ Timeout    │ 60 seconds                                                │
├────────────┼───────────────────────────────────────────────────────────┤
│ Local path │ /home/noudard/workspace/test-cloud-function               │
├────────────┼───────────────────────────────────────────────────────────┤
│ Archive    │ file:///tmp/us-central1-processFile-14051sV5fpEOIcXo2.zip │
└────────────┴───────────────────────────────────────────────────────────┘



# create the test bucket
gsutil mb -p my-project-cloudonboard -c regional -l europe-west1 gs://id-list-test 


# Hazardous Utility Poles
A website that lets you upload images + metadata of utility poles and approximate how much each one is leaning in real time.
* Live site: https://utilitypolesafetyevaluator.herokuapp.com/

## Demo
[![](https://res.cloudinary.com/marcomontalbano/image/upload/v1605556477/video_to_markdown/images/youtube--sC3HWSmh7bc-c05b58ac6eb4c4700831b2b3070cd403.jpg)](https://youtu.be/sC3HWSmh7bc "")

## Additional Resources
* Repo for the back-end API: https://github.com/Rocksrock18/Lean-Calculator
* Repo for the Drone AI: https://github.com/WildJae/Drone_autopilot
* Link to the Presentation: https://docs.google.com/presentation/d/1UIGLWtnVoPXpvNfgnMyHhOTt6sUd8r9i00P4BUSiQlM/edit?usp=sharing

## Uploading Data
Upload the image of the pole and the corresponding metadata into the dropbox.
* **Note:** Metadata will need to have a specific format. Visit our [back-end repository](https://github.com/Rocksrock18/Lean-Calculator) to see how this is formatted.
If you don't have any, you can download some data that we have provided.

## Interpreting the Results
It'll take a few seconds to start loading in your results. As they come in, you should see markers start to come up on the map.

Markers will have one of 4 colors representing the status of each pole:
* Red: Lean factor > 10
* Orange: Lean factor > 5
* Yellow: Lean factor > 2.5
* Green: Lean factor < 2.5

## Additional steps
We use the AEP API in our website, which uses HTTP requests. In order to enable these requests in your browser, you have to take the following steps:
1. Navigate to Browser Settings > Site Settings > Additional content settings > Insecure content
2. Under the "Allow" section, click "Add"
3. Enter https://utilitypolesafetyevaluator.herokuapp.com/ in the box and confirm

## Authors
* Jasen Lai
* Jaewook Lee
* Arnold Makarov
* Jacob Maxson

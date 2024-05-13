# Carbon-intensity plugin

The Carbon Intensity plugin grabs grid intensity data from the UK National Grid carbon intensity API for a given date.


## Implementation

The carbon intensity plugin grabs grid carbon intensity data from the UK NationalGrid carbon intensity API (served at https://api.carbonintensity.org.uk) for each observation in a manifest's `input` data. 

The `timestamp` field in the input data is used as a query parameter to the `intensity` endpoint documented [here](https://carbon-intensity.github.io/api-definitions/#get-intensity-factors).

Currently, an API request is made for every timestep in the input array. However, since the API has a maximum temporal resolution of 30 minutes, a future upgrade will add some logic to only make a new API request if 30 minutes have elapsed since the previous request.






## Usage

To run the `carbon-intensity-plugin`, an instance of `CarbonIntensityAPI()` must be created. Then, the plugin's `execute()` method can be called, passing required arguments to it.

This is how you could run the model in Typescript:

```typescript
import { CarbonIntensityPlugin } from './src/lib/carbon-intensity';

async function runPlugin() {

    const inputs = [
        {
            timestamp: '2023-08-06T00:00',
            duration: '15s',
            'cpu-util': 34,
        },
        {
            timestamp: '2023-08-06T00:00',
            duration: '15s',
            'cpu-util': 12,
        },
    ];

    const out = await CarbonIntensityPlugin({}).execute(inputs)

    console.log(out);
}

runPlugin();

```

## Integration into Impact Framework

### Using `npm link`

Clone this repository to your local machine. In the project root run `npm run build && npm link`.
This creates a package with global scope on your local machine that can be installed by your instance of Impact Framework. 

Navigate to the Impact Framework root, and run `npm link carbon-intensity-plugin`.

Now you can use the plugin by including it in your manifest file.


```yaml
name: carbon-intensity plugin demo
description: 
tags:
initialize:
  plugins:
    carbon-intensity:
      method: CarbonIntensityPlugin
      path: "carbon-intensity-plugin"
tree:
  children:
    child:
      pipeline:
        - carbon-intensity
      config:
      inputs:
        - timestamp: 2023-08-06T00:00
          duration: 3600
          carbon: 30
        - timestamp: 2023-09-06T00:00
          duration: 3600
          carbon: 30
        - timestamp: 2023-10-06T00:00
          duration: 3600
          carbon: 30

```


## Outputs

The example manifest above yields the following output data:

```yaml
name: coefficient-demo
description: successful path
tags: null
initialize:
  plugins:
    carbon-intensity:
      path: carbon-intensity-plugin
      method: CarbonIntensityPlugin
tree:
  children:
    child:
      pipeline:
        - carbon-intensity
      config: null
      inputs:
        - timestamp: 2023-08-06T00:00
          duration: 3600
          carbon: 30
        - timestamp: 2023-09-06T00:00
          duration: 3600
          carbon: 30
        - timestamp: 2023-10-06T00:00
          duration: 3600
          carbon: 30
      outputs:
        - timestamp: 2023-08-06T00:00
          duration: 3600
          carbon: 30
          grid/carbon-intensity: 96
        - timestamp: 2023-09-06T00:00
          duration: 3600
          carbon: 30
          grid/carbon-intensity: 206
        - timestamp: 2023-10-06T00:00
          duration: 3600
          carbon: 30
          grid/carbon-intensity: 60

```


### Using directly from Github

You can load the plugin directly from this Github repository. Simply run `npm install -g https://github.com/jmcook1186/carbon-intensity-plugin`

Then, in your `manifest`, provide the path in the model instantiation. You also need to specify the function name for the exported plugin function.

```yaml
name: coefficient-demo
description: successful path
tags:
initialize:
  plugins:
    carbon-intensity:
      method: CarbonIntensityPlugin
      path: "https://github.com/jmcook1186/carbon-intensity-plugin"
tree:
  children:
    child:
      pipeline:
        - carbon-intensity
      config:
      inputs:
        - timestamp: 2023-08-06T00:00
          duration: 3600
          carbon: 30
        - timestamp: 2023-09-06T00:00
          duration: 3600
          carbon: 30
        - timestamp: 2023-10-06T00:00
          duration: 3600
          carbon: 30

```

Now, when you run the `manifest` using the IF CLI, it will load the model automatically. Run using:

```sh
ie --m <path-to-your-manifest> --stdout
```

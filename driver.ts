import { CarbonIntensityPlugin } from './src/lib/carbon-intensity';

async function runPlugin() {

    const inputs = [
        {
            timestamp: '2023-08-06T00:00',
            duration: '15s',
            'cpu-util': 34,
        },
        {
            timestamp: '2023-08-06T00:30',
            duration: '15s',
            'cpu-util': 12,
        },
        {
            timestamp: '2023-08-06T01:00',
            duration: '15s',
            'cpu-util': 12,
        },
        {
            timestamp: '2023-08-06T01:01',
            duration: '15s',
            'cpu-util': 12,
        },
    ];

    const out = await CarbonIntensityPlugin().execute(inputs)

    console.log(out);
}

runPlugin();

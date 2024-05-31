import { PluginInterface, PluginParams } from '../types/interface';
import { CarbonIntensityAPI } from './api';

export const CarbonIntensityPlugin = (): PluginInterface => {
  const metadata = {
    kind: 'execute',
  };

  /**
   * Execute's strategy description here.
   */
  const execute = async (inputs: PluginParams[]): Promise<PluginParams[]> => {
    const result = [];
    const startDate = new Date(inputs[0].timestamp);
    let intensity = await CarbonIntensityAPI().fetchOutputData(inputs[0].timestamp);

    for await (const input of inputs) {

      const snapshot = new Date(input.timestamp);
      const diff = (snapshot.getTime() - startDate.getTime()) / 1000 / 60 / 60;
      if (diff >= 0.5) {
        intensity = await CarbonIntensityAPI().fetchOutputData(input.timestamp);
        console.log(`carbon-intensity plugin: ${input.timestamp} 30 mins have elapsed, making new api request`)
      }
      result.push({ ...input, 'grid/carbon-intensity': intensity });
    }
    return result;
  };

  return {
    metadata,
    execute,
  };
};

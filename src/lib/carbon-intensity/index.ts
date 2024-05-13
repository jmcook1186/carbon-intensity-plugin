import { PluginInterface, PluginParams } from '../types/interface';
import { CarbonIntensityAPI } from './api';

export const CarbonIntensityPlugin = (
): PluginInterface => {
  const metadata = {
    kind: 'execute',
  };


  /**
   * Execute's strategy description here.
   */
  const execute = async (inputs: PluginParams[]): Promise<PluginParams[]> => {
    const result = [];
    for await (const input of inputs) {
      const date = input.timestamp;
      const intensity = await CarbonIntensityAPI().fetchOutputData(date);
      result.push({ ...input, 'grid/carbon-intensity': intensity });
    }
    return result;
  };

  return {
    metadata,
    execute,
  };
};

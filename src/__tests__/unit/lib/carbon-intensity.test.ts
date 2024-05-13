import {CarbonIntensityPlugin} from '../../../lib/carbon-intensity';

describe('lib/carbon-intensity: ', () => {
  describe('CarbonIntensityPlugin(): ', () => {
    it('has metadata field.', () => {
      const pluginInstance = CarbonIntensityPlugin();

      expect(pluginInstance).toHaveProperty('metadata');
      expect(pluginInstance).toHaveProperty('execute');
      expect(pluginInstance.metadata).toHaveProperty('kind');
      expect(typeof pluginInstance.execute).toBe('function');
    });
  });
});

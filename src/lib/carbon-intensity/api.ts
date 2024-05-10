import axios from 'axios';

import {ERRORS} from '../../util/errors';
import {buildErrorMessage} from './helpers';

const {APIRequestError} = ERRORS;

export const CarbonIntensityAPI = () => {
  const BASE_URL = 'https://api.carbonintensity.org.uk/intensity';

  const errorBuilder = buildErrorMessage(CarbonIntensityAPI.name);

  /**
   * Fetches CPU output data from Boavizta API for a specific component type.
   */
  const fetchOutputData = async (date: string): Promise<object> => {
    const response = await axios.get(`${BASE_URL}/${date}`).catch(error => {
      throw new APIRequestError(
        errorBuilder({
          message: `Error fetching data from Carbon Intensity API. ${JSON.stringify(
            error?.response?.data?.detail || error
          )}`,
        })
      );
    });
    return response?.data.data[0].intensity.actual;
  };

  return {
    fetchOutputData,
  };
};

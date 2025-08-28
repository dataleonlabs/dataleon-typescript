// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { IncomingMessage } from 'node:http';
import { ClientOptions } from '@dataleon/dataleon';

export const parseAuthHeaders = (req: IncomingMessage): Partial<ClientOptions> => {
  const apiKey = Array.isArray(req.headers['api-key']) ? req.headers['api-key'][0] : req.headers['api-key'];
  return { apiKey };
};

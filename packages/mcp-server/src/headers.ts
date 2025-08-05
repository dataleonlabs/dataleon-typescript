// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { type ClientOptions } from 'dataleon/client';

import { IncomingMessage } from 'node:http';

export const parseAuthHeaders = (req: IncomingMessage): Partial<ClientOptions> => {
  const apiKey = req.headers['Api-Key'] instanceof Array ? req.headers['Api-Key'][0] : req.headers['Api-Key'];
  return { apiKey };
};

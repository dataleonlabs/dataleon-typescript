// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { Dataleon } from '../client';

export abstract class APIResource {
  protected _client: Dataleon;

  constructor(client: Dataleon) {
    this._client = client;
  }
}

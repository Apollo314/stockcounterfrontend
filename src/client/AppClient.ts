/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { AxiosHttpRequest } from './core/AxiosHttpRequest';

import { ApiService } from './services/ApiService';
import { DashboardService } from './services/DashboardService';
import { InventoryService } from './services/InventoryService';
import { InvoiceService } from './services/InvoiceService';
import { PaymentsService } from './services/PaymentsService';
import { StakeholderService } from './services/StakeholderService';
import { UserService } from './services/UserService';

type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;

export class AppClient {
  public readonly api: ApiService;
  public readonly dashboard: DashboardService;
  public readonly inventory: InventoryService;
  public readonly invoice: InvoiceService;
  public readonly payments: PaymentsService;
  public readonly stakeholder: StakeholderService;
  public readonly user: UserService;

  public readonly request: BaseHttpRequest;

  constructor(
    config?: Partial<OpenAPIConfig>,
    HttpRequest: HttpRequestConstructor = AxiosHttpRequest
  ) {
    this.request = new HttpRequest({
      BASE: config?.BASE ?? '',
      VERSION: config?.VERSION ?? '0.0.0',
      WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
      CREDENTIALS: config?.CREDENTIALS ?? 'include',
      TOKEN: config?.TOKEN,
      USERNAME: config?.USERNAME,
      PASSWORD: config?.PASSWORD,
      HEADERS: config?.HEADERS,
      ENCODE_PATH: config?.ENCODE_PATH,
    });

    this.api = new ApiService(this.request);
    this.dashboard = new DashboardService(this.request);
    this.inventory = new InventoryService(this.request);
    this.invoice = new InvoiceService(this.request);
    this.payments = new PaymentsService(this.request);
    this.stakeholder = new StakeholderService(this.request);
    this.user = new UserService(this.request);
  }
}

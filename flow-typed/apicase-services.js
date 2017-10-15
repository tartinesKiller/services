declare module 'apicase-services' {
  declare type HooksT<T> = {
    [hookType: string]: T
  }

  declare type Hook = (ctx: Object, next: Function) => void

  declare type HooksObject = HooksT<Hook[]>

  declare type UnnormalizedHooksObject = HooksT<Hook | Hook[]>

  declare type EventName = 'before' | 'start' | 'success' | 'error' | 'finish' | 'preinstall' | 'postinstall'

  declare type AllOptions = {
    adapter?: string,
    hooks?: UnnormalizedHooksObject
  }

  declare type Adapter<Options> = (query: {
    options: Options,
    done: (data: mixed) => void,
    fail: (reason: mixed) => void,
    another: (hookType: string, data: mixed, reject?: boolean) => void
  }) => void

  declare type Plugin = (instance: Apicase) => void

  declare type Apicase = {
    base: {
      query: Object,
      hooks: HooksObject
    },
    options: {
      defaultAdapter: string
    },
    adapters: {
      [adapterName: string]: Adapter<Object>
    },
    use: (adapterName: string, adapter: Adapter<Object>) => void,
    call: (options: AllOptions) => Promise<mixed>,
    all: (options: AllOptions[]) => Promise<mixed>,
    of: (options: AllOptions) => Apicase,
    install: (installer: Plugin) => void,
    extend: (installer: Plugin) => Apicase,
    on: (event: EventName, callback: (...args: any[]) => void) => void,
    // For plugins
    [string]: any
  }
  declare module.exports: (installer: Plugin) => void;
}
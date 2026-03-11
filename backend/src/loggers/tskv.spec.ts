import { TSKVLogger } from './tskv';

describe('TSKVLogger', () => {
  let logger: TSKVLogger;
  let log: jest.SpyInstance;
  let error: jest.SpyInstance;
  let warn: jest.SpyInstance;
  let debug: jest.SpyInstance;

  const message = {
    message: 'message',
    optionalParam1: 'optionalParams1',
    optionalParam2: 'optionalParams2',
  };

  beforeEach(() => {
    logger = new TSKVLogger();
    log = jest.spyOn(console, 'log').mockImplementation(() => {});
    error = jest.spyOn(console, 'error').mockImplementation(() => {});
    warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    debug = jest.spyOn(console, 'debug').mockImplementation(() => {});
  });

  it('should be defined', () => {
    expect(logger).toBeDefined();
  });

  it('should call log method', () => {
    logger.log(message.message, message.optionalParam1, message.optionalParam2);
    expect(log).toHaveBeenCalled();
    const stringifiedMessage = log.mock.calls[0][0];
    expect(stringifiedMessage).toBe(
      `level=log\tmessage=${message.message}\toptionalParams=${message.optionalParam1},${message.optionalParam2}\n`,
    );
  });

  it('should call error method', () => {
    logger.error(
      message.message,
      message.optionalParam1,
      message.optionalParam2,
    );
    expect(error).toHaveBeenCalled();
    const stringifiedMessage = error.mock.calls[0][0];
    expect(stringifiedMessage).toBe(
      `level=error\tmessage=${message.message}\toptionalParams=${message.optionalParam1},${message.optionalParam2}\n`,
    );
  });

  it('should call warn method', () => {
    logger.warn(
      message.message,
      message.optionalParam1,
      message.optionalParam2,
    );
    expect(warn).toHaveBeenCalled();
    const stringifiedMessage = warn.mock.calls[0][0];
    expect(stringifiedMessage).toBe(
      `level=warn\tmessage=${message.message}\toptionalParams=${message.optionalParam1},${message.optionalParam2}\n`,
    );
  });

  it('should call debug method', () => {
    logger.debug(
      message.message,
      message.optionalParam1,
      message.optionalParam2,
    );
    expect(debug).toHaveBeenCalled();
    const stringifiedMessage = debug.mock.calls[0][0];
    expect(stringifiedMessage).toBe(
      `level=debug\tmessage=${message.message}\toptionalParams=${message.optionalParam1},${message.optionalParam2}\n`,
    );
  });
});

import { JsonLogger } from './json';

describe('JsonLogger  Tests', () => {
  let logger: JsonLogger;
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
    logger = new JsonLogger();
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
    const parsedMessage = JSON.parse(log.mock.calls[0][0]);
    expect(parsedMessage.level).toEqual('log');
    expect(parsedMessage.message).toEqual(message.message);
    expect(parsedMessage.optionalParams[0]).toEqual(message.optionalParam1);
    expect(parsedMessage.optionalParams[1]).toEqual(message.optionalParam2);
  });

  it('should call error method', () => {
    logger.error(
      message.message,
      message.optionalParam1,
      message.optionalParam2,
    );
    expect(error).toHaveBeenCalled();
    const parsedMessage = JSON.parse(error.mock.calls[0][0]);
    expect(parsedMessage.level).toEqual('error');
    expect(parsedMessage.message).toEqual(message.message);
    expect(parsedMessage.optionalParams[0]).toEqual(message.optionalParam1);
    expect(parsedMessage.optionalParams[1]).toEqual(message.optionalParam2);
  });

  it('should call warn method', () => {
    logger.warn(
      message.message,
      message.optionalParam1,
      message.optionalParam2,
    );
    expect(warn).toHaveBeenCalled();
    const parsedMessage = JSON.parse(warn.mock.calls[0][0]);
    expect(parsedMessage.level).toEqual('warn');
    expect(parsedMessage.message).toEqual(message.message);
    expect(parsedMessage.optionalParams[0]).toEqual(message.optionalParam1);
    expect(parsedMessage.optionalParams[1]).toEqual(message.optionalParam2);
  });

  it('should call debug method', () => {
    logger.debug(
      message.message,
      message.optionalParam1,
      message.optionalParam2,
    );
    expect(debug).toHaveBeenCalled();
    const parsedMessage = JSON.parse(debug.mock.calls[0][0]);
    expect(parsedMessage.level).toEqual('debug');
    expect(parsedMessage.message).toEqual(message.message);
    expect(parsedMessage.optionalParams[0]).toEqual(message.optionalParam1);
    expect(parsedMessage.optionalParams[1]).toEqual(message.optionalParam2);
  });
});

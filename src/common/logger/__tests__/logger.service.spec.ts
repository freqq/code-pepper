import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Test } from '@nestjs/testing';
import { LoggerService } from '../logger.service';

import { INQUIRER } from '@nestjs/core';

const LOG_TEXT = 'LOG';
const WinstonLoggerMock = {
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  debug: jest.fn(),
  verbose: jest.fn(),
};

describe('LoggerService', () => {
  let loggerService: LoggerService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        LoggerService,
        {
          provide: WINSTON_MODULE_NEST_PROVIDER,
          useValue: WinstonLoggerMock,
        },
        {
          provide: INQUIRER,
          useValue: 'INQUIRER',
        },
      ],
    }).compile();

    loggerService = await moduleRef.resolve<LoggerService>(LoggerService);
  });

  test('sets a context with source as a string', () => {
    // Arrange
    const SOURCE = 'context';

    // Act

    const loggerServiceInstanceWithStringContext = new LoggerService(
      {} as LoggerService,
      SOURCE,
    );

    // Assert
    expect(loggerServiceInstanceWithStringContext.context).toBe(SOURCE);
  });

  test('sets a context with source as a valid object', () => {
    // Arrange
    const NAME = 'context';
    const CONTEXT = { constructor: { name: NAME } };

    // Act
    const loggerServiceInstanceWithStringContext = new LoggerService(
      {} as LoggerService,
      CONTEXT,
    );

    // Assert
    expect(loggerServiceInstanceWithStringContext.context).toBe(NAME);
  });
  test('should log with log level', () => {
    // Act
    loggerService.log(LOG_TEXT);

    // Assert
    expect(WinstonLoggerMock.log).toHaveBeenCalledTimes(1);
    expect(WinstonLoggerMock.log).toHaveBeenCalledWith(LOG_TEXT, INQUIRER);
  });

  test('should log with error level', () => {
    // Act
    loggerService.error(LOG_TEXT);

    // Assert
    expect(WinstonLoggerMock.error).toHaveBeenCalledTimes(1);
    expect(WinstonLoggerMock.error).toHaveBeenCalledWith(LOG_TEXT, INQUIRER);
  });

  test('should log with warn level', () => {
    // Act
    loggerService.warn(LOG_TEXT);

    // Assert
    expect(WinstonLoggerMock.warn).toHaveBeenCalledTimes(1);
    expect(WinstonLoggerMock.warn).toHaveBeenCalledWith(LOG_TEXT, INQUIRER);
  });

  test('should log with debug level', () => {
    // Act
    loggerService.debug(LOG_TEXT);

    // Assert
    expect(WinstonLoggerMock.debug).toHaveBeenCalledTimes(1);
    expect(WinstonLoggerMock.debug).toHaveBeenCalledWith(LOG_TEXT, INQUIRER);
  });
});

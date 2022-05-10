import { container } from 'tsyringe';

import { IDateProvider } from './DateProvider/IDateProvider';
import { IMailProvider } from './MailProvider/IMailProvider';
import { DayjsDateProvider } from './DateProvider/implementations/DayjsDateProvider';
import { EtherealMailProvider } from './MailProvider/implementations/EtherealMailProvider';
import { IStorageProvider } from './StorageProvider/IStorageProvider';
import { LocalStorageProvider } from './StorageProvider/implementations/LocalStorageProvider';
import { S3StorageProvider } from './StorageProvider/implementations/S3StorageProvider';

const diskStorage = { local: LocalStorageProvider, s3: S3StorageProvider };

container.registerInstance<IMailProvider>('MailProvider', new EtherealMailProvider());
container.registerSingleton<IDateProvider>('DayjsDateProvider', DayjsDateProvider);
container.registerSingleton<IStorageProvider>('StorageProvider', diskStorage[process.env.disk]);

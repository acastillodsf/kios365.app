const settings = {
  produccion: true,
  lasversion: "2024-08",
};

const config = {
  produccion: {
    test: !settings.produccion,
    baseURL: 'https://www.kios365.app',
    socket: 'wss://www.kios365.app',
  },
  test: {
    test: !settings.produccion,
    baseURL: 'http://10.0.30.28:4500',
    socket: 'ws://10.0.30.28:4500',
  },
};

export const coopSettings = settings.produccion ? config.produccion : config.test;


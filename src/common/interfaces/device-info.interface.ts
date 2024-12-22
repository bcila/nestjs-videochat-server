interface Browser {
  name: string;
  version: string;
  major: string;
  type: string;
}

interface CPU {
  architecture: string;
}

interface Device {
  type: string;
  model: string;
  vendor: string;
}

interface Engine {
  name: string;
  version: string;
}

interface OS {
  name: string;
  version: string;
}

export default interface DeviceInfo {
  browser: Browser;
  cpu: CPU;
  device: Device;
  engine: Engine;
  os: OS;
}

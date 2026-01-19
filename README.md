
# Edge Smart Wind Turbine

## Overview
A smart wind turbine monitoring and control system for edge computing environments.

## Local Deployment

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation
```bash
git clone <repository-url>
cd edge-smart-wind-turbine
npm install
```

### Running Locally
```bash
npm start
```
The application will be available at `http://localhost:3000`

## Online Deployment (GitHub Pages)

1. Ensure your repository has GitHub Pages enabled (Settings → Pages)
2. Build the project:
```bash
npm run build
```
3. Push to your `gh-pages` branch or configure deployment in GitHub Actions
4. Access your site at `https://<username>.github.io/edge-smart-wind-turbine`

## MQTT Broker Connection

### Configuration
Add MQTT connection settings to your `.env` file:
```env
MQTT_BROKER=mqtt://broker.example.com:1883
MQTT_USERNAME=your_username
MQTT_PASSWORD=your_password
MQTT_CLIENT_ID=wind-turbine-client
```

### WebSocket Support
If connecting from a browser, **WebSocket support is required**. Configure your MQTT broker:
- Use `mqtt://` for Node.js backend connections
- Use `ws://` (or `wss://` for secure) for browser connections
- Ensure your broker has WebSocket listener enabled (typically port 9001)

### Usage
```javascript
const mqtt = require('mqtt');
const client = mqtt.connect(process.env.MQTT_BROKER);
client.subscribe('turbine/data');
```

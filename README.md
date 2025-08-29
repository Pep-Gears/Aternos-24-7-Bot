# Aternos 24/7 Bot

Advanced automation bot for Aternos cracked Minecraft servers.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and set your server password:

   ```bash
   cp .env.example .env
   ```

3. Edit `config.json` with your Aternos server details:

   ```json
   {
     "server": {
       "host": "your-server.aternos.me",
       "port": 25565
     }
   }
   ```

4. Build and run:

   ```bash
   npm run build
   npm start
   ```

## Features

- Automatic login with /register and /login commands
- Simulates realistic player activity
- Auto-reconnection on disconnect
- Random leave/rejoin patterns
- AFK prevention through movement simulation

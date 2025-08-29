# Aternos 24/7 Bot

[![GitHub stars](https://img.shields.io/github/stars/TejasLamba2006/Aternos-24-7-Bot)](https://github.com/TejasLamba2006/Aternos-24-7-Bot)
[![GitHub forks](https://img.shields.io/github/forks/TejasLamba2006/Aternos-24-7-Bot)](https://github.com/TejasLamba2006/Aternos-24-7-Bot)
[![GitHub issues](https://img.shields.io/github/issues/TejasLamba2006/Aternos-24-7-Bot)](https://github.com/TejasLamba2006/Aternos-24-7-Bot)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-Custom-blue)](https://github.com/TejasLamba2006/Aternos-24-7-Bot/blob/main/LICENSE)
[![Discord](https://img.shields.io/discord/123456789012345678?color=blue&label=Discord)](https://discord.gg/msEkYDWpXM)

Advanced automation bot for Aternos cracked Minecraft servers.

**GitHub Repository:** [https://github.com/TejasLamba2006/Aternos-24-7-Bot](https://github.com/TejasLamba2006/Aternos-24-7-Bot)

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

## License

This project is licensed under a custom license. See the [LICENSE](LICENSE) file for full details.

### Key License Terms

- ✅ **Allowed:** Personal use and modification
- ✅ **Allowed:** Educational and non-commercial distribution with attribution
- ❌ **Prohibited:** Commercial sale without permission
- ❌ **Prohibited:** YouTube videos/tutorials without permission
- 📝 **Required:** Credit to Tejas Lamba and [visa2code](https://www.youtube.com/@visa2code) YouTube channel

**Contact:** [visa2code@gmail.com](mailto:visa2code@gmail.com) for commercial or content creation permissions.

## Support

Join our Discord server for support and updates: [https://discord.gg/msEkYDWpXM](https://discord.gg/msEkYDWpXM)

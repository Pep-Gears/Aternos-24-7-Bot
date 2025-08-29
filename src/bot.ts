import { createBot, Bot, ControlState } from "mineflayer";
import { readFileSync } from "fs";
import { config } from "dotenv";

config();

interface IServerConfig {
  server: { host: string; port: number; version: string };
  bot: {
    username: string;
    reconnectDelay: number;
    activityInterval: number;
    randomLeaveChance: number;
    randomLeaveInterval: number;
  };
}

class CrypticAutomationEngine {
  private _activeInstance: Bot | null = null;
  private readonly _configurationMatrix: IServerConfig;
  private readonly _authenticationSequence: string;
  private _behaviorIntervalIds: NodeJS.Timeout[] = [];
  private _reconnectionAttempts = 0;
  private _lastActivityTimestamp = Date.now();
  private _isAuthenticated = false;
  private readonly _activityPatterns = [
    () => this._executeMovementSequence(),
    () => this._performRotationalActivity(),
    () => this._simulateJumpBehavior(),
    () => this._executeRandomWalk(),
  ];

  constructor() {
    this._configurationMatrix = JSON.parse(
      readFileSync("config.json", "utf8")
    ) as IServerConfig;
    this._authenticationSequence = process.env.SERVER_PASSWORD || "";
    this._initializePrimaryConnection();
  }

  private _initializePrimaryConnection(): void {
    const connectionParameters = {
      host: this._configurationMatrix.server.host,
      port: this._configurationMatrix.server.port,
      username: this._configurationMatrix.bot.username,
      auth: "offline" as const,
      version: this._configurationMatrix.server.version,
    };

    this._activeInstance = createBot(connectionParameters);
    this._attachEventHandlers();
  }

  private _attachEventHandlers(): void {
    if (!this._activeInstance) return;

    this._activeInstance.on("login", () => {
      this._resetAuthenticationState();
      this._scheduleRandomLeaveEvent();
    });

    this._activeInstance.on("spawn", () => {
      setTimeout(() => this._executeAuthenticationProtocol(), 2000);
      this._initializeBehaviorSimulation();
    });

    this._activeInstance.on("kicked", (reason) => {
      this._handleDisconnectionEvent(`Kicked: ${reason}`);
    });

    this._activeInstance.on("end", () => {
      this._handleDisconnectionEvent("Connection terminated");
    });

    this._activeInstance.on("error", (error) => {
      this._handleDisconnectionEvent(`Error: ${error.message}`);
    });

    this._activeInstance.on("message", (message) => {
      this._processServerMessage(message.toString());
    });
  }

  private _executeAuthenticationProtocol(): void {
    if (!this._activeInstance || this._isAuthenticated) return;

    const authCommands = [
      `/register ${this._authenticationSequence} ${this._authenticationSequence}`,
      `/login ${this._authenticationSequence}`,
    ];

    authCommands.forEach((command, index) => {
      setTimeout(() => {
        this._activeInstance?.chat(command);
      }, index * 1500);
    });

    setTimeout(() => {
      this._isAuthenticated = true;
    }, 4000);
  }

  private _initializeBehaviorSimulation(): void {
    this._clearAllIntervals();

    const primaryActivityLoop = setInterval(() => {
      this._executeRandomActivity();
    }, this._configurationMatrix.bot.activityInterval);

    const secondaryMovementLoop = setInterval(() => {
      if (Math.random() < 0.7) {
        this._performComplexMovementPattern();
      }
    }, 15000);

    const tertiaryInteractionLoop = setInterval(() => {
      this._simulatePlayerInteraction();
    }, 45000);

    this._behaviorIntervalIds.push(
      primaryActivityLoop,
      secondaryMovementLoop,
      tertiaryInteractionLoop
    );
  }

  private _executeRandomActivity(): void {
    if (!this._activeInstance || !this._isAuthenticated) return;

    const selectedPattern =
      this._activityPatterns[
        Math.floor(Math.random() * this._activityPatterns.length)
      ];
    selectedPattern();
    this._lastActivityTimestamp = Date.now();
  }

  private _executeMovementSequence(): void {
    if (!this._activeInstance?.entity) return;

    const movementVectors: ControlState[] = [
      "forward",
      "back",
      "left",
      "right",
    ];
    const selectedVector =
      movementVectors[Math.floor(Math.random() * movementVectors.length)];

    this._activeInstance.setControlState(selectedVector, true);
    setTimeout(() => {
      this._activeInstance?.setControlState(selectedVector, false);
    }, Math.random() * 2000 + 500);
  }

  private _performRotationalActivity(): void {
    if (!this._activeInstance?.entity) return;

    const yawDelta = (Math.random() - 0.5) * Math.PI;
    const pitchDelta = (Math.random() - 0.5) * Math.PI * 0.5;

    this._activeInstance.look(
      this._activeInstance.entity.yaw + yawDelta,
      this._activeInstance.entity.pitch + pitchDelta,
      true
    );
  }

  private _simulateJumpBehavior(): void {
    if (!this._activeInstance) return;

    const jumpSequence =
      Math.random() < 0.3 ? 1 : Math.floor(Math.random() * 3) + 1;

    for (let i = 0; i < jumpSequence; i++) {
      setTimeout(() => {
        this._activeInstance?.setControlState("jump", true);
        setTimeout(() => {
          this._activeInstance?.setControlState("jump", false);
        }, 100);
      }, i * 400);
    }
  }

  private _executeRandomWalk(): void {
    if (!this._activeInstance?.entity) return;

    const walkDuration = Math.random() * 3000 + 1000;
    const direction = Math.random() * Math.PI * 2;

    this._activeInstance.look(direction, 0, true);
    this._activeInstance.setControlState("forward", true);

    setTimeout(() => {
      this._activeInstance?.setControlState("forward", false);
    }, walkDuration);
  }

  private _performComplexMovementPattern(): void {
    if (!this._activeInstance) return;

    const patternSequence: Array<{ action: ControlState; duration: number }> = [
      { action: "sprint", duration: 1000 },
      { action: "sneak", duration: 800 },
      { action: "jump", duration: 200 },
    ];

    patternSequence.forEach((pattern, index) => {
      setTimeout(() => {
        this._activeInstance?.setControlState(pattern.action, true);
        setTimeout(() => {
          this._activeInstance?.setControlState(pattern.action, false);
        }, pattern.duration);
      }, index * pattern.duration);
    });
  }

  private _simulatePlayerInteraction(): void {
    if (!this._activeInstance || Math.random() > 0.4) return;

    const interactionBehaviors = [
      () => this._activeInstance?.swingArm("right"),
      () => this._activeInstance?.activateItem(false),
      () => this._performInventoryAction(),
    ];

    const selectedBehavior =
      interactionBehaviors[
        Math.floor(Math.random() * interactionBehaviors.length)
      ];
    selectedBehavior();
  }

  private _performInventoryAction(): void {
    if (!this._activeInstance) return;

    try {
      const inventoryWindow = this._activeInstance.inventory;
      if (inventoryWindow && inventoryWindow.slots.length > 9) {
        const randomSlot = Math.floor(Math.random() * 9) + 36;
        this._activeInstance.clickWindow(randomSlot, 0, 0);
      }
    } catch (error) {
      console.warn("Inventory action failed:", error);
    }
  }

  private _scheduleRandomLeaveEvent(): void {
    const leaveTimeout = setTimeout(() => {
      if (Math.random() < this._configurationMatrix.bot.randomLeaveChance) {
        this._executeRandomLeave();
      }
      this._scheduleRandomLeaveEvent();
    }, this._configurationMatrix.bot.randomLeaveInterval);

    this._behaviorIntervalIds.push(leaveTimeout);
  }

  private _executeRandomLeave(): void {
    if (!this._activeInstance) return;

    this._activeInstance.quit();

    const rejoinDelay = Math.random() * 30000 + 10000;
    setTimeout(() => {
      this._handleDisconnectionEvent("Scheduled random leave");
    }, rejoinDelay);
  }

  private _processServerMessage(message: string): void {
    const authenticationTriggers = [
      "register",
      "login",
      "password",
      "authentication",
      "verify",
    ];

    if (
      authenticationTriggers.some((trigger) =>
        message.toLowerCase().includes(trigger)
      )
    ) {
      setTimeout(() => this._executeAuthenticationProtocol(), 1000);
    }
  }

  private _handleDisconnectionEvent(reason: string): void {
    this._clearAllIntervals();
    this._resetAuthenticationState();

    const exponentialBackoff = Math.min(
      this._configurationMatrix.bot.reconnectDelay *
        Math.pow(1.5, this._reconnectionAttempts),
      60000
    );

    setTimeout(() => {
      this._reconnectionAttempts++;
      this._initializePrimaryConnection();
    }, exponentialBackoff);
  }

  private _clearAllIntervals(): void {
    this._behaviorIntervalIds.forEach((intervalId) => {
      clearInterval(intervalId);
      clearTimeout(intervalId);
    });
    this._behaviorIntervalIds = [];
  }

  private _resetAuthenticationState(): void {
    this._isAuthenticated = false;
    this._reconnectionAttempts = 0;
  }
}

const automationInstance = new CrypticAutomationEngine();

process.on("SIGINT", () => {
  process.exit(0);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught exception:", error);
  setTimeout(() => {
    process.exit(1);
  }, 1000);
});

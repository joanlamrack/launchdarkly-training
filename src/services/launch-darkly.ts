import LaunchDarklyClient, { LDUser, LDClient } from 'launchdarkly-node-server-sdk';

export interface ILaunchDarklyService {
    getVariation(flagName: string, user: LDUser, defaultValue: boolean): Promise<boolean>;
}

export class LaunchDarklyService implements ILaunchDarklyService {
    private launchDarklyClient: LDClient;
    constructor(
        private apiKey: string
    ) { 
        this.launchDarklyClient = LaunchDarklyClient.init(apiKey);
    }

    async getVariation(flagName: string, user: LDUser, defaultValue: boolean): Promise<boolean> {
        if(this.launchDarklyClient.initialized()) {
            await this.launchDarklyClient.waitForInitialization();
        }

        return this.launchDarklyClient.variation(flagName, user, defaultValue);
    }
    
}
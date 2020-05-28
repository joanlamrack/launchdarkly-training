import express from 'express';
import { LaunchDarklyService, ILaunchDarklyService } from './services/launch-darkly';

const LAUNCHDARKLY_KEY = 'sdk-9f12b430-115d-4f7f-b70d-0ea339a78c5d';
const FLAG_NAME = 'training'
const PATH_TO_BLUE_PAGE = __dirname + '/views/blue.html';
const PATH_TO_GREEN_PAGE = __dirname + '/views/green.html';

(async () => {
    const app = express();
    const launchDarklyService: ILaunchDarklyService = new LaunchDarklyService(LAUNCHDARKLY_KEY);
    app.get('/', async (req, res, next) => {
        const launchDarklyVariation = await launchDarklyService.getVariation(
            FLAG_NAME,
            {
                key: 'green'
            },
            false
        );

        if (launchDarklyVariation) {
            res.status(200).json({
                value: 'blue'
            });
        } else {
            res.status(200).json({
                value: 'green'
            });
        }
    })
    app.listen(3000);
})()
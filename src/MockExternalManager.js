const timeSpan = '1s';
const DEPLOY_APP_NAME = 'deploy_app_name';
const DEPLOY_CACHE_KEY_PREFIX = 'deploy_';
const CONSOLE_CASHE_KEY_PREFIX = 'console_';
const PLAPPS_NAMES = 'plaspps_names';

class MockExternalManager {
    init(props) {
        var { cookies } = props;
        this.cookies = cookies;
    }

    startDeploy(params) {
        if (!this.cookies) {
            return false;
        }
        params.progress = 0;
        var cacheKey = DEPLOY_CACHE_KEY_PREFIX+params.applicationName;
        this.cookies.set(cacheKey, params, { path: '/' });
        this.cookies.set(DEPLOY_APP_NAME, params.applicationName, { path: '/' });
    }

    getDeployAppName() {
        return this.cookies.get(DEPLOY_APP_NAME);
    }

    getProgress() {
        var cacheKey = DEPLOY_CACHE_KEY_PREFIX + this.getDeployAppName();
        var params = this.cookies.get(cacheKey);
        params.progress = (params.progress<<1)|1;
        this.cookies.set(cacheKey, params, { path: '/' });
        return [params.progress&3, (params.progress&12)>>2, (params.progress&48)>>4, (params.progress&192)>>6];
    }

    finishDeploy() {
        var depCacheKey = DEPLOY_CACHE_KEY_PREFIX + this.getDeployAppName();
        var params = this.cookies.get(depCacheKey);

        var casheKey = CONSOLE_CASHE_KEY_PREFIX + params.applicationName;
        params.deployedTime = Date.now(); // set deployed time.
        params.updatedTime = Date.now(); // set updated time.
        this.cookies.set(casheKey, params)
        var plapps = this.cookies.get(PLAPPS_NAMES) || [];
        plapps.push(params.applicationName);
        this.cookies.set(PLAPPS_NAMES, plapps, { path: '/' });
    }
}

const MockManager = new MockExternalManager();

export default MockManager;
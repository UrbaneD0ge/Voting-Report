export const ssr = false;
import { ApiClient } from 'docusign-esign';
import { sendEnvelope } from '$lib/signingViaEmail.js';
import { readFileSync } from 'fs';
import { error } from '@sveltejs/kit';
import { dsOauthServer, dsJWTClientId, privateKeyLocation, impersonatedUserGuid } from '$lib/jwtConfig.json';
// import { ProvisioningInformation } from 'docusign-esign';
// import { makeEnvelope } from '../../lib/signingViaEmail.js';
// import { sign } from 'crypto';

// Form Action
export const actions = {
  docuSign: async ({ request }) => {
    // get the agenda items
    const form = await request.formData();

    // const items = form.get('items');
    const data = form.get('items');
    const signerArgs = form.get('data');

    // console.log('22', signerArgs);

    // makeEnvelope(signerArgs);
    main(data, signerArgs);
  }
};

// console.log(signerArgs);

const SCOPES = [
  'signature', 'impersonation'
];

function getConsent() {
  var urlScopes = SCOPES.join('+');

  // Construct consent URL
  var redirectUri = 'https://developers.docusign.com/platform/auth/consent';
  var consentUrl = `${jwtConfig.dsOauthServer}/oauth/auth?response_type=code&` +
    `scope=${urlScopes}&client_id=${jwtConfig.dsJWTClientId}&` +
    `redirect_uri=${redirectUri}`;

  console.log('Open the following URL in your browser to grant consent to the application:');
  console.log(consentUrl);
  console.log('Consent granted? \n 1)Yes \n 2)No');
  let consentGranted = prompt('');
  if (consentGranted === '1') {
    return true;
  } else {
    console.error('Please grant consent!');
    process.exit();
  }
}

async function authenticate() {
  const jwtLifeSec = 10 * 60; // requested lifetime for the JWT is 10 min
  const dsApi = new ApiClient();
  dsApi.setOAuthBasePath(dsOauthServer.replace('https://', '')); // it should be domain only.
  let rsaKey = readFileSync(privateKeyLocation);

  try {
    const results = await dsApi.requestJWTUserToken(dsJWTClientId,
      impersonatedUserGuid, SCOPES, rsaKey,
      jwtLifeSec);
    const accessToken = results.body.access_token;

    // get user info
    const userInfoResults = await dsApi.getUserInfo(accessToken);

    // use the default account
    let userInfo = userInfoResults.accounts.find(account =>
      account.isDefault === 'true');

    return {
      accessToken: results.body.access_token,
      apiAccountId: userInfo.accountId,
      basePath: `${userInfo.baseUri}/restapi`
    };

  } catch (e) {
    let body = e.response && e.response.body;
    // Determine the source of the error
    if (body) {
      // The user needs to grant consent
      if (body.error && body.error === 'consent_required') {
        if (getConsent()) { return authenticate(); };
      } else {
        // Consent has been granted. Show status code for DocuSign API error
        this._debug_log(`\nAPI problem: Status code ${e.response.status}, message body:
        ${JSON.stringify(body, null, 4)}\n\n`);
      }
    }
  }
}

function getArgs(apiAccountId, accessToken, basePath, signerArgs, data) {
  // TODO: GET THESE FROM FORM
  // signerEmail = signerArgs.chair;
  // signerName = signerArgs.chair;
  // ccEmail = prompt("Enter the carbon copy's email address: ");
  // ccName = prompt("Enter the carbon copy's name: ");

  data = JSON.parse(data);
  signerArgs = JSON.parse(signerArgs);

  console.log(signerArgs);


  const envelopeArgs = {
    signerEmail: 'kipling.dunlap@gmail.com',
    signerName: data.chair,
    ccEmail: 'kdunlap@atlantaga.gov',
    ccName: data.planner,
    status: 'sent',
    signerArgs: signerArgs,
    signerData: data
  };

  const args = {
    accessToken: accessToken,
    basePath: basePath,
    accountId: apiAccountId,
    envelopeArgs: envelopeArgs,
  };
  // console.log(args);

  return args;
}

function handleEnvelopeError(err) {

  console.log(err);
  return error(err);
}

async function main(data, signerArgs) {
  let accountInfo = await authenticate();
  let args = getArgs(accountInfo.apiAccountId, accountInfo.accessToken, accountInfo.basePath, data, signerArgs);
  let envelopeId = await sendEnvelope(args).catch(handleEnvelopeError);
  // console.log(data, signerArgs);
  console.log(envelopeId);
}
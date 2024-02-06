export const ssr = false;
import { sendEnvelope } from '$lib/signingViaEmail.js';
import { readFileSync } from 'fs';
import { error } from '@sveltejs/kit';
import { dsOauthServer, dsJWTClientId, privateKeyLocation, impersonatedUserGuid } from '$lib/jwtConfig.json';


// Form Action
export const actions = {
  default: async ({ request }) => {
    // get the agenda items
    const form = await request.formData();

    const data = form.get('items');
    const applications = form.get('data');

    // data.chairE = form.get('chairE');
    // data.plannerE = form.get('plannerE');

    // console.log('applications', applications);

    // makeEnvelope(applications);
    let confirmation = await main(data, applications).catch(err => {
      console.log(err);
    }
    );

    return {
      status: 200,
      body: {
        confirmation: confirmation
      }
    };
  }
};

// console.log(applications);

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

function getArgs(apiAccountId, accessToken, basePath, applications, data) {
  // TODO: GET THESE FROM FORM
  // signerEmail = applications.chair;
  // signerName = applications.chair;
  // ccEmail = prompt("Enter the carbon copy's email address: ");
  // ccName = prompt("Enter the carbon copy's name: ");

  data = JSON.parse(data);
  applications = JSON.parse(applications);

  // console.log('data', data, '\napplications', applications);

  const envelopeArgs = {
    chairName: data.chair,
    chairEmail: data.chairE,
    plannerName: data.planner,
    plannerEmail: data.plannerE,
    pNotes: data.pNotes,
    ccEmail: 'kdunlap@atlantaga.gov',
    ccName: 'NPU Resources & Support',
    NPU: data.NPU,
    loc: data.loc,
    date: data.date,
    status: 'sent',
    applications: applications
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
  error(500, 'Failed to create the envelope. ' + err);
  console.log(err);
}

async function main(data, applications) {
  let accountInfo = await authenticate();
  let args = getArgs(accountInfo.apiAccountId, accountInfo.accessToken, accountInfo.basePath, data, applications);
  let envelopeId = await sendEnvelope(args).catch(handleEnvelopeError);
  // console.log(args);
  console.log('envelopeID:', envelopeId);
  return envelopeId;
}
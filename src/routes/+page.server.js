import { ApiClient, EnvelopesApi, EnvelopeDefinition, Document, Signer, CarbonCopy, SignHere, Tabs, Recipients } from 'docusign-esign';
// import { sendEnvelope } from '$lib/eSignature/examples/signingViaEmail.js';
import { readFileSync } from 'fs';
import { resolve } from 'path';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import { dsOauthServer, dsJWTClientId, privateKeyLocation, impersonatedUserGuid } from './jwtConfig.json';
import { ProvisioningInformation } from 'docusign-esign';
const demoDocsPath = resolve(__dirname, '../demo_documents');
// const doc2File = 'World_Wide_Corp_Battle_Plan_Trafalgar.docx';
// const doc3File = 'World_Wide_Corp_lorem.pdf';

const SCOPES = [
  'signature', 'impersonation'
];

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
    throw e;
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

function getArgs(apiAccountId, accessToken, basePath) {
  // signerEmail = prompt("Enter the signer's email address: ");
  // signerName = prompt("Enter the signer's name: ");
  // ccEmail = prompt("Enter the carbon copy's email address: ");
  // ccName = prompt("Enter the carbon copy's name: ");

  const envelopeArgs = {
    signerEmail: 'kipling.dunlap@gmail.com',
    signerName: 'Kipling Dunlap',
    ccEmail: 'kdunlap@atlantaga.gov',
    ccName: 'Kip Dunlap',
    status: 'sent',
    // doc2File: resolve(demoDocsPath, doc2File),
    // doc3File: resolve(demoDocsPath, doc3File)
  };
  const args = {
    accessToken: accessToken,
    basePath: basePath,
    accountId: apiAccountId,
    envelopeArgs: envelopeArgs
  };

  return args;
}

function document1(args) {
  // Data for this method
  // args.signerEmail
  // args.signerName
  // args.ccEmail
  // args.ccName

  // return `
  //   <!DOCTYPE html>
  //   <html>
  //       <head>
  //         <meta charset="UTF-8">
  //       </head>
  //       <body style="font-family:sans-serif;margin-left:2em;">
  //       <h1 style="font-family: 'Trebuchet MS', Helvetica, sans-serif;
  //           color: darkblue;margin-bottom: 0;">World Wide Corp</h1>
  //       <h2 style="font-family: 'Trebuchet MS', Helvetica, sans-serif;
  //         margin-top: 0px;margin-bottom: 3.5em;font-size: 1em;
  //         color: darkblue;">Order Processing Division</h2>
  //       <h4>Ordered by ${args.signerName}</h4>
  //       <p style="margin-top:0em; margin-bottom:0em;">Email: ${args.signerEmail}</p>
  //       <p style="margin-top:0em; margin-bottom:0em;">Copy to: ${args.ccName}, ${args.ccEmail}</p>
  //       <p style="margin-top:3em;">
  // Candy bonbon pastry jujubes lollipop wafer biscuit biscuit. Topping brownie sesame snaps sweet roll pie. Croissant danish biscuit soufflé caramels jujubes jelly. Dragée danish caramels lemon drops dragée. Gummi bears cupcake biscuit tiramisu sugar plum pastry. Dragée gummies applicake pudding liquorice. Donut jujubes oat cake jelly-o. Dessert bear claw chocolate cake gummies lollipop sugar plum ice cream gummies cheesecake.
  //       </p>
  //       <!-- Note the anchor tag for the signature field is in white. -->
  //       <h3 style="margin-top:3em;">Agreed: <span style="color:white;">**signature_1**/</span></h3>
  //       </body>
  //   </html>
  // `;

}

function makeEnvelope(args) {
  // Data for this method
  // args.signerEmail
  // args.signerName
  // args.ccEmail
  // args.ccName
  // args.status


  // document 1 (html) has tag **signature_1**
  //
  // The envelope has two recipients.
  // recipient 1 - signer
  // recipient 2 - cc
  // The envelope will be sent first to the signer.
  // After it is signed, a copy is sent to the cc person.

  // create the envelope definition
  let env = new EnvelopeDefinition();
  env.emailSubject = 'Please sign this document set';

  // add the documents
  let doc1 = new Document();
  let doc1b64 = Buffer.from(document1(args)).toString('base64');

  doc1.documentBase64 = doc1b64;
  doc1.name = 'Order acknowledgement'; // can be different from actual file name
  doc1.fileExtension = 'html'; // Source data format. Signed docs are always pdf.
  doc1.documentId = '1'; // a label used to reference the doc

  // The order in the docs array determines the order in the envelope
  env.documents = [doc1];

  // create a signer recipient to sign the document, identified by name and email
  // We're setting the parameters via the object constructor
  let signer1 = Signer.constructFromObject({
    email: args.signerEmail,
    name: args.signerName,
    recipientId: '1',
    routingOrder: '1',
  });
  // routingOrder (lower means earlier) determines the order of deliveries
  // to the recipients. Parallel routing order is supported by using the
  // same integer as the order for two or more recipients.

  // create a cc recipient to receive a copy of the documents, identified by name and email
  // We're setting the parameters via setters
  let cc1 = new CarbonCopy();
  cc1.email = args.ccEmail;
  cc1.name = args.ccName;
  cc1.routingOrder = '2';
  cc1.recipientId = '2';

  // Create signHere fields (also known as tabs) on the documents,
  // We're using anchor (autoPlace) positioning
  //
  // The DocuSign platform searches throughout your envelope's
  // documents for matching anchor strings. So the
  // signHere2 tab will be used in both document 2 and 3 since they
  // use the same anchor string for their "signer 1" tabs.
  let signHere1 = SignHere.constructFromObject({
    anchorString: '**signature_1**',
    anchorYOffset: '10',
    anchorUnits: 'pixels',
    anchorXOffset: '20',
  });
  let signHere2 = SignHere.constructFromObject({
    anchorString: '/sn1/',
    anchorYOffset: '10',
    anchorUnits: 'pixels',
    anchorXOffset: '20',
  });
  // Tabs are set per recipient / signer
  let signer1Tabs = Tabs.constructFromObject({
    signHereTabs: [signHere1, signHere2],
  });
  signer1.tabs = signer1Tabs;

  // Add the recipients to the envelope object
  let recipients = Recipients.constructFromObject({
    signers: [signer1],
    carbonCopies: [cc1],
  });
  env.recipients = recipients;

  // Request that the envelope be sent by setting |status| to "sent".
  // To request that the envelope be created as a draft, set to "created"
  env.status = args.status;

  return env;
}

const sendEnvelope = async (args) => {
  // Data for this method
  // args.basePath
  // args.accessToken
  // args.accountId

  let dsApiClient = new ApiClient();
  dsApiClient.setBasePath(args.basePath);
  dsApiClient.addDefaultHeader('Authorization', 'Bearer ' + args.accessToken);
  let envelopesApi = new EnvelopesApi(dsApiClient);
  let results = null;

  // Make the envelope request body
  let envelope = makeEnvelope(args.envelopeArgs);

  // Call the Envelopes::create API method
  // Exceptions will be caught by the calling function
  results = await envelopesApi.createEnvelope(args.accountId, {
    envelopeDefinition: envelope,
  });
  let envelopeId = results.envelopeId;

  console.log(`Envelope was created. EnvelopeId ${envelopeId}`);
  return { envelopeId: envelopeId };
};


async function main() {
  let accountInfo = await authenticate();
  let data = getArgs(accountInfo.apiAccountId, accountInfo.accessToken, accountInfo.basePath);
  // let envelopeId = sendEnvelope(args);
  console.log(accountInfo.accessToken ? 'authenticated' : 'not authenticated');
  return { accessToken: data };
}

main();